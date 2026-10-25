# Stratégie GEO : être cité par les moteurs IA

Mise à jour : 25/10/2026. Chantier c-36b23ffc.

GEO (Generative Engine Optimization) : faire en sorte que ChatGPT, Perplexity, Claude, Gemini, Google AI Overviews
et AI Mode citent et recommandent TriggerFlow quand un hôtelier demande un CRM hôtelier, du marketing automation pour
hôtel, un outil d'enquête de satisfaction, de gestion des avis, etc.

## 1. Comment les moteurs IA choisissent ce qu'ils citent

1. **Ils cherchent sur le web au moment de répondre** (Bing pour ChatGPT et Copilot, l'index Google pour Gemini et
   AI Overviews, leur propre robot pour Perplexity et Claude), puis résument les pages trouvées. Une marque absente des
   pages bien classées n'est pas citée.
2. **Ils préfèrent les sources tierces** pour une question « quel est le meilleur… » : comparatifs, annuaires de
   logiciels, avis d'utilisateurs. Le site de l'éditeur sert surtout à confirmer les faits.
3. **Ils croisent les faits** : nom, catégorie, date de création, ville, prix, intégrations. Des faits contradictoires
   d'une source à l'autre rendent la marque moins sûre, donc moins citée.
4. **Ils extraient des passages** : un paragraphe qui répond seul à la question (définition, résumé, tableau, Q/R)
   est repris tel quel ; un texte qui ne se comprend qu'en contexte ne l'est pas.

## 2. Point de départ (mesure du 25/10/2026)

| Requête (recherche web, base des moteurs IA) | TriggerFlow cité ? | Sources citées à la place |
|---|---|---|
| meilleur CRM hôtelier hôtel indépendant | non | HotelTechReport, La Fabrique du Net, Croclub, monday.com |
| best hotel CRM for independent hotels 2026 | non | AxisRooms, FitGap, Roommaster, SendSquared, HotelTechReport |
| questionnaire de satisfaction hôtel automatiser logiciel | non | GetWelcom, Hoteligy, Qualitelis, InputKit |
| TriggerFlow CRM hôtel avis | fiche Mews Marketplace seulement (intitulée « utelys ») | aucun avis tiers |
| "trigger-flow.com" | non, nom confondu avec Power Automate, n8n, Zoho Flow | |

Perplexity et ChatGPT demandent une connexion : la mesure directe est à faire à la main (§6).

**Conclusion : le premier levier est hors site.** Le site doit ensuite être facile à citer quand un moteur y arrive.

## 3. Fait dans le code (branche `feat/geo-referencement-ia` du site, `feat/geo` de tf-agents)

### Site et blog
- **Faits de marque uniques** : `src/data/brand.ts` (création 2019 à Toulouse, éditeur Utelys, PMS connectés vérifiés
  dans le code de l'app, définition FR/EN). Utilisé par le JSON-LD Organization et par `llms.txt`.
  Retirés : « leader », « levée de fonds 2021 », « 20 collaborateurs », « 15 pays », création 2020 à Paris.
  Nombre d'hôtels : 300+ partout (chiffre confirmé le 25/10/2026, `src/data/company-stats.ts`).
- **Frise À propos** réduite aux faits confirmés : 2019 création à Toulouse, 2024 ouverture à l'international,
  aujourd'hui 300+ hôtels.
- **À propos** : l'équipe fictive (noms d'exemple) remplacée par les vraies personnes (`src/data/authors.ts`).
- **Clock PMS retiré** (FAQ accueil, FAQ ventes additionnelles, page intégrations, bandeaux de logos) : aucun
  connecteur Clock n'existe dans l'app.
- **FAQ d'accueil** : le JSON-LD FAQPage lit les mêmes messages que la FAQ affichée (6 questions au lieu de 4 copiées).
- **Articles signés par une personne** : champ `auteur` du frontmatter (`mounir-lakhfif`, `soufiane-bouyahia`),
  affiché sous le titre et balisé en schema.org Person ; sans champ, l'article est signé Mounir Lakhfif.
- **Date de mise à jour affichée** quand elle diffère de la date de publication.
- **Résumé « En bref / In short »** en tête des 13 articles (10 ajoutés, rédigés à partir du texte existant, aucun
  fait nouveau). Un test vérifie qu'il est présent dans les 600 premiers caractères de chaque article.
- **`/llms.txt`** généré (FR + EN, faits clés, pages produit, solutions, tous les articles) et **`/llms-full.txt`**
  (texte intégral des articles, chiffres TriggerFlow résolus, composants retirés).
