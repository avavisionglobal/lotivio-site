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

## 2026-11-12 — Démo interactive sur l'accueil, en lead magnet ; « Tester le produit » remplace le film
- Décision :
  - La démo (S05B) entre dans la page d'accueil, après le Parcours (#essai). Elle reste floutée derrière un formulaire : prénom, nom, e-mail professionnel, téléphone, accord de contact (lien Confidentialité). La démo démarre à l'envoi (« Bienvenue {prénom} ») ; un visiteur déjà inscrit y accède directement (mémoire du navigateur).
  - Envoi : le navigateur appelle /api/lead (fonction Vercel api/lead.ts, branchée sur le serveur de dev en local). Validation côté serveur, champ piège et délai minimal contre les robots, puis transmission au webhook Lotivio /api/webhooks/lead (source site_web) avec la clé de l'organisation, gardée côté serveur. Sans les variables LOTIVIO_LEAD_URL / LOTIVIO_LEAD_KEY / LOTIVIO_ORG_ID, rien n'est transmis (mode essai). Une panne du webhook n'empêche pas le visiteur d'accéder à la démo ; elle est journalisée sans données personnelles en clair.
  - « Voir le film · 1 min » (premier écran) et « Voir le film » (section Démo) deviennent « Tester le produit » → #essai ; le film n'est plus chargé sur la page. Lien « Tester le produit » ajouté au menu.
- À décider avant la mise en ligne : l'organisation Lotivio qui reçoit ces leads et sa clé webhook (variables Vercel, Production uniquement). Le webhook envoie automatiquement un WhatsApp de bienvenue aux nouveaux contacts avec téléphone : à accepter ou à couper pour ces leads. Vérifier sur une Preview que Vercel sert bien /api/lead avec le projet Astro statique.
- Raison : demande de Diego (« mettre ça en ligne en lead magnet : les gens doivent entrer e-mail, téléphone, nom et prénom » ; « voir le film : plutôt tester le produit, partout »).
- Statut : implémenté en local, non publié.
- Source : messages de Diego, 12 novembre 2026.

