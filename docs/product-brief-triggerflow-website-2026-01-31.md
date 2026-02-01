# Product Brief — TriggerFlow Website

**Projet :** TriggerFlow Website
**Type :** Web Application (Next.js)
**Niveau :** 2 (Medium)
**Date :** 2026-01-31
**Statut :** Draft

---

## 1. Executive Summary

TriggerFlow Website est le site vitrine marketing de TriggerFlow, plateforme SaaS de marketing automation et CRM conçue pour l'hôtellerie. Le site a pour mission de présenter la puissance de l'outil, générer de l'acquisition continue via le SEO (blog + pages optimisées), et convertir les visiteurs en leads qualifiés ou en réservations de démo. Il remplace l'actuel site Webflow par une solution Next.js performante, multilingue (FR/EN), et entièrement maîtrisée.

---

## 2. Problem Statement

### Le problème

Le site actuel sur Webflow présente des limitations en termes de performance, SEO avancé, et flexibilité. Il ne permet pas de :
- Déployer une stratégie SEO technique poussée (vitesse, structured data, sitemap dynamique)
- Créer un blog intégré pour le content marketing
- Avoir un contrôle total sur le code et les optimisations
- Supporter efficacement l'internationalisation (FR/EN)

### Pourquoi maintenant

TriggerFlow a atteint une maturité produit suffisante (8+ PMS, 6 piliers fonctionnels complets) pour investir dans une acquisition organique durable. Le SEO est un canal d'acquisition à forte rentabilité long terme, et chaque mois sans site optimisé est un mois de trafic organique perdu.

### Impact si non résolu

- Dépendance continue aux canaux payants (SEA, outbound) pour l'acquisition
- Pas de trafic organique qualifié
- Image de marque limitée par les contraintes Webflow
- Impossibilité de déployer une stratégie de content marketing efficace

---

## 3. Target Audience

### Utilisateurs primaires — Visiteurs du site

**Persona 1 : Le directeur d'hôtel indépendant**
- Hôtel de 20 à 150 chambres, souvent propriétaire ou DG
- Porte plusieurs casquettes (opérations, commercial, accueil)
- Tech-savvy moyen, cherche des solutions simples et concrètes
- Arrive via recherche Google ("automatisation hôtel", "CRM hôtelier", "email automatique hôtel")

**Persona 2 : Le responsable marketing d'un groupe hôtelier**
- Groupe de 2 à 50 établissements
- Cherche cohérence de communication et vision consolidée
- Plus tech-savvy, compare les solutions méthodiquement
- Arrive via recherche ciblée ou recommandation

**Persona 3 : Le revenue/yield manager**
- Focalisé sur l'optimisation du revenu et les réservations directes
- Cherche des leviers d'upselling et de fidélisation mesurables
- Sensible aux données et au ROI

### Utilisateurs secondaires

- **Équipe TriggerFlow** : Utilise le site comme support commercial (envoi de liens, démo)
- **Partenaires PMS** : Consultent la page intégrations pour valider la compatibilité

### Besoins clés adressés

1. Comprendre rapidement ce que fait TriggerFlow et en quoi c'est différent
2. Voir des cas d'usage concrets applicables à leur établissement
3. Pouvoir réserver une démo ou laisser leurs coordonnées facilement

---

## 4. Solution Overview

### Solution proposée

Un site Next.js 15 (App Router, RSC) hébergé sur Vercel, avec :
- **Homepage complète** : 14 sections couvrant proposition de valeur, fonctionnalités, pricing, témoignages, FAQ
- **Blog intégré** : Articles SEO pour le content marketing hôtelier
- **Pages légales** : Mentions légales, CGV, CGU, politique de confidentialité
- **Internationalisation** : FR/EN via next-intl
- **Performance** : Lighthouse > 95, LCP < 2.5s

### Features clés