- **`robots.txt`** : robots IA nommés explicitement et autorisés, entraînement compris (décision du 25/10/2026).
- **En-tête HTTP `Link` hreflang** en `http://` supprimé (les hreflang restent dans les balises de chaque page).

### Circuit d'articles (tf-agents)
- Consignes GEO dans `lib/contenu/prompts.js` (règles communes, squelette, relecture Opus) : résumé « En bref /
  In short » en tête, première phrase de chaque H2 qui répond, définition du terme principal, TriggerFlow nommé en
  toutes lettres, chiffres sectoriels seulement avec leur source, tableau dès qu'on compare, titre de FAQ exact.
- Champ `auteur` posé par le pipeline (une paire FR/EN garde le même auteur, alternance Mounir / Soufiane).
- Deux alertes non bloquantes de l'humaniseur, visibles dans `/super-admin/blog` : résumé absent en tête, titre de
  FAQ qui ne correspond pas au motif du site (sinon le JSON-LD FAQPage est perdu). Aucune validation ajoutée.

## 4. À faire par Mounir (hors code), par ordre d'impact

1. **Fiches sur les comparateurs que citent les moteurs** (texte de fiche prêt ci-dessous) :
   - HotelTechReport (catégorie Hotel CRM) : hoteltechreport.com, « List your product » ;
   - Capterra / GetApp / Software Advice (même compte Gartner Digital Markets) ;
   - G2 (catégorie Hotel CRM / Hospitality) ;
   - La Fabrique du Net (page « Logiciels CRM pour hôtels »), Croclub, appvizer : demander l'ajout.
2. **Avis clients sur Capterra et HotelTechReport** : demander à tous les clients actifs, sans filtrer par
   satisfaction (pas de review gating, contraire aux règles Google et des plateformes). Objectif : 10 avis par site.
3. **Fiche Mews Marketplace** : renommer « utelys » en « TriggerFlow », reprendre la définition ci-dessous, lien vers
   https://www.trigger-flow.com/fr/integrations/pms/mews. Même démarche sur les places de marché Apaleo, Thaïs,
   Medialog, Opera Cloud quand elles existent.
4. **Presse Equip'Hôtel (2-5 nov., stand H006)** : un communiqué aux titres que les moteurs citent (L'Hôtellerie
   Restauration, Hospitality ON, Journal des Palaces, Hotel Tech Report news) avec la définition et un chiffre client
   vérifié.
5. **Bing Webmaster Tools** : vérifier le site et soumettre le sitemap (ChatGPT search s'appuie sur Bing).
6. **Prioriser dans le CRM blog** (bouton « Prioriser ») les sujets « réponses » :
   - « Comment choisir un CRM hôtelier : critères et comparatif » (FR et EN) ;
   - « CRM compatible Thaïs », « CRM compatible Medialog », « CRM compatible Mews » ;
   - versions manquantes : EN de `marketing-automation-hotelier-guide`, FR de `hotel-review-management-guide` et de
     `hotel-satisfaction-survey-questions`.
7. **Page LinkedIn de l'entreprise** : même définition en description, lien vers le site. Profil LinkedIn de Mounir
   à communiquer pour l'ajouter à `src/data/authors.ts`.
8. **Chantier séparé à lancer** : pages d'intégration par PMS (Thaïs, Medialog, Misterbooking, Opera Cloud…), faits
   vérifiés PMS par PMS dans le code de l'app.

### Définition à reprendre partout (fiches, marketplaces, presse)
- FR : TriggerFlow est un CRM hôtelier pour hôtels indépendants et groupes : il centralise les données clients issues
  du PMS et automatise emails, SMS, WhatsApp, enquêtes de satisfaction, avis, ventes additionnelles et fidélité.
  Créé en 2019 à Toulouse, édité par Utelys. Tarifs publics, offre gratuite pour démarrer.
- EN : TriggerFlow is a hotel CRM for independent hotels and hotel groups: it centralizes guest data from the PMS and
  automates email, SMS, WhatsApp, satisfaction surveys, reviews, upselling and loyalty. Founded in 2019 in Toulouse,
  France, published by Utelys. Public pricing, free plan to start.

## 5. Dette de contenu repérée (à traiter au fil des mises à jour)
- Aucun article ne cite de source externe. Plusieurs chiffres sectoriels ne disent pas d'où ils viennent (ex. « 4x plus
  d'avis Google », « 98 % de taux d'ouverture SMS », « 6-12 mois de retour sur investissement »). À sourcer ou à
  retirer lors de la prochaine révision de chaque article.
- La page intégration Mews présente Soufiane avec une bio (« 8 ans… », « Food Hotel Tech 2025 ») à confirmer.

