/**
 * Moteur de calcul du simulateur post-séjour.
 *
 * Fonction pure, sans dépendance React : elle ne lit que ses arguments et les
 * constantes de `@/data/post-stay`, et rend le même résultat pour les mêmes
 * entrées. La page n'a qu'à l'appeler dans un `useMemo`.
 *
 * Elle ne promet rien. Elle prend les trois réglages actuels de l'hôtelier,
 * les situe face aux mesures de la plateforme, et exprime l'écart en avis par
 * mois et par an. Tous les chiffres qu'elle manipule viennent du rapport cité
 * dans `post-stay.ts`.
 *
 * ─── MODÈLE ──────────────────────────────────────────────────────────────
 *   nuitées = chambres × jours/mois × occupation
 *   séjours = nuitées / durée moyenne de séjour
 *   envois  = séjours                     (un e-mail post-séjour par séjour)
 *   avis    = envois × taux de complétion
 *
 * ─── COMMENT LES TROIS RÉGLAGES SE COMBINENT, ET POURQUOI ────────────────
 * Les sept références du rapport sont des taux MARGINAUX : chacune est
 * mesurée sur la même population d'envois, en ne regardant qu'un critère à la
 * fois. Le groupe « envoi entre 9 h et 11 h » contient déjà des boutons
 * uniques et des rangées d'étoiles, avec et sans lien d'avis. Ces taux se
 * recouvrent donc, ils ne se composent pas.
 *
 * Multiplier les trois écarts relatifs à la référence plateforme donnerait,
 * pour le meilleur paramétrage :
 *
 *   10 % × (18,8/10) × (13,5/10) × (15,0/10) = 38,1 %
 *
 * soit le double du meilleur taux jamais observé sur la plateforme (18,8 %).
 * Et 0,54 % au pire, près de cinq fois sous le plus mauvais groupe mesuré
 * (2,5 %). Un simulateur qui sort de l'enveloppe des mesures ne simule plus
 * rien.
 *
 * Le moteur prend donc la MOYENNE GÉOMÉTRIQUE des trois taux :
 *
 *   taux = (taux_heure × taux_bouton × taux_lien) ^ (1/3)
 *
 * C'est la forme multiplicative de la moyenne, donc exactement la moyenne des
 * trois effets relatifs à la référence plateforme, au lieu de leur produit :
 *
 *   taux = 10 % × Π (taux_i / 10 %) ^ (1/3)
 *
 * Deux propriétés qui nous intéressent : trois réglages posés sur la référence
 * rendent la référence, et le résultat reste toujours encadré par le plus
 * faible et le plus fort des trois taux, donc dans l'enveloppe des mesures.
 *
 * ─── VÉRIFICATION DE CE CHOIX SUR LES DONNÉES ────────────────────────────
 * Le rapport croise deux des trois critères, ce qui permet de confronter la
 * méthode à une mesure réelle plutôt qu'à une intuition :
 *
 *   bouton unique + aucun lien d'avis   mesuré 16,4 %   moyenne géom. 14,2 %
 *   rangée d'étoiles + lien d'avis      mesuré  3,7 %   moyenne géom.  4,6 %
 *
 * La moyenne géométrique sous-estime le meilleur cas de 2,2 points et
 * surestime le pire de 0,9 point. Elle reste dans l'enveloppe mesurée, et elle
 * se trompe du bon côté en haut de l'échelle : un simulateur d'acquisition ne
 * doit jamais promettre plus que ce qui a été constaté. La multiplication, sur
 * ces deux mêmes croisements, donnerait 20,3 % et 2,1 % : deux fois hors de
 * l'enveloppe.
 *
 * ─── BORNES ──────────────────────────────────────────────────────────────
 * Le taux est écrêté à `BEST_OBSERVED_COMPLETION_RATE` en haut et à zéro en
 * bas. Avec les constantes actuelles ce plafond n'est jamais atteint, puisque
 * la moyenne géométrique ne dépasse jamais le plus fort des trois taux : c'est
 * un filet pour une prochaine extraction, pas une correction déguisée.
 *
 * Les nombres d'avis sont arrondis avant d'être soustraits, et le total annuel
 * est douze fois le gain mensuel arrondi. L'arithmétique affichée est donc
 * vérifiable de tête par le lecteur, et aucun avis fractionnaire ne sort d'ici.
 */

