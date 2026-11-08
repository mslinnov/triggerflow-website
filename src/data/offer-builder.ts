/**
 * Catalogue du configurateur d'offre (accueil). Le CRM, les segments et les automatisations
 * sont toujours inclus ; tout le reste est un module. Prix des plans dans `@/data/pricing`.
 */

export type BuilderModuleKey =
  | 'inbox' | 'forms' | 'upsell' | 'pay' | 'checkin' | 'bookingRequests' | 'guestApp' | 'voice'
  | 'keys' | 'housekeeping' | 'reviews' | 'campaigns' | 'loyalty' | 'aiAgent' | 'events' | 'b2b';

/** Inclus d'office dans Two Way, en plus des 2 modules au choix. */
export const TWO_WAY_BUNDLE: BuilderModuleKey[] = ['inbox', 'forms', 'upsell'];

/** Les deux colonnes du configurateur, de part et d'autre du CRM. */
export const BUILDER_COLUMNS: BuilderModuleKey[][] = [
  ['inbox', 'forms', 'upsell', 'pay', 'checkin', 'bookingRequests', 'guestApp', 'voice'],
  ['keys', 'housekeeping', 'reviews', 'campaigns', 'loyalty', 'aiAgent', 'events', 'b2b'],
];

export type PlanChoice = 'communication' | 'conversion' | 'allInclusive';

/**
 * Plus petite formule qui couvre la sélection sans module payé en plus :
 * One Way = 1 module ; Two Way = messagerie, formulaires, upsell + 2 modules ; sinon All Inclusive.
 */
export function recommendPlan(selected: BuilderModuleKey[]): PlanChoice {
  if (selected.length <= 1) return 'communication';
  const extras = selected.filter((key) => !TWO_WAY_BUNDLE.includes(key));
  return extras.length <= 2 ? 'conversion' : 'allInclusive';
}
