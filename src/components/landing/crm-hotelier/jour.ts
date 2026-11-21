/*
 * Le « jour » du récit : la nuit verte de l'ouverture (0) cède au papier (1)
 * pendant le dézoom ; le vert foncé ne revient qu'au panneau d'appel du bas de page. Les couleurs passent par des
 * variables CSS posées hors de React (textes, en-tête, rail) et par `teintes(j)` pour la nuée.
 */

import { smooth } from '@/lib/how-it-works/math';
import { DEPART } from './histoire';

type Rgb = readonly [number, number, number];

/** Le papier du récit. */
export const PAPIER = '#F5F1EA';
const NUIT_FD: Rgb = [0, 43, 40];
const PAPIER_FD: Rgb = [245, 241, 234];

/** Chaque variable : sa couleur de nuit, sa couleur de jour, et l'opacité de chacune. */
const VARS: Record<string, [Rgb, number, Rgb, number]> = {
  '--fd': [NUIT_FD, 1, PAPIER_FD, 1],
  '--t1': [[238, 246, 244], 1, [12, 42, 38], 1], // titres
  '--t2': [[204, 226, 225], 0.8, [52, 78, 74], 0.92], // corps
  '--t3': [[134, 197, 185], 1, [37, 122, 108], 1], // seconde moitié des titres
  '--t4': [[204, 226, 225], 0.5, [52, 78, 74], 0.55], // rail, étapes à venir
  '--tr': [[255, 255, 255], 0.13, [12, 42, 38], 0.14], // filets
  '--pe': [[255, 207, 162], 1, [178, 84, 28], 1], // montants : la pêche de la marque, foncée sur le papier pour rester lisible
};

const mix = (a: Rgb, b: Rgb, t: number) => a.map((v, i) => Math.round(v + (b[i] - v) * t));

/**
 * Le jour à l'instant `s` du récit : nuit jusqu'au dézoom, papier dès le premier pas du séjour. Le passage tient
 * pendant le dézoom et finit avant que le premier texte du récit (PMS) ne commence son fondu.
 */
export const jourDe = (s: number) => smooth((s - (DEPART - 0.08)) / 0.3);

export function varsJour(j: number): Record<string, string> {
  const out: Record<string, string> = { '--nuit': String(1 - j) };
  for (const [nom, [a, oa, b, ob]] of Object.entries(VARS)) {
    const [r, g, bl] = mix(a, b, j);
    out[nom] = `rgb(${r} ${g} ${bl} / ${(oa + (ob - oa) * j).toFixed(3)})`;
  }
  return out;
}

let cote = -1;
let nuitEnTete = -1;
let enTete: HTMLElement | null = null;
/**
 * Pose le jour sans coûter une image : changer une variable sur la racine recalcule le style de toute la page.
 * Les textes et l'en-tête (par sa variable `--nuit`, posée sur lui seul) basculent donc d'un coup au milieu du dézoom,
 * quand aucun texte n'est à l'écran. Le fond, lui, est un iris de papier dont `ecrire` pose l'échelle.
 */
export function poserJour(j: number) {
  const c = j < 0.5 ? 0 : 1;
  if (c !== cote) {
    cote = c;
    const st = document.documentElement.style;
    for (const [k, v] of Object.entries(varsJour(c))) if (k !== '--nuit') st.setProperty(k, v);
  }
  // L'en-tête bascule avec les textes ; sa transition CSS (300 ms) adoucit le passage sans le gris d'un mélange.
  const n = c === 0 ? 1 : 0;
  if (n === nuitEnTete) return;
  if (!enTete?.isConnected) enTete = document.querySelector<HTMLElement>('header[data-jour]');
  if (!enTete) return;
  nuitEnTete = n;
  enTete.style.setProperty('--nuit', String(n));
}
/** Version fixe : l'en-tête passe d'un coup au papier quand l'ouverture sombre est sortie de l'écran. */
export function suivreOuvertureFixe(ouverture: HTMLElement): () => void {
  const io = new IntersectionObserver(([e]) => {
    document.querySelector<HTMLElement>('header[data-jour]')?.style.setProperty('--nuit', e.isIntersecting ? '1' : '0');
  }, { rootMargin: '-61px 0px -88% 0px' });
  io.observe(ouverture);
  return () => {
    io.disconnect();
    document.querySelector<HTMLElement>('header[data-jour]')?.style.removeProperty('--nuit');
  };
}
export function retirerJour() {
  cote = -1;
  nuitEnTete = -1;
  const st = document.documentElement.style;
  for (const k of Object.keys(VARS)) st.removeProperty(k);
  enTete?.style.removeProperty('--nuit');
  enTete = null;
}

/** Les couleurs de la nuée selon le jour : points clairs sur la nuit, points verts sur le papier. */
const NUEE = {
  brut: [[127, 160, 155], [140, 168, 162]],
  propre: [[236, 246, 243], [24, 84, 76]],
  menthe: [[143, 217, 196], [38, 150, 124]],
  peche: [[255, 207, 162], [232, 132, 70]],
} as const satisfies Record<string, readonly [Rgb, Rgb]>;
export function teintes(j: number): Record<keyof typeof NUEE, [number, number, number]> {
  const o = {} as Record<keyof typeof NUEE, [number, number, number]>;
  for (const k of Object.keys(NUEE) as (keyof typeof NUEE)[]) o[k] = mix(NUEE[k][0], NUEE[k][1], j) as [number, number, number];
  return o;
}
