/**
 * Références mesurées de l'e-mail post-séjour.
 *
 * ─── SOURCE ──────────────────────────────────────────────────────────────
 * Analyse plateforme du 18 septembre 2026, dépôt triggerflow,
 * `docs/superpowers/reports/2026-09-18-post-stay-analyse-plateforme.pdf` :
 * 94 e-mails post-séjour, 42 369 envois, 50 établissements, du 1er juin au
 * 15 septembre 2026. Le classement par critère est calculé sur les 56 e-mails
 * qui portent réellement un lien vers un formulaire, soit 34 255 envois.
 *
 * Toutes les valeurs de ce fichier sont des taux d'avis complétés par e-mail
 * ENVOYÉ, jamais par e-mail ouvert : c'est la seule unité comparable d'un
 * réglage à l'autre, et c'est celle que l'hôtelier vérifie sur sa propre base.
 *
 * Ce sont des mesures, pas des valeurs d'ajustement. Chacune porte en
 * commentaire son volume d'envois, pour qu'on puisse la contester sans ouvrir
 * le rapport : un taux adossé à 557 envois ne se discute pas comme un taux
 * adossé à 14 683.
 *
 * ─── AUCUN VOLUME ABSOLU EXPORTÉ ─────────────────────────────────────────
 * Ce fichier est importé par un composant client, donc tout ce qu'il exporte
 * part dans le bundle du navigateur, affiché ou non. Les volumes d'envois
 * restent donc en commentaire, où ils documentent la mesure et disparaissent
 * à la minification. Les résultats se formulent en taux, jamais en cumul.
 */

/** Une référence mesurée : un réglage, son taux d'avis complétés. */
export interface PostStayReference {
  /** Identifiant stable, aussi utilisé comme clé de traduction. */
  id: string;
  /** Taux d'avis complétés par e-mail envoyé, en fraction (0.188 = 18,8 %). */
  completionRate: number;
  /**
   * false = valeur interpolée, absente du rapport. À ne jamais citer comme une
   * mesure, ni à l'écran ni dans un argumentaire.
   */
  isMeasured: boolean;
}

/**
 * Heure d'envoi. C'est le critère le plus puissant de toute l'analyse : un
 * facteur sept entre le meilleur et le pire créneau, à contenu comparable.
 *
 * L'ordre n'est pas celui de la journée, et ce n'est pas une erreur de saisie :
 * le créneau 17 h - 20 h (10,2 %) fait mieux que 11 h - 14 h (8,0 %) et que
 * 14 h - 17 h (6,9 %). Le rapport l'explique par la disponibilité du lecteur,
 * pas par l'heure elle-même : un e-mail de milieu de journée est ouvert au
 * travail, sans le temps de remplir un formulaire.
 */
export const POST_STAY_SEND_HOURS = [
  // Aucun groupe « avant 9 h » dans le rapport : trop peu d'envois pour être
  // isolé. La valeur est alignée sur le plus faible créneau de journée plutôt
  // qu'inventée, parce que la recette de référence déconseille explicitement
  // le tout début de matinée, où le client est souvent encore dans l'hôtel.
  // Repère prudent, pas une mesure : `isMeasured` est à false.
  { id: 'beforeNine', completionRate: 0.069, isMeasured: false },
  // 6 579 envois, 70,1 % d'ouverture, 22,2 % de formulaires ouverts.
  { id: 'nineToEleven', completionRate: 0.188, isMeasured: true },
  // 14 683 envois. Le créneau le plus utilisé de la plateforme, et l'un des
  // moins performants.
  { id: 'elevenToFourteen', completionRate: 0.08, isMeasured: true },
  // 3 234 envois. 77,4 % d'ouverture pour 6,9 % d'avis : on ouvre beaucoup et
  // on remplit peu, c'est le contre-exemple qui montre que l'ouverture ne dit
  // rien de la complétion.
  { id: 'fourteenToSeventeen', completionRate: 0.069, isMeasured: true },
  // 9 202 envois.
  { id: 'seventeenToTwenty', completionRate: 0.102, isMeasured: true },
  // 557 envois seulement : le taux est le plus faible de tous, mais c'est
  // aussi le groupe le plus fragile de la table.
  { id: 'afterTwenty', completionRate: 0.025, isMeasured: true },
] as const satisfies readonly PostStayReference[];

export type SendHourId = (typeof POST_STAY_SEND_HOURS)[number]['id'];

