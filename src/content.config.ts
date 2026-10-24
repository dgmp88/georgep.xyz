import { defineCollection, z } from 'astro:content';
import { file, glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
  }),
});

const publications = defineCollection({
  loader: file('./src/content/publications.yaml'),
  schema: z.object({
    title: z.string(),
    authors: z.array(z.string()),
    venue: z.string(),
    date: z.coerce.date(),
    url: z.string().url().optional(),
    logo: z.string().optional(),
    logoDark: z.boolean().optional(),
  }),
});

export const collections = { blog, publications };