import {
  BEST_OBSERVED_COMPLETION_RATE,
  PLATFORM_COMPLETION_RATE,
  POST_STAY_ASSUMPTIONS,
  POST_STAY_CTA_SHAPES,
  POST_STAY_REVIEW_LINK,
  POST_STAY_SEND_HOURS,
  type CtaShapeId,
  type SendHourId,
} from '@/data/post-stay';

export interface PostStayInput {
  rooms: number;
  /** Taux d'occupation en pourcentage (0-100). */
  occupancyRate: number;
  /** Heure d'envoi actuelle de l'e-mail post-séjour. */
  sendHourId: SendHourId;
  /** Forme actuelle de l'appel à l'action. */
  ctaShapeId: CtaShapeId;
  /** L'e-mail contient-il déjà un lien vers TripAdvisor, Google ou équivalent. */
  hasReviewSiteLink: boolean;
}

export interface PostStayResult {
  monthlyNights: number;
  monthlyStays: number;
  /** Taux estimé avec les réglages actuels, en fraction. Non arrondi. */
  currentRate: number;
  /** Taux estimé avec les trois meilleurs réglages, en fraction. Non arrondi. */
  reachableRate: number;
  /** Référence plateforme, pour situer les deux précédents. */
  benchmarkRate: number;
  currentReviewsPerMonth: number;
  reachableReviewsPerMonth: number;
  /** Écart entre les deux, en avis entiers. Jamais négatif. */
  gainedReviewsPerMonth: number;
  gainedReviewsPerYear: number;
}

/**
 * Estime les avis récoltés par mois, avant et après correction des réglages.
 *
 * Robuste aux entrées aberrantes : toute valeur non finie ou négative est
 * ramenée à zéro plutôt que de produire un NaN affiché à l'écran. Un
 * établissement de zéro chambre rend des volumes nuls mais conserve ses deux
 * taux, qui ne dépendent pas de la taille de l'hôtel.
 *
 * ─── TROIS JEUX D'ENTRÉES VÉRIFIÉS À LA MAIN ─────────────────────────────
 * Ce dépôt n'a aucun framework de test. Les trois cas ci-dessous ont été
 * calculés à la main et servent de garde-fou : si un chiffre bouge ici sans
 * qu'une constante ait bougé dans `post-stay.ts`, c'est une régression.
 *
 * 1. TOUT AU MIEUX, 200 chambres, 100 % d'occupation, envoi 9 h - 11 h,
 *    bouton unique, aucun lien d'avis.
 *      séjours     = 200 × 30 × 1,00 / 1,8 = 3 333
 *      taux actuel = (0,188 × 0,135 × 0,150) ^ (1/3) = 15,61 %
 *      atteignable = 15,61 %  (les réglages sont déjà les bons)
 *      avis        = 520 actuels, 520 atteignables
 *      gain        = 0 par mois, 0 par an
 *
 * 2. TOUT AU PIRE, 10 chambres, 30 % d'occupation, envoi après 20 h, rangée
 *    d'étoiles, lien d'avis présent.
 *      séjours     = 10 × 30 × 0,30 / 1,8 = 50
 *      taux actuel = (0,025 × 0,037 × 0,058) ^ (1/3) = 3,77 %
 *      atteignable = 15,61 %
 *      avis        = 2 actuels, 8 atteignables
 *      gain        = 6 par mois, 72 par an
 *
 * 3. VALEURS PAR DÉFAUT, 40 chambres, 70 % d'occupation, envoi 11 h - 14 h,
 *    bouton unique, aucun lien d'avis.
 *      séjours     = 40 × 30 × 0,70 / 1,8 = 467
 *      taux actuel = (0,080 × 0,135 × 0,150) ^ (1/3) = 11,74 %
 *      atteignable = 15,61 %
 *      avis        = 55 actuels, 73 atteignables
 *      gain        = 18 par mois, 216 par an
 */
