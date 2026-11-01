/**
 * Références mesurées du guide du client OTA.
 *
 * ─── SOURCE ──────────────────────────────────────────────────────────────
 * Étude plateforme « clients OTA » du 1er novembre 2026 (passes 1 et 2, copie
 * de la production en lecture seule) : séjours arrivés du 1er juin au
 * 30 septembre 2026, hors annulés, dans les hôtels équipés d'un formulaire
 * TriggerFlow qui demande l'adresse (au moins 20 captures contrôlées).
 *
 * Définitions : un client OTA est le client principal d'une réservation dont
 * l'adresse d'origine est une adresse relais (Booking.com, Expedia…). Il est
 * « capté » quand il saisit lui-même sa vraie adresse dans un formulaire lié à
 * son séjour, saisie confirmée par l'historique de la fiche. Tous les taux sont
 * exprimés PAR CLIENT OTA, jamais par message ouvert : c'est l'unité que
 * l'hôtelier vérifie dans sa propre base.
 *
 * Ce sont des corrélations. Chaque règle porte en commentaire son contrôle à
 * l'intérieur d'un même hôtel (hôtels qui pratiquent les deux modalités, au
 * moins 30 clients chacune) : c'est ce qui la distingue d'un effet de parc.
 *
 * ─── AUCUN VOLUME ABSOLU EXPORTÉ ─────────────────────────────────────────
 * Ce fichier est importé par des composants clients : tout ce qu'il exporte
 * part dans le bundle du navigateur. Les effectifs restent en commentaire, et
 * le seul compte exporté est celui des hôtels du contrôle, qui ne dit rien de
 * la taille du parc.
 */

/** Une étape du parcours d'un client OTA, sur 100 clients OTA. */
export interface ClientsOtaFunnelStep {
  id: 'guests' | 'reached' | 'formOpened' | 'formSent' | 'captured';
  /** Proportion pour 100 clients OTA, arrondie à l'unité. */
  value: number | null;
  hasNote: boolean;
}

/**
 * Entonnoir du chapitre 1 (mesures M1 à M6, 30 362 clients OTA, 45 hôtels) :
 * 85,8 reçoivent un message porteur, 38,8 ouvrent le formulaire, 30,0
 * l'envoient, 28,4 laissent leur vraie adresse.
 */
export const CLIENTS_OTA_FUNNEL: readonly ClientsOtaFunnelStep[] = [
  { id: 'guests', value: 100, hasNote: false },
  { id: 'reached', value: 86, hasNote: true },
  { id: 'formOpened', value: 39, hasNote: true },
  { id: 'formSent', value: 30, hasNote: true },
  { id: 'captured', value: 28, hasNote: true },
];

/**
 * Taux de capture, tous réglages confondus, dans les hôtels équipés (M6 / M9,
 * définition A0) : 8 629 / 30 362. La méthode du mur du salon (hôtels à au
 * moins 20 captures brutes, capture contrôlée) redonne 27,4 % : les deux disent
 * « un client OTA sur quatre ». Jamais le taux « toutes sources », qui compte
 * aussi les adresses venues du PMS.
 */
export const CLIENTS_OTA_CAPTURE_RATE: number | null = 0.284;

/** Contrôle à l'intérieur d'un même hôtel : sur `of` hôtels qui font les deux, `wins` confirment l'écart. */
export interface WithinHotelCheck {
  wins: number;
  of: number;
}

/** Une règle du chapitre 2 : le réglage, son meilleur et son pire taux de capture. */
export interface ClientsOtaRule {
  id: 'rule1' | 'rule2' | 'rule3' | 'rule4' | 'rule5' | 'rule6' | 'rule7';
  /** Taux de capture par client OTA, en fraction (0.564 = 56,4 %). */
  best: number | null;
  worst: number | null;
  /** `null` : trop peu d'hôtels pratiquent les deux modalités pour vérifier l'écart chez eux. */
  withinHotels: WithinHotelCheck | null;
}

