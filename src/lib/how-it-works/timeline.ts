import { clamp } from './math';

/** Part du défilement consacrée à l'ouverture (la fiche de Sophie, puis le dézoom). */
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
