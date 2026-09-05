/**
 * Prestations et hypothèses du simulateur de ventes additionnelles.
 *
 * ─── SOURCE ──────────────────────────────────────────────────────────────
 * Toutes les valeurs viennent de l'audit de la base de production du
 * 2026-09-05 (docs/superpowers/reports/2026-09-05-benchmarks-upsell.md),
 * périmètre : 89 347 offres envoyées, 201 439 € de ventes, 53 établissements,
 * hors établissements de démonstration et envois de test.
 *
 * ─── CE QUE LE MODÈLE NE FAIT PAS ────────────────────────────────────────
 * Il ne somme PAS un taux d'acceptation par prestation. Le rapport (§2b) est
 * formel : un envoi expose tout le catalogue, donc les taux par type partagent
 * le même dénominateur et ne s'additionnent pas. Le modèle part du taux global
 * réellement mesuré, puis répartit le revenu selon le mix de ventes observé.
 *
 * ─── BIAIS À ÉNONCER ─────────────────────────────────────────────────────
 * Les 53 établissements de référence sont ceux qui ont configuré un catalogue
 * et lancé des campagnes. Les chiffres décrivent donc la performance d'un hôtel
 * qui utilise réellement la fonctionnalité. C'est l'hypothèse correcte pour un
 * simulateur, à condition de l'écrire, ce que fait le bloc méthodologie.
 */

export interface UpsellService {
  id: string;
  /** Nom d'icône lucide-react. */
  icon: string;
  /** Part du chiffre d'affaires additionnel observé, entre 0 et 1. Somme = 1. */
  revenueShare: number;
  /** Panier médian constaté par vente, en euros. Médiane et non moyenne : la
   *  distribution est très asymétrique (rapport §3). */
  medianPrice: number;
  /** Nombre d'établissements ayant réellement vendu cette prestation. */
  hotelCount: number;
  defaultEnabled: boolean;
}

/** Trié par poids réel dans le chiffre d'affaires, pas par intuition marketing. */
export const UPSELL_SERVICES: readonly UpsellService[] = [
  { id: 'breakfast',    icon: 'Croissant',       revenueShare: 0.3063, medianPrice: 28, hotelCount: 46, defaultEnabled: true },
  { id: 'restaurant',   icon: 'UtensilsCrossed', revenueShare: 0.1844, medianPrice: 58, hotelCount: 17, defaultEnabled: true },
  { id: 'spa',          icon: 'Flower2',         revenueShare: 0.1814, medianPrice: 96, hotelCount: 21, defaultEnabled: true },
  { id: 'parking',      icon: 'CircleParking',   revenueShare: 0.0650, medianPrice: 23, hotelCount: 10, defaultEnabled: true },
  { id: 'activities',   icon: 'Bike',            revenueShare: 0.0631, medianPrice: 66, hotelCount: 10, defaultEnabled: false },
  { id: 'welcome',      icon: 'Heart',           revenueShare: 0.0519, medianPrice: 30, hotelCount: 28, defaultEnabled: true },
  { id: 'bar',          icon: 'Wine',            revenueShare: 0.0399, medianPrice: 29, hotelCount: 22, defaultEnabled: true },
  { id: 'pets',         icon: 'PawPrint',        revenueShare: 0.0382, medianPrice: 15, hotelCount: 24, defaultEnabled: true },
  { id: 'transfer',     icon: 'Car',             revenueShare: 0.0207, medianPrice: 52, hotelCount: 9,  defaultEnabled: false },
  { id: 'earlyCheckin', icon: 'Sunrise',         revenueShare: 0.0178, medianPrice: 15, hotelCount: 18, defaultEnabled: true },
  { id: 'lateCheckout', icon: 'Clock',           revenueShare: 0.0175, medianPrice: 20, hotelCount: 22, defaultEnabled: true },
  { id: 'roomUpgrade',  icon: 'ArrowUpRight',    revenueShare: 0.0139, medianPrice: 10, hotelCount: 8,  defaultEnabled: false },
] as const;

/**
 * Hypothèses globales. Toutes mesurées, sauf la durée moyenne de séjour :
 * la base ne la stocke pas, c'est la seule valeur estimée du modèle et elle est
 * signalée comme telle dans le bloc méthodologie de la page.
 */
export const SIMULATOR_ASSUMPTIONS = {
  /** Part des envois d'upsell qui donnent lieu à une vente. Mesuré : 3 374 / 89 347.
   *  Stable à 3,79 % sur 12 mois glissants, donc pas un artefact de période. */
  acceptanceRate: 0.0378,
  /** Panier moyen d'une vente : 179 047 € pour 3 374 conversions. */
  averageBasket: 53.07,
  /** ⚠️ ESTIMÉE, non mesurée. Sert à convertir les nuitées en séjours. */
  averageLengthOfStay: 1.8,
  daysPerMonth: 30,
} as const;

/** Chiffre d'affaires additionnel par envoi : 2,00 € constatés. */
export const REVENUE_PER_SEND =
  SIMULATOR_ASSUMPTIONS.acceptanceRate * SIMULATOR_ASSUMPTIONS.averageBasket;

/** Volumétrie affichée dans la barre de réassurance. Chiffres bruts du rapport. */
export const PRODUCTION_FIGURES = {
  facilities: 170,
  offersSent: 89347,
  revenueGenerated: 201439,
  referenceHotels: 53,
} as const;

export const SIMULATOR_BOUNDS = {
  rooms: { min: 10, max: 200, step: 1, default: 40 },
  occupancy: { min: 30, max: 100, step: 1, default: 70 },
} as const;

export const DEFAULT_ENABLED_SERVICE_IDS: readonly string[] = UPSELL_SERVICES.filter(
  (service) => service.defaultEnabled
).map((service) => service.id);
