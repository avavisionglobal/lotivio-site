# Lot lotivio-S03-illustrations · v1 · 11.11.2026 · statut : en fabrication

**Demande de Diego (citée).** « illustrations qui sont dans les trois blocs, en fait, je souhaite des choses différentes. Est-ce que tu peux me faire deux variantes, vraiment bien faites, un petit peu comme en bande dessinée, et un autre quelque chose de différent et qui sont en rapport aussi avec un petit peu toute la DA du site internet ! »

**Usage.** Illustrations des trois cartes de S03 « Ce que Lotivio fait » du site Lotivio : Demandes reçues, Assistant WhatsApp, Dictée vocale. Format paysage 3:2 (1536 × 1024), affiché en haut de carte.

**Mode.** Exploration à deux variantes ; les trois sujets sont identiques d'une variante à l'autre.

| Variante | Direction | Raison |
|---|---|---|
| A · BD | Ligne claire européenne, aplats, contours encre réguliers, palette du site (blanc cassé chaud, gris chauds, encre, une seule couleur vive : orange #EB6E2C) | Demande « comme en bande dessinée » |
| B · Circuit au trait | Isométrique au trait fin, monochrome encre sur gris chaud clair, objets reliés par des fils à coins arrondis, points orange aux connexions | DA du site : fils du hero, « explications au trait (lignes fines, points orange) » de PROJECT.md |

**Interdits.** Aucun texte, aucune lettre, aucun chiffre, aucun logo (pas de logo WhatsApp ni de portail), pas de mascotte ni de robot (règle du film), pas de halo ni de dégradé gratuit.

**Générateur.** GPT Image 2.5 (`gpt-image-2.5-sunburst`, qualité medium, 1536x1024). Illustration sans personne réaliste (règle du 5.10.2026). Coût et identifiants : non fournis par le CLI, notés « inconnu ».

## Fabrication (11.11.2026)

- 6 images générées en un lot, 1536 × 1024 (`generated/`, prompts dans `prompts-gpt.jsonl`), sans retouche.
- Modèle demandé : `gpt-image-2.5-sunburst`, qualité medium. Le CLI n'a pas confirmé le modèle effectivement utilisé.
- Identifiants et coût : inconnus (le CLI ne les renvoie pas).
- Contrôle : aucun faux texte en gros plan (brochure, bulles, check-list), aucun logo, aucune mascotte. Les personnages de la variante A sont dessinés et ne représentent personne de réel.
- Exports : `public/media/s03/{A1,A2,A3,B1,B2,B3}-*-{600,900}.webp`.
- Planches de revue : `PLANCHE-A.jpg`, `PLANCHE-B.jpg`.
- Intégration : S03, variante A par défaut, variante B avec `?illu=trait`.

Statut : livré en local, choix de la variante attendu de Diego.

## Complément du 12.11.2026 : carte « La mise en place se fait avec vous »

- 2 images générées, une par variante, 1536 × 1024 :
  - `A4-miseenplace-bd-gpt-v01.png` ;
  - `B4-miseenplace-trait-gpt-v01.png`.
- Prompts : `prompts-gpt-v2.jsonl`. Planche de revue : `PLANCHE-mise-en-place.jpg`.
- Même modèle demandé (`gpt-image-2.5-sunburst`, qualité medium). Identifiants et coût : inconnus.
- Contrôle : aucun texte, aucun logo. Le tableau mural ne contient que des pictogrammes.
- Les images A3 et B3 (dictée) ne sont plus utilisées sur le site : exports retirés de `public/media/s03/`, originaux conservés dans `generated/`.
