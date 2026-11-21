import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    seoTitle: z.string().optional(),
    description: z.string(),
    category: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    cover: z.string(),
    thumb: z.string().optional(),
    author: z.string().default('Marina Petrovich'),
    draft: z.boolean().default(false),
  }),
});

const legal = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/legal' }),
  schema: z.object({ title: z.string() }),
});

export const collections = { blog, legal };
