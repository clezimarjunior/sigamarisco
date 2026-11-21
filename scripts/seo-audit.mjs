#!/usr/bin/env node
// Auditoria de SEO on-page dos HTMLs gerados em dist/.
// Uso: npm run build && node scripts/seo-audit.mjs [--json]
import fs from 'node:fs';
import path from 'node:path';

const DIST = path.resolve(process.argv.find((a) => a.startsWith('--dist='))?.slice(7) ?? 'dist');
const asJson = process.argv.includes('--json');

const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => {
  const p = path.join(d, e.name);
  return e.isDirectory() ? walk(p) : e.name.endsWith('.html') ? [p] : [];
});
const decode = (s) => s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');
const attr = (tag, name) => {
  const m = tag.match(new RegExp(`\\s${name}=(?:"([^"]*)"|'([^']*)')`, 'i'));
  if (m) return decode(m[1] ?? m[2]);
  // atributo sem valor (ex.: <img alt>) equivale a string vazia
  return new RegExp(`\\s${name}(?=[\\s>/])`, 'i').test(tag) ? '' : undefined;
};
const hasEmpty = (v) => {
  if (v === null || v === undefined) return true;
  if (typeof v === 'string') return v.trim() === '';
  if (Array.isArray(v)) return v.length === 0 || v.some(hasEmpty);
  if (typeof v === 'object') return Object.keys(v).length === 0 || Object.values(v).some(hasEmpty);
  return false;
};

const pages = [];
for (const file of walk(DIST)) {
  const rel = '/' + path.relative(DIST, file).replace(/\\/g, '/').replace(/(index)?\.html$/, '').replace(/\/$/, '');
  const html = fs.readFileSync(file, 'utf8');
  const noindex = /<meta name="robots" content="[^"]*noindex/i.test(html);
  const errors = [];
  const h1 = (html.match(/<h1[\s>]/gi) || []).length;
  if (h1 !== 1) errors.push(`H1: ${h1}`);
  const title = decode(html.match(/<title>([\s\S]*?)<\/title>/i)?.[1]?.trim() ?? '');
  if (!title) errors.push('title ausente');
  else if (title.length > 60) errors.push(`title ${title.length} > 60`);
  const descTag = html.match(/<meta name="description"[^>]*>/i)?.[0];
  const desc = descTag ? attr(descTag, 'content') ?? '' : '';
  if (!desc) errors.push('description ausente');
  else if (desc.length < 120 || desc.length > 160) errors.push(`description ${desc.length} fora de 120-160`);
  if (!/<link rel="canonical" href="https:\/\/[^"]+"/i.test(html)) errors.push('canonical ausente');

  let imgs = 0, noAlt = 0, emptyAltNotDecorative = 0, noDims = 0;
  for (const tag of html.match(/<img\b[^>]*>/gi) || []) {
    imgs++;
    const alt = attr(tag, 'alt');
    const decorative = /aria-hidden="true"|role="presentation"/i.test(tag);
    if (alt === undefined) noAlt++;
    else if (alt.trim() === '' && !decorative) emptyAltNotDecorative++;
    if (!attr(tag, 'width') || !attr(tag, 'height')) noDims++;
  }
  if (noAlt) errors.push(`${noAlt} img sem atributo alt`);
  if (emptyAltNotDecorative) errors.push(`${emptyAltNotDecorative} img com alt="" não marcada como decorativa`);
  if (noDims) errors.push(`${noDims} img sem width/height`);

  let ld = 0;
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)) {
    ld++;
    try {
      const data = JSON.parse(m[1]);
      if (hasEmpty(data)) errors.push('JSON-LD com campo vazio');
    } catch (e) { errors.push(`JSON-LD inválido: ${e.message}`); }
  }
  pages.push({ page: rel || '/', noindex, title, titleLen: title.length, desc, descLen: desc.length, h1, imgs, ld, errors });
}

// descriptions duplicadas entre páginas indexáveis
const seen = new Map();
for (const p of pages.filter((p) => !p.noindex && p.desc)) {
  if (seen.has(p.desc)) { p.errors.push(`description duplicada com ${seen.get(p.desc)}`); }
  else seen.set(p.desc, p.page);
}

pages.sort((a, b) => a.page.localeCompare(b.page));
if (asJson) { console.log(JSON.stringify(pages, null, 2)); process.exit(0); }
let failing = 0, totalImgs = 0;
for (const p of pages) {
  totalImgs += p.imgs;
  const flag = p.errors.length ? '✗' : '✓';
  if (p.errors.length) failing++;
  console.log(`${flag} ${p.page}${p.noindex ? ' (noindex)' : ''}  title=${p.titleLen} desc=${p.descLen} img=${p.imgs} ld=${p.ld}`);
  for (const e of p.errors) console.log(`    - ${e}`);
}
console.log(`\n${pages.length} páginas, ${failing} com problemas, ${totalImgs} imagens verificadas.`);
process.exit(failing ? 1 : 0);
