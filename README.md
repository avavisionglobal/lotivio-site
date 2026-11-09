# lotivio-site

Site vitrine de **Lotivio**, le CRM immobilier développé par Ava Vision pour les agences et promoteurs suisses.
Contexte, cible et règles de contenu : [PROJECT.md](PROJECT.md). Décisions : [docs/decisions-strategie.md](docs/decisions-strategie.md).

## Lancer

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # site statique dans dist/
npm run preview    # sert dist/ en local
npm run images     # régénère les WebP de public/media depuis assets/
```

## Stack

- **Astro 5** (site statique, une page) + `@astrojs/sitemap`
- **GSAP 3.15** : ScrollTrigger, SplitText, ScrambleTextPlugin (plugins gratuits depuis 3.13)
- **Lenis** : défilement doux, synchronisé avec ScrollTrigger
- Polices auto-hébergées (fontsource) : Archivo (titres), Geist, Geist Mono

## Organisation

| Fichier | Rôle |
| --- | --- |
| `src/config.ts` | URL du site, lien vers l'app, page confidentialité, destination des demandes de démo |
| `src/layouts/Base.astro` | `<head>` : SEO, Open Graph, JSON-LD, préchargement des polices |
| `src/pages/index.astro` | Assemble les sections |
| `src/components/Sxx*.astro` | Une section par fichier, nommée comme dans Figma (`S00` … `S11`) |
| `src/scripts/app.ts` | Comportements : trames de code, démos animées, réglages, réservation, film, menu |
| `src/scripts/texhover.ts` | Lentille de code au survol des trames |
| `src/scripts/motion.ts` | Animations GSAP + Lenis (chargé quand le navigateur est libre) |
| `src/styles/global.css` | Styles (issus de la maquette `proofs/a-orbite.html`, purgés) + ajouts de production en fin de fichier |
| `proofs/` | Maquettes HTML de conception (hors site) |

Chaque section et bloc porte un attribut `data-bloc="Sxx.n"` identique au nom du calque Figma, pour retrouver un élément quand Diego demande une modification.

## Animations

Niveau visé : fourmula.ai et meotis.ch.

- Défilement doux (Lenis) ; ancres internes animées.
- Premier écran : entrée en CSS (titre, sous-titre, boutons, fenêtre de l'app), sans attendre le JavaScript.
- Titres révélés ligne par ligne sous masque (SplitText) ; labels « décodés » (ScrambleText).
- Blocs révélés par lots, compteur « 4 h », tuiles de la file, collages en parallaxe (S03).
- S04 : la ligne active s'allume au défilement.
- S06 : panneaux empilés ; le précédent recule et s'assombrit.
- S07 : piste horizontale pilotée par le défilement ; les cartes se redressent en entrant.
- S07B : les porte-clés viennent se suspendre au tableau.
- S08.3 : l'éventail de brochures s'ouvre.
- S10 : la carte se redresse.
- S11 : le footer se révèle sous la page ; « lotivio. » monte lettre par lettre.
- Navigation masquée en descendant, boutons magnétiques, menu animé.
- Trames de code : au survol de la souris, une lentille fait réapparaître le code sous le pointeur, sur toute la surface du bloc (`src/scripts/texhover.ts`). Les lentilles sont préparées en temps libre à l'approche du bloc ; rien n'est construit pendant le défilement. Pas d'effet au toucher.

Avec `prefers-reduced-motion`, rien n'est animé : Lenis est coupé, S07 devient une piste à faire défiler et S07B une grille statique.

## Espacements

Une seule échelle, définie en fin de `global.css` (« Rythme vertical ») : `--sp-sec` entre deux sections (150 à 210 px sur grand écran, 120 px sur tablette, 96 px sur mobile) et `--sp-head` entre un titre et son contenu (60 à 90 px, 48 px, 40 px). Pour modifier le rythme, changer ces deux variables plutôt que des marges isolées.

## Réservation de démo (S10) — à brancher

Le formulaire se fait en deux étapes : un jour et une heure, puis les coordonnées. Copier `.env.example` en `.env` et renseigner **une** des deux variables :

- `PUBLIC_DEMO_ENDPOINT` : URL qui reçoit un `POST` JSON `{ name, email, agency, phone, date, time, timezone, source }` (webhook n8n, Make, API…).
- `PUBLIC_DEMO_EMAIL` : sans endpoint, le bouton ouvre un e-mail prérempli vers cette adresse. Le lien « Écrire à l'équipe » utilise aussi cette adresse.

Sans aucune des deux, le formulaire indique honnêtement que la réservation en ligne n'est pas encore active.

## Mesures (9 novembre 2026, build local)

Lighthouse 12, première visite (intro jouée) :

- **Bureau** : performance 100, accessibilité 95, bonnes pratiques 96, SEO 100. FCP 0,3 s, LCP 0,6 s, TBT 0 ms, CLS 0.
- **Mobile, bridage réel** (devtools, 4G et CPU ×4) : performance 95 à 97, accessibilité 96, bonnes pratiques 100, SEO 100. FCP et LCP 1,2 à 1,3 s, TBT 150 à 240 ms, CLS 0,04.
- **Poids de la page** : 411 Ko (809 Ko avant optimisation, hors film chargé à la demande).
- **Défilement** (14 s à la molette, 120 Hz) : 99 % des images sous 10 ms, pire image 26 ms.
- **Largeurs vérifiées** : 320, 360, 414, 768, 834, 1024, 1280, 1440 et 1920 px, sans défilement horizontal.

Ce qui fait la vitesse (à préserver) :
- le CSS est intégré dans la page (`inlineStylesheets: 'always'`) ;
- les trames de code sont dessinées dans des canvas (`src/scripts/ascii.ts`), jamais pendant le défilement ;
- les images servent en 480 px là où l'affichage est petit (intro, tuiles, trames) et les logos à leur taille ×2 (`npm run images`) ;
- les apparitions sont des transitions CSS ; GSAP ne gère que les effets liés au défilement ;
- `motion.js` et tout ce qui est sous la ligne de flottaison s'initialisent en temps libre ;
- l'intro ne se joue qu'une fois par visite (sessionStorage).

Écart d'accessibilité connu : le texte blanc sur l'orange de marque #EB6E2C (bouton du hero) a un contraste de 3:1, sous le seuil AA de 4,5:1.

## Mise en ligne

Pas encore faite (« local d'abord »). Le domaine `lotivio.ch` est à confirmer dans `astro.config.mjs` et `src/config.ts`.
