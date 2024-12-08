// @ts-check
import { defineConfig } from "astro/config";

import partytown from "@astrojs/partytown";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  // The middleware always wants to check the maintenance status.
  output: "server",
  site: "https://maintenance.gnometeaparty.com",
  trailingSlash: "never",

  integrations: [
    sitemap(),
    partytown(),
    tailwind({
      applyBaseStyles: false,
    }),
  ],

  adapter: vercel(),
});
