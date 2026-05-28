import { getImage } from "astro:assets";
import type { ImageMetadata } from "astro";

export async function getOgImageUrl(
  image: ImageMetadata | undefined,
  site: URL | undefined,
): Promise<string> {
  if (!image) {
    return new URL("/og_image.jpg", site).href;
  }

  const optimized = await getImage({
    src: image,
    width: 1200,
    format: "jpg",
  });

  return new URL(optimized.src, site).href;
}
