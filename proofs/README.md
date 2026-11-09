# Pistes de design — 9.11.2026

Trois variantes des trois premières sections (premier écran, chiffre « 4 h », « Toutes vos demandes. Un seul endroit. »). Références : Fourmula + 1600.agency. Couleurs et polices de l'app. Proposition, aucune validée.

| Piste | Fichier | Parti pris | Figma |
|---|---|---|---|
| A · Orbite | `a-orbite.html` | Fourmula : fond blanc, sources en orbite autour d'une demande qui change, titre bicolore en bas à gauche, bento de captures | node `4:2` |
| B · Atelier | `b-atelier.html` | 1600 : fond gris chaud, grand titre deux lignes, fenêtre sombre où les demandes arrivent en direct, trame ASCII tirée de la photo de la résidence, cartes au trait | node `5:2` |
| C · Paysage | `c-paysage.html` | Photo de la résidence de démo en carte plein écran, notifications qui arrivent, liste « L'IA qui… » de Fourmula | node `6:2` |

Figma : https://www.figma.com/design/9QMY3loAtT7Sw4WEBdY6HU/Lotivio, page « WebDesign » (calques simples importés depuis le HTML figé à 1440 px, sans composants).

Prévisualiser : `python3 -m http.server 8765` dans ce dossier, puis http://127.0.0.1:8765/a-orbite.html (le fichier ouvert directement ne charge pas la trame ASCII de B).

## Médias

Aucune génération. Assets réutilisés :
- `assets/lake-residence.webp` : résidence de la démo de l'app (`ava-crm/public/demo/`).
- `assets/photo-lac.jpg` : photo du film (`lotivio-motion/assets/photos/photo0.jpg`), sert à la trame ASCII de B.
- `assets/ui-*.png` : captures de l'app, organisation démo, données fictives.
- `assets/lotivio-mark.svg` : logo de l'app.

## Contrôles

- Rendu vérifié à 1440×900 et 390×844 (A et B en mobile ; C en desktop seulement).
- Corrigé pendant la revue : titre de A et B trop grand pour le premier écran, tuiles de A qui chevauchaient la demande centrale, débordement horizontal de A en mobile, lisibilité du texte de C sur la photo.
- Reste à reprendre : C, « 4 h / sem. » puis « gagnées chaque semaine » répète « semaine » ; B, la barre orange de l'illustration hebdomadaire devrait prolonger la barre noire au lieu d'être collée à droite ; mobile de C non vérifié.
