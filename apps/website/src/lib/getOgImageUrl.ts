import { getImage } from "astro:assets";
import type { ImageMetadata } from "astro";

export interface OgImage {
  url: string;
  width: number;
  height: number;
}

const DEFAULT_OG_IMAGE = {
  width: 1200,
  height: 630,
};

export async function getOgImageUrl(
  image: ImageMetadata | undefined,
  site: URL | undefined,
): Promise<OgImage> {
  if (!image) {
    return {
      url: new URL("/og_image.jpg", site).href,
      ...DEFAULT_OG_IMAGE,
    };
  }

  const optimized = await getImage({
    src: image,
    width: 1200,
    format: "jpg",
  });

  return {
    url: new URL(optimized.src, site).href,
    width: optimized.attributes.width,
    height: optimized.attributes.height,
  };
}
