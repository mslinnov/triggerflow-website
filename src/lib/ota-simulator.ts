/**
 * Simulateur de commissions évitées de la landing du guide du client OTA.
 *
 * ─── MODÈLE ──────────────────────────────────────────────────────────────
 *   clients captés     = séjours OTA par an × taux de capture
 *   retours en direct  = clients captés × taux de retour en direct
 *   CA direct          = retours en direct × panier moyen
 *   commission évitée  = CA direct × taux de commission
 *
 * Les clients sont arrondis à l'unité à chaque étape : le visiteur lit « 50
 * retours en direct », pas « 49,7 », et le montant affiché doit retomber
 * exactement sur ce nombre multiplié par le panier.
 *
 * ─── HYPOTHÈSES, PAS MESURES ─────────────────────────────────────────────
 * Seul le taux de capture par défaut s'appuie sur une mesure (environ un
 * client OTA sur quatre, voir `@/data/clients-ota`). Le taux de retour en
 * direct, le panier et la commission sont des hypothèses illustratives que le
 * visiteur règle lui-même : la page doit le dire en clair à côté du résultat.
 */

export interface OtaSimulatorInput {
  otaStaysPerYear: number;
  /** Montant moyen d'un séjour OTA, en euros. */
  averageBasket: number;
  /** Pourcentages de 0 à 100. */
  commissionRate: number;
  captureRate: number;
  directReturnRate: number;
}

export interface OtaSimulatorResult {
  capturedGuests: number;
  directReturns: number;
  /** Chiffre d'affaires des séjours revenus en direct, en euros. */
  directRevenue: number;
  /** Commission qui n'est pas versée à l'OTA sur ces séjours, en euros. */
  avoidedCommission: number;
}

/** Bornes et valeurs par défaut des curseurs. */
export const OTA_SIMULATOR_BOUNDS = {
  otaStaysPerYear: { min: 100, max: 10_000, step: 100, default: 2000 },
  averageBasket: { min: 60, max: 800, step: 10, default: 250 },
  commissionRate: { min: 10, max: 25, step: 1, default: 17 },
  captureRate: { min: 5, max: 50, step: 1, default: 25 },
  directReturnRate: { min: 1, max: 30, step: 1, default: 10 },
} as const;

const EMPTY: OtaSimulatorResult = {
  capturedGuests: 0,
  directReturns: 0,
  directRevenue: 0,
  avoidedCommission: 0,
};

/** Fraction d'un pourcentage borné à [0, 100]. */
function toFraction(percent: number): number {
  return Math.min(percent, 100) / 100;
}

export function calculateAvoidedCommission(input: OtaSimulatorInput): OtaSimulatorResult {
  const values = Object.values(input);
  if (values.some((value) => !Number.isFinite(value) || value <= 0)) return EMPTY;

  const capturedGuests = Math.round(input.otaStaysPerYear * toFraction(input.captureRate));
  const directReturns = Math.round(capturedGuests * toFraction(input.directReturnRate));
  const directRevenue = directReturns * input.averageBasket;
  const avoidedCommission = Math.round(directRevenue * toFraction(input.commissionRate));

  return { capturedGuests, directReturns, directRevenue, avoidedCommission };
}
