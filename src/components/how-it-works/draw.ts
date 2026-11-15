import { buildLayout, projector, type Layout, type Pt } from '../../lib/how-it-works/geometry';
import { dotRadius } from '../../lib/how-it-works/intro';
import { clamp } from '../../lib/how-it-works/math';
import { buildTracks, newSample, sampleTrack, type Sample, type Track } from '../../lib/how-it-works/swarm';
import type { JourneyTime } from '../../lib/how-it-works/timeline';

/** Cases vides de la grille, avant que les points ne les remplissent. */
const SLOT = '#E1E6E4';

export interface Scene {
  layout: Layout;
  kept: Track;
  dupes: Track;
}

let scene: Scene | null = null;
let keptSample: Sample | null = null;
let dupeSample: Sample | null = null;

/** La géométrie et les trajets, calculés une seule fois pour toute la page. */
export function getScene(): Scene {
  if (!scene) {
    const layout = buildLayout();
    scene = { layout, ...buildTracks(layout) };
  }
  return scene;
}

function fillDots(
  ctx: CanvasRenderingContext2D,
  count: number,
  at: (i: number) => Pt,
  radius: number,
  color: string,
  alpha: number,
): void {
  ctx.globalAlpha = alpha;
  ctx.fillStyle = color;
  ctx.beginPath();
  for (let i = 0; i < count; i++) {
    const [x, y] = at(i);
    ctx.moveTo(x + radius, y);
    ctx.arc(x, y, radius, 0, Math.PI * 2);
  }
  ctx.fill();
  ctx.globalAlpha = 1;
}

/**
 * Dessine l'état du parcours à l'instant `time` sur une toile carrée de côté `side` (en pixels CSS).
 * Pendant l'ouverture (p < 0), les points sont dessinés par le champ de fiches : la toile ne montre
 * que les cases vides, qui apparaissent à la fin du dézoom.
 */
export function drawPoints(ctx: CanvasRenderingContext2D, side: number, time: JourneyTime): void {
  const { layout, kept, dupes } = getScene();
  const { x, y } = projector(side);
  const radius = dotRadius(side);
  ctx.clearRect(0, 0, side, side);

  const slotAlpha = (1 - clamp((time.p - 0.1) / 0.02)) * clamp((time.q - 0.86) / 0.14);
  if (slotAlpha > 0) {
    fillDots(ctx, layout.grid.length, (i) => [x(layout.grid[i][0]), y(layout.grid[i][1])], radius * 0.55, SLOT, slotAlpha);
  }
  if (time.p < 0) return;

  dupeSample ??= newSample(dupes.count);
  sampleTrack(dupes, time.p, dupeSample);
  const d = dupeSample;
  if (d.alpha > 0) fillDots(ctx, dupes.count, (i) => [x(d.x[i]), y(d.y[i])], radius, d.color, d.alpha);

  keptSample ??= newSample(kept.count);
  sampleTrack(kept, time.p, keptSample);
  const k = keptSample;
  fillDots(ctx, kept.count, (i) => [x(k.x[i]), y(k.y[i])], radius, k.color, k.alpha);
}
