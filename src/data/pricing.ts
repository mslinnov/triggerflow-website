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
    name: { fr: 'Découverte', en: 'Discovery' },
    description: {
      fr: 'Gratuit, sans carte bancaire : testez vos premiers scénarios clients.',
      en: 'Free, no credit card: try your first guest scenarios.',
    },
  },
  {
    key: 'communication',
    price: '69',
    nextPrice: '99',
    popular: false,
    name: { fr: 'Communication', en: 'Communication' },
    description: {
      fr: 'Segments et messages automatisés avant, pendant et après le séjour.',
      en: 'Segments and automated messages before, during and after the stay.',
    },
  },
  {
    key: 'conversion',
    price: '149',
    nextPrice: '179',
    popular: true,
    name: { fr: 'Conversion', en: 'Conversion' },
    description: {
      fr: 'Ventes additionnelles, enquêtes de satisfaction et collecte d’avis.',
      en: 'Upselling, satisfaction surveys and review collection.',
    },
  },
  {
    key: 'allInclusive',
    price: '249',
    nextPrice: '299',
    popular: false,
    name: { fr: 'All Inclusive', en: 'All Inclusive' },
    description: {
      fr: 'Tous les modules inclus, sans limites, avec account manager dédié.',
      en: 'Every module included, no limits, with a dedicated account manager.',
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
