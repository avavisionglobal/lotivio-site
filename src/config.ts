// Réglages du site à compléter avant la mise en ligne.
export const SITE = {
  name: 'Lotivio',
  url: 'https://lotivio.ch', // À CONFIRMER
  title: 'Lotivio — Le CRM immobilier développé pour la Suisse',
  description:
    "Portails, Meta Ads, site : vos demandes arrivent dans Lotivio. Envoyez vos e-mails et WhatsApp, retrouvez le suivi de chaque acheteur et voyez quels projets attirent des prospects.",
  appUrl: 'https://app.lotivio.ch', // « Se connecter »
  privacyUrl: 'https://app.lotivio.ch/privacy-policy', // À VÉRIFIER
};

// Réservation de démo : à brancher plus tard (décision du 9.11.2026).
// - endpoint : URL qui reçoit la demande en POST JSON (Lotivio, Cal.com, formulaire…)
// - email : à défaut d'endpoint, la demande s'ouvre dans un e-mail prérempli vers cette adresse
// Les deux vides : le formulaire affiche un message « bientôt disponible ».
export const DEMO = {
  endpoint: import.meta.env.PUBLIC_DEMO_ENDPOINT ?? '',
  email: import.meta.env.PUBLIC_DEMO_EMAIL ?? '',
};
