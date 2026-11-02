/**
 * Simulateur de commissions évitées de la landing du guide du client OTA.
 * Mécanique reprise de l'idée « simulateur OTA direct » : trois étapes de capture, puis un retour en direct.
 *
 * ─── MODÈLE ──────────────────────────────────────────────────────────────
 *   part captée        = 1 − (1 − c1)(1 − c2)(1 − c3)
 *                        c1 : formulaire avant l'arrivée (envoyé à la réservation)
 *                        c2 : à l'arrivée, sur les clients encore sans adresse
 *                        c3 : enquête après le séjour, sur ceux qui restent
 *   clients captés     = séjours OTA par an × part captée
 *   retours en direct  = clients captés × taux de retour en direct (24 mois)
 *   CA direct          = retours en direct × panier moyen
 *   commission évitée  = CA direct × taux de commission
 *
 * Les étapes se cumulent sur les clients RESTANTS : un client qui a déjà
 * donné son adresse avant l'arrivée ne compte pas une seconde fois à l'arrivée.
 * Les clients sont arrondis à l'unité à chaque étape, pour que le détail
 * affiché retombe exactement sur le montant.
 *
 * ─── VALEURS PAR DÉFAUT ──────────────────────────────────────────────────
 * Les trois étapes par défaut (20 %, puis 7 % et 3 % des clients restants) se
 * cumulent en 27,8 % : la part captée mesurée par l'étude, environ 28 %, celle
 * qu'affiche le bandeau de la page (`CLIENTS_OTA_CAPTURE_RATE`). L'étude ne
 * donne qu'un total, pas le partage entre les étapes : ce partage, le retour en
 * direct, le panier et la commission restent des hypothèses, affichées comme
 * telles. Le test vérifie que le total par défaut ne s'écarte pas de la mesure.
 */

export interface OtaSimulatorInput {
  otaStaysPerYear: number;
  /** Montant moyen d'un séjour OTA, en euros. */
  averageBasket: number;
  /** Pourcentages de 0 à 100. */
  commissionRate: number;
  captureBeforeArrival: number;
  captureAtArrival: number;
  captureSurvey: number;
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

/** Bornes et valeurs par défaut des curseurs : part captée par défaut calée sur la mesure de l'étude. */
export const OTA_SIMULATOR_BOUNDS = {
  otaStaysPerYear: { min: 100, max: 20_000, step: 100, default: 3000 },
  averageBasket: { min: 60, max: 1000, step: 10, default: 320 },
  commissionRate: { min: 10, max: 25, step: 1, default: 17 },
  captureBeforeArrival: { min: 0, max: 60, step: 1, default: 20 },
  captureAtArrival: { min: 0, max: 60, step: 1, default: 7 },
  captureSurvey: { min: 0, max: 40, step: 1, default: 3 },
  directReturnRate: { min: 1, max: 30, step: 1, default: 8 },
} as const;

const EMPTY: OtaSimulatorResult = {
  capturedGuests: 0,
  directReturns: 0,
  directRevenue: 0,
  avoidedCommission: 0,
};

/** Fraction d'un pourcentage borné à [0, 100]. */
function toFraction(percent: number): number {
  return Math.min(Math.max(percent, 0), 100) / 100;
}

/** Part des clients OTA dont l'adresse est récupérée sur l'ensemble des trois étapes, entre 0 et 1. */
export function capturedShare(input: Pick<OtaSimulatorInput, 'captureBeforeArrival' | 'captureAtArrival' | 'captureSurvey'>): number {
  return (
    1 -
    (1 - toFraction(input.captureBeforeArrival)) *
      (1 - toFraction(input.captureAtArrival)) *
      (1 - toFraction(input.captureSurvey))
  );
}

export function calculateAvoidedCommission(input: OtaSimulatorInput): OtaSimulatorResult {
  if (Object.values(input).some((value) => !Number.isFinite(value) || value < 0)) return EMPTY;

  const capturedGuests = Math.round(input.otaStaysPerYear * capturedShare(input));
  const directReturns = Math.round(capturedGuests * toFraction(input.directReturnRate));
  const directRevenue = directReturns * input.averageBasket;
  const avoidedCommission = Math.round(directRevenue * toFraction(input.commissionRate));

  return { capturedGuests, directReturns, directRevenue, avoidedCommission };
}
