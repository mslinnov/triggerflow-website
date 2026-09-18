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
  defaultEnabled: boolean;
}

/** Trié par poids réel dans le chiffre d'affaires, pas par intuition marketing. */
export const UPSELL_SERVICES: readonly UpsellService[] = [
  { id: 'breakfast',    icon: 'Croissant',       revenueShare: 0.3063, medianPrice: 28, defaultEnabled: true },
  { id: 'restaurant',   icon: 'UtensilsCrossed', revenueShare: 0.1844, medianPrice: 58, defaultEnabled: true },
  { id: 'spa',          icon: 'Flower2',         revenueShare: 0.1814, medianPrice: 96, defaultEnabled: true },
  { id: 'parking',      icon: 'CircleParking',   revenueShare: 0.0650, medianPrice: 23, defaultEnabled: true },
  { id: 'activities',   icon: 'Bike',            revenueShare: 0.0631, medianPrice: 66, defaultEnabled: false },
  { id: 'welcome',      icon: 'Heart',           revenueShare: 0.0519, medianPrice: 30, defaultEnabled: true },
  { id: 'bar',          icon: 'Wine',            revenueShare: 0.0399, medianPrice: 29, defaultEnabled: true },
  { id: 'pets',         icon: 'PawPrint',        revenueShare: 0.0382, medianPrice: 15, defaultEnabled: true },
  { id: 'transfer',     icon: 'Car',             revenueShare: 0.0207, medianPrice: 52, defaultEnabled: false },
  { id: 'earlyCheckin', icon: 'Sunrise',         revenueShare: 0.0178, medianPrice: 15, defaultEnabled: true },
  { id: 'lateCheckout', icon: 'Clock',           revenueShare: 0.0175, medianPrice: 20, defaultEnabled: true },
  { id: 'roomUpgrade',  icon: 'ArrowUpRight',    revenueShare: 0.0139, medianPrice: 10, defaultEnabled: false },
] as const;

/**
 * Taux d'acceptation mesurés par fenêtre d'envoi (rapport §4b).
 *
 * Source unique : le simulateur y prend son taux, la section « le canal et le
 * moment » y prend ses barres. Les deux affichaient la même mesure recopiée à
 * la main dans deux fichiers et deux unités, l'un en fraction, l'autre en
 * pourcentage. Or tout l'argument de la page tient à ce que le chiffre du
 * simulateur soit celui de la fenêtre montrée juste en dessous : le laisser
 * reposer sur un commentaire, c'était accepter qu'il se désaligne en silence.
 *
 * ⚠️ `twoDays` et `sameDay` portent le même volume d'envois, ce qui ressemble
 * à une recopie fautive du rapport. Le volume n'est pas affiché, donc rien
 * n'est faux à l'écran, mais c'est à revérifier à la prochaine extraction.
 */
export interface SendWindow {
  id: string;
  /** Part des offres envoyées dans cette fenêtre qui donnent lieu à une vente. */
  acceptanceRate: number;
  sends: number;
  /** Fenêtre utilisée par les scénarios livrés préréglés. */
  isDefaultScenario: boolean;
}

export const SEND_WINDOWS: readonly SendWindow[] = [
  { id: 'longBefore',    acceptanceRate: 0.0515, sends: 36708, isDefaultScenario: true },
  { id: 'twoDays',       acceptanceRate: 0.0347, sends: 17792, isDefaultScenario: false },
  { id: 'sameDay',       acceptanceRate: 0.0167, sends: 17792, isDefaultScenario: false },
  { id: 'afterArrival',  acceptanceRate: 0.0020, sends: 1464,  isDefaultScenario: false },
] as const;

export const DEFAULT_SEND_WINDOW =
  SEND_WINDOWS.find((window) => window.isDefaultScenario) ?? SEND_WINDOWS[0];

