import { defineConfig } from 'astro/config';

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  site: 'https://docs.chocolatey.org',
  server: {
    port: 5086
    // open: "/en-us",
    // host: true
  },
  redirects: {
    '/': '/en-us',
  },
  experimental: {
    contentCollectionCache: true,
  },
  integrations: [mdx()]
});