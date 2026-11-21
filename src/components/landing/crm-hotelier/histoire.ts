/*
 * Le récit du séjour de Camille : dans l'ordre, les formes que prend la nuée, la place qu'elle occupe à l'écran, et
 * les textes. Tout est en « écrans défilés » depuis le haut de la section. Réglages figés sur la version validée le
 * 21/11 : la nuée part du côté opposé au texte, la caméra entre dans l'enveloppe pour lire le message (moment H), la
 * scène se calme sous l'appel à la démo.
 */

import { clamp } from '@/lib/how-it-works/math';

export type NomForme = 'amas' | 'planning' | 'enveloppe' | 'champ' | 'offres' | 'choix' | 'carte' | 'coeur' | 'boucle' | 'calme' | 'cadre';
/** Où se tient la nuée : là où l'ouverture la laisse, d'un côté du texte, au centre, en lecture (H), ou posée en bas. */
export type Place = 'ouverture' | 'gauche' | 'droite' | 'fond' | 'centre' | 'lecture' | 'bas';

/** Chiffres passés par la page (company-stats.ts et brand.ts). */
export interface Chiffres {
  pms: string;
  whatsapp: string;
  upsell: string;
}

interface TexteEtape {
  title: string;
  text: string;
}

/** Les textes du récit (lpCrmHotelier.story). */
export interface TextesRecit {
  rail: readonly string[];
  railLabel: string;
  pms: TexteEtape & { figureLabel: string };
  sales: TexteEtape & { figureLabel: string };
  /** `badge` : le mot de la carte bancaire 3D, devant le montant (« ✓ Payé · 72 € »). */
  payment: TexteEtape & { badge: string };
  review: TexteEtape;
  return: TexteEtape & { short: string; figureLabel: string };
  middle: TexteEtape;
  /** `greeting` et `short` : la lettre de l'enveloppe 3D, plus courte que le message lu. */
  message: { title: string; when: string; time: string; from: string; subject: string; body: string; greeting: string; short: readonly string[]; offer: string; price: string; button: string };
  offers: readonly string[];
  chosen: string;
  capture: { alt: string; caption: string };
  captureMobile: { alt: string; caption: string };
  card: { kind: string; camilleStay: string; stays: readonly string[] };
}

/** Le texte coupé autour de ses montants (« 72 € » en français, « €72 » en anglais) : rangs impairs = montants. */
export const montants = (text: string): string[] => text.split(/(\d+\s€|€\d+)/);

export interface Bloc {
  id: 'pms' | 'fiche' | 'ventes' | 'paiement' | 'avis' | 'retour' | 'cta';
  kind: 'calm' | 'cross' | 'cta';
  /** Côté du texte sur ordinateur ; la nuée part de l'autre. */
  side: 'left' | 'right' | null;
  title: string;
  text: string;
  /** Version courte pour le téléphone. */
  bref?: string;
  chiffre?: readonly [string, string];
  /** Le moment où le bloc est au milieu de l'écran. */
  at: number;
  forme: NomForme;
}

export interface Cle {
  s: number;
  forme: NomForme;
  place: Place;
}

export interface Histoire {
  blocs: Bloc[];
  cles: Cle[];
  /** Le moment H : la caméra entre dans l'enveloppe, lit le message, recule. */
  h: { debut: number; lu0: number; lu1: number; fin: number };
  rail: { label: string; s: number; de: number }[];
  ecrans: number;
}

/** Fin de l'ouverture (le titre s'écarte, on plonge dans la carte). */
export const ENTRY = 1;
/** Fin du dézoom : les fiches sont devenues des points, la nuée prend le relais. */
export const DEPART = 1.48;
/** Durée d'une transformation de la nuée, en écrans défilés. */
const M = 0.27;
const TENUE = 0.44;

/**
 * `wide` : sur téléphone, la capture de la fiche a un écran à elle, juste après le PMS.
 * `trois` : la version animée, où un objet 3D accompagne chaque étape. L'enveloppe tient alors presque un écran
 * (rabat, lettre qui monte) avant la lecture du message, et la carte de paiement, pleine, se pose à côté du texte
 * au lieu d'être traversée par lui.
 */
