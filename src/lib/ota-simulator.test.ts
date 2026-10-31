import assert from 'node:assert/strict';
import { test } from 'node:test';
import { calculateAvoidedCommission, OTA_SIMULATOR_BOUNDS } from './ota-simulator';

test('chaîne le calcul : séjours OTA, clients captés, retours en direct, commission évitée', () => {
  const result = calculateAvoidedCommission({
    otaStaysPerYear: 2000,
    averageBasket: 250,
    commissionRate: 17,
    captureRate: 25,
    directReturnRate: 10,
  });

  assert.equal(result.capturedGuests, 500);
  assert.equal(result.directReturns, 50);
  assert.equal(result.directRevenue, 12_500);
  assert.equal(result.avoidedCommission, 2125);
});

test('arrondit les clients à l’unité avant de chiffrer, pour que le détail affiché retombe sur le total', () => {
  const result = calculateAvoidedCommission({
    otaStaysPerYear: 333,
    averageBasket: 180,
    commissionRate: 15,
    captureRate: 27,
    directReturnRate: 7,
  });

  // 333 × 27 % = 89,91 → 90 clients captés ; 90 × 7 % = 6,3 → 6 retours.
  assert.equal(result.capturedGuests, 90);
  assert.equal(result.directReturns, 6);
  assert.equal(result.directRevenue, 6 * 180);
  assert.equal(result.avoidedCommission, Math.round(6 * 180 * 0.15));
});

test('renvoie zéro partout quand une entrée est nulle, négative ou non finie', () => {
  for (const broken of [0, -5, Number.NaN, Number.POSITIVE_INFINITY]) {
    const result = calculateAvoidedCommission({
      otaStaysPerYear: broken,
      averageBasket: 250,
      commissionRate: 17,
      captureRate: 25,
      directReturnRate: 10,
    });
    assert.deepEqual(result, { capturedGuests: 0, directReturns: 0, directRevenue: 0, avoidedCommission: 0 });
  }
});

test('borne les pourcentages à 100 : un taux saisi à 150 % ne crée pas de clients', () => {
  const result = calculateAvoidedCommission({
    otaStaysPerYear: 100,
    averageBasket: 100,
    commissionRate: 150,
    captureRate: 150,
    directReturnRate: 150,
  });

  assert.equal(result.capturedGuests, 100);
  assert.equal(result.directReturns, 100);
  assert.equal(result.avoidedCommission, 100 * 100);
});

test('les valeurs par défaut des curseurs tiennent dans leurs bornes', () => {
  for (const [key, bounds] of Object.entries(OTA_SIMULATOR_BOUNDS)) {
    assert.ok(bounds.min <= bounds.default && bounds.default <= bounds.max, key);
    assert.equal((bounds.default - bounds.min) % bounds.step, 0, `${key} : défaut hors pas`);
  }
});
