'use client';

/* Une forme de la nuée, dessinée une fois : le récit quand les animations sont réduites. */

import { useEffect, useRef } from 'react';
import type { NomForme } from './histoire';
import { teintes } from './jour';

// Sur le papier du récit (jour.ts) : points verts, accents menthe et pêche soutenus.
const { propre, menthe, peche } = teintes(1);
const css = (c: readonly number[]) => `rgb(${c.join(' ')})`;
const TEINTES = { menthe: css(menthe), peche: css(peche) } as const;
const POINT = css(propre);
/** Profondeur des trois plans de points (celle de la nuée animée). */
const PROFONDEUR = 0.8;

export default function Figee({ forme }: { forme: NomForme }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    let vivant = true;
    void import('./formes').then(({ formesDe }) => {
      const canvas = ref.current;
      const ctx = canvas?.getContext('2d');
      if (!vivant || !canvas || !ctx) return;
      // La fiche est dessinée en points : la capture n'a pas sa place dans une image fixe de cette taille.
      const f = formesDe(false)[forme];
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      const W = canvas.clientWidth;
      const H = canvas.clientHeight;
      canvas.width = Math.round(W * ratio);
      canvas.height = Math.round(H * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      ctx.clearRect(0, 0, W, H);
      const { x0, y0, x1, y1 } = f.boite;
      const u = Math.min(W / (x1 - x0 + 0.2), H / (y1 - y0 + 0.2));
      const rayon = Math.min(2.6, u / 62);
      const d = PROFONDEUR;
      const teinte = f.teinte ? TEINTES[f.teinte] : null;
      f.pts.forEach(([x, y], i) => {
        const h = (i * 0.7548776662 + 0.31) % 1;
        const plan = h < 0.34 ? 0 : h < 0.85 ? 1 : 2;
        ctx.globalAlpha = f.gain[i] * (plan === 0 ? 1 - 0.5 * d : plan === 2 ? 1 - 0.3 * d : 1);
        ctx.fillStyle = teinte && f.accent[i] > 0 ? teinte : POINT;
        ctx.beginPath();
        ctx.arc(W / 2 + (x - (x0 + x1) / 2) * u, H / 2 + (y - (y0 + y1) / 2) * u, rayon * (plan === 0 ? 1 - 0.4 * d : plan === 2 ? 1 + 0.6 * d : 1), 0, Math.PI * 2);
        ctx.fill();
      });
    });
    return () => {
      vivant = false;
    };
  }, [forme]);
  return <canvas ref={ref} aria-hidden className="aspect-[5/4] w-full max-w-[520px] justify-self-center" />;
}
