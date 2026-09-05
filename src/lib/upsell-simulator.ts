/**
 * Moteur de calcul du simulateur de ventes additionnelles.
 *
 * Fonction pure, sans dépendance UI : les deux variantes A/B de la landing page
 * partagent ce moteur, ce qui garantit le même chiffre pour les mêmes entrées.
 *
 * ─── MODÈLE ──────────────────────────────────────────────────────────────
 *   nuitées = chambres × jours/mois × occupation
 *   séjours = nuitées / durée moyenne de séjour
 *   envois  = séjours                          (une campagne d'upsell par séjour)
 *   revenu  = Σ ( envois × revenu par envoi × part du mix de la prestation )
 *
 * Le revenu par envoi (2,00 €) et le mix de ventes sont mesurés sur la base de
 * production. Désactiver une prestation retire sa part du mix : le revenu baisse
 * mécaniquement, sans jamais additionner des taux qui partagent un dénominateur
 * commun (cf. l'avertissement §2b du rapport, repris dans upsell-services.ts).
 */

import {
  REVENUE_PER_SEND,
  SIMULATOR_ASSUMPTIONS,
  UPSELL_SERVICES,
} from '@/data/upsell-services';

export interface SimulatorInput {
  rooms: number;
  /** Taux d'occupation en pourcentage (0-100). */
  occupancyRate: number;
  enabledServiceIds: readonly string[];
}

export interface ServiceBreakdown {
  serviceId: string;
  icon: string;
  /** Ventes mensuelles estimées pour cette prestation. */
  salesPerMonth: number;
  monthlyRevenue: number;
  /** Part de cette prestation dans le revenu affiché, entre 0 et 1. */
  share: number;
}

export interface SimulatorResult {
  monthlyNights: number;
  monthlyStays: number;
  /** Envois d'upsell par mois, égal au nombre de séjours. */
  monthlySends: number;
  /** Ventes conclues par mois, tous services confondus. */
  monthlySales: number;
  monthlyRevenue: number;
  yearlyRevenue: number;
  revenuePerRoom: number;
  breakdown: ServiceBreakdown[];
}

const EMPTY_RESULT: SimulatorResult = {
  monthlyNights: 0,
  monthlyStays: 0,
  monthlySends: 0,
  monthlySales: 0,
  monthlyRevenue: 0,
  yearlyRevenue: 0,
  revenuePerRoom: 0,
  breakdown: [],
};

/**
 * Estime le revenu additionnel mensuel d'un établissement.
 * Robuste aux entrées aberrantes : toute valeur non finie ou négative est
 * ramenée à zéro plutôt que de produire un NaN affiché à l'écran.
 */
export function calculateUpsellRevenue(input: SimulatorInput): SimulatorResult {
  const rooms = Math.max(0, Number.isFinite(input.rooms) ? input.rooms : 0);
  const occupancy = clamp(
    Number.isFinite(input.occupancyRate) ? input.occupancyRate : 0,
    0,
    100
  );

  if (rooms === 0 || occupancy === 0 || input.enabledServiceIds.length === 0) {
    return EMPTY_RESULT;
  }

  const monthlyNights = rooms * SIMULATOR_ASSUMPTIONS.daysPerMonth * (occupancy / 100);
  const monthlySends = monthlyNights / SIMULATOR_ASSUMPTIONS.averageLengthOfStay;

  const enabled = new Set(input.enabledServiceIds);
  const rows = UPSELL_SERVICES.filter((service) => enabled.has(service.id)).map((service) => {
    const monthlyRevenue = monthlySends * REVENUE_PER_SEND * service.revenueShare;
    return {
      serviceId: service.id,
      icon: service.icon,
      monthlyRevenue,
      salesPerMonth: monthlyRevenue / service.medianPrice,
    };
  });

  const monthlyRevenue = rows.reduce((total, row) => total + row.monthlyRevenue, 0);

  const breakdown: ServiceBreakdown[] = rows
    .map((row) => ({
      serviceId: row.serviceId,
      icon: row.icon,
      salesPerMonth: Math.round(row.salesPerMonth),
      monthlyRevenue: Math.round(row.monthlyRevenue),
      share: monthlyRevenue > 0 ? row.monthlyRevenue / monthlyRevenue : 0,
    }))
    .sort((a, b) => b.monthlyRevenue - a.monthlyRevenue);

  return {
    monthlyNights: Math.round(monthlyNights),
    monthlyStays: Math.round(monthlySends),
    monthlySends: Math.round(monthlySends),
    monthlySales: Math.round(monthlySends * SIMULATOR_ASSUMPTIONS.acceptanceRate),
    monthlyRevenue: Math.round(monthlyRevenue),
    yearlyRevenue: Math.round(monthlyRevenue * 12),
    revenuePerRoom: Math.round(monthlyRevenue / rooms),
    breakdown,
  };
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/** Formate un montant en euros, sans décimales (ex. « 845 € »). */
export function formatEuros(amount: number, locale: string): string {
  return new Intl.NumberFormat(locale === 'en' ? 'en-GB' : 'fr-FR', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(amount);
}
