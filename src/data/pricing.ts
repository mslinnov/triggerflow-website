/**
 * Source unique des prix : plans ET modules, grille actuelle et grille au
 * 1er janvier 2027 (`nextPrice`).
 *
 * Consommée par la page /tarifs (affichage) ET par le schema Product/Offer
 * (`src/components/seo/JsonLd.tsx`). Un prix qui change ici se propage aux deux.
 * Les libellés et descriptions restent dans `messages/{locale}.json` (`pricing.plans.*`),
 * sauf ceux repris ci-dessous, que le JSON-LD doit rendre hors contexte React.
 */

export interface Plan {
  key: 'discovery' | 'communication' | 'conversion' | 'allInclusive';
  price: string;
  /** Prix au 1er janvier 2027. */
  nextPrice: string;
  popular: boolean;
  /** E-mails compris par mois : cartes et première ligne du tableau (quota `email_quantity` de l'app). */
  emailsPerMonth: number;
  /** Repris dans le JSON-LD, où les traductions next-intl ne sont pas disponibles. */
  name: { fr: string; en: string };
  description: { fr: string; en: string };
}

export const PLANS: Plan[] = [
  {
    key: 'discovery',
    price: '0',
    nextPrice: '0',
    popular: false,
    emailsPerMonth: 1000,
    name: { fr: 'Découverte', en: 'Discovery' },
    description: {
      fr: 'Gratuit, sans carte bancaire : lancez votre premier scénario automatique et voyez vos clients réagir.',
      en: 'Free, no credit card: launch your first automated scenario and watch your guests respond.',
    },
  },
  {
    key: 'communication',
    price: '69',
    nextPrice: '99',
    popular: false,
    emailsPerMonth: 5000,
    name: { fr: 'Communication', en: 'Communication' },
    description: {
      fr: 'Parlez à chaque client au bon moment : avant l’arrivée, pendant le séjour et après le départ, sans y penser.',
      en: 'Talk to every guest at the right moment: before arrival, during the stay and after check-out, without lifting a finger.',
    },
  },
  {
    key: 'conversion',
    price: '149',
    nextPrice: '179',
    popular: true,
    emailsPerMonth: 15000,
    name: { fr: 'Conversion', en: 'Conversion' },
    description: {
      fr: 'Faites réagir vos clients et vendez plus : offres avant l’arrivée, enquêtes, avis, et un message suivant adapté à leur réaction.',
      en: 'Get guests to respond and sell more: pre-arrival offers, surveys, reviews, and a next message that fits how they reacted.',
    },
  },
  {
    key: 'allInclusive',
    price: '249',
    nextPrice: '299',
    popular: false,
    emailsPerMonth: 50000,
    name: { fr: 'Illimités', en: 'Unlimited' },
    description: {
      fr: 'Tout TriggerFlow, sans plafond : tous les modules inclus et un account manager dédié à vos établissements.',
      en: 'All of TriggerFlow, no caps: every module included and a dedicated account manager for your properties.',
    },
  },
];

export type AddonKey = 'reviews' | 'aiAgent' | 'payments' | 'loyalty' | 'guestApp';

export interface Addon {
  key: AddonKey;
  price: string;
  nextPrice: string;
}

/** Libellés, icônes et couleurs restent dans la page tarifs ; ici, seulement les prix. */
export const ADDONS: Addon[] = [
  { key: 'reviews', price: '19', nextPrice: '29' },
  { key: 'aiAgent', price: '19', nextPrice: '29' },
  { key: 'payments', price: '29', nextPrice: '39' },
  { key: 'loyalty', price: '39', nextPrice: '49' },
  { key: 'guestApp', price: '49', nextPrice: '49' },
];

/**
 * Entrée en vigueur de la grille 2027, minuit heure de Paris.
 * Avant : on affiche la grille actuelle et on annonce la suivante.
 * Après : seule la nouvelle grille est affichée, sans annonce.
 */
export const PRICE_CHANGE_AT = new Date('2027-01-01T00:00:00+01:00');

export type PricingPhase = 'announce' | 'new';

/**
 * `PRICING_NOW` (ISO 8601) simule une date en local. Jamais en production.
 * À appeler au rendu, jamais au niveau module : le serveur de production est
 * un process long, une valeur calculée à l'import resterait figée.
 */
export function getPricingNow(): Date {
  const simulated = process.env.PRICING_NOW;
  return simulated ? new Date(simulated) : new Date();
}

export function getPricingPhase(now: Date = getPricingNow()): PricingPhase {
  return now.getTime() < PRICE_CHANGE_AT.getTime() ? 'announce' : 'new';
}

export interface DisplayPrice {
  price: string;
  /** Prix au 1er janvier 2027, seulement pendant l'annonce et s'il change. */
  upcomingPrice: string | null;
}

export type DisplayPlan = Omit<Plan, 'nextPrice'> & DisplayPrice;
export type DisplayAddon = Omit<Addon, 'nextPrice'> & DisplayPrice;

function resolvePrice(price: string, nextPrice: string, phase: PricingPhase): DisplayPrice {
  if (phase === 'new') return { price: nextPrice, upcomingPrice: null };
  return { price, upcomingPrice: nextPrice !== price ? nextPrice : null };
}

export function getDisplayPlans(phase: PricingPhase): DisplayPlan[] {
  return PLANS.map(({ nextPrice, ...plan }) => ({
    ...plan,
    ...resolvePrice(plan.price, nextPrice, phase),
  }));
}

export function getDisplayAddons(phase: PricingPhase): DisplayAddon[] {
  return ADDONS.map(({ nextPrice, ...addon }) => ({
    ...addon,
    ...resolvePrice(addon.price, nextPrice, phase),
  }));
}

/** Plus petit prix payant, pour les accroches « dès 69€/mois ». */
export function getEntryPrice(phase: PricingPhase): string {
  const paid = getDisplayPlans(phase)
    .map((plan) => Number(plan.price))
    .filter((price) => price > 0);
  return String(Math.min(...paid));
}

/**
 * Cas client anonyme du bloc « Ce que ça rapporte » (chiffres donnés par Mounir le 24/11) :
 * une campagne, 7 à 9 réservations, environ 1 700 € de chiffre d'affaires au total.
 */
export const ROI_CASE = { rooms: 33, bookingsMin: 7, bookingsMax: 9, revenue: 1700 } as const;

/** Panier moyen du cas : chiffre d'affaires de la campagne divisé par le milieu de la fourchette. */
export function getRoiAverageBasket(): number {
  return ROI_CASE.revenue / ((ROI_CASE.bookingsMin + ROI_CASE.bookingsMax) / 2);
}

/** Réservations au panier moyen du cas qui remboursent un mois d'abonnement. */
export function getPaybackBookings(price: string): number {
  return Math.max(1, Math.ceil(Number(price) / getRoiAverageBasket()));
}

/**
 * Bloc « Ce que ça rapporte » : masqué tant que Mounir ne l'a pas validé.
 * `PRICING_ROI_PREVIEW=1 npm run dev` pour le voir ; jamais posée en production (absente de deploy.yml).
 */
export function isRoiPreviewEnabled(env: Record<string, string | undefined> = process.env): boolean {
  return env.PRICING_ROI_PREVIEW === '1';
}
