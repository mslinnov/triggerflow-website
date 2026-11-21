'use client';

/*
 * Socle du récit : hauteur de l'en-tête, horloge des fiches de l'ouverture, interpolation par morceaux, et les
 * proportions du trou du titre où apparaît la carte de Sophie.
 */

import { useEffect, useState, type RefObject } from 'react';
import { INTRO_SHARE, toJourneyTime, type JourneyTime } from '@/lib/how-it-works/timeline';
import { lerp } from '@/lib/how-it-works/math';

export const HEADER = 61;

export const timeOf = (p: number): JourneyTime => toJourneyTime(p * (1 - INTRO_SHARE) + INTRO_SHARE);
/** La carte de Sophie en grand : le départ des fiches. */
export const CARD = -0.205;

export type Keys = readonly (readonly [number, number])[];

/** Interpolation linéaire par morceaux : `keys` = [écrans défilés, valeur]. */
export function at(keys: Keys, s: number): number {
  if (s <= keys[0][0]) return keys[0][1];
  for (let i = 1; i < keys.length; i++) {
    const [s1, v1] = keys[i];
    if (s <= s1) {
      const [s0, v0] = keys[i - 1];
      return lerp(v0, v1, (s - s0) / Math.max(1e-6, s1 - s0));
    }
  }
  return keys[keys.length - 1][1];
}

export function useWide(): boolean {
  const [wide, setWide] = useState(false);
  useEffect(() => {
    const query = window.matchMedia('(min-width: 1024px)');
    const update = () => setWide(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);
  return wide;
}

/** Position d'un élément dans la scène épinglée, hors transformations. */
export function offsetIn(element: HTMLElement, stage: HTMLElement): [number, number] {
  let x = 0;
  let y = 0;
  let node: HTMLElement | null = element;
  while (node && node !== stage) {
    x += node.offsetLeft;
    y += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  return [x, y];
}

/** Part du visuel montrée dans le trou du titre : la carte de Sophie, au centre de la scène. */
export const CROP = 0.62;
/** Le trou : sa hauteur en em du titre, et sa largeur rapportée à sa hauteur. */
export const GAP_H = 0.8;
export const GAP_RATIO = 2.4;

export interface OuvertureRefs {
  stage: RefObject<HTMLElement | null>;
  /** Le bloc qui porte le visuel à sa place finale. */
  holder: RefObject<HTMLElement | null>;
  /** Le visuel carré de la scène. */
  visual: RefObject<HTMLElement | null>;
  /** Tout ce qui part avec le titre quand on plonge : titre, texte, boutons. */
  bloc: RefObject<HTMLElement | null>;
  /** Le trou dans le titre. */
  gap: RefObject<HTMLElement | null>;
}
