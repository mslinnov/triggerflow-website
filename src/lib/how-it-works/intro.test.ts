import assert from 'node:assert/strict';
import { test } from 'node:test';
import { dotRadius, introCamera, introTransform, nearSophie } from './intro';

test('rayon d’un point', () => {
  assert.ok(Math.abs(dotRadius(445) - 2.643) < 0.01);
  assert.ok(Math.abs(dotRadius(390) - 2.32) < 0.01);
  assert.equal(dotRadius(580), dotRadius(445));
});

test('début : la fiche en grand ; fin : des points à leur place', () => {
  const a = introCamera(0, 390, [44, 65], [89, 192]);
  const b = introCamera(1, 390, [44, 65], [89, 192]);
  assert.ok(Math.abs(a.zoom - (24 / dotRadius(390)) * 7.5) < 1e-6);
  assert.equal(a.cardOpacity, 1);
  assert.equal(a.cardScale, 1);
  assert.deepEqual(a.anchor, [89, 192]);
  assert.equal(b.zoom, 1);
  assert.equal(b.cardOpacity, 0);
  assert.deepEqual(b.anchor, [44, 65]);
  assert.ok(Math.abs(b.radius - dotRadius(390)) < 0.01);
});

test('le dézoom ne revient jamais en arrière', () => {
  let z = Infinity;
  for (let q = 0.2; q <= 0.9; q += 0.01) {
    const c = introCamera(q, 390, [44, 65], [89, 192]);
    assert.ok(c.zoom <= z);
    z = c.zoom;
  }
});

test('le zoom se fait autour du point de Sophie : il reste sous l’ancre', () => {
  const cam = { tau: 0.5, zoom: 2, radius: 3, cardOpacity: 1, cardScale: 1, anchor: [50, 60] as const };
  assert.equal(introTransform(cam, [10, 20]), 'translate(30 20) scale(2)');
});

test('seules les fiches proches de Sophie sont dessinées', () => {
  assert.deepEqual(nearSophie([[0, 0], [0.4, 0], [0.6, 0], [0, -0.49]]), [0, 1, 3]);
});

test('la transformation est arrondie : même texte côté serveur et côté navigateur', () => {
  const cam = { tau: 0.5, zoom: 2.000000000000004, radius: 3, cardOpacity: 1, cardScale: 1, anchor: [50.00000000000001, 60] as const };
  assert.equal(introTransform(cam, [10, 20]), 'translate(30 20) scale(2)');
});