## 6. Mesure

- **Automatique** : le digest SEO du lundi (tf-agents `seo-weekly`) compte déjà les sessions venant de ChatGPT,
  Perplexity et Claude. Suivre la courbe mois par mois.
- **À la main, le 1er de chaque mois** : poser ces requêtes dans ChatGPT (recherche activée), Perplexity, Gemini et
  Google (AI Overview), noter pour chacune « cité / mentionné / absent » et l'URL citée.

| # | Requête |
|---|---|
| 1 | Quel CRM hôtelier choisir pour un hôtel indépendant ? |
| 2 | Quel CRM est compatible avec Mews ? |
| 3 | Quel CRM est compatible avec Thaïs ? |
| 4 | Logiciel pour automatiser les emails pré-séjour d'un hôtel |
| 5 | Comment automatiser l'enquête de satisfaction de mon hôtel ? |
| 6 | Outil pour collecter plus d'avis Google pour un hôtel |
| 7 | Alternative à un CRM hôtelier sur devis avec prix publics |
| 8 | Comment faire des ventes additionnelles avant l'arrivée des clients d'un hôtel ? |
| 9 | Best hotel CRM for independent hotels |
| 10 | Hotel CRM with transparent pricing |
| 11 | How to automate hotel guest satisfaction surveys |
| 12 | Hotel marketing automation software for small hotels |
| 13 | Qu'est-ce que TriggerFlow ? |
| 14 | TriggerFlow avis |
| 15 | Serrure connectée hôtel : comment envoyer le code automatiquement ? |

## 7. Chiffres vérifiés (chantier c-1cdbb6b6, 25/10/2026)

Règle : un chiffre de résultat publié sur le site, le blog ou `llms.txt` est soit mesuré (valeur, date, méthode
ci-dessous, et dans le champ `source` de `src/data/company-stats.ts`), soit absent. Taux arrondis vers le bas,
période et périmètre affichés à côté. Le test `src/data/claims.test.ts` (dans `npm test`) bloque le retour des
affirmations retirées et tout pourcentage non mesuré dans les pages produit, solutions et messages.
Volumes absolus d'envois jamais publiés (même règle que `post-stay.ts`) : ils restent dans les sources.

| Chiffre publié | Valeur | Mesuré le | Méthode et périmètre |
|---|---|---|---|
| Hôtels clients | 300+ | 25/10/2026 | Confirmé par Mounir |
| Messages envoyés | 2M+ | 25/10/2026 | Confirmé par Mounir |
| Note Google | 5/5, 3 avis | 25/10/2026 | Fiche Google de TriggerFlow (Toulouse), relevée à la main ; toujours affichée avec le nombre d'avis |
| E-mails délivrés | 94 % | 25/10/2026 | Base prod, 12 mois, 117 établissements : délivrés / tentés (rejets définitifs Mailgun compris, envois bloqués avant départ exclus) = 94,8 % |
| Ouverture des e-mails | 35 % | 25/10/2026 | Base prod, 12 mois : ouverts / délivrés, hors adresses relais OTA (pixel absent) = 35,2 %. Gonflé par les ouvertures automatiques d'Apple Mail |
| SMS remis | 90 % | 25/10/2026 | Base prod, 12 mois, 31 établissements : remis / tentés = 90,6 %. Aucun taux de lecture SMS n'est mesurable (pas d'accusé de lecture) |
| WhatsApp lus | 84 % | 25/10/2026 | Base prod, 12 mois, 21 établissements : lus, répondus ou interagis / remis = 84,8 % |
| Paiements dans les 2 h | 91 % | 25/10/2026 | Base prod, 12 mois, 20 établissements : paiements par lien réglés dans les 2 h après l'ouverture du lien = 91,0 % des paiements (pas des liens envoyés) |
| Offres de vente additionnelle achetées | 5,15 % (5 % en stat) | 18/09/2026 | Étude ventes additionnelles, offres envoyées 3 à 7 jours avant l'arrivée (`src/data/upsell-services.ts`) |
| Avis complétés selon l'heure d'envoi | 18,8 % (9 h-11 h), 8 % (11 h-14 h) | 18/09/2026 | Étude post-séjour, juin à septembre 2026 (`src/data/post-stay.ts`) |
| PMS connectés | 13 | 25/10/2026 | Connecteurs présents dans l'app (`src/data/brand.ts`, Lean PMS ajouté à la revue) |
| PMS bientôt disponibles | Chloé | 25/10/2026 | `brand.pmsEnCours`, affichés à part (« bientôt disponible »), jamais comptés dans le total ; d'autres seront ajoutés une fois nommés |
| Autres connexions | serrures Sesame, Igloohome ; paiement Stripe, PayZen, SystemPay, Thaïs ; avis Google, TripAdvisor, Booking.com, Airbnb ; boîtes Gmail, Microsoft 365 | 25/10/2026 | `brand.connections`, vérifiées dans l'app (Plug.php, Services/Locks, Services/Payments, Services/Reviews, FacilityMailbox) |
| Zapier et n8n | « des milliers d'applications » | 25/10/2026 | Action webhook des scénarios vers Zapier, n8n ou Make (TriggerFlow n'est pas dans leur catalogue). Catalogues : zapier.com/apps « 10368+ apps », n8n.io/integrations « 2,000+ integrations » |

