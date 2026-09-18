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
 *
 * Une seule exception, `sampleSize`, renseignée sur le seul groupe trop mince
 * pour être lu comme les autres : ce volume-là ne dit rien de notre activité,
 * il dit à quel point le taux qu'il accompagne est fragile, et le taire
 * reviendrait à afficher une mesure douteuse sans son avertissement.
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
  /**
   * Volume d'envois, renseigné UNIQUEMENT sur les groupes trop minces pour
   * être lus comme les autres, et affiché à côté de leur taux.
   *
   * C'est la seule exception à la règle « aucun volume absolu exporté » de ce
   * fichier, et elle est étroite par construction : une taille d'échantillon
   * qui sert à relativiser une mesure est une garantie de méthode, pas un
   * indicateur de notre activité. Le renseigner sur tous les groupes
   * exporterait en revanche leur somme, donc le volume de la plateforme :
   * à ne pas faire.
   */
  sampleSize?: number;
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
  // Le taux est le plus faible de tous, mais c'est aussi le groupe le plus
  // fragile de la table : 557 envois, contre plusieurs milliers ailleurs. Ce
  // volume est le seul de la table à être exporté, et donc affiché, parce que
  // c'est lui qui permet au visiteur de relativiser le taux plutôt que de le
  // croire sur parole. C'est aussi ce créneau qui fabrique l'écart annoncé
  // dans la bande de réassurance, raison de plus pour qu'il porte sa fragilité
  // à l'écran.
  { id: 'afterTwenty', completionRate: 0.025, isMeasured: true, sampleSize: 557 },
] as const satisfies readonly PostStayReference[];

/**
 * Taille d'échantillon d'une référence, ou `undefined` quand elle n'a pas à
 * être signalée.
 *
 * Accesseur plutôt que lecture directe : les tables sont figées par
 * `as const`, donc une entrée sans `sampleSize` n'a tout simplement pas la
 * propriété et TypeScript refuse de la lire. Passer par cette fonction élargit
 * proprement vers `PostStayReference`, sans transtypage à l'appel.
 */
export function sampleSizeOf(reference: PostStayReference): number | undefined {
  return reference.sampleSize;
}

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
 * 4 238 avis pour 42 369 envois. Sert de repère neutre à l'écran : c'est la
 * valeur qu'un e-mail post-séjour moyen de la plateforme obtient, sans rien
 * régler du tout.
 */
export const PLATFORM_COMPLETION_RATE = 0.1;

/**
 * Les deux MONTAGES CROISÉS réellement mesurés par le rapport.
 *
 * Les tables ci-dessus sont des taux marginaux : chacune est mesurée sur la
 * même population d'envois, en ne regardant qu'un critère à la fois. Le
 * rapport isole en plus deux combinaisons complètes, et ce sont les seules
 * qu'on ait le droit d'annoncer comme le résultat d'un e-mail entier :
 *
 * - `effective` : objet court en question, un seul bouton vers le formulaire,
 *   aucun lien vers une plateforme d'avis, envoi en milieu de matinée.
 * - `ineffective` : objet de remerciement, rangée d'étoiles cliquables et lien
 *   vers une plateforme d'avis dans le même message, envoi en soirée.
 *
 * Les taux marginaux ne se composent pas entre eux : multiplier trois écarts
 * de la table sortirait de l'enveloppe des mesures. Ces deux valeurs-ci ne
 * sont donc PAS dérivées des tables, elles sont lues dans le rapport, et
 * l'écart qu'elles portent est celui d'un montage complet contre un autre.
 *
 * Coïncidence à ne pas « factoriser » : `ineffective` vaut 3,7 %, exactement
 * comme `starRow` dans `POST_STAY_CTA_SHAPES`. Ce sont deux mesures
 * différentes qui tombent sur la même valeur, pas la même mesure écrite deux
 * fois. Une prochaine extraction les séparera.
 */
export const POST_STAY_MEASURED_SETUPS = {
  effective: { id: 'effectiveSetup', completionRate: 0.164, isMeasured: true },
  ineffective: { id: 'ineffectiveSetup', completionRate: 0.037, isMeasured: true },
} as const satisfies Record<string, PostStayReference>;
