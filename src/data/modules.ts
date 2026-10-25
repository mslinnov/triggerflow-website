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
  CreditCard,
  type LucideIcon,
} from 'lucide-react';

export interface ModuleFeature {
  title: string;
  description: string;
  icon: LucideIcon;
  bullets?: string[];
  mockup?: string;
  image?: string;
}

export interface ModuleUseCase {
  title: string;
  description: string;
  result?: string;
}

export interface ModuleStat {
  value: string;
  label: string;
  suffix?: string;
}

export interface ModuleFaq {
  question: string;
  answer: string;
}

export interface ModuleTestimonial {
  quote: string;
  author: string;
  role: string;
  hotel: string;
  metric?: string;
}

export interface JourneyStep {
  label: string;
  description: string;
  active?: boolean;
}

export interface ModuleData {
  slug: string;
  icon: LucideIcon;
  title: string;
  seoTitle: string;
  headline: string;
  description: string;
  mockup: string;
  heroImage?: string;
  painPoints: string[];
  benefits: string[];
  features: ModuleFeature[];
  useCases: ModuleUseCase[];
  relatedModules: string[];
  stats?: ModuleStat[];
  faq?: ModuleFaq[];
  testimonial?: ModuleTestimonial;
  integrations?: string[];
  journey?: JourneyStep[];
  ctaTitle?: string;
  ctaSubtitle?: string;
}

