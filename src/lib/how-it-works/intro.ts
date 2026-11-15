import { UNIT, type Pt } from './geometry';
import { clamp, lerp, round, smooth } from './math';

/**
 * L'ouverture : la fiche de Camille en grand, puis on dézoome.
 * Comme les repères d'une carte, les fiches rétrécissent avec le zoom jusqu'à devenir des points, puis les
 * points gardent leur taille pendant que l'espace continue de se resserrer : ils finissent en amas.
 */

/** L'espace se resserre SPREAD fois plus que les fiches : au départ elles ne se chevauchent pas. */
export const SPREAD = 7.5;

/** Rayon d'un point pour un visuel d'au moins 445 px de côté (taille validée sur le prototype). */
const BASE_RADIUS = 2.6434;
/** Rayon de la pastille sur la fiche en grand. */
const AVATAR_RADIUS = 24;

/** Rayon d'un point à l'écran, en pixels. */
export function dotRadius(side: number): number {
  return BASE_RADIUS * Math.min(1, (UNIT * side) / 160);
}

/** Les fiches sont un quart plus grandes sur un grand visuel. */
export function cardFactor(side: number): number {
  return side > 440 ? 1.25 : 1;
}

export interface IntroCamera {
  /** Avancement lissé du dézoom, de 0 à 1. */
  tau: number;
  /** Échelle de l'espace : de plusieurs dizaines à 1. */
  zoom: number;
  /** Rayon d'un point à l'écran. */
  radius: number;
  cardOpacity: number;
  /** La fiche se replie sur sa pastille. */
  cardScale: number;
  /** Où se trouve le point de Camille à l'écran. */
  anchor: Pt;
}

/** `home` : place finale du point de Camille ; `start` : place de sa pastille sur la fiche en grand. En pixels. */
export function introCamera(q: number, side: number, home: Pt, start: Pt): IntroCamera {
  const tau = smooth(clamp((q - 0.2) / 0.7));
  const radius = dotRadius(side);
  const zoomStart = ((AVATAR_RADIUS * cardFactor(side)) / radius) * SPREAD;
  const zoom = Math.pow(zoomStart, 1 - tau);
  const k = zoom / SPREAD;
  const cardOpacity = clamp((k - 0.95) / 0.95);
  return {
    tau,
    zoom,
    radius: radius * Math.cbrt(k * k * k + 1),
    cardOpacity,
    cardScale: lerp(0.4, 1, cardOpacity),
    anchor: [lerp(start[0], home[0], tau), lerp(start[1], home[1], tau)],
  };
}

/** Transformation SVG du champ : un zoom autour du point de Camille, qui reste sous l'ancre. */
export function introTransform(cam: IntroCamera, home: Pt): string {
  const zoom = round(cam.zoom, 4);
  return `translate(${round(cam.anchor[0] - home[0] * zoom)} ${round(cam.anchor[1] - home[1] * zoom)}) scale(${zoom})`;
}

/** Indices des points assez proches de Camille (le point 0) pour être vus en fiche pendant le dézoom. */
export function nearCamille(points: readonly Pt[], radius = 0.5): number[] {
  const [cx, cy] = points[0];
  return points.flatMap(([x, y], i) => (Math.hypot(x - cx, y - cy) < radius ? [i] : []));
}
