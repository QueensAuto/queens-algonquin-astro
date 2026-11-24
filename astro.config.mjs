import { defineConfig } from 'astro/config';
import { setDefaultResultOrder } from 'node:dns';
import sitemap from '@astrojs/sitemap';
import agentMarkdown from './src/integrations/agent-markdown/index.mjs';
import trailingSlash from './src/integrations/trailing-slash/index.mjs';
import agentSkills from './src/integrations/agent-skills/index.mjs';

setDefaultResultOrder('ipv4first');

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://queensautoservices.com',
  integrations: [
    // Runs first so the markdown twins get the slashed links too.
    trailingSlash(),
    // Writes /.well-known/agent-skills/index.json from the SKILL.md files.
    agentSkills(),
    // Writes a markdown twin (index.md) next to every built page for AI
    // agents; functions/_middleware.ts serves it on Accept: text/markdown.
    agentMarkdown({
      exclude: [/^\/customer-details/, /^\/schedule-/, /^\/thank-you/, /^\/coming-soon/, /^\/tireflow-test/]
    })
  ],
  devToolbar: {
    enabled: false
  },
  build: {
    // Inline page CSS into the HTML so the first paint doesn't wait on
    // separate render-blocking stylesheet requests.
    inlineStylesheets: 'always'
  },
  vite: {
    plugins: [tailwindcss()],
    // Ensure proper MIME type association for videos
    assetsInclude: ['**/*.mp4', '**/*.webm']
  }
});