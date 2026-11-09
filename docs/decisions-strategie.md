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

## 2026-11-09 — Trois variantes du hero ; S10 en carte avec module de réservation
- Décision : trois variantes du premier écran proposées (centrée produit, photo + cartes, sombre + code) pour choix de Diego. S10 devient une carte sombre avec module de réservation intégré (réf. meotis.ch, Fourmula, Script Runner).
- Raison : Diego « pas encore satisfait à 100 % » du hero ; demande de retravailler S10 à partir de fourmula.ai, meotis.ch et scriptrunner.ai.
- Point ouvert : le module de réservation n'est relié à rien. Il faut l'outil de prise de rendez-vous réel (destination du CTA, toujours ouverte).
- Statut : proposition à valider.
- Source : conversation Diego / Claude Code, 9 novembre 2026. Figma : 36:2 (variantes), 35:2 (S10 dans la v6).

## 2026-11-09 — Fin de page : appel final centré et footer orange révélé au défilement
- Décision : S10 devient un appel final centré avec bouton orange ; S11 devient un footer orange fixé sous la page, révélé au défilement, avec « lotivio. » en lettres géantes. S12 et S13 sont intégrées au footer.
- Raison : demande de Diego (« Le footer je souhaite comme ceci », « on ne voit pas le bloc orange et c'est lorsqu'on scrolle qu'il apparaît »), réf. scriptrunner.ai.
- Statut : proposition à valider.
- Source : conversation Diego / Claude Code, 9 novembre 2026. Figma : nodes 31:2 et 32:2 dans la v6 (22:2).

## 2026-11-09 — #EB6E2C couleur de marque du site, avec mesure ; Figma modifié sur place
- Décision : #EB6E2C devient la couleur de marque du site (remplace #E8762D). Usage dosé selon les références : étiquettes de section, point final de trois titres, bouton de l'appel final, survols, signes de la FAQ, panneau S06.1, section S07B. Le reste reste noir et gris. Le tableau à clés de S07B est enrichi (barre en bois, plaquettes en laiton, crochets vides, marque sur les porte-clés).
- Les mises à jour Figma se font désormais dans la frame existante, sans en créer de nouvelles.
- Raison : demandes de Diego (« cette couleur EB6E2C, la représenter un peu mieux au fil du site, mais pas partout, trouver le juste milieu » ; « arrêter de refaire à chaque fois des frames, modifie dans l'existant »).
- Statut : couleur décidée ; dosage : proposition à valider.
- Source : conversation Diego / Claude Code, 9 novembre 2026. Figma node 22:2.

## 2026-11-09 — S07B : tableau à clés à la place des gélules
- Décision : la section « Pourquoi maintenant ? » garde son mécanisme (objets dispersés qui s'alignent au défilement) mais remplace les gélules par des porte-clés d'agence qui se suspendent à un tableau à clés. Chiffres inchangés.
- Raison : retour de Diego (« mettre des pilules n'est pas top pour de l'immobilier »). Le porte-clés est un objet du quotidien d'une agence.
- Remplace / modifie : la version gélules du 9.11 (archivée dans proofs/archive/a-orbite-v5.html).
- Statut : proposition à valider.
- Source : conversation Diego / Claude Code, 9 novembre 2026. Figma node 22:2.

## 2026-11-09 — S07 façon Script Runner, vrais logos des sources, CTA « Pourquoi maintenant »
- Décision : S07 Mise en place devient une rangée de cinq cartes à défilement horizontal (réf. section « Offerings » de scriptrunner.ai). Les vrais logos des portails, de Meta et de WhatsApp remplacent les noms dans « Sources branchées ». Ajout d'une section S07B après S07 : fond orange, « Pourquoi maintenant ? », trois gélules chiffrées qui s'alignent au défilement, bouton « Réserver une démo » (réf. section « Why now? » de scriptrunner.ai).
- Raison : demandes de Diego (« Cette section : S07 · Mise en place, fais comme ci-joint », « Mets les vrais logos dans : sources branchées », « Après cette section je souhaite un CTA impactant comme celui-ci »).
- Chiffres des gélules : seulement des faits établis (4 h décidé par Diego, assistant WhatsApp actif jour et nuit, 7 sources).
- Logos tiers : usage sous la responsabilité de Diego ; Meta exige une validation de marque pour un usage marketing.
- Statut : proposition à valider.
- Source : conversation Diego / Claude Code, 9 novembre 2026, captures scriptrunner.ai. Figma node 19:2.

## 2026-11-09 — Piste A v3 : hero B, trames de code, parcours en panneaux Fourmula
- Décision : la piste A reprend le premier écran de B, ajoute des trames de code ASCII à plusieurs sections et remplace le parcours en quatre étapes par des panneaux plein écran empilés, sur le modèle des captures Fourmula fournies par Diego (Figma node 12:2).
- Raison : demande de Diego (« Dans la liste A ajoute ceci à certains endroits : Code Block », « piste A mets ce hero : Hero piste B », « la section du portail à la vente en 4 étapes il faut bien mieux travailler la chose »).
- Remplace / modifie : la piste A v2 (archivée dans proofs/archive/).
- Statut : proposition à valider.
- Source : conversation Diego / Claude Code, 9 novembre 2026, captures fourmula.ai.

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
