'use client';

import { useEffect, useRef, useState, type RefObject } from 'react';

/** Côté du visuel avant la première mesure (rendu serveur) : celui d'un téléphone de 390 × 680. */
const DEFAULT_SIDE = 368;

/** Mesure la largeur d'un bloc carré et la suit quand la fenêtre change. */
export function useSide(): [RefObject<HTMLDivElement | null>, number] {
  const ref = useRef<HTMLDivElement>(null);
  const [side, setSide] = useState(DEFAULT_SIDE);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) => setSide(entry.contentRect.width));
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return [ref, side];
}
