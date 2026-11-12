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
