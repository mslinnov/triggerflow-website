import {
  Mail,
  MessageSquare,
  MessageCircle,
  Newspaper,
  Gift,
  Zap,
  Users,
  FileText,
  Star,
  BarChart3,
  Layout,
  UserCheck,
  BarChart,
  Clock,
  Shield,
  Bot,
  Inbox,
  Palette,
  Calendar,
  User,
  RefreshCw,
  Tag,
  Workflow,
  Play,
  GitBranch,
  PenTool,
  Send,
  PieChart,
  Globe,
  Activity,
  TrendingUp,
  Target,
  ShoppingCart,
  type LucideIcon,
} from 'lucide-react';

export interface ModuleFeature {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface ModuleUseCase {
  title: string;
  description: string;
}

export interface ModuleData {
  slug: string;
  icon: LucideIcon;
  title: string;
  headline: string;
  description: string;
  mockup: string;
  painPoints: string[];
  benefits: string[];
  features: ModuleFeature[];
  useCases: ModuleUseCase[];
  relatedModules: string[];
}

export const modules: Record<string, ModuleData> = {
  email: {
    slug: 'email',
    icon: Mail,
    title: 'Email',
    headline: 'Des emails personnalisés qui convertissent',
    description: 'Envoyez des emails transactionnels et marketing automatiquement. Confirmation de réservation, rappels, offres personnalisées... chaque message au bon moment.',
    mockup: 'EmailMockup',
    painPoints: [
      'Vous envoyez manuellement chaque email de confirmation',
      'Vos emails finissent dans les spams',
      "Vous n'avez pas le temps de personnaliser les messages"
    ],
    benefits: [
      'Emails automatiques déclenchés par vos règles',
      'Délivrabilité optimale (SPF, DKIM, DMARC)',
      'Variables dynamiques : {{prenom}}, {{date_arrivee}}...'
    ],
    features: [
      {
        title: 'Templates professionnels',
        description: "Bibliothèque de templates prêts à l'emploi ou créez les vôtres avec notre éditeur drag & drop.",
        icon: Layout
      },
      {
        title: 'Personnalisation avancée',
        description: 'Insérez automatiquement le prénom, les dates de séjour, le type de chambre et bien plus.',
        icon: UserCheck
      },
      {
        title: 'Suivi en temps réel',
        description: "Taux d'ouverture, clics, rebonds... Suivez les performances de chaque email.",
        icon: BarChart
      }
    ],
    useCases: [
      { title: 'Confirmation de réservation', description: "Email automatique dès qu'une réservation est validée" },
      { title: 'Rappel pré-séjour', description: 'J-3 : informations pratiques et offres de services' },
      { title: 'Remerciement post-séjour', description: "J+1 : merci + demande d'avis" },
      { title: 'Offres personnalisées', description: 'Anniversaire, fidélité, promotions ciblées' }
    ],
    relatedModules: ['sms', 'automatisations', 'newsletter']
  },

  sms: {
    slug: 'sms',
    icon: MessageSquare,
    title: 'SMS',
    headline: 'Des SMS qui arrivent toujours à destination',
    description: "Le SMS a un taux d'ouverture de 98%. Utilisez-le pour les messages importants : arrivée, informations clés, offres flash.",
    mockup: 'PhoneMockup',
    painPoints: [
      'Vos emails importants ne sont pas lus',
      "Les clients n'ont pas les infos à temps",
      'Vous appelez chaque client individuellement'
    ],
    benefits: [
      "98% de taux d'ouverture",
      'Message lu en moins de 3 minutes',
      'Envoi automatisé selon vos règles'
    ],
    features: [
      {
        title: 'Envoi intelligent',
        description: "Programmez vos SMS selon le fuseau horaire du client et les heures d'envoi optimales.",
        icon: Clock
      },
      {
        title: 'SMS bidirectionnel',
        description: 'Recevez les réponses de vos clients et répondez depuis votre dashboard.',
        icon: MessageCircle
      },
      {
        title: 'Conformité RGPD',
        description: 'Gestion automatique du consentement et du désabonnement.',
        icon: Shield
      }
    ],
    useCases: [
      { title: 'SMS de bienvenue', description: 'Code WiFi, accès chambre, infos pratiques' },
      { title: 'Rappel check-in', description: "Horaires et modalités d'arrivée" },
      { title: 'Offre flash', description: 'Promotion spa, restaurant, late checkout' },
      { title: 'Notification urgente', description: 'Changement de chambre, info importante' }
    ],
    relatedModules: ['email', 'whatsapp', 'automatisations']
  },

  whatsapp: {
    slug: 'whatsapp',
    icon: MessageCircle,
    title: 'WhatsApp',
    headline: 'Communiquez sur le canal préféré de vos clients',
    description: 'WhatsApp Business pour les hôtels : messages automatisés, réponses rapides, et conversation fluide avec vos clients.',
    mockup: 'WhatsAppMockup',
    painPoints: [
      "Les clients préfèrent WhatsApp mais vous n'y êtes pas",
      'Vous gérez WhatsApp manuellement depuis un téléphone',
      'Pas de traçabilité des conversations'
    ],
    benefits: [
      "Canal préféré de 2 milliards d'utilisateurs",
      'Automatisation + conversation humaine',
      'Historique centralisé dans TriggerFlow'
    ],
    features: [
      {
        title: 'Messages automatisés',
        description: 'Templates WhatsApp approuvés pour vos messages transactionnels.',
        icon: Zap
      },
      {
        title: 'Chatbot intégré',
        description: 'Réponses automatiques aux questions fréquentes (horaires, services, directions).',
        icon: Bot
      },
      {
        title: 'Conversation unifiée',
        description: 'Tous vos canaux (email, SMS, WhatsApp) dans une seule interface.',
        icon: Inbox
      }
    ],
    useCases: [
      { title: 'Conciergerie digitale', description: 'Réservation spa, restaurant, taxi' },
      { title: 'Check-in en ligne', description: 'Envoi du formulaire et récupération des infos' },
      { title: 'Service client', description: 'Réponse rapide aux demandes des clients' },
      { title: 'Upsell conversationnel', description: 'Proposer des services de manière naturelle' }
    ],
    relatedModules: ['sms', 'email', 'crm']
  },

  newsletter: {
    slug: 'newsletter',
    icon: Newspaper,
    title: 'Newsletter',
    headline: 'Gardez le contact avec vos anciens clients',
    description: 'Newsletters et campagnes marketing pour fidéliser vos clients et générer des réservations directes.',
    mockup: 'CampaignMockup',
    painPoints: [
      'Vous perdez le contact avec vos anciens clients',
      'Vos campagnes marketing prennent trop de temps',
      'Vous ne savez pas segmenter votre base'
    ],
    benefits: [
      "Restez dans l'esprit de vos clients",
      'Éditeur drag & drop intuitif',
      'Segmentation avancée automatique'
    ],
    features: [
      {
        title: 'Éditeur visuel',
        description: 'Créez de belles newsletters sans coder avec notre éditeur drag & drop.',
        icon: Palette
      },
      {
        title: 'Segmentation intelligente',
        description: 'Ciblez par type de séjour, montant dépensé, date de dernière visite...',
        icon: Users
      },
      {
        title: 'Automatisation des campagnes',
        description: 'Programmez vos envois et créez des séquences automatiques.',
        icon: Calendar
      }
    ],
    useCases: [
      { title: 'Newsletter mensuelle', description: "Actualités de l'hôtel et de la région" },
      { title: 'Offres saisonnières', description: 'Promotions été, Noël, Saint-Valentin' },
      { title: 'Programme fidélité', description: 'Offres exclusives pour clients fidèles' },
      { title: 'Anniversaire', description: 'Email automatique avec offre spéciale' }
    ],
    relatedModules: ['email', 'fidelite', 'automatisations']
  },

  fidelite: {
    slug: 'fidelite',
    icon: Gift,
    title: 'Programme de fidélité',
    headline: 'Transformez vos clients en ambassadeurs',
    description: 'Programme de fidélité intégré pour récompenser vos meilleurs clients et encourager les réservations directes.',
    mockup: 'CRMMockup',
    painPoints: [
      'Vos clients réservent via les OTA au lieu de revenir en direct',
      "Vous n'avez pas de programme fidélité faute de temps",
      'Impossible de suivre qui sont vos meilleurs clients'
    ],
    benefits: [
      'Programme fidélité clé en main',
      'Points et récompenses automatiques',
      'Augmentez vos réservations directes'
    ],
    features: [
      {
        title: 'Points automatiques',
        description: 'Les clients cumulent des points à chaque séjour, automatiquement.',
        icon: Star
      },
      {
        title: 'Récompenses personnalisables',
        description: 'Définissez vos paliers et récompenses : nuits gratuites, upgrades, services...',
        icon: Gift
      },
      {
        title: 'Espace client',
        description: 'Vos clients suivent leurs points et récompenses dans leur espace dédié.',
        icon: User
      }
    ],
    useCases: [
      { title: 'Points par euro dépensé', description: '1€ = 1 point, échangeables contre des avantages' },
      { title: 'Statuts VIP', description: 'Bronze, Silver, Gold avec avantages croissants' },
      { title: 'Parrainage', description: 'Récompensez les clients qui vous recommandent' },
      { title: 'Offres exclusives', description: 'Accès prioritaire aux promos pour les membres' }
    ],
    relatedModules: ['crm', 'newsletter', 'email']
  },

  automatisations: {
    slug: 'automatisations',
    icon: Zap,
    title: 'Automatisations',
    headline: 'Créez les workflows que vous avez toujours imaginés',
    description: 'Le cœur de TriggerFlow : créez des automatisations sur-mesure avec notre builder visuel. Déclencheur, conditions, actions... vous décidez.',
    mockup: 'WorkflowBuilderMockup',
    painPoints: [
      'Vous répétez les mêmes tâches chaque jour',
      'Des actions importantes sont oubliées',
      "Vous n'avez pas le temps d'être proactif"
    ],
    benefits: [
      "Automatisez n'importe quel scénario",
      'Builder visuel sans code',
      'TriggerFlow travaille 24/7 pour vous'
    ],
    features: [
      {
        title: 'Builder visuel',
        description: 'Créez vos workflows en glissant-déposant des blocs. Aucune compétence technique requise.',
        icon: Workflow
      },
      {
        title: 'Déclencheurs multiples',
        description: 'Réservation, check-in, check-out, date, comportement client...',
        icon: Play
      },
      {
        title: 'Conditions avancées',
        description: 'Si/Sinon, délais, segmentation... créez des scénarios complexes.',
        icon: GitBranch
      }
    ],
    useCases: [
      { title: 'Séquence pré-séjour', description: "J-7, J-3, J-1 : préparez l'arrivée" },
      { title: 'Upsell automatique', description: 'Proposer le spa aux clients en chambre supérieure' },
      { title: 'Relance avis', description: "J+1 : demander un avis si satisfaction > 4/5" },
      { title: 'Anniversaire client', description: "Email + offre le jour de l'anniversaire" }
    ],
    relatedModules: ['email', 'sms', 'whatsapp']
  },

  crm: {
    slug: 'crm',
    icon: Users,
    title: 'CRM',
    headline: 'Connaissez vos clients comme jamais',
    description: 'Base clients unifiée avec historique complet : séjours, préférences, communications, dépenses. Tout au même endroit.',
    mockup: 'CRMMockup',
    painPoints: [
      'Les infos clients sont éparpillées dans plusieurs outils',
      'Vous ne savez pas qui sont vos meilleurs clients',
      "Impossible de personnaliser l'accueil"
    ],
    benefits: [
      'Vue 360° de chaque client',
      'Historique complet automatique',
      'Segmentation puissante'
    ],
    features: [
      {
        title: 'Fiche client enrichie',
        description: 'Coordonnées, séjours, préférences, dépenses, communications... tout en un clic.',
        icon: User
      },
      {
        title: 'Synchronisation PMS',
        description: 'Import automatique des données depuis votre PMS. Toujours à jour.',
        icon: RefreshCw
      },
      {
        title: 'Tags et segments',
        description: 'Créez vos propres tags et segments pour cibler vos communications.',
        icon: Tag
      }
    ],
    useCases: [
      { title: 'Accueil personnalisé', description: 'Préférences du client affichées à la réception' },
      { title: 'Clients VIP', description: 'Identifier et choyer vos meilleurs clients' },
      { title: 'Clients à risque', description: 'Détecter les clients insatisfaits' },
      { title: 'Segmentation marketing', description: 'Cibler par comportement et historique' }
    ],
    relatedModules: ['automatisations', 'fidelite', 'email']
  },

  formulaires: {
    slug: 'formulaires',
    icon: FileText,
    title: 'Formulaires',
    headline: 'Collectez les bonnes infos au bon moment',
    description: 'Formulaires de pré-check-in, enquêtes de satisfaction, demandes spéciales... Créez et envoyez automatiquement.',
    mockup: 'EmailMockup',
    painPoints: [
      'Le check-in prend trop de temps',
      "Vous manquez d'infos sur les préférences clients",
      'Les enquêtes papier ne sont jamais analysées'
    ],
    benefits: [
      'Check-in accéléré grâce au pré-remplissage',
      'Données clients enrichies automatiquement',
      'Résultats analysés en temps réel'
    ],
    features: [
      {
        title: 'Builder de formulaires',
        description: 'Créez vos formulaires en quelques clics avec notre éditeur visuel.',
        icon: PenTool
      },
      {
        title: 'Envoi automatique',
        description: "Déclenchez l'envoi du formulaire selon vos règles (J-3, après réservation...).",
        icon: Send
      },
      {
        title: 'Analyse des réponses',
        description: 'Dashboard de résultats avec graphiques et export.',
        icon: PieChart
      }
    ],
    useCases: [
      { title: 'Formulaire pré-check-in', description: "Identité, heure d'arrivée, demandes" },
      { title: 'Enquête satisfaction', description: 'NPS et feedback après le séjour' },
      { title: 'Préférences séjour', description: 'Oreiller, étage, régime alimentaire' },
      { title: 'Demande de service', description: 'Réservation spa, restaurant, taxi' }
    ],
    relatedModules: ['automatisations', 'email', 'crm']
  },

  avis: {
    slug: 'avis',
    icon: Star,
    title: 'Gestion des avis',
    headline: 'Boostez votre réputation en ligne',
    description: 'Collectez plus d\'avis positifs, répondez efficacement, et suivez votre e-réputation sur toutes les plateformes.',
    mockup: 'DashboardMockup',
    painPoints: [
      "Vous avez peu d'avis malgré des clients satisfaits",
      'Les avis négatifs restent sans réponse',
      'Vous ne suivez pas votre réputation en ligne'
    ],
    benefits: [
      "Plus d'avis grâce aux demandes automatiques",
      "Réponses suggérées par l'IA",
      'Dashboard de réputation unifié'
    ],
    features: [
      {
        title: 'Demande intelligente',
        description: "Envoyez la demande d'avis au bon moment, seulement aux clients satisfaits.",
        icon: Send
      },
      {
        title: 'Multi-plateformes',
        description: 'Google, TripAdvisor, Booking... dirigez vers la plateforme de votre choix.',
        icon: Globe
      },
      {
        title: 'Réponses assistées',
        description: "L'IA vous suggère des réponses personnalisées à chaque avis.",
        icon: MessageSquare
      }
    ],
    useCases: [
      { title: 'Collecte proactive', description: 'Demande automatique J+1 si satisfaction > 4/5' },
      { title: 'Gestion des négatifs', description: 'Alerte immédiate + réponse rapide' },
      { title: 'Suivi réputation', description: 'Note moyenne et évolution dans le temps' },
      { title: 'Benchmark', description: 'Comparez-vous à vos concurrents' }
    ],
    relatedModules: ['automatisations', 'email', 'formulaires']
  },

  analytics: {
    slug: 'analytics',
    icon: BarChart3,
    title: 'Analytics',
    headline: 'Prenez des décisions basées sur les données',
    description: 'Tableaux de bord complets pour suivre vos performances : emails, SMS, automatisations, satisfaction client.',
    mockup: 'DashboardMockup',
    painPoints: [
      'Vous ne savez pas ce qui fonctionne',
      'Les données sont dans plusieurs outils',
      "Pas le temps d'analyser les résultats"
    ],
    benefits: [
      'Toutes vos métriques en un seul endroit',
      'Rapports automatiques',
      'Insights actionnables'
    ],
    features: [
      {
        title: 'Dashboard temps réel',
        description: 'Visualisez vos KPIs en direct : envois, ouvertures, clics, conversions.',
        icon: Activity
      },
      {
        title: 'Rapports automatiques',
        description: 'Recevez un rapport hebdomadaire ou mensuel par email.',
        icon: FileText
      },
      {
        title: 'Comparaison périodes',
        description: 'Comparez vos performances mois par mois, année par année.',
        icon: TrendingUp
      }
    ],
    useCases: [
      { title: 'Performance emails', description: "Taux d'ouverture, clics, désabonnements" },
      { title: 'ROI automatisations', description: 'Revenus générés par workflow' },
      { title: 'Satisfaction client', description: 'NPS et évolution dans le temps' },
      { title: 'Activité équipe', description: 'Actions effectuées par utilisateur' }
    ],
    relatedModules: ['automatisations', 'email', 'crm']
  },

  'hub-messagerie': {
    slug: 'hub-messagerie',
    icon: Inbox,
    title: 'Hub Messagerie',
    headline: 'Tous vos canaux dans une seule boîte de réception',
    description: 'Centralisez emails, SMS et WhatsApp dans une interface unique. Ne manquez plus jamais un message client et répondez en un clic.',
    mockup: 'DashboardMockup',
    painPoints: [
      'Vous jonglez entre 5 outils différents pour communiquer',
      'Des messages clients passent entre les mailles du filet',
      "Impossible de voir l'historique complet d'un client"
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
        icon: Inbox
      },
      {
        title: 'Vue client 360°',
        description: "En un clic, voyez tout l'historique : séjours, préférences, communications passées.",
        icon: User
      },
      {
        title: 'Templates de réponse',
        description: 'Répondez en 1 clic avec des templates personnalisables.',
        icon: FileText
      }
    ],
    useCases: [
      { title: 'Demande client WhatsApp', description: "Répondez depuis le hub, l'historique email est visible" },
      { title: 'Réclamation multi-canal', description: 'Le client a envoyé un email puis un SMS : tout est groupé' },
      { title: 'Handover équipe', description: 'Passez une conversation à un collègue avec le contexte complet' },
      { title: 'Suivi post-séjour', description: "Relancez un client depuis sa fiche avec tout l'historique" }
    ],
    relatedModules: ['email', 'sms', 'whatsapp', 'crm']
  },

