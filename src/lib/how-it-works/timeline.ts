import { clamp, fade } from './math';

/** Part du défilement consacrée à l'ouverture (la fiche de Camille, puis le dézoom). */
export const INTRO_SHARE = 0.17;

/**
 * Les deux horloges du parcours.
 * `p` : avancement du parcours ; négatif pendant l'ouverture, 0 quand les amas sont en place, 1 à la fin.
 * `q` : avancement de l'ouverture, de 0 à 1.
 */
export interface JourneyTime {
  p: number;
  q: number;
}

/** `P` : avancement du défilement dans la section, de 0 à 1. Hors bornes (rebond sur iPhone) : borné. */
export function toJourneyTime(P: number): JourneyTime {
  const bounded = clamp(P);
  return { p: (bounded - INTRO_SHARE) / (1 - INTRO_SHARE), q: clamp(bounded / INTRO_SHARE) };
}

/** Plages des dix textes, en `p`. Chaque plage commence où finit la précédente. */
export const CHAPTERS: readonly (readonly [number, number])[] = [
  [-0.3, -0.09],
  [-0.09, 0.08],
  [0.08, 0.262],
  [0.262, 0.37],
  [0.37, 0.48],
  [0.48, 0.59],
  [0.59, 0.7],
  [0.7, 0.81],
  [0.81, 0.905],
  [0.905, 1.01],
];

/** Opacité du texte `index` : le premier est là dès le départ, le dernier reste jusqu'au bout. */
export function chapterOpacity(index: number, p: number): number {
  const [from, to] = CHAPTERS[index];
  if (index === 0) return clamp((to - p) / 0.02);
  if (index === CHAPTERS.length - 1) return clamp((p - from) / 0.02);
  return fade(p, from, to);
}

/** Version sans animation : l'instant montré pour chacun des dix temps. */
export const STATIC_TIMES: readonly JourneyTime[] = [
  { p: -0.205, q: 0 },
  ...[0, 0.255, 0.37, 0.475, 0.59, 0.695, 0.805, 0.9, 1].map((p) => ({ p, q: 1 })),
];
