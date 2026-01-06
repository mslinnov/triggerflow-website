# PRD - Pages Manquantes TriggerFlow

## Contexte

Site TriggerFlow en Next.js 15 + TypeScript + Tailwind + Framer Motion + next-intl.
Projet : `~/htdocs/triggerflow-website/`
24 pages déjà créées. Il reste 11 pages à créer pour compléter le site.

---

## Pages à créer

### Résumé

| # | Page | URL FR | URL EN | Priorité |
|---|------|--------|--------|----------|
| 1 | Hub messagerie | `/produit/hub-messagerie` | `/product/messaging-hub` | Haute |
| 2 | Ventes additionnelles | `/produit/ventes-additionnelles` | `/product/upsell` | Haute |
| 3 | Automatiser communication | `/solutions/automatiser-communication` | `/solutions/automate-communication` | Haute |
| 4 | Augmenter avis Google | `/solutions/augmenter-avis` | `/solutions/increase-reviews` | Haute |
| 5 | Booster upsell | `/solutions/booster-upsell` | `/solutions/boost-upsell` | Haute |
| 6 | Fidéliser clients | `/solutions/fideliser-clients` | `/solutions/customer-loyalty` | Haute |
| 7 | Blog | `/blog` | `/blog` | Moyenne |
| 8 | Cas clients | `/ressources/cas-clients` | `/resources/case-studies` | Moyenne |
| 9 | Guides & Ebooks | `/ressources/guides` | `/resources/guides` | Moyenne |
| 10 | Centre d'aide | `/ressources/aide` | `/resources/help` | Basse |
| 11 | Carrières | `/entreprise/carrieres` | `/company/careers` | Basse |

---

## PARTIE 1 : Modules Produit (2 pages)

### 1.1 Hub Messagerie (`/produit/hub-messagerie`)

**Ajouter au fichier `src/data/modules.ts` :**

```typescript
'hub-messagerie': {
  slug: 'hub-messagerie',
  slugEn: 'messaging-hub',
  icon: 'Inbox',
  title: 'Hub Messagerie',
  headline: 'Tous vos canaux dans une seule boîte de réception',
  description: 'Centralisez emails, SMS et WhatsApp dans une interface unique. Ne manquez plus jamais un message client et répondez en un clic.',
  mockup: 'DashboardMockup',
  painPoints: [
    'Vous jonglez entre 5 outils différents pour communiquer',
    'Des messages clients passent entre les mailles du filet',
    'Impossible de voir l\'historique complet d\'un client'
  ],
  benefits: [
    'Une seule inbox pour tous vos canaux',
    'Historique client unifié et contextuel',
    'Réponse en 1 clic avec templates'
  ],
  features: [
    {
      title: 'Inbox unifiée',
      description: 'Emails, SMS, WhatsApp... tous vos messages arrivent au même endroit.',
      icon: 'Inbox'
    },
    {
      title: 'Vue client 360°',
      description: 'En un clic, voyez tout l\'historique : séjours, préférences, communications passées.',
      icon: 'User'
    },
    {
      title: 'Templates de réponse',
      description: 'Répondez en 1 clic avec des templates personnalisables.',
      icon: 'FileText'
    },
    {
      title: 'Attribution automatique',
      description: 'Les messages sont automatiquement assignés au bon membre de l\'équipe.',
      icon: 'UserCheck'
    }
  ],
  useCases: [
    { title: 'Demande client WhatsApp', description: 'Répondez depuis le hub, l\'historique email est visible' },
    { title: 'Réclamation multi-canal', description: 'Le client a envoyé un email puis un SMS : tout est groupé' },
    { title: 'Handover équipe', description: 'Passez une conversation à un collègue avec le contexte complet' },
    { title: 'Suivi post-séjour', description: 'Relancez un client depuis sa fiche avec tout l\'historique' }
  ],
  relatedModules: ['email', 'sms', 'whatsapp', 'crm']
}
```

---

### 1.2 Ventes Additionnelles (`/produit/ventes-additionnelles`)

**Ajouter au fichier `src/data/modules.ts` :**

