import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import type { APIContext } from "astro";

import { getYearsOfExperience } from "../lib/experience";

export async function GET(context: APIContext) {
  const posts = await getCollection(
    "blog",
    ({ data }) => !data.draft && data.lang === "en",
  );

  return rss({
    title: "Nicolas Molina",
    description: `Nicolas Molina is a Senior Software Engineer with ${getYearsOfExperience()}+ years of experience building scalable, user-centric products across frontend and backend systems. Google Developer Expert and Microsoft MVP based in Cochabamba, Bolivia.`,
    site: context.site!,
    items: posts
      .sort((a, z) => +new Date(z.data.date) - +new Date(a.data.date))
      .map((post) => ({
        title: post.data.title,
        pubDate: new Date(post.data.date),
        description: post.data.description,
        link: `/blog/${post.id}/`,
      })),
  });
}
