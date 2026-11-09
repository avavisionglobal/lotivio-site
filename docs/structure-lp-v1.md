# Structure de la landing page Lotivio — v1 (9.11.2026)

Statut : proposition à valider. Squelette de Fourmula, détails de 1600.agency, contenus du `script-v0.md`, couleurs et polices de l'app.

Répartition des deux références :
- **Fourmula** donne le squelette : premier écran avec objet central, bento, liste typographique, panneaux d'étapes pleine largeur, FAQ.
- **1600.agency** donne les détails : fond gris chaud au lieu du blanc pur, étiquettes Geist Mono sur filet, point orange, cartes au trait pour la mise en place, chiffre héros avec point, FAQ en deux colonnes, footer noir.

| # | Section | Mécanisme (réf.) | Contenu Lotivio | Décision du visiteur |
|---|---|---|---|---|
| 0 | Navigation | Pilule de menu centrale (Fourmula) | Logo Lotivio · pilule « Produit · IA · Mise en place · Questions » · bouton noir « Réserver une démo » | — |
| 1 | Premier écran | Orbite + titre bicolore en bas à gauche (Fourmula) | Au centre, une demande « Nouvelle demande · Nathalie Girard » ; autour, les sources en orbite (Homegate, immobilier.ch, Properstar, Meta, votre site, WhatsApp, e-mail). Titre : « Vos acheteurs écrivent partout. » (noir) / « Lotivio les suit tous. » (gris). Sous-titre court + bouton. Étiquette mono `CRM IMMOBILIER · SUISSE ROMANDE` | « C'est pour mon métier, et ça règle mon problème de demandes éparpillées » |
| 2 | Chiffre | Chiffre héros avec point orange (1600) | Bande : « Jusqu'à 4 h. » + `GAGNÉES PAR SEMAINE ET PAR AGENT` | « Le gain vaut une démo » |
| 3 | Ce que Lotivio fait | Grand titre deux lignes + bento 3 cartes (Fourmula) | Titre : « Toutes vos demandes. / Un seul endroit. » Carte large : écran Demandes reçues avec badges de source. Demi-carte : conversation WhatsApp de Max avec la brochure. Demi-carte : dictée vocale qui devient une fiche | « Je vois l'outil, pas une promesse » |
| 4 | L'IA | Liste typographique qui pâlit (Fourmula) | « L'IA qui » / qualifie vos acheteurs sur WhatsApp / répond à leurs questions sur vos projets / remplit vos fiches à la voix / rédige vos descriptions de lots. En dessous, une ligne mono : consentement, STOP, pause par contact, brouillons à valider | « L'IA travaille pour moi, et je garde la main » |
| 5 | Parcours d'une demande | 4 panneaux pleine largeur numérotés (Fourmula) | Titre : « Du portail à la vente, en quatre étapes. » 01 Arrive seule · 02 Qualifiée · 03 Relancée · 04 Vendue. Chaque panneau : deux puces, un écran réel (Demandes, fiche, Relance, Pipeline). Couleur du panneau = couleur du statut dans l'app : orange `#E8762D`, violet Qualifié `#AD46FF`, bleu `#276EF1`, vert Vendu `#0E8345`, en aplats | « Je comprends le trajet complet » |
| 6 | Sur mesure | 4 cartes au trait, étiquettes mono (process de 1600) | Titre : « Construit autour de votre agence. » Atelier · Branchements · Réglages · Mise en route | « Ce n'est pas un logiciel de plus à apprendre » |
| 7 | Publier, vendre, piloter | Bento de 3 cartes (Fourmula) | Diffusion (Homegate, immobilier.ch, Properstar, votre site) · PDF de vente avec suivi des clics · Vue d'ensemble (stock, pipeline, CHF réservés et vendus) | « Ça remplace aussi mes autres outils » (direction) |
| 8 | Preuve | Cartes clients (Fourmula) ou témoignage (1600) | Masini (pilote) et Procité, **seulement avec leur accord**. Sans accord : section retirée, le chiffre de la section 2 reste | « D'autres agences romandes l'utilisent » |
| 9 | Questions | FAQ deux colonnes : titre + carte contact à gauche (1600) | Données (UE, Francfort), portails couverts, WhatsApp personnel ou pro, délai de mise en place, prix, Outlook | Objections levées |
| 10 | Fin + footer | Appel final + footer noir (1600), trame de points (Fourmula) | « Voyons comment votre agence travaille. » + « Réserver une démo » + contact direct | Prendre rendez-vous |

## Points de vigilance

- Le texte blanc sur le violet `#AD46FF` est sous le contraste AA pour du petit texte : grands titres seulement sur ce panneau, ou violet plus sombre. À vérifier dans les pistes.
- Section 4 : « vous dit qui relancer » et le score de matching sont des règles, pas l'IA. Ils vont en section 5, pas dans la liste « L'IA qui ».
- Sections 3 et 5 montrent toutes deux des écrans. La 3 montre trois fonctions, la 5 le trajet d'une seule demande. Si les pistes montrent un doublon, fusionner la carte « Demandes reçues » avec l'étape 01.

## Suite

1. Validation de cette structure.
2. Deux pistes du premier écran et du panneau d'étape 02, desktop 1440 et mobile 390, dans `proofs/`. Piste A : fond blanc à la Fourmula, orbite. Piste B : fond gris chaud à la 1600, fenêtre sombre avec le film.
3. La piste retenue va dans Figma (fichier « Lotivio », page « WebDesign », vide au 9.11.2026), puis dans le code.