```typescript
'ventes-additionnelles': {
  slug: 'ventes-additionnelles',
  slugEn: 'upsell',
  icon: 'TrendingUp',
  title: 'Ventes Additionnelles',
  headline: 'Augmentez le panier moyen de chaque séjour',
  description: 'Proposez automatiquement les bons services au bon moment : surclassement, spa, restaurant, late checkout... et boostez votre RevPAR.',
  mockup: 'DashboardMockup',
  painPoints: [
    'Vos services annexes sont sous-vendus',
    'La réception n\'a pas le temps de proposer les extras',
    'Vous ne savez pas quoi proposer à qui'
  ],
  benefits: [
    'Offres personnalisées selon le profil client',
    'Envoi automatique au bon moment',
    '+17% de panier moyen en moyenne'
  ],
  features: [
    {
      title: 'Offres contextuelles',
      description: 'Proposez le spa aux couples, le kids club aux familles, le room service aux business.',
      icon: 'Target'
    },
    {
      title: 'Timing intelligent',
      description: 'J-3 pour le surclassement, J-1 pour le restaurant, check-in pour le late checkout.',
      icon: 'Clock'
    },
    {
      title: 'Tunnel de conversion',
      description: 'Le client réserve en 2 clics depuis l\'email ou le SMS.',
      icon: 'ShoppingCart'
    },
    {
      title: 'Suivi des revenus',
      description: 'Mesurez les revenus générés par chaque offre et optimisez.',
      icon: 'BarChart'
    }
  ],
  useCases: [
    { title: 'Surclassement J-3', description: 'Proposez la chambre supérieure à tarif préférentiel' },
    { title: 'Pack romantique', description: 'Champagne + pétales de rose pour les couples' },
    { title: 'Late checkout', description: 'Offre envoyée la veille du départ' },
    { title: 'Table restaurant', description: 'Réservation facilitée pour le dîner sur place' }
  ],
  relatedModules: ['automatisations', 'email', 'sms', 'crm']
}
```

---

## PARTIE 2 : Solutions par Objectif (4 pages)

Ces pages utilisent le même template que les solutions par établissement mais avec un angle "objectif business".

**Créer/modifier `src/data/solutions.ts` pour ajouter :**

### 2.1 Automatiser Communication (`/solutions/automatiser-communication`)

```typescript
'automatiser-communication': {
  slug: 'automatiser-communication',
  slugEn: 'automate-communication',
  icon: 'Zap',
  category: 'objectif', // Pour différencier des solutions "établissement"
  title: 'Automatiser votre communication',
  headline: 'Gagnez 10h par semaine sur vos communications clients',
  description: 'Fini les emails manuels, les copier-coller et les oublis. TriggerFlow envoie automatiquement le bon message au bon moment, 24h/24.',
  challenges: [
    {
      icon: 'Clock',
      title: '2h par jour sur les emails',
      description: 'Confirmation, rappels, remerciements... vous passez votre temps à écrire les mêmes messages.'
    },
    {
      icon: 'AlertCircle',
      title: 'Des messages oubliés',
      description: 'Dans le rush, certains clients ne reçoivent pas leurs infos à temps.'
    },
    {
      icon: 'Copy',
      title: 'Copier-coller sans fin',
      description: 'Vous modifiez les mêmes templates en changeant juste le nom et les dates.'
    },
    {
      icon: 'Moon',
      title: 'Pas de communication le week-end',
      description: 'Les réservations du samedi soir attendent le lundi pour être traitées.'
    }
  ],
  features: [
    { slug: 'automatisations', highlight: 'Workflows visuels sans code' },
    { slug: 'email', highlight: 'Emails personnalisés automatiques' },
    { slug: 'sms', highlight: 'SMS déclenchés par événements' },
    { slug: 'whatsapp', highlight: 'Messages WhatsApp programmés' }
  ],
  useCases: [
    {
      title: 'Séquence réservation complète',
      description: 'De la confirmation au remerciement post-séjour, tout est automatique.',
      steps: ['Réservation', 'Email confirmation', 'Email J-7 infos', 'SMS J-1 arrivée', 'Email J+1 merci']
    },
    {
      title: 'Communication multilingue',
      description: 'Le bon message dans la bonne langue selon la nationalité du client.',
      steps: ['Détection langue', 'Sélection template', 'Envoi personnalisé', 'Suivi ouverture']
    },
    {
      title: 'Relance intelligente',
      description: 'Si le client n\'ouvre pas l\'email, relance automatique par SMS.',
      steps: ['Email envoyé', 'Pas d\'ouverture 24h', 'SMS de relance', 'Notification équipe']
    }
  ],
  testimonial: {
    quote: 'Je passais 2h par jour sur les emails de confirmation. Maintenant c\'est 0. TriggerFlow m\'a rendu mes matinées.',
    author: 'Julie R.',
    role: 'Responsable réservations',
    hotel: 'Hôtel & Spa des Alpes',
    location: 'Chamonix'
  },
  stats: {
    timeGain: '10h/semaine',
    automationRate: '95%',
    responseTime: '< 1 min'
  },
  relatedSolutions: ['augmenter-avis', 'fideliser-clients']
}
```

---

### 2.2 Augmenter Avis Google (`/solutions/augmenter-avis`)

