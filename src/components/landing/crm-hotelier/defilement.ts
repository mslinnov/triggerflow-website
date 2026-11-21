'use client';

/*
 * Le défilement hors de React : l'ouverture du héros (le titre s'écarte sur la carte de Camille, puis on plonge
 * dedans) en écrivain impératif. Les styles sont posés par refs à chaque défilement au lieu de
 * passer par un rendu de toute la scène.
 */

import { useLayoutEffect, useRef } from 'react';
import { clamp, easeInOut, lerp } from '@/lib/how-it-works/math';
import { CROP, GAP_H, GAP_RATIO, offsetIn, type OuvertureRefs } from './moteur';

/** Pose un style seulement s'il change : pas d'écriture inutile dans le DOM. */
export function poserStyle(el: HTMLElement | null | undefined, nom: string, valeur: string) {
  if (el && el.style.getPropertyValue(nom) !== valeur) el.style.setProperty(nom, valeur);
}

/** `poser(o)` : avancement de l'ouverture, de 0 à 1. Rappelé seul quand la taille du titre change. */
export function useOuvertureImperative(side: number, refs: OuvertureRefs) {
  const { stage, holder, visual, bloc, gap } = refs;
  const em = useRef(0);
  const dernier = useRef(0);

  const poser = (o: number) => {
    dernier.current = o;
    const st = stage.current;
    const ho = holder.current;
    const vi = visual.current;
    const bl = bloc.current;
    const ga = gap.current;
    const w = easeInOut(clamp((o - 0.06) / 0.34));
    const z = easeInOut(clamp((o - 0.42) / 0.58));
    const gapH = GAP_H * em.current;
    const gapW = gapH * GAP_RATIO;
    const s0 = Math.max(1e-4, gapW / (CROP * side));
    const s = lerp(s0, 1, z);
    if (ga) {
      poserStyle(ga, 'width', `${gapW * w}px`);
      poserStyle(ga, 'height', `${gapH}px`);
      poserStyle(ga, 'margin-inline', `${0.1 * w}em`);
    }
    if (vi) {
      const inV = lerp(((1 - CROP / GAP_RATIO) / 2) * 100, 0, z);
      const inH = lerp(lerp(50, ((1 - CROP) / 2) * 100, w), 0, z);
      poserStyle(vi, 'clip-path', z >= 1 ? '' : `inset(${inV}% ${inH}% ${inV}% ${inH}% round ${lerp(10, 0, z) / s}px)`);
      poserStyle(vi, 'opacity', w > 0.001 ? '1' : '0');
    }
    if (bl) {
      const opacity = 1 - clamp((z - 0.12) / 0.38);
      poserStyle(bl, 'opacity', String(opacity));
      poserStyle(bl, 'visibility', opacity <= 0 ? 'hidden' : 'visible');
      poserStyle(bl, 'pointer-events', z > 0.05 ? 'none' : '');
    }
    if (!st || !ho || !vi) return;
    if (z >= 1 || !bl || !ga) {
      poserStyle(vi, 'transform', '');
      poserStyle(bl, 'transform', '');
      return;
    }
    const [gx, gy] = offsetIn(ga, st);
    const gc = [gx + ga.offsetWidth / 2, gy + ga.offsetHeight / 2];
    const [hx, hy] = offsetIn(ho, st);
    const vc = [hx + side / 2, hy + side / 2];
    poserStyle(vi, 'transform', `translate(${(gc[0] - vc[0]) * (1 - z)}px, ${(gc[1] - vc[1]) * (1 - z)}px) scale(${s})`);
    const [bx, by] = offsetIn(bl, st);
    poserStyle(bl, 'transform-origin', `${gc[0] - bx}px ${gc[1] - by}px`);
    poserStyle(bl, 'transform', z > 0 ? `translate(${(vc[0] - gc[0]) * z}px, ${(vc[1] - gc[1]) * z}px) scale(${s / s0})` : '');
  };
  const poserRef = useRef(poser);
  useLayoutEffect(() => {
    poserRef.current = poser;
  });

  useLayoutEffect(() => {
    const mesure = () => {
      if (!gap.current) return;
      em.current = parseFloat(getComputedStyle(gap.current).fontSize) || 0;
      poserRef.current(dernier.current);
    };
    mesure();
    window.addEventListener('resize', mesure);
    void document.fonts?.ready.then(mesure);
    return () => window.removeEventListener('resize', mesure);
  }, [gap]);

  return poser;
}
