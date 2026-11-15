import assert from 'node:assert/strict';
import { test } from 'node:test';
import { drawPoints } from './draw';

/** Une toile factice qui compte les disques dessinés. */
function fakeCanvas() {
  const calls = { arcs: 0, clears: 0 };
  const ctx = {
    globalAlpha: 1,
    fillStyle: '',
    clearRect: () => { calls.clears++; },
    beginPath: () => {},
    moveTo: () => {},
    arc: () => { calls.arcs++; },
    fill: () => {},
  };
  return { ctx: ctx as unknown as CanvasRenderingContext2D, calls };
}

test('pendant le dézoom, la toile reste vide : les points sont dessinés par le champ de fiches', () => {
  const { ctx, calls } = fakeCanvas();
  drawPoints(ctx, 390, { p: -0.1, q: 0.5 });
  assert.equal(calls.clears, 1);
  assert.equal(calls.arcs, 0);
});

test('fin de l’ouverture : seules les 576 cases vides apparaissent', () => {
  const { ctx, calls } = fakeCanvas();
  drawPoints(ctx, 390, { p: -0.001, q: 1 });
  assert.equal(calls.arcs, 576);
});

test('amas en place : cases vides, 84 doublons et 576 points gardés', () => {
  const { ctx, calls } = fakeCanvas();
  drawPoints(ctx, 390, { p: 0, q: 1 });
  assert.equal(calls.arcs, 576 + 84 + 576);
});

test('doublons fondus et cases remplies : il ne reste que les 576 points gardés', () => {
  const { ctx, calls } = fakeCanvas();
  drawPoints(ctx, 390, { p: 0.2, q: 1 });
  assert.equal(calls.arcs, 576);
});
