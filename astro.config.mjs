import { defineConfig } from 'astro/config';
import { setDefaultResultOrder } from 'node:dns';
import sitemap from '@astrojs/sitemap';

setDefaultResultOrder('ipv4first');

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://queensautoservices.com',
  integrations: [],
  devToolbar: {
    enabled: false
  },
  vite: {
    plugins: [tailwindcss()],
    // Ensure proper MIME type association for videos
    assetsInclude: ['**/*.mp4', '**/*.webm']
  }
});