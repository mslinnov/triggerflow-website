import type { Layout, Pt } from './geometry';
import { clamp, lerp, mixHex, smooth } from './math';
import { picto } from './shapes';

/**
 * Le mouvement des points. Tout est fonction de `p` seul : aucune mémoire d'une image à l'autre,
 * donc un saut de défilement donne la même image qu'un défilement continu.
 */

const GREY = '#B2BDBA'; // donnée brute
const MID = '#6C7B78'; // rangée, pas encore fusionnée
const INK = '#002B28'; // donnée propre

/** Écart maximal d'un point à son trajet droit, en unités (trajet en léger arc). */
const ARC = 0.16;

interface KeySpec {
  at: number;
  form: readonly Pt[];
  color?: string;
  opacity?: number;
  turbulence?: number;
  /** Trajet en arc (par défaut) ou droit. */
  straight?: boolean;
  /** Part de l'intervalle consacrée à échelonner les départs. */
  stagger?: number;
  /** Chaque point garde sa cible de même rang que dans la forme précédente (les blocs glissent d'un seul tenant). */
  keepIdentity?: boolean;
}

interface Key {
  at: number;
  /** x0, y0, x1, y1… dans l'ordre des points, pas dans celui de la forme. */
  pts: Float64Array;
  color: string;
  opacity: number;
  turbulence: number;
  arc: number;
  stagger: number;
  /** Même forme que l'image clé précédente : on tient la pose. */
  hold: boolean;
}

export interface Track {
  count: number;
  keys: readonly Key[];
}

export interface Sample {
  x: Float32Array;
  y: Float32Array;
  alpha: number;
  color: string;
}

/** Pour chaque point, dans l'ordre, la cible libre la plus proche. Rend une permutation. */
export function matchNearest(from: readonly Pt[], to: readonly Pt[]): number[] {
  const free = new Uint8Array(to.length).fill(1);
  return from.map(([x, y]) => {
    let best = -1;
    let bestDist = Infinity;
    for (let j = 0; j < to.length; j++) {
      if (!free[j]) continue;
      const dx = x - to[j][0];
      const dy = y - to[j][1];
      const dist = dx * dx + dy * dy;
      if (dist < bestDist) {
        bestDist = dist;
        best = j;
      }
    }
    if (best >= 0) free[best] = 0;
    return Math.max(0, best);
  });
}

function buildTrack(specs: readonly KeySpec[]): Track {
  const count = specs[0].form.length;
  const keys: Key[] = [];
  let order = specs[0].form.map((_, i) => i);
  let form = specs[0].form;
  specs.forEach((spec, index) => {
    const prev = keys[index - 1];
    const hold = index > 0 && spec.form === form;
    if (index > 0 && !hold && !spec.keepIdentity) {
      const current = order.map((target) => form[target]);
      order = matchNearest(current, spec.form);
    }
    form = spec.form;
    const pts = new Float64Array(count * 2);
    order.forEach((target, i) => {
      pts[2 * i] = form[target][0];
      pts[2 * i + 1] = form[target][1];
    });
    keys.push({
      at: spec.at,
      pts,
      color: spec.color ?? prev?.color ?? GREY,
      opacity: spec.opacity ?? prev?.opacity ?? 1,
      turbulence: spec.turbulence ?? prev?.turbulence ?? 0,
      arc: spec.straight ? 0 : ARC,
      stagger: spec.stagger ?? 0,
      hold,
    });
  });
  return { count, keys };
}

/** Les deux nuées : les points gardés (un par case) et les doublons. Instants : annexe B du document de conception. */
export function buildTracks(layout: Layout): { kept: Track; dupes: Track } {
  const shape = (at: number, hold: number, form: readonly Pt[]): KeySpec[] => [
    { at, form, stagger: 0.25 },
    { at: hold, form },
  ];
  const mail = picto('mail');
  const kept = buildTrack([
    { at: 0, form: layout.clusters, color: GREY, opacity: 1, turbulence: 0 },
    { at: 0.025, form: layout.clusters, turbulence: 0.25 },
    { at: 0.105, form: layout.grid, color: MID, turbulence: 0, stagger: 0.5 },
    { at: 0.125, form: layout.grid },
    { at: 0.158, form: layout.grid, color: INK },
    { at: 0.185, form: layout.grid },
    { at: 0.214, form: layout.blocks, straight: true, keepIdentity: true },
    { at: 0.262, form: layout.blocks },
    { at: 0.28, form: layout.blocks, opacity: 0.2 },
    { at: 0.385, form: layout.blocks },
    { at: 0.42, form: mail, opacity: 1, stagger: 0.25 },
    { at: 0.48, form: mail },
    ...shape(0.515, 0.59, picto('card')),
    ...shape(0.625, 0.7, picto('chat')),
    ...shape(0.735, 0.81, picto('heart')),
    ...shape(0.845, 0.905, picto('plane')),
    ...shape(0.94, 1, picto('loop')),
  ]);
  const dupes = buildTrack([
    { at: 0, form: layout.clusterDupes, color: GREY, opacity: 1, turbulence: 0 },
    { at: 0.025, form: layout.clusterDupes, turbulence: 0.25 },
    { at: 0.105, form: layout.dupesAskew, turbulence: 0, stagger: 0.5 },
    { at: 0.125, form: layout.dupesAskew },
    { at: 0.158, form: layout.dupesHome, opacity: 0, straight: true, stagger: 0.3, keepIdentity: true },
    { at: 1, form: layout.dupesHome },
  ]);
  return { kept, dupes };
}

export function newSample(count: number): Sample {
  return { x: new Float32Array(count), y: new Float32Array(count), alpha: 1, color: GREY };
}

/** Remplit `out` avec la position de chaque point, la couleur et l'opacité de la nuée à l'instant `p`. */
export function sampleTrack(track: Track, p: number, out: Sample): void {
  const t = clamp(p);
  const { keys, count } = track;
  let i = 0;
  while (i < keys.length - 2 && t >= keys[i + 1].at) i++;
  const from = keys[i];
  const to = keys[i + 1];
  const phase = clamp((t - from.at) / (to.at - from.at));
  const mix = smooth(phase);
  const turbulence = lerp(from.turbulence, to.turbulence, mix) * 0.25;
  const spin = t * Math.PI * 8;
  out.alpha = lerp(from.opacity, to.opacity, mix);
  out.color = from.color === to.color ? to.color : mixHex(from.color, to.color, mix);
  for (let j = 0; j < count; j++) {
    const seed = j * 2.3999632297;
    let x = to.pts[2 * j];
    let y = to.pts[2 * j + 1];
    if (!to.hold) {
      // Départs échelonnés : chaque point a son rang, étalé par le nombre d'or.
      const rank = (j * 0.61803398875) % 1;
      const local = clamp((phase - rank * to.stagger) / (1 - to.stagger));
      const m = smooth(local);
      const arc = Math.sin(local * Math.PI) * to.arc;
      const ax = from.pts[2 * j];
      const ay = from.pts[2 * j + 1];
      x = ax + (x - ax) * m + Math.cos(seed) * arc;
      y = ay + (y - ay) * m + Math.sin(seed) * arc;
    }
    if (turbulence > 0) {
      x += Math.sin(seed + spin) * turbulence;
      y += Math.cos(seed * 0.8 + spin) * turbulence;
    }
    out.x[j] = x;
    out.y[j] = y;
  }
}
