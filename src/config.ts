// Réglages du site à compléter avant la mise en ligne.
export const SITE = {
  name: 'Lotivio',
  url: 'https://lotivio.ch', // À CONFIRMER
  title: 'Lotivio — Le CRM immobilier développé pour la Suisse',
  description:
    "Portails, Meta Ads, site : vos demandes arrivent dans Lotivio. Envoyez vos e-mails et WhatsApp, retrouvez le suivi de chaque acheteur et voyez quels projets attirent des prospects.",
  appUrl: 'https://app.lotivio.ch', // « Se connecter »
  privacyUrl: '/confidentialite/', // politique du site vitrine (celle de l'app : LEGAL.appPrivacyUrl)
  legalUrl: '/mentions-legales/',
};

// Éditeur du site : identité reprise de la politique de confidentialité de l'app
// (ava-crm, src/app/privacy-policy/page.tsx). ide et forme : à compléter par Diego (vides = non affichés).
export const LEGAL = {
  company: 'Penaloza Lopez Vision',
  brand: 'Ava Vision',
  street: 'Rue de l’hôpital 8a',
  zip: '2024',
  city: 'La Grande-Béroche',
  country: 'Suisse',
  email: 'info@ava-vision.com',
  ide: '', // ex. CHE-123.456.789
  form: '', // ex. raison individuelle, Sàrl
  host: 'Vercel Inc., États-Unis',
  appPrivacyUrl: 'https://app.lotivio.ch/privacy-policy',
  updated: '12 novembre 2026',
};

// Réservation de démo : à brancher plus tard (décision du 9.11.2026).
// - endpoint : URL qui reçoit la demande en POST JSON (Lotivio, Cal.com, formulaire…)
// - email : à défaut d'endpoint, la demande s'ouvre dans un e-mail prérempli vers cette adresse
// Les deux vides : le formulaire affiche un message « bientôt disponible ».
export const DEMO = {
  endpoint: import.meta.env.PUBLIC_DEMO_ENDPOINT ?? '',
  email: import.meta.env.PUBLIC_DEMO_EMAIL ?? '',
};
