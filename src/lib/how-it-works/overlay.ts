import { CAMILLE, COLS, GRID_BOTTOM, ROWS, STEP, TOOL_LABEL_Y, TOOL_X, cellAt, projector, type Pt } from './geometry';
import { clamp, easeInOut, lerp } from './math';
import { PAY, buildTrace, type Trace } from './trace';

/**
 * Géométrie du calque posé sur la toile : la case de Camille, sa descente vers sa ligne de séjour,
 * et les résultats (vente, avis, réservation directe) qui viennent s'y poser. En pixels.
 */

/** Centre vertical des pictogrammes, en unités. */
const PICTO_CY = 0.07;

/** Un résultat : une pastille pêche apparaît au centre, part, se pose sur la ligne et y laisse une marque. */
export interface Result {
  appear: number;
  leave: number;
  land: number;
  /** Instant où la marque apparaît sur la ligne. */
  mark: number;
  /** Rayon de la marque. La dernière est plus large pour rester visible autour du point de Camille. */
  radius: number;
}

export const RESULTS: readonly Result[] = [
  { appear: 0.52, leave: 0.548, land: 0.582, mark: 0.572, radius: 6.5 },
  { appear: 0.748, leave: 0.768, land: 0.8, mark: 0.79, radius: 6.5 },
  { appear: 0.945, leave: 0.96, land: 0.992, mark: 0.982, radius: 10.5 },
];

export interface OverlayGeometry {
  side: number;
  trace: Trace;
  /** La case de Camille. */
  cell: Pt;
  /** Les quatre points de la courbe de descente, de sa case au début de sa ligne. */
  drop: readonly [Pt, Pt, Pt, Pt];
  dropPath: string;
  /** Cadre du bloc des couples. */
  frame: { x: number; y: number; width: number; height: number };
  /** Centre des pictogrammes : là où un résultat apparaît. */
  center: Pt;
  /** Là où chaque résultat se pose. */
  targets: readonly Pt[];
  toolX: readonly number[];
  toolY: number;
  groupX: readonly number[];
  /** Hauteur des noms de groupes et de « Doublons fusionnés ». */
  groupY: number;
}

export function overlayGeometry(side: number): OverlayGeometry {
  const { u, x, y } = projector(side);
  const trace = buildTrace(side, side);
  const [cellX, cellY] = cellAt(CAMILLE.block, CAMILLE.col, CAMILLE.row, 1);
  const cell: Pt = [x(cellX), y(cellY)];
  const end: Pt = [trace.x0, trace.y];
  const drop = [cell, [cell[0], cell[1] + 0.5 * u], [end[0], end[1] - 0.45 * u], end] as const;
  const [frameX, frameY] = cellAt(0, 0, 0, 1);
  return {
    side,
    trace,
    cell,
    drop,
    dropPath: `M${drop[0].join(' ')} C${drop[1].join(' ')} ${drop[2].join(' ')} ${drop[3].join(' ')}`,
    frame: {
      x: x(frameX - 0.085),
      y: y(frameY - 0.085),
      width: ((COLS - 1) * STEP + 0.17) * u,
      height: ((ROWS - 1) * STEP + 0.17) * u,
    },
    center: [side / 2, y(PICTO_CY)],
    targets: [[trace.xAt(PAY), trace.y], trace.peak(2), [trace.x1, trace.y]],
    toolX: TOOL_X.map(x),
    toolY: y(TOOL_LABEL_Y),
    groupX: [0, 1, 2].map((block) => x(cellAt(block, (COLS - 1) / 2, 0, 1)[0])),
    groupY: y(GRID_BOTTOM + 0.16),
  };
}

/** Avancement de la descente de Camille vers sa ligne, de 0 à 1. */
export const dropProgress = (p: number): number => easeInOut((p - 0.325) / 0.04);

/** Où est Camille : dans sa case, en descente, puis sur sa ligne. */
export function camilleAt(g: OverlayGeometry, p: number): Pt {
  if (p >= 0.365) return g.trace.pointAt(g.trace.distAt(p));
  const t = dropProgress(p);
  const m = 1 - t;
  const [a, c1, c2, b] = g.drop;
  const mix = (k: 0 | 1) => m * m * m * a[k] + 3 * m * m * t * c1[k] + 3 * m * t * t * c2[k] + t * t * t * b[k];
  return [mix(0), mix(1)];
}

/** Rayon du point de Camille : plus gros quand on la choisit, plus fin sur sa ligne. */
export const camilleRadius = (p: number): number => lerp(8.5, 6.5, clamp((p - 0.325) / 0.04));

/** Position, avancement et opacité de la pastille du résultat `index`. */
export function resultAt(g: OverlayGeometry, index: number, p: number): { x: number; y: number; t: number; opacity: number } {
  const { appear, leave, land } = RESULTS[index];
  const t = easeInOut((p - leave) / (land - leave));
  const target = g.targets[index];
  const [x, y] = t >= 1 ? target : [lerp(g.center[0], target[0], t), lerp(g.center[1], target[1], t)];
  return { x, y, t, opacity: clamp((p - appear) / 0.012) * clamp((1 - t) / 0.2) };
}