```typescript
'augmenter-avis': {
  slug: 'augmenter-avis',
  slugEn: 'increase-reviews',
  icon: 'Star',
  category: 'objectif',
  title: 'Augmenter vos avis Google',
  headline: 'Doublez vos avis Google en 3 mois',
  description: 'Transformez vos clients satisfaits en ambassadeurs. Demandez des avis au bon moment, aux bonnes personnes, sur les bonnes plateformes.',
  challenges: [
    {
      icon: 'Star',
      title: 'Peu d\'avis malgré des clients satisfaits',
      description: 'Vos clients sont contents mais ne pensent pas à laisser un avis.'
    },
    {
      icon: 'ThumbsDown',
      title: 'Avis négatifs sans réponse',
      description: 'Vous découvrez les mauvais avis trop tard pour réagir.'
    },
    {
      icon: 'Eye',
      title: 'Pas de visibilité sur votre réputation',
      description: 'Google, TripAdvisor, Booking... impossible de tout suivre.'
    },
    {
      icon: 'Clock',
      title: 'Pas le temps de répondre',
      description: 'Rédiger une réponse personnalisée prend 10 minutes par avis.'
    }
  ],
  features: [
    { slug: 'avis', highlight: 'Collecte automatique d\'avis' },
    { slug: 'automatisations', highlight: 'Demande au bon moment' },
    { slug: 'formulaires', highlight: 'Enquête satisfaction avant avis' },
    { slug: 'analytics', highlight: 'Suivi réputation en temps réel' }
  ],
  useCases: [
    {
      title: 'Filtre satisfaction',
      description: 'Seuls les clients satisfaits (>4/5) reçoivent la demande d\'avis Google.',
      steps: ['Email J+1 enquête', 'Si note > 4/5', 'Lien Google envoyé', 'Si note < 4/5 → alerte manager']
    },
    {
      title: 'Multi-plateformes intelligent',
      description: 'Dirigez les clients vers la plateforme où vous avez besoin d\'avis.',
      steps: ['Analyse plateformes', 'Priorité Google si < 50 avis', 'Sinon TripAdvisor', 'Rotation automatique']
    },
    {
      title: 'Réponse assistée IA',
      description: 'L\'IA génère une réponse personnalisée, vous validez en 1 clic.',
      steps: ['Nouvel avis détecté', 'Génération réponse IA', 'Validation manager', 'Publication']
    }
  ],
  testimonial: {
    quote: 'On est passé de 45 à 120 avis Google en 4 mois. Notre note est passée de 4.2 à 4.6. Game changer.',
    author: 'Marc T.',
    role: 'Directeur',
    hotel: 'Le Boutique Hotel',
    location: 'Bordeaux'
  },
  stats: {
    reviewIncrease: '+150%',
    ratingImprove: '+0.4 étoile',
    responseRate: '100%'
  },
  relatedSolutions: ['automatiser-communication', 'fideliser-clients']
}
```

---

### 2.3 Booster Upsell (`/solutions/booster-upsell`)

```typescript
'booster-upsell': {
  slug: 'booster-upsell',
  slugEn: 'boost-upsell',
  icon: 'TrendingUp',
  category: 'objectif',
  title: 'Booster vos ventes additionnelles',
  headline: '+17% de panier moyen grâce à l\'upsell automatisé',
  description: 'Vos services annexes sont une mine d\'or inexploitée. TriggerFlow propose automatiquement le spa, le restaurant, les surclassements... et vos revenus décollent.',
  challenges: [
    {
      icon: 'DollarSign',
      title: 'Services sous-vendus',
      description: 'Spa, restaurant, activités... vos services ont de la capacité disponible.'
    },
    {
      icon: 'Users',
      title: 'La réception ne propose pas',
      description: 'Trop occupés, mal à l\'aise ou pas formés à la vente.'
    },
    {
      icon: 'Target',
      title: 'Offres non ciblées',
      description: 'Vous proposez la même chose à tout le monde.'
    },
    {
      icon: 'Clock',
      title: 'Mauvais timing',
      description: 'L\'offre arrive trop tôt ou trop tard.'
    }
  ],
  features: [
    { slug: 'ventes-additionnelles', highlight: 'Offres automatisées' },
    { slug: 'automatisations', highlight: 'Timing intelligent' },
    { slug: 'crm', highlight: 'Segmentation client' },
    { slug: 'analytics', highlight: 'Suivi revenus générés' }
  ],
  useCases: [
    {
      title: 'Surclassement pré-séjour',
      description: 'J-3 : proposez la chambre supérieure avec une réduction.',
      steps: ['J-3 avant arrivée', 'Email offre surclassement', 'Paiement en ligne', 'PMS mis à jour']
    },
    {
      title: 'Cross-sell contextuel',
      description: 'Couple en séjour romantique → pack champagne. Famille → kids club.',
      steps: ['Analyse réservation', 'Détection profil', 'Offre personnalisée', 'Conversion']
    },
    {
      title: 'Late checkout jour J',
      description: 'Le matin du départ, SMS avec offre late checkout.',
      steps: ['Jour départ 8h', 'SMS offre -20€', 'Réponse client', 'Mise à jour système']
    }
  ],
  testimonial: {
    quote: 'Le surclassement automatique nous rapporte 3000€ de plus par mois. L\'investissement TriggerFlow est rentabilisé en 2 semaines.',
    author: 'Nathalie P.',
    role: 'Revenue Manager',
    hotel: 'Grand Hotel du Port',
    location: 'La Rochelle'
  },
  stats: {
    revenueIncrease: '+17%',
    upsellRate: '23%',
    roi: '10x'
  },
  relatedSolutions: ['automatiser-communication', 'fideliser-clients']
}
```

