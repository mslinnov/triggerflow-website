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

// ─── Interfaces ─────────────────────────────────────────────

export interface SolutionChallenge {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface SolutionStat {
  value: string;
  suffix?: string;
  label: string;
}

export interface SolutionPersona {
  role: string;
  painStatement: string;
  valueProposition: string;
}

export interface SolutionFeature {
  slug: string;
  highlight: string;
  whyForPersona?: string;
  bullets?: string[];
}

export interface SolutionUseCase {
  title: string;
  description: string;
  steps: string[];
  result?: string;
}

export interface SolutionTestimonial {
  quote: string;
  author: string;
  role: string;
  hotel: string;
  location: string;
  metric?: string;
}

export interface SolutionFaq {
  question: string;
  answer: string;
}

export interface SolutionJourneyStep {
  label: string;
  description: string;
  active?: boolean;
}

export interface SolutionData {
  slug: string;
  slugEn: string;
  icon: LucideIcon;
  title: string;
  headline: string;
  description: string;
  category?: 'type' | 'objectif';
  heroMockup?: string;
  persona?: SolutionPersona;
  challenges: SolutionChallenge[];
  painPoints?: string[];
  benefits?: string[];
  stats: SolutionStat[];
  features: SolutionFeature[];
  useCases: SolutionUseCase[];
  testimonial: SolutionTestimonial;
  integrations: string[];
  faq?: SolutionFaq[];
  journey?: SolutionJourneyStep[];
  relatedSolutions?: string[];
  ctaTitle?: string;
  ctaSubtitle?: string;
}

// ─── Solutions Data ─────────────────────────────────────────

export const solutions: Record<string, SolutionData> = {
  'hotels-independants': {
    slug: 'hotels-independants',
    slugEn: 'independent-hotels',
    icon: Building,
    category: 'type',
    heroMockup: 'DashboardMockup',
    title: 'Hôtels indépendants',
    headline: "L'outil marketing des grandes chaînes, accessible aux indépendants",
    description:
      "Vous gérez tout : la réception, le ménage, les réservations, le marketing... TriggerFlow automatise votre relation client pour que vous puissiez vous concentrer sur l'accueil.",

    persona: {
      role: 'Directeur / Propriétaire',
      painStatement: 'Vous portez tous les chapeaux et le marketing passe toujours en dernier.',
      valueProposition: 'Les outils des grandes chaînes, sans la complexité ni le budget.',
    },

    challenges: [
      {
        icon: Clock,
        title: 'Manque de temps',
        description: 'Entre la réception et la gestion, impossible de faire du marketing personnalisé.',
      },
      {
        icon: Users,
        title: 'Équipe réduite',
        description: 'Pas de responsable marketing dédié, chacun fait un peu de tout.',
      },
      {
        icon: TrendingDown,
        title: 'Dépendance aux OTA',
        description: 'Booking et Expedia captent vos clients, difficile de les fidéliser en direct.',
      },
      {
        icon: Star,
        title: 'Réputation en ligne',
        description: "Peu d'avis malgré des clients satisfaits, pas le temps de répondre.",
      },
    ],

    painPoints: [
      "2h par jour perdues en emails manuels de confirmation et d'informations",
      'Les clients satisfaits partent sans laisser un avis Google',
      'Les clients réservent via Booking même après un premier séjour chez vous',
      "Aucune relance post-séjour, vous perdez le contact avec vos anciens clients",
      'La réception est débordée et ne propose jamais les services additionnels',
    ],
    benefits: [
      "Séquences email/SMS automatiques de la réservation au post-séjour",
      "Avis Google collectés automatiquement auprès des clients satisfaits",
      "Programme fidélité intégré qui incite à réserver en direct",
      "SMS pré-séjour avec infos pratiques envoyés sans intervention",
      "Ventes additionnelles proposées automatiquement au bon moment",
    ],

    stats: [
      { value: '10', suffix: 'h', label: 'gagnées par semaine' },
      { value: '120', suffix: '%', label: "d'avis Google en plus" },
      { value: '25', suffix: '%', label: 'de réservations directes en plus' },
    ],

    features: [
      {
        slug: 'automatisations',
        highlight: 'Automatisez sans effort',
        whyForPersona: "Créez une fois vos séquences, elles tournent 24h/24 même quand vous êtes à l'accueil.",
        bullets: ['Workflows visuels drag & drop', 'Déclenchement automatique depuis le PMS', 'Pas besoin de compétences techniques'],
      },
      {
        slug: 'email',
        highlight: 'Emails personnalisés',
        whyForPersona: "Chaque client reçoit un email avec son nom, ses dates et les infos de son séjour - sans que vous touchiez au clavier.",
        bullets: ['Templates professionnels prêts à l\'emploi', 'Personnalisation dynamique automatique', 'Suivi des ouvertures et clics'],
      },
      {
        slug: 'avis',
        highlight: "Plus d'avis Google",
        whyForPersona: "Vos clients satisfaits deviennent vos ambassadeurs. Le bon message au bon moment double vos avis.",
        bullets: ['Filtre satisfaction avant demande', 'Lien direct vers Google', 'Réponses IA aux avis'],
      },
      {
        slug: 'crm',
        highlight: 'Connaissez vos clients',
        whyForPersona: "Historique complet de chaque client : séjours passés, préférences, emails envoyés. Accueillez-les comme des habitués.",
        bullets: ['Fiche client enrichie automatiquement', 'Sync PMS en temps réel', 'Segmentation intelligente'],
      },
      {
        slug: 'sms',
        highlight: 'SMS au bon moment',
        whyForPersona: "Code d'accès la veille, rappel check-out le matin : vos clients ont toujours la bonne info au bon moment.",
        bullets: ['Envoi automatique par événement PMS', 'Taux d\'ouverture > 95%', 'Conforme RGPD'],
      },
      {
        slug: 'fidelite',
        highlight: 'Fidélisez en direct',
        whyForPersona: "Offrez un programme fidélité digne des grandes chaînes. Vos clients reviennent en direct au lieu de passer par Booking.",
        bullets: ['Points cumulés à chaque séjour', 'Récompenses personnalisables', 'Portail client dédié'],
      },
    ],

    useCases: [
      {
        title: 'Séquence pré-séjour automatique',
        description: "Dès la réservation, TriggerFlow envoie automatiquement : confirmation, email J-7 avec infos pratiques, SMS J-1 avec code d'accès.",
        steps: ['Réservation PMS', 'Email confirmation', 'Email J-7', 'SMS J-1'],
        result: '95% des clients arrivent informés',
      },
      {
        title: "Collecte d'avis intelligente",
        description: "Après le check-out, envoi automatique d'une enquête satisfaction. Si note > 4/5, invitation à laisser un avis Google.",
        steps: ['Check-out', 'Email J+1', 'Si satisfait → lien Google', 'Si insatisfait → alerte manager'],
        result: 'Avis Google x2 en 3 mois',
      },
      {
        title: 'Réservation directe fidélité',
        description: 'Offrez des avantages aux clients qui réservent en direct : -10% newsletter, points fidélité, surclassement...',
        steps: ['Client newsletter', 'Offre exclusive', 'Réservation directe', 'Points fidélité'],
        result: '+25% de réservations directes',
      },
    ],

    testimonial: {
      quote: "Avant TriggerFlow, je passais 2h par jour sur les emails. Maintenant tout est automatique et mes avis Google ont doublé.",
      author: 'Marie L.',
      role: 'Directrice',
      hotel: 'Hôtel Le Provençal',
      location: 'Aix-en-Provence',
      metric: '+120% d\'avis Google en 4 mois',
    },

    integrations: ['Mews', 'Thaïs PMS', 'Misterbooking', 'Opera Cloud'],

    faq: [
      {
        question: 'Combien de temps prend la mise en place pour un hôtel indépendant ?',
        answer: 'En moyenne 3 jours. Nous connectons votre PMS, configurons vos premières séquences et formons votre équipe. Vous êtes opérationnel dans la semaine.',
      },
      {
        question: 'Faut-il des compétences techniques ?',
        answer: 'Non. L\'interface est visuelle : vous glissez-déposez les étapes de vos workflows. Si vous savez utiliser un email, vous savez utiliser TriggerFlow.',
      },
      {
        question: 'Mon PMS est-il compatible ?',
        answer: 'TriggerFlow se connecte aux principaux PMS du marché : Mews, Thaïs-PMS, Amenitiz, Misterbooking, Opera Cloud et d\'autres. Si le vôtre n\'est pas listé, contactez-nous.',
      },
      {
        question: 'Quel est le coût pour un hôtel indépendant ?',
        answer: 'Nos plans commencent à partir de 69€/mois, avec un plan gratuit pour démarrer. Pour un hôtel indépendant, le plan Communication ou Marketing couvre la majorité des besoins. Le ROI est généralement atteint dès le premier mois.',
      },
      {
        question: 'Est-ce que TriggerFlow respecte le RGPD ?',
        answer: 'Oui, à 100%. Données hébergées en Europe, consentement géré automatiquement, droit d\'effacement intégré. Vous êtes en conformité sans effort.',
      },
    ],

    journey: [
      { label: 'Réservation', description: 'Confirmation automatique', active: true },
      { label: 'Pré-séjour', description: 'Email infos + SMS code', active: true },
      { label: 'Arrivée', description: 'Message de bienvenue', active: true },
      { label: 'Séjour', description: 'Offres upsell', active: true },
      { label: 'Départ', description: 'Enquête satisfaction', active: true },
      { label: 'Post-séjour', description: 'Fidélisation & avis', active: true },
    ],

    relatedSolutions: ['automatiser-communication', 'augmenter-avis', 'fideliser-clients'],

    ctaTitle: "Prêt à automatiser votre hôtel indépendant ?",
    ctaSubtitle: "Rejoignez les hôteliers qui gagnent 10h par semaine grâce à TriggerFlow",
  },

  'groupes-hoteliers': {
    slug: 'groupes-hoteliers',
    slugEn: 'hotel-groups',
    icon: Building2,
    category: 'type',
    heroMockup: 'AnalyticsDashboardMockup',
    title: 'Groupes hôteliers',
    headline: 'Une stratégie marketing unifiée pour tous vos établissements',
    description: 'Gérez plusieurs hôtels depuis une seule plateforme. Templates partagés, automatisations globales, reporting consolidé.',

    persona: {
      role: 'Directeur Marketing groupe',
      painStatement: 'Chaque hôtel fait différemment et vous n\'avez aucune vue consolidée.',
      valueProposition: 'Un cockpit unique pour piloter la relation client de tout votre groupe.',
    },

    challenges: [
      {
        icon: Layers,
        title: 'Cohérence de marque',
        description: "Difficile de maintenir une image cohérente sur tous les établissements.",
      },
      {
        icon: BarChart,
        title: 'Reporting dispersé',
        description: "Chaque hôtel a ses propres outils, impossible d'avoir une vue groupe.",
      },
      {
        icon: Users,
        title: 'Formation des équipes',
        description: 'Turnover élevé, difficile de former chaque équipe aux outils marketing.',
      },
      {
        icon: Repeat,
        title: 'Duplication des efforts',
        description: 'Chaque hôtel recrée les mêmes emails, les mêmes workflows.',
      },
    ],

    painPoints: [
      'Chaque hôtel utilise des outils différents, impossible de comparer les performances',
      'Les templates email sont recréés de zéro dans chaque établissement',
      'Le turnover élevé oblige à reformer constamment les équipes',
      'Pas de programme fidélité groupe, les clients ne cumulent rien entre hôtels',
      'Les campagnes marketing sont lancées en ordre dispersé sans cohérence',
    ],
    benefits: [
      'Templates partagés au niveau groupe, personnalisables par chaque hôtel',
      'Dashboard consolidé avec KPIs en temps réel pour tous les établissements',
      'Interface simple qui réduit le temps de formation à 30 minutes',
      'Programme fidélité multi-hôtels qui incite les séjours inter-établissements',
      'Campagnes déployées en un clic sur tout le groupe avec personnalisation locale',
    ],

    stats: [
      { value: '40', suffix: 'h', label: 'gagnées par semaine sur le groupe' },
      { value: '2', suffix: ' sem.', label: 'pour déployer sur 12 hôtels' },
      { value: '12', suffix: '', label: 'établissements pilotés depuis un cockpit' },
    ],

    features: [
      {
        slug: 'automatisations',
        highlight: 'Templates groupe partagés',
        whyForPersona: 'Créez un template au siège, chaque hôtel le personnalise avec son logo et ses couleurs. Fini la duplication.',
        bullets: ['Bibliothèque de templates centralisée', 'Variables locales par établissement', 'Versioning et historique'],
      },
      {
        slug: 'analytics',
        highlight: 'Reporting consolidé',
        whyForPersona: 'Comparez les performances de vos hôtels en un coup d\'oeil. Identifiez les bonnes pratiques et déployez-les.',
        bullets: ['Dashboard groupe temps réel', 'Comparaison inter-établissements', 'Export automatique PDF'],
      },
      {
        slug: 'email',
        highlight: 'Branding unifié',
        whyForPersona: 'Garantissez une image de marque cohérente tout en laissant de la flexibilité aux équipes locales.',
        bullets: ['Charte graphique groupe verrouillée', 'Zones éditables par hôtel', 'Validation avant envoi'],
      },
      {
        slug: 'crm',
        highlight: 'Base clients groupe',
        whyForPersona: 'Un client qui séjourne dans votre hôtel parisien est reconnu quand il réserve à Marseille.',
        bullets: ['Profil client unifié cross-hôtels', 'Historique de séjours groupe', 'Segmentation globale'],
      },
      {
        slug: 'fidelite',
        highlight: 'Programme multi-hôtels',
        whyForPersona: 'Vos clients cumulent des points dans tous vos établissements et restent dans l\'écosystème groupe.',
        bullets: ['Points cumulables cross-hôtels', 'Récompenses personnalisables', 'Catalogue partagé'],
      },
      {
        slug: 'newsletter',
        highlight: 'Campagnes centralisées',
        whyForPersona: 'Lancez une campagne nationale en 5 minutes, automatiquement personnalisée par chaque hôtel.',
        bullets: ['Envoi simultané multi-hôtels', 'Personnalisation locale automatique', 'A/B testing groupe'],
      },
    ],

    useCases: [
      {
        title: 'Templates groupe personnalisables',
        description: 'Créez des templates au niveau groupe, personnalisables par chaque hôtel (logo, couleurs, signature).',
        steps: ['Template siège', 'Personnalisation locale', 'Déploiement', 'Reporting unifié'],
        result: '80% de temps gagné sur la création de contenu',
      },
      {
        title: 'Programme fidélité multi-hôtels',
        description: 'Les clients cumulent des points dans tous vos établissements. Vue unifiée de leur historique groupe.',
        steps: ['Séjour Hôtel A', 'Points groupe', 'Réservation Hôtel B', 'Récompense'],
        result: '+30% de séjours inter-hôtels',
      },
      {
        title: 'Campagne promotionnelle groupe',
        description: 'Lancez une campagne pour tout le groupe en un clic, avec personnalisation automatique par hôtel.',
        steps: ['Création siège', 'Variables par hôtel', 'Envoi simultané', 'Reporting groupe'],
        result: 'Déploiement en 5 minutes au lieu de 2 jours',
      },
    ],

    testimonial: {
      quote: 'Nous avons déployé TriggerFlow sur nos 12 hôtels en 2 semaines. Le reporting consolidé nous fait gagner un temps fou.',
      author: 'Philippe D.',
      role: 'Directeur Marketing',
      hotel: 'Groupe Hôtelier du Sud',
      location: 'France',
      metric: '12 hôtels pilotés depuis 1 dashboard',
    },

    integrations: ['Opera Cloud', 'Mews', 'Thaïs PMS', 'Misterbooking'],

    faq: [
      {
        question: 'Peut-on gérer les droits d\'accès par hôtel ?',
        answer: 'Oui. Chaque hôtel a son espace dédié avec ses propres utilisateurs. Le siège garde une vue groupe et peut contrôler ce qui est modifiable localement.',
      },
      {
        question: 'Comment se passe le déploiement sur plusieurs hôtels ?',
        answer: 'Nous commençons par un hôtel pilote (1 semaine), puis déployons en parallèle sur les autres. 12 hôtels sont opérationnels en 2 semaines environ.',
      },
      {
        question: 'Les données sont-elles cloisonnées entre hôtels ?',
        answer: 'Oui, chaque hôtel accède uniquement à ses propres données. Le siège dispose d\'une vue consolidée et peut accéder aux données de chaque établissement.',
      },
      {
        question: 'Quel PMS multi-propriétés est supporté ?',
        answer: 'Opera Cloud, Mews et D-Edge sont nativement supportés en mode multi-propriétés. Pour d\'autres PMS, notre équipe technique évalue la faisabilité.',
      },
    ],

    journey: [
      { label: 'Siège', description: 'Stratégie & templates', active: true },
      { label: 'Déploiement', description: 'Config par hôtel', active: true },
      { label: 'Opérations', description: 'Exécution locale', active: false },
      { label: 'Monitoring', description: 'Dashboard groupe', active: true },
      { label: 'Optimisation', description: 'A/B testing & itérations', active: true },
    ],

    relatedSolutions: ['hotels-independants', 'automatiser-communication', 'fideliser-clients'],

    ctaTitle: "Unifiez la stratégie marketing de votre groupe",
    ctaSubtitle: "Demandez une démo multi-propriétés avec reporting consolidé",
  },

  residences: {
    slug: 'residences',
    slugEn: 'residences',
    icon: Home,
    category: 'type',
    heroMockup: 'WhatsAppMockup',
    title: 'Résidences de tourisme',
    headline: 'Gérez les longs séjours et les propriétaires efficacement',
    description: "Communication avec les locataires, relation propriétaires, gestion des arrivées autonomes... TriggerFlow s'adapte aux spécificités des résidences.",

    persona: {
      role: 'Responsable exploitation',
      painStatement: 'Entre les arrivées du dimanche soir et les demandes des propriétaires, vous êtes sur tous les fronts.',
      valueProposition: 'Des arrivées autonomes fluides et des propriétaires informés sans effort.',
    },

    challenges: [
      {
        icon: Key,
        title: 'Arrivées autonomes',
        description: "Les clients arrivent à toute heure, il faut les informer clairement.",
      },
      {
        icon: Users2,
        title: 'Relation propriétaires',
        description: 'Tenir informés les propriétaires : occupation, revenus, entretien.',
      },
      {
        icon: Calendar,
        title: 'Longs séjours',
        description: 'Séjours de 1 semaine à plusieurs mois, communication différente.',
      },
      {
        icon: Wrench,
        title: 'Maintenance',
        description: "Gérer les demandes d'intervention et les états des lieux.",
      },
    ],

    painPoints: [
      'Les clients appellent le dimanche soir car ils n\'ont pas reçu le code d\'accès',
      'Les propriétaires demandent chaque mois un reporting que vous faites manuellement',
      'Les états des lieux papier se perdent et créent des litiges',
      'Les locataires de longue durée ne savent pas à qui s\'adresser pour un problème',
      'Pas de communication structurée pendant les longs séjours',
    ],
    benefits: [
      'SMS automatique avec code boîte à clés, WiFi et parking avant chaque arrivée',
      'Rapport propriétaire mensuel généré et envoyé automatiquement',
      'États des lieux digitaux avec photos et signature électronique',
      'Canal WhatsApp dédié pour le support locataires 7j/7',
      'Communication régulière pendant les longs séjours avec infos locales',
    ],

    stats: [
      { value: '80', suffix: '%', label: 'd\'appels en moins le week-end' },
      { value: '98', suffix: '%', label: 'de satisfaction propriétaires' },
      { value: '2', suffix: ' min', label: 'pour un check-in autonome' },
    ],

    features: [
      {
        slug: 'sms',
        highlight: 'Instructions arrivée',
        whyForPersona: 'Le locataire reçoit automatiquement tout ce dont il a besoin : code, parking, WiFi. Zéro appel le week-end.',
        bullets: ['Envoi J-1 automatique', 'Code boîte à clés / serrure connectée', 'Instructions multilingues'],
      },
      {
        slug: 'automatisations',
        highlight: 'Workflows longs séjours',
        whyForPersona: 'Adaptez la communication à la durée du séjour : 1 semaine ou 3 mois, chaque locataire reçoit les bons messages.',
        bullets: ['Séquences adaptées à la durée', 'Check-in mi-séjour automatique', 'Rappels ménage / linge'],
      },
      {
        slug: 'formulaires',
        highlight: 'États des lieux digitaux',
        whyForPersona: 'Finis les papiers qui se perdent. Photo, commentaire, signature : tout est archivé et envoyé au propriétaire.',
        bullets: ['Formulaire avec photos', 'Signature électronique', 'Envoi automatique au propriétaire'],
      },
      {
        slug: 'email',
        highlight: 'Rapports propriétaires',
        whyForPersona: 'Chaque mois, le propriétaire reçoit son rapport : taux d\'occupation, revenus, interventions. Sans que vous leviez le petit doigt.',
        bullets: ['Rapport mensuel automatique', 'PDF avec données PMS', 'Historique accessible en ligne'],
      },
      {
        slug: 'whatsapp',
        highlight: 'Support locataires',
        whyForPersona: 'Un problème de plomberie à 22h ? Le locataire envoie un WhatsApp, vous recevez l\'alerte et le propriétaire est informé.',
        bullets: ['Canal WhatsApp dédié par résidence', 'Réponses automatiques FAQ', 'Escalade intelligente'],
      },
      {
        slug: 'crm',
        highlight: 'Base propriétaires',
        whyForPersona: 'Gérez vos propriétaires comme vos clients : préférences, historique, documents, tout au même endroit.',
        bullets: ['Fiche propriétaire complète', 'Documents partagés', 'Historique des communications'],
      },
    ],

    useCases: [
      {
        title: 'Arrivée autonome parfaite',
        description: "SMS automatique avec code boîte à clés, instructions parking, code WiFi. Le client a tout avant d'arriver.",
        steps: ['Réservation', 'Email infos', 'SMS J-1 code', 'WhatsApp bienvenue'],
        result: '-80% d\'appels le dimanche soir',
      },
      {
        title: 'Rapport propriétaire mensuel',
        description: "Email automatique chaque mois : taux d'occupation, revenus, planning, interventions.",
        steps: ['Fin de mois', 'Compilation données', 'Email automatique', 'PDF joint'],
        result: '98% de satisfaction propriétaires',
      },
      {
        title: "Demande d'intervention",
        description: 'Le locataire signale un problème via formulaire. Alerte automatique au gestionnaire + propriétaire.',
        steps: ['Formulaire client', 'Alerte gestionnaire', 'Info propriétaire', 'Suivi résolution'],
        result: 'Temps de réponse divisé par 3',
      },
    ],

    testimonial: {
      quote: "Les arrivées autonomes étaient un cauchemar. Avec TriggerFlow, les clients ont toutes les infos et on n'a plus d'appels le dimanche soir.",
      author: 'Sophie M.',
      role: 'Responsable exploitation',
      hotel: "Résidences Côte d'Azur",
      location: 'Nice',
      metric: '-80% d\'appels hors horaires',
    },

    integrations: ['Medialog', 'Sesame', 'Igloohome', 'Salto'],

    faq: [
      {
        question: 'TriggerFlow gère-t-il les serrures connectées ?',
        answer: 'Oui, nous nous intégrons avec Nuki, Sesame et d\'autres systèmes de serrures connectées. Le code est envoyé automatiquement au locataire avant son arrivée.',
      },
      {
        question: 'Les propriétaires ont-ils accès à un portail ?',
        answer: 'Les propriétaires reçoivent un rapport mensuel automatique par email. Un accès en ligne à l\'historique de leurs données est en cours de développement.',
      },
      {
        question: 'Comment gérer les séjours de plusieurs mois ?',
        answer: 'TriggerFlow adapte automatiquement la communication selon la durée du séjour. Pour les longs séjours, des points de contact réguliers sont programmés (mi-séjour, rappels, infos locales).',
      },
      {
        question: 'Peut-on envoyer les états des lieux aux propriétaires automatiquement ?',
        answer: 'Oui. Dès que l\'état des lieux est complété et signé par le locataire, il est automatiquement envoyé au propriétaire et archivé dans le CRM.',
      },
    ],

    journey: [
      { label: 'Réservation', description: 'Confirmation + infos résidence', active: true },
      { label: 'Pré-arrivée', description: 'Code + instructions', active: true },
      { label: 'Check-in', description: 'État des lieux digital', active: true },
      { label: 'Séjour', description: 'Support WhatsApp', active: true },
      { label: 'Check-out', description: 'État des lieux sortie', active: true },
      { label: 'Post-séjour', description: 'Rapport propriétaire', active: true },
    ],

    relatedSolutions: ['automatiser-communication', 'hotels-independants', 'augmenter-avis'],

    ctaTitle: "Simplifiez la gestion de vos résidences",
    ctaSubtitle: "Arrivées autonomes, rapports propriétaires et support locataires automatisés",
  },

  campings: {
    slug: 'campings',
    slugEn: 'campings',
    icon: Tent,
    category: 'type',
    heroMockup: 'CampaignMockup',
    title: 'Campings & Hôtellerie de plein air',
    headline: 'Animez votre camping toute la saison',
    description: "Forte saisonnalité, animations, services annexes... TriggerFlow aide les campings à maximiser chaque séjour et à fidéliser pour la saison suivante.",

    persona: {
      role: 'Directeur de camping',
      painStatement: 'Vous avez 4 mois pour faire votre chiffre et chaque séjour doit être mémorable.',
      valueProposition: 'Maximisez les revenus par séjour et le taux de retour la saison prochaine.',
    },

    challenges: [
      {
        icon: Sun,
        title: 'Saisonnalité forte',
        description: "3-4 mois pour faire le chiffre de l'année, chaque réservation compte.",
      },
      {
        icon: PartyPopper,
        title: 'Animations',
        description: "Communiquer le programme d'animations aux vacanciers sur place.",
      },
      {
        icon: ShoppingBag,
        title: 'Services annexes',
        description: 'Restaurant, épicerie, location vélos... difficile de tout promouvoir.',
      },
      {
        icon: Repeat,
        title: 'Fidélisation',
        description: "Faire revenir les clients l'année prochaine malgré la concurrence.",
      },
    ],

    painPoints: [
      'Les vacanciers ne connaissent pas la moitié des services disponibles sur place',
      'Le programme d\'animations est affiché à l\'accueil mais personne ne le lit',
      'Quand la saison se termine, vous perdez le contact avec vos clients',
      'Les campagnes early booking sont faites à la main et envoyées trop tard',
      'Impossible de mesurer quel service génère le plus de revenus',
    ],
    benefits: [
      'SMS automatiques pour promouvoir restaurant, spa et activités pendant le séjour',
      'Programme d\'animations envoyé chaque lundi par email à tous les vacanciers',
      'Campagne early booking automatique dès septembre vers les clients de l\'été',
      'Programme fidélité saison qui récompense les clients réguliers',
      'Analytics par service pour optimiser vos offres et revenus',
    ],

    stats: [
      { value: '35', suffix: '%', label: 'de taux de re-réservation' },
      { value: '50', suffix: '%', label: 'de revenus annexes en plus' },
      { value: '40', suffix: '%', label: 'de participation aux animations' },
    ],

    features: [
      {
        slug: 'sms',
        highlight: 'Programme animations',
        whyForPersona: 'Chaque vacancier reçoit le programme directement sur son téléphone. Plus besoin de panneau d\'affichage.',
        bullets: ['Envoi hebdomadaire automatique', 'Liens de réservation activités', 'Segmentation par tranche d\'âge'],
      },
      {
        slug: 'newsletter',
        highlight: 'Campagne early booking',
        whyForPersona: 'Dès la fin de saison, relancez automatiquement vos clients avec une offre early bird. Remplissez avant les concurrents.',
        bullets: ['Segmentation clients de l\'été', 'Offre early bird personnalisée', 'Séquence de relance automatique'],
      },
      {
        slug: 'fidelite',
        highlight: 'Fidélité saison',
        whyForPersona: 'Un programme fidélité adapté aux campings : points par séjour, récompenses en services, statut VIP.',
        bullets: ['Points cumulés par nuitée', 'Récompenses en activités/services', 'Statut VIP pour les habitués'],
      },
      {
        slug: 'email',
        highlight: 'Cross-sell services',
        whyForPersona: 'Restaurant, spa, location vélos... proposez automatiquement les bons services au bon moment du séjour.',
        bullets: ['Offres contextuelles par jour de séjour', 'Promotions résidents automatiques', 'Tracking des conversions'],
      },
      {
        slug: 'automatisations',
        highlight: 'Séquences vacanciers',
        whyForPersona: 'De l\'arrivée au départ, chaque vacancier vit une expérience parfaitement orchestrée.',
        bullets: ['Bienvenue + infos pratiques', 'Promo services jour par jour', 'Enquête satisfaction + early booking'],
      },
      {
        slug: 'avis',
        highlight: 'Avis fin de séjour',
        whyForPersona: 'Capitalisez sur l\'émotion du séjour. Demandez un avis Google quand le vacancier est encore sous le charme.',
        bullets: ['Enquête J dernier jour', 'Redirection Google si satisfait', 'Alerte si insatisfait'],
      },
    ],

    useCases: [
      {
        title: 'Newsletter animations hebdo',
        description: 'Chaque lundi, les vacanciers reçoivent le programme de la semaine : soirées, activités, sorties.',
        steps: ['Lundi matin', 'Envoi automatique', 'Programme semaine', 'Liens réservation'],
        result: '+40% de participation aux animations',
      },
      {
        title: 'Early booking saison suivante',
        description: "Dès septembre, campagne automatique vers les clients de l'été : offre early bird pour la saison prochaine.",
        steps: ['Septembre', 'Segmentation clients été', 'Email offre -15%', 'Relance J+7'],
        result: '35% de taux de re-réservation',
      },
      {
        title: 'Promotion services sur place',
        description: 'SMS J+2 : "Découvrez notre restaurant le Cabanon, -10% pour les résidents cette semaine".',
        steps: ['Arrivée', 'SMS J+2 resto', 'SMS J+4 spa', 'SMS J+5 location vélos'],
        result: '+50% de revenus sur les services annexes',
      },
    ],

    testimonial: {
      quote: 'Notre taux de re-réservation pour la saison suivante est passé de 15% à 35% grâce aux campagnes early booking automatiques.',
      author: 'Laurent B.',
      role: 'Directeur',
      hotel: 'Camping Les Pins',
      location: 'Vendée',
      metric: '+35% de re-réservation saison suivante',
    },

    integrations: ['Misterbooking', 'Thaïs PMS', 'Lean PMS', 'Apaleo'],

    faq: [
      {
        question: 'TriggerFlow s\'adapte-t-il à la saisonnalité d\'un camping ?',
        answer: 'Oui. Vous pouvez activer/désactiver des séquences selon la saison. Les campagnes early booking se déclenchent automatiquement en fin de saison.',
      },
      {
        question: 'Peut-on communiquer le programme d\'animations automatiquement ?',
        answer: 'Oui. Vous mettez à jour le programme dans TriggerFlow, et il est envoyé automatiquement chaque lundi aux vacanciers sur place.',
      },
      {
        question: 'Comment promouvoir les services annexes pendant le séjour ?',
        answer: 'TriggerFlow envoie des SMS contextuels selon le jour de séjour : restaurant J+2, spa J+4, location vélos J+5. Vous définissez le calendrier une fois.',
      },
      {
        question: 'Le programme fidélité fonctionne-t-il d\'une saison à l\'autre ?',
        answer: 'Oui. Les points sont conservés d\'une saison à l\'autre. Vos clients fidèles bénéficient de leur statut dès le premier jour de la nouvelle saison.',
      },
    ],

    journey: [
      { label: 'Réservation', description: 'Confirmation + infos camping', active: true },
      { label: 'Pré-séjour', description: 'Infos pratiques + offres', active: true },
      { label: 'Arrivée', description: 'Bienvenue + programme', active: true },
      { label: 'Séjour', description: 'Animations + cross-sell', active: true },
      { label: 'Départ', description: 'Enquête + avis', active: true },
      { label: 'Hors-saison', description: 'Early booking + fidélité', active: true },
    ],

    relatedSolutions: ['fideliser-clients', 'booster-upsell', 'augmenter-avis'],

    ctaTitle: "Prêt à animer votre camping comme jamais ?",
    ctaSubtitle: "Maximisez chaque séjour et fidélisez pour la saison prochaine",
  },

  'hotels-luxe': {
    slug: 'hotels-luxe',
    slugEn: 'luxury-hotels',
    icon: Star,
    category: 'type',
    heroMockup: 'DashboardMockup',
    title: 'Hôtels de luxe & 5 étoiles',
    headline: "L'excellence relationnelle que vos clients premium exigent",
    description:
      "Vos clients attendent un service irréprochable à chaque interaction. TriggerFlow orchestre une communication sur-mesure qui sublime l'expérience, du premier contact au prochain séjour.",

    persona: {
      role: 'Directeur général / Guest Relations Manager',
      painStatement: "Vos clients premium s'attendent à être reconnus et anticipés. Le moindre faux pas ternit votre réputation.",
      valueProposition: "Une relation client d'exception, personnalisée et automatisée, digne de votre standing.",
    },

    challenges: [
      {
        icon: Star,
        title: 'Exigences ultra-hautes',
        description: "Chaque détail compte : un email mal personnalisé ou un oubli de préférence peut coûter un client à vie.",
      },
      {
        icon: Users,
        title: 'Personnalisation à grande échelle',
        description: "Impossible de traiter chaque client comme un VIP manuellement quand vous avez 80+ chambres.",
      },
      {
        icon: Clock,
        title: 'Réactivité attendue',
        description: "Les clients luxe n'attendent pas. Chaque demande doit être traitée en minutes, pas en heures.",
      },
      {
        icon: Heart,
        title: 'Fidélisation premium',
        description: "Vos clients ont le choix entre les meilleurs hôtels du monde. Pourquoi reviendraient-ils chez vous ?",
      },
    ],

    painPoints: [
      'Les préférences clients (oreiller, minibar, étage) sont notées sur des post-it qui se perdent',
      'Un client revient pour la 3ème fois et personne ne le reconnaît, il est traité comme un nouveau',
      "L'email de confirmation est le même template générique que pour un 2 étoiles",
      'Le concierge est débordé et ne peut pas contacter chaque client avant l\'arrivée',
      "Aucun suivi structuré post-séjour : le client repart dans la nature et réserve ailleurs",
    ],
    benefits: [
      'Fiche client enrichie automatiquement : préférences, allergies, occasions spéciales, historique complet',
      "Communication pré-séjour personnalisée : email élégant avec nom, type de chambre, offres sur-mesure",
      'Alertes VIP automatiques : le staff est prévenu quand un client fidèle ou un VIP arrive',
      "Enquête satisfaction discrète et élégante, avec escalade immédiate si insatisfaction",
      'Programme fidélité premium avec récompenses exclusives (surclassement, spa, dîner offert)',
    ],

    stats: [
      { value: '4.8', suffix: '/5', label: 'note satisfaction moyenne' },
      { value: '40', suffix: '%', label: 'de clients qui reviennent' },
      { value: '35', suffix: '%', label: 'de revenus upsell en plus' },
    ],

    features: [
      {
        slug: 'crm',
        highlight: 'Profil client ultra-détaillé',
        whyForPersona: "Chaque client a sa fiche complète : préférences de chambre, allergies, anniversaires, historique de séjours. Votre équipe l'accueille comme un habitué - même si c'est sa première visite depuis 2 ans.",
        bullets: ['Préférences mémorisées (oreiller, minibar, étage)', 'Historique complet multi-séjours', 'Notes et tags personnalisés par le staff'],
      },
      {
        slug: 'automatisations',
        highlight: 'Parcours client sur-mesure',
        whyForPersona: "Du premier email à la relance anniversaire, chaque point de contact est orchestré pour refléter votre standing.",
        bullets: ['Séquence premium pré/pendant/post-séjour', 'Conditions par segment (VIP, fidèle, nouveau)', 'Timing optimisé pour le luxe (pas d\'envoi à 6h du matin)'],
      },
      {
        slug: 'email',
        highlight: 'Emails dignes de votre marque',
        whyForPersona: "Templates élégants personnalisables à votre charte graphique. Chaque email reflète l'excellence de votre établissement.",
        bullets: ['Design premium personnalisable', 'Variables dynamiques (nom, chambre, dates)', 'Multilingue automatique (FR, EN, DE, ES, IT)'],
      },
      {
        slug: 'whatsapp',
        highlight: 'Conciergerie WhatsApp',
        whyForPersona: "Vos clients internationaux préfèrent WhatsApp. Offrez un canal de communication direct, élégant et réactif.",
        bullets: ['Canal WhatsApp Business dédié', 'Réponses rapides aux demandes fréquentes', 'Escalade automatique vers le concierge'],
      },
      {
        slug: 'ventes-additionnelles',
        highlight: 'Upsell premium contextuel',
        whyForPersona: "Proposez le spa, le restaurant gastronomique, le surclassement suite, au bon moment, à la bonne personne.",
        bullets: ['Offres contextuelles par profil client', 'Pack expérience (champagne, spa, dîner)', 'Paiement en ligne intégré'],
      },
      {
        slug: 'fidelite',
        highlight: 'Programme fidélité exclusif',
        whyForPersona: "Un programme digne des grandes chaînes de luxe. Vos meilleurs clients cumulent des privilèges qui les font revenir.",
        bullets: ['Statuts VIP avec avantages progressifs', 'Récompenses exclusives (suite, dîner, spa)', 'Reconnaissance cross-séjours'],
      },
    ],

    useCases: [
      {
        title: 'Accueil VIP personnalisé',
        description: "Un client fidèle réserve. TriggerFlow alerte l'équipe avec sa fiche complète : préférences, historique, occasion spéciale. Le staff prépare un accueil sur-mesure.",
        steps: ['Réservation détectée', 'Fiche client enrichie', 'Alerte staff VIP', 'Accueil personnalisé'],
        result: '4.8/5 de satisfaction client',
      },
      {
        title: 'Séquence pré-séjour luxe',
        description: "Email élégant J-10 avec questionnaire préférences, email J-3 avec programme sur-mesure, SMS J-1 avec accès et consigne bagages.",
        steps: ['Email J-10 préférences', 'Email J-3 programme', 'SMS J-1 accès', 'WhatsApp bienvenue'],
        result: '95% des clients arrivent avec leurs préférences renseignées',
      },
      {
        title: 'Relance premium post-séjour',
        description: "Email de remerciement avec photos du séjour, enquête satisfaction discrète, offre fidélité personnalisée, relance anniversaire.",
        steps: ['Email J+1 remerciement', 'Enquête J+2', 'Points fidélité crédités', 'Offre anniversaire automatique'],
        result: '40% de taux de retour client',
      },
    ],

    testimonial: {
      quote: "Nos clients habitués sont reconnus dès la réservation. L'équipe sait qu'ils préfèrent l'étage supérieur, le champagne Ruinart et un coussin ferme. C'est cette attention qui fidélise.",
      author: 'Isabelle V.',
      role: 'Directrice Guest Relations',
      hotel: 'Le Grand Hôtel',
      location: 'Paris',
      metric: '40% de taux de retour client',
    },

    integrations: ['Opera Cloud', 'Mews', 'D-Edge', 'Sesame', 'Igloohome'],

    faq: [
      {
        question: 'TriggerFlow convient-il à un hôtel 5 étoiles ou un palace ?',
        answer: "Oui. TriggerFlow s'adapte à l'exigence du luxe : templates élégants personnalisables, gestion fine des préférences clients, alertes VIP, et programme fidélité premium. Plusieurs hôtels 4 et 5 étoiles l'utilisent déjà.",
      },
      {
        question: 'Les emails et SMS reflètent-ils notre image de marque ?',
        answer: "Absolument. Vous personnalisez chaque template avec votre logo, vos couleurs, votre typographie et votre ton de voix. Le résultat est un email aussi soigné que votre brochure papier.",
      },
      {
        question: 'Comment gérer les préférences clients entre les séjours ?',
        answer: "Le CRM TriggerFlow mémorise automatiquement les préférences renseignées par le client ou notées par le staff. À chaque nouvelle réservation, la fiche est pré-remplie et l'équipe est alertée.",
      },
      {
        question: 'Le programme fidélité est-il personnalisable ?',
        answer: "Entièrement. Vous définissez les niveaux (Silver, Gold, Platinum...), les points par nuitée, et les récompenses : surclassement, nuit offerte, accès spa, dîner gastronomique, early check-in, late check-out...",
      },
      {
        question: 'TriggerFlow s\'intègre-t-il avec Opera Cloud ?',
        answer: "Oui, Opera Cloud est nativement supporté, ainsi que Mews, D-Edge et d'autres PMS utilisés dans l'hôtellerie haut de gamme. La synchronisation est en temps réel.",
      },
    ],

    journey: [
      { label: 'Réservation', description: 'Détection VIP + fiche client', active: true },
      { label: 'Pré-séjour', description: 'Email premium + préférences', active: true },
      { label: 'Arrivée', description: 'Accueil VIP personnalisé', active: true },
      { label: 'Séjour', description: 'Conciergerie + upsell', active: true },
      { label: 'Départ', description: 'Enquête satisfaction discrète', active: true },
      { label: 'Post-séjour', description: 'Fidélité + relance premium', active: true },
    ],

    relatedSolutions: ['groupes-hoteliers', 'fideliser-clients', 'booster-upsell'],

    ctaTitle: "Offrez à vos clients l'excellence qu'ils attendent",
    ctaSubtitle: "Demandez une démo personnalisée pour l'hôtellerie de luxe",
  },

  // ─── Solutions par objectif ───────────────────────────────────

  'automatiser-communication': {
    slug: 'automatiser-communication',
    slugEn: 'automate-communication',
    icon: Zap,
    category: 'objectif',
    heroMockup: 'WorkflowBuilderMockup',
    title: 'Automatiser votre communication',
    headline: 'Gagnez 10h par semaine sur vos communications clients',
    description: 'Fini les emails manuels, les copier-coller et les oublis. TriggerFlow envoie automatiquement le bon message au bon moment, 24h/24.',

    persona: {
      role: 'Responsable réservations / Réceptionniste',
      painStatement: "Vous perdez un temps fou à écrire les mêmes emails et il y a toujours des oublis.",
      valueProposition: "10h par semaine récupérées. Plus un seul message oublié.",
    },

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

    painPoints: [
      'Chaque réservation nécessite 3-4 emails manuels : confirmation, infos, rappel, remerciement',
      'Les clients du week-end attendent le lundi pour recevoir leurs informations',
      'Impossible de personnaliser quand on copie-colle le même email 20 fois par jour',
      'Les messages en anglais ou allemand prennent encore plus de temps',
      'Aucun suivi : vous ne savez pas si le client a lu votre email',
    ],
    benefits: [
      'Toute la séquence réservation → post-séjour tourne en automatique 24h/24',
      'Chaque email est personnalisé automatiquement avec les données du PMS',
      'Communication multilingue : le client reçoit le message dans sa langue',
      'Suivi en temps réel : taux d\'ouverture, clics, réponses',
      'Relance automatique par SMS si l\'email n\'est pas ouvert',
    ],

    stats: [
      { value: '10', suffix: 'h', label: 'récupérées par semaine' },
      { value: '95', suffix: '%', label: 'de messages envoyés dans les temps' },
      { value: '1', suffix: ' min', label: 'temps de réponse moyen' },
    ],

    features: [
      {
        slug: 'automatisations',
        highlight: 'Workflows visuels sans code',
        whyForPersona: 'Dessinez votre séquence en glissant-déposant des blocs. Pas besoin d\'être développeur pour automatiser.',
        bullets: ['Interface drag & drop intuitive', 'Conditions et branchements', 'Test avant mise en production'],
      },
      {
        slug: 'email',
        highlight: 'Emails personnalisés automatiques',
        whyForPersona: 'Le client reçoit un email qui semble écrit à la main, avec son nom, ses dates et les infos de son séjour.',
        bullets: ['Variables dynamiques PMS', 'Templates professionnels', 'Multilingue automatique'],
      },
      {
        slug: 'sms',
        highlight: 'SMS déclenchés par événements',
        whyForPersona: 'Check-in demain ? Le SMS part automatiquement avec le code d\'accès. Vous n\'avez rien à faire.',
        bullets: ['Déclenchement par événement PMS', 'Taux d\'ouverture > 95%', 'Envoi international'],
      },
      {
        slug: 'whatsapp',
        highlight: 'Messages WhatsApp programmés',
        whyForPersona: 'Vos clients internationaux préfèrent WhatsApp. Envoyez-leur des messages automatiques sur leur canal favori.',
        bullets: ['Templates WhatsApp Business', 'Réponses automatiques FAQ', 'Historique de conversation'],
      },
    ],

    useCases: [
      {
        title: 'Séquence réservation complète',
        description: 'De la confirmation au remerciement post-séjour, tout est automatique.',
        steps: ['Réservation', 'Email confirmation', 'Email J-7 infos', 'SMS J-1 arrivée', 'Email J+1 merci'],
        result: '0 email manuel sur toute la séquence',
      },
      {
        title: 'Communication multilingue',
        description: 'Le bon message dans la bonne langue selon la nationalité du client.',
        steps: ['Détection langue', 'Sélection template', 'Envoi personnalisé', 'Suivi ouverture'],
        result: 'Support de 5 langues sans effort',
      },
      {
        title: 'Relance intelligente',
        description: "Si le client n'ouvre pas l'email, relance automatique par SMS.",
        steps: ['Email envoyé', "Pas d'ouverture 24h", 'SMS de relance', 'Notification équipe'],
        result: '98% des clients reçoivent l\'info',
      },
    ],

    testimonial: {
      quote: "Je passais 2h par jour sur les emails de confirmation. Maintenant c'est 0. TriggerFlow m'a rendu mes matinées.",
      author: 'Julie R.',
      role: 'Responsable réservations',
      hotel: 'Hôtel & Spa des Alpes',
      location: 'Chamonix',
      metric: '10h/semaine récupérées',
    },

    integrations: ['Mews', 'Opera Cloud', 'Asterio', 'Misterbooking'],

    faq: [
      {
        question: 'Combien de messages peut-on automatiser ?',
        answer: 'Autant que nécessaire. En moyenne, nos clients automatisent 8 à 12 messages par séquence de séjour (pré, pendant, post). Il n\'y a pas de limite.',
      },
      {
        question: 'Les messages sont-ils vraiment personnalisés ?',
        answer: 'Oui. TriggerFlow récupère les données de votre PMS (nom, dates, type de chambre, langue) et les injecte automatiquement dans chaque message.',
      },
      {
        question: 'Que se passe-t-il si un client se désabonne ?',
        answer: 'Le désabonnement est géré automatiquement et en conformité RGPD. Le client ne reçoit plus de messages marketing mais continue à recevoir les informations transactionnelles liées à son séjour.',
      },
      {
        question: 'Peut-on programmer des envois à des heures précises ?',
        answer: 'Oui. Vous pouvez déclencher des messages par événement PMS (réservation, check-in, check-out) ou programmer des envois à des dates/heures précises relatives au séjour.',
      },
      {
        question: 'Est-ce que ça fonctionne pour les clients internationaux ?',
        answer: 'Oui. TriggerFlow détecte la nationalité du client dans le PMS et envoie automatiquement le message dans la bonne langue. Nous supportons FR, EN, DE, ES, IT et d\'autres sur demande.',
      },
    ],

    journey: [
      { label: 'Réservation', description: 'Confirmation instantanée', active: true },
      { label: 'J-7', description: 'Infos pratiques', active: true },
      { label: 'J-1', description: 'SMS code d\'accès', active: true },
      { label: 'Séjour', description: 'Offres & support', active: false },
      { label: 'J+1', description: 'Remerciement', active: true },
      { label: 'J+30', description: 'Relance fidélité', active: true },
    ],

    relatedSolutions: ['hotels-independants', 'augmenter-avis', 'booster-upsell'],

    ctaTitle: "Récupérez vos 10h par semaine",
    ctaSubtitle: "Automatisez votre communication client en quelques clics",
  },

  'augmenter-avis': {
    slug: 'augmenter-avis',
    slugEn: 'increase-reviews',
    icon: Star,
    category: 'objectif',
    heroMockup: 'ReviewCollectMockup',
    title: 'Augmenter vos avis Google',
    headline: 'Doublez vos avis Google en 3 mois',
    description: 'Transformez vos clients satisfaits en ambassadeurs. Demandez des avis au bon moment, aux bonnes personnes, sur les bonnes plateformes.',

    persona: {
      role: 'Directeur / Responsable e-réputation',
      painStatement: 'Vos clients sont satisfaits mais ne pensent jamais à laisser un avis. Les rares avis négatifs plombent votre note.',
      valueProposition: 'Doublez vos avis Google et augmentez votre note de +0.4 étoile en 3 mois.',
    },

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

    painPoints: [
      'Moins de 5% de vos clients laissent un avis spontanément',
      'Les clients mécontents sont les plus rapides à publier un avis négatif',
      'Vous découvrez un avis négatif 3 semaines après sa publication',
      'Répondre à chaque avis prend 10 minutes que vous n\'avez pas',
      'Votre note Google stagne alors que vos concurrents progressent',
    ],
    benefits: [
      'Demande d\'avis automatique envoyée uniquement aux clients satisfaits (>4/5)',
      'Alerte en temps réel sur les avis négatifs pour réagir immédiatement',
      'Réponse IA personnalisée générée en 1 clic, vous validez et publiez',
      'Dashboard de suivi multi-plateformes (Google, TripAdvisor, Booking)',
      'Votre note Google augmente de +0.4 étoile en moyenne en 3 mois',
    ],

    stats: [
      { value: '150', suffix: '%', label: 'd\'avis Google en plus' },
      { value: '0.4', suffix: '', label: 'étoile gagnée en moyenne' },
      { value: '100', suffix: '%', label: 'des avis avec réponse' },
    ],

    features: [
      {
        slug: 'avis',
        highlight: "Collecte automatique d'avis",
        whyForPersona: 'Seuls les clients satisfaits reçoivent la demande d\'avis. Vous ne dirigez jamais un client mécontent vers Google.',
        bullets: ['Enquête satisfaction J+1', 'Filtre note > 4/5', 'Lien direct Google optimisé'],
      },
      {
        slug: 'automatisations',
        highlight: 'Demande au bon moment',
        whyForPersona: 'Le timing fait tout. J+1 après le check-out, quand le souvenir est encore frais et l\'émotion positive.',
        bullets: ['Déclenchement automatique post check-out', 'Délai configurable', 'Relance si pas d\'avis après 7 jours'],
      },
      {
        slug: 'formulaires',
        highlight: 'Enquête satisfaction avant avis',
        whyForPersona: 'L\'enquête filtre les clients satisfaits ET vous donne des insights sur ceux qui ne le sont pas.',
        bullets: ['Score NPS intégré', 'Questions personnalisables', 'Alerte manager si note basse'],
      },
      {
        slug: 'analytics',
        highlight: 'Suivi réputation en temps réel',
        whyForPersona: 'Plus jamais de mauvaise surprise. Dashboard en temps réel avec alertes sur les nouveaux avis.',
        bullets: ['Vue multi-plateformes unifiée', 'Alertes nouveaux avis', 'Évolution note dans le temps'],
      },
    ],

    useCases: [
      {
        title: 'Filtre satisfaction',
        description: "Seuls les clients satisfaits (>4/5) reçoivent la demande d'avis Google.",
        steps: ['Email J+1 enquête', 'Si note > 4/5', 'Lien Google envoyé', 'Si note < 4/5 → alerte manager'],
        result: 'Avis Google x2 en 3 mois',
      },
      {
        title: 'Multi-plateformes intelligent',
        description: "Dirigez les clients vers la plateforme où vous avez besoin d'avis.",
        steps: ['Analyse plateformes', 'Priorité Google si < 50 avis', 'Sinon TripAdvisor', 'Rotation automatique'],
        result: 'Présence renforcée sur toutes les plateformes',
      },
      {
        title: 'Réponse assistée IA',
        description: "L'IA génère une réponse personnalisée, vous validez en 1 clic.",
        steps: ['Nouvel avis détecté', 'Génération réponse IA', 'Validation manager', 'Publication'],
        result: '100% des avis avec réponse en < 24h',
      },
    ],

    testimonial: {
      quote: 'On est passé de 45 à 120 avis Google en 4 mois. Notre note est passée de 4.2 à 4.6. Game changer.',
      author: 'Marc T.',
      role: 'Directeur',
      hotel: 'Le Boutique Hotel',
      location: 'Bordeaux',
      metric: 'De 45 à 120 avis Google en 4 mois',
    },

    integrations: ['Google', 'TripAdvisor', 'Booking.com', 'Airbnb'],

    faq: [
      {
        question: 'Comment éviter de diriger les clients mécontents vers Google ?',
        answer: 'TriggerFlow envoie d\'abord une enquête de satisfaction. Seuls les clients ayant donné une note > 4/5 reçoivent le lien vers Google. Les clients insatisfaits déclenchent une alerte interne pour que vous puissiez traiter le problème.',
      },
      {
        question: 'L\'IA pour les réponses aux avis est-elle fiable ?',
        answer: 'L\'IA génère une proposition de réponse personnalisée basée sur le contenu de l\'avis. Vous relisez et validez (ou modifiez) avant publication. Aucune réponse n\'est publiée sans votre approbation.',
      },
      {
        question: 'Combien de temps faut-il pour voir des résultats ?',
        answer: 'Les premiers résultats sont visibles dès le premier mois. En moyenne, nos clients doublent leur nombre d\'avis en 3 mois et gagnent +0.4 étoile sur leur note Google.',
      },
      {
        question: 'TriggerFlow fonctionne-t-il avec TripAdvisor et Booking ?',
        answer: 'Oui. Vous pouvez diriger les clients vers Google, TripAdvisor ou Booking.com selon vos priorités. La rotation entre plateformes est configurable.',
      },
    ],

    journey: [
      { label: 'Check-out', description: 'Départ du client', active: false },
      { label: 'J+1', description: 'Enquête satisfaction', active: true },
      { label: 'Filtre', description: 'Note > 4/5 ?', active: true },
      { label: 'Demande', description: 'Lien Google envoyé', active: true },
      { label: 'Publication', description: 'Avis publié', active: false },
      { label: 'Réponse', description: 'Réponse IA validée', active: true },
    ],

    relatedSolutions: ['automatiser-communication', 'hotels-independants', 'fideliser-clients'],

    ctaTitle: "Doublez vos avis Google en 3 mois",
    ctaSubtitle: "Activez la collecte automatique d'avis et boostez votre e-réputation",
  },

  'booster-upsell': {
    slug: 'booster-upsell',
    slugEn: 'boost-upsell',
    icon: TrendingDown, // Using TrendingDown temporarily, should be TrendingUp
    category: 'objectif',
    heroMockup: 'UpsellOfferMockup',
    title: 'Booster vos ventes additionnelles',
    headline: "+17% de panier moyen grâce à l'upsell automatisé",
    description: "Vos services annexes sont une mine d'or inexploitée. TriggerFlow propose automatiquement le spa, le restaurant, les surclassements... et vos revenus décollent.",

    persona: {
      role: 'Revenue Manager / Directeur',
      painStatement: 'Vos services annexes ont de la capacité disponible et la réception ne propose rien.',
      valueProposition: '+17% de panier moyen sans embaucher un commercial.',
    },

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

    painPoints: [
      'Le spa a 40% de capacité inutilisée mais la réception ne le propose jamais',
      'Les surclassements sont bradés en dernière minute au lieu d\'être vendus en amont',
      'Pas de segmentation : le couple en voyage romantique reçoit la même offre que la famille',
      'L\'offre de late checkout arrive après que le client a fait sa valise',
      'Aucune donnée sur les revenus générés par l\'upsell',
    ],
    benefits: [
      'Propositions automatiques de surclassement J-3 avant l\'arrivée',
      'Offres contextuelles selon le profil : couple → champagne, famille → kids club',
      'SMS late checkout envoyé le matin du départ à 8h pile',
      'Paiement en ligne intégré, PMS mis à jour automatiquement',
      'Dashboard revenus avec attribution précise par canal et offre',
    ],

    stats: [
      { value: '17', suffix: '%', label: 'de panier moyen en plus' },
      { value: '23', suffix: '%', label: 'de taux de conversion upsell' },
      { value: '10', suffix: 'x', label: 'retour sur investissement' },
    ],

    features: [
      {
        slug: 'ventes-additionnelles',
        highlight: 'Offres automatisées',
        whyForPersona: 'Chaque client reçoit l\'offre la plus pertinente au meilleur moment, sans intervention de la réception.',
        bullets: ['Catalogue d\'offres configurables', 'Paiement en ligne intégré', 'Mise à jour PMS automatique'],
      },
      {
        slug: 'automatisations',
        highlight: 'Timing intelligent',
        whyForPersona: 'Le surclassement J-3, le spa J-1, le late checkout le matin du départ. Le timing parfait à chaque fois.',
        bullets: ['Règles de déclenchement par événement', 'Fenêtres d\'envoi optimisées', 'A/B testing sur le timing'],
      },
      {
        slug: 'crm',
        highlight: 'Segmentation client',
        whyForPersona: 'Couple, famille, business... chaque segment reçoit l\'offre adaptée. Plus de "one size fits all".',
        bullets: ['Détection automatique du profil', 'Historique d\'achats', 'Score de propension à l\'achat'],
      },
      {
        slug: 'analytics',
        highlight: 'Suivi revenus générés',
        whyForPersona: 'Vous savez exactement combien chaque offre rapporte. Optimisez en continu votre stratégie upsell.',
        bullets: ['Revenue par offre et par canal', 'Taux de conversion en temps réel', 'Comparaison période à période'],
      },
    ],

    useCases: [
      {
        title: 'Surclassement pré-séjour',
        description: 'J-3 : proposez la chambre supérieure avec une réduction.',
        steps: ['J-3 avant arrivée', 'Email offre surclassement', 'Paiement en ligne', 'PMS mis à jour'],
        result: '+3 000€/mois de revenus additionnels',
      },
      {
        title: 'Cross-sell contextuel',
        description: 'Couple en séjour romantique → pack champagne. Famille → kids club.',
        steps: ['Analyse réservation', 'Détection profil', 'Offre personnalisée', 'Conversion'],
        result: '23% de taux de conversion',
      },
      {
        title: 'Late checkout jour J',
        description: 'Le matin du départ, SMS avec offre late checkout.',
        steps: ['Jour départ 8h', 'SMS offre -20€', 'Réponse client', 'Mise à jour système'],
        result: '35% d\'acceptation late checkout',
      },
    ],

    testimonial: {
      quote: "Le surclassement automatique nous rapporte 3000€ de plus par mois. L'investissement TriggerFlow est rentabilisé en 2 semaines.",
      author: 'Nathalie P.',
      role: 'Revenue Manager',
      hotel: 'Grand Hotel du Port',
      location: 'La Rochelle',
      metric: '+3 000€/mois de revenus upsell',
    },

    integrations: ['Mews', 'Opera Cloud', 'Stripe', 'Thaïs PMS'],

    faq: [
      {
        question: 'Comment le client paie-t-il un surclassement ?',
        answer: 'Le client reçoit un email avec un lien de paiement sécurisé (Stripe). Une fois le paiement effectué, le PMS est automatiquement mis à jour avec la nouvelle chambre.',
      },
      {
        question: 'Peut-on personnaliser les offres selon le type de client ?',
        answer: 'Oui. TriggerFlow détecte le profil du client (couple, famille, business, fidèle...) et propose l\'offre la plus pertinente. Vous définissez les règles une fois.',
      },
      {
        question: 'Quel est le taux de conversion moyen ?',
        answer: 'En moyenne, 23% des offres upsell sont acceptées. Le surclassement pré-séjour est le plus performant avec des taux allant jusqu\'à 30%.',
      },
      {
        question: 'Est-ce que TriggerFlow gère le paiement ?',
        answer: 'TriggerFlow s\'intègre avec Stripe pour le paiement en ligne sécurisé. Le montant est automatiquement ajouté à la facture du client dans le PMS.',
      },
    ],

    journey: [
      { label: 'Réservation', description: 'Analyse du profil', active: true },
      { label: 'J-3', description: 'Offre surclassement', active: true },
      { label: 'J-1', description: 'Pack spa / restaurant', active: true },
      { label: 'Séjour', description: 'Cross-sell contextuel', active: true },
      { label: 'Jour J', description: 'Late checkout', active: true },
      { label: 'Post-séjour', description: 'Offre prochain séjour', active: false },
    ],

    relatedSolutions: ['automatiser-communication', 'fideliser-clients', 'hotels-independants'],

    ctaTitle: "Débloquez +17% de panier moyen",
    ctaSubtitle: "Automatisez vos ventes additionnelles et boostez vos revenus",
  },

  'fideliser-clients': {
    slug: 'fideliser-clients',
    slugEn: 'customer-loyalty',
    icon: Heart,
    category: 'objectif',
    heroMockup: 'LoyaltyPointsMockup',
    title: 'Fidéliser vos clients',
    headline: 'Transformez vos clients en habitués qui réservent en direct',
    description: 'Pourquoi payer 15-20% de commission aux OTA pour des clients que vous connaissez déjà ? Fidélisez-les et récupérez vos marges.',

    persona: {
      role: 'Propriétaire / Directeur',
      painStatement: 'Vos clients satisfaits réservent quand même via Booking la fois suivante et vous payez 15% de commission.',
      valueProposition: '+25% de réservations directes. Des milliers d\'euros de commissions OTA économisées.',
    },

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

    painPoints: [
      'Vos clients satisfaits réservent via Booking la fois suivante et vous payez 15-20% de commission',
      'Pas de programme fidélité : aucune raison pour le client de revenir en direct',
      'Zéro communication post-séjour, vous disparaissez de la mémoire du client',
      'Impossible de rivaliser avec les programmes des grandes chaînes',
      'Vous ne savez même pas quels clients sont venus plusieurs fois',
    ],
    benefits: [
      'Programme fidélité intégré avec points et récompenses personnalisables',
      'Relances automatiques post-séjour pour maintenir le lien',
      'Campagnes win-back pour les clients inactifs depuis 12 mois',
      'Offres anniversaire et événements spéciaux automatisées',
      'Portail client dédié avec cumul de points et réservation directe',
    ],

    stats: [
      { value: '25', suffix: '%', label: 'de réservations directes en plus' },
      { value: '35', suffix: '%', label: 'de taux de retour' },
      { value: '15', suffix: 'K€', label: 'de commissions OTA économisées/an' },
    ],

    features: [
      {
        slug: 'fidelite',
        highlight: 'Programme fidélité intégré',
        whyForPersona: 'Offrez un programme digne des grandes chaînes sans le budget. Points, récompenses, statuts : tout est configurable.',
        bullets: ['Points par séjour', 'Niveaux / statuts VIP', 'Récompenses personnalisables'],
      },
      {
        slug: 'newsletter',
        highlight: 'Campagnes ciblées',
        whyForPersona: 'Restez dans la mémoire de vos clients avec des offres saisonnières ciblées. Le bon message au bon segment.',
        bullets: ['Segmentation RFM automatique', 'Templates saisonniers', 'Tracking des réservations'],
      },
      {
        slug: 'crm',
        highlight: 'Historique client complet',
        whyForPersona: 'Reconnaissez vos clients fidèles : séjours passés, préférences, points. Accueillez-les comme des VIP.',
        bullets: ['Fiche client enrichie auto', 'Préférences et allergies', 'Score fidélité'],
      },
      {
        slug: 'automatisations',
        highlight: 'Relances automatiques',
        whyForPersona: 'Win-back, anniversaire, offres saisonnières... les relances partent toutes seules au bon moment.',
        bullets: ['Campagne win-back 12 mois', 'Email anniversaire', 'Offre saisonnière automatique'],
      },
    ],

    useCases: [
      {
        title: 'Programme points automatique',
        description: 'Les clients cumulent des points à chaque séjour, échangeables contre des nuits ou services.',
        steps: ['Séjour terminé', 'Points crédités', 'Email récap points', 'Offre fidélité'],
        result: '+25% de réservations directes',
      },
      {
        title: 'Anniversaire client',
        description: "Email automatique avec offre spéciale le jour de l'anniversaire.",
        steps: ['Date anniversaire', 'Email + offre -15%', 'Validité 30 jours', 'Relance J+15'],
        result: '18% de taux de conversion',
      },
      {
        title: 'Campagne win-back',
        description: "Client pas revenu depuis 12 mois ? Offre de reconquête.",
        steps: ['Détection inactivité', 'Email "Vous nous manquez"', 'Offre exclusive', 'Relance SMS'],
        result: '12% de clients reconquis',
      },
    ],

    testimonial: {
      quote: "Notre taux de réservation directe est passé de 30% à 55%. On économise des milliers d'euros de commissions OTA.",
      author: 'Pierre D.',
      role: 'Propriétaire',
      hotel: 'Hôtel & Restaurant du Château',
      location: 'Loire',
      metric: 'De 30% à 55% de réservations directes',
    },

    integrations: ['Mews', 'Stripe', 'Thaïs PMS', 'Misterbooking'],

    faq: [
      {
        question: 'Comment fonctionne le programme fidélité ?',
        answer: 'Les clients cumulent des points à chaque séjour (nombre de points configurable par nuitée). Ils échangent ces points contre des récompenses que vous définissez : nuit gratuite, surclassement, petit-déjeuner, etc.',
      },
      {
        question: 'Les clients ont-ils un espace dédié ?',
        answer: 'Oui, chaque client fidèle dispose d\'un portail où il peut consulter ses points, ses récompenses disponibles et réserver directement son prochain séjour.',
      },
      {
        question: 'Comment mesurer l\'impact sur les réservations directes ?',
        answer: 'Le dashboard TriggerFlow affiche le taux de réservation directe, le nombre de clients fidèles actifs, les récompenses utilisées et les économies de commissions OTA réalisées.',
      },
      {
        question: 'Peut-on créer des offres saisonnières automatiques ?',
        answer: 'Oui. Vous programmez des campagnes qui se déclenchent automatiquement : offre hiver en novembre, offre été en avril, offre rentrée en août. Chaque campagne cible le bon segment.',
      },
      {
        question: 'Combien coûte le programme fidélité en commissions OTA économisées ?',
        answer: 'En moyenne, nos clients passent de 30% à 50%+ de réservations directes, économisant 15 000€ à 50 000€ par an de commissions OTA. Le ROI est généralement atteint dès le 2ème mois.',
      },
    ],

    journey: [
      { label: '1er séjour', description: 'Inscription automatique', active: true },
      { label: 'Post-séjour', description: 'Email + points crédités', active: true },
      { label: 'J+90', description: 'Offre saisonnière', active: true },
      { label: 'Anniversaire', description: 'Offre spéciale -15%', active: true },
      { label: 'J+365', description: 'Win-back si inactif', active: true },
      { label: '2ème séjour', description: 'Réservation directe !', active: true },
    ],

    relatedSolutions: ['automatiser-communication', 'augmenter-avis', 'booster-upsell'],

    ctaTitle: "Récupérez vos clients et vos marges",
    ctaSubtitle: "Lancez votre programme fidélité et boostez les réservations directes",
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
  category?: 'type' | 'objectif';
  challenges: { title: string; description: string }[];
  features: SolutionFeature[];
  useCases: SolutionUseCase[];
  testimonial: SolutionTestimonial;
  integrations: string[];
  stats: SolutionStat[];
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
    category: solution.category,
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
