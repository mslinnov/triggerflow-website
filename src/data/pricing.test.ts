import { test } from 'node:test';
import assert from 'node:assert/strict';
import { PLANS, getPricingPhase, getDisplayPlans, getDisplayAddons, getEntryPrice } from './pricing';

test('la grille One Way / Two Way / All Inclusive est en vigueur depuis le 8 novembre 2026', () => {
  assert.equal(getPricingPhase(new Date('2026-11-07T23:59:59+01:00')), 'announce');
  assert.equal(getPricingPhase(new Date('2026-11-08T00:00:00+01:00')), 'new');
  assert.equal(getPricingPhase(new Date('2027-06-01T10:00:00+02:00')), 'new');
});

test('plans : 0 / 99 / 179 / 249 €, sans hausse annoncée', () => {
  const prices = getDisplayPlans('new').map((p) => [p.key, p.price, p.upcomingPrice]);
  assert.deepEqual(prices, [
    ['discovery', '0', null],
    ['communication', '99', null],
    ['conversion', '179', null],
    ['allInclusive', '249', null],
  ]);
  assert.ok(getDisplayPlans('announce').every((p) => p.upcomingPrice === null));
});

test('modules au choix inclus : 0, 1, 2, puis tous', () => {
  assert.deepEqual(PLANS.map((p) => p.includedModules), [0, 1, 2, 'all']);
});

test('modules ajoutés à l’unité, sans hausse annoncée', () => {
  const addons = getDisplayAddons('new').map((a) => [a.key, a.price, a.upcomingPrice]);
  assert.deepEqual(addons, [
    ['reviews', '29', null],
    ['aiAgent', '29', null],
    ['payments', '39', null],
    ['loyalty', '49', null],
    ['guestApp', '49', null],
  ]);
});

test('prix d’entrée payant', () => {
  assert.equal(getEntryPrice('new'), '99');
});

test('PRICING_NOW permet de simuler une date', () => {
  process.env.PRICING_NOW = '2026-11-01T00:00:00+01:00';
  try {
    assert.equal(getPricingPhase(), 'announce');
  } finally {
    delete process.env.PRICING_NOW;
  }
});
