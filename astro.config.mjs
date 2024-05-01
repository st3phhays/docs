import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
    site: 'https://docs.chocolatey.org',
    server: {
        port: 5086,
        open: "/en-us",
        //host: true
    },
    redirects: {
        '/': '/en-us',
    }
});
