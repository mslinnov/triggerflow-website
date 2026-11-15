import assert from 'node:assert/strict';
import { test } from 'node:test';
import { CHAPTERS, STATIC_TIMES, chapterOpacity, toJourneyTime } from './timeline';

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

test('dix temps contigus', () => {
  assert.equal(CHAPTERS.length, 10);
  CHAPTERS.slice(1).forEach(([from], i) => assert.equal(from, CHAPTERS[i][1]));
});

test('un seul texte lisible à la fois, et chacun pleinement au milieu de sa plage', () => {
  for (let p = -0.2; p <= 1; p += 0.001) {
    assert.ok(CHAPTERS.reduce((s, _, i) => s + chapterOpacity(i, p), 0) <= 1.0001);
  }
  CHAPTERS.forEach(([a, b], i) => assert.equal(chapterOpacity(i, Math.min(1, Math.max(-0.2, (a + b) / 2))), 1));
});

test('images fixes : une par temps, chacune dans sa plage', () => {
  assert.equal(STATIC_TIMES.length, 10);
  STATIC_TIMES.forEach(({ p }, i) => assert.ok(p >= CHAPTERS[i][0] - 1e-9 && p <= CHAPTERS[i][1]));
});
