import assert from 'node:assert/strict';
import { test } from 'node:test';
import { clamp, mixHex, rng, round } from './math';

test('clamp : NaN vaut la borne basse', () => assert.equal(clamp(NaN), 0));

test('rng est reproductible', () => {
  const a = rng(12);
  const b = rng(12);
  assert.deepEqual([a(), a(), a()], [b(), b(), b()]);
});

test('mixHex', () => assert.equal(mixHex('#000000', '#ffffff', 0.5), '#808080'));

test('round gomme les écarts de dernière décimale entre le serveur et le navigateur', () => {
  assert.equal(round(1.23456), 1.23);
  assert.equal(round(51.88926783975282), round(51.88926783975285));
  assert.equal(round(0.0121654321, 6), 0.012165);
});