## 2026-11-12 — Démo guidée, étape 4.1 : rapport business
- Décision : la Vue d'ensemble devient « Rapport de commercialisation » (Les Vergers, 90 jours) :
  - 5 indicateurs cliquables (le calcul s'affiche) : Budget marketing CHF 12'590 · Demandes 42 (2,3 par lot, 3,2 par semaine) · Coût par demande CHF 300 · Demandes par rendez-vous 3,5 (12 visites, CHF 1'049 par visite) · Coût par acquisition CHF 1'574 (8 acheteurs réservés ou vendus, 0,17 % du prix moyen d'un lot).
  - « Provenance et conversion » gardée, avec deux colonnes en plus : budget et coût par demande par canal ; un clic sur un canal donne son coût par demande et par acheteur.
  - « Ce qui se vend » (lots par type) est retiré, remplacé par « Marché et prix » : vélocité de vente (64 j par lot contre 92 j pour le marché, 1,6 lot par mois), prix obtenu (CHF 8'050/m² contre 7'600 pour le marché, +6 %), taux de demande (2,3 demandes par lot).
  - Gestes guidés : « Coût par acquisition », puis la ligne « Meta Ads ».
- Tous les chiffres sont fictifs (démo).
- Ce qui existe dans l'app (vérifié le 12.11.2026 dans ava-crm) : dépense Meta par projet et CPL / CPL qualifié (meta-spend-report.tsx, sync des dépenses via l'API Meta) ; vélocité de vente par projet et par typologie (lot-status-history.ts) ; statistiques marché anonymes par canton, dès 3 agences (market-stats.ts, médiane de prix au m², délai de vente). Ce qui n'existe pas tel quel : un budget global incluant Google Ads et les coûts des portails, le coût par acquisition et les demandes par rendez-vous sur un seul écran de rapport.
- Raison : demande de Diego (« un rapport plus business : vélocité du marché, prix, taux de demande, nombre de demandes par rendez-vous, coût par demande, coût par acquisition par rapport au budget marketing ; provenance et conversion à garder ; ce qui se vend, non »).
- Version précédente archivée : proofs/archive/essai-v9-avant-rapport-business.ts.
- Statut : proposition à valider.
- Source : message de Diego, 12 novembre 2026.

## 2026-11-12 — Démo guidée : l'acheteur de l'étape 2 arrive dans la gestion des leads
- Décision :
  - Thomas Rochat, l'acheteur qui fait le parcours de l'étape 2 (publicité → site → formulaire → WhatsApp ou e-mail), apparaît à l'étape 3 dans le tunnel, marqué « Nouveau », en tête de la colonne qui correspond à sa réponse : visite demandée → Demandes · À rappeler ; question → Demandes · Max en conversation ; 3 critères donnés → Qualifiés · Critères reçus ; pas intéressé → Demandes, reste dans la base ; e-mail → Demandes · Brochure ouverte. Sans étape 2 jouée : Demandes · Max en conversation.
  - 3.1 « Tunnel de vente » : un seul geste guidé, cliquer sur Thomas (où il en est, prochaine action).
  - 3.2 « Qui appeler en premier » : on clique sur l'en-tête de la colonne « Demandes » (« Qui appeler › ») et le classement s'ouvre (retour « ‹ Tunnel de vente »). Thomas y figure avec ce qu'il a répondu. Geste final : appeler Céline, en tête.
- Raison : demande de Diego (« le même acheteur doit arriver dans la gestion des leads […] lorsqu'on clique dans Demandes, ça met le classement de qui appeler en premier »).
- Version précédente archivée : proofs/archive/essai-v8-avant-lien-acheteur.ts.
- Statut : proposition à valider.
- Source : message de Diego, 12 novembre 2026.

## 2026-11-12 — Démo guidée, étape 2 : sans l'exemple des portails
- Décision : la sous-étape « Les portails » est retirée du parcours ; l'étape 2 montre uniquement l'exemple du site (2.1 Publicité et site, 2.2 La conversation). Le code de la sous-étape reste en place, non affiché.
- Raison : demande de Diego (« supprime l'exemple portail, on montre uniquement l'exemple du site web »).
- Statut : proposition à valider.
- Source : message de Diego, 12 novembre 2026.

## 2026-11-12 — Démo guidée, étape 1 : envoi de la brochure aux contacts matchés
- Décision : après le matching, sous-étape 1.2 « Envoi de la brochure » : bouton « Envoyer la brochure aux 23 contacts » sur l'écran du matching → choix WhatsApp ou e-mail → l'IA rédige le message (texte qui s'écrit seul) → « Envoyer ». En WhatsApp, l'audience est de 14 contacts (accord WhatsApp).
- Raison : demande de Diego (« ajoute quand même l'étape où on envoie par WhatsApp ou par e-mail la brochure aux contacts qui ont été matchés »).
- À vérifier dans l'app : l'envoi groupé par WhatsApp n'existe pas dans le code au 11.11.2026 (voir l'entrée « campagne par e-mail ou WhatsApp »).
- Statut : proposition à valider.
- Source : message de Diego, 12 novembre 2026.

## 2026-11-12 — Démo guidée, étape 1 simplifiée : publier, puis « Lancer le matching »
- Décision : l'étape 1 n'a plus qu'une sous-étape. Importer la grille → générer la description avec l'IA → publier → le bouton « Lancer le matching » apparaît dans l'écran de la promotion publiée → résultat du matching (23 contacts de la base). Fin de l'étape. La sous-étape « Campagne » (e-mail ou WhatsApp, message par l'IA) sort du parcours guidé, et le bouton « Créer une campagne » n'est plus affiché sur l'écran du matching.
- Raison : demande de Diego (« ça doit être simple et efficace […] une fois publié, il y a directement un bouton matching […] une fois le matching fait, c'est fini, pas besoin de montrer autre chose »).
- Remplace / modifie : sous-étapes 1.1 La promotion, 1.2 Matching de la base, 1.3 Campagne. Version précédente archivée : proofs/archive/essai-v7-etape1-campagne.ts.
- Statut : proposition à valider.
- Source : message de Diego, 12 novembre 2026.

## 2026-11-12 — « Qui appeler maintenant » rejoint l'étape 3 « Gestion des leads »
- Décision : la sous-étape « Qui appeler maintenant » (classement) quitte l'étape 2 et devient 3.2, après le tunnel de vente (3.1). L'étape 2 « Aller chercher les acheteurs » compte trois sous-étapes : publicité et site, conversation, portails.
- Raison : demande de Diego.
- Statut : proposition à valider.
- Source : message de Diego, 12 novembre 2026.

## 2026-11-12 — Démo guidée : nouvel ordre des étapes, site parcouru, portails
- Décision :
  - Nouvel ordre : 1 Nouvelle promotion · 2 Aller chercher les acheteurs · 3 Gestion des leads (tunnel) · 4 Rapport. La qualification fait partie de l'étape 2.
  - Étape 2 « Aller chercher les acheteurs » : 2.1 Publicité et site (la page de la promotion défile lentement : projet, galerie, appartements, situation, puis formulaire ; le visiteur clique dans le formulaire, qui se remplit champ par champ ; choix WhatsApp ou e-mail ; envoi) · 2.2 La conversation (WhatsApp ou e-mail) · 2.3 Les portails (chemin classique : annonce sur un portail générique, « Contacter l'annonceur », la demande Homegate arrive seule en tête des leads, avec sa source) · 2.4 Qui appeler maintenant.
- Raison : retour de Diego (« il faut vraiment qu'on voie qu'il arrive sur le site, qu'il scrolle un moment puis qu'il remplisse le formulaire » ; « l'objectif c'est de montrer les étapes de comment un prospect réagit avec Lotivio : nouvelle promotion, aller chercher les acheteurs, la qualification, puis la gestion des leads […] je montrerais aussi simplement les portails, les chemins classiques »).
- Formulation des portails : « arrivent seules dans Lotivio » (claims gate : jamais « plus aucune saisie »).
- Remplace / modifie : ordre 1 Promotion · 2 Gestion des leads · 3 Qualification. Version précédente archivée : proofs/archive/essai-v6-avant-reordre.ts.
- Statut : proposition à valider.
- Source : message de Diego, 12 novembre 2026.

## 2026-11-12 — Démo guidée, étape 3 : le parcours vu par l'acheteur
- Décision : l'étape 3 « Qualification » commence du côté de l'acheteur, dans le téléphone :
  - 3.1 « Côté acheteur » : la publicité des Vergers dans un fil social (maquette générique, sans marque) → « En savoir plus » → page de la promotion sur le site (agence-demo.ch/les-vergers) → formulaire « Recevoir la brochure » avec le choix WhatsApp ou e-mail → confirmation ; la demande arrive dans Lotivio (fiche de Thomas, source « Publicité → formulaire du site »).
  - 3.2 « La conversation » suit le choix : WhatsApp (Max envoie la brochure, demande si le bien intéresse, réponses rapides) ou e-mail (boîte de réception → e-mail de l'agente → « Voir la brochure » → l'ouverture remonte dans la fiche : « Brochure consultée »).
  - 3.3 « Qui appeler maintenant » : inchangé ; la ligne de Thomas reprend le canal choisi.
- Chiffre « jusqu'à 10 fois plus de trafic que les portails » : non affiché (claims gate : aucun chiffre sans source écrite). Le texte dit « Les campagnes Meta et Google amènent bien plus de demandes que les portails ». À remplacer par le chiffre si Diego fournit une source écrite (par exemple la mesure Roccabella août–octobre 2026, qui porte sur le coût par contact, pas sur le volume).
- À vérifier dans l'app : Max (WhatsApp) ne traite aujourd'hui que les leads Meta Ads (formulaire de la publicité) ; ici la demande passe par le formulaire du site avec le choix du canal. L'envoi automatique de la brochure par e-mail n'existait pas au 5.10.2026 (docs/DEMO_WELCOME.md de l'app).
- Raison : demande de Diego (« se mettre à la place de l'utilisateur de Facebook qui tombe sur une publicité […] il arrive sur le site, il remplit […] on peut choisir WhatsApp ou e-mail […] ça monte la conversation, puis on explique la qualification »).
- Remplace / modifie : 3.1 « WhatsApp et brochure » devient 3.2 « La conversation ». Version précédente archivée : proofs/archive/essai-v5-avant-parcours-acheteur.ts.
- Statut : proposition à valider.
- Source : message de Diego, 12 novembre 2026.

## 2026-11-12 — Démo guidée, étape 2 : Céline « À rappeler », pas « Qualifiée »
- Décision : dans le tunnel de vente, Céline Favre passe de la colonne « Qualifiés » à « Demandes », avec la pastille « À rappeler » (brochure consultée 3 fois, pas encore qualifiée). Demandes 17, Qualifiés 13. Laura Girardin sort de l'affichage de la colonne (comptée dans « + autres »). Même traitement pour Pierre-Alain Droz (visite demandée sur WhatsApp) : pastille « À rappeler » au lieu de « RDV demandé ».
- Raison : retour de Diego (« Céline a demandé trois fois la brochure, elle serait plus à rappeler […] pour moi ce n'est pas qualifié lorsque quelqu'un regarde trois fois la brochure »).
- Statut : proposition à valider.
- Source : message de Diego, 12 novembre 2026.

## 2026-11-12 — Démo guidée, 3.2 simplifiée
- Décision : Céline apparaît d'emblée en tête du classement avec « Brochure consultée 3× » (plus de simulation d'ouvertures). Un seul geste guidé : « Appeler » Céline. Le classement ne montre plus le score de matching ni la disqualification (Jan Meier retiré) ; le tri est retiré : le classement reste dans l'ordre de priorité (Diego : « et aussi priorité »).
- Raison : demande de Diego (« supprime la simulation de Céline […] on perd du temps ; mets simplement en haut du classement brochure x3 ; ne présente pas le score de matching ni même disqualifier »).
- Remplace / modifie : entrée « étape 3 : classement qui appeler maintenant » du même jour.
- Statut : proposition à valider.
- Source : message de Diego, 12 novembre 2026.

## 2026-11-12 — Démo guidée, étape 3 : deux façons de qualifier, un classement « qui appeler maintenant »
- Décision :
  - 3.1 « WhatsApp et brochure » : inchangée (Max envoie la brochure, demande si le bien intéresse ; visite, question, ou 3 questions pour le portefeuille).
  - 3.2 « Qui appeler maintenant » remplace « Approche 2 · clics brochure » et « Ce que ça donne » : un seul classement des leads de la promotion, avec pour chacun comment on le sait (WhatsApp ou brochure), le signal (RDV demandé, Critères reçus, Chaud, Numéro invalide), le meilleur score de matching, le téléphone et l'action (Appeler / Disqualifier). Tri par Priorité, Score matching ou Plus récents ; les lignes glissent à leur nouvelle place.
  - Gestes guidés : Céline ouvre la brochure 2 fois (elle passe en « Chaud » et monte en tête) → tri par score matching → disqualifier Jan Meier (numéro invalide, WhatsApp non délivré) → retour au tri par priorité → appeler Céline.
- Vérification : le statut « Disqualifié » existe (contacts) ; l'erreur Twilio 63024 « Numéro WhatsApp invalide » est connue de l'app (twilio-error-labels.ts). Le classement croisé (WhatsApp + brochure + RDV) sur un seul écran avec tri est une présentation : l'app a la liste Relance (priorisée par règles) et les signaux, pas cet écran exact.
- Raison : demande de Diego (« simplifier et mettre en avant qu'on a plusieurs options pour qualifier les leads et savoir où téléphoner de suite […] un classement avec un tri […] disqualifier lorsque le numéro de téléphone n'est pas correct »).
- Remplace / modifie : sous-étapes 3.2 et 3.3 de la V4 (archivées dans proofs/archive/essai-v4-etape3-relance.ts).
- Statut : proposition à valider.
- Source : message de Diego, 12 novembre 2026.

## 2026-11-12 — Démo guidée, étape 2 : un seul écran, le tunnel de vente du projet
- Décision : l'étape 2 « Gestion des leads » passe de deux sous-étapes (tri par onglets, arbre d'état avec trois promotions) à un seul écran : le tunnel de vente des Vergers en six colonnes (Demandes 16, Qualifiés 14, Visite 4, Réservation 2, Notaire 1, Vendu 5 ; total 42). Chaque personne est placée dans sa colonne, avec une pastille quand l'agent doit agir (Max en conversation, RDV demandé, À engager, Sans réponse, Chaud). Un clic sur une personne ouvre en bas sa position sur le tunnel, « Où il en est » et la prochaine action. Deux gestes guidés : Céline Favre, puis Pierre-Alain Droz (RDV demandé).
- Raison : retour de Diego (« il y a trop de boutons et d'étapes, je me suis moi-même perdu ; il faut quelque chose de plus simple qui permet de visualiser sur un seul écran les leads du projet et où ils se trouvent dans le tunnel de vente »).
- Remplace / modifie : sous-étapes 2.1 « Trier les demandes » et 2.2 « Arbre d'état » de la V4 (archivées dans proofs/archive/essai-v4-etape2-arbre.ts). Le lot réservé B3 devient B4 pour rester cohérent avec Céline (lot B3 visé à l'étape 3).
- Statut : proposition à valider.
- Source : message de Diego, 12 novembre 2026.

## 2026-11-12 — Démo guidée : campagne par e-mail ou WhatsApp, textes rédigés par l'IA
- Décision :
  - Étape 1.3 « Campagne » : le canal se choisit (E-mail ou WhatsApp). En WhatsApp, l'audience devient « 14 contacts · accord WhatsApp » et l'aperçu montre le message avec la brochure et deux réponses rapides. La phrase « Les campagnes partent par e-mail. WhatsApp sert aux conversations de Max avec les leads Meta Ads. » est supprimée (demande de Diego).
  - Bouton « Générer avec l'IA » là où l'agent écrit : description de la promotion (1.1, avant publication) et message de la campagne (1.3, objet compris pour l'e-mail). Le texte s'écrit lettre après lettre ; l'agent relit avant de publier ou d'envoyer.
  - Parcours guidé 1.1 : importer la grille → générer la description → publier. 1.3 : créer la campagne → choisir le canal → générer le message → envoyer.
- Vérification : la rédaction par l'IA existe dans l'app (brouillons de campagne, descriptions ; PROJECT.md, « Produit »). Les campagnes WhatsApp en masse n'existent pas dans le code au 11.11.2026 (campagnes = e-mail, Brevo ou boîte de l'agent) : fonction à développer avant de la présenter comme disponible hors démo ; l'envoi WhatsApp marketing demande l'accord du contact et un modèle approuvé.
- Raison : demande de Diego (« il faut que le WhatsApp soit aussi une possibilité, et lors de l'écriture des textes […] on peut voir que l'on peut générer ceci avec l'IA »).
- Statut : proposition à valider.
- Source : message de Diego, 12 novembre 2026.

## 2026-11-12 — « Essayez Lotivio » V4 : parcours guidé, le visiteur fait les gestes de l'agent
- Décision :
  - Le visiteur n'a plus à suivre une démonstration jouée par Diego : à chaque sous-étape, une consigne « À vous » au-dessus de l'app dit quoi faire, et un repère orange (anneau pulsé et étiquette) entoure l'élément à cliquer. Seul cet élément réagit ; un clic ailleurs fait vibrer le repère. À la fin d'une sous-étape, le bouton « Continuer · … » s'anime. « Passer » et la flèche arrière restent disponibles ; les étapes et sous-étapes sont cliquables. Après la dernière : exploration libre.
  - Étape 3.1 réécrite selon Diego : Max envoie la brochure puis demande d'abord si le bien intéresse (« Je peux répondre à vos questions ou vous proposer une visite »). Le visiteur répond à la place du prospect avec des boutons de réponse sur le téléphone :
    - « Je souhaite visiter » → Max transmet à l'agente → Bloqué · RDV demandé (l'agent reprend la main) ;
    - « J'ai une question » → Max répond depuis la fiche projet, propose une visite ;
    - « Pas vraiment » → Max envoie le lien du site, propose 3 questions (type, pièces, budget) pour trouver un bien du portefeuille → Qualifié, Préqualifié par l'IA, 2 biens d'autres promotions proposés ; ou « Non merci » → fin polie avec STOP.
  - 3.3 « Ce que ça donne » reprend la réponse choisie pour Thomas.
  - Étape 4.2 : le rapport devient le « Rapport au propriétaire » de la promotion (PDF par projet existant dans l'app : mandat, synthèse, évolution mensuelle, biens du mandat, communications).
- À aligner dans l'app : le premier message réel de Max (src/lib/whatsapp-first-contact.ts, modèle WhatsApp pré-approuvé) envoie la brochure et demande directement les critères. Le scénario « intérêt d'abord, puis visite / question / portefeuille » est la demande de Diego : il faut adapter le modèle et le parcours de Max avant de le présenter comme le comportement du produit en dehors d'une démo.
- Raison : retour de Diego sur la V3 (« il faut juste guider la personne qui clique […] lui dire où il clique […] une petite explication en haut » ; WhatsApp : « d'abord […] est-ce que vous êtes intéressé par ce bien, avez-vous des questions […] sinon proposer le lien du site ou une petite qualification […] dans notre portefeuille »).
- Remplace / modifie : entrée V3 du même jour (lecture automatique). V3 archivée dans proofs/archive/essai-v3-auto.ts et s05-essai-v3-auto.css.
- Statut : proposition à valider.
- Source : message de Diego, 12 novembre 2026.

## 2026-11-12 — « Essayez Lotivio » V3 : le parcours d'un agent sur une promotion, en 4 étapes
- Décision :
  - La V2 (visite libre en 7 chapitres) est remplacée par le parcours client d'un agent, étape par étape, joué dans la même réplique de l'app (page de travail /essai, scène orange).
  - Bandeau des 4 étapes, sous-étapes avec barres de progression, légende par sous-étape. Chaque étape se joue seule puis s'arrête ; « Sous-étape suivante » / « Étape N » enchaîne. Précédent, pause, flèches du clavier. Un clic dans l'app = exploration libre.
  - Étape 1 · Nouvelle promotion : 1.1 l'agent crée Les Vergers (Kerzers) et importe la grille des lots depuis un PDF (18 lots), publication et diffusion ; 1.2 matching avec la base (23 contacts au-dessus de 70) ; 1.3 campagne e-mail ciblée envoyée aux 23 contacts.
  - Étape 2 · Gestion des leads : 2.1 tri des demandes par promotion et par état (Max en conversation, Bloqué · Question / RDV demandé, À engager, Qualifié, Sans réponse · relance automatique) ; 2.2 arbre d'état de chaque promotion active (Demandes → états → Qualifié → Visite → Réservation → Notaire → Vendu), trois promotions fictives (Les Vergers · Kerzers, Le Clos · Morat, Rive Sud · Estavayer).
  - Étape 3 · Qualification : 3.1 approche agent WhatsApp (Max, lead Meta Ads : brochure, questions, critères, Qualifié, Préqualifié par l'IA, matching) ; 3.2 approche clics sur la brochure (Céline : 1×, 2×, 3× → « Chaud », remonte en tête des relances) ; 3.3 ce que ça donne (deux fiches : critères complets et lots proposés / intérêt prouvé, avec la prochaine action).
  - Étape 4 · Rapport : 4.1 Vue d'ensemble filtrée sur Les Vergers (provenance et conversion par canal jusqu'aux acheteurs, lots vendus par type) ; 4.2 Rapport KPI Global 90 jours exporté en PDF (indicateurs, résultats par projet, funnel).
- Vérifié dans le code de l'app (origin/main 5b7fbfa2, 11.11.2026) : états des demandes (lead-card.tsx), relance automatique (leads-timing.ts), modèles de rapports et export PDF (rapports-client.tsx), provenance par source (vue-ensemble/types.ts).
- Écarts avec la demande, à trancher par Diego :
  - Campagnes par WhatsApp : n'existent pas dans le code. Les campagnes partent par e-mail (Brevo ou boîte de l'agent) ; WhatsApp = conversations de Max avec les leads Meta Ads. L'écran le montre ainsi (WhatsApp grisé, avec l'explication).
  - L'arbre d'état sur un seul schéma n'est pas un écran de l'app : il assemble les états de l'inbox Leads et les étapes du pipeline, filtrés par promotion.
  - Le rapport PDF montré couvre l'agence avec une ligne par projet ; un filtre de rapport par promotion n'a pas été trouvé dans le code.
- Raison : retour de Diego sur la V2 (« ce que je demande, c'est que l'on fasse le parcours client d'un agent immobilier d'une promotion step by step et que l'on regarde comment fonctionne Lotivio »), avec les 4 points : matching et campagnes, gestion des leads et arbre d'état, deux approches de qualification, rapport concret.
- Remplace / modifie : entrée V2 du même jour. V2 archivée dans proofs/archive/*-v2-visite.*
- Statut : proposition à valider.
- Source : message de Diego, 12 novembre 2026.

## 2026-11-12 — « Essayez Lotivio » V2 : réplique de l'app en visite guidée et exploration libre
- Décision :
  - La V1 en six étapes à valider une par une est remplacée par une réplique interactive de l'app, au langage de l'app réelle (DESIGN.md de ava-crm : sidebar noire, cartes blanches hairline, Archivo), dessinée en 1280 × 800 et réduite à la largeur de la page, sur une scène orange.
  - Promotion fictive préremplie : « Les Vergers », Kerzers, 18 appartements (5 vendus, 2 réservés au départ). Agente de démonstration : Sarah Keller. Mêmes portraits que les panneaux du Parcours.
  - Visite guidée automatique au défilement, 7 chapitres avec légende et barres de progression : Aujourd'hui (la promotion et les tâches, une demande Meta Ads arrive) → La demande (fiche contact et téléphone de l'acheteur : Max envoie la brochure sur WhatsApp, reçoit les critères, statut Qualifié) → Relance (Céline ouvre la brochure 3×, remonte en tête, « Chaud » ; relance de Marc en un clic) → Matching (« Pourquoi ce score ? », envoi des 3 meilleurs) → Pipeline (Céline glissée en Réservation, valeur mise à jour) → La promotion (stock, lot B3 passé en Réservé, diffusion) → Vue d'ensemble (KPI, provenance et conversion par canal jusqu'aux acheteurs, ce qui se vend, funnel).
  - Un clic dans l'app met la visite en pause (exploration libre) : navigation, fiches, relances, « Avancer » dans le pipeline, choix du contact au matching. La légende suit l'écran ouvert. Bouton Pause / Reprendre, chapitres cliquables, flèches du clavier.
  - Garde-fous à l'écran : Max seulement pour les leads Meta Ads (dit dans la légende), STOP dans la conversation, « Chaud » et priorité présentés comme des règles, score détaillé et présenté comme une règle. La Vue d'ensemble « provenance et conversion par source » existe dans l'app (vue-ensemble/types.ts) ; la mise en page « Ce qui se vend » (derniers lots réservés et vendus) est une présentation des données de stock.
- Raison : retour de Diego sur la V1 (« niveau visuel, il faut que ce soit beaucoup mieux fait », « présélectionne déjà des trucs », « une vision globale […] la fenêtre d'aujourd'hui avec la promotion de Kerzers, que lorsqu'on clique ça s'ouvre […] pipeline […] ce qui se vend, d'où viennent les acheteurs »).
- Limites : sur mobile, l'app réduite est illisible (une version mobile reste à concevoir). Chiffres de démonstration fictifs (42 leads, 27 qualifiés, 12 visites, délai 64 j).
- Remplace / modifie : entrée « Section Essayez Lotivio en six étapes (V1) » du même jour. V1 archivée dans proofs/archive/*-v1-etapes.*
- Statut : proposition à valider.
- Source : message de Diego, 12 novembre 2026.

## 2026-11-12 — Section « Essayez Lotivio » en six étapes (V1, page /essai)
- Décision :
  - Nouvelle section interactive S05B, construite sur une page de travail `/essai` (pas encore dans l'accueil). Rail des étapes avec les réglages à gauche, fenêtre sombre de l'app à droite.
  - Six étapes, dans l'ordre demandé par Diego : 01 créer la promotion (nom, localité, 6/12/24 lots, diffusion) ; 02 une demande arrive avec sa source (Homegate, ImmoScout24, immobilier.ch, Meta Ads, votre site) ; 03 la brochure part (WhatsApp, e-mail ou déjà téléchargée ; premier contact automatique ou validé par l'agent) ; 04 relance sans réponse (WhatsApp, e-mail ou liste d'appels, après 2, 3 ou 5 jours) ; 05 qui appeler en premier (les clics sur la brochure font remonter le contact, « Chaud » à 3×) ; 06 score de matching réglable (pièces, budget, zone) avec « Pourquoi ce score ? ».
  - Simulation dans la page : rien n'est envoyé ni enregistré. Fin : bouton « Voir Lotivio sur mes projets » vers le formulaire de démo (#demo).
  - Garde-fous appliqués dans l'interface : WhatsApp grisé hors leads Meta Ads ; « déjà téléchargée » seulement pour une demande du site ; réglages « avec votre agence à la mise en place » ; classement et score présentés comme des règles ; seuls les clics sur le lien de brochure sont suivis.
  - Usage prévu : support de la démonstration au rendez-vous Roccabella × Heritage, puis démonstration libre pour les visiteurs du site.
- Raison : demande de Diego (« faire comme les étapes, création de la promotion et ensuite […] la brochure sur WhatsApp, par mail, déjà téléchargée, une relance automatique au bout de X temps, hiérarchiser ses appels avec ceux qui ont cliqué le plus sur la brochure, le score de matching »).
- À vérifier : la relance automatique par e-mail et l'envoi automatique de brochure par e-mail. Au 5.10.2026, l'envoi automatique de brochure par e-mail n'existait pas dans le code (docs/DEMO_WELCOME.md de l'app) ; les délais 2/3/5 jours sont des exemples.
- Remplace / modifie : rien (nouvelle section). Captation de leads dans la simulation : non, renvoi vers le formulaire existant.
- Statut : proposition à valider.
- Source : message de Diego, 12 novembre 2026.

## 2026-11-12 — Accélérer l'indexation
- Fait :
  - fichier de validation Google Search Console publié (commit 6224fa6) ;
  - clé IndexNow publiée (public/50c974ba67748c34533d024ac707c049.txt, commit 6641ac2) ; accueil et pages légales soumis à IndexNow (HTTP 202) ;
  - déploiements faits depuis une copie propre du commit : la correction de la carte 4 (S07) et le travail de la page /essai restent en local.
- Non abouti : redirection de lotivio-site.vercel.app vers lotivio.ch par vercel.json (règle par domaine non appliquée par Vercel). À faire dans Vercel → Domains → lotivio-site.vercel.app → Redirect 308 vers lotivio.ch ; règle à retirer de vercel.json au prochain déploiement. La canonique de la copie pointe déjà vers lotivio.ch.
- À faire par Diego :
  - Search Console : sitemap https://lotivio.ch/sitemap-index.xml et demande d'indexation de l'accueil ;
  - Bing Webmaster Tools : import depuis Search Console ;
  - liens vers lotivio.ch : fiche Google Business, page LinkedIn, sites Ava Vision / Contrast, annuaires suisses.
- Statut : en cours.
- Source : demande de Diego, 12 novembre 2026.

---

## 2026-11-12 — Mise en ligne sur lotivio.ch
- Décision :
  - La version locale (commit 0cf4a5d) est déployée en production sur le projet Vercel lotivio-site (équipe crm-real-estates-projects) par la ligne de commande.
  - Adresse principale : https://lotivio.ch.
  - www.lotivio.ch redirige en 308 vers lotivio.ch.
  - DNS Infomaniak : A @ → 216.150.1.1 ; CNAME www → 116f91129c749363.vercel-dns-016.com.
  - app.lotivio.ch (projet ava-crm) est inchangé.
- Vérifié en ligne :
  - HTTPS valide sur les deux adresses ; http → https ;
  - pages légales, sitemap, robots.txt et favicon ; 404 en noindex ;
  - cache d'un an sur /_astro, d'une semaine sur /media ; en-têtes de sécurité présents ; HTML compressé de 50 Ko.
  - Lighthouse sur lotivio.ch :
    - mobile : performance 99, accessibilité 96, bonnes pratiques 100, SEO 100 ;
    - ordinateur : performance 100, accessibilité 96, bonnes pratiques 100, SEO 100.
- Restent ouverts :
  - formulaire de démo sans destination (affiche « bientôt disponible ») ;
  - IDE et forme juridique dans les mentions légales ;
  - commit non poussé sur GitHub (identifiant git local « lotivioldo » refusé sur avavisionglobal/lotivio-site) ;
  - projet Vercel non relié à Git (déploiements manuels).
- Statut : décidée.
- Source : demande de Diego, 12 novembre 2026 (« pousser la dernière version locale en prod »).

---

## 2026-11-12 — SEO technique, vitesse et pages légales avant la mise en ligne
- Décision : aucun texte du site n'est modifié. Changements techniques :
  - SEO :
    - balises communes à toutes les pages (src/components/seo/Seo.astro) : canonique, robots, hreflang fr-CH, Open Graph et Twitter complets ;
    - données structurées : Organization (Penaloza Lopez Vision, adresse, e-mail), WebSite, WebPage, SoftwareApplication avec les deux prix affichés (mise en place CHF 6'500, abonnement dès CHF 450/mois) ;
    - favicon.ico, apple-touch-icon, manifeste ;
    - sitemap avec date, sans /essai ni 404 ; robots.txt : Disallow /essai/ ; /essai est en noindex ;
    - page 404.
  - Vitesse :
    - les scripts des sections sous le premier écran se lancent quand le navigateur est libre (flash, app, texhover, scènes S06 et S07) ;
    - l'ancien bloc CSS des illustrations S07 (bento, environ 340 lignes) et bento.ts sont retirés (archive : proofs/archive/bento-v2.ts) ;
    - la police Archivo est réduite aux graisses 450-700 et aux largeurs 100-118 (90 → 54 Ko ; src/styles/fonts.css), sans changement visuel vérifié.
  - Vercel (vercel.json) :
    - cache d'un an pour /_astro, d'une semaine pour /media et /brand ;
    - en-têtes de sécurité (nosniff, Referrer-Policy, X-Frame-Options, Permissions-Policy, HSTS sans sous-domaines) ;
    - barre finale imposée dans les adresses.
  - Pages légales /mentions-legales/ et /confidentialite/ (mise en page légère, src/layouts/Legal.astro) :
    - liens dans le footer (colonne Compte) ;
    - le lien « Confidentialité » du formulaire de démo pointe vers la politique du site (avant : celle de l'app).
- Mesures Lighthouse (local, serveur compressé comme Vercel) :
  - accueil mobile : 75 → 92, blocage 590 ms → 0-30 ms ;
  - accueil ordinateur : 100 ;
  - pages légales : 100 dans les quatre catégories ;
  - SEO 100 partout.
- Reste : accessibilité 96, à cause du contraste de la 2e ligne grise du titre du hero et de l'étiquette « Développé pour la Suisse » (choix de DA, non modifié).
- Faits légaux repris de la politique de l'app (ava-crm) : Penaloza Lopez Vision, Rue de l'hôpital 8a, 2024 La Grande-Béroche, info@ava-vision.com. Le site n'utilise ni cookie, ni outil de mesure, ni ressource tierce : pas de bannière.
- À compléter :
  - numéro IDE et forme juridique (config.ts, LEGAL) ;
  - prestataire du formulaire de démo, dans la politique, dès qu'il est branché ;
  - validation des deux textes légaux par Diego (projet, pas un avis juridique).
- Statut : proposition à valider.
- Source : messages de Diego, 12 novembre 2026 (« fais le SEO, tout ce qui est technique […] on ne change pas le copywriting […] mention légale et autres choses obligatoires »).

---

## 2026-11-12 — Mise en place (S07) v4 : une carte simple par étape
- Décision : les scènes v3 (trois tuiles par carte, nombreuses animations) sont remplacées par une seule carte blanche par étape. Elle contient peu d'éléments, de grandes lignes lisibles et le même gabarit pour les quatre étapes.
  - 01 Atelier : trois lignes question → réponse (« D'où viennent vos demandes ? » Portails, Meta Ads, votre site ; « Qui répond ? » Sarah K. ; « Qui relance ? » David L. · après 5 jours), puis « Rôles définis avec votre équipe ».
  - 02 Canaux : Lotivio au centre, six canaux qui se branchent (Homegate, ImmoScout24, immobilier.ch, Meta, WhatsApp, votre site), puis une ligne « Contacts et demandes · Au même endroit » avec trois visages.
  - 03 Déléguer : Thomas Rochat (nouvelle demande Meta Ads) et trois lignes.
    - « Premier contact » et « Brochure · WhatsApp » sont marqués Auto et passent à « Envoyé(e) automatiquement ».
    - « Relance · e-mail » est marquée Agent : « À valider par l'agent », puis « Validée par Sarah K. ».
  - 04 Prise en main : quatre membres de l'équipe en ligne, puis « Traiter une demande », « Retrouver un acheteur », « Préparer une relance » (texte de Diego), cochés un à un.
  - Animation : les lignes arrivent puis se cochent, une seule fois à chaque apparition de la carte. Ensuite, la carte reste immobile : pas de boucle, de curseur ni de texte qui s'écrit.
  - Sur mobile, le texte est un peu agrandi et revient à la ligne.
- Raison : retour de Diego (« trop chargé […] des choses qui te dépassent […] trop d'informations […] plus simple, moins d'animation […] meilleure visibilité »).
- Remplace / modifie : S07 v3 du même jour (archives : proofs/archive/S07MiseEnPlace-v3-scenes-chargees.astro, s07-scenes-v3-chargees.css, s07-v3-chargees.ts).
- Statut : proposition à valider.
- Source : message de Diego, 12 novembre 2026 (captures des cartes 01 et 02).

---

## 2026-11-12 — Mise en place (S07) : scènes animées au niveau du parcours (remplacé par la v4)
- Décision : les quatre illustrations de S07 sont refaites en scènes enchaînées, sur le modèle des panneaux du parcours (S06). Mêmes cartes, mêmes textes, même défilement horizontal.
  - Points communs :
    - entrée des tuiles floutée, depuis trois directions ;
    - lecture en boucle seulement quand la carte est à l'écran ;
    - portraits de démonstration existants, aucune génération d'image ;
    - script src/scripts/s07.ts, styles src/styles/s07-scenes.css.
  - 01 Atelier : trois questions s'écrivent dans la tuile sombre (« D'où viennent vos demandes ? », « Qui répond aux nouvelles demandes ? », « Qui relance, et quand ? »).
    - Chaque réponse apparaît en pastille et dessine sa partie de la carte : sources (logos Homegate et Meta, votre site), demande, puis Sarah K. qui répond et David L. qui relance, avec des impulsions orange.
    - L'équipe se remplit, puis « Rôles définis ».
  - 02 Branchements : les huit canaux se branchent un à un. Ensuite, les demandes arrivent en direct :
    - une impulsion part du portail ou de Meta, le compteur augmente et le contact s'insère avec son visage ;
    - la brochure part par e-mail via Outlook, ou par WhatsApp pour un lead Meta Ads.
  - 03 Déléguer : Thomas Rochat (lead Meta Ads) traverse le parcours.
    - Le premier contact part seul.
    - Le PDF de la brochure arrive dans une bulle WhatsApp.
    - Le curseur bascule la relance de « Auto » à « Agent », la relance apparaît « à valider », puis l'agent valide.
  - 04 Prise en main :
    - les contacts du panneau 01 sortent de contacts.csv avec leur visage, le compteur monte à 1'248 et la barre avance jusqu'à « Terminé » ;
    - les quatre membres de l'équipe passent en ligne ;
    - une nouvelle demande (Laura Girardin, Homegate) est prise en charge.
- Raison : demande de Diego (« plus travailler les animations […] de la même qualité que les animations […] de la section où on présente les différentes étapes »).
- Remplace / modifie : les illustrations à étapes de bento.ts (archive : proofs/archive/S07MiseEnPlace-v2-bento-etapes.astro). Les styles .il de global.css et bento.ts restent en place, inutilisés par S07.
- Garde-fou : l'agent qui valide la relance et le bascule Auto / Agent illustrent des réglages faits avec l'agence (capacité vérifiée). Aucun texte n'est présenté comme écrit par l'IA.
- Statut : proposition à valider.
- Source : message de Diego, 12 novembre 2026.

---

## 2026-11-12 — Tarifs (S09B) v2 : panneau gris chaud et vraies cartes de prix
- Décision :
  - La section passe dans un grand panneau gris chaud arrondi (#F1F0EC), pour rompre le blanc sur blanc entre la FAQ et la section Tarifs. Rythme de fin de page : FAQ blanche → Tarifs gris chaud → Démo noire.
  - Titre et introduction de Diego inchangés.
  - Carte claire « Mise en place » : en-tête teinté (01 · Une seule fois, titre, « Pour préparer Lotivio au fonctionnement de votre agence. »), prix CHF 6’500.– qui défile à l'apparition, frise des quatre étapes reliées par un fil orange qui se remplit, bouton « Parlons de votre mise en place ↗ ».
    - Étapes : Atelier ; Contacts et canaux ; Réglages du suivi ; Prise en main. Elles reprennent S07 et l'introduction de Diego.
  - Carte sombre « Abonnement » : en-tête (02 · Chaque mois, « Selon la formule choisie. »), prix dès CHF 450.–/mois, liste « Compris », trame de code et loupe en bas à droite, bouton clair « Découvrir Lotivio pour mon agence ↗ ».
    - Compris : Lotivio configuré pour votre agence (demandes, matching, relances, pipeline et stock) ; hébergement ; maintenance et mises à jour ; support pour votre équipe.
  - Un bouton par carte au lieu d'un seul sous les cartes.
  - Version mobile empilée.
- Raison : retour de Diego (« bien plus travaillé […] comme une vraie section de prix […] ça fait trop blanc sur blanc au niveau des sections »).
- Garde-fou : l'abonnement ne liste que ce que le texte de Diego garantit (hébergement, maintenance, mises à jour, support), plus le CRM configuré. Max (WhatsApp), la dictée et la diffusion sur les portails ne sont pas listés, puisque le contenu dépend de « la formule choisie ».
- Remplace / modifie : S09B v1 du même jour (archives : proofs/archive/S09BTarifs-v1-deux-cartes.astro, s09b-tarifs-v1-deux-cartes.css).
- Questions ouvertes :
  - Prix hors TVA ou TVA comprise : à afficher ?
  - Que contiennent les formules au-dessus de CHF 450.– ?
  - Le texte « Lotivio configuré pour votre agence (demandes, matching, relances, pipeline et stock) » est une formulation de Claude, à valider.
- Statut : proposition à valider.
- Source : message de Diego, 12 novembre 2026 (capture de la section Tarifs).

---

## 2026-11-12 — Panneaux 03 « Qualification » et 04 « Pilotage » animés, au niveau des panneaux 01 et 02
- Décision :
  - Panneau 03 : la scène de trois photos de biens est remplacée par trois colonnes, dans l'esprit du panneau 02.
    - « Relance · N relances à traiter » : à chaque tour, un signal arrive sur un contact (brochure consultée 3×, qualifié par Max avec ses critères, sans réponse depuis 5 jours), qui remonte en tête de la liste.
    - Sa fiche s'ouvre avec son portrait, la pastille « Chaud » (une règle), ses critères et ses signaux.
    - « Compte rendu dicté » : micro et onde, transcription qui s'écrit, informations extraites surlignées (intérêt, objection, relance), brouillon à confirmer, puis « Confirmé ». Le contact traité quitte la liste et une nouvelle relance arrive.
    - Script src/scripts/qualif.ts.
  - Panneau 04 : la grille grise et la barre de pipeline sont remplacées par un tableau de bord.
    - Onglets de trois projets ; stock de 24 lots (Disponible, Réservé, Vendu) qui se colore en vague ; anneau « % vendu », valeur du pipeline et délai moyen ; origine des acheteurs par canal ; pipeline Qualifié → Réservation → Notaire → Vendu.
    - À chaque tour, un acheteur traverse le pipeline : son lot passe de Disponible à Réservé puis Vendu, les compteurs et la barre de son canal se mettent à jour. Ensuite, le projet suivant s'affiche et tout se recalcule.
    - Script src/scripts/pilotage.ts.
  - Entrées floutées comme aux panneaux 01 et 02 ; mêmes hauteurs (environ 400 px à 1440 × 900) ; version mobile empilée.
  - Mêmes personnes de démonstration que les panneaux 01 et 02 : Céline Favre (matchée au B4, brochure consultée 3×, puis acheteuse du B4), Thomas Rochat (lead Meta Ads qualifié par Max), Pierre-Alain Droz (immobilier.ch, Lac & Lumière · D1). Aucune génération d'image : portraits existants.
- Raison : demande de Diego (« le même niveau aussi pour les qualifications […] les personas, les gens qui ont cliqué sur les brochures, les signaux, les critères […] ce qui se vend, un beau dashboard »).
- Remplace / modifie : scènes « relances en photos » (.rel) et « pipeline Lot B4 » (.sale) du 9.11 ; leurs styles restent dans global.css, inutilisés.
- À vérifier : la répartition des acheteurs par canal comme tableau de bord. La source de chaque demande est suivie, mais cet écran agrégé ne figure pas dans la liste des capacités vérifiées (Vue d'ensemble : KPI et funnel). Le texte du panneau, de Diego, promet déjà « l'origine de vos acheteurs ».
- Statut : proposition à valider.
- Source : message de Diego, 12 novembre 2026 (captures des panneaux 03 et 04).

---

## 2026-11-12 — Bouton : même comportement partout
- Décision :
  - Le bouton ne bouge plus : il ne suit plus la souris (effet magnétique retiré) et ne s'enfonce plus au clic.
  - Seule animation, identique sur les 13 boutons : remplissage orange de gauche à droite et flèche qui sort puis rentre dans le carré.
  - Le bouton de la section CTA (« Découvrir Lotivio pour mon agence ») perd sa taille propre et sa rotation à 45° au survol : il a la même taille et le même survol que les autres.
  - Les différences admises : couleur (noir ou blanc), petite taille dans la barre de menu, pleine largeur dans le menu déroulant et le formulaire de démo.
- Raison : retour de Diego (« des fois il réagit différemment lorsqu'on clique dessus […] que l'animation soit comme elle est, avec le orange et la flèche qui bougent, mais pas que le bouton bouge […] ça doit être partout pareil »).
- Remplace / modifie : l'effet magnétique sur les boutons du menu, du hero, du CTA, des tarifs et du footer ; l'enfoncement au clic ; les règles .cx-btn de s08-cta.css.
- Statut : décidée.
- Source : message de Diego, 12 novembre 2026.

---












## 2026-11-12 — Trames de code : immeubles dessinés, loupe plus discrète
- Décision :
  - Les trames de code ne partent plus des photos (résidence, lac) mais de quatre dessins d'immeubles en aplats contrastés, faits pour se lire en caractères : `public/media/tex/facade.svg` (façade à balcons + grue), `chantier.svg` (gros œuvre, échafaudage, grue), `quartier.svg` (maisons, PPE, tour, immeuble en chantier, grue), `lac.svg` (deux résidences au bord du lac). S07 : façade, chantier, quartier ; S08 Direction : façade, lac, chantier ; S08 CTA et S10 démo : quartier ; S09 tarifs : lac.
  - Les trames statiques sont recadrées sans déformation (`cover`).
  - Loupe au survol atténuée : rayon 170 → 130 px, code un ton seulement plus marqué que la trame (#A29C90 sur fond clair, #615D56 sur fond sombre, au lieu de #5C574E / #B3ADA3), bord plus fondu, opacité 0,75, moitié moins de points orange.
- Raison : retour de Diego : « le texte, on ne le voit pas lorsqu'il y a l'animation » ; « qu'on puisse apercevoir avec ce bout de code un bout d'immeuble […] actuellement ce n'est pas le cas ».
- Remplace / modifie : sources photo des trames (entrée « trame de code tirée d'une résidence ») et couleurs de la loupe (src/scripts/texhover.ts). Les photos restent utilisées ailleurs (intro S00, lots S06).
- Statut : proposition à valider
- Source : demande de Diego, 12.11.2026 (captures S07, S08, S10)


## 2026-11-12 — Panneau 02 « Leads » : demandes en direct et suivi réglé avec l'agence
- Décision : la scène « Sources branchées » est remplacée par une scène en trois colonnes, dans l'esprit du panneau 01.
  - À gauche, les canaux connectés (Homegate, ImmoScout24, immobilier.ch, Properstar, Meta Ads, votre site) avec leur compteur.
  - Au centre, « Demandes reçues · Aujourd'hui » : une pastille vole du canal vers la liste, la demande s'insère en haut (visage, nom, bien, canal), puis son statut avance : Nouveau → Premier contact envoyé → Brochure · e-mail ou WhatsApp → Agent.
  - À droite, « Votre suivi » : les trois étapes réglées avec l'agence se cochent en même temps.
  - La brochure part par WhatsApp seulement pour les leads Meta Ads, par e-mail pour les autres canaux (limite vérifiée de l'app).
  - Entrée : les trois colonnes arrivent floutées de gauche, du bas et de droite.
  - Les demandes s'enchaînent tant que le panneau est visible (script src/scripts/leads.ts).
  - Cinq nouveaux portraits de démonstration générés avec Higgsfield Soul 2.0 (environ 0,6 crédit ; lot assets/avatars/2026-11-12-leads-soul2).
- Raison : demande de Diego (« améliorer l'interface, l'illustration qui est en place », section Leads), après validation du panneau 01.
- Statut : proposition à valider.
- Source : message de Diego, 12 novembre 2026.

## 2026-11-12 — Panneau 01 « Base clients » animé ; bouton désactivé lisible
- Décision :
  - Entrée « distribution de cartes » : les six contacts arrivent floutés et inclinés, puis se posent.
  - Une ligne de balayage parcourt la base. Les jauges se remplissent pendant que les scores défilent jusqu'à leur valeur, et les correspondances (≥ 85) s'allument avec un léger rebond.
  - Jauges vivantes : tant que le panneau est visible, la scène passe d'un lot à l'autre toutes les 5,6 s et recalcule les jauges :
    - B4, 4.5 pièces : 3 contacts retenus ;
    - A2, 3.5 pièces : 2 contacts ;
    - C1, 5.5 pièces : 1 contact.
  - La barre « Campagne e-mail ciblée » est visible dès l'entrée ; les visages retenus s'y empilent et le nombre se met à jour.
  - Script : src/scripts/matching.ts.
  - Bouton désactivé (« Continuer » de la démo) : il n'est plus transparent. Il reste noir, avec un texte et une flèche atténués.
- Raison : retour de Diego (« c'est top […] le bouton noir en bas, on ne le voit pas à cause de l'animation […] un peu plus moderne, des animations de jauge qui bouge, une animation d'entrée plus waouh »).
- Statut : proposition à valider.
- Source : message de Diego, 12 novembre 2026.

## 2026-11-12 — Panneau 01 « Base clients » : visages des contacts et jauges de matching
- Décision :
  - La scène du panneau 01 montre maintenant six contacts de démonstration (réf. « Adjust look » de fourmula.ai) :
    - portraits réalistes générés avec Higgsfield Soul 2.0 (6 images, environ 0,72 crédit ; lot assets/avatars/2026-11-12-contacts-soul2) ;
    - sous chaque visage : nom, recherche (« 4.5 p. · Littoral · ≤ 1,3 mio ») et jauge de correspondance sur 100.
  - Les trois correspondances retenues (94, 89, 86) s'allument en orange à l'apparition du panneau.
  - En haut : le nouveau lot (« Lot B4 · 4.5 pièces · CHF 1'240'000 »). En bas : la campagne e-mail ciblée pour les trois contacts.
- Raison : demande de Diego (« des avatars de personnes avec une petite jauge de matching […] pour qu'ils comprennent que leur base client, on peut déjà l'utiliser »).
- Remplace / modifie : la scène « matching » avec initiales du même jour.
- Garde-fou : contacts et personnes fictifs (données de démonstration). Le score est une règle, pas l'IA.
- Statut : proposition à valider.
- Source : message de Diego, 12 novembre 2026.

## 2026-11-12 — Un seul bouton sur tout le site ; section Tarifs
- Décision :
  - Bouton unique (composant src/components/ui/Btn.astro, styles src/styles/buttons.css) :
    - forme : rectangle encre, texte blanc, carré blanc avec une flèche ↗ ;
    - au survol, le fond se remplit d'orange de gauche à droite ; dans le carré, la flèche sort en haut à droite et une nouvelle, orange, entre par le bas à gauche ;
    - variante claire (fond blanc, carré encre), même forme et même animation, sur fond sombre et pour le bouton secondaire du hero ;
    - utilisé partout : menu, menu déroulant, hero (2), Sur mesure, parcours, mise en place, CTA, FAQ, tarifs, footer, formulaire de démo (2) ;
    - les boutons dessinés dans les scènes animées (imitation de l'app) ne changent pas.
  - Nouvelle section Tarifs (S09B, après la FAQ) :
    - étiquette « Tarifs » ;
    - titre « Votre agence équipée. / Votre équipe accompagnée. » et introduction de Diego ;
    - carte claire « Mise en place — CHF 6'500.– » (une seule fois) ;
    - carte sombre « Abonnement — dès CHF 450.–/mois », avec trame de code et loupe au survol ;
    - bouton « Découvrir Lotivio pour mon agence ↗ » ;
    - « Tarifs » ajouté au menu et au footer.
- Raison : demandes de Diego (« il faut tous faire les mêmes […] une meilleure animation […] que ça se transforme en orange ou juste la flèche » ; textes et prix de la section Pricing).
- Remplace / modifie :
  - les boutons pilule orange, gris, noirs et blancs de chaque section ;
  - le point « Prix public affiché ou sur demande ? » de PROJECT.md : prix affichés. Le prix accordé à Procité (mise en place CHF 4'500) reste un cas particulier non affiché.
- Statut : décidée.
- Source : messages de Diego, 12 novembre 2026.

## 2026-11-12 — Section « L'IA, dans votre quotidien » (S04) retirée
- Décision :
  - S04 est retirée de la page.
  - Le menu perd son lien « IA ».
  - La pastille du menu indique « Produit · Parcours · Mise en place ».
  - La section « Sur mesure » (S02–S03) enchaîne désormais directement sur le parcours (S05–S06).
- Raison : demande de Diego.
- Effet : l'IA reste présentée dans la carte « Votre assistant IA, à vos côtés au quotidien » (S03), dans le panneau 03 du parcours, dans S07 (carte 03) et dans la FAQ. Le fichier S04IA.astro reste sur le disque, inutilisé.
- Statut : décidée.
- Source : message de Diego, 12 novembre 2026.

## 2026-11-12 — CTA (S08) refait dans la DA Lotivio
- Décision :
  - Le fond de soie est retiré.
  - Nouvelle carte : gris chaud (#F1F0EC) et trame de code tirée d'une résidence sur les bords, avec la loupe qui fait réapparaître le code au survol de la souris (mécanisme du site).
  - Étiquette orange en police technique « Pourquoi Lotivio » et titre encre et gris.
  - Les trois points clés ont un carré orange et sont séparés par des filets.
  - Le bouton orange « Découvrir Lotivio pour mon agence ↗ » est « branché » : deux fils amènent des impulsions orange jusqu'à lui.
- Raison : retour de Diego (« je n'aime pas du tout […] il faut que ce soit beaucoup plus la DA de Lotivio […] avec peut-être une animation au toucher »).
- Remplace / modifie : S08 v1 « soie » du même jour (archives : proofs/archive/S08Cta-v1-soie.astro, s08-cta-v1-soie.css).
- Statut : proposition à valider.
- Source : message de Diego, 12 novembre 2026.

## 2026-11-12 — Nouvelle section CTA (S08) et nouvelle FAQ (S09)
- Décision :
  - S08, juste après « Pensé pour votre agence » (réf. bloc « Essential Tools » de Synais) :
    - présentation : grande carte arrondie sur fond de soie lumineuse, générée avec GPT Image 2.5 (2 variantes, coût inconnu ; variante crème et orange retenue ; lot assets/cta/2026-11-12-fond-soie) ;
    - textes : étiquette « Pourquoi Lotivio », titre « Et si votre prochaine promotion / vous demandait moins de gestion ? », texte de Diego ;
    - trois points séparés par des filets : « Jusqu'à 5 h gagnées par semaine.* », « 24 h/24 », « 1 seul espace » ;
    - bouton « Découvrir Lotivio pour mon agence ↗ ».
  - Note de l'astérisque : « * Selon votre organisation et les canaux connectés. » (formulation de Claude, à valider).
  - S09 FAQ :
    - titre « Les réponses / avant de vous lancer. » ;
    - huit questions et réponses de Diego, qui remplacent les six précédentes ;
    - bloc final « Une question propre à votre agence ? » avec le bouton « Parlons de votre fonctionnement ↗ » ;
    - données structurées FAQPage mises à jour (8 questions).
  - Les questions « Où sont stockées les données ? » et « Mes e-mails sont-ils dans l'historique ? » ne figurent plus sur le site.
- Source du chiffre 5 h, selon Diego : « retours de nos clients recueillis par formulaire ». Les réponses brutes sont à joindre au dossier.
- Remplace / modifie : FAQ du 9.11 (archive : proofs/archive/S09Questions-v1.astro).
- Statut : décidée (textes de Diego) ; note de l'astérisque : à valider.
- Source : messages de Diego, 12 novembre 2026.

## 2026-11-12 — Sections « Pourquoi maintenant ? » (S07B) et « Pour piloter votre activité » (S08) retirées
- Décision : les deux sections sont retirées de la page. La mise en place (S07) enchaîne directement sur les questions (S09). Le lien « Diffusion » du footer, qui pointait vers S08, est retiré.
- Raison : demande de Diego.
- Effet : l'écart entre les 5 h du hero et les 4 h de S07B disparaît, puisque S07B n'est plus affichée.
- Remplace / modifie : rien d'autre. Les fichiers S07BPourquoi.astro et S08Direction.astro restent sur le disque, inutilisés.
- Statut : décidée.
- Source : message de Diego, 12 novembre 2026.

## 2026-11-12 — Mise en place (S07) : « Votre équipe a des biens à vendre. Nous préparons votre Lotivio. »
- Décision :
  - L'étiquette « 🇨🇭 Pensé pour votre agence » est conservée. Titre et introduction de Diego.
  - Quatre cartes au lieu de cinq, textes de Diego, illustrations animées existantes :
    - 01 « Votre façon de travailler devient notre point de départ. » — scène de l'atelier ;
    - 02 « Retrouvez vos contacts. Connectez vos canaux. » — scène des branchements ;
    - 03 « Déléguez des tâches. Gardez la main sur la relation. » — scène du parcours (automatique ou validé par l'agent) ;
    - 04 « Prenez la main sur vos propres projets. » — scène de mise en route (import, équipe, première demande).
  - L'ancienne carte « L'IA connaît vos projets » est retirée : son contenu est repris dans le texte de la carte 03.
  - Nouveau bouton après la section : « Parlons de votre mise en place ↗ » (vers #demo).
  - Le titre d'introduction est un peu réduit (nouvelle feuille src/styles/s07-mise-en-place.css).
- Raison : textes fournis par Diego.
- Remplace / modifie : S07 à 5 cartes (archive : proofs/archive/S07MiseEnPlace-v1-5-cartes.astro).
- Statut : décidée (textes de Diego).
- Source : message de Diego, 12 novembre 2026.

## 2026-11-12 — Parcours (S05–S06) : « Voici comment Lotivio transforme votre façon de commercialiser une promotion »
- Décision :
  - Titre et introduction remplacent « De la demande à la signature » (textes de Diego).
  - Les quatre panneaux empilés gardent leur mécanique : couleurs, grand numéro, scène animée. Chacun prend un titre de Diego et un paragraphe, à la place des encadrés courts :
    - 01 « Vos futurs acheteurs sont peut-être déjà dans votre base. » — nouvelle scène de matching : un lot, trois contacts avec leur score sur 100 et une campagne e-mail ciblée (données de démonstration) ;
    - 02 « Vos leads arrivent. Le suivi fonctionne à votre façon. » — scène des sources branchées ;
    - 03 « Qualifiez mieux. Sachez qui rappeler en priorité. » — scène des relances avec signaux ;
    - 04 « Voyez ce qui se vend. Comprenez d'où viennent les acheteurs. » — scène du pipeline.
  - La scène de qualification WhatsApp est retirée.
  - Le lien « Réserver une démo » de chaque panneau est remplacé par un seul bouton après les panneaux : « Découvrir ce parcours en démo ↗ » (vers #demo).
- Raison : textes fournis par Diego.
- Remplace / modifie : S05–S06 du 9.11 (archive : proofs/archive/S06Parcours-v1-demande-signature.astro).
- À vérifier :
  - la campagne e-mail ciblée depuis le matching : l'app a des brouillons de campagne (IA) et une page Campagnes, mais l'envoi d'une campagne e-mail n'est pas dans la liste des capacités vérifiées de PROJECT.md ;
  - « l'origine de vos acheteurs » : la source de chaque demande est bien suivie.
- Statut : décidée (textes de Diego).
- Source : message de Diego, 12 novembre 2026.

## 2026-11-12 — Section « Sur mesure » (S02 + S03) : nouveaux textes et illustration « mise en place »
- Décision :
  - S02 : étiquette « Sur mesure ». Titre : « Votre façon de vendre. / Un CRM configuré pour la suivre. » (2e ligne en ton atténué). Introduction : « Qui reçoit les demandes ? Comment envoyez-vous les brochures ? Quand l'agent reprend-il la conversation ? Nous partons de votre fonctionnement pour installer Lotivio autour de votre équipe, de vos projets et de vos canaux. »
  - S03 : les trois cartes, sous les fils, reprennent les trois blocs de Diego : « Vos habitudes deviennent le point de départ. », « Votre assistant IA, à vos côtés au quotidien. », « La mise en place se fait avec vous. » Les boutons de chaque carte sont remplacés par un seul bouton sous les cartes, « Parlons du fonctionnement de votre agence ↗ » (vers #demo).
  - Carte 3 : nouvelle illustration « mise en place » dans les deux variantes, BD et trait (GPT Image 2.5, 2 images, coût inconnu). Les illustrations « dictée » ne sont plus utilisées sur le site.
  - Le paragraphe « Lotivio réunit… » (11.11) est remplacé (archives : proofs/archive/S02Temps-v2-enbref.astro, S03Produit-v3-cartes-fonctions.astro).
- Raison : textes fournis par Diego.
- À vérifier : « import des contacts » ne figure pas dans la liste des capacités vérifiées (PROJECT.md). Il est vrai s'il s'agit d'un service fait par l'équipe à la mise en place.
- Statut : décidée (textes de Diego) ; illustrations : variante A ou B à choisir.
- Source : message de Diego, 12 novembre 2026.

## 2026-11-12 — Hero : nouveau texte, « Jusqu'à 5 heures gagnées par semaine »
- Décision :
  - Titre : « Jusqu'à 5 heures gagnées par semaine. / Plus de temps pour vendre vos biens. » (2e ligne en taupe).
  - Sous-titre : « Centralisez vos demandes, simplifiez la qualification de vos prospects et sachez qui relancer. Identifiez les canaux qui vous apportent des acheteurs et gérez la diffusion de vos biens au même endroit. »
  - Bloc bas gauche : étiquette « /mise en place/ » (au lieu de « /en bref/ »), texte « Nous installons et configurons Lotivio selon votre façon de travailler. »
- Raison : textes fournis par Diego.
- Remplace / modifie :
  - le titre « Gardez le fil de chaque acheteur. » et son sous-titre (11.11) ;
  - le chiffre autorisé le 9.11 (« jusqu'à 4 h par semaine et par agent »).
- À trancher :
  - S07B « Pourquoi maintenant ? » affiche encore « jusqu'à 4 h par semaine et par agent » : il faut aligner les deux chiffres ;
  - aucune source écrite n'est encore jointe pour 4 h ni pour 5 h ;
  - le hero ne précise plus « par agent ».
- Statut : décidée (textes de Diego) ; cohérence du chiffre avec S07B : à trancher.
- Source : message de Diego, 12 novembre 2026.

## 2026-11-11 — Footer : image en 4K plus lumineuse, grand « lotivio. » retiré
- Décision :
  - L'image du crépuscule est conservée, agrandie en 4K (Higgsfield Upscale, job 63059e00, 2 crédits), puis éclaircie en local sans bandes.
  - Le voile sombre du footer est allégé.
  - Le grand « lotivio. » est retiré ; le petit logo reste en haut à gauche, comme sur la référence Fable.
  - Le hero reçoit une version mobile plus légère de la photo de la main (480 px, 31 Ko), sur la piste de vitesse donnée par l'autre session.
- Raison : retour de Diego (« le logo doit être supprimé. L'image est bien, mais il faut une image de meilleure qualité et un peu plus lumineuse »).
- Remplace / modifie : footer de l'entrée précédente du même jour.
- Statut : proposition à valider. « Le logo » a été compris comme le grand mot en contour posé sur l'image ; à confirmer.
- Source : conversation Diego / Claude Code, 11 novembre 2026.

## 2026-11-11 — Illustrations des cartes S03 (deux variantes) et footer « crépuscule »
- Décision :
  - Les trois cartes de S03 ont de vraies illustrations en tête de carte, en deux variantes à choisir :
    - A « BD » (ligne claire, une touche d'orange), affichée par défaut ;
    - B « Circuit au trait » (isométrique au trait fin, fils et points orange), visible avec `?illu=trait` dans l'adresse.
    Elles sont générées avec GPT Image 2.5 (6 images, coût inconnu) ; fiche : assets/illustrations/2026-11-11-s03-cartes/FICHE-DE-LOT.md. Elles remplacent les blocs isométriques en points (proofs/archive/S03Produit-v2-iso.astro).
  - Le footer passe du fond orange à un paysage au crépuscule (réf. Fable) :
    - image : mer de brouillard, Alpes en silhouette, horizon orangé ; générée avec Higgsfield Soul Location (4 variantes, 0,48 crédit, job fc8327c5 retenu) ; fiche : assets/footer/2026-11-11-crepuscule-soul-location/README.md ;
    - mise en page : logo et phrase à gauche, bouton blanc « Réserver une démo ↗ » à droite, quatre colonnes (Produit, Agence, Canaux, Compte), mentions en bas ;
    - le grand « lotivio. » est gardé, en contour fin, avec son point orange.
- Raison : demandes de Diego (« des choses différentes […] deux variantes, vraiment bien faites, un petit peu comme en bande dessinée, et un autre […] en rapport avec la DA du site » ; « au niveau du footer, on mette une belle image […] avec Higgsfield »).
- Remplace / modifie : le footer orange du 9.11 (proofs/archive/S11Footer-v1-orange.astro).
- Vérifié : 1440 et 390 px, build.
- Statut : proposition à valider (choix A ou B attendu).
- Source : conversation Diego / Claude Code, 11 novembre 2026.

## 2026-11-11 — Hero épuré avec une main, S02 « Lotivio en bref », S03 en fils et cartes, intro retirée
- Décision :
  - Hero v3, plus lisible :
    - titre court en deux tons, « Gardez le fil / de chaque acheteur. » ;
    - sous-titre de deux lignes : « Vos prospects écrivent partout. Avec Lotivio, chaque demande arrive au même endroit, avec son suivi. » ;
    - au centre, une photo de main qui tient l'objet Lotivio (réf. Synais) ;
    - cinq canaux en icônes seules (Homegate, Meta Ads, votre site, WhatsApp, immobilier.ch), sur des fils fins ;
    - une impulsion à la fois, toutes les 2,4 s ;
    - deux petites cartes sombres, masquées sur mobile.
  - Photo : générée avec Higgsfield Soul 2.0 (4 variantes, 0,48 crédit), puis détourée. La variante c31cb2a1 est retenue ; le logo Lotivio est gravé en composition. Fiche de lot : assets/hero/2026-11-11-main-soul2/README.md.
  - S02 devient une section sombre « Lotivio en bref » (réf. Synais « About us ») : une étiquette, puis le paragraphe « Lotivio réunit les demandes de vos portails, de Meta Ads et de votre site, vos échanges et le suivi de chaque acheteur, dans un CRM réglé avec votre agence. » Les chiffres 4 h, 7 canaux et 24/7 restent en S07B. L'ancienne S02 (« 4 h gagnées » + 3 faits) est archivée.
  - S03 « Ce que Lotivio fait », sur le modèle de la capture fournie par Diego :
    - sous le paragraphe de S02, des fils partent d'un point et se divisent vers trois cartes claires ;
    - chaque carte a une illustration isométrique en points, un titre, un texte et un bouton ;
    - cartes : Demandes reçues, Assistant WhatsApp (leads Meta Ads), Dictée vocale.
    - L'ancien bento est archivé.
  - L'animation d'entrée S00 est retirée de la page (le fichier reste, inutilisé).
- Raison : retours de Diego (« trop d'informations […] pas assez designé », « qu'on ait une main comme dans l'exemple », « la section d'en dessous […] avec une explication de base de Lotivio », « Ce que Lotivio fait : faire exactement comme la section ci-jointe, en dessous de ce texte », « supprimer l'animation du début »).
- Remplace / modifie :
  - le hero « circuit » du même jour (archivé : proofs/archive/S01Hero-v2-circuit.astro, hero-circuit-v2.css) ;
  - S02 (proofs/archive/S02Temps-v1-4h.astro) ;
  - S03 (proofs/archive/S03Produit-v1-bento.astro) ;
  - l'intro du 9.11.
- Vérifié : 1440×900 et 390 px (hero, S02, S03), build. Lighthouse non remesuré après ce changement.
- Statut : proposition à valider.
- Source : conversation Diego / Claude Code, 11 novembre 2026, captures Synais et « AI solutions built for every enterprise team ».

## 2026-11-11 — Titres en éclair orange et illustrations animées de S07
- Décision :
  - Tous les titres de section (H2 et titres des cartes S03) s'animent comme sur fourmula.ai, mesuré sur leur site :
    - à l'entrée dans l'écran, chaque mot apparaît en orange puis reprend sa couleur ;
    - un mot démarre toutes les 0,1 s, ce qui fait glisser l'orange d'un mot à l'autre avant que le titre se stabilise ;
    - sur la section orange (S07B), l'éclair passe en encre.
  - Cette animation remplace les révélations ligne par ligne (SplitText) des titres.
  - Les maquettes statiques des cinq cartes « 🇨🇭 Pensé pour votre agence » (S07) sont remplacées par des illustrations bento animées, en boucle de 9 s :
    1. Atelier : la carte de fonctionnement de l'agence se dessine (sources, demande, qui répond, qui relance).
    2. Branchements : chaque canal se connecte à Lotivio dans son sens réel. Les portails, Meta Ads et le site sont entrants, WhatsApp va dans les deux sens et Outlook ne sert qu'à l'envoi.
    3. Parcours : le premier contact et la brochure partent seuls, tandis que la relance attend la validation de l'agent.
    4. Assistant : il lit la fiche projet et les consignes avant de répondre, et la réponse cite sa source.
    5. Mise en route : import des contacts, équipe en ligne, première demande prise en charge.
  - Toutes les données affichées sont des données de démonstration, sans chiffre de performance.
- Raison : demandes de Diego (« un mot qui se mette en orange et passe sur un autre avant de se stabiliser » ; « les illustrations pour chaque carte en motion design comme un bento design […] d'une grande qualité »).
- Remplace / modifie :
  - révélation des titres par lignes du 9.11 ;
  - maquettes S07 et réglages cliquables de S07.3, dont le code est retiré d'app.ts.
  - La demande d'un hero « plus travaillé » est traitée dans l'entrée « Hero circuit » ci-dessous. Son titre reprend le même langage : chaque mot monte sous un masque et passe par l'orange.
  - Les règles CSS et le code de l'ancien hero, devenus inutiles, sont retirés.
- Fichiers :
  - src/scripts/flash.ts (titres) ;
  - src/scripts/bento.ts (rythme des scènes) ;
  - src/components/S07MiseEnPlace.astro ;
  - global.css, blocs « Titres : éclair orange » et « S07 · illustrations bento ».
- Technique :
  - les animations sont en CSS ;
  - une scène ne tourne que si sa carte est à l'écran ;
  - avec moins de mouvement, ou sans JavaScript, chaque scène s'affiche complète et immobile.
- Vérifié :
  - 10 largeurs de 320 à 1920 px, sans défilement horizontal ;
  - les cinq scènes en mouvement et en état final ;
  - build sans erreur.
- Statut : proposition à valider.
- Source : conversation Diego / Claude Code, 11 novembre 2026, référence https://fourmula.ai/.

## 2026-11-11 — Hero « circuit » sur le modèle de Synais
- Décision :
  - Le premier écran reprend la composition de la référence Synais fournie par Diego : titre centré bicolore (« écrivent partout. » en taupe), fils de circuit fins qui convergent vers un objet central, petits outils gravés posés sur les fils, tuile blanche Lotivio, texte « /en bref/ » en bas à gauche, deux cartes sombres en bas à droite.
  - Les « outils » sur les fils sont les vrais canaux : Homegate, ImmoScout24, immobilier.ch, Properstar, Meta Ads, WhatsApp, votre site.
  - Les connexions se voient : une impulsion orange part de chaque source, allume son jeton au passage, entre dans l'objet Lotivio, puis une impulsion part vers la carte « Demandes reçues », dont le compteur monte.
  - L'objet central est l'icône Lotivio en volume, construite en CSS, avec une lumière orange à sa base. Pas de main ni de photo : aucune génération faite.
  - Les logos ne sont plus dans le titre, la bande « Vos canaux, connectés » et la fenêtre « demandes_recues » sont retirées du hero : les canaux sont désormais sur les fils.
  - Textes : ceux de Figma v6 sont conservés et répartis entre le sous-titre et le bloc « /en bref/ ». Cartes : données de démonstration.
- Raison : demande de Diego (« quelque chose de très similaire […] avec les mêmes détails de finition et autres outils en arrière-plan qui suivent les fils et que l'on voit les connexions »).
- Remplace / modifie : hero variante 1 du 9.11 (archivé dans proofs/archive/S01Hero-v1-avant-circuit.astro). La trame de code ASCII n'est plus dans le hero ; elle reste dans les autres sections.
- Fichiers : src/components/S01Hero.astro, src/styles/hero-circuit.css, src/scripts/hero.ts.
- Vérifié : 390, 1280×800, 1440×900, 1920×1080, mouvement réduit, build.
- Statut : proposition à valider.
- Source : conversation Diego / Claude Code, 11 novembre 2026, capture Synais.

## 2026-11-09 — Barre de navigation dépolie, vitesse et adaptation aux écrans
- Décision :
  - Quand on quitte le haut de page, le menu repose sur une bande en verre dépoli, lisible sur tous les fonds.
  - Le site est optimisé pour la vitesse :
    - CSS intégré dans la page ;
    - trames de code dessinées dans des canvas ;
    - images de 480 px et logos à leur taille d'affichage ;
    - dimensions déclarées pour toutes les images ;
    - initialisations sous la ligne de flottaison et découpage des titres faits en temps libre ;
    - intro jouée une fois par visite.
  - Ajustements pour les écrans de 1001 à 1280 px : cartes sources S06 et carte de démo S10.
- Raison : demandes de Diego (« un petit filtre pour que ce soit beau […] ça ne fait pas pro » ; « un site rapide, très responsif et ultra bien optimisé »).
- Mesure : Lighthouse mobile en bridage réel, première visite. Performance de 64 à 95-97, LCP de 4,6 à 1,3 s, TBT de 710 à 150-240 ms. Poids de 809 à 411 Ko. Bureau à 100.
- Corrigé au passage : titre S07 invisible depuis la réécriture des apparitions.
- Statut : décidée.
- Source : conversation Diego / Claude Code, 9 novembre 2026.

## 2026-11-09 — Animation d'entrée et fluidité calquée sur meotis.ch
- Décision :
  - Une animation d'entrée d'environ 2 s ouvre le site (mécanisme de fourmula.ai) :
    - les sources défilent en haut à gauche, puis le mot se pose sur « Un seul suivi. » ;
    - les photos des résidences défilent au centre et la dernière devient du code ;
    - un compteur monte de 0 à 100 %, puis le rideau se lève et le hero joue son entrée.
  - La fluidité reprend les réglages relevés sur meotis.ch :
    - Lenis avec lerp 0,11 et molette ×1 ;
    - apparitions en transitions CSS déclenchées une fois (déplacement de 18 à 30 px, courbe cubic-bezier(.16,1,.3,1)) ;
    - effets liés au défilement branchés directement sur Lenis, sans second lissage.
  - Les trames de code apparaissent en fondu et ne se calculent jamais pendant le défilement.
  - La lentille au survol suit le pointeur avec un amortissement indépendant de la fréquence de l'écran.
- Raison : demandes de Diego (« Animation d'entrée ! » ; « beaucoup plus smooth […] un peu comme meotis »).
- Mesure : 14 s de défilement à la molette, du haut au bas de la page, à 120 Hz. Pire image à 17 et 25 ms sur deux passages (contre 58 à 775 ms auparavant), et aucune image longue.
- Statut : décidée.
- Source : conversation Diego / Claude Code, 9 novembre 2026. Réglages lus dans le code de meotis.ch le même jour.

## 2026-11-09 — Code au survol, défilement plus fluide, rythme vertical unifié
- Décision : au survol de la souris, une lentille fait réapparaître le code des trames sous le pointeur, sur toute la surface du bloc. Le défilement passe en interpolation continue (Lenis, lerp 0,085). Les sources d'à-coups sont supprimées : onde vocale animée en hauteur, flous d'arrière-plan sur des éléments mis à l'échelle, variable CSS animée sur les panneaux S06, lentilles construites pendant le survol. Les espacements suivent une seule échelle (--sp-sec entre sections, --sp-head entre titre et contenu).
- Raison : retours de Diego (« le code réapparaît un peu […] on voit qu'il y a une interaction », « un peu plus fluide lorsque je scroll », « un peu plus d'espace […] entre les sections ou entre les textes »).
- Corrigé au passage : compteur S02 qui affichait « 44 h », étiquettes S04 sorties de leurs lignes (conflit avec les porte-clés S07B), jambages coupés dans les titres révélés ligne par ligne.
- Statut : décidée.
- Source : conversation Diego / Claude Code, 9 novembre 2026.

## 2026-11-09 — Production : Astro + GSAP + Lenis, site complet en local
- Décision : le site est construit en Astro (statique) avec GSAP (ScrollTrigger, SplitText, ScrambleText) et Lenis, à partir de la maquette a-orbite.html et des textes de Figma v6. Toutes les sections S00 à S11 sont en place, avec les animations du niveau de fourmula.ai et meotis.ch. La réservation de démo se fait en deux étapes (créneau, puis coordonnées) ; sa destination reste à brancher (variables PUBLIC_DEMO_ENDPOINT ou PUBLIC_DEMO_EMAIL).
- Raison : demande de Diego (« on peut y aller pour la production […] animations du même niveau que fourmula.ai et meotis.ch ») ; stack laissée au choix (« là où toi tu as le plus de skill, juste pas Webflow »), démo « à brancher plus tard », mise en ligne « local d'abord ».
- Remplace / modifie : la maquette proofs/a-orbite.html devient une source de conception ; le code de production vit dans src/.
- Statut : décidée. Pas de mise en ligne ni de déploiement sans demande.
- À trancher : destination des demandes de démo et adresse « Écrire à l'équipe » ; domaine lotivio.ch ; URL de la page confidentialité ; contraste du texte blanc sur l'orange #EB6E2C (3:1) ; source du chiffre « 4 h » ; droits d'usage des logos tiers.
- Source : conversation Diego / Claude Code, 9 novembre 2026.

## 2026-11-09 — Hero : variante 1 retenue ; Figma fait foi pour les textes
- Décision : la variante 1 (centrée produit, logos des sources dans le titre, fenêtre de l'app + fiche acheteur) devient le hero, avec les textes réécrits par Diego dans Figma, et la bande « Vos canaux, connectés » conservée dessous. Les textes modifiés dans Figma (v6) font foi sur ceux du code.
- Raison : choix de Diego (« Variante 1 ! », « garde ceci : Container - Vos canaux, connectés »).
- Statut : décidée.
- Reste à faire : reporter dans le code les textes réécrits dans Figma (S02, S04, S06, S07, S07B, S08, S09, S11).
- Source : conversation Diego / Claude Code, 9 novembre 2026. Figma : 64:2 (v6), 65:2 (mobile).

## 2026-11-09 — Hero : variante 2 retenue, déclinaisons 2B et 2C ; page mobile
- Décision : la variante 2 du hero (photo + cartes de l'app) est retenue comme base. Deux déclinaisons proposées dans le même style (2B bandeau photo, 2C photo qui devient code). Une version mobile 390 px de la page est livrée dans Figma, avec une échelle typographique mobile dédiée.
- Raison : choix de Diego (« Je préfère celle-ci… garde ceci… fais 2 autres variantes dans le même style ») ; demandes « il me faut aussi la page en version mobile » et « adapter la taille de la typographie […] pour que le responsive soit le mieux fait possible ».
- Statut : V2 décidée comme base ; choix entre V2, 2B et 2C à faire.
- Source : conversation Diego / Claude Code, 9 novembre 2026. Figma : 36:2 (variantes), 39:2 (mobile).

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