---

### 2.4 Fidéliser Clients (`/solutions/fideliser-clients`)

```typescript
'fideliser-clients': {
  slug: 'fideliser-clients',
  slugEn: 'customer-loyalty',
  icon: 'Heart',
  category: 'objectif',
  title: 'Fidéliser vos clients',
  headline: 'Transformez vos clients en habitués qui réservent en direct',
  description: 'Pourquoi payer 15-20% de commission aux OTA pour des clients que vous connaissez déjà ? Fidélisez-les et récupérez vos marges.',
  challenges: [
    {
      icon: 'Repeat',
      title: 'Clients one-shot',
      description: 'Ils viennent une fois et ne reviennent jamais, même satisfaits.'
    },
    {
      icon: 'Building',
      title: 'Booking capte vos clients',
      description: 'Ils ont séjourné chez vous mais réservent via Booking la fois suivante.'
    },
    {
      icon: 'Gift',
      title: 'Pas de programme fidélité',
      description: 'Les chaînes ont des programmes, pas vous.'
    },
    {
      icon: 'Mail',
      title: 'Pas de suivi post-séjour',
      description: 'Une fois partis, vous perdez le contact.'
    }
  ],
  features: [
    { slug: 'fidelite', highlight: 'Programme fidélité intégré' },
    { slug: 'newsletter', highlight: 'Campagnes ciblées' },
    { slug: 'crm', highlight: 'Historique client complet' },
    { slug: 'automatisations', highlight: 'Relances automatiques' }
  ],
  useCases: [
    {
      title: 'Programme points automatique',
      description: 'Les clients cumulent des points à chaque séjour, échangeables contre des nuits ou services.',
      steps: ['Séjour terminé', 'Points crédités', 'Email récap points', 'Offre fidélité']
    },
    {
      title: 'Anniversaire client',
      description: 'Email automatique avec offre spéciale le jour de l\'anniversaire.',
      steps: ['Date anniversaire', 'Email + offre -15%', 'Validité 30 jours', 'Relance J+15']
    },
    {
      title: 'Campagne win-back',
      description: 'Client pas revenu depuis 12 mois ? Offre de reconquête.',
      steps: ['Détection inactivité', 'Email "Vous nous manquez"', 'Offre exclusive', 'Relance SMS']
    }
  ],
  testimonial: {
    quote: 'Notre taux de réservation directe est passé de 30% à 55%. On économise des milliers d\'euros de commissions OTA.',
    author: 'Pierre D.',
    role: 'Propriétaire',
    hotel: 'Hôtel & Restaurant du Château',
    location: 'Loire'
  },
  stats: {
    directBookings: '+25%',
    returnRate: '35%',
    commissionSaved: '15K€/an'
  },
  relatedSolutions: ['automatiser-communication', 'augmenter-avis']
}
```

---

## PARTIE 3 : Pages Ressources (4 pages)

### 3.1 Blog (`/blog`)

**Fichier : `src/app/[locale]/blog/page.tsx`**

Page listing des articles de blog. Pour l'instant, version statique avec articles placeholder.

**Structure :**

```
┌─────────────────────────────────────────────────────────────┐
│ HERO                                                        │
│ - Titre : "Blog TriggerFlow"                                │
│ - Sous-titre : "Conseils, guides et actualités pour les     │
│   hôteliers qui veulent transformer leur relation client"   │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ ARTICLE MIS EN AVANT (Featured)                             │
│ - Grande card avec image, titre, extrait, date, catégorie   │
│ - Lien vers # (article non créé)                            │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ FILTRES PAR CATÉGORIE                                       │
│ - Tous | Automatisation | Marketing | Avis | Études de cas  │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ GRILLE D'ARTICLES (3 colonnes)                              │
│ - 6-9 articles placeholder avec :                           │
│   - Image placeholder (gradient ou icône)                   │
│   - Catégorie (badge)                                       │
│   - Titre                                                   │
│   - Extrait (2 lignes)                                      │
│   - Date                                                    │
│   - Temps de lecture                                        │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ NEWSLETTER CTA                                              │
│ - "Recevez nos meilleurs conseils chaque semaine"           │
│ - Input email + bouton S'abonner                            │
└─────────────────────────────────────────────────────────────┘
```

**Articles placeholder à créer :**