export function histoire(t: TextesRecit, c: Chiffres, wide = true, trois = false): Histoire {
  const cles: Cle[] = [
    { s: 0, forme: 'amas', place: 'ouverture' },
    { s: DEPART + 0.03, forme: 'amas', place: 'ouverture' },
  ];
  const blocs: Bloc[] = [];
  let s = DEPART + 0.03;
  const vers = (forme: NomForme, place: Place, d = M) => {
    s += d;
    cles.push({ s, forme, place });
  };
  const tenir = (d: number) => {
    s += d;
    cles.push({ ...cles[cles.length - 1], s });
  };
  /** La nuée part du côté opposé au texte. */
  const face = (texte: 'left' | 'right'): Place => (texte === 'left' ? 'droite' : 'gauche');

  // 1. Réservation : le planning du PMS coule vers la fiche.
  vers('planning', face('left'), M * 1.15);
  blocs.push({ id: 'pms', kind: 'calm', side: 'left', title: t.pms.title, text: t.pms.text, chiffre: [c.pms, t.pms.figureLabel], at: s + TENUE / 2, forme: 'planning' });
  tenir(TENUE);
  if (!wide) {
    blocs.push({ id: 'fiche', kind: 'calm', side: null, title: '', text: '', at: s + 0.22, forme: 'planning' });
    tenir(0.44);
  }

  // 2. Avant l'arrivée : la caméra va lire le message (H).
  vers('enveloppe', 'centre');
  tenir(trois ? 0.9 : 0.08);
  const debut = s;
  vers('champ', 'lecture', 0.28);
  const lu0 = s;
  tenir(0.38);
  const h = { debut, lu0, lu1: s, fin: s + M };

  // 3. Les offres : trois, puis celle que Camille choisit.
  vers('offres', face('right'));
  blocs.push({ id: 'ventes', kind: 'calm', side: 'right', title: t.sales.title, text: t.sales.text, chiffre: [c.upsell, t.sales.figureLabel], at: s + 0.24, forme: 'offres' });
  tenir(0.26);
  vers('choix', face('right'), 0.1);
  tenir(0.14);

  // 4. Le paiement : sans la 3D, le texte traverse la carte de points (J).
  const traverse = !trois;
  vers('carte', traverse ? 'centre' : face('left'));
  blocs.push({ id: 'paiement', kind: traverse ? 'cross' : 'calm', side: traverse ? null : 'left', title: t.payment.title, text: t.payment.text, at: s + 0.21, forme: 'carte' });
  tenir(0.42);

  // 5. L'avis.
  vers('coeur', face('left'));
  blocs.push({ id: 'avis', kind: 'calm', side: 'left', title: t.review.title, text: t.review.text, at: s + TENUE / 2, forme: 'coeur' });
  tenir(TENUE);

  // 6. Le retour.
  vers('boucle', face('right'));
  blocs.push({ id: 'retour', kind: 'calm', side: 'right', title: t.return.title, text: t.return.text, bref: t.return.short, chiffre: [c.whatsapp, t.return.figureLabel], at: s + TENUE / 2, forme: 'boucle' });
  tenir(TENUE);

  // 7. L'appel à la démo : la scène se calme.
  vers('calme', 'bas', M * 1.1);
  blocs.push({ id: 'cta', kind: 'cta', side: null, title: t.middle.title, text: t.middle.text, at: s + 0.24, forme: 'calme' });
  tenir(0.42);

  const bloc = (id: Bloc['id']) => blocs.find((b) => b.id === id)!;
  const cibles = [bloc('pms').at, (h.lu0 + h.lu1) / 2, bloc('paiement').at, bloc('avis').at, bloc('retour').at];
  const debuts = [DEPART, h.debut - M, bloc('paiement').at - 0.36, bloc('avis').at - 0.4, bloc('retour').at - 0.4];
  return { blocs, cles, h, rail: t.rail.map((label, i) => ({ label, s: cibles[i], de: debuts[i] })), ecrans: s };
}

/** Indice du segment de `cles` qui contient `s`. */
export function segment(cles: readonly Cle[], s: number): number {
  let i = 0;
  while (i < cles.length - 2 && s >= cles[i + 1].s) i++;
  return i;
}

/** Présence d'une forme à l'instant `s`, de 0 à 1 : elle arrive en fin de transformation, repart au début de la suivante. */
export function presence(cles: readonly Cle[], nom: NomForme, s: number, entree = 0.55, sortie = 0.4): number {
  const i = segment(cles, s);
  const a = cles[i];
  const b = cles[i + 1];
  if (!b) return a.forme === nom ? 1 : 0;
  const phase = Math.min(1, Math.max(0, (s - a.s) / Math.max(1e-6, b.s - a.s)));
  if (a.forme === nom && b.forme === nom) return 1;
  if (b.forme === nom) return Math.min(1, Math.max(0, (phase - entree) / (1 - entree)));
  if (a.forme === nom) return 1 - Math.min(1, Math.max(0, phase / sortie));
  return 0;
}

/** Épinglé dans la scène : les textes calmes sur téléphone (ils tiennent sous la nuée) et l'appel à la démo partout. */
export const estEpingle = (b: Bloc, wide: boolean): boolean => (b.kind === 'calm' && !wide) || b.kind === 'cta';

/** Durée du fondu d'un bloc épinglé, en écrans défilés. */
const FONDU_EPINGLE = 0.12;

/**
 * Un bloc épinglé à la position `s` : il arrive par le bas, tient, repart par le haut ; l'appel à la démo reste.
 * `avant` et `apres` : milieux des blocs épinglés voisins. Le fondu finit à mi-chemin du voisin, pour que deux textes
 * posés au même endroit ne se superposent jamais (le PMS et la fiche, à 0,44 écran l'un de l'autre sur téléphone).
 * Rend l'opacité et le glissement vertical, en pixels.
 */
export function poseEpingle(b: Pick<Bloc, 'at' | 'kind'>, s: number, avant = -Infinity, apres = Infinity): { opacity: number; glisse: number } {
  const d = s - b.at;
  const reste = b.kind === 'cta' && d > 0;
  if (reste) return { opacity: 1, glisse: 0 };
  const marge = (d > 0 ? apres - b.at : b.at - avant) / 2;
  const tenu = Math.max(0, Math.min(b.kind === 'cta' ? 0.16 : 0.2, marge - FONDU_EPINGLE));
  const hors = Math.max(0, Math.abs(d) - tenu);
  const opacity = 1 - clamp(hors / FONDU_EPINGLE);
  const glisse = -Math.sign(d) * (Math.min(Math.abs(d), tenu) * 70 + Math.pow(hors / FONDU_EPINGLE, 2) * 46);
  return { opacity, glisse };
}
