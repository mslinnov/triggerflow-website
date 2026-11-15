import assert from 'node:assert/strict';
import { test } from 'node:test';
import { buildLayout } from './geometry';
import { rng } from './math';
import { type Sample, buildTracks, matchNearest, newSample, sampleTrack } from './swarm';

const L = buildLayout();
const T = buildTracks(L);
const s = newSample(T.kept.count);
const d = newSample(T.dupes.count);
const key = (x: number, y: number) => `${x.toFixed(3)},${y.toFixed(3)}`;
const set = (o: Sample) => new Set(Array.from(o.x, (x, i) => key(x, o.y[i])));

test('matchNearest rend une permutation', () => {
  const r = rng(3);
  const a = Array.from({ length: 60 }, () => [r(), r()] as const);
  const b = Array.from({ length: 60 }, () => [r(), r()] as const);
  assert.deepEqual([...matchNearest(a, b)].sort((x, y) => x - y), a.map((_, i) => i));
});

test('aux images clés, les points sont exactement sur la forme', () => {
  sampleTrack(T.kept, 0.185, s);
  assert.deepEqual(set(s), new Set(L.grid.map(([x, y]) => key(x, y))));
  sampleTrack(T.kept, 0.262, s);
  assert.deepEqual(set(s), new Set(L.blocks.map(([x, y]) => key(x, y))));
});

test('les blocs s’écartent d’un seul tenant', () => {
  const a = newSample(T.kept.count);
  sampleTrack(T.kept, 0.185, a);
  sampleTrack(T.kept, 0.2, s);
  assert.equal(new Set(Array.from(s.x, (x, i) => (x - a.x[i]).toFixed(4))).size, 3);
  s.y.forEach((y, i) => assert.equal(y, a.y[i]));
});

test('opacité : 20 % pendant le choix de Camille, pleine à l’enveloppe', () => {
  sampleTrack(T.kept, 0.3, s);
  assert.ok(Math.abs(s.alpha - 0.2) < 1e-6);
  sampleTrack(T.kept, 0.45, s);
  assert.equal(s.alpha, 1);
});

test('doublons fondus à partir de 0,158', () => {
  sampleTrack(T.dupes, 0.16, d);
  assert.equal(d.alpha, 0);
});

test('l’image ne dépend que de p : saut direct = balayage', () => {
  const direct = newSample(T.kept.count);
  sampleTrack(T.kept, 1, direct);
  for (let p = 0; p <= 1; p += 0.01) sampleTrack(T.kept, p, s);
  sampleTrack(T.kept, 1, s);
  assert.deepEqual(Array.from(s.x), Array.from(direct.x));
});

test('hors bornes et NaN : mêmes images qu’à 0 et à 1, jamais de valeur infinie', () => {
  const a = newSample(T.kept.count);
  sampleTrack(T.kept, 1, a);
  sampleTrack(T.kept, 1.4, s);
  assert.deepEqual(Array.from(s.x), Array.from(a.x));
  sampleTrack(T.kept, 0, a);
  sampleTrack(T.kept, NaN, s);
  assert.deepEqual(Array.from(s.x), Array.from(a.x));
  for (let p = 0; p <= 1; p += 0.01) {
    sampleTrack(T.kept, p, s);
    assert.ok(s.x.every(Number.isFinite) && s.y.every(Number.isFinite));
  }
});

test('une forme tenue ne bouge pas : chaque pictogramme reste en place entre sa mise en place et son départ', () => {
  const a = newSample(T.kept.count);
  for (const [from, to] of [[0.42, 0.48], [0.515, 0.59], [0.625, 0.7], [0.735, 0.81], [0.845, 0.905], [0.94, 1]]) {
    sampleTrack(T.kept, from, a);
    sampleTrack(T.kept, (from + to) / 2, s);
    assert.deepEqual(Array.from(s.x), Array.from(a.x), `tenue ${from} → ${to}`);
    assert.deepEqual(Array.from(s.y), Array.from(a.y), `tenue ${from} → ${to}`);
  }
});