```typescript
const blogPosts = [
  {
    slug: 'comment-augmenter-avis-google',
    title: 'Comment doubler vos avis Google en 3 mois',
    excerpt: 'Découvrez les techniques utilisées par les hôtels qui collectent le plus d\'avis positifs.',
    category: 'Avis',
    date: '2024-01-15',
    readTime: '8 min',
    featured: true
  },
  {
    slug: 'automatisation-email-hotel',
    title: '5 emails que tout hôtel devrait automatiser',
    excerpt: 'De la confirmation à la demande d\'avis, les emails essentiels pour une relation client impeccable.',
    category: 'Automatisation',
    date: '2024-01-10',
    readTime: '6 min'
  },
  {
    slug: 'upsell-hotel-techniques',
    title: 'Upsell hôtelier : 7 techniques qui fonctionnent',
    excerpt: 'Augmentez votre panier moyen avec ces stratégies de ventes additionnelles éprouvées.',
    category: 'Marketing',
    date: '2024-01-05',
    readTime: '10 min'
  },
  {
    slug: 'whatsapp-business-hotellerie',
    title: 'WhatsApp Business pour les hôtels : le guide complet',
    excerpt: 'Pourquoi et comment utiliser WhatsApp pour communiquer avec vos clients.',
    category: 'Communication',
    date: '2023-12-20',
    readTime: '12 min'
  },
  {
    slug: 'fidelisation-client-hotel',
    title: 'Programme fidélité hôtel : par où commencer ?',
    excerpt: 'Les bases pour créer un programme de fidélité efficace sans budget marketing énorme.',
    category: 'Marketing',
    date: '2023-12-15',
    readTime: '7 min'
  },
  {
    slug: 'crm-hotelier-guide',
    title: 'CRM hôtelier : pourquoi c\'est indispensable en 2024',
    excerpt: 'Comment un CRM peut transformer votre connaissance client et booster vos revenus.',
    category: 'Outils',
    date: '2023-12-10',
    readTime: '9 min'
  }
]
```

**Note importante :** Les liens des articles pointent vers `#` car les pages articles individuelles ne sont pas créées. Ajouter un message "Bientôt disponible" au clic ou désactiver les liens.

---

### 3.2 Cas Clients (`/ressources/cas-clients`)

**Fichier : `src/app/[locale]/ressources/cas-clients/page.tsx`**

**Structure :**

```
┌─────────────────────────────────────────────────────────────┐
│ HERO                                                        │
│ - Titre : "Ils ont transformé leur relation client"         │
│ - Sous-titre : "Découvrez comment nos clients utilisent     │
│   TriggerFlow au quotidien"                                 │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ MÉTRIQUES GLOBALES                                          │
│ - 4 stats : 200+ hôtels | +17% panier moyen |               │
│   +150% avis Google | 10h/semaine gagnées                   │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ FILTRES                                                     │
│ - Par type : Tous | Hôtel indépendant | Groupe | Résidence  │
│ - Par objectif : Automatisation | Avis | Upsell | Fidélité  │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ GRILLE CAS CLIENTS (2-3 colonnes)                           │
│ - Card par cas client :                                     │
│   - Logo/Image hôtel (placeholder)                          │
│   - Nom de l'hôtel                                          │
│   - Type (badge)                                            │
│   - Localisation                                            │
│   - Citation courte                                         │
│   - Résultats clés (2-3 métriques)                          │
│   - Lien "Lire l'étude complète →" (vers #)                 │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ CTA                                                         │
│ - "Rejoignez-les" + Réserver une démo                       │
└─────────────────────────────────────────────────────────────┘
```

**Cas clients placeholder :**

```typescript
const caseStudies = [
  {
    slug: 'hotel-&-spa-du-lac',
    name: 'Hôtel & Spa du Lac',
    type: 'Hôtel indépendant',
    location: 'Annecy',
    quote: 'TriggerFlow nous a permis de passer de 45 à 120 avis Google en 4 mois.',
    results: [
      { metric: '+150%', label: 'Avis Google' },
      { metric: '10h', label: 'Gagnées/semaine' },
      { metric: '4.6★', label: 'Note Google' }
    ],
    objectives: ['Avis', 'Automatisation']
  },
  {
    slug: 'groupe-hotelier-provence',
    name: 'Groupe Hôtelier de Provence',
    type: 'Groupe hôtelier',
    location: 'Provence (8 hôtels)',
    quote: 'Une stratégie marketing unifiée sur nos 8 établissements, enfin !',
    results: [
      { metric: '8', label: 'Hôtels connectés' },
      { metric: '+25%', label: 'Réservations directes' },
      { metric: '2 sem.', label: 'Déploiement' }
    ],
    objectives: ['Fidélité', 'Automatisation']
  },
  {
    slug: 'residence-cote-azur',
    name: 'Résidences Côte d\'Azur',
    type: 'Résidence de tourisme',
    location: 'Nice',
    quote: 'Les arrivées autonomes étaient un cauchemar. Plus maintenant.',
    results: [
      { metric: '-80%', label: 'Appels entrants' },
      { metric: '98%', label: 'Satisfaction proprio' },
      { metric: '2 min', label: 'Check-in moyen' }
    ],
    objectives: ['Automatisation']
  },
  {
    slug: 'camping-les-pins',
    name: 'Camping Les Pins',
    type: 'Camping',
    location: 'Vendée',
    quote: 'Notre taux de re-réservation a plus que doublé grâce aux campagnes early booking.',
    results: [
      { metric: '+120%', label: 'Re-réservation' },
      { metric: '+50%', label: 'Cross-sell' },
      { metric: '15K€', label: 'CA additionnel' }
    ],
    objectives: ['Fidélité', 'Upsell']
  },
  {
    slug: 'boutique-hotel-bordeaux',
    name: 'Le Boutique Hotel',
    type: 'Hôtel indépendant',
    location: 'Bordeaux',
    quote: 'L\'upsell automatique nous rapporte 3000€ de plus par mois.',
    results: [
      { metric: '+17%', label: 'Panier moyen' },
      { metric: '23%', label: 'Taux d\'upsell' },
      { metric: '10x', label: 'ROI TriggerFlow' }
    ],
    objectives: ['Upsell', 'Automatisation']
  }
]
```

