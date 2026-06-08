import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const srcDir = fileURLToPath(new URL(".", import.meta.url));
const rootDir = fileURLToPath(new URL("..", import.meta.url));

const ogImageSchema = z
  .string()
  .regex(/^\/imgs\/og\/.+\.(jpe?g|png|webp)$/i)
  .optional()
  .superRefine((val, ctx) => {
    if (!val) return;

    const file = path.join(rootDir, "public", val.slice(1));
    if (!fs.existsSync(file)) {
      ctx.addIssue({
        code: "custom",
        message: `Missing OG file: public${val}`,
      });
    }
  });

const blog = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: path.join(srcDir, "content/blog"),
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      author: z.string().default("Nicolas Molina (@nicobytes)"),
      date: z.string(),
      lang: z.enum(["en", "es"]).default("en"),
      translationSlug: z.string().optional(),
      coverImage: image().optional(),
      ogImage: ogImageSchema,
      categories: z.array(z.string()).optional(),
      draft: z.boolean().default(false),
      repoLink: z.url().optional(),
    }),
});

const portfolio = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: path.join(srcDir, "content/portfolio"),
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      coverImage: image(),
      ogImage: ogImageSchema,
      date: z.string(),
      type: z.enum(["private", "public"]).default("private"),
      url: z.url().optional(),
      draft: z.boolean().default(false),
    }),
});

export const collections = { blog, portfolio };
