import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  getPricingPhase,
  getDisplayPlans,
  getDisplayAddons,
  getEntryPrice,
} from './pricing';

test('la bascule a lieu le 1er janvier 2027 à minuit, heure de Paris', () => {
  assert.equal(getPricingPhase(new Date('2026-10-13T12:00:00+02:00')), 'announce');
  assert.equal(getPricingPhase(new Date('2026-12-31T23:59:59+01:00')), 'announce');
  assert.equal(getPricingPhase(new Date('2027-01-01T00:00:00+01:00')), 'new');
  assert.equal(getPricingPhase(new Date('2027-06-01T10:00:00+02:00')), 'new');
});

test('pendant l’annonce, prix 2026 affichés avec le prix à venir', () => {
  const plans = Object.fromEntries(getDisplayPlans('announce').map((p) => [p.key, p]));
  assert.deepEqual([plans.discovery.price, plans.discovery.upcomingPrice], ['0', null]);
  assert.deepEqual([plans.communication.price, plans.communication.upcomingPrice], ['69', '99']);
  assert.deepEqual([plans.conversion.price, plans.conversion.upcomingPrice], ['149', '179']);
  assert.deepEqual([plans.allInclusive.price, plans.allInclusive.upcomingPrice], ['249', '299']);
});

test('après la bascule, prix 2027 sans mention à venir', () => {
  const prices = getDisplayPlans('new').map((p) => [p.key, p.price, p.upcomingPrice]);
  assert.deepEqual(prices, [
    ['discovery', '0', null],
    ['communication', '99', null],
    ['conversion', '179', null],
    ['allInclusive', '299', null],
  ]);
});

test('modules : +10 € sauf la Guest App, qui ne mentionne aucune hausse', () => {
  const announce = getDisplayAddons('announce').map((a) => [a.key, a.price, a.upcomingPrice]);
  assert.deepEqual(announce, [
    ['reviews', '19', '29'],
    ['aiAgent', '19', '29'],
    ['payments', '29', '39'],
    ['loyalty', '39', '49'],
    ['guestApp', '49', null],
  ]);
  const after = getDisplayAddons('new').map((a) => [a.key, a.price, a.upcomingPrice]);
  assert.deepEqual(after, [
    ['reviews', '29', null],
    ['aiAgent', '29', null],
    ['payments', '39', null],
    ['loyalty', '49', null],
    ['guestApp', '49', null],
  ]);
});

test('prix d’entrée payant', () => {
  assert.equal(getEntryPrice('announce'), '69');
  assert.equal(getEntryPrice('new'), '99');
});

test('PRICING_NOW permet de simuler une date', () => {
  process.env.PRICING_NOW = '2027-01-01T00:00:00+01:00';
  try {
    assert.equal(getPricingPhase(), 'new');
  } finally {
    delete process.env.PRICING_NOW;
  }
});