export function calculatePostStayReviews(input: PostStayInput): PostStayResult {
  const rooms = Math.max(0, Number.isFinite(input.rooms) ? input.rooms : 0);
  const occupancy = clamp(Number.isFinite(input.occupancyRate) ? input.occupancyRate : 0, 0, 100);

  const monthlyNights = rooms * POST_STAY_ASSUMPTIONS.daysPerMonth * (occupancy / 100);
  const monthlyStays = monthlyNights / POST_STAY_ASSUMPTIONS.averageLengthOfStay;

  const currentRate = combineRates([
    rateOf(POST_STAY_SEND_HOURS, input.sendHourId),
    rateOf(POST_STAY_CTA_SHAPES, input.ctaShapeId),
    input.hasReviewSiteLink
      ? POST_STAY_REVIEW_LINK.present.completionRate
      : POST_STAY_REVIEW_LINK.absent.completionRate,
  ]);

  const reachableRate = combineRates([
    bestRate(POST_STAY_SEND_HOURS),
    bestRate(POST_STAY_CTA_SHAPES),
    Math.max(
      POST_STAY_REVIEW_LINK.absent.completionRate,
      POST_STAY_REVIEW_LINK.present.completionRate
    ),
  ]);

  const currentReviewsPerMonth = Math.round(monthlyStays * currentRate);
  const reachableReviewsPerMonth = Math.round(monthlyStays * reachableRate);
  // Soustraction d'entiers, et non arrondi d'une différence : les trois
  // nombres affichés doivent se recomposer sous les yeux du lecteur.
  // `Math.max` est un filet : `reachableRate` est par construction le maximum
  // de chaque dimension, donc toujours supérieur ou égal au taux actuel.
  const gainedReviewsPerMonth = Math.max(0, reachableReviewsPerMonth - currentReviewsPerMonth);

  return {
    monthlyNights: Math.round(monthlyNights),
    monthlyStays: Math.round(monthlyStays),
    currentRate,
    reachableRate,
    benchmarkRate: PLATFORM_COMPLETION_RATE,
    currentReviewsPerMonth,
    reachableReviewsPerMonth,
    gainedReviewsPerMonth,
    gainedReviewsPerYear: gainedReviewsPerMonth * 12,
  };
}

/**
 * Moyenne géométrique des taux, écrêtée à l'enveloppe des mesures. Voir la
 * justification en tête de fichier avant de la remplacer par un produit.
 */
function combineRates(rates: readonly number[]): number {
  const usable = rates.filter((rate) => Number.isFinite(rate) && rate > 0);
  if (usable.length !== rates.length || usable.length === 0) {
    // Une référence manquante ou nulle rendrait la moyenne géométrique nulle,
    // donc un écart maximal affiché sur une base fausse. La référence
    // plateforme est le repli honnête : elle ne dit ni bien ni mal.
    return PLATFORM_COMPLETION_RATE;
  }

  const product = usable.reduce((total, rate) => total * rate, 1);
  return clamp(Math.pow(product, 1 / usable.length), 0, BEST_OBSERVED_COMPLETION_RATE);
}

function rateOf(references: readonly { id: string; completionRate: number }[], id: string): number {
  // Repli sur la référence plateforme si l'identifiant est inconnu. Le
  // typage l'interdit déjà, mais une valeur restaurée depuis une ancienne
  // session ne passe pas par le compilateur.
  return references.find((reference) => reference.id === id)?.completionRate ?? PLATFORM_COMPLETION_RATE;
}

function bestRate(references: readonly { completionRate: number }[]): number {
  return Math.max(...references.map((reference) => reference.completionRate));
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
