import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://manifestkit.cc.cd',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()]
  },
  output: 'server',
  adapter: vercel({
    webAnalytics: {
      enabled: true
    }
  })
});