- Header avec navigation, language switcher, CTAs (démo + login)
- Hero section avec proposition de valeur et badges
- Carousel logos clients (Accor, Sofitel, Ibis, Best Western...)
- Présentation des 6 piliers fonctionnels (CRM, Automation, Multicanal, Enquêtes, Fidélité, Reporting)
- Timeline communication (avant/pendant/après séjour)
- Exemples de cas d'usage (SMS, Events, Enquêtes, Upsell)
- Section "Comment ça marche" avec logos PMS
- Tableau de pricing comparatif (4 plans)
- Badges de confiance (Support, RGPD, etc.)
- Fonctionnalités détaillées avec screenshots
- Témoignages clients en carousel
- FAQ en accordion
- CTA final de conversion
- Footer avec newsletter (Brevo/Sibforms), liens, social
- Blog avec articles catégorisés, SEO-friendly
- Schema.org (Organization, SoftwareApplication, FAQPage, Product)
- Sitemap dynamique et robots.txt optimisé

### Proposition de valeur du site

Donner aux hôteliers une compréhension immédiate de la valeur de TriggerFlow, avec suffisamment de preuves concrètes (cas d'usage, screenshots, témoignages) pour les convaincre de réserver une démo — tout en construisant un actif SEO durable via le blog.

---

## 5. Business Objectives

### Objectifs

- **Génération de démos** : Augmenter le nombre de réservations de démo via lemcal
- **Capture de leads** : Collecter des emails qualifiés via newsletter et contenus blog
- **Trafic organique** : Construire un trafic SEO croissant sur les requêtes hôtellerie + automatisation
- **Image de marque** : Établir TriggerFlow comme référence du marketing automation hôtelier

### Métriques de succès

- Nombre de réservations de démo / mois via le site
- Nombre d'inscriptions newsletter / mois
- Trafic organique mensuel (Google Search Console)
- Positionnement sur les mots-clés cibles (ex: "CRM hôtelier", "automatisation hôtel")
- Score Lighthouse Performance > 95
- Score Lighthouse SEO = 100
- Taux de rebond homepage < 50%
- Temps passé sur le site > 2 minutes

### Valeur business

- Réduction de la dépendance aux canaux payants pour l'acquisition
- Création d'un actif marketing durable (contenu SEO)
- Support commercial autonome (le site vend avant le commercial)
- Crédibilité et professionnalisme renforcés

---

## 6. Scope

### In Scope (V1)

- Homepage complète (14 sections telles que décrites dans CLAUDE.md)
- 4 pages légales (mentions légales, CGV, CGU, politique confidentialité)
- Section blog (listing + pages articles)
- Landing pages SEA optimisées conversion pour campagnes Google Ads :
  - LP par PMS (ex: "TriggerFlow pour Mews", "TriggerFlow pour Opera Cloud")
  - LP par cas d'usage (ex: "Automatisation pré-séjour", "Upselling hôtelier")
  - LP par persona (ex: "Pour les hôtels indépendants", "Pour les groupes hôteliers")
  - Structure réutilisable avec composants modulaires (Hero, Social proof, Features, CTA)
  - Optimisées pour le Quality Score Google Ads (vitesse, pertinence, CTA clair)
- Internationalisation FR/EN (next-intl)
- SEO technique (metadata, Schema.org, sitemap, robots.txt)
- Responsive design (mobile-first)
- Animations (Framer Motion)
- Intégration newsletter (Brevo/Sibforms)
- Liens externes (démo lemcal, login app, LinkedIn)
- Performance Lighthouse > 95

### Out of Scope (V1)

- Espace client / dashboard
- Système de gestion de contenu (CMS) pour le blog — articles en MDX ou statique
- A/B testing
- Chat en direct / chatbot
- Intégration analytics avancée (heatmaps, session recording)
- Pages produit détaillées par pilier fonctionnel
- Page "À propos" / équipe
- Page études de cas / case studies détaillées

### Future Considerations (V2+)

- CMS headless pour le blog (Sanity, Strapi, ou autre)
- Pages produit détaillées pour chaque pilier
- Section case studies / success stories
- A/B testing (Vercel Edge Config ou similaire)
- Chatbot / widget d'aide
- Page "À propos" et équipe
- Multi-langue étendu (ES, DE, IT)
- Comparatifs concurrents (TriggerFlow vs Experience CRM, vs Duve, etc.)

---

## 7. Stakeholders

- **Mounir (Fondateur/CEO)** — Influence haute. Décisionnaire principal, valide la direction produit et le contenu. Exécutant principal du développement avec Claude.
- **Équipe produit/technique (2-3 personnes)** — Influence moyenne. Fournissent les contenus techniques, screenshots, et retours sur la précision des descriptions produit.

---

## 8. Constraints & Assumptions

### Contraintes

- **Budget limité** : Pas de prestataires externes, développement en interne avec assistance IA (Claude)
- **Contenus partiellement prêts** : Logos et quelques screenshots disponibles, mais textes finaux et visuels complémentaires à créer
- **Stack imposée** : Next.js 15, TypeScript, Tailwind CSS, Vercel (déjà défini dans CLAUDE.md)
- **Deux langues** : FR et EN uniquement pour la V1
- **Pas de CMS** : Articles de blog gérés en statique ou MDX

### Assumptions

- Le document de référence marketing fourni est à jour et reflète le positionnement actuel
- Les screenshots de l'application seront disponibles au moment de l'intégration
- Le domaine trigger-flow.com est déjà configuré et pointé vers Vercel
- L'intégration Brevo pour la newsletter est techniquement faisable côté client
- Les contenus du blog seront rédigés progressivement après le lancement du site

---

## 9. Success Criteria

- Le site est en ligne, performant (Lighthouse > 95), et sans bugs critiques
- La homepage présente clairement la proposition de valeur de TriggerFlow
- Un visiteur comprend en moins de 30 secondes ce que fait TriggerFlow et pour qui
- Le parcours vers la réservation de démo est fluide (max 2 clics depuis n'importe quelle page)
- Le site est indexé par Google et les premières pages apparaissent dans les résultats
- Le blog est fonctionnel et prêt à recevoir du contenu
- Le site est 100% responsive et fonctionne sur tous les navigateurs modernes
- Les traductions FR/EN sont complètes et cohérentes

---

## 10. Risks

- **Contenu incomplet**
  - **Likelihood :** High
  - **Impact :** Retarde le lancement ou oblige à publier avec des sections placeholder
  - **Mitigation :** Prioriser les sections critiques (Hero, Features, Pricing, CTA), utiliser le document marketing comme base pour générer les textes, préparer les screenshots en parallèle

- **SEO long terme**
  - **Likelihood :** Medium
  - **Impact :** Le trafic organique met 3-6 mois à se matérialiser
  - **Mitigation :** Investir dans la qualité technique SEO dès le départ, planifier un calendrier éditorial blog, travailler les backlinks en parallèle

- **Scope creep blog**
  - **Likelihood :** Medium
  - **Impact :** Le blog pourrait complexifier la V1 et retarder le lancement
  - **Mitigation :** Implémenter le blog avec une architecture simple (MDX/statique), lancer avec 2-3 articles piliers, itérer ensuite

- **Qualité des traductions EN**
  - **Likelihood :** Low
  - **Impact :** Traductions IA parfois approximatives sur le ton et les nuances hôtelières
  - **Mitigation :** Relecture humaine des textes clés (Hero, Pricing, CTA), utiliser le glossaire du document marketing

---

## 11. Technical Context

### Stack technique (définie)

- **Framework :** Next.js 15 (App Router, React Server Components)
- **Language :** TypeScript (strict mode)
- **Styling :** Tailwind CSS
- **Animations :** Framer Motion
- **i18n :** next-intl (FR/EN)
- **Hosting :** Vercel
- **Icons :** Lucide React
- **Newsletter :** Brevo/Sibforms

### Performance targets

- Lighthouse Performance > 95
- Lighthouse SEO = 100
- LCP < 2.5s
- CLS < 0.1

### SEO technique

- Metadata dynamiques par page
- Schema.org JSON-LD (Organization, SoftwareApplication, FAQPage, Product)
- Sitemap XML dynamique
- Robots.txt optimisé
- Images WebP avec next/image
- Core Web Vitals optimisés

---

*Document généré dans le cadre du workflow BMAD Method v6 — Phase 1: Analysis*
