import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const workshops = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/workshops' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    order: z.number(),
    level: z.string().optional(),
    tags: z.array(z.string()).optional(),
  }),
});

const steps = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/steps' }),
  schema: z.object({
    title: z.string(),
    titleStep: z.string(),
    description: z.string(),
    order: z.number(),
  }),
});

export const collections = { workshops, steps };
