import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Domaine : lotivio.ch (adresse principale, sans www). Sert au sitemap et aux balises canoniques.
// Le sitemap exclut les pages d'essai et d'erreur.
export default defineConfig({
  site: 'https://lotivio.ch',
  trailingSlash: 'ignore',
  integrations: [
    sitemap({
      filter: (page) => !/\/(essai|404)\/?$/.test(new URL(page).pathname),
      lastmod: new Date(),
    }),
  ],
  // CSS intégré dans la page : pas de fichier bloquant à télécharger avant le premier affichage.
  build: { inlineStylesheets: 'always' },
  compressHTML: true,
});
