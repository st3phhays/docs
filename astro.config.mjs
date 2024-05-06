import { defineConfig } from 'astro/config';
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
    site: 'https://docs.chocolatey.org',
    // trailingSlash: 'always',
    server: {
        port: 5086
    },
    markdown: {
        syntaxHighlight: false, // Temporarily disable syntax highlighting and rely on Prism.js via choco-theme
    },
    experimental: {
        // contentCollectionCache: true, // This gives wonky results sometimes and it's hard to remember why. Best not to use this option. 
    },
    redirects: {
        // '/docs/chocolatey-faqs': '/en-us/faqs',
        // '/docs/chocolatey-faqs': xref('faqs'),
    },
    integrations: [mdx(), sitemap()]
});