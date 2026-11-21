import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    seoTitle: z.string().optional(),
    description: z.string(),
    /** Meta description (120-158 caracteres). Se vazio, usa description. */
    seoDescription: z.string().optional(),
    category: z.string(),
    date: z.coerce.date(),
    /** Data de uma revisão REAL do conteúdo. Não preencher sem atualização de fato. */
    updatedDate: z.coerce.date().optional(),
    cover: z.string(),
    thumb: z.string().optional(),
    author: z.string().default('Marina Petrovich'),
    /** Coautores do post (ex.: Francisco Oliveira, a partir de nov/2026). */
    coauthors: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

const legal = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/legal' }),
  schema: z.object({ title: z.string(), description: z.string().optional() }),
});

export const collections = { blog, legal };
