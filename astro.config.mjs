import fs from 'node:fs';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import rehypeRaw from 'rehype-raw';
import { imagesIntegration, rehypeResponsiveImages } from './src/lib/images.mjs';

const SITE = 'https://www.sigamarisco.com';

// <lastmod> dos posts: updatedDate (revisão real) ou date (publicação), lidos do frontmatter.
// Home, categorias e páginas estáticas ficam sem <lastmod> (não há data confiável por página).
const BLOG_DIR = new URL('./src/content/blog/', import.meta.url);
const postLastmod = Object.fromEntries(
  fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.md')).map((f) => {
    const fm = fs.readFileSync(new URL(f, BLOG_DIR), 'utf8').split('---')[1] ?? '';
    const get = (k) => fm.match(new RegExp(`^${k}:\\s*"?([0-9]{4}-[0-9]{2}-[0-9]{2})`, 'm'))?.[1];
    return [`${SITE}/blog/${f.replace(/\.md$/, '')}`, get('updatedDate') ?? get('date')];
  }).filter(([, d]) => d),
);

export default defineConfig({
  site: SITE,
  trailingSlash: 'never',
  build: { format: 'file' },
  integrations: [
    imagesIntegration(),
    sitemap({
      serialize(item) {
        const url = item.url.replace(/\/$/, '');
        const lastmod = postLastmod[url];
        return lastmod ? { ...item, lastmod: new Date(lastmod).toISOString() } : item;
      },
    }),
  ],
  markdown: { rehypePlugins: [rehypeRaw, rehypeResponsiveImages] },
});
