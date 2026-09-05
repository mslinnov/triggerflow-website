/**
 * Résultats réellement observés chez des clients TriggerFlow.
 *
 * Source : audit de la base de production du 2026-09-05, §5. Établissements
 * anonymisés, retenus à partir de 4 mois d'activité minimum. Le nombre de
 * chambres est la valeur déclarée en fiche établissement.
 *
 * Le domaine à 5 975 €/mois du §5 est volontairement écarté : le rapport le
 * qualifie de non représentatif (mix à 39 % de spa et 26 % de restaurant, soit
 * de la commande de prestations sur place plutôt que de la vente additionnelle),
 * et son nombre de chambres n'est pas fiable.
 */

export interface UpsellResult {
  /** Clé de traduction du profil et du mix (messages/{fr,en}.json). */
  id: string;
  rooms: number;
  monthsObserved: number;
  monthlyRevenue: number;
  revenuePerRoom: number;
}

export const UPSELL_RESULTS: readonly UpsellResult[] = [
  { id: 'urban',       rooms: 43, monthsObserved: 4, monthlyRevenue: 2024, revenuePerRoom: 47 },
  { id: 'independent', rooms: 30, monthsObserved: 7, monthlyRevenue: 1288, revenuePerRoom: 43 },
  { id: 'charm',       rooms: 43, monthsObserved: 6, monthlyRevenue: 1377, revenuePerRoom: 32 },
] as const;

/** Deux cas supplémentaires cités en note sous le tableau. */
export const UPSELL_RESULTS_FOOTNOTE = [
  { rooms: 27, monthlyRevenue: 1259 },
  { rooms: 37, monthlyRevenue: 1304 },
] as const;
