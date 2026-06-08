const OG_WIDTH = 1200;
const OG_HEIGHT = 630;

export interface OgMeta {
  url: string;
  width: number;
  height: number;
  type: string;
}

export function resolveOgMeta(
  ogPath: string | undefined,
  site: URL | undefined,
): OgMeta {
  const path = ogPath ?? "/og_image.jpg";
  const type = path.endsWith(".png") ? "image/png" : "image/jpeg";

  return {
    url: new URL(path, site).href,
    width: OG_WIDTH,
    height: OG_HEIGHT,
    type,
  };
}
