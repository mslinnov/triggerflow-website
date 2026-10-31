/**
 * Références mesurées du guide du client OTA.
 *
 * ─── SOURCE ──────────────────────────────────────────────────────────────
 * Étude plateforme « clients OTA », été 2026 (arrivées du 1er juin au
 * 30 septembre 2026), dépôt triggerflow,
 * `docs/superpowers/reports/2026-11-xx-clients-ota-analyse-plateforme.md`.
 * Définitions : un client OTA est le client principal d'une réservation dont
 * l'adresse d'origine est une adresse relais (Booking.com, Expedia…) ; il est
 * « capté » quand il saisit sa vraie adresse dans un formulaire TriggerFlow lié
 * à son séjour. Tous les taux sont exprimés PAR CLIENT OTA, jamais par message
 * ouvert : c'est l'unité que l'hôtelier vérifie dans sa propre base.
 *
 * ─── SQUELETTE ───────────────────────────────────────────────────────────
 * Les valeurs `null` attendent l'étude. Tant qu'une seule reste à `null`, la
 * page affiche « … » à sa place et ne doit pas être publiée :
 * `CLIENTS_OTA_STUDY_COMPLETE` le dit en un seul endroit.
 *
 * ─── AUCUN VOLUME ABSOLU EXPORTÉ ─────────────────────────────────────────
 * Ce fichier est importé par des composants clients : tout ce qu'il exporte
 * part dans le bundle du navigateur. Les effectifs (clients, hôtels) de chaque
 * mesure restent en commentaire, comme dans `post-stay.ts`.
 */

/** Une étape du parcours d'un client OTA, sur 100 clients OTA. */
export interface ClientsOtaFunnelStep {
  id: 'guests' | 'reached' | 'formOpened' | 'formSent' | 'captured';
  /** Proportion pour 100 clients OTA, `null` tant que l'étude n'est pas rentrée. */
  value: number | null;
  hasNote: boolean;
}

/** Entonnoir du chapitre 1 (mesures M1 à M6 de l'étude). */
export const CLIENTS_OTA_FUNNEL: readonly ClientsOtaFunnelStep[] = [
  { id: 'guests', value: 100, hasNote: false },
  { id: 'reached', value: null, hasNote: true },
  { id: 'formOpened', value: null, hasNote: true },
  { id: 'formSent', value: null, hasNote: true },
  { id: 'captured', value: null, hasNote: true },
];

/**
 * Taux de capture, tous réglages confondus, dans les hôtels où le formulaire
 * tourne. Mesuré le 15/10/2026 à environ 27 % (« un client OTA sur quatre »),
 * à recalculer sur le périmètre de l'étude (mesure M9). Jamais le taux
 * « toutes sources », qui compte aussi les adresses venues du PMS.
 */
export const CLIENTS_OTA_CAPTURE_RATE: number | null = null;

/** Une règle du chapitre 2 : le réglage, son meilleur et son pire taux de capture. */
export interface ClientsOtaRule {
  id: 'rule1' | 'rule2' | 'rule3' | 'rule4' | 'rule5';
  /** Taux de capture par client OTA, en fraction (0.27 = 27 %). */
  best: number | null;
  worst: number | null;
}

/** Les cinq règles retenues après l'étude (proposées à Mounir avant rédaction). */
export const CLIENTS_OTA_RULES: readonly ClientsOtaRule[] = [
  { id: 'rule1', best: null, worst: null },
  { id: 'rule2', best: null, worst: null },
  { id: 'rule3', best: null, worst: null },
  { id: 'rule4', best: null, worst: null },
  { id: 'rule5', best: null, worst: null },
];

/** Écart de taux de capture entre les meilleurs et les moins bons hôtels (mesure M8). */
export const CLIENTS_OTA_HOTEL_SPREAD: number | null = null;

/** Les trois erreurs retenues (mesures E1 à E7), chiffre affiché en clair. */
export const CLIENTS_OTA_MISTAKES = ['mistake1', 'mistake2', 'mistake3'] as const;

/** Vrai quand toutes les mesures de ce fichier sont renseignées. */
export const CLIENTS_OTA_STUDY_COMPLETE =
  CLIENTS_OTA_CAPTURE_RATE !== null &&
  CLIENTS_OTA_HOTEL_SPREAD !== null &&
  CLIENTS_OTA_FUNNEL.every((step) => step.value !== null) &&
  CLIENTS_OTA_RULES.every((rule) => rule.best !== null && rule.worst !== null);
