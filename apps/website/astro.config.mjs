// @ts-check

import mdx from '@astrojs/mdx';
import partytown from '@astrojs/partytown';
import compressor from 'astro-compressor';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import remarkGfm from 'remark-gfm';

import tailwindcss from '@tailwindcss/vite';

import icon from 'astro-icon';

const shikiConfig = {
  theme: /** @type {'night-owl'} */ ('night-owl'),
  wrap: false,
};

export default defineConfig({
  site: 'https://nicobytes.com',
  integrations: [
    mdx({
      shikiConfig,
      gfm: false,
    }),
    partytown({
      config: {
        forward: ['dataLayer.push'],
      },
    }),
    compressor({
      gzip: true,
      brotli: true,
    }),
    sitemap(),
    icon(),
  ],
  markdown: {
    remarkPlugins: [remarkGfm],
    syntaxHighlight: 'shiki',
    shikiConfig,
  },
  vite: {
    plugins: [tailwindcss()],
  },
  redirects: {
    '/discord': 'https://discord.gg/6tHdeJPB4x',
  },
});