export const modules: Record<string, ModuleData> = {
  email: {
    slug: 'email',
    icon: Mail,
    title: 'Email',
    seoTitle: 'Email automatique hôtel : confirmations, pré-séjour & fidélisation',
    headline: 'Vos emails transactionnels envoyés automatiquement, 100% personnalisables',
    description: 'Confirmation dès la réservation, rappel pré-séjour à J-3, demande d\'avis à J+1. Chaque email est personnalisé aux couleurs de votre établissement, avec les données de votre PMS. Aucune compétence technique requise.',
    mockup: 'EmailMockup',
    heroImage: '/images/produit/email/hero-email.webp',
    painPoints: [
      '45 min/jour perdues à copier-coller des confirmations dans Outlook ou votre PMS',
      'Vos emails finissent dans les spams, vos clients ne reçoivent jamais les infos d\'arrivée',
      'Des emails génériques sans votre logo ni vos couleurs, le client ne sait pas qui lui écrit',
      'Chaque collaborateur envoie un email différent, aucune cohérence dans votre communication'
    ],
    benefits: [
      'Emails envoyés automatiquement à chaque réservation, check-in, check-out, 0 action manuelle, dès le premier jour',
      'SPF, DKIM et DMARC configurés pour vous sur votre domaine : 94 % des e-mails de nos clients sont délivrés (12 derniers mois)',
      'Chaque email porte votre logo, vos couleurs, votre charte, le client reconnaît votre hôtel au premier coup d\'œil',
      'Une identité visuelle cohérente sur tous vos points de contact : confirmation, pré-séjour, remerciement, offres'
    ],
    stats: [
      { value: '94', label: 'des e-mails délivrés (12 derniers mois, tous nos hôtels)', suffix: '%' },
      { value: '35', label: 'd\'ouverture, hors adresses relais des OTA (12 derniers mois)', suffix: '%' },
      { value: '0', label: 'ligne de code pour créer un e-mail (éditeur glisser-déposer)', suffix: '' },
    ],
    journey: [
      { label: 'Réservation', description: 'Confirmation automatique personnalisée', active: true },
      { label: 'Pré-séjour', description: 'Infos pratiques + upsell J-3', active: true },
      { label: 'Arrivée', description: 'Bienvenue + WiFi + services', active: true },
      { label: 'Séjour', description: 'Offres & recommandations', active: false },
      { label: 'Départ', description: 'Remerciement + demande d\'avis', active: true },
      { label: 'Post-séjour', description: 'Fidélisation & offre retour', active: true },
    ],
    features: [
      {
        title: 'Un email builder pensé pour l\'hôtellerie - 0 ligne de code',
        description: 'Créez des emails 100% à votre image en drag & drop. Importez votre logo, vos couleurs, vos polices, chaque email que reçoit votre client est immédiatement identifiable comme venant de votre établissement. 15+ templates hôteliers prêts à l\'emploi.',
        icon: Layout,
        bullets: ['Charte graphique complète : logo, couleurs, polices', 'Templates hôteliers prêts à l\'emploi', 'Responsive mobile natif + preview avant envoi'],
        mockup: 'EmailEditorMockup',
        image: '/images/produit/email/email-builder.webp',
      },
      {
        title: 'Chaque email personnalisé avec les données de votre PMS',
        description: 'Prénom, dates de séjour, type de chambre, langue du client, les variables s\'insèrent automatiquement depuis votre PMS. Vous pouvez aussi afficher du contenu conditionnel : une offre spa pour les couples, le Kids Club pour les familles.',
        icon: UserCheck,
        bullets: ['Variables dynamiques illimitées depuis votre PMS', 'Contenu conditionnel par segment client', 'Multi-langue automatique (FR, EN, DE, ES...)'],
        mockup: 'EmailPersonalizationMockup',
        image: '/images/produit/email/email-personnalisation.webp',
      },
      {
        title: 'Mesurez chaque email, optimisez en continu',
        description: 'Taux d\'ouverture, clics, rebonds, désabonnements, suivez les performances de chaque email en temps réel. Identifiez ce qui fonctionne et ce qui doit être ajusté en un coup d\'œil.',
        icon: BarChart,
        bullets: ['Dashboard analytics en temps réel', 'Alertes automatiques sur les anomalies', 'Export CSV et rapports planifiés'],
        mockup: 'EmailAnalyticsMockup',
        image: '/images/produit/email/email-analytics.webp',
      }
    ],
    useCases: [
      {
        title: 'Confirmation instantanée',
        description: 'Le client réserve à 23h un dimanche sur Booking. Dans la foulée, il reçoit un email aux couleurs de votre hôtel avec son nom, ses dates, le type de chambre et un lien vers son espace client. Aucun collaborateur n\'a eu besoin d\'intervenir.',
        result: 'Envoyé dès la réservation, sans action manuelle'
      },
      {
        title: 'Rappel pré-séjour J-3',
        description: 'Trois jours avant l\'arrivée : horaires de check-in, code WiFi, itinéraire, et une proposition de surclassement ou de soin spa. Le client arrive informé, serein, et a déjà acheté un extra.',
        result: 'Des extras vendus avant l\'arrivée'
      },
      {
        title: 'Demande d\'avis intelligente',
        description: 'J+1 après le départ : un email de remerciement personnalisé avec un lien direct vers Google. Le système n\'envoie la demande d\'avis que si le séjour s\'est bien passé, pour protéger votre note.',
        result: 'Chaque client satisfait invité à laisser un avis Google'
      },
      {
        title: 'Offres ciblées post-séjour',
        description: 'Anniversaire du client, programme fidélité, promotion saisonnière, chaque offre est ciblée selon l\'historique de séjours et les préférences. Pas de spam, que de la pertinence.',
        result: 'Des offres envoyées aux bons clients seulement'
      }
    ],
    testimonial: {
      quote: 'On a mis en place les emails automatiques en une matinée, sans aucune compétence technique. Les clients arrivent mieux préparés et achètent plus de services avant même d\'arriver.',
      author: 'Sophie Laurent',
      role: 'Directrice Générale',
      hotel: 'Hôtel & Spa du Lac ****',
    },
    integrations: ['Thaïs PMS', 'Misterbooking', 'Medialog', 'Opera Cloud', 'Mews', 'Asterio', 'Lean PMS', 'Apaleo'],
    faq: [
      {
        question: 'Faut-il des compétences techniques pour créer des emails ?',
        answer: 'Non, aucune. L\'éditeur fonctionne en drag & drop : vous glissez des blocs (texte, image, bouton, logo) et vous personnalisez les couleurs en un clic. Si vous savez utiliser PowerPoint, vous saurez créer un email sur TriggerFlow. Et on fournit 15+ templates hôteliers prêts à l\'emploi pour démarrer immédiatement.'
      },
      {
        question: 'Est-ce que les emails arrivent bien en boîte de réception ?',
        answer: 'Oui. TriggerFlow configure automatiquement SPF, DKIM et DMARC sur votre domaine. Sur les 12 derniers mois, 94 % des e-mails envoyés par nos clients ont été délivrés ; les échecs restants sont surtout des adresses invalides saisies à la réservation.'
      },
      {
        question: 'Les emails reprennent-ils vraiment la charte de mon hôtel ?',
        answer: 'Complètement. Vous importez votre logo, définissez vos couleurs et vos polices une seule fois. Ensuite, chaque email - confirmation, pré-séjour, remerciement, offre - utilise automatiquement votre charte. Votre client reconnaît votre hôtel au premier coup d\'œil.'
      },
      {
        question: 'Comment les emails sont-ils déclenchés ?',
        answer: 'Les emails partent automatiquement selon des événements PMS : nouvelle réservation, J-3 avant arrivée, check-in, check-out, etc. Vous paramétrez les règles une fois, TriggerFlow gère tout ensuite, 24h/24, même le dimanche à 23h.'
      },
      {
        question: 'Est-ce compatible avec mon PMS ?',
        answer: 'TriggerFlow est connecté nativement aux principaux PMS du marché : Mews, Thaïs, Opera Cloud, Misterbooking, Medialog, Asterio, Vega, Apaleo et Reservit. L\'intégration se fait sans intervention technique.'
      },
      {
        question: 'Combien de temps pour être opérationnel ?',
        answer: 'Comptez 48 h pour être opérationnel : connexion de votre PMS, import de votre charte graphique et activation de vos premiers emails automatiques, avec notre équipe.'
      },
      {
        question: 'Y a-t-il un engagement ou une durée minimum ?',
        answer: 'Non. TriggerFlow fonctionne sans engagement. Vous pouvez résilier à tout moment en un clic depuis votre espace. On préfère vous garder parce que les résultats sont là, pas par obligation contractuelle.'
      },
      {
        question: 'Combien ça coûte ?',
        answer: 'Les tarifs sont publics : un plan gratuit pour démarrer, puis des plans payants mensuels avec l\'email builder, les automatisations et le support inclus. Consultez notre page tarifs pour le détail par plan, ou demandez une démo pour un devis personnalisé.'
      },
    ],
    ctaTitle: 'Envoyez votre premier email automatisé dès aujourd\'hui',
    ctaSubtitle: 'Démo personnalisée de 20 min. On vous montre avec VOS données, votre charte, vos emails.',
    relatedModules: ['sms', 'automatisations', 'paiements']
  },

  sms: {
    slug: 'sms',
    icon: MessageSquare,
    title: 'SMS',
    seoTitle: 'SMS hôtelier automatique : infos arrivée & offres',
    headline: 'Le SMS, le canal des messages qui comptent',
    description: 'Le SMS est le canal le plus efficace pour les messages critiques. Infos d\'arrivée, code WiFi, offre flash : votre client le voit tout de suite.',
    mockup: 'SmsHeroMockup',
    painPoints: [
      'Vos emails de check-in ne sont jamais lus, le client arrive sans les infos essentielles',
      'Vous appelez chaque client un par un pour confirmer les horaires d\'arrivée',
      'Vos offres flash spa ou restaurant passent inaperçues par email'
    ],
    benefits: [
      'Un SMS arrive sur le téléphone, même sans connexion internet : 90 % des SMS de nos clients sont remis (12 derniers mois)',
      'Envoi automatique au bon moment : check-in, offre flash, notification urgente, 0 appel téléphonique',
      'SMS bidirectionnel : le client répond directement et vous le voyez dans votre dashboard'
    ],
    stats: [
      { value: '90', label: 'des SMS remis (12 derniers mois, tous nos hôtels)', suffix: '%' },
      { value: '2', label: 'sens : le client répond, vous lisez la réponse', suffix: '' },
      { value: '0', label: 'appel téléphonique nécessaire', suffix: '' },
    ],
    journey: [
      { label: 'Réservation', description: 'Confirmation rapide', active: false },
      { label: 'Pré-séjour', description: 'Rappel check-in', active: true },
      { label: 'Arrivée', description: 'Code WiFi + chambre', active: true },
      { label: 'Séjour', description: 'Offres flash', active: true },
      { label: 'Départ', description: 'Rappel check-out', active: true },
      { label: 'Post-séjour', description: 'Remerciement', active: false },
    ],
    features: [
      {
        title: 'Chaque SMS envoyé au moment parfait',
        description: 'Programmez vos SMS selon le fuseau horaire du client et les heures d\'envoi optimales. Pas de SMS à 3h du matin.',
        icon: Clock,
        bullets: ['Fuseau horaire automatique', 'Heures d\'envoi configurables', 'Programmation J-X avant arrivée'],
        mockup: 'SmsSendMockup',
      },
      {
        title: 'Chaque réponse client, centralisée dans un seul écran',
        description: 'Vos clients répondent par SMS et vous voyez tout dans votre dashboard. Historique, contexte, réservation, tout est là pour répondre sans chercher.',
        icon: MessageCircle,
        bullets: ['Réponses visibles dans le dashboard', 'Historique par client', 'Notification équipe en temps réel'],
        image: '/images/produit/sms/feature-sms-inbox.webp',
      },
      {
        title: 'RGPD intégré, zéro risque',
        description: 'Gestion automatique du consentement, du désabonnement et des plages horaires légales. Vous êtes conforme sans y penser.',
        icon: Shield,
        bullets: ['Consentement opt-in géré', 'Désabonnement en 1 clic', 'Plages horaires légales respectées'],
        mockup: 'SmsRgpdMockup',
      }
    ],
    useCases: [
      {
        title: 'SMS de bienvenue à l\'arrivée',
        description: 'Le client arrive à l\'hôtel. Il reçoit instantanément un SMS avec le code WiFi, le numéro de chambre et les horaires du restaurant. Pas d\'attente à la réception.',
        result: 'Moins d\'attente au comptoir'
      },
      {
        title: 'Rappel check-in la veille',
        description: 'J-1 : un SMS rappelle les horaires de check-in, l\'adresse exacte et propose le check-in en ligne. Le client arrive préparé.',
        result: 'Plus de clients enregistrés avant d\'arriver'
      },
      {
        title: 'Offre flash pendant le séjour',
        description: 'Il reste des places au spa cet après-midi ? Envoyez un SMS promo à vos clients en séjour.',
        result: 'Des chambres vides proposées au bon moment'
      },
      {
        title: 'Notification urgente',
        description: 'Changement de chambre, problème technique, événement météo : prévenez vos clients instantanément.',
        result: 'Les clients prévenus en temps réel'
      }
    ],
    testimonial: {
      quote: 'Le SMS a changé notre communication client. Nos clients ont toutes les infos avant même d\'arriver.',
      author: 'Thomas Moreau',
      role: 'Directeur des opérations',
      hotel: 'Le Domaine des Pins ***',
      metric: '98% de taux de lecture'
    },
    integrations: ['Thaïs PMS', 'Misterbooking', 'Medialog', 'Opera Cloud', 'Mews', 'Asterio', 'Lean PMS', 'Apaleo'],
    faq: [
      {
        question: 'Combien coûte l\'envoi d\'un SMS ?',
        answer: 'Le coût dépend du volume et du pays de destination. En France, comptez environ 0.04€ par SMS. Les SMS sont inclus dans votre forfait TriggerFlow selon votre plan.'
      },
      {
        question: 'Les clients peuvent-ils répondre au SMS ?',
        answer: 'Oui. TriggerFlow propose le SMS bidirectionnel. Les réponses arrivent directement dans votre dashboard et vous pouvez y répondre sans téléphone dédié.'
      },
      {
        question: 'Est-ce que c\'est conforme au RGPD ?',
        answer: 'Absolument. TriggerFlow gère automatiquement le consentement, le désabonnement et respecte les plages horaires légales d\'envoi (pas de SMS avant 8h ni après 20h).'
      },
      {
        question: 'Puis-je personnaliser le contenu des SMS ?',
        answer: 'Oui. Vous utilisez les mêmes variables dynamiques que pour les emails : prénom, date d\'arrivée, numéro de chambre, etc. Chaque SMS est personnalisé automatiquement.'
      },
    ],
    ctaTitle: 'Envoyez votre premier SMS automatisé',
    ctaSubtitle: 'Démo personnalisée avec votre cas d\'usage. Résultats visibles dès le premier jour.',
    relatedModules: ['email', 'whatsapp', 'automatisations']
  },

  whatsapp: {
    slug: 'whatsapp',
    icon: MessageCircle,
    title: 'WhatsApp',
    seoTitle: 'WhatsApp Business hôtel : conciergerie & automatisation',
    headline: 'Le canal préféré de vos clients, enfin professionnel',
    description: 'WhatsApp Business intégré à votre hôtel : messages automatisés, conciergerie digitale et conversation fluide. Vos clients adorent, votre équipe gagne du temps.',
    mockup: 'WhatsAppHeroMockup',
    painPoints: [
      'Vos clients envoient des WhatsApp au téléphone perso du réceptionniste, aucune traçabilité',
      'Vous ratez des demandes client car WhatsApp n\'est pas centralisé avec vos autres canaux',
      'Les questions répétitives (WiFi, parking, horaires) prennent un temps fou à répondre manuellement'
    ],
    benefits: [
      'Toutes les conversations WhatsApp centralisées dans un dashboard professionnel, fini le téléphone perso',
      'Chatbot automatique pour les questions fréquentes : WiFi, horaires, parking, réponse automatique',
      'Historique complet par client : WhatsApp + email + SMS dans une seule vue'
    ],
    stats: [
      { value: '2', label: 'milliards d\'utilisateurs WhatsApp', suffix: 'Mds' },
      { value: '84', label: 'des messages remis sont lus (12 derniers mois, tous nos hôtels)', suffix: '%' },
      { value: '1', label: 'boîte de réception partagée avec vos autres canaux', suffix: '' },
      { value: '24', label: 'l\'assistant IA répond aux questions fréquentes', suffix: '/7' },
    ],
    journey: [
      { label: 'Réservation', description: 'Confirmation WhatsApp', active: true },
      { label: 'Pré-séjour', description: 'Check-in en ligne', active: true },
      { label: 'Arrivée', description: 'Bienvenue + infos', active: true },
      { label: 'Séjour', description: 'Conciergerie digitale', active: true },
      { label: 'Départ', description: 'Remerciement', active: false },
      { label: 'Post-séjour', description: 'Offres de retour', active: true },
    ],
    features: [
      {
        title: 'Un concierge digital disponible 24h/24',
        description: 'Le chatbot répond instantanément aux questions fréquentes : code WiFi, horaires piscine, restaurant à proximité. Votre équipe ne gère que les demandes complexes.',
        icon: Bot,
        bullets: ['Réponses instantanées 24h/24', 'Questions fréquentes automatisées', 'Escalade vers un humain si besoin'],
        image: '/images/produit/whatsapp/feature-whatsapp-history.webp',
      },
      {
        title: 'Messages automatisés approuvés par WhatsApp',
        description: 'Confirmations, rappels, offres : utilisez des templates WhatsApp pré-approuvés pour vos messages transactionnels. Conformes aux règles Meta.',
        icon: Zap,
        bullets: ['Templates pré-approuvés Meta', 'Variables dynamiques', 'Multi-langue automatique'],
        mockup: 'WhatsAppTemplateMockup',
      },
      {
        title: 'Tout l\'historique dans une seule vue',
        description: 'Email, SMS, WhatsApp : chaque conversation client est regroupée. L\'équipe de nuit voit ce que l\'équipe de jour a échangé.',
        icon: Inbox,
        bullets: ['Historique unifié multi-canal', 'Handover entre équipes', 'Notes internes par conversation'],
        image: '/images/produit/whatsapp/feature-whatsapp-history.webp',
      }
    ],
    useCases: [
      {
        title: 'Conciergerie digitale',
        description: 'Le client envoie "spa demain 14h" sur WhatsApp. Le chatbot comprend, vérifie la disponibilité et propose un créneau. Réservation confirmée sans intervention de l\'équipe.',
        result: 'Des services réservés par simple message'
      },
      {
        title: 'Check-in en ligne',
        description: 'J-2 : le client reçoit un WhatsApp avec un lien vers le formulaire de pré-check-in. Il arrive, sa clé est prête. Zéro file d\'attente.',
        result: 'Le check-in préparé avant l\'arrivée'
      },
      {
        title: 'Service client instantané',
        description: 'Le client a besoin d\'une serviette supplémentaire ? Un WhatsApp et c\'est réglé. Pas besoin d\'appeler la réception ni de se déplacer.',
        result: 'Demande réglée sans passer par la réception'
      },
      {
        title: 'Upsell conversationnel',
        description: 'Pendant le séjour, proposez un surclassement ou un dîner spécial de manière naturelle dans la conversation. Le client répond "oui" et c\'est fait.',
        result: 'Des offres envoyées sur le canal que le client lit'
      }
    ],
    testimonial: {
      quote: 'WhatsApp a remplacé 70% de nos appels téléphoniques. Nos clients préfèrent écrire, et notre équipe gère 3x plus de demandes en même temps.',
      author: 'Claire Fontaine',
      role: 'Responsable Accueil',
      hotel: 'Hôtel Le Rivage ****',
      metric: '-70% d\'appels téléphoniques'
    },
    integrations: ['Thaïs PMS', 'Misterbooking', 'Medialog', 'Opera Cloud', 'Mews', 'Asterio', 'Lean PMS', 'Apaleo'],
    faq: [
      {
        question: 'Faut-il un numéro WhatsApp Business dédié ?',
        answer: 'Oui. TriggerFlow vous accompagne pour créer votre compte WhatsApp Business API avec un numéro dédié à votre hôtel.'
      },
      {
        question: 'Le chatbot peut-il gérer plusieurs langues ?',
        answer: 'Oui. Le chatbot détecte automatiquement la langue du client et répond dans la même langue. Français, anglais, espagnol, allemand, italien sont supportés nativement.'
      },
      {
        question: 'Combien coûtent les messages WhatsApp ?',
        answer: 'WhatsApp facture par conversation (fenêtre de 24h). Les messages initiés par le client sont gratuits pendant 24h. Les messages marketing suivent la grille tarifaire Meta, incluse dans votre forfait.'
      },
      {
        question: 'Peut-on envoyer des images et documents ?',
        answer: 'Oui. Vous pouvez envoyer des photos, PDF (facture, plan d\'accès), liens et même des boutons interactifs pour faciliter la réponse du client.'
      },
    ],
    ctaTitle: 'Activez WhatsApp Business pour votre hôtel',
    ctaSubtitle: 'Nous configurons votre compte WhatsApp Business avec vous, puis vos premiers messages automatisés.',
    relatedModules: ['sms', 'email', 'hub-messagerie']
  },

  newsletter: {
    slug: 'newsletter',
    icon: Newspaper,
    title: 'Newsletter',
    seoTitle: 'Newsletter hôtelier : fidélisation & réservations directes',
    headline: 'Vos anciens clients réservent à nouveau en direct',
    description: 'Newsletters et campagnes ciblées pour garder le contact avec vos anciens clients et générer des réservations directes. Moins de commissions OTA, plus de marge.',
    mockup: 'CampaignMockup',
    heroImage: '/images/produit/newsletter/hero-newsletter.webp',
    painPoints: [
      'Vos anciens clients réservent sur Booking au lieu de revenir en direct, vous payez 15-25% de commission',
      'Créer une newsletter vous prend une journée entière entre le contenu, le design et l\'envoi',
      'Vous envoyez la même newsletter à tout le monde, les familles reçoivent les offres business'
    ],
    benefits: [
      'Restez dans l\'esprit de vos clients : ils pensent à vous quand ils planifient leurs vacances, pas à Booking',
      'Éditeur drag & drop : créez une newsletter professionnelle sans graphiste',
      'Segmentation automatique : les familles reçoivent les offres famille, les couples les offres romantiques'
    ],
    stats: [
      { value: '35', label: 'd\'ouverture des e-mails, hors relais OTA (12 derniers mois)', suffix: '%' },
      { value: '1', label: 'segment par campagne, ciblé sur l\'historique', suffix: '' },
      { value: '0', label: 'commission sur réservation directe', suffix: '€' },
    ],
    journey: [
      { label: 'Réservation', description: 'Inscription auto', active: false },
      { label: 'Pré-séjour', description: 'Newsletter locale', active: false },
      { label: 'Arrivée', description: 'Pas d\'envoi', active: false },
      { label: 'Séjour', description: 'Pas d\'envoi', active: false },
      { label: 'Départ', description: 'Pas d\'envoi', active: false },
      { label: 'Post-séjour', description: 'Campagnes fidélisation', active: true },
    ],
    features: [
      {
        title: 'Des newsletters dignes d\'un magazine, sans graphiste',
        description: 'Éditeur drag & drop avec des blocs pensés pour l\'hôtellerie : hébergement, offre spéciale, événement local, témoignage client.',
        icon: Palette,
        bullets: ['Blocs spécialisés hôtellerie', 'Bibliothèque d\'images intégrée', 'Preview mobile avant envoi'],
        mockup: 'NewsletterEditorMockup',
        image: '/images/produit/newsletter/nl-editor.webp',
      },
      {
        title: 'Envoyez le bon message au bon segment',
        description: 'Ciblez automatiquement par type de séjour, période de dernière visite, montant dépensé, langue. Chaque client reçoit ce qui l\'intéresse.',
        icon: Users,
        bullets: ['Segments dynamiques automatiques', 'Filtres combinables', 'Exclusion des clients récents'],
        mockup: 'NewsletterSegmentMockup',
        image: '/images/produit/newsletter/nl-segment.webp',
      },
      {
        title: 'Programmez et oubliez',
        description: 'Créez des séquences automatiques : newsletter mensuelle, offre anniversaire, relance 6 mois sans visite. TriggerFlow gère le calendrier.',
        icon: Calendar,
        bullets: ['Séquences automatiques', 'Calendrier éditorial intégré', 'A/B testing objet et contenu'],
        mockup: 'NewsletterScheduleMockup',
        image: '/images/produit/newsletter/nl-schedule.webp',
      },
      {
        title: 'Mesurez chaque campagne, optimisez en continu',
        description: 'Taux d\'ouverture, clics, désabonnements, revenus générés, suivez les performances de chaque newsletter en temps réel. Identifiez ce qui fonctionne et ajustez.',
        icon: BarChart,
        bullets: ['Dashboard analytics en temps réel', 'Revenus attribués par campagne', 'Comparaison entre campagnes'],
        mockup: 'EmailAnalyticsMockup',
        image: '/images/produit/email/email-analytics.webp',
      }
    ],
    useCases: [
      {
        title: 'Newsletter mensuelle',
        description: 'Chaque mois, vos anciens clients reçoivent les actualités de votre hôtel et de la région : événements, nouveau restaurant, rénovation. Vous restez dans leur esprit.',
        result: 'Une newsletter que vos clients reconnaissent'
      },
      {
        title: 'Offres saisonnières ciblées',
        description: 'Été : offre famille avec kids club aux familles. Noël : offre romantique aux couples. Saint-Valentin : spa duo. Chaque segment reçoit son offre.',
        result: 'Des offres envoyées au bon segment'
      },
      {
        title: 'Relance clients dormants',
        description: 'Un client n\'est pas revenu depuis 6 mois ? Envoi automatique d\'une offre spéciale "Vous nous manquez" avec un code promo personnalisé.',
        result: 'Les clients dormants relancés automatiquement'
      },
      {
        title: 'Anniversaire de séjour',
        description: '1 an après leur séjour, vos clients reçoivent un email souvenir avec une offre de retour exclusive. La nostalgie fait le reste.',
        result: 'Des réservations directes, sans commission'
      }
    ],
    testimonial: {
      quote: 'Nos newsletters génèrent maintenant 8% de nos réservations directes. C\'est du chiffre d\'affaires sans commission OTA - c\'est énorme pour notre marge.',
      author: 'Jean-Marc Dufour',
      role: 'Directeur Commercial',
      hotel: 'Les Jardins de Provence ****',
      metric: '8% de réservations directes via newsletter'
    },
    integrations: ['Thaïs PMS', 'Misterbooking', 'Medialog', 'Opera Cloud', 'Mews', 'Asterio', 'Lean PMS', 'Apaleo'],
    faq: [
      {
        question: 'Combien de contacts puis-je avoir dans ma base ?',
        answer: 'Il n\'y a pas de limite de contacts. Votre base grandit automatiquement avec chaque nouvelle réservation. Les plans varient selon le volume d\'envoi mensuel.'
      },
      {
        question: 'Puis-je importer ma base client existante ?',
        answer: 'Oui. Import CSV en un clic, ou synchronisation automatique depuis votre PMS. Les doublons sont détectés et fusionnés automatiquement.'
      },
      {
        question: 'Comment fonctionne la segmentation ?',
        answer: 'TriggerFlow crée automatiquement des segments basés sur les données PMS : type de séjour, montant dépensé, fréquence, langue, date de dernière visite. Vous pouvez aussi créer vos propres segments.'
      },
      {
        question: 'Est-ce conforme au RGPD ?',
        answer: 'Oui. Gestion automatique du consentement, lien de désabonnement dans chaque email, et suppression des données sur demande. Vous êtes conforme sans effort.'
      },
    ],
    ctaTitle: 'Créez votre première newsletter',
    ctaSubtitle: 'On vous montre comment transformer vos anciens clients en réservations directes.',
    relatedModules: ['email', 'fidelite', 'automatisations']
  },

  fidelite: {
    slug: 'fidelite',
    icon: Gift,
    title: 'Programme de fidélité',
    seoTitle: 'Programme fidélité hôtel : réservations directes',
    headline: 'Vos clients reviennent en direct, pas via Booking',
    description: 'Programme de fidélité clé en main pour récompenser vos meilleurs clients et les faire réserver directement. Moins de commissions OTA, plus de marge.',
    mockup: 'CRMMockup',
    heroImage: '/images/produit/fidelite/fid-points.webp',
    painPoints: [
      'Vos clients satisfaits réservent quand même via Booking la fois suivante, vous repayez 15-25% de commission',
      'Mettre en place un programme fidélité semble complexe et chronophage, vous n\'avez pas de développeur',
      'Vous ne savez pas quels clients reviennent et lesquels sont perdus, aucune visibilité'
    ],
    benefits: [
      'Points, paliers et récompenses configurés en quelques clics',
      'Les clients cumulent des points automatiquement à chaque séjour, zéro gestion manuelle',
      'Vos clients fidèles réservent en direct pour conserver leurs points, fini les commissions OTA sur vos meilleurs clients'
    ],
    stats: [
      { value: '0', label: 'commission sur les réservations directes', suffix: '€' },
      { value: '1', label: 'profil client unique, tous séjours confondus', suffix: '' },
      { value: '0', label: 'compétence technique requise', suffix: '' },
    ],
    journey: [
      { label: 'Réservation', description: 'Points crédités', active: true },
      { label: 'Pré-séjour', description: 'Avantages rappelés', active: true },
      { label: 'Arrivée', description: 'Accueil VIP', active: true },
      { label: 'Séjour', description: 'Points extras', active: true },
      { label: 'Départ', description: 'Bilan points', active: true },
      { label: 'Post-séjour', description: 'Offre de retour', active: true },
    ],
    features: [
      {
        title: 'Un programme fidélité qui tourne tout seul',
        description: 'Les points sont crédités automatiquement à chaque séjour et dépense. Les paliers se débloquent sans intervention. Vous n\'avez rien à gérer.',
        icon: Star,
        bullets: ['Points auto par séjour et dépense', 'Paliers Bronze / Silver / Gold', 'Expiration configurable'],
        mockup: 'LoyaltyPointsMockup',
        image: '/images/produit/fidelite/fid-portail.webp',
      },
      {
        title: 'Vos récompenses, vos règles',
        description: 'Nuit gratuite, surclassement, late checkout, bouteille de champagne... Définissez les récompenses qui correspondent à votre hôtel.',
        icon: Gift,
        bullets: ['Récompenses personnalisables', 'Catalogue par palier', 'Récompenses surprise possibles'],
        mockup: 'LoyaltyRewardsMockup',
        image: '/images/produit/fidelite/fid-recompenses.webp',
      },
      {
        title: 'Vos clients suivent leurs points en ligne',
        description: 'Espace client dédié où vos clients voient leur solde de points, leur statut et les récompenses disponibles. Un vrai programme professionnel.',
        icon: User,
        bullets: ['Espace client en ligne', 'Historique des points', 'Récompenses réclamables en 1 clic'],
        image: '/images/produit/fidelite/fid-points.webp',
        mockup: 'LoyaltyPortalMockup',
      }
    ],
    useCases: [
      {
        title: 'Points automatiques par séjour',
        description: 'Le client check-out. Ses points sont automatiquement crédités : 1€ dépensé = 1 point. Il reçoit un email avec son nouveau solde et les récompenses proches.',
        result: 'Plus de séjours réservés en direct'
      },
      {
        title: 'Statuts VIP avec avantages',
        description: 'À 500 points, le client passe Gold. Il bénéficie automatiquement du late checkout gratuit et d\'un surclassement quand disponible. L\'équipe est notifiée.',
        result: 'Vos meilleurs clients reconnus à chaque séjour'
      },
      {
        title: 'Programme de parrainage',
        description: 'Le client partage son code parrain. Son filleul réserve et ils reçoivent tous les deux des points bonus. Le bouche-à-oreille digital.',
        result: 'De nouveaux clients amenés par les fidèles'
      },
      {
        title: 'Offre de retour personnalisée',
        description: '3 mois sans visite : le client fidèle reçoit une offre exclusive "Vos 200 points vous attendent". Il réserve en direct pour ne pas les perdre.',
        result: 'Les clients inactifs relancés au bon moment'
      }
    ],
    testimonial: {
      quote: 'Depuis le programme fidélité, 24% de nos réservations sont en direct. Sur un an, c\'est plus de 30 000€ de commissions OTA économisées.',
      author: 'Isabelle Renard',
      role: 'Directrice Générale',
      hotel: 'Le Mas des Oliviers ****',
      metric: '30 000€ de commissions économisées/an'
    },
    integrations: ['Thaïs PMS', 'Misterbooking', 'Medialog', 'Opera Cloud', 'Mews', 'Asterio', 'Lean PMS', 'Apaleo'],
    faq: [
      {
        question: 'Combien de temps faut-il pour mettre en place le programme ?',
        answer: 'Notre équipe le met en place avec vous : vous configurez les paliers, les points par euro et les récompenses. TriggerFlow s\'occupe du reste.'
      },
      {
        question: 'Les clients doivent-ils créer un compte ?',
        answer: 'Non. Les clients sont automatiquement inscrits lors de leur première réservation. Ils reçoivent un email avec leur espace fidélité et peuvent suivre leurs points en ligne.'
      },
      {
        question: 'Peut-on personnaliser les paliers et récompenses ?',
        answer: 'Oui, totalement. Vous définissez le nombre de paliers, les seuils de points, et les récompenses associées. Nuit gratuite, upgrade, spa offert, c\'est vous qui décidez.'
      },
      {
        question: 'Comment ça se connecte à mon PMS ?',
        answer: 'TriggerFlow synchronise automatiquement les séjours et dépenses depuis votre PMS. Les points sont crédités sans action manuelle.'
      },
    ],
    ctaTitle: 'Lancez votre programme fidélité dès demain',
    ctaSubtitle: 'Paliers, points et récompenses configurés avec vous. TriggerFlow s\'occupe du reste.',
    relatedModules: ['crm', 'newsletter', 'email']
  },

  automatisations: {
    slug: 'automatisations',
    icon: Zap,
    title: 'Automatisations',
    seoTitle: 'Automatisation hôtelière : workflows sans code',
    headline: 'Votre hôtel tourne en pilote automatique',
    description: 'Un builder intuitif, zéro code. Déclencheur, conditions, actions - vous dessinez le workflow en quelques clics, TriggerFlow l\'exécute 24h/24.',
    mockup: 'WorkflowBuilderMockup',
    heroImage: '/images/produit/automatisations/hero-automatisations.webp',
    painPoints: [
      'Votre équipe répète les mêmes tâches 50 fois par jour : envoyer un email, vérifier un check-in, rappeler un client',
      'Des actions importantes sont oubliées quand c\'est le rush, la demande de chambre avec berceau passe à la trappe',
      'Vous aimeriez être proactif (offres, rappels, suivi) mais le quotidien ne laisse pas le temps'
    ],
    benefits: [
      'Automatisez n\'importe quel scénario : de la simple confirmation à la séquence pré-séjour en 5 étapes',
      'Interface intuitive : glissez-déposez des blocs, ajoutez des conditions, et c\'est en production, sans aucune compétence technique',
      'TriggerFlow exécute vos workflows 24h/24, week-ends et jours fériés inclus, jamais de tâche oubliée'
    ],
    stats: [
      { value: '12', label: 'PMS connectés, plus serrures, paiement, Zapier et n8n', suffix: '' },
      { value: '0', label: 'compétence technique requise', suffix: '' },
      { value: '24', label: 'heures sur 24 de fonctionnement', suffix: '/7' },
    ],
    journey: [
      { label: 'Réservation', description: 'Confirmation auto', active: true },
      { label: 'Pré-séjour', description: 'Séquence J-7/J-3/J-1', active: true },
      { label: 'Arrivée', description: 'Bienvenue auto', active: true },
      { label: 'Séjour', description: 'Upsell + suivi', active: true },
      { label: 'Départ', description: 'Remerciement + avis', active: true },
      { label: 'Post-séjour', description: 'Relance + fidélisation', active: true },
    ],
    features: [
      {
        title: 'Un builder intuitif, zéro ligne de code',
        description: 'Glissez-déposez des blocs dans le builder visuel : déclencheur, délai, condition, action. Prise en main immédiate, même sans profil technique.',
        icon: Workflow,
        bullets: ['Drag & drop intuitif', 'Templates prêts à l\'emploi', 'Duplication et modification'],
        image: '/images/produit/automatisations/hero-automatisations.webp',
      },
      {
        title: 'Tout peut déclencher un workflow',
        description: 'Nouvelle réservation, check-in, check-out, date spécifique, comportement client, score de satisfaction... Vous choisissez le déclencheur.',
        icon: Play,
        bullets: ['15+ types de déclencheurs', 'Combinaison de conditions', 'Déclencheurs temporels (J-X, J+X)'],
        mockup: 'WorkflowTriggersMockup',
      },
      {
        title: 'Votre hôtel est unique, vos automatisations aussi',
        description: 'Couple → offre spa. Famille → kids club. VIP → surclassement. Chaque profil client déclenche le bon scénario, automatiquement.',
        icon: GitBranch,
        bullets: ['Conditions Si/Sinon illimitées', 'Branches parallèles', 'Délais configurables entre étapes'],
        image: '/images/produit/automatisations/feature-conditions.webp',
      }
    ],
    useCases: [
      {
        title: 'Séquence pré-séjour complète',
        description: 'J-7 : email de bienvenue avec infos pratiques. J-3 : SMS rappel check-in + offre surclassement. J-1 : WhatsApp avec code WiFi et plan. Tout est automatique.',
        result: 'Des extras vendus avant l\'arrivée, sans la réception'
      },
      {
        title: 'Upsell intelligent',
        description: 'Le client est en chambre supérieure et c\'est un couple ? TriggerFlow envoie automatiquement l\'offre pack romantique à J-2. Budget > 200€/nuit ? Offre spa premium.',
        result: 'Des services proposés à chaque séjour'
      },
      {
        title: 'Relance avis intelligente',
        description: 'J+1 après le départ : enquête interne puis demande d\'avis Google. Si la note est < 3/5, alerte manager pour traitement prioritaire.',
        result: 'Une demande d\'avis après chaque séjour réussi'
      },
      {
        title: 'Anniversaire client automatique',
        description: 'Le jour de l\'anniversaire du client (ou de l\'anniversaire de son premier séjour), envoi d\'un email + offre spéciale. Zéro action manuelle.',
        result: 'Une relance qui part toute seule'
      }
    ],
    testimonial: {
      quote: 'On a automatisé toute notre communication pré-séjour en une après-midi. Ça nous libère 15 heures par semaine pour nous concentrer sur l\'accueil.',
      author: 'Marc Lefèvre',
      role: 'Responsable Réception',
      hotel: 'Grand Hôtel des Thermes ****',
      metric: '15h/semaine économisées'
    },
    integrations: ['Thaïs PMS', 'Misterbooking', 'Medialog', 'Opera Cloud', 'Mews', 'Asterio', 'Lean PMS', 'Apaleo'],
    faq: [
      {
        question: 'Faut-il des compétences techniques pour créer un workflow ?',
        answer: 'Non. L\'interface est intuitive et 100% visuelle. Vous glissez-déposez des blocs et configurez les paramètres avec des menus déroulants. Aucune ligne de code.'
      },
      {
        question: 'Combien de workflows puis-je créer ?',
        answer: 'Il n\'y a pas de limite sur le nombre de workflows. Créez autant de scénarios que nécessaire. Chaque workflow peut être activé/désactivé en un clic.'
      },
      {
        question: 'Que se passe-t-il si un workflow échoue ?',
        answer: 'TriggerFlow vous alerte en temps réel si un envoi échoue (email rebondi, SMS non livré). Vous pouvez configurer des actions de secours automatiques.'
      },
      {
        question: 'Puis-je tester un workflow avant de le mettre en production ?',
        answer: 'Oui. Le mode test vous permet de simuler un workflow avec un client fictif. Vous voyez chaque étape s\'exécuter avant de le mettre en production.'
      },
    ],
    ctaTitle: 'Créez votre premier workflow',
    ctaSubtitle: 'Builder visuel, templates prêts à l\'emploi. Votre hôtel tourne tout seul.',
    relatedModules: ['email', 'sms', 'paiements']
  },

  crm: {
    slug: 'crm',
    icon: Users,
    title: 'CRM',
    seoTitle: 'CRM hôtelier : gestion relation client 360°',
    headline: 'Chaque client est reconnu dès son arrivée',
    description: 'Base clients unifiée avec historique complet : séjours, préférences, communications, dépenses. La réception sait tout avant que le client ne parle.',
    mockup: 'CRMMockup',
    heroImage: '/images/produit/crm/hero-crm.webp',
    painPoints: [
      'Les infos clients sont éparpillées entre le PMS, les emails, les post-it, personne n\'a la vue complète',
      'Un client fidèle arrive et le réceptionniste ne le reconnaît pas, expérience décevante',
      'Vous ne pouvez pas segmenter vos clients pour cibler vos communications, tout le monde reçoit tout'
    ],
    benefits: [
      'Vue 360° de chaque client en un clic : séjours passés, préférences, dépenses, communications, score de satisfaction',
      'Synchronisation automatique avec votre PMS - les fiches clients sont toujours à jour, sans saisie manuelle',
      'Segmentation puissante : ciblez par comportement, historique, montant dépensé, et personnalisez chaque interaction'
    ],
    stats: [
      { value: '360', label: 'vue complète de chaque client', suffix: '°' },
      { value: '0', label: 'saisie manuelle nécessaire', suffix: '' },
      { value: '12', label: 'PMS connectés, plus serrures, paiement, Zapier et n8n', suffix: '' },
      { value: '1', label: 'profil par client, tous canaux confondus', suffix: '' },
    ],
    journey: [
      { label: 'Réservation', description: 'Fiche créée auto', active: true },
      { label: 'Pré-séjour', description: 'Préférences visibles', active: true },
      { label: 'Arrivée', description: 'Accueil personnalisé', active: true },
      { label: 'Séjour', description: 'Suivi interactions', active: true },
      { label: 'Départ', description: 'Bilan séjour', active: true },
      { label: 'Post-séjour', description: 'Historique enrichi', active: true },
    ],
    features: [
      {
        title: 'Tout savoir sur chaque client en un clic',
        description: 'Coordonnées, historique des séjours, préférences (oreiller, étage, régime), dépenses totales, score de satisfaction. Chaque collaborateur a l\'info.',
        icon: User,
        bullets: ['Fiche client complète', 'Préférences et habitudes', 'Score de satisfaction NPS'],
        mockup: 'CrmClientCardMockup',
        image: '/images/produit/crm/crm-fiche-client.webp',
      },
      {
        title: 'Votre PMS se synchronise tout seul',
        description: 'Les données de réservation, de séjour et de facturation sont importées automatiquement depuis votre PMS. Pas de double saisie, pas d\'erreur.',
        icon: RefreshCw,
        bullets: ['Synchro temps réel PMS', 'Détection des doublons', 'Historique sans limite de durée'],
        mockup: 'CrmPmsSyncMockup',
        image: '/images/produit/crm/crm-reservations.webp',
      },
      {
        title: 'Créez les segments qui comptent pour vous',
        description: 'Familles, couples, business, VIP, dormants... Créez vos propres tags et segments pour cibler vos emails, SMS et offres.',
        icon: Tag,
        bullets: ['Tags manuels et automatiques', 'Segments dynamiques', 'Combinaison de critères'],
        mockup: 'CrmSegmentsMockup',
        image: '/images/produit/crm/crm-segments.webp',
      }
    ],
    useCases: [
      {
        title: 'Accueil personnalisé VIP',
        description: 'M. Durand arrive pour son 5ème séjour. La réception voit : chambre préférée (vue mer, étage élevé), allergie gluten, dernière visite il y a 4 mois. L\'accueil est sur-mesure.',
        result: 'Chaque client fidèle reconnu dès l\'arrivée'
      },
      {
        title: 'Détection clients à risque',
        description: 'Un client habitué n\'est pas revenu depuis 8 mois. TriggerFlow le détecte automatiquement et déclenche une offre de réactivation personnalisée.',
        result: 'Les clients dormants identifiés et relancés'
      },
      {
        title: 'Segmentation marketing avancée',
        description: 'Envoyez l\'offre spa aux couples ayant dépensé > 300€, l\'offre kids club aux familles, et l\'offre business aux voyageurs solo en semaine. Chaque message est pertinent.',
        result: 'Des messages ciblés plutôt qu\'un envoi en masse'
      },
      {
        title: 'Identification clients fidèles',
        description: 'TriggerFlow calcule automatiquement le Lifetime Value de chaque client. Vos meilleurs clients sont identifiés et reçoivent un traitement VIP.',
        result: 'Vos meilleurs clients identifiés'
      }
    ],
    testimonial: {
      quote: 'Avant TriggerFlow, on ne savait pas que M. Martin était venu 12 fois. Maintenant, chaque client fidèle est accueilli par son nom avec ses préférences prêtes.',
      author: 'Anne-Marie Petit',
      role: 'Responsable Réception',
      hotel: 'Hôtel de la Plage ***',
      metric: '+40% de satisfaction'
    },
    integrations: ['Thaïs PMS', 'Misterbooking', 'Medialog', 'Opera Cloud', 'Mews', 'Asterio', 'Lean PMS', 'Apaleo'],
    faq: [
      {
        question: 'Les données sont-elles sécurisées ?',
        answer: 'Oui. Données hébergées en Europe (RGPD), chiffrées en transit et au repos, accès restreint par rôle. Conforme aux normes les plus strictes.'
      },
      {
        question: 'Comment se fait la synchronisation avec mon PMS ?',
        answer: 'L\'intégration se configure sans développeur. Les données de réservation, séjour et facturation sont synchronisées automatiquement en temps réel.'
      },
      {
        question: 'Puis-je importer mes données clients existantes ?',
        answer: 'Oui. Import CSV en un clic ou synchronisation depuis votre PMS. Les doublons sont automatiquement détectés et fusionnés.'
      },
      {
        question: 'Combien de fiches client puis-je avoir ?',
        answer: 'Il n\'y a pas de limite. Votre base CRM grandit automatiquement avec chaque nouvelle réservation. L\'historique est conservé sans limite de durée.'
      },
    ],
    ctaTitle: 'Connaissez enfin vos clients par cœur',
    ctaSubtitle: 'CRM synchronisé avec votre PMS. Fiche client 360° dès la première synchronisation.',
    relatedModules: ['automatisations', 'paiements', 'email']
  },

  formulaires: {
    slug: 'formulaires',
    icon: FileText,
    title: 'Formulaires',
    seoTitle: 'Formulaire pré check-in hôtel & enquêtes satisfaction',
    headline: 'Créez le formulaire exact dont vous avez besoin',
    description: 'Formulaires de pré-check-in, enquêtes de satisfaction, demandes spéciales. Envoyés automatiquement, analysés en temps réel.',
    mockup: 'EmailMockup',
    heroImage: '/images/produit/formulaires/hero-formulaires.webp',
    painPoints: [
      'Le check-in prend 8 minutes par client, la file d\'attente s\'allonge aux heures de pointe',
      'Vous découvrez les préférences du client (allergie, berceau, étage) quand il est déjà à la réception',
      'Les enquêtes de satisfaction papier finissent à la poubelle, vous ne savez pas ce que pensent vos clients'
    ],
    benefits: [
      'Check-in plus court : le client a déjà rempli identité, heure d\'arrivée et préférences en ligne',
      'Préférences collectées avant l\'arrivée : chambre, oreiller, régime alimentaire - tout est prêt quand le client arrive',
      'NPS et satisfaction analysés en temps réel : vous identifiez les problèmes avant qu\'ils deviennent des avis négatifs'
    ],
    stats: [
      { value: '1', label: 'lien envoyé automatiquement avant l\'arrivée', suffix: '' },
      { value: '0', label: 'papier à remplir au comptoir', suffix: '' },
      { value: '0', label: 'ligne de code pour créer un formulaire', suffix: '' },
    ],
    journey: [
      { label: 'Réservation', description: 'Pré-check-in envoyé', active: true },
      { label: 'Pré-séjour', description: 'Préférences collectées', active: true },
      { label: 'Arrivée', description: 'Check-in express', active: true },
      { label: 'Séjour', description: 'Demandes de service', active: true },
      { label: 'Départ', description: 'Enquête satisfaction', active: true },
      { label: 'Post-séjour', description: 'NPS analysé', active: true },
    ],
    features: [
      {
        title: 'Des dizaines de widgets pour des formulaires sur mesure',
        description: 'Texte, email, téléphone, date, heure, signature, choix multiples, échelle de notation, upload photo, cases à cocher... Assemblez vos formulaires comme des Lego, sans écrire une ligne de code. Chaque widget est pensé pour l\'hôtellerie.',
        icon: PenTool,
        bullets: ['20+ types de champs disponibles', 'Drag & drop visuel', 'Multi-langue automatique (FR, EN, DE, ES...)'],
        mockup: 'FormBuilderMockup',
        image: '/images/produit/formulaires/form-widgets.webp',
      },
      {
        title: 'Chaque réponse synchronisable avec votre PMS',
        description: 'Email, nom, prénom, téléphone, heure d\'arrivée, fiche de police, motif de séjour, préférences chambre - les données collectées remontent automatiquement dans la fiche client de votre PMS. Zéro ressaisie, zéro erreur.',
        icon: RefreshCw,
        bullets: ['Sync automatique des champs vers le PMS', 'Fiche de police pré-remplie', 'Mise à jour CRM en temps réel'],
        mockup: 'FormAutoSendMockup',
        image: '/images/produit/formulaires/form-sync-pms.webp',
      },
      {
        title: 'Des stats avancées sur chaque formulaire',
        description: 'Taux de complétion, temps moyen de remplissage, NPS calculé automatiquement, répartition des réponses par question. Identifiez les points de friction et les tendances en un coup d\'œil.',
        icon: PieChart,
        bullets: ['NPS et scores calculés automatiquement', 'Taux de complétion par étape', 'Export CSV et rapports planifiés'],
        mockup: 'FormAnalysisMockup',
        image: '/images/produit/formulaires/form-stats.webp',
      },
      {
        title: 'Logique conditionnelle et alertes internes',
        description: 'Affichez des pages selon les réponses du client : un voyageur business voit les options de parking, une famille voit le Kids Club. Déclenchez des alertes internes sur certaines réponses (allergie, VIP, réclamation). Personnalisez le message de confirmation selon le profil.',
        icon: GitBranch,
        bullets: ['Pages et champs affichés sous conditions', 'Alertes internes par email ou Slack', 'Message de confirmation personnalisable'],
        mockup: 'FormBuilderMockup',
        image: '/images/produit/formulaires/form-conditions.webp',
      }
    ],
    useCases: [
      {
        title: 'Pré-check-in en ligne',
        description: 'J-3 : le client reçoit un formulaire avec identité, heure d\'arrivée, demandes spéciales. Il le remplit sur son téléphone. À l\'arrivée, sa clé est prête.',
        result: 'Un check-in plus court au comptoir'
      },
      {
        title: 'Enquête de satisfaction',
        description: 'J+1 après le départ : enquête courte (5 questions + NPS), suivie d\'une demande d\'avis Google. Les notes < 3/5 alertent le manager.',
        result: 'Des retours collectés à chaque départ'
      },
      {
        title: 'Collecte des préférences',
        description: 'Oreiller ferme ou moelleux ? Étage élevé ou bas ? Allergie alimentaire ? Collectez avant l\'arrivée et enrichissez la fiche CRM automatiquement.',
        result: 'Les problèmes repérés avant le départ'
      },
      {
        title: 'Demande de service en séjour',
        description: 'Le client scanne un QR code dans sa chambre pour réserver le spa, commander au room service ou signaler un problème. La demande arrive directement au bon service.',
        result: 'Les demandes de services centralisées'
      }
    ],
    testimonial: {
      quote: 'Le pré-check-in en ligne a tout changé. 75% des clients le remplissent, notre file d\'attente a disparu et les clients arrivent avec leurs préférences déjà enregistrées.',
      author: 'François Martin',
      role: 'Directeur des opérations',
      hotel: 'L\'Hôtel du Parc ****',
      metric: '75% de pré-check-in complétés'
    },
    integrations: ['Thaïs PMS', 'Misterbooking', 'Medialog', 'Opera Cloud', 'Mews', 'Asterio', 'Lean PMS', 'Apaleo'],
    faq: [
      {
        question: 'Les formulaires sont-ils adaptés au mobile ?',
        answer: 'Oui. Tous les formulaires sont responsive et optimisés pour le mobile, là où la plupart de vos clients les remplissent.'
      },
      {
        question: 'Les données collectées alimentent-elles le CRM ?',
        answer: 'Oui. Chaque réponse enrichit automatiquement la fiche client dans le CRM. Préférences, allergies, habitudes, tout est centralisé.'
      },
      {
        question: 'Peut-on créer des formulaires en plusieurs langues ?',
        answer: 'Oui. Le formulaire s\'affiche automatiquement dans la langue du client. Français, anglais, espagnol, allemand et italien sont supportés.'
      },
      {
        question: 'Comment le client accède-t-il au formulaire ?',
        answer: 'Par email, SMS, WhatsApp ou QR code. Le lien est unique et pré-rempli avec les infos de la réservation. Le client n\'a qu\'à compléter.'
      },
    ],
    ctaTitle: 'Digitalisez vos formulaires',
    ctaSubtitle: 'Pré-check-in, satisfaction, demandes de service. Tout en ligne, tout automatique.',
    relatedModules: ['automatisations', 'email', 'crm']
  },

  avis: {
    slug: 'avis',
    icon: Star,
    title: 'Gestion des avis',
    seoTitle: 'Gestion avis Google hôtel : collecte & réponse automatique',
    headline: 'Plus d\'avis positifs, moins d\'avis négatifs publics',
    description: 'Collectez des avis au bon moment, interceptez les mécontents avant qu\'ils ne postent, et répondez efficacement à chaque avis grâce à l\'IA.',
    mockup: 'ReviewHeroMockup',
    painPoints: [
      'Vos clients satisfaits ne laissent jamais d\'avis - seuls les mécontents prennent le temps de poster',
      'Un avis négatif reste sans réponse pendant des semaines, votre e-réputation en souffre',
      'Vous n\'avez aucune vue d\'ensemble : quelle est votre note moyenne ? Elle monte ou elle descend ?'
    ],
    benefits: [
      'Demande d\'avis automatique envoyée à chaque client au bon moment, vos bons clients postent enfin',
      'Les clients insatisfaits sont repérés : l\'enquête interne alerte le manager, qui peut rappeler le client',
      'Dashboard unifié avec votre note moyenne sur Google, TripAdvisor, Booking, évolution semaine par semaine'
    ],
    stats: [
      { value: '1', label: 'demande d\'avis après chaque séjour', suffix: '' },
      { value: '3', label: 'plateformes suivies : Google, TripAdvisor, Booking', suffix: '' },
      { value: '1', label: 'clic pour publier la réponse proposée par l\'IA', suffix: '' },
    ],
    journey: [
      { label: 'Réservation', description: 'Pas d\'envoi', active: false },
      { label: 'Pré-séjour', description: 'Pas d\'envoi', active: false },
      { label: 'Arrivée', description: 'Pas d\'envoi', active: false },
      { label: 'Séjour', description: 'Enquête interne', active: true },
      { label: 'Départ', description: 'Score de satisfaction', active: true },
      { label: 'Post-séjour', description: 'Demande d\'avis', active: true },
    ],
    features: [
      {
        title: 'Tout le monde est invité, les mécontents sont rappelés',
        description: 'Chaque client reçoit l\'enquête puis la demande d\'avis Google. Une note < 3/5 alerte le manager pour un traitement prioritaire.',
        icon: Send,
        bullets: ['Alerte par score de satisfaction', 'Redirection intelligente par plateforme', 'Rappel si avis non posté'],
        mockup: 'ReviewCollectMockup',
      },
      {
        title: 'Google, TripAdvisor, Booking - tout dans un dashboard',
        description: 'Suivez votre note moyenne, le volume d\'avis et l\'évolution dans le temps sur chaque plateforme. Comparez-vous à vos concurrents.',
        icon: Globe,
        bullets: ['Agrégation multi-plateformes', 'Évolution semaine par semaine', 'Benchmark concurrentiel'],
        mockup: 'ReviewDashboardMockup',
      },
      {
        title: 'L\'IA rédige un premier jet de vos réponses',
        description: 'Pour chaque avis, l\'IA analyse le contenu et suggère une réponse personnalisée. Vous validez ou modifiez, puis publiez en 1 clic.',
        icon: MessageSquare,
        bullets: ['Réponses personnalisées par IA', 'Ton adapté (positif ou empathique)', 'Publication en 1 clic'],
        mockup: 'ReviewAiResponseMockup',
      }
    ],
    useCases: [
      {
        title: 'Collecte proactive d\'avis',
        description: 'J+1 après le départ, le client reçoit un email avec un lien direct vers Google, au moment où le souvenir du séjour est encore frais.',
        result: 'Plus d\'avis Google, demandés au bon moment'
      },
      {
        title: 'Interception des mécontents',
        description: 'Score < 3/5 ? Le manager reçoit une alerte immédiate avec le détail du problème. Il contacte le client AVANT qu\'il ne poste un avis négatif public.',
        result: 'Les mécontents rappelés avant qu\'ils publient'
      },
      {
        title: 'Réponse rapide assistée IA',
        description: 'Un avis arrive sur Google. L\'IA lit le contenu, identifie les points clés et génère une réponse personnalisée. Vous relisez, ajustez et publiez.',
        result: 'Plus d\'avis laissé sans réponse'
      },
      {
        title: 'Suivi de réputation en continu',
        description: 'Votre note Google est passée de 4.2 à 4.5 ce mois-ci. Votre concurrent principal est à 4.3. Le dashboard vous montre l\'évolution et les tendances.',
        result: 'L\'évolution de votre note suivie mois après mois'
      }
    ],
    testimonial: {
      quote: 'En 3 mois, notre note Google est passée de 4.1 à 4.6. Le secret ? Demander au bon moment, aux bons clients. Et répondre vite grâce à l\'IA.',
      author: 'Nathalie Blanc',
      role: 'Directrice Marketing',
      hotel: 'Le Clos des Vignes ****',
      metric: 'De 4.1 à 4.6 sur Google en 3 mois'
    },
    integrations: ['Google', 'TripAdvisor', 'Booking.com', 'Airbnb', 'Thaïs PMS', 'Misterbooking', 'Opera Cloud', 'Mews'],
    faq: [
      {
        question: 'Comment TriggerFlow sait si le client est satisfait ?',
        answer: 'Grâce à l\'enquête de satisfaction envoyée automatiquement. Le score NPS ou la note sur 5 détermine si le client reçoit la demande d\'avis Google ou si le manager est alerté.'
      },
      {
        question: 'L\'IA peut-elle répondre aux avis automatiquement ?',
        answer: 'L\'IA suggère une réponse, mais vous gardez toujours le contrôle. Vous validez, modifiez si besoin, puis publiez en 1 clic. Pas de réponse automatique sans validation.'
      },
      {
        question: 'Sur quelles plateformes peut-on collecter des avis ?',
        answer: 'Google, TripAdvisor, Booking.com, et toute plateforme avec un lien direct. Vous choisissez vers quelle plateforme rediriger selon votre stratégie.'
      },
      {
        question: 'Peut-on voir les avis de nos concurrents ?',
        answer: 'Oui. Le module benchmark vous permet de suivre la note moyenne et le volume d\'avis de vos concurrents sur Google et TripAdvisor.'
      },
    ],
    ctaTitle: 'Passez de 4.1 à 4.5 sur Google en 3 mois',
    ctaSubtitle: 'Demande d\'avis intelligente + réponses IA. Votre réputation mérite mieux.',
    relatedModules: ['automatisations', 'email', 'formulaires']
  },

  analytics: {
    slug: 'analytics',
    icon: BarChart3,
    title: 'Analytics',
    seoTitle: 'Analytics hôtelier : reporting & performance',
    headline: 'Chaque décision appuyée par les données',
    description: 'Dashboard unifié pour suivre vos performances : emails, SMS, automatisations, satisfaction, revenus générés. Fini les suppositions.',
    mockup: 'AnalyticsHeroMockup',
    painPoints: [
      'Vous ne savez pas quels emails fonctionnent et lesquels finissent à la poubelle, vous envoyez à l\'aveugle',
      'Les données sont éparpillées entre 5 outils, impossible d\'avoir une vue d\'ensemble',
      'Votre direction vous demande un rapport mensuel et vous passez une demi-journée à le compiler'
    ],
    benefits: [
      'Tous vos KPIs sur un seul écran : emails, SMS, WhatsApp, automatisations, satisfaction, revenus générés',
      'Rapports automatiques envoyés chaque semaine par email, zéro compilation manuelle',
      'Identifiez en un coup d\'œil ce qui fonctionne et ce qu\'il faut optimiser'
    ],
    stats: [
      { value: '1', label: 'dashboard pour tout suivre', suffix: '' },
      { value: '0', label: 'rapport à compiler à la main', suffix: '' },
      { value: '3', label: 'canaux mesurés : e-mail, SMS, WhatsApp', suffix: '' },
    ],
    journey: [
      { label: 'Réservation', description: 'Volume suivi', active: true },
      { label: 'Pré-séjour', description: 'Taux ouverture', active: true },
      { label: 'Arrivée', description: 'Check-in mesuré', active: true },
      { label: 'Séjour', description: 'Upsell trackés', active: true },
      { label: 'Départ', description: 'NPS mesuré', active: true },
      { label: 'Post-séjour', description: 'Fidélisation suivie', active: true },
    ],
    features: [
      {
        title: 'Tous vos chiffres en un coup d\'œil',
        description: 'Dashboard temps réel avec vos KPIs clés : envois, ouvertures, clics, conversions, revenus générés, NPS. Personnalisable selon vos priorités.',
        icon: Activity,
        bullets: ['Dashboard personnalisable', 'Données temps réel', 'Widgets glissables'],
        mockup: 'AnalyticsDashboardMockup',
      },
      {
        title: 'Rapports qui s\'écrivent tout seuls',
        description: 'Chaque lundi, recevez un rapport avec les performances de la semaine. Chaque 1er du mois, le bilan mensuel. Prêt à envoyer à votre direction.',
        icon: FileText,
        bullets: ['Rapport hebdomadaire automatique', 'Rapport mensuel détaillé', 'Export PDF et Excel'],
        mockup: 'AnalyticsReportMockup',
      },
      {
        title: 'Comparez et optimisez',
        description: 'Ce mois-ci vs le mois dernier. Cet email vs le précédent. Ce workflow vs l\'autre. Les comparaisons vous montrent ce qui progresse.',
        icon: TrendingUp,
        bullets: ['Comparaison période par période', 'A/B testing des campagnes', 'Alertes anomalies'],
        mockup: 'AnalyticsCompareMockup',
      }
    ],
    useCases: [
      {
        title: 'Suivi performance email',
        description: 'Taux d\'ouverture et de clics de chaque email, pré-séjour comme post-séjour, côte à côte. Vous savez lequel optimiser en priorité.',
        result: 'Identification des emails à optimiser'
      },
      {
        title: 'ROI des automatisations',
        description: 'Le workflow "upsell spa" a généré 4 200€ ce mois-ci pour un coût de 12€ de SMS. Le workflow "offre restaurant" n\'a généré que 380€. Budget réalloué.',
        result: 'ROI mesuré par workflow'
      },
      {
        title: 'Évolution satisfaction client',
        description: 'Votre NPS est passé de 42 à 58 depuis l\'activation de la séquence pré-séjour. Corrélation directe visible dans le dashboard.',
        result: 'L\'effet de chaque séquence sur la satisfaction, visible'
      },
      {
        title: 'Rapport mensuel pour la direction',
        description: 'Le 1er du mois, le rapport arrive dans la boîte mail de votre directeur : envois, ouvertures, revenus générés, satisfaction. Zéro compilation manuelle.',
        result: 'Le rapport part seul, chaque mois'
      }
    ],
    testimonial: {
      quote: 'Avant, je passais un vendredi par mois à compiler des données. Maintenant, le rapport arrive tout seul le lundi matin. Et il est plus complet que ce que je faisais à la main.',
      author: 'Pierre Garnier',
      role: 'Revenue Manager',
      hotel: 'Hôtel & Spa Bellevue ****',
      metric: '4h/mois économisées'
    },
    integrations: ['Thaïs PMS', 'Misterbooking', 'Opera Cloud', 'Mews', 'Asterio', 'Google', 'TripAdvisor', 'Booking.com'],
    faq: [
      {
        question: 'Quelles métriques sont disponibles ?',
        answer: 'Emails (ouvertures, clics, rebonds), SMS (livraison, réponses), automatisations (exécutions, conversions), satisfaction (NPS, scores), revenus générés par canal et par workflow.'
      },
      {
        question: 'Puis-je personnaliser mon dashboard ?',
        answer: 'Oui. Ajoutez, supprimez et réorganisez les widgets selon vos priorités. Chaque membre de l\'équipe peut avoir son propre dashboard.'
      },
      {
        question: 'Les rapports peuvent-ils être envoyés à plusieurs personnes ?',
        answer: 'Oui. Configurez la liste de destinataires pour chaque type de rapport. Le directeur reçoit le résumé mensuel, le revenue manager le détail hebdomadaire.'
      },
      {
        question: 'Comment sont calculés les revenus générés ?',
        answer: 'TriggerFlow mesure les conversions attribuées à chaque email, SMS et workflow. Si un client clique sur une offre spa et réserve, le revenu est attribué au workflow correspondant.'
      },
    ],
    ctaTitle: 'Visualisez vos performances en un clic',
    ctaSubtitle: 'Vos indicateurs dans un seul tableau de bord, rapports automatiques compris.',
    relatedModules: ['automatisations', 'email', 'crm']
  },

  'hub-messagerie': {
    slug: 'hub-messagerie',
    icon: Inbox,
    title: 'Hub Messagerie',
    seoTitle: 'Hub messagerie hôtel : email SMS WhatsApp unifié',
    headline: 'Plus jamais un message client ne passe entre les mailles',
    description: 'Emails, SMS, WhatsApp - tout arrive dans une seule boîte de réception. Votre équipe répond vite, avec le contexte complet du client.',
    mockup: 'HubHeroMockup',
    painPoints: [
      'Votre équipe jongle entre l\'email, le téléphone, WhatsApp et le PMS, des messages passent entre les mailles du filet',
      'Un client envoie un email puis un WhatsApp : personne ne fait le lien et il reçoit deux réponses différentes',
      'L\'équipe de nuit ne sait pas ce que l\'équipe de jour a échangé avec le client, pas de continuité'
    ],
    benefits: [
      'Tous les messages (email, SMS, WhatsApp) arrivent au même endroit, plus rien ne passe entre les mailles',
      'En un clic, tout l\'historique du client : séjours passés, préférences, communications précédentes. Contexte complet.',
      'Templates de réponse en 1 clic pour les questions fréquentes (horaires de check-in, parking, WiFi)'
    ],
    stats: [
      { value: '1', label: 'boîte de réception pour tout', suffix: '' },
      { value: '1', label: 'clic pour répondre avec un modèle', suffix: '' },
      { value: '0', label: 'message perdu', suffix: '' },
      { value: '4', label: 'canaux dans une boîte : e-mail, SMS, WhatsApp, chat', suffix: '' },
    ],
    journey: [
      { label: 'Réservation', description: 'Confirmation visible', active: true },
      { label: 'Pré-séjour', description: 'Questions client', active: true },
      { label: 'Arrivée', description: 'Demandes d\'accueil', active: true },
      { label: 'Séjour', description: 'Service en temps réel', active: true },
      { label: 'Départ', description: 'Suivi réclamations', active: true },
      { label: 'Post-séjour', description: 'Relance contextuelle', active: true },
    ],
    features: [
      {
        title: 'Une inbox, tous vos canaux',
        description: 'Emails, SMS, WhatsApp arrivent dans une seule interface. Plus besoin de basculer entre 5 onglets. Votre équipe voit tout, répond vite.',
        icon: Inbox,
        bullets: ['Email + SMS + WhatsApp unifiés', 'Filtres par canal et statut', 'Notifications en temps réel'],
        mockup: 'HubInboxMockup',
      },
      {
        title: 'Le contexte complet avant de répondre',
        description: 'Quand un message arrive, vous voyez immédiatement : dernier séjour, préférences, historique complet des échanges. La réponse est pertinente du premier coup.',
        icon: User,
        bullets: ['Fiche client en sidebar', 'Historique multi-canal', 'Notes internes entre collègues'],
        mockup: 'HubClientViewMockup',
      },
      {
        title: 'Répondez en un clic avec les templates',
        description: 'Horaires de check-in, code WiFi, plan d\'accès, confirmation spa... Vos réponses fréquentes sont prêtes. 1 clic, c\'est envoyé.',
        icon: FileText,
        bullets: ['Templates personnalisables', 'Variables automatiques', 'Réponses multi-canal'],
        mockup: 'HubTemplatesMockup',
      }
    ],
    useCases: [
      {
        title: 'Demande client WhatsApp',
        description: 'Un client envoie "À quelle heure le petit-déjeuner ?" sur WhatsApp. L\'agent voit l\'historique email, sait que c\'est un habitué, et répond en un clic avec le template adapté.',
        result: 'Réponses cohérentes, quel que soit le canal'
      },
      {
        title: 'Réclamation multi-canal',
        description: 'Le client a envoyé un email de réclamation, puis un SMS de relance. Tout est groupé dans un seul fil. L\'agent voit la timeline complète et répond une seule fois.',
        result: 'Zéro doublon de réponse'
      },
      {
        title: 'Handover entre équipes',
        description: 'L\'équipe de jour a commencé à traiter une demande. L\'équipe de nuit prend le relais avec tout le contexte : messages échangés, notes internes, actions en cours.',
        result: 'Aucune conversation perdue entre deux équipes'
      },
      {
        title: 'Relance post-séjour contextuelle',
        description: 'Depuis la fiche client, l\'agent voit le dernier séjour (suite, vue mer, spa utilisé) et envoie une offre de retour personnalisée directement depuis le hub.',
        result: 'Des demandes relancées jusqu\'à la réservation'
      }
    ],
    testimonial: {
      quote: 'Avant le hub, on ratait 1 message sur 5. Aujourd\'hui, chaque demande est traitée en moins d\'une minute. Nos clients sentent la différence.',
      author: 'Valérie Dubois',
      role: 'Chef de Réception',
      hotel: 'Le Royal Hôtel ****',
      metric: 'Zéro message perdu'
    },
    integrations: ['Thaïs PMS', 'Misterbooking', 'Medialog', 'Opera Cloud', 'Mews', 'Asterio', 'Lean PMS', 'Apaleo'],
    faq: [
      {
        question: 'Tous les canaux arrivent-ils vraiment au même endroit ?',
        answer: 'Oui. Emails entrants, SMS reçus et messages WhatsApp sont tous visibles dans une interface unique. Chaque message est lié à la fiche client correspondante.'
      },
      {
        question: 'Plusieurs agents peuvent-ils gérer le hub en même temps ?',
        answer: 'Oui. Le hub supporte plusieurs agents simultanés. Vous pouvez assigner des conversations à des collègues et voir qui traite quoi en temps réel.'
      },
      {
        question: 'Les templates de réponse sont-ils personnalisables ?',
        answer: 'Oui. Créez vos propres templates avec des variables dynamiques (prénom, dates, chambre). Chaque réponse est personnalisée automatiquement.'
      },
      {
        question: 'Peut-on voir l\'historique d\'un client sur plusieurs séjours ?',
        answer: 'Oui. L\'historique est conservé sans limite de durée. Vous voyez toutes les interactions passées, même celles d\'il y a 3 ans.'
      },
    ],
    ctaTitle: 'Centralisez vos communications en un clic',
    ctaSubtitle: 'Tous vos canaux dans un seul hub. Plus jamais un message perdu.',
    relatedModules: ['email', 'sms', 'whatsapp', 'crm']
  },

  'ventes-additionnelles': {
    slug: 'ventes-additionnelles',
    icon: TrendingUp,
    title: 'Ventes Additionnelles',
    seoTitle: 'Upsell hôtel automatique : ventes additionnelles avant l\'arrivée',
    headline: 'Des ventes additionnelles avant l\'arrivée, sans effort de la réception',
    description: 'Proposez automatiquement les bons services au bon moment : surclassement, spa, restaurant, late checkout. Le client achète en 2 clics depuis son email.',
    mockup: 'DashboardMockup',
    heroImage: '/images/produit/ventes-additionnelles/hero-upsell.webp',
    painPoints: [
      'Votre spa, votre restaurant et vos surclassements sont sous-vendus, la réception n\'a pas le temps de proposer',
      'Vous proposez les mêmes extras à tout le monde, le voyageur solo reçoit l\'offre kids club',
      'Le client réserve un extra par téléphone, personne ne le note, c\'est oublié à l\'arrivée'
    ],
    benefits: [
      'Chaque client reçoit les offres qui le concernent : spa pour les couples, kids club pour les familles, business lounge pour les pros',
      'Envoi automatique au moment optimal : J-3 surclassement, J-1 restaurant, check-in late checkout',
      'Le client réserve en 2 clics depuis l\'email ou le SMS, pas besoin d\'appeler, pas de risque d\'oubli'
    ],
    stats: [
      { value: '5', label: 'des offres envoyées 3 à 7 jours avant l\'arrivée sont achetées (mesure sur l\'ensemble de nos hôtels)', suffix: '%' },
      { value: '0', label: 'commission TriggerFlow sur les ventes', suffix: '€' },
      { value: '0', label: 'effort de la réception', suffix: '' },
      { value: '2', label: 'clics pour réserver un extra', suffix: '' },
    ],
    journey: [
      { label: 'Réservation', description: 'Offres immédiates', active: true },
      { label: 'Pré-séjour', description: 'Surclassement J-3', active: true },
      { label: 'Arrivée', description: 'Pack bienvenue', active: true },
      { label: 'Séjour', description: 'Offres flash', active: true },
      { label: 'Départ', description: 'Late checkout', active: true },
      { label: 'Post-séjour', description: 'Offre retour', active: false },
    ],
    features: [
      {
        title: 'Le bon extra pour le bon client',
        description: 'TriggerFlow analyse le profil client (couple, famille, business, VIP) et propose automatiquement les services pertinents. Fini les offres génériques.',
        icon: Target,
        bullets: ['Segmentation automatique par profil', 'Offres personnalisées par chambre', 'Catalogue de services configurable'],
        mockup: 'UpsellOfferMockup',
      },
      {
        title: 'Envoyé au moment où le client est prêt à acheter',
        description: 'J-3 : surclassement (le client anticipe). J-1 : restaurant (il planifie sa soirée). Check-in : late checkout (il veut prolonger). Le timing fait tout.',
        icon: Clock,
        bullets: ['Timing optimisé par type d\'offre', 'Tests A/B sur les horaires', 'Déclenchement contextuel'],
        mockup: 'UpsellTimingMockup',
      },
      {
        title: 'Achat en 2 clics, zéro friction',
        description: 'Le client clique sur l\'offre dans l\'email ou le SMS, confirme, c\'est réservé. Pas d\'appel, pas de passage à la réception. L\'extra est ajouté à sa facture.',
        icon: ShoppingCart,
        bullets: ['Réservation en 2 clics', 'Ajout automatique à la facture', 'Confirmation instantanée'],
        mockup: 'UpsellCheckoutMockup',
      }
    ],
    useCases: [
      {
        title: 'Surclassement J-3',
        description: 'Le client a réservé une chambre Standard. J-3 : "Votre chambre Supérieure vue mer est disponible à 39€/nuit au lieu de 65€". Il clique, c\'est réservé.',
        result: 'Le surclassement proposé avant l\'arrivée'
      },
      {
        title: 'Pack romantique pour les couples',
        description: 'Détection automatique : 2 adultes, 0 enfant, chambre double. Envoi de l\'offre champagne + pétales de rose + late checkout à 49€. Le couple est ravi.',
        result: 'Un pack proposé aux seuls couples'
      },
      {
        title: 'Late checkout la veille du départ',
        description: 'J-1 : "Profitez de votre chambre jusqu\'à 14h pour seulement 25€". Le client qui a un vol à 18h dit oui sans hésiter.',
        result: 'Le late check-out vendu la veille du départ'
      },
      {
        title: 'Table restaurant pendant le séjour',
        description: 'Le premier soir, SMS à 16h : "Notre chef propose ce soir un menu découverte à 45€/pers. Réservez votre table en 1 clic". Le restaurant se remplit.',
        result: 'Des tables réservées avant l\'arrivée'
      }
    ],
    testimonial: {
      quote: 'Nos ventes additionnelles ont augmenté de 17% le premier mois. Le surclassement se vend tout seul à J-3 et notre spa est complet tous les week-ends.',
      author: 'Philippe Roux',
      role: 'Revenue Manager',
      hotel: 'Domaine & Spa La Cascade ****',
      metric: '+17% de panier moyen'
    },
    integrations: ['Thaïs PMS', 'Misterbooking', 'Medialog', 'Opera Cloud', 'Mews', 'Asterio', 'Lean PMS', 'Apaleo'],
    faq: [
      {
        question: 'Comment TriggerFlow sait quel extra proposer à qui ?',
        answer: 'TriggerFlow analyse le profil de la réservation : nombre d\'adultes/enfants, type de chambre, historique client, montant. Les offres sont ciblées automatiquement.'
      },
      {
        question: 'Le client doit-il passer à la réception pour réserver ?',
        answer: 'Non. Le client réserve en 2 clics depuis son email ou SMS. L\'extra est automatiquement ajouté à sa facture dans votre PMS.'
      },
      {
        question: 'Puis-je définir mes propres offres et tarifs ?',
        answer: 'Oui. Vous configurez votre catalogue de services, les tarifs, les conditions d\'éligibilité et le timing d\'envoi. TriggerFlow gère le reste.'
      },
      {
        question: 'Comment mesurer le ROI des ventes additionnelles ?',
        answer: 'Le dashboard analytics montre les revenus générés par offre, par profil client et par canal. Vous savez exactement combien chaque workflow rapporte.'
      },
    ],
    ctaTitle: 'Augmentez votre panier moyen dès cette semaine',
    ctaSubtitle: 'Catalogue configuré avec vous. Ventes additionnelles proposées automatiquement à chaque séjour.',
    relatedModules: ['automatisations', 'email', 'paiements', 'crm']
  },

  paiements: {
    slug: 'paiements',
    icon: CreditCard,
    title: 'Paiements',
    seoTitle: 'Liens de paiement hôtel : acompte, caution & empreinte carte',
    headline: 'Encaissez vos clients avant, pendant et après le séjour, sans friction',
    description: 'Créez des liens de paiement personnalisés à votre image. Acompte, caution, empreinte carte : chaque besoin hôtelier couvert. Intégré à vos workflows et connecté à votre PMS.',
    mockup: 'PaymentHeroMockup',
    painPoints: [
      'Vous relancez les clients par email pour les acomptes, pas de lien direct pour payer',
      'La caution se gère à l\'arrivée en physique, friction pour le client et la réception',
      'Vous n\'avez aucune visibilité sur les paiements en cours et les cartes enregistrées',
      'Chaque prestataire de paiement nécessite une intégration technique différente'
    ],
    benefits: [
      'Un lien personnalisé aux couleurs de votre hôtel, envoyé automatiquement par email, SMS ou WhatsApp',
      '3 types de paiement : encaissement immédiat, caution (pré-autorisation 7-31j), empreinte carte (prélèvement ultérieur)',
      'Page de paiement multilingue - s\'adapte automatiquement à la langue du client',
      'Compatible Stripe, PayZen, SystemPay et paiement Thaïs : un seul système, plusieurs prestataires'
    ],
    stats: [
      { value: '3', label: 'types de paiement (paiement, caution, empreinte)', suffix: '' },
      { value: '5', label: 'langues supportées (FR, EN, ES, DE, IT)', suffix: '' },
      { value: '0', label: 'commission TriggerFlow', suffix: '€' },
    ],
    journey: [
      { label: 'Réservation', description: 'Acompte automatique', active: true },
      { label: 'Pré-séjour', description: 'Empreinte carte / caution', active: true },
      { label: 'Arrivée', description: 'Vérification caution', active: true },
      { label: 'Séjour', description: 'Prélèvement minibar/extras', active: true },
      { label: 'Départ', description: 'Libération caution', active: true },
      { label: 'Post-séjour', description: 'Remboursement si nécessaire', active: false },
    ],
    features: [
      {
        title: 'Liens de paiement personnalisés',
        description: 'Créez des liens brandés (logo, couleurs, polices). Montant fixe, pourcentage ou solde restant. Envoyés via vos workflows automatiques.',
        icon: Palette,
        bullets: ['Design aux couleurs de votre hôtel', 'Montant fixe, pourcentage ou solde restant', 'Envoi automatique via workflows'],
        mockup: 'PaymentLinkMockup',
      },
      {
        title: 'Paiement immédiat',
        description: 'Le client paie en un clic. Fonds encaissés directement sur votre compte. Confirmation automatique.',
        icon: CreditCard,
        bullets: ['Paiement en 1 clic', 'Fonds sur votre compte', 'Confirmation automatique'],
        mockup: 'PaymentInstantMockup',
      },
      {
        title: 'Caution / Pré-autorisation',
        description: 'Bloquez un montant sur la carte du client. Capturez ou libérez depuis votre dashboard. Expire automatiquement après 7-31 jours.',
        icon: Shield,
        bullets: ['Blocage sans débit', 'Capture ou libération en 1 clic', 'Expiration automatique 7-31j'],
        mockup: 'PaymentCautionMockup',
      },
      {
        title: 'Empreinte carte',
        description: 'Enregistrez la carte du client pour un prélèvement ultérieur (no-show, dégâts, minibar). Aucun montant débité à l\'enregistrement.',
        icon: User,
        bullets: ['Enregistrement sans débit', 'Prélèvement ultérieur à la demande', 'Idéal no-show et dégâts'],
        mockup: 'PaymentEmpreinteMockup',
      },
      {
        title: 'Suivi & remboursements',
        description: 'Tableau de bord des transactions. Remboursement total ou partiel en un clic. Historique complet avec motif et audit trail.',
        icon: Activity,
        bullets: ['Dashboard transactions temps réel', 'Remboursement partiel ou total', 'Audit trail complet'],
        mockup: 'PaymentTrackingMockup',
      },
      {
        title: 'Multi-prestataires',
        description: 'Stripe Connect, PayZen et SystemPay (Lyra) ou le paiement Thaïs : vous gardez le prestataire de votre choix. Architecture extensible, pas de verrouillage prestataire.',
        icon: RefreshCw,
        bullets: ['Stripe Connect natif', 'PayZen, SystemPay et paiement Thaïs', 'Changez de prestataire sans migration'],
        mockup: 'PaymentProvidersMockup',
      },
    ],
    useCases: [
      {
        title: 'Acompte automatique à la réservation',
        description: 'Le client réserve. Dans la foulée, il reçoit un lien de paiement aux couleurs de votre hôtel pour verser son acompte. Aucune relance, aucune action manuelle.',
        result: '91 % des paiements réglés dans les 2 h après ouverture du lien (12 derniers mois)'
      },
      {
        title: 'Caution digitale au pré-séjour',
        description: 'À J-3, le client reçoit automatiquement une demande de caution. Le montant est bloqué (pas débité) sur sa carte. Plus besoin de gérer ça à la réception.',
        result: 'Caution réglée avant l\'arrivée, rien à faire au comptoir'
      },
      {
        title: 'Empreinte carte pour les no-shows',
        description: 'Sécurisez vos réservations avec une empreinte carte. En cas de no-show, prélevez le montant prévu en un clic depuis votre dashboard.',
        result: 'Moins de no-shows non garantis'
      },
      {
        title: 'Extras et minibar en fin de séjour',
        description: 'Le client a consommé au minibar ou réservé un soin ? Prélevez directement la carte enregistrée. Le client reçoit un reçu automatique.',
        result: 'Les extras encaissés sans passer au comptoir'
      },
    ],
    faq: [
      {
        question: 'Quels prestataires de paiement sont supportés ?',
        answer: 'Stripe Connect, PayZen, SystemPay (Lyra) et le paiement Thaïs. TriggerFlow s\'intègre directement à votre compte prestataire, vos fonds arrivent sur votre compte, pas le nôtre.'
      },
      {
        question: 'Est-ce que TriggerFlow prend une commission ?',
        answer: 'Non. Seuls les frais du prestataire (Stripe ~1.5%+0.25€) s\'appliquent. TriggerFlow ne prend aucune commission sur les transactions.'
      },
      {
        question: 'Combien de temps dure une caution ?',
        answer: '7 à 31 jours selon le réseau de carte. Pour l\'hôtellerie, des autorisations étendues jusqu\'à 31 jours sont possibles via Stripe.'
      },
      {
        question: 'Peut-on prélever une carte enregistrée plusieurs mois après ?',
        answer: 'Oui, tant que la carte n\'est pas expirée ou révoquée. Aucune limite de durée côté TriggerFlow.'
      },
      {
        question: 'Les liens de paiement sont-ils réutilisables ?',
        answer: 'Oui, un même lien peut être utilisé par plusieurs réservations. La déduplication se fait automatiquement par réservation.'
      },
    ],
    testimonial: {
      quote: 'On a divisé par 10 le temps passé sur les acomptes. Les clients paient avant d\'arriver, c\'est fluide pour tout le monde.',
      author: 'Thomas Renard',
      role: 'Directeur',
      hotel: 'Hôtel & Spa Le Clos',
      metric: '-90% de temps sur les acomptes'
    },
    ctaTitle: 'Simplifiez vos encaissements dès cette semaine',
    ctaSubtitle: 'Paiements configurés avec vous. Acomptes et soldes encaissés sans relance manuelle.',
    relatedModules: ['crm', 'automatisations', 'ventes-additionnelles', 'email']
  },
};