---

### 3.3 Guides & Ebooks (`/ressources/guides`)

**Fichier : `src/app/[locale]/ressources/guides/page.tsx`**

**Structure :**

```
┌─────────────────────────────────────────────────────────────┐
│ HERO                                                        │
│ - Titre : "Guides & Ressources"                             │
│ - Sous-titre : "Téléchargez nos guides gratuits pour        │
│   optimiser votre relation client"                          │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ GRILLE GUIDES (2-3 colonnes)                                │
│ - Card par guide :                                          │
│   - Image couverture (placeholder avec icône/gradient)      │
│   - Badge "Guide" ou "Ebook" ou "Checklist"                 │
│   - Titre                                                   │
│   - Description (2-3 lignes)                                │
│   - Nombre de pages                                         │
│   - Bouton "Télécharger" (ouvre modal email ou #)           │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ CTA NEWSLETTER                                              │
│ - "Recevez nos prochains guides en avant-première"          │
└─────────────────────────────────────────────────────────────┘
```

**Guides placeholder :**

```typescript
const guides = [
  {
    slug: 'guide-automatisation-email-hotel',
    title: 'Le guide complet de l\'automatisation email pour hôtels',
    description: 'Tout ce qu\'il faut savoir pour automatiser vos communications : templates, timing, bonnes pratiques.',
    type: 'Guide',
    pages: 32,
    image: 'email-guide'
  },
  {
    slug: 'checklist-pre-sejour',
    title: 'Checklist : Les 15 points de contact pré-séjour',
    description: 'Ne manquez plus aucune opportunité de communication avant l\'arrivée de vos clients.',
    type: 'Checklist',
    pages: 8,
    image: 'checklist'
  },
  {
    slug: 'ebook-avis-google',
    title: 'E-book : Maîtriser les avis Google pour hôteliers',
    description: 'Stratégies avancées pour collecter plus d\'avis et améliorer votre note.',
    type: 'Ebook',
    pages: 45,
    image: 'reviews-ebook'
  },
  {
    slug: 'guide-upsell-hotel',
    title: 'Guide : L\'upsell hôtelier de A à Z',
    description: 'Techniques, exemples et templates pour booster vos ventes additionnelles.',
    type: 'Guide',
    pages: 28,
    image: 'upsell-guide'
  },
  {
    slug: 'template-emails-hotel',
    title: 'Pack : 20 templates d\'emails hôteliers',
    description: 'Templates prêts à l\'emploi pour toutes les étapes du parcours client.',
    type: 'Templates',
    pages: 20,
    image: 'templates-pack'
  },
  {
    slug: 'guide-fidelisation',
    title: 'Guide : Créer son programme de fidélité hôtelier',
    description: 'Comment concevoir et lancer un programme fidélité efficace sans budget énorme.',
    type: 'Guide',
    pages: 36,
    image: 'loyalty-guide'
  }
]
```

**Note :** Les téléchargements pointent vers `#` ou ouvrent un modal "Bientôt disponible".

---

### 3.4 Centre d'aide (`/ressources/aide`)

**Fichier : `src/app/[locale]/ressources/aide/page.tsx`**

**Structure :**