Sources publiques citées dans le blog : Tripadvisor et Ipsos MORI (2019, 81 % des voyageurs lisent les avis avant
de réserver un hébergement) ; Michael Luca, Harvard Business School (2011, +5 à 9 % de chiffre d'affaires par
étoile Yelp, restaurants) ; Oaky (29 € de revenu additionnel par chambre et par mois, 5 étoiles).

Retirés car faux ou non mesurables : « 98 % de délivrabilité garantie » (94 % mesuré), « 98 % de taux d'ouverture /
de lecture » SMS (non mesurable), « 85 % payés en moins de 2 h », « 23 % de conversion upsell » (5,15 % mesuré),
« +17 % de panier moyen », « +45 % / +47 % / +120 % / +150 % d'avis Google », « 4x plus d'avis », « 9,4/10 »,
« 4,8/5 », « 4,9/5 basé sur 150+ avis », « 98 % de satisfaction », « plus de 50 PMS » (13 PMS, présentés avec les autres connexions), les intégrations sans connecteur de la page intégrations (Salto, imprimante, supprimée de l'app en mai 2026, Mollie, PayPal, Trustpilot, Hotels.com), « 5000+ applications » Zapier (10 000+ relevé sur zapier.com), « 10 h / 15 h / 4 h
gagnées par semaine », « 24/7 Support » en anglais (support 7j/7), les résultats chiffrés des cas d'usage des pages
produit et solutions, les taux de réponse sans source des articles d'enquête, « -80 % d'appels » et « rentabilisé
en 6-12 mois » (serrures connectées).

Hors périmètre par décision du 25/10/2026, à traiter ensuite :
- **Témoignages** (inchangés, à confirmer un par un) : liste dans le plan du chantier (accueil, LP Thaïs, pages
  produit et solutions, page Mews). Points urgents : Maxime Jullien (Edgar) et Sandrine Surrel (Nature Cathare)
  portent sur l'accueil une citation inventée (« note OTA de 4.2 à 4.7 »), et les témoignages fictifs portent
  encore des chiffres (« +120 % d'avis Google en 4 mois », « rentabilisé en 2 semaines », « 8.2 → 9.1 »).
- **Maquettes d'interface** et badges flottants (pages produit, LP Thaïs, tableau de bord d'accueil) : valeurs
  d'exemple inchangées.
- **`AnimatedStat`** rend « 0 » côté serveur (il compte de 0 à la valeur dans le navigateur) : les robots qui ne
  lancent pas le JavaScript lisent « 0 % ». À corriger pour que les chiffres vérifiés soient lisibles.

### Provenance des logos d'intégration ajoutés le 25/10/2026

Fichiers dans `public/images/integrations/`, pris sur le site officiel de chaque éditeur (aucune banque d'images,
aucun logo redessiné). SVG contrôlés sans script ni gestionnaire d'événement (test `claims.test.ts`).

| Logo | Fichier | Source officielle |
|---|---|---|
| Beds24 | `beds24.svg` | Logo du site beds24.com : https://beds24.citybreakweb.com/themes/custom/citybreakweb/cb_beds24/logo.svg |
| SystemPay | `systempay.png` | Documentation officielle Systempay : https://paiement.systempay.fr/doc/api/assets/assets/doc/images/systempay/white_labels/systempay/logo.png |
| Reservit | `reservit.webp` (déjà présent) | Identique en dimensions au logo de reservit.com : https://www.reservit.com/zeeptapo/2021/01/logo.png |
| Paiement Thaïs | `thais.svg` (déjà présent) | Identique octet pour octet au logo de thais-soft.com : https://www.thais-soft.com/_nuxt/img/7bca891.svg |
| Hotello | aucun | hotello.com et app.hotello.com servent un site de jeux d'argent (relevé le 25/10/2026) : aucune carte en attendant la décision |