/**
 * Hypothèses globales du simulateur.
 *
 * ─── POURQUOI 5,15 % ET NON 3,78 % ───────────────────────────────────────
 * 3,78 % est la moyenne de TOUS les envois de la base, fenêtres d'envoi
 * confondues. Elle mélange donc des envois bien programmés et des envois
 * tardifs qui ne convertissent presque pas : 1,67 % le jour de l'arrivée,
 * 0,20 % après. Cette moyenne décrit la base historique, pas un hôtel équipé
 * par nos soins.
 *
 * Les scénarios livrés partent dans la fenêtre 3 à 7 jours avant l'arrivée,
 * où le taux mesuré est de 5,15 % sur 36 708 envois (rapport §4b, même chiffre
 * que celui affiché dans la section « le moment compte »). C'est l'hypothèse
 * correcte pour simuler un établissement qui démarre aujourd'hui avec le
 * paramétrage par défaut, et le simulateur l'énonce dans son bloc méthodologie.
 *
 * ─── REPÈRES MARCHÉ ──────────────────────────────────────────────────────
 * Le modèle sort à ~29 € de revenu additionnel par chambre et par mois pour un
 * 40 chambres à 70 % d'occupation. Oaky, sur 1 100 hôtels, publie 29 €/chambre/
 * mois en moyenne sur les 5 étoiles, 38,39 € sur les resorts de montagne, et un
 * maximum observé à 141 €. On reste donc au milieu de la fourchette du marché,
 * loin du haut, ce qui est la bonne place pour un simulateur d'acquisition.
 */
export const SIMULATOR_ASSUMPTIONS = {
  /** Taux d'acceptation de la fenêtre d'envoi utilisée par les scénarios
   *  livrés, soit 3 à 7 jours avant l'arrivée. Lu dans `SEND_WINDOWS` plutôt
   *  que recopié, pour rester aligné avec la section qui l'affiche. */
  acceptanceRate: DEFAULT_SEND_WINDOW.acceptanceRate,
  /** Panier moyen d'une vente : 179 047 € pour 3 374 conversions. */
  averageBasket: 53.07,
  /** ⚠️ ESTIMÉE, non mesurée. Sert à convertir les nuitées en séjours. */
  averageLengthOfStay: 1.8,
  daysPerMonth: 30,
} as const;

/** Chiffre d'affaires additionnel par envoi bien programmé : 2,73 €. */
export const REVENUE_PER_SEND =
  SIMULATOR_ASSUMPTIONS.acceptanceRate * SIMULATOR_ASSUMPTIONS.averageBasket;

/**
 * Volumétrie de production.
 *
 * `facilities` couvre le parc TriggerFlow et Utelys réunis. `referenceHotels`
 * est le sous-ensemble qui a configuré un catalogue et lancé des campagnes :
 * c'est lui, et lui seul, qui sert de base au simulateur.
 *
 * Aucun volume absolu de ventes ici : ni le nombre d'offres envoyées, ni le
 * chiffre d'affaires cumulé. Ce fichier est importé par un composant client,
 * donc tout ce qu'il contient part dans le bundle du navigateur, affiché ou
 * non. Ces deux valeurs renseignaient la concurrence sur notre taille ; elles
 * ont été retirées des guides pour la même raison. Les résultats se formulent
 * en taux, jamais en cumul.
 */
export const PRODUCTION_FIGURES = {
  facilities: 400,
  referenceHotels: 53,
} as const;

/**
 * Ce que l'hôtelier gagne, exprimé de son côté du guichet et non du nôtre.
 *
 * - `revenuePerRoom` : sortie directe du modèle ci-dessus pour un 40 chambres
 *   à 70 % d'occupation, donc cohérente au centime près avec le simulateur.
 * - `ancillaryUplift` : progression du chiffre d'affaires annexe. Volontairement
 *   posée sous les repères publiés du marché, qui vont de +15 à +22 % de TRevPAR
 *   pour un programme d'upsell systématisé, et jusqu'à ×2,1 de revenu annexe par
 *   client pour le pré-arrivée digital comparé à la seule vente au comptoir.
 * - `marginRate` : early check-in, late check-out et surclassement se vendent
 *   sans coût variable. La vente tombe en marge nette, à la commission bancaire
 *   près.
 */
export const HOTEL_VALUE_FIGURES = {
  revenuePerRoom: 29,
  ancillaryUplift: 21,
  marginRate: 100,
} as const;

export const SIMULATOR_BOUNDS = {
  rooms: { min: 10, max: 200, step: 1, default: 40 },
  occupancy: { min: 30, max: 100, step: 1, default: 70 },
} as const;

export const DEFAULT_ENABLED_SERVICE_IDS: readonly string[] = UPSELL_SERVICES.filter(
  (service) => service.defaultEnabled
).map((service) => service.id);
