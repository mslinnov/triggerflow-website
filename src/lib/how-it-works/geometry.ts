import { rng } from './math';

/**
 * Géométrie du parcours. Unités : 1 = 36 % du côté du visuel carré, origine au centre, y vers le bas.
 * Le cadre va donc de −1,39 à +1,39.
 */
export type Pt = readonly [number, number];

export const UNIT = 0.36;

/** La base propre : trois blocs de COLS × ROWS cases, au pas de STEP. */
export const COLS = 12;
export const ROWS = 16;
export const STEP = 0.066;
export const GRID_CY = 0.1;
/** Écart ajouté de chaque côté quand les blocs se séparent. */
export const GAP = 2 * STEP;
/** Points gardés : un par case. */
export const KEPT = 3 * COLS * ROWS;
/** Doublons, qui se fondent dans la case de leur jumeau. */
export const DUPES = 84;

export const TOOL_X = [-1.08, -0.54, 0, 0.54, 1.08] as const;
export const CLUSTER_Y = -0.93;
export const CLUSTER_R = 0.225;

/** La case de Sophie, dans le bloc des couples. */
export const SOPHIE = { block: 0, col: 2, row: 6 } as const;

const GRID_TOP = GRID_CY - ((ROWS - 1) * STEP) / 2;

/** Position d'une case. `spread` : 0 = blocs accolés, 1 = blocs écartés. */
export function cellAt(block: number, col: number, row: number, spread: number): Pt {
  return [(block - 1) * (COLS * STEP + spread * GAP) + (col - (COLS - 1) / 2) * STEP, GRID_TOP + row * STEP];
}

export interface Layout {
  /** Points gardés dans les amas : le point i est dans l'amas i % 5. Le point 0 est Sophie. */
  clusters: Pt[];
  /** Doublons dans les amas, même règle. */
  clusterDupes: Pt[];
  /** Les cases, blocs accolés. */
  grid: Pt[];
  /** Les mêmes cases, blocs écartés (même indice = même case). */
  blocks: Pt[];
  /** Chaque doublon posé de travers, entre quatre cases. */
  dupesAskew: Pt[];
  /** La case où chaque doublon se fond. */
  dupesHome: Pt[];
}

/** Amas en vrac mais sans points empilés : on doit voir des points distincts pendant le dézoom. */
function clusterPools(next: () => number): Pt[][] {
  const perCluster = Math.ceil((KEPT + DUPES) / TOOL_X.length) + 1;
  return TOOL_X.map((cx) => {
    const pts: Pt[] = [[cx + 0.02, CLUSTER_Y + 0.01]];
    let minDist = 0.031;
    let misses = 0;
    while (pts.length < perCluster) {
      const angle = next() * Math.PI * 2;
      const dist = Math.sqrt(next()) * CLUSTER_R;
      const x = cx + Math.cos(angle) * dist;
      const y = CLUSTER_Y + Math.sin(angle) * dist;
      if (pts.every((q) => Math.hypot(q[0] - x, q[1] - y) >= minDist)) {
        pts.push([x, y]);
        misses = 0;
      } else if (++misses > 300) {
        minDist *= 0.96;
        misses = 0;
      }
    }
    return pts;
  });
}

export function buildLayout(seed = 12): Layout {
  const next = rng(seed);
  const pools = clusterPools(next);
  const used = pools.map(() => 0);
  const take = (n: number): Pt[] =>
    Array.from({ length: n }, (_, i) => pools[i % pools.length][used[i % pools.length]++]);
  const clusters = take(KEPT);
  const clusterDupes = take(DUPES);

  const cells = Array.from(
    { length: KEPT },
    (_, i) => [Math.floor(i / (COLS * ROWS)), i % COLS, Math.floor(i / COLS) % ROWS] as const,
  );
  const grid = cells.map(([b, c, r]) => cellAt(b, c, r, 0));
  const blocks = cells.map(([b, c, r]) => cellAt(b, c, r, 1));

  const seen = new Set<string>();
  const dupesAskew: Pt[] = [];
  const dupesHome: Pt[] = [];
  while (dupesAskew.length < DUPES) {
    const col = Math.floor(next() * (3 * COLS - 1));
    const row = Math.floor(next() * (ROWS - 1));
    const key = `${col}:${row}`;
    if (seen.has(key)) continue;
    seen.add(key);
    const x0 = (col - (3 * COLS - 1) / 2) * STEP;
    const y0 = GRID_TOP + row * STEP;
    const dx = next() < 0.5 ? 0 : 1;
    const dy = next() < 0.5 ? 0 : 1;
    dupesAskew.push([x0 + STEP / 2, y0 + STEP / 2]);
    dupesHome.push([x0 + dx * STEP, y0 + dy * STEP]);
  }
  return { clusters, clusterDupes, grid, blocks, dupesAskew, dupesHome };
}

/** Passe des unités aux pixels pour un visuel carré de côté `side`. */
export function projector(side: number): { u: number; x(v: number): number; y(v: number): number } {
  const u = UNIT * side;
  return { u, x: (v) => side / 2 + v * u, y: (v) => side / 2 + v * u };
}

let layout: Layout | null = null;

/** La géométrie, calculée une seule fois pour toute la page. */
export function getLayout(): Layout {
  layout ??= buildLayout();
  return layout;
}
