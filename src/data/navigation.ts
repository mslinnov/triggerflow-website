/**
 * Navigation du site (docs/arborescence.md). Les libellés sont dans messages/{locale}.json (`nav`).
 * Tant qu'une page cible n'existe pas encore, l'entrée pointe vers la page actuelle la plus proche
 * (règle de l'arborescence : pas de lien mort). Mettre à jour `href` quand la nouvelle page part en ligne.
 */
export interface NavItem {
  key: string;
  href: string;
}

export interface NavColumn {
  key: string;
  items: NavItem[];
}

export const productMenu: NavColumn[] = [
  {
    key: 'before',
    items: [
      { key: 'upsell', href: '/produit/upsell' },
      { key: 'pay', href: '/produit/pay' },
      { key: 'forms', href: '/produit/formulaires' },
    ],
  },
  {
    key: 'during',
    items: [
      { key: 'voice', href: '/produit/voice' },
      { key: 'inbox', href: '/produit/hub-messagerie' },
      { key: 'whatsapp', href: '/produit/whatsapp' },
      { key: 'sms', href: '/produit/sms' },
    ],
  },
  {
    key: 'after',
    items: [
      { key: 'reviews', href: '/produit/avis' },
      { key: 'loyalty', href: '/produit/fidelite' },
    ],
  },
  {
    key: 'marketing',
    items: [
      { key: 'campaigns', href: '/produit/newsletter' },
      { key: 'email', href: '/produit/email' },
    ],
  },
  {
    key: 'core',
    items: [
      { key: 'flows', href: '/produit/flows' },
      { key: 'crm', href: '/produit/crm' },
      { key: 'analytics', href: '/produit/analytics' },
    ],
  },
];

export const solutionsMenu: NavItem[] = [
  { key: 'independent', href: '/solutions/hotels-independants' },
  { key: 'groups', href: '/solutions/groupes-hoteliers' },
  { key: 'luxury', href: '/solutions/hotels-luxe' },
  { key: 'residences', href: '/solutions/residences' },
  { key: 'campsites', href: '/solutions/campings' },
];

export const platformMenu: NavItem[] = [
  { key: 'sync', href: '/plateforme/synchronisation' },
  { key: 'ai', href: '/plateforme/ia' },
  { key: 'security', href: '/plateforme/securite' },
  { key: 'integrationsHub', href: '/integrations' },
];

export const resourcesMenu: NavItem[] = [
  { key: 'blog', href: '/blog' },
  { key: 'guides', href: '/ressources/guides' },
  { key: 'help', href: '/ressources/aide' },
];

export const footerColumns: NavColumn[] = [
  {
    key: 'product',
    items: [
      { key: 'platform', href: '/produit' },
      { key: 'flows', href: '/produit/flows' },
      { key: 'inbox', href: '/produit/hub-messagerie' },
      { key: 'upsell', href: '/produit/upsell' },
      { key: 'pay', href: '/produit/pay' },
      { key: 'reviews', href: '/produit/avis' },
      { key: 'crm', href: '/produit/crm' },
      { key: 'pricing', href: '/tarifs' },
    ],
  },
  {
    key: 'solutions',
    items: [
      { key: 'independent', href: '/solutions/hotels-independants' },
      { key: 'groups', href: '/solutions/groupes-hoteliers' },
      { key: 'luxury', href: '/solutions/hotels-luxe' },
      { key: 'residences', href: '/solutions/residences' },
      { key: 'campsites', href: '/solutions/campings' },
      { key: 'integrations', href: '/integrations' },
    ],
  },
  {
    key: 'clients',
    items: [
      { key: 'allCases', href: '/ressources/cas-clients' },
      { key: 'edgar', href: '/ressources/cas-clients/edgar-hotel-spa' },
      { key: 'causse', href: '/ressources/cas-clients/causse-comtal' },
      { key: 'pressoir', href: '/ressources/cas-clients/le-vieux-pressoir' },
      { key: 'noemys', href: '/ressources/cas-clients/groupe-noemys' },
    ],
  },
  {
    key: 'resources',
    items: [
      { key: 'blog', href: '/blog' },
      { key: 'guides', href: '/ressources/guides' },
      { key: 'help', href: '/ressources/aide' },
    ],
  },
  {
    key: 'company',
    items: [
      { key: 'about', href: '/entreprise/a-propos' },
      { key: 'careers', href: '/entreprise/carrieres' },
      { key: 'contact', href: '/contact' },
    ],
  },
  {
    key: 'trust',
    items: [
      { key: 'security', href: '/plateforme/securite' },
      { key: 'sync', href: '/plateforme/synchronisation' },
      { key: 'ai', href: '/plateforme/ia' },
      { key: 'dpa', href: '/dpa' },
      { key: 'privacy', href: '/politique-confidentialite' },
    ],
  },
  {
    key: 'legal',
    items: [
      { key: 'legalNotice', href: '/mentions-legales' },
      { key: 'terms', href: '/cgv' },
      { key: 'termsOfUse', href: '/cgu' },
    ],
  },
];
