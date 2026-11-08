/**
 * Source unique des prix : plans ET modules (`nextPrice` sert si une hausse est un jour annoncée).
 *
 * Consommée par la page /tarifs (affichage) ET par le schema Product/Offer
 * (`src/components/seo/JsonLd.tsx`). Un prix qui change ici se propage aux deux.
 * Les libellés et descriptions restent dans `messages/{locale}.json` (`pricing.plans.*`),
 * sauf ceux repris ci-dessous, que le JSON-LD doit rendre hors contexte React.
 */

export interface Plan {
  key: 'discovery' | 'communication' | 'conversion' | 'allInclusive';
  price: string;
  /** Conservé pour le mécanisme d'annonce ; égal à `price` tant qu'aucune hausse n'est prévue. */
  nextPrice: string;
  popular: boolean;
  /** Nombre de modules au choix inclus ; 'all' = tous les modules. */
  includedModules: number | 'all';
  /** Repris dans le JSON-LD, où les traductions next-intl ne sont pas disponibles. */
  name: { fr: string; en: string };
  description: { fr: string; en: string };
}

/**
 * Grille en vigueur depuis le 8 novembre 2026 (décision Soufiane) : Découverte 0 € (remise le 08/11/2026),
 * One Way 99 €, Two Way 179 €, All Inclusive 249 €. Le gratuit n'est pas un argument : CTA « Demander une démo ».
 * Les clés internes restent `communication` / `conversion` pour ne pas casser les traductions.
 */
export const PLANS: Plan[] = [
  {
    key: 'discovery',
    price: '0',
    nextPrice: '0',
    popular: false,
    includedModules: 0,
    name: { fr: 'Découverte', en: 'Discovery' },
    description: {
      fr: 'Pour découvrir TriggerFlow et lancer vos premiers scénarios clients.',
      en: 'To discover TriggerFlow and launch your first guest scenarios.',
    },
  },
  {
    key: 'communication',
    price: '99',
    nextPrice: '99',
    popular: false,
    includedModules: 1,
    name: { fr: 'One Way', en: 'One Way' },
    description: {
      fr: 'Le CRM, les segments, les automatisations et la messagerie unifiée, plus 1 module au choix.',
      en: 'The CRM, segments, automations and unified inbox, plus 1 module of your choice.',
    },
  },
  {
    key: 'conversion',
    price: '179',
    nextPrice: '179',
    popular: true,
    includedModules: 2,
    name: { fr: 'Two Way', en: 'Two Way' },
    description: {
      fr: 'One Way, plus les interactions clients, les formulaires et l’upsell, et 2 modules au choix.',
      en: 'One Way, plus guest interactions, forms and upselling, and 2 modules of your choice.',
    },
  },
  {
    key: 'allInclusive',
    price: '249',
    nextPrice: '249',
    popular: false,
    includedModules: 'all',
    name: { fr: 'All Inclusive', en: 'All Inclusive' },
    description: {
      fr: 'Tous les modules inclus.',
      en: 'Every module included.',
    },
  },
];

export type AddonKey = 'reviews' | 'aiAgent' | 'payments' | 'loyalty' | 'guestApp';

export interface Addon {
  key: AddonKey;
  price: string;
  nextPrice: string;
}

/** Prix d'un module ajouté au-delà des modules inclus dans le plan. Libellés et icônes dans la page tarifs. */
export const ADDONS: Addon[] = [
  { key: 'reviews', price: '29', nextPrice: '29' },
  { key: 'aiAgent', price: '29', nextPrice: '29' },
  { key: 'payments', price: '39', nextPrice: '39' },
  { key: 'loyalty', price: '49', nextPrice: '49' },
  { key: 'guestApp', price: '49', nextPrice: '49' },
];

/**
 * Entrée en vigueur de la grille actuelle (One Way / Two Way / All Inclusive), minuit heure de Paris.
 * Avant : on affiche la grille actuelle et on annonce la suivante.
 * Après : seule la nouvelle grille est affichée, sans annonce.
 */
export const PRICE_CHANGE_AT = new Date('2026-11-08T00:00:00+01:00');

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

/** Plus petit prix payant, pour les accroches « dès 99 €/mois ». */
export function getEntryPrice(phase: PricingPhase): string {
  const paid = getDisplayPlans(phase)
    .map((plan) => Number(plan.price))
    .filter((price) => price > 0);
  return String(Math.min(...paid));
}
