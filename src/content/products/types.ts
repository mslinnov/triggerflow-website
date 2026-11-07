import type { StatId } from '@/data/company-stats';

/** Textes localisés d'une landing produit (gabarit en 13 blocs, docs/wireframes.md). */
export type L = { fr: string; en: string };

export type IconKey =
  | 'sparkles' | 'users' | 'mail' | 'creditCard' | 'clipboard' | 'bed' | 'package' | 'barChart'
  | 'workflow' | 'filter' | 'clock' | 'zap' | 'messageSquare' | 'refresh' | 'shield' | 'link'
  | 'bell' | 'repeat' | 'calendar' | 'layers' | 'lock' | 'receipt' | 'phone' | 'mic' | 'globe' | 'moon';

export interface ProductLanding {
  /** Slug de la nouvelle URL (/produit/<slug>). */
  slug: string;
  /** Ancien slug redirigé en 301. */
  /** Ancien slug redirigé en 301 (absent pour une page nouvelle). */
  legacySlug?: string;
  name: L;
  seo: { title: L; description: L };
  hero: { title: L; subtitle: L; visual: 'upsell' | 'flows' | 'pay' | 'voice' | 'inbox' | 'reviews' | 'forms' | 'loyalty' | 'crm' | 'campaign' | 'guestApp' | 'events' | 'b2b' | 'checkin' | 'housekeeping' | 'keys' | 'analytics' | 'booking' };
  /** clients : uniquement ceux dont le témoignage confirme l'usage du module (docs/preuves.md). */
  proof: { stat?: StatId; statLabel?: L; clients: string[] };
  problem: { title: L; items: L[] };
  how: { title: L; steps: { title: L; text: L }[] };
  features: { title: L; items: { icon: IconKey; title: L; text: L }[] };
  tailored: { title: L; items: { client: string | L; text: L }[] };
  caseStudy?: { quote: L; name: string; role: L; company: string; href?: string };
  integrations: { title: L; text: L; extra?: string[] };
  reliability?: { stat: StatId; label: L };
  related: { slug: string; href: string; name: L; text: L }[];
  pricing: { text: L; addon?: 'payments' | 'reviews' | 'loyalty' | 'aiAgent' | 'guestApp' };
  faq: { q: L; a: L }[];
  cta: { title: L };
}
