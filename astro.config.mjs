// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import sitemap from '@astrojs/sitemap';
import keystatic from '@keystatic/astro';
import node from '@astrojs/node';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://somosyoung.vc',
  // Public pages are prerendered to static HTML (great SEO + speed).
  // The Keystatic admin (/keystatic) is rendered on demand via the Node adapter.
  output: 'static',
  adapter: node({ mode: 'standalone' }),
  integrations: [react(), markdoc(), keystatic(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
    ssr: {
      // lucide-react ships CommonJS; let Vite bundle it so named icon
      // exports resolve correctly during server rendering.
      noExternal: ['lucide-react'],
    },
  },
});
