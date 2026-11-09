# PROJECT.md — Site vitrine Lotivio

Contrat de projet (modèle `contrast-web-creation/references/project-contract.md`). Les champs marqués **À DÉCIDER** sont des propositions, pas des décisions.

## État

- Version 0.1 · 9 novembre 2026 · stade : sources et références. Aucun rendu.
- Demande de Diego (9.11) : s'imprégner du CRM, préparer le dossier, proposer 4–5 références One Page Love. Référence fournie : https://www.1600.agency/ (un deuxième lien annoncé, non reçu).
- Prochaine étape : choix des références secondaires, réponses aux questions bloquantes, puis deux pistes du premier écran dans `proofs/`.

## Produit (faits vérifiés)

Lotivio est le CRM immobilier SaaS d'Ava Vision pour les promoteurs et les agences : app sur `app.lotivio.ch`, code dans `~/brandiamemory/ava-crm` (clone local au 27.10.2026, commit `a9218011`). Client pilote : Masini Groupe. Deuxième client : Procité (contrat CT-7759 du 26.10.2026).

Ce que l'app fait aujourd'hui (claims gate du film, `~/brandiamemory/lotivio-motion/BRIEF.md`, vérifié dans le code les 2 et 3.10.2026) :

| Capacité | Écran réel | Limite à respecter |
|---|---|---|
| Demandes centralisées : Meta Lead Ads, formulaire du site, Homegate/ImmoScout24 (SMG), immobilier.ch, Properstar | Demandes reçues | Dire « arrivent seules », jamais « plus aucune saisie » |
| Max, assistant WhatsApp IA : premier message, brochure, critères (pièces, zone, budget), passe en « Qualifié », gère le STOP | Fiche contact, tiroir Demandes | Seulement pour les leads Meta Ads ; consentement requis |
| Conversations WhatsApp du numéro pro dans la fiche | Fiche, tiroir Demandes | Pas les WhatsApp personnels ; réponse dans la fenêtre de 24 h |
| Matching lot ↔ acheteur, score sur 100 (Budget 25, Zone 25, Type 15, Surface 15, Pièces 10, Chambres 5, Étage 5), « Pourquoi ce score ? » | Matching | Le score est une règle, pas l'IA (seul le commentaire est IA) |
| Relances priorisées : « N relances à traiter », Relancer / Retour reçu / Traité ; signaux (brochure consultée 3×) | Aujourd'hui, Relance (/pilotage) | Priorisation et « Chaud » = règles, pas l'IA |
| PDF de vente générés : brochure projet, disponibilités, fiche lot ; suivi des clics | Catalogue, projet | Seuls les clics du lien brochure sont suivis, pas les ouvertures d'e-mails |
| Diffusion : publier sur le site, diffuser sur Homegate, immobilier.ch, Properstar | Panneau Diffusion du projet | Activée organisation par organisation |
| Stock (Disponible / Réservé / Vendu), Pipeline (Qualifié → Réservation → Notaire → Vendu), Vue d'ensemble (KPI, funnel) | Catalogue, Pipeline, Vue d'ensemble | — |
| IA (OpenAI) : Max, commentaires de matchs, import de PDF, descriptions de lots, SEO, brouillons de campagne, analyses projet | divers | « Résumé IA » de la fiche = gabarit, ne pas le vendre comme IA |
| Dictée vocale (depuis le 19.10.2026) : l'agent dicte son compte rendu après une visite ou un appel ; transcription puis extraction (contact, bien, visite, intérêt, objections, critères, relance) ; brouillon à confirmer avant enregistrement | Bouton « Dicter » au centre de la barre mobile | C'est un compte rendu dicté, pas l'enregistrement du rendez-vous ; activée agence par agence |
| Réponses de Max aux questions des prospects à partir des fiches projet de l'agence et de consignes propres à l'agence (`ai_custom_instructions`) | Réglages organisation | Mêmes limites que Max ; d'autres assistants = travail sur mesure |
| Réglages faits avec l'agence à la mise en place : premier contact automatique ou validé par l'agent, brochure par WhatsApp ou e-mail, relance | Présentation démo, chapitre « sur-mesure » | Pas en libre-service ; certains réglages encore globaux (5.10.2026) |

Vérification du 9.11.2026 sur `origin/main` `ccf782ff` (dictée, base de connaissances). Le reste date du 2–3.10.2026.

Interdits de promesse : aucune hausse de taux de vente, aucune durée de réponse chiffrée. Le « 4 h » est autorisé par Diego le 9.11.2026 (voir journal). Positionnement : « Le CRM immobilier propulsé par l'IA » (film, 3.10.2026), complété le 9.11.2026 par le sur-mesure (voir journal).

## Public, offre, action

