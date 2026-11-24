import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import fr from '../../messages/fr.json';
import en from '../../messages/en.json';
import {
  PLANS,
  getRoiAverageBasket,
  getPaybackBookings,
  isRoiPreviewEnabled,
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

test('volume d’e-mails compris par offre : 1 000, 5 000, 15 000, 50 000', () => {
  assert.deepEqual(
    PLANS.map((p) => [p.key, p.emailsPerMonth]),
    [['discovery', 1000], ['communication', 5000], ['conversion', 15000], ['allInclusive', 50000]],
  );
});

test('l’offre à 249 € s’appelle Illimités (Unlimited en anglais)', () => {
  const top = PLANS.find((p) => p.key === 'allInclusive');
  assert.deepEqual(top?.name, { fr: 'Illimités', en: 'Unlimited' });
  assert.equal(fr.pricing.plans.allInclusive.name, 'Illimités');
  assert.equal(en.pricing.plans.allInclusive.name, 'Unlimited');
});

test('plus aucun « All Inclusive » lu par le public (messages, prix, blog, LP)', () => {
  const files = [
    'messages/fr.json',
    'messages/en.json',
    'src/data/pricing.ts',
    'src/components/landing/thais/ThaisFAQ.tsx',
    ...readdirSync('content/blog', { recursive: true })
      .map(String)
      .filter((f) => f.endsWith('.mdx'))
      .map((f) => join('content/blog', f)),
  ];
  const left = files.filter((f) => readFileSync(f, 'utf8').includes('All Inclusive'));
  assert.deepEqual(left, []);
});

test('accroches des cartes = descriptions du JSON-LD, sans tiret cadratin', () => {
  for (const plan of PLANS) {
    assert.equal(fr.pricing.plans[plan.key].description, plan.description.fr, `${plan.key} fr`);
    assert.equal(en.pricing.plans[plan.key].description, plan.description.en, `${plan.key} en`);
    assert.ok(!plan.description.fr.includes('—') && !plan.description.en.includes('—'));
  }
});

test('ce que ça rapporte : réservations qui remboursent le mois, dans les deux phases', () => {
  assert.equal(getRoiAverageBasket(), 212.5);
  const payback = (phase: 'announce' | 'new') =>
    getDisplayPlans(phase)
      .filter((p) => Number(p.price) > 0)
      .map((p) => [p.key, getPaybackBookings(p.price)]);
  const expected = [['communication', 1], ['conversion', 1], ['allInclusive', 2]];
  assert.deepEqual(payback('announce'), expected);
  assert.deepEqual(payback('new'), expected);
  assert.equal(getPaybackBookings('213'), 2);
});

test('bloc rentabilité : masqué sauf PRICING_ROI_PREVIEW=1', () => {
  assert.equal(isRoiPreviewEnabled({}), false);
  assert.equal(isRoiPreviewEnabled({ PRICING_ROI_PREVIEW: 'true' }), false);
  assert.equal(isRoiPreviewEnabled({ PRICING_ROI_PREVIEW: '1' }), true);
});
