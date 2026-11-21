import assert from 'node:assert/strict';
import { test } from 'node:test';
import { picto } from './shapes';

for (const name of ['mail', 'card', 'chat', 'heart', 'plane', 'loop'] as const) {
  test(`pictogramme ${name} : 576 points dans le cadre, pas tous confondus`, () => {
    const pts = picto(name);
    assert.equal(pts.length, 576);
    pts.forEach(([x, y]) => assert.ok(Math.abs(x) < 1.39 && Math.abs(y) < 1.39));
    assert.ok(new Set(pts.map(String)).size > 300);
  });
}
