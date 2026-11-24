import { test } from 'node:test';
import assert from 'node:assert/strict';
import { placeTooltip } from './tooltip-position';

const tip = { width: 300, height: 120 };
const desktop = { width: 1440, height: 900 };
const phone = { width: 390, height: 844 };

test('sous le bouton et centré quand il y a la place', () => {
  const p = placeTooltip({ top: 300, bottom: 316, left: 700, width: 16 }, tip, desktop);
  assert.deepEqual(p, { side: 'bottom', top: 326, left: 558, arrowLeft: 150 });
});

test('au-dessus quand la bulle sortirait par le bas', () => {
  const p = placeTooltip({ top: 800, bottom: 816, left: 700, width: 16 }, tip, desktop);
  assert.equal(p.side, 'top');
  assert.equal(p.top, 800 - 10 - 120);
});

test('reste dessous si le haut manque aussi de place (en-tête collant)', () => {
  const p = placeTooltip({ top: 100, bottom: 116, left: 700, width: 16 }, tip, { width: 1440, height: 200 });
  assert.equal(p.side, 'bottom');
});

test('à 390 px, bornée à 16 px des bords, flèche toujours sur le bouton', () => {
  const left = placeTooltip({ top: 300, bottom: 316, left: 4, width: 16 }, { width: 358, height: 120 }, phone);
  assert.equal(left.left, 16);
  assert.equal(left.arrowLeft, 12);
  const right = placeTooltip({ top: 300, bottom: 316, left: 360, width: 16 }, { width: 358, height: 120 }, phone);
  assert.equal(right.left, 390 - 16 - 358);
  assert.equal(right.arrowLeft, 368 - 16 - 6);
});