```
┌─────────────────────────────────────────────────────────────┐
│ HERO                                                        │
│ - Titre : "Centre d'aide"                                   │
│ - Sous-titre : "Trouvez rapidement les réponses à vos       │
│   questions"                                                │
│ - Barre de recherche (UI seulement, pas fonctionnelle)      │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ CATÉGORIES D'AIDE (grille 3x2)                              │
│ - Card par catégorie avec icône + titre + description :     │
│   - 🚀 Démarrage : Premiers pas avec TriggerFlow            │
│   - 📧 Communication : Emails, SMS, WhatsApp                │
│   - ⚡ Automatisation : Créer des workflows                 │
│   - 🔗 Intégrations : Connecter vos outils                  │
│   - 💳 Facturation : Abonnement et paiements               │
│   - 👤 Compte : Paramètres et sécurité                      │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ FAQ RAPIDE                                                  │
│ - 6-8 questions fréquentes avec accordéon                   │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ CONTACT SUPPORT                                             │
│ - "Vous n'avez pas trouvé votre réponse ?"                  │
│ - 3 options : Email support | Chat (bientôt) | Téléphone    │
└─────────────────────────────────────────────────────────────┘
```

**FAQ du centre d'aide :**

```typescript
const helpFaq = [
  {
    question: 'Comment connecter mon PMS à TriggerFlow ?',
    answer: 'Rendez-vous dans Paramètres > Intégrations et sélectionnez votre PMS. Suivez l\'assistant de connexion qui vous guidera étape par étape.'
  },
  {
    question: 'Combien de temps dure l\'essai gratuit ?',
    answer: 'L\'essai gratuit dure 14 jours et vous donne accès à toutes les fonctionnalités. Aucune carte bancaire n\'est requise.'
  },
  {
    question: 'Puis-je importer mes contacts existants ?',
    answer: 'Oui, vous pouvez importer vos contacts via fichier CSV ou via la synchronisation automatique avec votre PMS.'
  },
  {
    question: 'Comment créer ma première automatisation ?',
    answer: 'Allez dans Automatisations > Nouvelle automatisation. Choisissez un déclencheur, ajoutez vos actions, et activez. Notre builder visuel ne nécessite aucune compétence technique.'
  },
  {
    question: 'Les SMS sont-ils inclus dans mon abonnement ?',
    answer: 'Les SMS sont inclus dans les plans Conversion (500/mois) et Marketing+ (1000/mois). Pour le plan Communication, ils sont facturés 0.06€/SMS.'
  },
  {
    question: 'Comment modifier mon abonnement ?',
    answer: 'Dans Paramètres > Abonnement, vous pouvez upgrader ou downgrader à tout moment. Les changements prennent effet immédiatement.'
  },
  {
    question: 'TriggerFlow est-il conforme RGPD ?',
    answer: 'Oui, TriggerFlow est 100% conforme RGPD. Données hébergées en Europe, consentement géré automatiquement, export et suppression des données sur demande.'
  },
  {
    question: 'Proposez-vous une formation ?',
    answer: 'Oui, tous les nouveaux clients bénéficient d\'un onboarding personnalisé. Des webinaires mensuels sont également proposés.'
  }
]
```

---

## PARTIE 4 : Page Entreprise (1 page)

### 4.1 Carrières (`/entreprise/carrieres`)

**Fichier : `src/app/[locale]/entreprise/carrieres/page.tsx`**

**Structure :**

```
┌─────────────────────────────────────────────────────────────┐
│ HERO                                                        │
│ - Titre : "Rejoignez l'aventure TriggerFlow"                │
│ - Sous-titre : "Nous construisons le futur de la relation   │
│   client hôtelière. Et nous avons besoin de vous."          │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ POURQUOI NOUS REJOINDRE (3-4 raisons)                       │
│ - Cards avec icône + titre + description :                  │
│   - 🚀 Impact : Votre travail change le quotidien de        │
│     centaines d'hôteliers                                   │
│   - 🏠 Flexibilité : Remote-first, horaires flexibles       │
│   - 📈 Croissance : Startup en forte croissance, évoluez    │
│     avec nous                                               │
│   - 🤝 Équipe : Petite équipe soudée, pas de politique      │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ NOS VALEURS                                                 │
│ - 3 valeurs avec description détaillée                      │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ POSTES OUVERTS                                              │
│ - Liste des offres ou message "Pas de poste ouvert          │
│   actuellement"                                             │
│ - Si pas de poste : "Envoyez-nous votre candidature         │
│   spontanée"                                                │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ CANDIDATURE SPONTANÉE                                       │
│ - "Vous ne trouvez pas le poste idéal ?"                    │
│ - "Envoyez votre CV à jobs@trigger-flow.com"                │
│ - "Nous sommes toujours à la recherche de talents"          │
└─────────────────────────────────────────────────────────────┘
```

**Postes placeholder (ou vide) :**

```typescript
const openPositions = [
  // Peut être vide si pas de recrutement actif
  // {
  //   title: 'Développeur Full-Stack (Laravel/React)',
  //   type: 'CDI',
  //   location: 'Remote (France)',
  //   description: 'Rejoignez l\'équipe technique pour développer de nouvelles fonctionnalités.',
  //   link: '#'
  // },
  // {
  //   title: 'Customer Success Manager',
  //   type: 'CDI',
  //   location: 'Paris ou Remote',
  //   description: 'Accompagnez nos clients hôteliers dans leur succès avec TriggerFlow.',
  //   link: '#'
  // }
]
```

