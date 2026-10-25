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
- Timeline À propos : « 100 premiers clients » (2021) et « ouverture à l'international » (2022) à confirmer.

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
