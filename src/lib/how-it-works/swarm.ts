import type { Pt } from './geometry';

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