  'ventes-additionnelles': {
    slug: 'ventes-additionnelles',
    icon: TrendingUp,
    title: 'Ventes Additionnelles',
    headline: 'Augmentez le panier moyen de chaque séjour',
    description: 'Proposez automatiquement les bons services au bon moment : surclassement, spa, restaurant, late checkout... et boostez votre RevPAR.',
    mockup: 'DashboardMockup',
    painPoints: [
      'Vos services annexes sont sous-vendus',
      "La réception n'a pas le temps de proposer les extras",
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
        icon: Target
      },
      {
        title: 'Timing intelligent',
        description: 'J-3 pour le surclassement, J-1 pour le restaurant, check-in pour le late checkout.',
        icon: Clock
      },
      {
        title: 'Tunnel de conversion',
        description: "Le client réserve en 2 clics depuis l'email ou le SMS.",
        icon: ShoppingCart
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
};

export const modulesList = Object.values(modules);
export const moduleSlugs = Object.keys(modules);

// Serializable version for Server Components (without React components/functions)
export interface ModuleSerializable {
  slug: string;
  title: string;
  headline: string;
  description: string;
  mockup: string;
  painPoints: string[];
  benefits: string[];
  features: { title: string; description: string }[];
  useCases: ModuleUseCase[];
  relatedModules: string[];
}

export function getModuleSerializable(slug: string): ModuleSerializable | null {
  const module = modules[slug];
  if (!module) return null;

  return {
    slug: module.slug,
    title: module.title,
    headline: module.headline,
    description: module.description,
    mockup: module.mockup,
    painPoints: module.painPoints,
    benefits: module.benefits,
    features: module.features.map(f => ({ title: f.title, description: f.description })),
    useCases: module.useCases,
    relatedModules: module.relatedModules,
  };
}
