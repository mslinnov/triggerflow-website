import assert from 'node:assert/strict';
import { test } from 'node:test';
import { MIN_SIDE, fitSide, shortScreenTracker } from './layout';

test('côté du visuel : téléphone, petit téléphone, tablette, ordinateur', () => {
  assert.equal(fitSide(390, 680), 368);
  assert.equal(fitSide(360, 640), 328);
  assert.equal(fitSide(768, 900), 430);
  assert.equal(fitSide(1280, 800), 580);
  assert.ok(Math.abs(fitSide(1024, 768) - 471.04) < 0.01);
});

test('écran trop court pour la scène : téléphone couché, fenêtre écrasée', () => {
  assert.ok(fitSide(640, 360) < MIN_SIDE);
  assert.ok(fitSide(1280, 400) < MIN_SIDE);
  assert.ok(fitSide(360, 640) >= MIN_SIDE);
});

test('la bascule ne bouge pas quand seule la hauteur change (barre d’adresse du téléphone qui se replie)', () => {
  const tooShort = shortScreenTracker();
  assert.equal(tooShort(375, 548), true);
  assert.equal(tooShort(375, 630), true, 'la barre se replie : on garde la version fixe');
  const tall = shortScreenTracker();
  assert.equal(tall(390, 664), false);
  assert.equal(tall(390, 500), false, 'la hauteur baisse sans changement de largeur : on garde la scène');
});

test('la bascule est recalculée quand la largeur change (rotation, fenêtre redimensionnée)', () => {
  const tooShort = shortScreenTracker();
  assert.equal(tooShort(390, 664), false);
  assert.equal(tooShort(664, 390), true);
  assert.equal(tooShort(1280, 800), false);
});
