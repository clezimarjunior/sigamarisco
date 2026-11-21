// Imagens responsivas sem mudar URLs: para cada /images/**/*.webp gera variantes
// foto.w480.webp, foto.w800.webp, foto.w1200.webp (menores que o original) e um
// manifesto com largura/altura. Usado pelo rehype plugin (corpo dos posts) e pelo
// componente Img (capa, cards).
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

export const WIDTHS = [480, 800, 1200];
const ROOT = process.cwd();
const PUBLIC = path.join(ROOT, 'public');
const MANIFEST = path.join(ROOT, 'node_modules', '.cache', 'sigamarisco-images.json');
const VARIANT_RE = /\.w\d+\.webp$/;

const walk = (d) => fs.existsSync(d)
  ? fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => {
      const p = path.join(d, e.name);
      return e.isDirectory() ? walk(p) : p.endsWith('.webp') && !VARIANT_RE.test(p) ? [p] : [];
    })
  : [];

export const variantPath = (src, w) => src.replace(/\.webp$/, `.w${w}.webp`);

/** Gera variantes que faltam e grava o manifesto. Idempotente. */
export async function buildImageVariants({ log = console.log } = {}) {
  const manifest = {};
  let created = 0;
  for (const file of walk(path.join(PUBLIC, 'images'))) {
    const src = '/' + path.relative(PUBLIC, file).split(path.sep).join('/');
    const meta = await sharp(file).metadata();
    const widths = WIDTHS.filter((w) => w < meta.width);
    for (const w of widths) {
      const out = path.join(PUBLIC, variantPath(src, w));
      if (fs.existsSync(out) && fs.statSync(out).mtimeMs >= fs.statSync(file).mtimeMs) continue;
      await sharp(file).resize({ width: w }).webp({ quality: 74 }).toFile(out);
      created++;
    }
    manifest[src] = { width: meta.width, height: meta.height, widths };
  }
  fs.mkdirSync(path.dirname(MANIFEST), { recursive: true });
  fs.writeFileSync(MANIFEST, JSON.stringify(manifest));
  log(`[images] ${Object.keys(manifest).length} imagens, ${created} variantes novas`);
  return manifest;
}

let cache;
export function imageInfo(src) {
  if (!src?.startsWith('/images/')) return undefined;
  cache ??= JSON.parse(fs.readFileSync(MANIFEST, 'utf8'));
  return cache[decodeURI(src)];
}

/** width/height/srcset para uma URL /images/...; undefined se não for imagem local. */
export function responsiveAttrs(src) {
  const info = imageInfo(src);
  if (!info) return undefined;
  const srcset = [...info.widths.map((w) => `${variantPath(src, w)} ${w}w`), `${src} ${info.width}w`].join(', ');
  return { width: info.width, height: info.height, srcset };
}

export const SIZES = {
  article: '(max-width: 960px) calc(100vw - 40px), 804px',
  card: '(max-width: 620px) calc(100vw - 40px), (max-width: 960px) calc(50vw - 34px), 380px',
  featured: '(max-width: 860px) calc(100vw - 40px), 660px',
};

/** Plugin rehype: aplica dimensões, srcset, sizes e lazy às <img> do Markdown. */
export function rehypeResponsiveImages() {
  return (tree, file) => {
    const walkNode = (node) => {
      if (node.type === 'element' && node.tagName === 'img') {
        const p = node.properties ?? (node.properties = {});
        if (p.alt === undefined || p.alt === null) {
          throw new Error(`Imagem sem alt em ${file?.path ?? 'markdown'}: ${p.src}`);
        }
        const attrs = responsiveAttrs(String(p.src));
        if (attrs) {
          p.width = attrs.width;
          p.height = attrs.height;
          p.srcSet = attrs.srcset;
          p.sizes = SIZES.article;
        }
        p.loading ??= 'lazy';
        p.decoding = 'async';
      }
      node.children?.forEach(walkNode);
    };
    walkNode(tree);
  };
}

export function imagesIntegration() {
  return {
    name: 'sigamarisco-images',
    hooks: {
      'astro:config:setup': async ({ logger }) => { await buildImageVariants({ log: (m) => logger.info(m) }); },
    },
  };
}
