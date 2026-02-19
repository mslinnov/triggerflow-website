# PRD — TriggerFlow Website

**Projet :** TriggerFlow Website
**Type :** Web Application (Next.js 15)
**Niveau :** 2 (Medium)
**Date :** 2026-01-31
**Product Brief :** `docs/product-brief-triggerflow-website-2026-01-31.md`
**Statut :** Draft

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Business Objectives & Success Metrics](#2-business-objectives--success-metrics)
3. [User Personas](#3-user-personas)
4. [Key User Flows](#4-key-user-flows)
5. [Functional Requirements](#5-functional-requirements)
6. [Non-Functional Requirements](#6-non-functional-requirements)
7. [Epics](#7-epics)
8. [Traceability Matrix](#8-traceability-matrix)
9. [Dependencies](#9-dependencies)
10. [Assumptions & Out of Scope](#10-assumptions--out-of-scope)
11. [Open Questions](#11-open-questions)

---

## 1. Executive Summary

TriggerFlow Website est le site vitrine marketing de TriggerFlow, plateforme SaaS de marketing automation et CRM pour l'hôtellerie. Le site doit :

- **Présenter la valeur de TriggerFlow** avec des cas d'usage concrets et des preuves sociales
- **Générer de l'acquisition SEO** via un blog intégré et une optimisation technique poussée
- **Convertir les visiteurs en leads** via des CTAs vers la démo lemcal et la newsletter Brevo
- **Supporter des campagnes SEA** via un système de landing pages modulaire
- **Être multilingue** (FR/EN) et performant (Lighthouse > 95)

---

## 2. Business Objectives & Success Metrics

### Objectifs

| # | Objectif | Mesure |
|---|----------|--------|
| O1 | Générer des réservations de démo | Nombre de clics CTA démo / mois |
| O2 | Capturer des leads qualifiés | Inscriptions newsletter / mois |
| O3 | Construire un trafic organique | Sessions organiques / mois (GSC) |
| O4 | Établir la crédibilité de marque | Positionnement mots-clés cibles |

### Métriques techniques

| Métrique | Cible |
|----------|-------|
| Lighthouse Performance | > 95 |
| Lighthouse SEO | 100 |
| LCP | < 2.5s |
| CLS | < 0.1 |
| Taux de rebond homepage | < 50% |
| Temps moyen sur site | > 2 min |

---

## 3. User Personas

### Persona 1 : Directeur d'hôtel indépendant
- Hôtel 20-150 chambres, propriétaire ou DG
- Tech-savvy moyen, cherche des solutions simples
- Arrive via Google ("CRM hôtelier", "automatisation hôtel")
- **Besoin principal :** Comprendre vite ce que TriggerFlow fait et réserver une démo

### Persona 2 : Responsable marketing groupe hôtelier
- Groupe 2-50 établissements
- Compare méthodiquement les solutions
- Arrive via recherche ciblée ou recommandation
- **Besoin principal :** Voir les capacités multi-établissement et le ROI

### Persona 3 : Revenue/yield manager
- Focalisé revenu et réservations directes
- Sensible aux données et au ROI
- **Besoin principal :** Voir les fonctionnalités d'upselling et les analytics

---

## 4. Key User Flows

### Flow 1 : Visiteur organique → Démo
1. Arrive sur la homepage via Google
2. Lit le Hero → comprend la proposition de valeur
3. Scrolle → voit les features et cas d'usage
4. Consulte le pricing
5. Clique CTA "Réserver une démo" → redirigé vers lemcal

### Flow 2 : Visiteur SEA → Démo (Landing Page)
1. Clique sur une annonce Google Ads
2. Arrive sur une landing page ciblée (PMS, cas d'usage, ou persona)
3. Voit la proposition de valeur spécifique + preuves sociales
4. Clique CTA → redirigé vers lemcal

### Flow 3 : Visiteur blog → Lead
1. Arrive sur un article blog via Google
2. Lit l'article, trouve de la valeur
3. Voit le CTA newsletter dans l'article ou la sidebar
4. S'inscrit à la newsletter via Brevo

---

## 5. Functional Requirements

### Navigation & Layout

#### FR-001: Header responsive avec navigation
**Priority:** Must Have

**Description:**
Le header doit contenir le logo TriggerFlow, des liens de navigation (ancres vers les sections homepage), un language switcher FR/EN, un bouton "Se connecter" (lien vers app.trigger-flow.com/login), et un bouton CTA "Réserver une démo" (lien vers lemcal).

**Acceptance Criteria:**
- [ ] Logo cliquable renvoie vers la homepage
- [ ] Navigation contient les ancres : Fonctionnalités, Tarifs, FAQ
- [ ] Language switcher bascule entre FR et EN sans rechargement complet
- [ ] Bouton "Se connecter" ouvre app.trigger-flow.com/login dans un nouvel onglet
- [ ] Bouton CTA "Réserver une démo" ouvre lemcal dans un nouvel onglet
- [ ] Header sticky au scroll avec réduction de taille (shrink)
- [ ] Menu hamburger sur mobile avec navigation complète
- [ ] Tous les textes sont traduits via next-intl

---

#### FR-002: Footer avec newsletter et liens
**Priority:** Must Have

**Description:**
Le footer contient les liens vers les pages légales, un formulaire d'inscription newsletter (Brevo/Sibforms), les liens vers les réseaux sociaux (LinkedIn), et les coordonnées de contact.

**Acceptance Criteria:**
- [ ] Liens vers : Mentions légales, CGV, CGU, Politique de confidentialité
- [ ] Formulaire newsletter avec champ email et bouton d'envoi
- [ ] Intégration Brevo/Sibforms fonctionnelle (inscription effective)
- [ ] Lien LinkedIn vers la page entreprise
- [ ] Lien vers l'app (login)
- [ ] Lien vers la démo (lemcal)
- [ ] Copyright et mention légale
- [ ] Responsive sur tous les breakpoints

---

### Homepage Sections

#### FR-003: Hero section
**Priority:** Must Have

**Description:**
Section Hero au-dessus de la ligne de flottaison avec le titre principal ("Automatisez l'expérience client de votre hôtel"), un sous-titre expliquant la proposition de valeur, un CTA principal (démo), des badges de confiance (nombre de PMS, clients, etc.), et une image/illustration hero.

**Acceptance Criteria:**
- [ ] Titre H1 traduit FR/EN
- [ ] Sous-titre descriptif traduit
- [ ] Bouton CTA principal "Réserver une démo" → lemcal (target="_blank")
- [ ] Bouton CTA secondaire optionnel (ex: "Découvrir les fonctionnalités" → ancre)
- [ ] Badges/chiffres clés (ex: "8+ PMS connectés", "Communication multicanale")
- [ ] Image hero avec next/image, format WebP, priority loading
- [ ] Animation d'entrée (Framer Motion) subtile
- [ ] Responsive : layout empilé sur mobile

---

#### FR-004: Carousel logos clients
**Priority:** Should Have

**Description:**
Bandeau défilant de logos de clients/partenaires (Accor, Sofitel, Ibis, Best Western, etc.) pour la preuve sociale.

**Acceptance Criteria:**
- [ ] Logos affichés en défilement horizontal continu (infinite scroll)
- [ ] Minimum 8 logos
- [ ] Images optimisées (WebP, taille fixe)
- [ ] Pause au hover (desktop)
- [ ] Accessible (alt text sur chaque logo)
- [ ] Label traduit "Ils nous font confiance" ou similaire

---

#### FR-005: Section Fonctionnalités (Features)
**Priority:** Must Have

**Description:**
Présentation des 6 piliers fonctionnels de TriggerFlow sous forme de cartes avec icônes, titres, et descriptions courtes. Les 6 piliers : CRM hôtelier, Marketing automation, Communication multicanale, Enquêtes & feedback, Fidélisation, Reporting & analytics.

**Acceptance Criteria:**
- [ ] 6 cartes avec icône (Lucide React), titre, et description
- [ ] Contenu basé sur le document marketing (section "Les 6 piliers fonctionnels")
- [ ] Layout en grid responsive (3 colonnes desktop, 2 tablette, 1 mobile)
- [ ] Tous les textes traduits FR/EN
- [ ] Animations au scroll (apparition progressive)

---

#### FR-006: Timeline Communication (avant/pendant/après séjour)
**Priority:** Must Have

**Description:**
Visualisation du parcours client automatisé en 3 phases : Pré-séjour, Pendant le séjour, Post-séjour. Chaque phase montre les actions automatiques de TriggerFlow.

**Acceptance Criteria:**
- [ ] 3 phases visuellement distinctes (Pré-séjour, Séjour, Post-séjour)
- [ ] Chaque phase liste 3-4 actions automatisées (ex: email bienvenue J-7, SMS code serrure J-1)
- [ ] Design timeline/chronologique lisible
- [ ] Contenus basés sur la section "Parcours client automatisé complet" du doc marketing
- [ ] Traduit FR/EN
- [ ] Responsive

---

#### FR-007: Section Exemples / Cas d'usage
**Priority:** Must Have

**Description:**
4 onglets (tabs) présentant des cas d'usage concrets : SMS automatiques, Gestion d'événements, Enquêtes de satisfaction, Upselling. Chaque tab montre un exemple visuel et une description.

**Acceptance Criteria:**
- [ ] 4 tabs interactifs avec transition animée
- [ ] Chaque tab : titre, description, illustration/screenshot
- [ ] Navigation tab accessible (clavier, aria)
- [ ] Contenus traduits FR/EN
- [ ] Responsive : tabs empilés ou en scroll horizontal sur mobile

---

#### FR-008: Section "Comment ça marche" (How It Works)
**Priority:** Must Have

**Description:**
Explication en 3 étapes simples du fonctionnement : 1) Connectez votre PMS, 2) Configurez vos workflows, 3) Laissez TriggerFlow faire le reste. Avec les logos des PMS compatibles.

**Acceptance Criteria:**
- [ ] 3 étapes numérotées avec icône, titre, description
- [ ] Logos des 8+ PMS compatibles (Mews, Opera Cloud, Medialog, Misterbooking, Asterio, Hotello, Thais, Vega)
- [ ] Design visuel type "stepper" ou progression
- [ ] Traduit FR/EN
- [ ] CTA vers la démo après les 3 étapes

---

#### FR-009: Section Pricing
**Priority:** Must Have

**Description:**
Tableau comparatif de 4 plans tarifaires avec features incluses, prix, et CTA par plan. Design clair permettant une comparaison rapide.

**Acceptance Criteria:**
- [ ] 4 plans affichés en colonnes (cards)
- [ ] Chaque plan : nom, prix (mensuel), liste de features incluses, CTA
- [ ] Plan recommandé mis en avant visuellement (badge, bordure, couleur)
- [ ] Toggle mensuel/annuel si applicable
- [ ] Tableau de comparaison détaillé en dessous (features × plans)
- [ ] CTA "Réserver une démo" ou "Commencer" par plan → lemcal
- [ ] Traduit FR/EN
- [ ] Responsive : cards empilées sur mobile, scroll horizontal ou accordion pour le tableau

---

#### FR-010: Section Badges de confiance (Benefits)
**Priority:** Should Have

**Description:**
4 badges mettant en avant des points de confiance : Support réactif, Conformité RGPD, Données hébergées en France/EU, Setup accompagné.

**Acceptance Criteria:**
- [ ] 4 badges avec icône et texte court
- [ ] Layout horizontal (desktop), grid 2×2 (mobile)
- [ ] Traduit FR/EN

---

#### FR-011: Section Fonctionnalités détaillées (Detailed Features)
**Priority:** Should Have

**Description:**
3 onglets avec screenshots de l'application montrant les fonctionnalités en détail (ex: CRM, Workflow builder, Messagerie).

**Acceptance Criteria:**
- [ ] 3 tabs avec screenshots de l'app
- [ ] Chaque tab : titre, description détaillée, image/screenshot
- [ ] Images optimisées (next/image, WebP)
- [ ] Traduit FR/EN
- [ ] Responsive

---

#### FR-012: Section Témoignages
**Priority:** Should Have

**Description:**
Carousel de témoignages clients avec nom, rôle, établissement, photo, et citation.

**Acceptance Criteria:**
- [ ] Carousel avec navigation (flèches, dots)
- [ ] Chaque témoignage : citation, nom, rôle, établissement, photo
- [ ] Auto-play avec pause au hover
- [ ] Minimum 3 témoignages
- [ ] Accessible (aria-label, navigation clavier)
- [ ] Traduit FR/EN

---

#### FR-013: Section FAQ
**Priority:** Must Have

**Description:**
Section FAQ en format accordion avec les questions fréquentes sur TriggerFlow. Optimisée pour le SEO avec Schema.org FAQPage.

**Acceptance Criteria:**
- [ ] Accordion avec ouverture/fermeture animée
- [ ] Minimum 8 questions/réponses
- [ ] Un seul item ouvert à la fois (ou multi-ouvert — choix UX)
- [ ] Schema.org FAQPage en JSON-LD
- [ ] Traduit FR/EN
- [ ] Accessible (clavier, aria-expanded)

---

#### FR-014: Section CTA finale
**Priority:** Must Have

**Description:**
Dernière section avant le footer avec un CTA fort pour réserver une démo. Titre accrocheur, sous-titre, et bouton CTA.

**Acceptance Criteria:**
- [ ] Titre accrocheur traduit FR/EN
- [ ] Sous-titre avec proposition de valeur
- [ ] Bouton CTA "Réserver une démo" → lemcal
- [ ] Design visuellement distinct (background coloré ou gradient)

---

### Pages Légales

#### FR-015: Pages légales (Mentions légales, CGV, CGU, Politique confidentialité)
**Priority:** Must Have

**Description:**
4 pages légales accessibles depuis le footer avec le contenu juridique requis. Layout simple et lisible.

**Acceptance Criteria:**
- [ ] 4 routes : `/mentions-legales`, `/cgv`, `/cgu`, `/politique-confidentialite`
- [ ] Contenu textuel structuré (headings, paragraphes, listes)
- [ ] Layout propre avec navigation retour vers la homepage
- [ ] Metadata SEO (title, description) pour chaque page
- [ ] Traduit FR/EN (au minimum FR obligatoire)
- [ ] Dernière date de mise à jour affichée

---

### Blog

#### FR-016: Système de blog MDX
**Priority:** Must Have

**Description:**
Blog intégré avec articles en MDX, permettant d'inclure des composants React dans les articles. Page listing et pages articles individuelles.

**Acceptance Criteria:**
- [ ] Page listing `/blog` avec liste des articles (titre, date, extrait, image, catégorie)
- [ ] Page article `/blog/[slug]` avec rendu MDX complet
- [ ] Frontmatter MDX : title, description, date, author, category, tags, image, locale
- [ ] Pagination ou infinite scroll sur la page listing
- [ ] Filtrage par catégorie
- [ ] Images d'articles optimisées (next/image)
- [ ] Composants MDX personnalisés (callout, code block, etc.)
- [ ] Metadata SEO dynamiques par article (title, description, og:image)
- [ ] Schema.org Article/BlogPosting
- [ ] Support FR/EN (articles par locale)
- [ ] Responsive

---

#### FR-017: Blog SEO et partage
**Priority:** Must Have

**Description:**
Chaque article de blog doit être optimisé pour le SEO et le partage social.

**Acceptance Criteria:**
- [ ] Balise title unique par article
- [ ] Meta description unique par article
- [ ] Open Graph tags (og:title, og:description, og:image, og:type)
- [ ] Twitter Card tags
- [ ] URL canonique
- [ ] Fil d'Ariane (breadcrumb) avec Schema.org BreadcrumbList
- [ ] Temps de lecture estimé
- [ ] Table des matières automatique (TOC) pour les articles longs

---

#### FR-022: Workflow d'import d'articles blog
**Priority:** Must Have

**Description:**
Système d'import d'articles depuis un dossier externe (`~/Documents/Msl Innov/Trigger Flow/website/articles/a-implementer/`). Les articles sont rédigés par Claude dans une instance séparée, déposés dans ce dossier avec un YAML front matter complet (silo, SEO, liens, images avec prompts). Le workflow d'implémentation les transforme en pages MDX sur le site.

**Acceptance Criteria:**
- [ ] Lecture des articles `.md` depuis `articles/a-implementer/`
- [ ] Parsing du YAML front matter (silo, type, SEO, liens, images)
- [ ] Génération des images via API Replicate (google/nano-banana pour illustrations, google/nano-banana-pro pour photos)
- [ ] Placement des images générées dans `public/images/blog/{slug}/`
- [ ] Transformation en fichier MDX dans `content/blog/{silo-slug}/{slug}.mdx`
- [ ] Intégration automatique des liens internes (résolution des fichiers vers les URLs)
- [ ] Intégration des liens externes
- [ ] Déplacement de l'article source vers `articles/implementes/` après implémentation
- [ ] Log de l'opération (succès/erreur par article)

**Dependencies:** FR-016

---

#### FR-023: Structure de silos sémantiques blog
**Priority:** Must Have

**Description:**
Le blog est organisé en 5 silos sémantiques avec maillage interne structuré. Chaque silo a une page pilier et des articles support/satellite. Les URLs reflètent la structure : `/blog/{silo-slug}/{article-slug}/`.

**Silos :**
| ID | Nom | Slug |
|----|-----|------|
| S1 | Automatisation hôtelière | automatisation |
| S2 | Expérience client | experience-client |
| S3 | Revenue & Upselling | revenue-upselling |
| S4 | Tech & Intégrations | tech-integrations |
| S5 | Guides pratiques | guides |

**Acceptance Criteria:**
- [ ] Routes `/blog/{silo-slug}/` affichant les articles du silo
- [ ] Page listing par silo avec description et articles classés par type (pilier en haut)
- [ ] Maillage interne automatique basé sur le champ `liens_internes` du YAML
- [ ] Breadcrumb reflétant la hiérarchie : Blog > Silo > Article
- [ ] Navigation entre silos accessible
- [ ] Schema.org BreadcrumbList par page

**Dependencies:** FR-016

---

### Landing Pages SEA

#### FR-018: Système de landing pages modulaire
**Priority:** Must Have

**Description:**
Architecture de landing pages réutilisable avec des composants modulaires pour créer rapidement des LP ciblées par PMS, cas d'usage, ou persona. Le système est prêt, les LP individuelles seront créées au fur et à mesure des campagnes.

**Acceptance Criteria:**
- [ ] Route dynamique `/lp/[slug]` pour les landing pages
- [ ] Composants modulaires réutilisables :
  - LPHero (titre, sous-titre, CTA, image)
  - LPSocialProof (logos, chiffres, témoignage court)
  - LPFeatures (3-6 features ciblées avec icônes)
  - LPBenefits (avantages clés avec descriptions)
  - LPTestimonial (témoignage développé)
  - LPCTA (section CTA finale)
  - LPPricing (pricing simplifié ou lien vers pricing complet)
- [ ] Configuration par fichier (MDX ou JSON) pour chaque LP
- [ ] Chaque LP a ses propres metadata SEO (noindex optionnel pour les LP SEA)
- [ ] Support FR/EN
- [ ] Performance Lighthouse > 95 (critique pour Quality Score Google Ads)
- [ ] Design épuré, orienté conversion (pas de navigation distrayante)
- [ ] Header simplifié (logo + CTA seulement, pas de nav complète)
- [ ] Responsive

---

### Internationalisation

#### FR-019: Internationalisation FR/EN complète
**Priority:** Must Have

**Description:**
Tout le contenu du site est disponible en français et en anglais via next-intl. Le français est la langue par défaut.

**Acceptance Criteria:**
- [ ] Routes préfixées par locale : `/fr/...`, `/en/...`
- [ ] Détection automatique de la langue du navigateur
- [ ] FR comme langue par défaut (fallback)
- [ ] Language switcher dans le header
- [ ] Tous les textes UI dans `messages/fr.json` et `messages/en.json`
- [ ] Contenu blog filtré par locale
- [ ] Metadata SEO par locale
- [ ] Balises hreflang pour chaque page
- [ ] Sitemap inclut les versions FR et EN

---

### SEO Technique

#### FR-020: SEO on-page et structured data
**Priority:** Must Have

**Description:**
Optimisation SEO technique complète : metadata, Schema.org, sitemap, robots.txt, Core Web Vitals.

**Acceptance Criteria:**
- [ ] Title et meta description uniques par page
- [ ] Schema.org JSON-LD :
  - Organization (homepage)
  - SoftwareApplication (homepage)
  - FAQPage (section FAQ)
  - Product (section pricing)
  - Article/BlogPosting (articles blog)
  - BreadcrumbList (blog, pages légales)
- [ ] Sitemap XML dynamique (`/sitemap.xml`) incluant toutes les pages FR et EN
- [ ] Robots.txt (`/robots.txt`) avec référence sitemap
- [ ] Balises Open Graph et Twitter Card sur toutes les pages
- [ ] Balises hreflang sur toutes les pages
- [ ] Images avec alt text descriptif
- [ ] Heading hierarchy correcte (H1 unique, H2-H6 structurés)
- [ ] URLs propres et descriptives

---

### Intégrations

#### FR-021: Intégration newsletter Brevo
**Priority:** Must Have

**Description:**
Formulaire d'inscription newsletter connecté à Brevo (ex-Sendinblue) via Sibforms ou API.

**Acceptance Criteria:**
- [ ] Formulaire email dans le footer
- [ ] Formulaire optionnel dans les articles de blog (inline CTA)
- [ ] Validation email côté client
- [ ] Envoi vers Brevo (Sibforms embed ou API route Next.js)
- [ ] Message de confirmation après inscription
- [ ] Gestion des erreurs (email invalide, déjà inscrit)
- [ ] Conformité RGPD (consentement explicite, lien vers politique de confidentialité)

---

## 6. Non-Functional Requirements

### NFR-001: Performance — Core Web Vitals
**Priority:** Must Have

**Description:**
Le site doit atteindre d'excellents scores de performance pour l'expérience utilisateur et le SEO.

**Acceptance Criteria:**
- [ ] Lighthouse Performance Score > 95 sur mobile et desktop
- [ ] LCP (Largest Contentful Paint) < 2.5s
- [ ] FID (First Input Delay) < 100ms
- [ ] CLS (Cumulative Layout Shift) < 0.1
- [ ] TTFB (Time to First Byte) < 200ms (Cloudflare Edge)
- [ ] Bundle JS < 150KB gzipped pour le first load

**Rationale:** Performance impacte directement le SEO (Core Web Vitals), le taux de rebond, et le Quality Score des campagnes Google Ads.

---

### NFR-002: SEO — Score Lighthouse
**Priority:** Must Have

**Description:**
Score SEO Lighthouse maximal sur toutes les pages.

**Acceptance Criteria:**
- [ ] Lighthouse SEO Score = 100 sur toutes les pages
- [ ] Aucune erreur dans Google Search Console après déploiement
- [ ] Toutes les pages indexables sont dans le sitemap

**Rationale:** Le SEO est un objectif business principal du site.

---

### NFR-003: Accessibilité
**Priority:** Should Have

**Description:**
Le site doit être accessible selon les standards WCAG 2.1 niveau AA.

**Acceptance Criteria:**
- [ ] Lighthouse Accessibility Score > 90
- [ ] Navigation au clavier complète
- [ ] Contraste des couleurs conforme WCAG AA (ratio 4.5:1 texte normal, 3:1 grand texte)
- [ ] Alt text sur toutes les images
- [ ] Labels sur tous les formulaires
- [ ] Aria attributes sur les composants interactifs (accordion, tabs, carousel)
- [ ] Focus visible sur tous les éléments interactifs

**Rationale:** Accessibilité légale (directive européenne) et bonne pratique UX.

---

### NFR-004: Compatibilité navigateurs et devices
**Priority:** Must Have

**Description:**
Le site fonctionne correctement sur les navigateurs et appareils modernes.

**Acceptance Criteria:**
- [ ] Chrome, Firefox, Safari, Edge (2 dernières versions majeures)
- [ ] iOS Safari, Chrome Android
- [ ] Breakpoints responsive : mobile (< 768px), tablette (768-1024px), desktop (> 1024px)
- [ ] Pas de scroll horizontal non intentionnel

**Rationale:** Les hôteliers utilisent des devices variés.

---

### NFR-005: Sécurité
**Priority:** Must Have

**Description:**
Le site applique les bonnes pratiques de sécurité web.

**Acceptance Criteria:**
- [ ] HTTPS enforced (Cloudflare default)
- [ ] Security headers configurés :
  - Content-Security-Policy
  - X-Content-Type-Options: nosniff
  - X-Frame-Options: DENY
  - Referrer-Policy: strict-origin-when-cross-origin
  - Strict-Transport-Security
- [ ] Pas de fuite de données sensibles (clés API, tokens)
- [ ] Formulaire newsletter protégé contre le spam (rate limiting ou honeypot)
- [ ] Conformité RGPD (bandeau cookies si nécessaire, consentement newsletter)

**Rationale:** Protection des utilisateurs et conformité légale.

---

### NFR-006: Maintenabilité du code
**Priority:** Should Have

**Description:**
Le code est propre, typé, et maintenable.

**Acceptance Criteria:**
- [ ] TypeScript strict mode, aucun `any`
- [ ] ESLint sans erreurs
- [ ] Composants modulaires et réutilisables
- [ ] Fichiers de traduction structurés (pas de textes hardcodés)
- [ ] Conventions de nommage cohérentes (cf. CLAUDE.md)
- [ ] Server Components par défaut, "use client" uniquement quand nécessaire

**Rationale:** Développement en interne, le code doit être maintenable par une petite équipe.

---

### NFR-007: Déploiement et CI/CD
**Priority:** Should Have

**Description:**
Déploiement automatisé via Cloudflare Pages avec preview deployments.

**Acceptance Criteria:**
- [ ] Déploiement automatique sur push main → production (Cloudflare Pages)
- [ ] Preview deployments sur chaque PR (*.pages.dev)
- [ ] Build réussi sans erreurs TypeScript ni ESLint
- [ ] Variables d'environnement gérées via Cloudflare Pages dashboard

**Rationale:** Workflow de développement efficace pour une petite équipe.

---

## 7. Epics

### EPIC-001: Foundation & Layout
**Description:**
Mise en place de l'architecture Next.js, du système i18n, du layout global (Header, Footer), et de la configuration SEO de base.

**Functional Requirements:**
- FR-001 (Header)
- FR-002 (Footer)
- FR-019 (i18n)
- FR-020 (SEO technique)
- FR-021 (Newsletter Brevo)

**Story Count Estimate:** 5-7

**Priority:** Must Have

**Business Value:**
Fondation technique sur laquelle tout le reste repose. Sans cela, aucune page ne peut être construite.

---

### EPIC-002: Homepage Sections
**Description:**
Développement de toutes les sections de la homepage, de la Hero au CTA final. C'est le cœur du site marketing.

**Functional Requirements:**
- FR-003 (Hero)
- FR-004 (Logo carousel)
- FR-005 (Features)
- FR-006 (Timeline)
- FR-007 (Exemples/cas d'usage)
- FR-008 (How It Works)
- FR-009 (Pricing)
- FR-010 (Badges)
- FR-011 (Detailed Features)
- FR-012 (Témoignages)
- FR-013 (FAQ)
- FR-014 (CTA finale)

**Story Count Estimate:** 8-12

**Priority:** Must Have

**Business Value:**
La homepage est la page principale de conversion. Elle doit convaincre les visiteurs de la valeur de TriggerFlow.

---

### EPIC-003: Blog System
**Description:**
Mise en place du système de blog MDX avec silos sémantiques, pages listing par silo, pages articles, SEO par article, composants MDX personnalisés, et workflow d'import automatisé depuis un dossier externe (avec génération d'images via Replicate).

**Functional Requirements:**
- FR-016 (Blog MDX)
- FR-017 (Blog SEO)
- FR-022 (Workflow import articles)
- FR-023 (Silos sémantiques)

**Story Count Estimate:** 5-8

**Priority:** Must Have

**Business Value:**
Le blog est le moteur d'acquisition SEO long terme. Les silos structurent le maillage interne pour le SEO. Le workflow d'import automatise la publication et la génération d'illustrations.

---

### EPIC-004: Landing Pages SEA
**Description:**
Création du système modulaire de landing pages pour les campagnes Google Ads. Composants réutilisables et architecture de configuration.

**Functional Requirements:**
- FR-018 (Système LP modulaire)

**Story Count Estimate:** 2-4

**Priority:** Must Have

**Business Value:**
Les LP SEA sont le levier de conversion pour les campagnes payantes. Un bon Quality Score réduit le coût par clic.

---

### EPIC-005: Legal Pages
**Description:**
Création des 4 pages légales obligatoires.

**Functional Requirements:**
- FR-015 (Pages légales)

**Story Count Estimate:** 1-2

**Priority:** Must Have

**Business Value:**
Obligatoire légalement. Nécessaire avant mise en production.

---

## 8. Traceability Matrix

| Epic | Nom | FRs | Stories estimées | Priorité |
|------|-----|-----|-----------------|----------|
| EPIC-001 | Foundation & Layout | FR-001, FR-002, FR-019, FR-020, FR-021 | 5-7 | Must |
| EPIC-002 | Homepage Sections | FR-003 → FR-014 | 8-12 | Must |
| EPIC-003 | Blog System | FR-016, FR-017, FR-022, FR-023 | 5-8 | Must |
| EPIC-004 | Landing Pages SEA | FR-018 | 2-4 | Must |
| EPIC-005 | Legal Pages | FR-015 | 1-2 | Must |
| **Total** | | **23 FRs** | **21-33 stories** | |

### Prioritization Summary

| Priorité | FRs | NFRs |
|----------|-----|------|
| Must Have | 19 | 5 |
| Should Have | 4 | 2 |
| Could Have | 0 | 0 |
| **Total** | **23** | **7** |

---

## 9. Dependencies

### Dependencies internes
- **Contenus textuels** : Le document de référence marketing est la source principale
- **Screenshots** : Captures d'écran de l'app TriggerFlow nécessaires pour les sections Detailed Features et cas d'usage
- **Logos clients** : Fichiers logos pour le carousel
- **Logos PMS** : Logos des 8 PMS pour la section How It Works
- **Témoignages** : Citations clients validées
- **Contenus juridiques** : Textes des pages légales validés

### Dependencies externes
- **Cloudflare Pages** : Hébergement et déploiement (via @opennextjs/cloudflare)
- **Brevo/Sibforms** : Intégration newsletter
- **lemcal** : URL de réservation de démo
- **Domaine** : trigger-flow.com configuré et pointé
- **Replicate API** : Génération d'images blog (google/nano-banana, google/nano-banana-pro)

---

## 10. Assumptions & Out of Scope

### Assumptions
- Le document de référence marketing est à jour
- Les screenshots de l'app seront fournis
- Le domaine est configuré via Cloudflare DNS et pointe vers Cloudflare Pages
- L'intégration Brevo est faisable côté client (Sibforms embed)
- Les articles de blog seront rédigés progressivement après le lancement
- Les LP individuelles seront créées au fur et à mesure des campagnes SEA

### Out of Scope (V1)
- Espace client / dashboard
- CMS pour le blog (articles gérés en MDX dans le repo)
- A/B testing
- Chat en direct / chatbot
- Analytics avancée (heatmaps, session recording)
- Pages produit détaillées par pilier
- Page "À propos" / équipe
- Page études de cas détaillées
- Landing pages individuelles (seul le système modulaire est en V1)

---

## 11. Open Questions

| # | Question | Impact | Statut |
|---|----------|--------|--------|
| Q1 | Quels témoignages clients sont disponibles et validés ? | FR-012 (Testimonials) | Open |
| Q2 | Le pricing exact est-il finalisé (montants, features par plan) ? | FR-009 (Pricing) | Open |
| Q3 | Quels contenus juridiques sont prêts pour les pages légales ? | FR-015 (Legal) | Open |
| Q4 | Le tracking analytics (Google Analytics, etc.) est-il prévu en V1 ? | NFR | Open |
| Q5 | Faut-il un bandeau de consentement cookies ? | NFR-005 (Sécurité/RGPD) | Open |

---

*Document généré dans le cadre du workflow BMAD Method v6 — Phase 2: Planning*
