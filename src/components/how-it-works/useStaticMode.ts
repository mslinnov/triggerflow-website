'use client';

import { useSyncExternalStore } from 'react';
import { shortScreenTracker } from '@/lib/how-it-works/layout';

const REDUCED = '(prefers-reduced-motion: reduce)';
/** Garde sa réponse tant que la largeur ne change pas : la barre d'adresse d'un téléphone ne doit rien faire basculer. */
const tooShort = shortScreenTracker();

function subscribe(onChange: () => void): () => void {
  const query = window.matchMedia(REDUCED);
  query.addEventListener('change', onChange);
  window.addEventListener('resize', onChange);
  return () => {
    query.removeEventListener('change', onChange);
    window.removeEventListener('resize', onChange);
  };
}

const snapshot = (): boolean =>
  window.matchMedia(REDUCED).matches || tooShort(window.innerWidth, window.innerHeight);

/**
 * Vrai quand il faut montrer la version fixe : le visiteur a demandé moins d'animations, ou l'écran est
 * trop court pour la scène (téléphone couché). Faux côté serveur : la page servie est la version animée.
 */
export function useStaticMode(): boolean {
  return useSyncExternalStore(subscribe, snapshot, () => false);
}