- Public prioritaire : directeurs d'agence et promoteurs en Suisse romande (décision du film). Secondaire : responsables commerciaux des promotions.
- Offre : abonnement au CRM + mise en place. Repère accepté par Procité : mise en place CHF 4'500 (au lieu de 6'500) + CHF 450 par mois (`CONTRAST/ACQUISITION/Campagne/ICP - Immobilier/abcd-2c-segments-et-prix-marche-2026-10-27.md`). **À DÉCIDER** : afficher un prix public ou non.
- Action principale proposée : « Réserver une démo » (CTA du film). **BLOQUANT** : destination réelle (outil de réservation, formulaire, e-mail ?) et domaine (lotivio.ch ?).
- Provenance du visiteur : **À DÉCIDER**. Hypothèses : film LinkedIn, lien envoyé par Diego après un appel, recherche Google « CRM immobilier Suisse ». Elle fixe la quantité d'explication du premier écran.
- Relation à Contrast : Lotivio est aussi un composant de l'offre immobilière Contrast (« dashboard »). **À DÉCIDER** : le site vend-il Lotivio seul, ou renvoie-t-il aussi vers l'accompagnement Contrast ?

## Sources

- Code et docs de l'app : `~/brandiamemory/ava-crm` (`README.md`, `DESIGN.md`, `docs/DEMO_WELCOME.md`, `docs/LOTIVIO_PERSONNAGES.md`).
- Film de présentation : `~/brandiamemory/lotivio-motion` (`BRIEF.md`, `docs/decisions-strategie.md`, rendus `lotivio_v4_muet.mp4`).
- Offre et prix : `~/brandiamemory/CONTRAST/DOCS/decisions-strategie.md` (27.10.2026), dossier `ICP - Immobilier`.
- Client Procité : `~/brandiamemory/procite/outputs/2026-10-28-atelier-lotivio/README.md`.
- Médias disponibles ici : `assets/brand/lotivio-mark.svg` (logo vectorisé), `assets/ui/` (58 captures d'écrans de l'app, organisation démo « Démo Immobilier NE », données fictives).
- Manquent : témoignage client validé (la citation Masini est « verbatim rédigé, à faire relire »), autorisation d'afficher les logos Masini et Procité, photos.

## Références

- **DA retenue le 9.11.2026 : 1600.agency + Fourmula.** Fourmula donne le squelette (`refs/REF-fourmula/`), 1600 les détails (`refs/REF-1600-agency/`). Les autres candidates One Page Love (`refs/opl-shortlist.md`) ne sont pas retenues.
- Figma : https://www.figma.com/design/9QMY3loAtT7Sw4WEBdY6HU/Lotivio (page « WebDesign », vide au 9.11).
- Structure proposée : `docs/structure-lp-v1.md`.

## Script

`docs/script-v0.md` : structure et messages par section, avec le classement des affirmations. Il remplace le tableau « Décisions par section » ci-dessous dès qu'il est validé.

## Direction (proposition, à confirmer par les pistes)

- Fond gris chaud clair (`#F1F0EC` / `#F7F6F3`), encre `#141414`, orange `#E8762D` seulement en point, mot-clé ou signal, vert `#0E8345` pour « Vendu / Disponible ». Mêmes valeurs que l'app et le film.
- Typographie : grand titre serré (Archivo de l'app ou une grotesque display proche de Nohemi, à trancher dans les pistes), Geist pour le texte, Geist Mono pour les étiquettes et les chiffres (déjà la police des chiffres de l'app, et celle des étiquettes de 1600).
- Le moment visuel dominant : les vrais écrans de Lotivio dans une fenêtre sombre, à la place du lecteur vidéo de 1600 ; le film v4 peut y jouer.
- Explications au trait (lignes fines, points orange) pour le parcours d'une demande, au lieu d'icônes.
- Pas de halo, de dégradé gratuit, de bouton qui pulse ni de mascotte (règles du film).

## Décisions par section (brouillon, à valider avant le code)

| Section | Hésitation avant | Décision après | Ce qui la débloque |
|---|---|---|---|
| Premier écran | « Encore un CRM générique ? » | « C'est fait pour la vente de promotions en Suisse » | Titre sur la situation (demandes éparpillées), écran réel, sources nommées en texte |
| Le parcours d'une demande | « Qu'est-ce que ça change concrètement ? » | « Je vois le trajet portail → qualifié → relancé → vendu » | Écrans Demandes, fiche, Relance, Pipeline |
| IA, ce qu'elle fait et ne fait pas | « L'IA va-t-elle parler à mes clients sans contrôle ? » | « Je sais ce qui est automatique et ce que je valide » | Max, consentement, STOP, `pause_ai` |
| Diffusion et PDF | « Je dois quand même tout ressaisir ailleurs ? » | « Je publie une fois » | Panneau Diffusion, PDF de vente |
| Mise en place et prix | « Combien, et combien de temps pour démarrer ? » | « Je demande une démo » | Prix (si affiché), étapes de mise en place |
| Questions | Données, hébergement, portails couverts | Objections levées | Supabase UE (Francfort), RLS, liste des portails |
| Démo | — | Prendre rendez-vous | Destination réelle du CTA |

## Stack

**À DÉCIDER.** Proposition : Next.js + Tailwind v4, comme l'app, déployé sur Vercel. Aucune publication sans demande.

## Questions ouvertes (une seule bloque : la destination du CTA)

1. Où mène « Réserver une démo » et quel domaine (lotivio.ch) ?
2. Prix public affiché ou « sur demande » ?
3. Lotivio seul, ou passerelle vers l'offre Contrast ?
4. Peut-on citer Masini et Procité (nom, logo, phrase) ?
5. Le deuxième lien de référence annoncé le 9.11.