export const modulesList = Object.values(modules);
export const moduleSlugs = Object.keys(modules);

// Serializable version for Server Components (without React components/functions)
export interface ModuleSerializable {
  slug: string;
  title: string;
  seoTitle: string;
  headline: string;
  description: string;
  mockup: string;
  painPoints: string[];
  benefits: string[];
  features: { title: string; description: string; bullets?: string[]; mockup?: string }[];
  useCases: ModuleUseCase[];
  relatedModules: string[];
  stats?: ModuleStat[];
  faq?: ModuleFaq[];
  testimonial?: ModuleTestimonial;
  integrations?: string[];
  journey?: JourneyStep[];
  ctaTitle?: string;
  ctaSubtitle?: string;
}

export function getModuleSerializable(slug: string): ModuleSerializable | null {
  const module = modules[slug];
  if (!module) return null;

  return {
    slug: module.slug,
    title: module.title,
    seoTitle: module.seoTitle,
    headline: module.headline,
    description: module.description,
    mockup: module.mockup,
    painPoints: module.painPoints,
    benefits: module.benefits,
    features: module.features.map(f => ({ title: f.title, description: f.description, bullets: f.bullets, mockup: f.mockup })),
    useCases: module.useCases,
    relatedModules: module.relatedModules,
    stats: module.stats,
    faq: module.faq,
    testimonial: module.testimonial,
    integrations: module.integrations,
    journey: module.journey,
    ctaTitle: module.ctaTitle,
    ctaSubtitle: module.ctaSubtitle,
  };
}
