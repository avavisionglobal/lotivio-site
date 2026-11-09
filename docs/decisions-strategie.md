# Lotivio Site — Journal des décisions de stratégie

Une entrée par décision, la plus récente en haut. Ce journal fait foi en cas de contradiction avec les autres documents du dossier. Statuts : `décidée`, `proposition à valider`, `à tester`.

Format d'une entrée :

```
## AAAA-MM-JJ — Titre court
- Décision :
- Raison :
- Remplace / modifie :
- Statut :
- Source :
```

---

## 2026-11-09 — Retour sur les pistes : hero B + « Ce que Lotivio fait » de A ; A et B prolongées
- Décision : Diego préfère le premier écran de B avec sa trame de code ASCII, et la section « Ce que Lotivio fait » de la piste A (bento de captures). Les pistes A et B sont développées jusqu'au footer (v2, Figma nodes 8:2 et 9:2). La piste C n'est pas poursuivie.
- Raison : retour de Diego (« le hero B et aussi les petits bouts de code derrière c'est ma section préférée » ; « Ce que Lotivio fait dans la piste A » ; « continue de développer la section A et B »).
- Remplace / modifie : le choix entre trois pistes ; l'assemblage final (hero B + bento A) reste à confirmer.
- Statut : décidée (préférences) ; page finale : proposition à valider.
- Source : conversation Diego / Claude Code, 9 novembre 2026.

## 2026-11-09 — Trois pistes des premières sections, importées dans Figma
- Décision : trois variantes A Orbite, B Atelier, C Paysage (`proofs/`, détail dans `proofs/README.md`), importées dans le fichier Figma Lotivio, page « WebDesign » (nodes 4:2, 5:2, 6:2). Aucune image générée : résidence de la démo, photo du film et captures de l'app réutilisées.
- Raison : demande de Diego (« 2-3 variantes de LP avec les 2-3 premières sections », puis « crée-moi ceci dans le lien Figma »).
- Remplace / modifie : rien.
- Statut : proposition à valider (choix d'une piste attendu).
- Source : conversation Diego / Claude Code, 9 novembre 2026.

## 2026-11-09 — DA : 1600.agency + Fourmula ; structure v1 proposée
- Décision : la direction artistique s'appuie sur deux références, https://www.1600.agency/ et https://fourmula.ai. Structure de la landing page proposée dans `docs/structure-lp-v1.md` : squelette de Fourmula, détails de 1600, contenus du script v0. Fichier Figma du projet : https://www.figma.com/design/9QMY3loAtT7Sw4WEBdY6HU/Lotivio (page « WebDesign », vide au 9.11).
- Raison : choix de Diego après les listes One Page Love. Les autres candidates de `refs/opl-shortlist.md` ne sont pas retenues.
- Remplace / modifie : la référence dominante unique 1600.agency (Fourmula s'ajoute pour la structure).
- Statut : DA décidée ; structure : proposition à valider.
- Source : conversation Diego / Claude Code, 9 novembre 2026.

## 2026-11-09 — Positionnement : CRM sur mesure, IA au centre
- Décision : le site présente Lotivio comme un CRM immobilier mis en place sur mesure pour chaque agence (sa façon de travailler, ses outils) et dont l'IA est un rôle majeur. À mettre en avant : connexion à WhatsApp pour envoyer les brochures automatiquement, assistant vocal pour les comptes rendus de rendez-vous, assistants IA sur mesure qui répondent aux questions des prospects, réglages faits avec l'agence.
- Raison : demande de Diego. Vérification du code (`origin/main` `ccf782ff`) : la dictée vocale existe (compte rendu dicté après une visite ou un appel, brouillon à confirmer) ; Max répond avec les fiches projet et des consignes propres à l'agence ; l'envoi WhatsApp automatique ne concerne que les leads Meta Ads ; WhatsApp passe par un numéro professionnel (Twilio), pas par le WhatsApp personnel de l'agent.
- Remplace / modifie : complète « Le CRM immobilier propulsé par l'IA » (film, 3.10.2026).
- Statut : décidée (positionnement) ; formulations : proposition à valider, `docs/script-v0.md`.
- Source : conversation Diego / Claude Code, 9 novembre 2026.

## 2026-11-09 — « 4 h gagnées » autorisé sur le site
- Décision : le site peut afficher le gain de temps de 4 h. Formulation proposée : « Jusqu'à 4 h gagnées par semaine et par agent », reprise de la fiche Masini du site Contrast (`SITE/src/data/cases.ts`).
- Raison : choix de Diego (« Alors oui 4h gagnée ! »).
- Remplace / modifie : l'interdit du claims gate du film (« 4 h » sans source). Reste à joindre une source écrite (mesure ou estimation de Masini) au dossier.
- Statut : décidée.
- Source : conversation Diego / Claude Code, 9 novembre 2026.

## 2026-11-09 — Références secondaires One Page Love
- Décision : cinq candidates proposées (Vestris, Billow, Congrue, F13, Shelf), détail dans `refs/opl-shortlist.md`.
- Raison : demande de Diego de 4 ou 5 sites CRM / SaaS proches de la DA voulue.
- Remplace / modifie : rien.
- Statut : proposition à valider.
- Source : conversation Diego / Claude Code, 9 novembre 2026.

## 2026-11-09 — 1600.agency, référence dominante
- Décision : https://www.1600.agency/ est la référence dominante du site (fond clair, encre noire, accent orange en point, étiquettes mono, fenêtre sombre comme moment visuel). Fiche : `refs/REF-1600-agency/FICHE.md`.
- Raison : fournie par Diego (« j'aime bien le design et la DA ») ; proche des couleurs et polices de l'app et du film.
- Remplace / modifie : rien.
- Statut : décidée (référence) ; reprise et écarts : proposition à valider.
- Source : conversation Diego / Claude Code, 9 novembre 2026.

## 2026-11-09 — Lancement du site vitrine
- Décision : créer le site vitrine du CRM Lotivio dans `~/brandiamemory/lotivio-site` (dépôt `avavisionglobal/lotivio-site`). Le claims gate du film (`lotivio-motion/BRIEF.md`) s'applique aux textes du site.
- Raison : demande de Diego ; règle « un seul emplacement par dépôt ».
- Remplace / modifie : le clone hors zone `~/lotivio-site` (même dépôt, vide) n'est plus utilisé.
- Statut : décidée.
- Source : conversation Diego / Claude Code, 9 novembre 2026.