---

## PARTIE 5 : Routing et Navigation

### 5.1 Ajouter dans `src/i18n/routing.ts`

```typescript
// Modules produit
'/produit/hub-messagerie': {
  fr: '/produit/hub-messagerie',
  en: '/product/messaging-hub'
},
'/produit/ventes-additionnelles': {
  fr: '/produit/ventes-additionnelles',
  en: '/product/upsell'
},

// Solutions par objectif
'/solutions/automatiser-communication': {
  fr: '/solutions/automatiser-communication',
  en: '/solutions/automate-communication'
},
'/solutions/augmenter-avis': {
  fr: '/solutions/augmenter-avis',
  en: '/solutions/increase-reviews'
},
'/solutions/booster-upsell': {
  fr: '/solutions/booster-upsell',
  en: '/solutions/boost-upsell'
},
'/solutions/fideliser-clients': {
  fr: '/solutions/fideliser-clients',
  en: '/solutions/customer-loyalty'
},

// Ressources
'/blog': {
  fr: '/blog',
  en: '/blog'
},
'/ressources/cas-clients': {
  fr: '/ressources/cas-clients',
  en: '/resources/case-studies'
},
'/ressources/guides': {
  fr: '/ressources/guides',
  en: '/resources/guides'
},
'/ressources/aide': {
  fr: '/ressources/aide',
  en: '/resources/help'
},

// Entreprise
'/entreprise/carrieres': {
  fr: '/entreprise/carrieres',
  en: '/company/careers'
}
```

### 5.2 Mettre à jour le Header

Les liens du mega menu doivent pointer vers les nouvelles pages :

**Menu Produit :**
- Ajouter "Hub messagerie" → `/produit/hub-messagerie`
- "Ventes additionnelles" dans Outils → `/produit/ventes-additionnelles`

**Menu Solutions :**
- Section "Par objectif" avec les 4 nouvelles pages

**Menu Ressources :**
- Blog → `/blog`
- Cas clients → `/ressources/cas-clients`
- Guides & Ebooks → `/ressources/guides`
- Centre d'aide → `/ressources/aide`

### 5.3 Mettre à jour le Footer

- Ressources : ajouter les liens vers les nouvelles pages
- Entreprise : ajouter Carrières → `/entreprise/carrieres`

---

## PARTIE 6 : Traductions

Ajouter les traductions pour toutes les nouvelles pages dans `messages/fr.json` et `messages/en.json`.

Les clés à créer :
- `modules.hub-messagerie.*`
- `modules.ventes-additionnelles.*`
- `solutionPage.automatiser-communication.*`
- `solutionPage.augmenter-avis.*`
- `solutionPage.booster-upsell.*`
- `solutionPage.fideliser-clients.*`
- `blog.*`
- `caseStudies.*`
- `guides.*`
- `helpCenter.*`
- `careers.*`

---

## PARTIE 7 : SEO

Chaque page doit avoir ses metadata :

```typescript
export const metadata: Metadata = {
  title: 'Titre de la page | TriggerFlow',
  description: 'Description de 150-160 caractères pour le SEO'
}
```

---

## Résumé des fichiers à créer/modifier

### Nouveaux fichiers (11 pages) :
1. `src/app/[locale]/produit/[slug]/page.tsx` - Modifier pour hub-messagerie et ventes-additionnelles
2. `src/app/[locale]/solutions/[slug]/page.tsx` - Modifier pour les 4 nouvelles solutions
3. `src/app/[locale]/blog/page.tsx`
4. `src/app/[locale]/ressources/cas-clients/page.tsx`
5. `src/app/[locale]/ressources/guides/page.tsx`
6. `src/app/[locale]/ressources/aide/page.tsx`
7. `src/app/[locale]/entreprise/carrieres/page.tsx`

### Fichiers à modifier :
- `src/data/modules.ts` - Ajouter 2 modules
- `src/data/solutions.ts` - Ajouter 4 solutions
- `src/i18n/routing.ts` - Ajouter 11 routes
- `src/components/layout/Header.tsx` - Mettre à jour les liens
- `src/components/layout/Footer.tsx` - Mettre à jour les liens
- `messages/fr.json` - Ajouter traductions
- `messages/en.json` - Ajouter traductions

---

## Instructions d'implémentation

1. Commencer par ajouter les données dans `modules.ts` et `solutions.ts`
2. Mettre à jour le routing dans `routing.ts`
3. Créer les nouvelles pages en utilisant les templates existants quand possible
4. Mettre à jour Header et Footer
5. Ajouter les traductions
6. Tester que le build passe : `npm run build`
7. Vérifier chaque page sur localhost
