# AGENTS.md — Lotivio, site vitrine

> Instructions pour Codex. Miroir de `CLAUDE.md` (Claude Code) : modifier les deux ensemble.
> Dernière mise à jour : 9 novembre 2026 (création).

Lotivio est le CRM immobilier d'Ava Vision (app `app.lotivio.ch`, code `~/brandiamemory/ava-crm`). Ce dossier contient son site vitrine : projet interne, pas un mandat client.

## Lecture

1. `docs/decisions-strategie.md` : journal des décisions, le plus récent en haut. Il fait foi.
2. `PROJECT.md` : contrat de projet (produit, public, offre, références, direction, décisions par section, questions ouvertes).
3. `refs/` : référence dominante 1600.agency (fiche + captures) et candidates One Page Love.

Méthode : skill `contrast-web-creation` (porte de conception), `contrast-web-ingestion` pour les sources, `contrast-web-copywriting` pour les textes. Les pistes vivent dans `proofs/` ; la piste retenue se reconstruit dans la stack du site.

## Règles de vérité

- Le claims gate de `~/brandiamemory/lotivio-motion/BRIEF.md` s'applique au site. Résumé dans `PROJECT.md`, section « Produit ».
- « Chaud », la priorisation des relances et le score de matching sont des règles, pas l'IA. Max (WhatsApp) ne traite que les leads Meta Ads. La diffusion sur les portails s'active organisation par organisation.
- « Jusqu'à 4 h gagnées par semaine et par agent » est autorisé (décision du 9.11.2026). Aucun autre chiffre (hausse des ventes, délai de réponse) sans source écrite.
- Captures d'écran : organisation démo uniquement (données fictives). Jamais de donnée réelle de Masini ou de Procité.
- Logos et noms de clients seulement avec leur accord écrit.
- Publication, déploiement et génération payante : sur demande explicite de Diego.

## Enregistrement des décisions

Toute décision (public, offre, CTA, référence, section, texte affiché, stack) s'ajoute à `docs/decisions-strategie.md` avec date, décision, raison, ce qu'elle remplace, statut et source.

## Organisation

- `assets/brand/` : logo Lotivio (SVG vectorisé depuis l'app), icône.
- `assets/ui/` : captures d'écrans de l'app (démo), reprises de `lotivio-motion/ui/`.
- `refs/` : références analysées. `proofs/` : pistes de design.

Les préférences globales de Diego (`~/.claude/CLAUDE.md`) s'appliquent.
