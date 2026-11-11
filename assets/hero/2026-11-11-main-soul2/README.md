# Lot hero-main · v1 · 11.11.2026 · statut : livré dans le site (local), à valider par Diego

**Objet.** Photo du hero du site Lotivio : une main tient l'objet Lotivio. Référence : capture Synais (main qui tient un boîtier), fournie par Diego le 11.11.2026, reprise pour la composition seulement.

**Générateur.** Higgsfield Soul 2.0 (`soul_2`), 3:4, qualité 2k. Raison : photo réaliste d'une personne (règle du 5.10.2026) et demande explicite de Diego (« Higgsfield »).

## Jobs

| Étape | Job ID | Fichier |
|---|---|---|
| Génération, variante 1 | `0120d47a-3a8a-48c5-911b-5e1a22a19d07` | `raw-0120d47a.png` |
| Génération, variante 2 | `78f7d3ce-d93d-4dd2-8fc6-8d1f0fbad12f` | `raw-78f7d3ce.png` |
| Génération, variante 3 | `a98a9777-10f5-4a89-8e0b-10fdaf8ef055` | `raw-a98a9777.png` |
| Génération, variante 4 (**retenue**) | `c31cb2a1-f93f-492b-bc4b-6d4a8a8daac9` | `raw-c31cb2a1.png` |
| Détourage (Higgsfield remove_background) | `d86eb069-9c50-4678-b602-206d62d60b79` | `detoure-d86eb069.png` |

**Coût.** 4 générations : 0,48 crédit (préestimation `get_cost`). Détourage : coût non communiqué par l'outil. Solde avant : 2 037,5 crédits.

**Prompt.** Main à la peau brun moyen, manche en maille anthracite, boîtier carré arrondi noir mat de 7 cm, fine lumière orange sur l'arête basse, face avant vierge (sans logo ni texte), fond papier beige clair, lumière douce venant du haut à gauche (texte complet dans le job).

## Retouches locales (sans génération)

1. `masque.cjs` : l'ombre de la paume était semi-transparente après détourage (opacité 70 à 80 %). L'intérieur de la silhouette est rendu opaque. Les bords adoucis et le petit jour entre le pouce et l'objet restent transparents. → `main-masque-plein.png`
2. `logo.cjs` : le symbole Lotivio officiel (`assets/brand/lotivio-mark.svg`) est gravé sur la face de l'objet, en composition. Il n'a pas été généré. → `main-logo.png`
3. Recadrage 980 × 1828 px (x 330, y 220), puis export WebP 960 et 640 px → `public/media/hero/main-lotivio-*.webp`

## Contrôle

- Main : 5 doigts plausibles, ongles nets, pas de bague.
- Logo : centré, proportions respectées.
- Bords : propres sur fond clair.

La personne est générée : jamais présentée comme une cliente ni comme un témoignage.
