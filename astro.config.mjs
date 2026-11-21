import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import rehypeRaw from 'rehype-raw';
import { imagesIntegration, rehypeResponsiveImages } from './src/lib/images.mjs';

export default defineConfig({
  site: 'https://www.sigamarisco.com',
  trailingSlash: 'never',
  build: { format: 'file' },
  integrations: [imagesIntegration(), sitemap()],
  markdown: { rehypePlugins: [rehypeRaw, rehypeResponsiveImages] },
});
