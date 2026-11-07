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
      { key: 'forms', href: '/produit/forms' },
      { key: 'checkin', href: '/produit/check-in' },
      { key: 'bookingRequests', href: '/produit/booking-requests' },
    ],
  },
  {
    key: 'during',
    items: [
      { key: 'guestApp', href: '/produit/guest-app' },
      { key: 'voice', href: '/produit/voice' },
      { key: 'inbox', href: '/produit/inbox' },
      { key: 'housekeeping', href: '/produit/housekeeping' },
      { key: 'keys', href: '/produit/keys' },
    ],
  },
  {
    key: 'after',
    items: [{ key: 'reviews', href: '/produit/reviews' }],
  },
  {
    key: 'marketing',
    items: [
      { key: 'campaigns', href: '/produit/campaigns' },
      { key: 'loyalty', href: '/produit/loyalty' },
    ],
  },
  {
    key: 'core',
    items: [
      { key: 'flows', href: '/produit/flows' },
      { key: 'crm', href: '/produit/crm' },
      { key: 'analytics', href: '/produit/analytics' },
      { key: 'events', href: '/produit/events' },
      { key: 'b2b', href: '/produit/b2b' },
    ],
  },
];

export const solutionsMenu: NavItem[] = [
  { key: 'independent', href: '/solutions/hotels-independants' },
  { key: 'groups', href: '/solutions/groupes-hoteliers' },
  { key: 'luxury', href: '/solutions/hotels-luxe' },
  { key: 'residences', href: '/solutions/residences' },
  { key: 'campsites', href: '/solutions/campings' },
  { key: 'guesthouses', href: '/solutions/maisons-hotes' },
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
  { key: 'calendar', href: '/calendrier-marketing' },
  { key: 'help', href: '/ressources/aide' },
];

/** Liens « Entreprise » du footer, repris dans le menu Ressources. */
export const companyMenu: NavItem[] = [
  { key: 'about', href: '/a-propos' },
  { key: 'careers', href: '/carrieres' },
  { key: 'contact', href: '/contact' },
];

export const footerColumns: NavColumn[] = [
  {
    key: 'product',
    items: [
      { key: 'platform', href: '/produit' },
      { key: 'flows', href: '/produit/flows' },
      { key: 'inbox', href: '/produit/inbox' },
      { key: 'upsell', href: '/produit/upsell' },
      { key: 'pay', href: '/produit/pay' },
      { key: 'reviews', href: '/produit/reviews' },
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
      { key: 'guesthouses', href: '/solutions/maisons-hotes' },
      { key: 'integrations', href: '/integrations' },
    ],
  },
  {
    key: 'clients',
    items: [
      { key: 'allCases', href: '/clients' },
      { key: 'edgar', href: '/clients/edgar-hotel-spa' },
      { key: 'causse', href: '/clients/causse-comtal' },
      { key: 'pressoir', href: '/clients/le-vieux-pressoir' },
      { key: 'noemys', href: '/clients/groupe-noemys' },
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
      { key: 'about', href: '/a-propos' },
      { key: 'careers', href: '/carrieres' },
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
