import assert from 'node:assert/strict';
import { test } from 'node:test';
import { RESULTS, camilleAt, overlayGeometry, resultAt } from './overlay';
import { PAY } from './trace';

const g = overlayGeometry(390);

test('la case de Camille, pour un visuel de 390 px', () => {
  assert.ok(Math.abs(g.cell[0] - 32.84) < 0.01 && Math.abs(g.cell[1] - 195.14) < 0.01);
});

test('Camille part de sa case, descend, puis suit sa ligne jusqu’au bout', () => {
  assert.deepEqual(camilleAt(g, 0.3), g.cell);
  assert.deepEqual(camilleAt(g, 0.365), [g.trace.x0, g.trace.y]);
  assert.deepEqual(camilleAt(g, 1), [g.trace.x1, g.trace.y]);
});

test('les trois résultats se posent à la vente, au sommet du battement J+1 et au bout de la ligne', () => {
  assert.deepEqual(g.targets[0], [g.trace.xAt(PAY), g.trace.y]);
  assert.deepEqual(g.targets[1], g.trace.peak(2));
  assert.deepEqual(g.targets[2], [g.trace.x1, g.trace.y]);
});

test('un résultat apparaît au centre du pictogramme, puis se pose sur la ligne et s’efface', () => {
  RESULTS.forEach((result, i) => {
    assert.equal(resultAt(g, i, result.appear - 0.01).opacity, 0);
    const shown = resultAt(g, i, result.appear + 0.014);
    assert.equal(shown.opacity, 1);
    assert.deepEqual([shown.x, shown.y], g.center);
    const landed = resultAt(g, i, result.land);
    assert.deepEqual([landed.x, landed.y], g.targets[i]);
    assert.equal(landed.opacity, 0);
  });
});
