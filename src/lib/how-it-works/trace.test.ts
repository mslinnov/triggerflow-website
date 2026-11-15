import assert from 'node:assert/strict';
import { test } from 'node:test';
import { buildTrace } from './trace';

const t = buildTrace(390, 390);

test('la ligne va de 20 px à 20 px du bord, 25 px sous le visuel', () => {
  assert.deepEqual(t.pointAt(0), [20, 415]);
  assert.deepEqual(t.pointAt(t.length), [370, 415]);
});

test('Camille avance toujours, attend au point de vente, arrive au bout à 0,985', () => {
  let last = 0;
  for (let p = 0; p <= 1; p += 0.005) {
    const d = t.distAt(p);
    assert.ok(d >= last - 1e-9);
    last = d;
  }
  assert.equal(t.distAt(0.3), 0);
  assert.equal(t.distAt(0.55), t.distAt(0.58));
  assert.equal(t.distAt(0.985), t.length);
});
