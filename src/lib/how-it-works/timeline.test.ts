import assert from 'node:assert/strict';
import { test } from 'node:test';
import { toJourneyTime } from './timeline';

test('ouverture : p négatif, puis 0 quand le dézoom est fini', () => {
  assert.deepEqual(toJourneyTime(0.17), { p: 0, q: 1 });
  assert.ok(Math.abs(toJourneyTime(0).p + 0.17 / 0.83) < 1e-9);
  assert.equal(toJourneyTime(0).q, 0);
  assert.equal(toJourneyTime(1).p, 1);
});

test('rebond du défilement : hors bornes et NaN', () => {
  assert.deepEqual(toJourneyTime(-0.1), toJourneyTime(0));
  assert.deepEqual(toJourneyTime(1.3), toJourneyTime(1));
  assert.deepEqual(toJourneyTime(NaN), toJourneyTime(0));
});
