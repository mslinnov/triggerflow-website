import type { Pt } from './geometry';
import { lerp } from './math';

/**
 * La ligne de séjour de Camille : calme, avec un battement à chaque message.
 * Tout est en pixels, dans le repère du calque (origine en haut à gauche du visuel).
 */

/** Position des battements le long de la ligne : J-3, Jour J, J+1, J+30. */
export const BEATS = [0.2, 0.43, 0.63, 0.82] as const;
/** Position du point de vente. */
export const PAY = 0.31;
/** Hauteur de la bande réservée à la ligne, sous le visuel. */
export const STRIP_H = 60;

export interface Trace {
  /** Tracé SVG de la ligne. */
  d: string;
  length: number;
  x0: number;
  x1: number;
  y: number;
  /** Abscisse d'une fraction de la ligne. */
  xAt(f: number): number;
  /** Sommet du battement `i`. */
  peak(i: number): Pt;
  /** Distance parcourue par Camille à l'instant `p`. */
  distAt(p: number): number;
  /** Point de la ligne à une distance donnée du départ. */
  pointAt(dist: number): Pt;
}

/** `width` : largeur du visuel ; `top` : son bord bas. */
export function buildTrace(width: number, top: number): Trace {
  const x0 = 20;
  const x1 = width - 20;
  const y = top + 25;
  const xAt = (f: number) => lerp(x0, x1, f);

  const pts: [number, number][] = [[x0, y]];
  const beatStart: number[] = [];
  const beatEnd: number[] = [];
  let payIndex = 0;
  BEATS.forEach((f, i) => {
    const x = xAt(f);
    beatStart.push(pts.length);
    pts.push([x - 9, y], [x - 3, y - 17], [x + 3, y + 9]);
    beatEnd.push(pts.length);
    pts.push([x + 8, y]);
    if (i === 0) {
      payIndex = pts.length;
      pts.push([xAt(PAY), y]);
    }
  });
  pts.push([x1, y]);

  const cum = [0];
  for (let i = 1; i < pts.length; i++) {
    cum.push(cum[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
  }
  const length = cum[cum.length - 1];
  const start = (i: number) => cum[beatStart[i]];
  const end = (i: number) => cum[beatEnd[i]];
  const pay = cum[payIndex];

  // Instants (en p) et distances : un battement par message, une attente au point de vente.
  const nodes: readonly (readonly [number, number])[] = [
    [0.365, 0],
    [0.42, start(0)],
    [0.445, end(0)],
    [0.535, pay],
    [0.582, pay],
    [0.625, start(1)],
    [0.65, end(1)],
    [0.735, start(2)],
    [0.76, end(2)],
    [0.845, start(3)],
    [0.87, end(3)],
    [0.955, lerp(end(3), length, 0.35)],
    [0.985, length],
  ];

  const distAt = (p: number): number => {
    if (!(p > nodes[0][0])) return 0;
    if (p >= nodes[nodes.length - 1][0]) return length;
    for (let i = 1; i < nodes.length; i++) {
      if (p <= nodes[i][0]) {
        return lerp(nodes[i - 1][1], nodes[i][1], (p - nodes[i - 1][0]) / (nodes[i][0] - nodes[i - 1][0]));
      }
    }
    return length;
  };

  const pointAt = (dist: number): Pt => {
    for (let i = 1; i < pts.length; i++) {
      if (dist <= cum[i]) {
        const t = (dist - cum[i - 1]) / (cum[i] - cum[i - 1] || 1);
        return [lerp(pts[i - 1][0], pts[i][0], t), lerp(pts[i - 1][1], pts[i][1], t)];
      }
    }
    return pts[pts.length - 1];
  };

  return {
    d: `M${pts.map((q) => q.join(' ')).join(' L')}`,
    length,
    x0,
    x1,
    y,
    xAt,
    peak: (i) => [xAt(BEATS[i]) - 3, y - 17],
    distAt,
    pointAt,
  };
}
