import assert from 'node:assert/strict';
import { test } from 'node:test';
import { CAMILLE, CLUSTER_R, CLUSTER_Y, STEP, TOOL_X, buildLayout, cellAt } from './geometry';

const L = buildLayout();
const cellKey = ([x, y]: readonly [number, number]) => `${x.toFixed(4)},${y.toFixed(4)}`;

test('grille : 576 cases distinctes, aux bonnes bornes', () => {
  assert.equal(L.grid.length, 576);
  assert.equal(new Set(L.grid.map(cellKey)).size, 576);
  const xs = L.grid.map((q) => q[0]);
  const ys = L.grid.map((q) => q[1]);
  assert.ok(Math.abs(Math.min(...xs) + 1.155) < 1e-9 && Math.abs(Math.max(...xs) - 1.155) < 1e-9);
  assert.ok(Math.abs(Math.min(...ys) + 0.395) < 1e-9 && Math.abs(Math.max(...ys) - 0.595) < 1e-9);
});

test('blocs : la gauche et la droite s’écartent de 0,132, le milieu ne bouge pas', () => {
  const dx = new Set(L.blocks.map((q, i) => (q[0] - L.grid[i][0]).toFixed(3)));
  assert.deepEqual([...dx].sort(), ['-0.132', '0.000', '0.132']);
  L.blocks.forEach((q, i) => assert.equal(q[1], L.grid[i][1]));
});

test('case de Camille', () => {
  const [x, y] = cellAt(CAMILLE.block, CAMILLE.col, CAMILLE.row, 1);
  assert.ok(Math.abs(x + 1.155) < 1e-9 && Math.abs(y - 0.001) < 1e-9);
});

test('amas : dans leur disque, dans le cadre, sans points empilés, reproductibles', () => {
  [...L.clusters, ...L.clusterDupes].forEach(([x, y]) => assert.ok(Math.abs(x) < 1.39 && Math.abs(y) < 1.39));
  L.clusters.forEach(([x, y], i) => assert.ok(Math.hypot(x - TOOL_X[i % 5], y - CLUSTER_Y) <= CLUSTER_R + 1e-9));
  const pms = L.clusters.filter((_, i) => i % 5 === 0);
  for (let i = 0; i < pms.length; i++) {
    for (let j = i + 1; j < pms.length; j++) {
      assert.ok(Math.hypot(pms[i][0] - pms[j][0], pms[i][1] - pms[j][1]) >= 0.02);
    }
  }
  assert.deepEqual(buildLayout(), L);
  assert.ok(Math.hypot(L.clusters[0][0] - TOOL_X[0], L.clusters[0][1] - CLUSTER_Y) < 0.03);
});

test('doublons : 84 interstices distincts, chacun à une demi-diagonale de sa case', () => {
  assert.equal(L.dupesAskew.length, 84);
  assert.equal(new Set(L.dupesAskew.map(String)).size, 84);
  const cells = new Set(L.grid.map(cellKey));
  L.dupesHome.forEach((home, i) => {
    assert.ok(cells.has(cellKey(home)));
    assert.ok(Math.abs(Math.hypot(home[0] - L.dupesAskew[i][0], home[1] - L.dupesAskew[i][1]) - STEP * Math.SQRT1_2) < 1e-9);
  });
});
