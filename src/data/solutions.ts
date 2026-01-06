import {
  Building,
  Building2,
  Home,
  Tent,
  Clock,
  Users,
  TrendingDown,
  Star,
  Layers,
  BarChart,
  Repeat,
  Key,
  Users2,
  Calendar,
  Wrench,
  Sun,
  PartyPopper,
  ShoppingBag,
  Zap,
  AlertCircle,
  Copy,
  Moon,
  ThumbsDown,
  Eye,
  DollarSign,
  Target,
  Heart,
  Gift,
  Mail,
  type LucideIcon,
} from 'lucide-react';

export interface SolutionChallenge {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface SolutionFeature {
  slug: string;
  highlight: string;
}

export interface SolutionUseCase {
  title: string;
  description: string;
  steps: string[];
}

export interface SolutionTestimonial {
  quote: string;
  author: string;
  role: string;
  hotel: string;
  location: string;
}

export interface SolutionStats {
  [key: string]: string;
}

export interface SolutionData {
  slug: string;
  slugEn: string;
  icon: LucideIcon;
  title: string;
  headline: string;
  description: string;
  challenges: SolutionChallenge[];
  features: SolutionFeature[];
  useCases: SolutionUseCase[];
  testimonial: SolutionTestimonial;
  integrations: string[];
  stats: SolutionStats;
}

// Icon mapping for challenges
const challengeIcons: Record<string, LucideIcon> = {
  Clock,
  Users,
  TrendingDown,
  Star,
  Layers,
  BarChart,
  Repeat,
  Key,
  Users2,
  Calendar,
  Wrench,
  Sun,
  PartyPopper,
  ShoppingBag,
};

export const solutions: Record<string, SolutionData> = {
  'hotels-independants': {
    slug: 'hotels-independants',
    slugEn: 'independent-hotels',
    icon: Building,
    title: 'Hôtels indépendants',
    headline: "L'outil marketing des grandes chaînes, accessible aux indépendants",
    description:
      "Vous gérez tout : la réception, le ménage, les réservations, le marketing... TriggerFlow automatise votre relation client pour que vous puissiez vous concentrer sur l'accueil.",
    challenges: [
      {
        icon: Clock,
        title: 'Manque de temps',
        description:
          'Entre la réception et la gestion, impossible de faire du marketing personnalisé.',
      },
      {
        icon: Users,
        title: 'Équipe réduite',
        description:
          'Pas de responsable marketing dédié, chacun fait un peu de tout.',
      },
      {
        icon: TrendingDown,
        title: 'Dépendance aux OTA',
        description:
          'Booking et Expedia captent vos clients, difficile de les fidéliser en direct.',
      },
      {
        icon: Star,
        title: 'Réputation en ligne',
        description:
          "Peu d'avis malgré des clients satisfaits, pas le temps de répondre.",
      },
    ],
    features: [
      { slug: 'automatisations', highlight: 'Automatisez sans effort' },
      { slug: 'email', highlight: 'Emails personnalisés' },
      { slug: 'avis', highlight: "Plus d'avis Google" },
      { slug: 'crm', highlight: 'Connaissez vos clients' },
      { slug: 'sms', highlight: 'SMS au bon moment' },
      { slug: 'fidelite', highlight: 'Fidélisez en direct' },
    ],
    useCases: [
      {
        title: 'Séquence pré-séjour automatique',
        description:
          "Dès la réservation, TriggerFlow envoie automatiquement : confirmation, email J-7 avec infos pratiques, SMS J-1 avec code d'accès.",
        steps: ['Réservation PMS', 'Email confirmation', 'Email J-7', 'SMS J-1'],
      },
      {
        title: "Collecte d'avis intelligente",
        description:
          "Après le check-out, envoi automatique d'une enquête satisfaction. Si note > 4/5, invitation à laisser un avis Google.",
        steps: [
          'Check-out',
          'Email J+1',
          'Si satisfait → lien Google',
          'Si insatisfait → alerte manager',
        ],
      },
      {
        title: 'Réservation directe fidélité',
        description:
          'Offrez des avantages aux clients qui réservent en direct : -10% newsletter, points fidélité, surclassement...',
        steps: [
          'Client newsletter',
          'Offre exclusive',
          'Réservation directe',
          'Points fidélité',
        ],
      },
    ],
    testimonial: {
      quote:
        "Avant TriggerFlow, je passais 2h par jour sur les emails. Maintenant tout est automatique et mes avis Google ont doublé.",
      author: 'Marie L.',
      role: 'Directrice',
      hotel: 'Hôtel Le Provençal',
      location: 'Aix-en-Provence',
    },
    integrations: ['Mews', 'Thaïs-PMS', 'Amenitiz', 'Misterbooking'],
    stats: {
      timeGain: '10h/semaine',
      reviewIncrease: '+120%',
      directBookings: '+25%',
    },
  },

  'groupes-hoteliers': {
    slug: 'groupes-hoteliers',
    slugEn: 'hotel-groups',
    icon: Building2,
    title: 'Groupes hôteliers',
    headline: 'Une stratégie marketing unifiée pour tous vos établissements',
    description:
      'Gérez plusieurs hôtels depuis une seule plateforme. Templates partagés, automatisations globales, reporting consolidé.',
    challenges: [
      {
        icon: Layers,
        title: 'Cohérence de marque',
        description:
          "Difficile de maintenir une image cohérente sur tous les établissements.",
      },
      {
        icon: BarChart,
        title: 'Reporting dispersé',
        description:
          "Chaque hôtel a ses propres outils, impossible d'avoir une vue groupe.",
      },
      {
        icon: Users,
        title: 'Formation des équipes',
        description:
          'Turnover élevé, difficile de former chaque équipe aux outils marketing.',
      },
      {
        icon: Repeat,
        title: 'Duplication des efforts',
        description:
          'Chaque hôtel recrée les mêmes emails, les mêmes workflows.',
      },
    ],
    features: [
      { slug: 'automatisations', highlight: 'Templates groupe partagés' },
      { slug: 'analytics', highlight: 'Reporting consolidé' },
      { slug: 'email', highlight: 'Branding unifié' },
      { slug: 'crm', highlight: 'Base clients groupe' },
      { slug: 'fidelite', highlight: 'Programme multi-hôtels' },
      { slug: 'newsletter', highlight: 'Campagnes centralisées' },
    ],
    useCases: [
      {
        title: 'Templates groupe personnalisables',
        description:
          'Créez des templates au niveau groupe, personnalisables par chaque hôtel (logo, couleurs, signature).',
        steps: [
          'Template siège',
          'Personnalisation locale',
          'Déploiement',
          'Reporting unifié',
        ],
      },
      {
        title: 'Programme fidélité multi-hôtels',
        description:
          'Les clients cumulent des points dans tous vos établissements. Vue unifiée de leur historique groupe.',
        steps: [
          'Séjour Hôtel A',
          'Points groupe',
          'Réservation Hôtel B',
          'Récompense',
        ],
      },
      {
        title: 'Campagne promotionnelle groupe',
        description:
          'Lancez une campagne pour tout le groupe en un clic, avec personnalisation automatique par hôtel.',
        steps: [
          'Création siège',
          'Variables par hôtel',
          'Envoi simultané',
          'Reporting groupe',
        ],
      },
    ],
    testimonial: {
      quote:
        'Nous avons déployé TriggerFlow sur nos 12 hôtels en 2 semaines. Le reporting consolidé nous fait gagner un temps fou.',
      author: 'Philippe D.',
      role: 'Directeur Marketing',
      hotel: 'Groupe Hôtelier du Sud',
      location: 'France',
    },
    integrations: ['Opera Cloud', 'Mews', 'D-Edge', 'Salesforce'],
    stats: {
      timeGain: '40h/semaine',
      deploymentTime: '2 semaines',
      hotels: '12 établissements',
    },
  },

  residences: {
    slug: 'residences',
    slugEn: 'residences',
    icon: Home,
    title: 'Résidences de tourisme',
    headline: 'Gérez les longs séjours et les propriétaires efficacement',
    description:
      "Communication avec les locataires, relation propriétaires, gestion des arrivées autonomes... TriggerFlow s'adapte aux spécificités des résidences.",
    challenges: [
      {
        icon: Key,
        title: 'Arrivées autonomes',
        description:
          "Les clients arrivent à toute heure, il faut les informer clairement.",
      },
      {
        icon: Users2,
        title: 'Relation propriétaires',
        description:
          'Tenir informés les propriétaires : occupation, revenus, entretien.',
      },
      {
        icon: Calendar,
        title: 'Longs séjours',
        description:
          'Séjours de 1 semaine à plusieurs mois, communication différente.',
      },
      {
        icon: Wrench,
        title: 'Maintenance',
        description:
          "Gérer les demandes d'intervention et les états des lieux.",
      },
    ],
    features: [
      { slug: 'sms', highlight: 'Instructions arrivée' },
      { slug: 'automatisations', highlight: 'Workflows longs séjours' },
      { slug: 'formulaires', highlight: 'États des lieux digitaux' },
      { slug: 'email', highlight: 'Rapports propriétaires' },
      { slug: 'whatsapp', highlight: 'Support locataires' },
      { slug: 'crm', highlight: 'Base propriétaires' },
    ],
    useCases: [
      {
        title: 'Arrivée autonome parfaite',
        description:
          "SMS automatique avec code boîte à clés, instructions parking, code WiFi. Le client a tout avant d'arriver.",
        steps: [
          'Réservation',
          'Email infos',
          'SMS J-1 code',
          'WhatsApp bienvenue',
        ],
      },
      {
        title: 'Rapport propriétaire mensuel',
        description:
          "Email automatique chaque mois : taux d'occupation, revenus, planning, interventions.",
        steps: [
          'Fin de mois',
          'Compilation données',
          'Email automatique',
          'PDF joint',
        ],
      },
      {
        title: "Demande d'intervention",
        description:
          'Le locataire signale un problème via formulaire. Alerte automatique au gestionnaire + propriétaire.',
        steps: [
          'Formulaire client',
          'Alerte gestionnaire',
          'Info propriétaire',
          'Suivi résolution',
        ],
      },
    ],
    testimonial: {
      quote:
        "Les arrivées autonomes étaient un cauchemar. Avec TriggerFlow, les clients ont toutes les infos et on n'a plus d'appels le dimanche soir.",
      author: 'Sophie M.',
      role: 'Responsable exploitation',
      hotel: "Résidences Côte d'Azur",
      location: 'Nice',
    },
    integrations: ['Amenitiz', 'Sesame', 'Nuki', 'Medialog'],
    stats: {
      callReduction: '-80%',
      ownerSatisfaction: '98%',
      checkInTime: '2 min',
    },
  },

  campings: {
    slug: 'campings',
    slugEn: 'campings',
    icon: Tent,
    title: 'Campings & Hôtellerie de plein air',
    headline: 'Animez votre camping toute la saison',
    description:
      "Forte saisonnalité, animations, services annexes... TriggerFlow aide les campings à maximiser chaque séjour et à fidéliser pour la saison suivante.",
    challenges: [
      {
        icon: Sun,
        title: 'Saisonnalité forte',
        description:
          "3-4 mois pour faire le chiffre de l'année, chaque réservation compte.",
      },
      {
        icon: PartyPopper,
        title: 'Animations',
        description:
          "Communiquer le programme d'animations aux vacanciers sur place.",
      },
      {
        icon: ShoppingBag,
        title: 'Services annexes',
        description:
          'Restaurant, épicerie, location vélos... difficile de tout promouvoir.',
      },
      {
        icon: Repeat,
        title: 'Fidélisation',
        description:
          "Faire revenir les clients l'année prochaine malgré la concurrence.",
      },
    ],
    features: [
      { slug: 'sms', highlight: 'Programme animations' },
      { slug: 'newsletter', highlight: 'Campagne early booking' },
      { slug: 'fidelite', highlight: 'Fidélité saison' },
      { slug: 'email', highlight: 'Cross-sell services' },
      { slug: 'automatisations', highlight: 'Séquences vacanciers' },
      { slug: 'avis', highlight: 'Avis fin de séjour' },
    ],
    useCases: [
      {
        title: 'Newsletter animations hebdo',
        description:
          'Chaque lundi, les vacanciers reçoivent le programme de la semaine : soirées, activités, sorties.',
        steps: [
          'Lundi matin',
          'Envoi automatique',
          'Programme semaine',
          'Liens réservation',
        ],
      },
      {
        title: 'Early booking saison suivante',
        description:
          "Dès septembre, campagne automatique vers les clients de l'été : offre early bird pour la saison prochaine.",
        steps: [
          'Septembre',
          'Segmentation clients été',
          'Email offre -15%',
          'Relance J+7',
        ],
      },
      {
        title: 'Promotion services sur place',
        description:
          'SMS J+2 : "Découvrez notre restaurant le Cabanon, -10% pour les résidents cette semaine".',
        steps: [
          'Arrivée',
          'SMS J+2 resto',
          'SMS J+4 spa',
          'SMS J+5 location vélos',
        ],
      },
    ],
    testimonial: {
      quote:
        'Notre taux de re-réservation pour la saison suivante est passé de 15% à 35% grâce aux campagnes early booking automatiques.',
      author: 'Laurent B.',
      role: 'Directeur',
      hotel: 'Camping Les Pins',
      location: 'Vendée',
    },
    integrations: ['Misterbooking', 'Amenitiz', 'Reservit', 'eSeason'],
    stats: {
      rebookingRate: '+35%',
      crossSell: '+50%',
      animationParticipation: '+40%',
    },
  },

  // Solutions par objectif

  'automatiser-communication': {
    slug: 'automatiser-communication',
    slugEn: 'automate-communication',
    icon: Zap,
    title: 'Automatiser votre communication',
    headline: 'Gagnez 10h par semaine sur vos communications clients',
    description: 'Fini les emails manuels, les copier-coller et les oublis. TriggerFlow envoie automatiquement le bon message au bon moment, 24h/24.',
    challenges: [
      {
        icon: Clock,
        title: '2h par jour sur les emails',
        description: 'Confirmation, rappels, remerciements... vous passez votre temps à écrire les mêmes messages.',
      },
      {
        icon: AlertCircle,
        title: 'Des messages oubliés',
        description: 'Dans le rush, certains clients ne reçoivent pas leurs infos à temps.',
      },
      {
        icon: Copy,
        title: 'Copier-coller sans fin',
        description: 'Vous modifiez les mêmes templates en changeant juste le nom et les dates.',
      },
      {
        icon: Moon,
        title: 'Pas de communication le week-end',
        description: 'Les réservations du samedi soir attendent le lundi pour être traitées.',
      },
    ],
    features: [
      { slug: 'automatisations', highlight: 'Workflows visuels sans code' },
      { slug: 'email', highlight: 'Emails personnalisés automatiques' },
      { slug: 'sms', highlight: 'SMS déclenchés par événements' },
      { slug: 'whatsapp', highlight: 'Messages WhatsApp programmés' },
    ],
    useCases: [
      {
        title: 'Séquence réservation complète',
        description: 'De la confirmation au remerciement post-séjour, tout est automatique.',
        steps: ['Réservation', 'Email confirmation', 'Email J-7 infos', 'SMS J-1 arrivée', 'Email J+1 merci'],
      },
      {
        title: 'Communication multilingue',
        description: 'Le bon message dans la bonne langue selon la nationalité du client.',
        steps: ['Détection langue', 'Sélection template', 'Envoi personnalisé', 'Suivi ouverture'],
      },
      {
        title: 'Relance intelligente',
        description: "Si le client n'ouvre pas l'email, relance automatique par SMS.",
        steps: ['Email envoyé', "Pas d'ouverture 24h", 'SMS de relance', 'Notification équipe'],
      },
    ],
    testimonial: {
      quote: "Je passais 2h par jour sur les emails de confirmation. Maintenant c'est 0. TriggerFlow m'a rendu mes matinées.",
      author: 'Julie R.',
      role: 'Responsable réservations',
      hotel: 'Hôtel & Spa des Alpes',
      location: 'Chamonix',
    },
    integrations: ['Mews', 'Opera Cloud', 'Amenitiz', 'Misterbooking'],
    stats: {
      timeGain: '10h/semaine',
      automationRate: '95%',
      responseTime: '< 1 min',
    },
  },

  'augmenter-avis': {
    slug: 'augmenter-avis',
    slugEn: 'increase-reviews',
    icon: Star,
    title: 'Augmenter vos avis Google',
    headline: 'Doublez vos avis Google en 3 mois',
    description: 'Transformez vos clients satisfaits en ambassadeurs. Demandez des avis au bon moment, aux bonnes personnes, sur les bonnes plateformes.',
    challenges: [
      {
        icon: Star,
        title: "Peu d'avis malgré des clients satisfaits",
        description: "Vos clients sont contents mais ne pensent pas à laisser un avis.",
      },
      {
        icon: ThumbsDown,
        title: 'Avis négatifs sans réponse',
        description: 'Vous découvrez les mauvais avis trop tard pour réagir.',
      },
      {
        icon: Eye,
        title: 'Pas de visibilité sur votre réputation',
        description: 'Google, TripAdvisor, Booking... impossible de tout suivre.',
      },
      {
        icon: Clock,
        title: 'Pas le temps de répondre',
        description: 'Rédiger une réponse personnalisée prend 10 minutes par avis.',
      },
    ],
    features: [
      { slug: 'avis', highlight: "Collecte automatique d'avis" },
      { slug: 'automatisations', highlight: 'Demande au bon moment' },
      { slug: 'formulaires', highlight: 'Enquête satisfaction avant avis' },
      { slug: 'analytics', highlight: 'Suivi réputation en temps réel' },
    ],
    useCases: [
      {
        title: 'Filtre satisfaction',
        description: "Seuls les clients satisfaits (>4/5) reçoivent la demande d'avis Google.",
        steps: ['Email J+1 enquête', 'Si note > 4/5', 'Lien Google envoyé', 'Si note < 4/5 → alerte manager'],
      },
      {
        title: 'Multi-plateformes intelligent',
        description: "Dirigez les clients vers la plateforme où vous avez besoin d'avis.",
        steps: ['Analyse plateformes', 'Priorité Google si < 50 avis', 'Sinon TripAdvisor', 'Rotation automatique'],
      },
      {
        title: 'Réponse assistée IA',
        description: "L'IA génère une réponse personnalisée, vous validez en 1 clic.",
        steps: ['Nouvel avis détecté', 'Génération réponse IA', 'Validation manager', 'Publication'],
      },
    ],
    testimonial: {
      quote: 'On est passé de 45 à 120 avis Google en 4 mois. Notre note est passée de 4.2 à 4.6. Game changer.',
      author: 'Marc T.',
      role: 'Directeur',
      hotel: 'Le Boutique Hotel',
      location: 'Bordeaux',
    },
    integrations: ['Google Business', 'TripAdvisor', 'Booking.com', 'Mews'],
    stats: {
      reviewIncrease: '+150%',
      ratingImprove: '+0.4 étoile',
      responseRate: '100%',
    },
  },

  'booster-upsell': {
    slug: 'booster-upsell',
    slugEn: 'boost-upsell',
    icon: TrendingDown, // Using TrendingDown temporarily, should be TrendingUp
    title: 'Booster vos ventes additionnelles',
    headline: "+17% de panier moyen grâce à l'upsell automatisé",
    description: "Vos services annexes sont une mine d'or inexploitée. TriggerFlow propose automatiquement le spa, le restaurant, les surclassements... et vos revenus décollent.",
    challenges: [
      {
        icon: DollarSign,
        title: 'Services sous-vendus',
        description: 'Spa, restaurant, activités... vos services ont de la capacité disponible.',
      },
      {
        icon: Users,
        title: 'La réception ne propose pas',
        description: "Trop occupés, mal à l'aise ou pas formés à la vente.",
      },
      {
        icon: Target,
        title: 'Offres non ciblées',
        description: 'Vous proposez la même chose à tout le monde.',
      },
      {
        icon: Clock,
        title: 'Mauvais timing',
        description: "L'offre arrive trop tôt ou trop tard.",
      },
    ],
    features: [
      { slug: 'ventes-additionnelles', highlight: 'Offres automatisées' },
      { slug: 'automatisations', highlight: 'Timing intelligent' },
      { slug: 'crm', highlight: 'Segmentation client' },
      { slug: 'analytics', highlight: 'Suivi revenus générés' },
    ],
    useCases: [
      {
        title: 'Surclassement pré-séjour',
        description: 'J-3 : proposez la chambre supérieure avec une réduction.',
        steps: ['J-3 avant arrivée', 'Email offre surclassement', 'Paiement en ligne', 'PMS mis à jour'],
      },
      {
        title: 'Cross-sell contextuel',
        description: 'Couple en séjour romantique → pack champagne. Famille → kids club.',
        steps: ['Analyse réservation', 'Détection profil', 'Offre personnalisée', 'Conversion'],
      },
      {
        title: 'Late checkout jour J',
        description: 'Le matin du départ, SMS avec offre late checkout.',
        steps: ['Jour départ 8h', 'SMS offre -20€', 'Réponse client', 'Mise à jour système'],
      },
    ],
    testimonial: {
      quote: "Le surclassement automatique nous rapporte 3000€ de plus par mois. L'investissement TriggerFlow est rentabilisé en 2 semaines.",
      author: 'Nathalie P.',
      role: 'Revenue Manager',
      hotel: 'Grand Hotel du Port',
      location: 'La Rochelle',
    },
    integrations: ['Mews', 'Opera Cloud', 'Stripe', 'PMS'],
    stats: {
      revenueIncrease: '+17%',
      upsellRate: '23%',
      roi: '10x',
    },
  },

  'fideliser-clients': {
    slug: 'fideliser-clients',
    slugEn: 'customer-loyalty',
    icon: Heart,
    title: 'Fidéliser vos clients',
    headline: 'Transformez vos clients en habitués qui réservent en direct',
    description: 'Pourquoi payer 15-20% de commission aux OTA pour des clients que vous connaissez déjà ? Fidélisez-les et récupérez vos marges.',
    challenges: [
      {
        icon: Repeat,
        title: 'Clients one-shot',
        description: 'Ils viennent une fois et ne reviennent jamais, même satisfaits.',
      },
      {
        icon: Building,
        title: 'Booking capte vos clients',
        description: 'Ils ont séjourné chez vous mais réservent via Booking la fois suivante.',
      },
      {
        icon: Gift,
        title: 'Pas de programme fidélité',
        description: 'Les chaînes ont des programmes, pas vous.',
      },
      {
        icon: Mail,
        title: 'Pas de suivi post-séjour',
        description: 'Une fois partis, vous perdez le contact.',
      },
    ],
    features: [
      { slug: 'fidelite', highlight: 'Programme fidélité intégré' },
      { slug: 'newsletter', highlight: 'Campagnes ciblées' },
      { slug: 'crm', highlight: 'Historique client complet' },
      { slug: 'automatisations', highlight: 'Relances automatiques' },
    ],
    useCases: [
      {
        title: 'Programme points automatique',
        description: 'Les clients cumulent des points à chaque séjour, échangeables contre des nuits ou services.',
        steps: ['Séjour terminé', 'Points crédités', 'Email récap points', 'Offre fidélité'],
      },
      {
        title: 'Anniversaire client',
        description: "Email automatique avec offre spéciale le jour de l'anniversaire.",
        steps: ['Date anniversaire', 'Email + offre -15%', 'Validité 30 jours', 'Relance J+15'],
      },
      {
        title: 'Campagne win-back',
        description: "Client pas revenu depuis 12 mois ? Offre de reconquête.",
        steps: ['Détection inactivité', 'Email "Vous nous manquez"', 'Offre exclusive', 'Relance SMS'],
      },
    ],
    testimonial: {
      quote: "Notre taux de réservation directe est passé de 30% à 55%. On économise des milliers d'euros de commissions OTA.",
      author: 'Pierre D.',
      role: 'Propriétaire',
      hotel: 'Hôtel & Restaurant du Château',
      location: 'Loire',
    },
    integrations: ['Mews', 'Stripe', 'Mailchimp', 'PMS'],
    stats: {
      directBookings: '+25%',
      returnRate: '35%',
      commissionSaved: '15K€/an',
    },
  },
};

export const solutionsList = Object.values(solutions);
export const solutionSlugs = Object.keys(solutions);

// Serializable version for Server Components (without React components/functions)
export interface SolutionSerializable {
  slug: string;
  slugEn: string;
  title: string;
  headline: string;
  description: string;
  challenges: { title: string; description: string }[];
  features: SolutionFeature[];
  useCases: SolutionUseCase[];
  testimonial: SolutionTestimonial;
  integrations: string[];
  stats: SolutionStats;
}

export function getSolutionSerializable(slug: string): SolutionSerializable | null {
  const solution = solutions[slug];
  if (!solution) return null;

  return {
    slug: solution.slug,
    slugEn: solution.slugEn,
    title: solution.title,
    headline: solution.headline,
    description: solution.description,
    challenges: solution.challenges.map((c) => ({
      title: c.title,
      description: c.description,
    })),
    features: solution.features,
    useCases: solution.useCases,
    testimonial: solution.testimonial,
    integrations: solution.integrations,
    stats: solution.stats,
  };
}
