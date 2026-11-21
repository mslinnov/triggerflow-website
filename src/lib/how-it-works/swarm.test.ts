import assert from 'node:assert/strict';
import { test } from 'node:test';
import { rng } from './math';
import { matchNearest } from './swarm';

test('matchNearest rend une permutation', () => {
  const r = rng(3);
  const a = Array.from({ length: 60 }, () => [r(), r()] as const);
  const b = Array.from({ length: 60 }, () => [r(), r()] as const);
  assert.deepEqual([...matchNearest(a, b)].sort((x, y) => x - y), a.map((_, i) => i));
});

test('matchNearest prend la cible libre la plus proche, dans l’ordre des points', () => {
  assert.deepEqual(matchNearest([[0, 0], [0.1, 0]], [[1, 0], [0.05, 0]]), [1, 0]);
});
