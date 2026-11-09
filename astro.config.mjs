import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Domaine définitif à confirmer (lotivio.ch ?). Sert au sitemap et aux balises canoniques.
export default defineConfig({
  site: 'https://lotivio.ch',
  integrations: [sitemap()],
  build: { inlineStylesheets: 'auto' },
  compressHTML: true,
});
