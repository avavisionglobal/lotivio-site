# Lot footer-crépuscule · v1 · 11.11.2026 · statut : livré dans le site (local), à valider par Diego

**Demande de Diego (citée).** « au niveau du footer, on mette une belle image. Tu peux le faire avec Higgsfield, pas forcément la même image que celle qui s'y joint, mais qu'on s'y rapproche. »

**Référence.** Footer de la capture « Fable » : ciel sombre en haut, horizon orangé, crêtes dans la brume. Reprise de l'ambiance et de la composition seulement.

**Générateur.** Higgsfield Soul Location (`soul_location`), 21:9, recommandé par l'outil pour un décor sans personne. Raison : demande explicite « Higgsfield ».

## Jobs

Coût des 4 variantes : 0,48 crédit (préestimation `get_cost`).

| Variante | Job ID | Fichier |
|---|---|---|
| 1 | `1893eeac-86cf-4c67-a568-43d2574663d6` | `raw-1893eeac.png` |
| 2 | `374c624c-6af9-4acd-9121-e35340cfdf6e` | `raw-374c624c.png` |
| 3 | `cca1d19d-3359-44eb-ab31-f4d5e0942311` | `raw-cca1d19d.png` |
| 4 (**retenue**) | `fc8327c5-8b76-4f36-8158-9545eb6bfdc6` | `raw-fc8327c5.png` |

La variante 4 montre une mer de brouillard sur le Plateau, les Alpes en silhouette et une fine bande orange à l'horizon. Planche de revue : `PLANCHE.jpg`.

## Exports

| Fichier | Taille | Usage |
|---|---|---|
| `public/media/footer/crepuscule-2400.webp` | 78 Ko | grand écran |
| `public/media/footer/crepuscule-1400.webp` | 27 Ko | écran moyen |
| `public/media/footer/crepuscule-m-900.webp` | — | mobile, recadrage centré |

## Contrôle

Aucun texte, aucun filigrane, aucune personne.

## v2 (11.11.2026), suite au retour de Diego : « meilleure qualité et un peu plus lumineuse »

- Agrandissement en 4K avec Higgsfield Upscale (ByteDance) : job `63059e00-5d6c-4e76-91db-e047d479cdce`, 2 crédits. Résultat : 5152 × 2160 px, grain supprimé (`upscale-4k-63059e00.png`).
- Éclaircissement en local avec `eclaircir.cjs` (courbe 0,72, gain 1,06, saturation 1,12), calculé en 16 bits avec un tramage léger pour éviter les bandes dans le ciel (`lumineuse-4k.png`). Un premier essai fait avec la commande gamma de sharp, en 8 bits, créait des bandes : il est écarté.
- Exports :

  | Fichier | Taille |
  |---|---|
  | `public/media/footer/crepuscule-2400.webp` | 151 Ko |
  | `public/media/footer/crepuscule-1600.webp` | 75 Ko |
  | `public/media/footer/crepuscule-m-1000.webp` (mobile) | 43 Ko |

- Le voile sombre du footer est allégé. Le grand « lotivio. » est retiré à la demande de Diego.
