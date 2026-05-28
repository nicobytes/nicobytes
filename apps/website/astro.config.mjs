// @ts-check

import mdx from "@astrojs/mdx";
import partytown from "@astrojs/partytown";
import compressor from "astro-compressor";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";
import remarkGfm from "remark-gfm";

import tailwindcss from "@tailwindcss/vite";

import icon from "astro-icon";

const shikiConfig = {
  theme: /** @type {'night-owl'} */ ("night-owl"),
  wrap: false,
};

export default defineConfig({
  site: "https://nicobytes.com",
  trailingSlash: "always",
  integrations: [
    mdx({
      shikiConfig,
      gfm: false,
    }),
    partytown({
      config: {
        forward: ["dataLayer.push"],
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
    syntaxHighlight: "shiki",
    shikiConfig,
  },
  vite: {
    plugins: [tailwindcss()],
  },
  redirects: {
    "/discord": "https://discord.gg/6tHdeJPB4x",
    // Blog image redirects
    "/blog/how-to-use-whisper/cover.jpg": "/blog/how-to-use-whisper/",
    "/blog/how-to-use-whisper/terminal_1.jpg": "/blog/how-to-use-whisper/",
    "/blog/how-to-use-whisper/screen_3.jpg": "/blog/how-to-use-whisper/",
    "/blog/observables-to-signals/79-blog.jpg":
      "/blog/observables-to-signals-using-to-signal/",
    "/blog/observables-to-signals/code_1.jpg":
      "/blog/observables-to-signals-using-to-signal/",
    "/blog/responsive-views/og.jpg":
      "/blog/responsive-views-in-angular-with-defer/",
    "/blog/responsive-views/resposive_desktop.jpg":
      "/blog/responsive-views-in-angular-with-defer/",
    "/blog/responsive-views/resposive_mobile.jpg":
      "/blog/responsive-views-in-angular-with-defer/",
    "/blog/responsive-views/screen_1.png":
      "/blog/responsive-views-in-angular-with-defer/",
    "/blog/responsive-views/screen_2.png":
      "/blog/responsive-views-in-angular-with-defer/",
    "/blog/responsive-views/chart.png":
      "/blog/responsive-views-in-angular-with-defer/",
    "/blog/private-in-js/80-blog.jpg": "/blog/private-in-javascript/",
    // Portfolio image redirects
    "/portfolio/chat_ada.jpg": "/portfolio/platzi-ai-chat/",
    "/portfolio/chat_ada_code.jpg": "/portfolio/platzi-ai-chat/",
    "/portfolio/chat_ada_themes.jpg": "/portfolio/platzi-ai-chat/",
    "/portfolio/chat_ada_classes.jpg": "/portfolio/platzi-ai-chat/",
    "/portfolio/playground.jpg": "/portfolio/platzi-playground/",
    "/portfolio/playground_py.jpg": "/portfolio/platzi-playground/",
    "/portfolio/playground_sql.jpg": "/portfolio/platzi-playground/",
    "/portfolio/playground_js.jpg": "/portfolio/platzi-playground/",
    "/portfolio/fake_api.jpg": "/portfolio/platzi-fake-api/",
    "/portfolio/fake_api_docs.jpg": "/portfolio/platzi-fake-api/",
    "/portfolio/fake_api_rest.jpg": "/portfolio/platzi-fake-api/",
    "/portfolio/fake_api_graphql.jpg": "/portfolio/platzi-fake-api/",
    "/portfolio/fake_api_products.jpg": "/portfolio/platzi-fake-api/",
    "/portfolio/fake_api_projects.jpg": "/portfolio/platzi-fake-api/",
    "/portfolio/placement_test.jpg": "/portfolio/platzi-placement-test/",
    "/portfolio/placement_test_questions.jpg":
      "/portfolio/platzi-placement-test/",
    "/portfolio/placement_test_audio.jpg": "/portfolio/platzi-placement-test/",
    "/portfolio/placement_test_lp.jpg": "/portfolio/platzi-placement-test/",
    "/portfolio/chatbot_cover.jpg": "/portfolio/appointment-chatbot/",
    "/portfolio/chatbot.jpg": "/portfolio/appointment-chatbot/",
    "/portfolio/chatbot_whatsapp.jpg": "/portfolio/appointment-chatbot/",
    "/portfolio/chatbot_conversations.jpg": "/portfolio/appointment-chatbot/",
    "/portfolio/chatbot_score.jpg": "/portfolio/appointment-chatbot/",
    "/portfolio/chatbot_pwa.jpg": "/portfolio/appointment-chatbot/",
    "/portfolio/real_estate_cover.jpg": "/portfolio/real-estate/",
    "/portfolio/real_estate.jpg": "/portfolio/real-estate/",
    "/portfolio/real_estate_mobile.jpg": "/portfolio/real-estate/",
    "/portfolio/real_estate_board.jpg": "/portfolio/real-estate/",
    "/portfolio/real_estate_pro.jpg": "/portfolio/real-estate/",
    "/portfolio/duety_cover.jpg": "/portfolio/duety/",
    "/portfolio/duety_phone.jpg": "/portfolio/duety/",
    "/portfolio/duety_screenshots.jpg": "/portfolio/duety/",
    "/portfolio/duety_blue.jpg": "/portfolio/duety/",
    "/portfolio/duety_rose.jpg": "/portfolio/duety/",
    "/portfolio/lulla-ai.jpg": "/portfolio/lulla-ai/",
    "/portfolio/lulla_ai_night_mode.jpg": "/portfolio/lulla-ai/",
    "/portfolio/lulla_ai_logs.jpg": "/portfolio/lulla-ai/",
    "/portfolio/fantito.jpg": "/portfolio/fantito/",
    "/portfolio/ng-ecommerce.jpg": "/portfolio/ng-ecommerce/",
  },
});