/**
 * Forme de l'appel à l'action dans l'e-mail.
 *
 * La rangée d'étoiles cliquables est le piège le plus coûteux de la
 * plateforme : elle promet au client de noter son séjour en un clic, mais la
 * note cliquée n'est pas transmise, et il arrive sur un formulaire qui lui
 * repose la question. Le clic est au rendez-vous (13,7 %), la complétion non.
 */
export const POST_STAY_CTA_SHAPES = [
  // Un seul lien vers le formulaire.
  { id: 'singleButton', completionRate: 0.135, isMeasured: true },
  { id: 'starRow', completionRate: 0.037, isMeasured: true },
] as const satisfies readonly PostStayReference[];

export type CtaShapeId = (typeof POST_STAY_CTA_SHAPES)[number]['id'];

/**
 * Présence d'un lien direct vers une plateforme d'avis (TripAdvisor, Google)
 * dans le même e-mail. Le lien concurrent n'ajoute pas un chemin, il en
 * détourne un : le client part noter ailleurs, ou ne fait rien.
 */
export const POST_STAY_REVIEW_LINK = {
  absent: { id: 'reviewLinkAbsent', completionRate: 0.15, isMeasured: true },
  present: { id: 'reviewLinkPresent', completionRate: 0.058, isMeasured: true },
} as const satisfies Record<string, PostStayReference>;

/**
 * Taux d'avis complétés de la plateforme entière, tous réglages confondus :
 * 4 238 avis pour 42 369 envois. Sert de repère neutre à l'écran, et de
 * définition du « réglage sans effet » dans le moteur de calcul : un réglage
 * qui vaut exactement cette référence ne déplace pas le résultat.
 */
export const PLATFORM_COMPLETION_RATE = 0.1;

/**
 * Meilleur taux jamais observé, toutes mesures confondues. Dérivé des
 * constantes ci-dessus plutôt que recopié, pour qu'il suive automatiquement
 * une prochaine extraction. Le moteur s'en sert de plafond : aucune
 * combinaison de réglages ne peut annoncer mieux que ce qui a été mesuré.
 */
export const BEST_OBSERVED_COMPLETION_RATE = Math.max(
  ...POST_STAY_SEND_HOURS.map((reference) => reference.completionRate),
  ...POST_STAY_CTA_SHAPES.map((reference) => reference.completionRate),
  POST_STAY_REVIEW_LINK.absent.completionRate,
  POST_STAY_REVIEW_LINK.present.completionRate
);

/**
 * Hypothèses de volumétrie.
 *
 * `averageLengthOfStay` est ESTIMÉE et non mesurée. Elle est reprise à
 * l'identique du simulateur de ventes additionnelles, et dupliquée ici
 * volontairement : les deux pages vivront leur vie, et partager une constante
 * entre elles ferait qu'un recalage de l'une déplacerait les chiffres de
 * l'autre sans que personne ne le demande.
 */
export const POST_STAY_ASSUMPTIONS = {
  averageLengthOfStay: 1.8,
  daysPerMonth: 30,
} as const;

export const POST_STAY_BOUNDS = {
  rooms: { min: 10, max: 200, step: 1, default: 40 },
  occupancy: { min: 30, max: 100, step: 1, default: 70 },
} as const;

/**
 * Réglages par défaut du simulateur : le paramétrage le plus répandu de la
 * plateforme, mesuré en volume d'envois et non choisi pour l'effet.
 *
 * - heure : 11 h - 14 h, le créneau le plus utilisé (14 683 envois) ;
 * - appel à l'action : le bouton unique (15 362 envois contre 8 714 pour la
 *   rangée d'étoiles accompagnée d'un lien d'avis) ;
 * - lien d'avis : absent (17 226 envois contre 17 029, écart mince).
 *
 * Ce défaut sort à 11,7 % d'avis complétés, donc AU-DESSUS de la référence
 * plateforme de 10 %. Un défaut plus sombre creuserait l'écart affiché à
 * l'ouverture de la page, et ce serait un épouvantail : le visiteur vient
 * régler le simulateur sur sa propre situation, pas admirer la nôtre.
 */
export const POST_STAY_DEFAULT_SETTINGS = {
  sendHourId: 'elevenToFourteen',
  ctaShapeId: 'singleButton',
  hasReviewSiteLink: false,
} as const satisfies {
  sendHourId: SendHourId;
  ctaShapeId: CtaShapeId;
  hasReviewSiteLink: boolean;
};
