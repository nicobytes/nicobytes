import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
  schema: ({ image }) =>
    z.object({
    title: z.string(),
    description: z.string(),
    author: z.string().default("Nicolas Molina (@nicobytes)"),
    date: z.string(),
    heroImage: image().optional(),
    categories: z.array(z.string()).optional(),
    draft: z.boolean().default(false),
    repoLink: z.string().url().optional(),
  }),
});

const portfolio = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/portfolio" }),
  schema: ({ image }) =>
    z.object({
    title: z.string(),
    description: z.string(),
    image: image(),
    date: z.string(),
    type: z.enum(["private", "public"]).default("private"),
    url: z.string().url().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog, portfolio };
