/**
 * Catalogue du configurateur d'offre (accueil). Le CRM, les segments, les automatisations et la
 * messagerie unifiée sont toujours inclus ; tout le reste est un module. Prix des plans dans `@/data/pricing`.
 */

export type BuilderModuleKey =
  | 'forms' | 'upsell' | 'pay' | 'checkin' | 'guestApp' | 'voice'
  | 'keys' | 'housekeeping' | 'reviews' | 'campaigns' | 'loyalty' | 'aiAgent' | 'events' | 'b2b';

/** Les deux colonnes du configurateur, de part et d'autre du CRM. */
export const BUILDER_COLUMNS: BuilderModuleKey[][] = [
  ['forms', 'upsell', 'pay', 'checkin', 'guestApp', 'voice', 'keys'],
  ['housekeeping', 'reviews', 'campaigns', 'loyalty', 'aiAgent', 'events', 'b2b'],
];
