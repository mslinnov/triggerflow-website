'use client';

import { useSyncExternalStore } from 'react';
import { HEADER, shortScreenTracker } from '@/lib/how-it-works/layout';

const REDUCED = '(prefers-reduced-motion: reduce)';
/**
 * Un suivi par hauteur d'en-tête. Chacun garde sa réponse tant que la largeur ne change pas : la barre
 * d'adresse d'un téléphone ne doit rien faire basculer.
 */
const trackers = new Map<number, ReturnType<typeof shortScreenTracker>>();

function trackerFor(header: number): ReturnType<typeof shortScreenTracker> {
  let tracker = trackers.get(header);
  if (!tracker) {
    tracker = shortScreenTracker(header);
    trackers.set(header, tracker);
  }
  return tracker;
}

function subscribe(onChange: () => void): () => void {
  const query = window.matchMedia(REDUCED);
  query.addEventListener('change', onChange);
  window.addEventListener('resize', onChange);
  return () => {
    query.removeEventListener('change', onChange);
    window.removeEventListener('resize', onChange);
  };
}


/**
 * Vrai quand il faut montrer la version fixe : le visiteur a demandé moins d'animations, ou l'écran est
 * trop court pour la scène (téléphone couché). Faux côté serveur : la page servie est la version animée.
 */
export function useStaticMode(header = HEADER): boolean {
  const tooShort = trackerFor(header);
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(REDUCED).matches || tooShort(window.innerWidth, window.innerHeight),
    () => false,
  );
}
