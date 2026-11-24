/**
 * Lignes du tableau comparatif de /tarifs, une valeur par offre dans l'ordre de `PLANS`.
 * Libellés, phrases et exemples des info-bulles : `messages/{locale}.json`
 * (`pricing.comparison.features` et `pricing.comparison.tooltips.<clé>.what / .example`).
 *
 * Droits relus dans l'app le 24/11 (table `subscriptions`) ; le tableau garde un découpage commercial
 * pour le hub, la vente, le portail groupe et les statistiques, que l'app ne bride pas par offre.
 */
import { PLANS } from './pricing';

/** `true` / `false` : coche ou croix ; nombre : quota ; texte : clé de `pricing.comparison.values`. */
export type FeatureValue = boolean | number | 'unlimited' | 'ownDomain' | 'dedicatedDomain';

export type ComparisonGroupKey = 'communication' | 'automation' | 'marketing' | 'tools';

export interface ComparisonFeature {
  key: string;
  values: FeatureValue[];
}

export interface ComparisonGroup {
  key: ComparisonGroupKey;
  features: ComparisonFeature[];
}

export const COMPARISON_GROUPS: ComparisonGroup[] = [
  {
    key: 'communication',
    features: [
      { key: 'emails', values: PLANS.map((plan) => plan.emailsPerMonth) },
      { key: 'sms', values: [true, true, true, true] },
      { key: 'whatsapp', values: [false, true, true, true] },
      { key: 'hub', values: [false, true, true, true] },
    ],
  },
  {
    key: 'automation',
    features: [
      { key: 'segments', values: [5, 10, 45, 'unlimited'] },
      { key: 'flows', values: [1, 5, 10, 'unlimited'] },
      { key: 'conditions', values: [false, false, true, true] },
    ],
  },
  {
    key: 'marketing',
    features: [
      { key: 'marketing', values: [false, true, true, true] },
      // Tranché par Mounir le 24/11 : 69 € domaine de l'hôtel, dès 149 € domaine dédié chauffé par TriggerFlow.
      { key: 'sendingDomain', values: [false, 'ownDomain', 'dedicatedDomain', 'dedicatedDomain'] },
      // Même droit que les conditions sur les interactions (AbTestGuard de l'app).
      { key: 'abTests', values: [false, false, true, true] },
      { key: 'templateLibrary', values: [true, true, true, true] },
      { key: 'forms', values: [false, false, 5, 'unlimited'] },
      { key: 'salesCatalog', values: [false, false, true, true] },
    ],
  },
  {
    key: 'tools',
    features: [
      { key: 'stats', values: [true, true, true, true] },
      { key: 'groupPortal', values: [false, false, true, true] },
      { key: 'addonsIncluded', values: [false, false, false, true] },
    ],
  },
];

export function getFeature(key: string): ComparisonFeature {
  const feature = COMPARISON_GROUPS.flatMap((group) => group.features).find((f) => f.key === key);
  if (!feature) throw new Error(`Ligne inconnue : ${key}`);
  return feature;
}