/** Les sept règles retenues par Mounir le 1er novembre 2026, dans l'ordre du guide. */
export const CLIENTS_OTA_RULES: readonly ClientsOtaRule[] = [
  // D1, 1er message porteur : à la réservation (plus de 14 jours avant) 1 564 clients / 22 hôtels,
  // contre le jour d'arrivée 5 042 / 44. Contrôle : 10 hôtels sur 10.
  { id: 'rule1', best: 0.564, worst: 0.19, withinHotels: { wins: 10, of: 10 } },
  // D8, messages porteurs pour un même séjour : 3 et plus 1 191 / 16 (64,8 %), 2 : 9 262 / 29 (40,5 %),
  // 1 : 15 592 / 45 (25,8 %). Contrôle « 3 et plus bat 1 » : 5 hôtels sur 5.
  { id: 'rule2', best: 0.648, worst: 0.258, withinHotels: { wins: 5, of: 5 } },
  // D3, canaux reçus : e-mail + WhatsApp 1 083 / 11, e-mail seul 21 995 / 45. Contrôle : 5 sur 5.
  { id: 'rule3', best: 0.643, worst: 0.295, withinHotels: { wins: 5, of: 5 } },
  // D4, formulaire dédié (mise à jour des coordonnées seule) 1 235 / 7, contre préparation avec
  // catalogue 17 426 / 33 ; D7, 1 à 3 questions 49,1 % (1 158 / 6) contre 7 et plus 31,1 % (20 753 / 37).
  // Contrôle non concluant (2 hôtels sur 5 pour D4, 1 sur 3 pour D7) : écart entre hôtels seulement.
  { id: 'rule4', best: 0.52, worst: 0.334, withinHotels: null },
  // D5a, champ e-mail en première question 1 466 / 9, ailleurs sur la première page 24 018 / 40.
  // Contrôle : 3 hôtels seulement, mince. Écart entre hôtels seulement.
  { id: 'rule5', best: 0.462, worst: 0.322, withinHotels: null },
  // P4d, objet du 1er e-mail porteur : préparer / personnaliser le séjour 6 456 / 11, contre gagner du
  // temps / check-in en ligne 7 533 / 17. Contrôle : 5 hôtels sur 6.
  { id: 'rule6', best: 0.388, worst: 0.278, withinHotels: { wins: 5, of: 6 } },
  // P5c, texte visible du 1er e-mail porteur : moins de 400 caractères 12 162 / 22, contre 400 à 1 000
  // 6 625 / 36. Contrôle : 7 hôtels sur 8. Attention, 1 000 à 2 000 fait 32,3 % : court bat moyen,
  // la longueur seule n'explique pas tout.
  { id: 'rule7', best: 0.345, worst: 0.257, withinHotels: { wins: 7, of: 8 } },
];

/**
 * Écart de capture entre hôtels équipés d'au moins 100 clients OTA (M8, 43 hôtels) : 10 % des hôtels
 * restent sous 11,6 %, 10 % dépassent 49,5 % ; médiane 29,1 %.
 */
export const CLIENTS_OTA_HOTEL_P10 = 0.116;
export const CLIENTS_OTA_HOTEL_P90 = 0.495;
export const CLIENTS_OTA_HOTEL_SPREAD: number | null = CLIENTS_OTA_HOTEL_P90 / CLIENTS_OTA_HOTEL_P10;

/**
 * La seule erreur retenue (E2, hôtels équipés) : aucun message avant l'arrivée, 11,0 % de capture
 * (9 079 clients, soit 29,9 % des clients OTA) contre 35,8 % avec au moins un message (21 283).
 * Les autres erreurs mesurées sont déjà corrigées par défaut dans TriggerFlow.
 */
export const CLIENTS_OTA_MISTAKES = ['noMessage'] as const;

/** Vrai quand toutes les mesures de ce fichier sont renseignées. */
export const CLIENTS_OTA_STUDY_COMPLETE =
  CLIENTS_OTA_CAPTURE_RATE !== null &&
  CLIENTS_OTA_HOTEL_SPREAD !== null &&
  CLIENTS_OTA_FUNNEL.every((step) => step.value !== null) &&
  CLIENTS_OTA_RULES.every((rule) => rule.best !== null && rule.worst !== null);
