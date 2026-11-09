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

Avec `prefers-reduced-motion`, rien n'est animé : Lenis est coupé, S07 devient une piste à faire défiler et S07B une grille statique.

## Réservation de démo (S10) — à brancher

Le formulaire se fait en deux étapes : un jour et une heure, puis les coordonnées. Copier `.env.example` en `.env` et renseigner **une** des deux variables :

- `PUBLIC_DEMO_ENDPOINT` : URL qui reçoit un `POST` JSON `{ name, email, agency, phone, date, time, timezone, source }` (webhook n8n, Make, API…).
- `PUBLIC_DEMO_EMAIL` : sans endpoint, le bouton ouvre un e-mail prérempli vers cette adresse. Le lien « Écrire à l'équipe » utilise aussi cette adresse.

Sans aucune des deux, le formulaire indique honnêtement que la réservation en ligne n'est pas encore active.

## Mesures (9 novembre 2026, build local)

Lighthouse 12 :

- **Bureau** : performance 99, accessibilité 94, bonnes pratiques 100, SEO 100.
- **Mobile, bridage réel** (devtools, 4G et CPU ×4) : performance 87 à 91, LCP 1,9 à 2,1 s, CLS 0,01.

Le mode simulé de Lighthouse annonce un LCP de 4,8 s sur mobile. Le LCP mesuré dans le navigateur est de 0,2 s sans bridage et de 2 s avec bridage réel.

Écart d'accessibilité connu : le texte blanc sur l'orange de marque #EB6E2C (bouton du hero) a un contraste de 3:1, sous le seuil AA de 4,5:1.

## Mise en ligne

Pas encore faite (« local d'abord »). Le domaine `lotivio.ch` est à confirmer dans `astro.config.mjs` et `src/config.ts`.
