import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  calculateAvoidedCommission,
  capturedShare,
  OTA_SIMULATOR_BOUNDS,
  type OtaSimulatorInput,
} from './ota-simulator';

const DEFAULTS: OtaSimulatorInput = {
  otaStaysPerYear: 3000,
  averageBasket: 320,
  commissionRate: 17,
  captureBeforeArrival: 25,
  captureAtArrival: 35,
  captureSurvey: 10,
  directReturnRate: 8,
};

test('les trois étapes de capture se cumulent sur les clients restants, pas en somme', () => {
  // 1 − 0,75 × 0,65 × 0,90 = 0,56125, et non 25 + 35 + 10 = 70 %.
  assert.equal(capturedShare(DEFAULTS), 1 - 0.75 * 0.65 * 0.9);
});

test('chaîne le calcul : séjours OTA, clients captés, retours en direct, commission évitée', () => {
  const result = calculateAvoidedCommission(DEFAULTS);

  // 3 000 × 0,56125 = 1 683,75 → 1 684 captés ; × 8 % = 134,72 → 135 retours.
  assert.equal(result.capturedGuests, 1684);
  assert.equal(result.directReturns, 135);
  assert.equal(result.directRevenue, 135 * 320);
  assert.equal(result.avoidedCommission, Math.round(135 * 320 * 0.17));
});

test('une étape à zéro ne capte personne, les autres continuent', () => {
  const result = calculateAvoidedCommission({ ...DEFAULTS, captureAtArrival: 0, captureSurvey: 0 });
  assert.equal(result.capturedGuests, 750);
});

test('renvoie zéro partout quand une entrée chiffrée est négative ou non finie', () => {
  for (const broken of [-5, Number.NaN, Number.POSITIVE_INFINITY]) {
    const result = calculateAvoidedCommission({ ...DEFAULTS, otaStaysPerYear: broken });
    assert.deepEqual(result, { capturedGuests: 0, directReturns: 0, directRevenue: 0, avoidedCommission: 0 });
  }
});

test('borne les pourcentages à 100 : une étape à 150 % ne crée pas de clients', () => {
  const result = calculateAvoidedCommission({ ...DEFAULTS, captureBeforeArrival: 150, directReturnRate: 150 });
  assert.equal(result.capturedGuests, 3000);
  assert.equal(result.directReturns, 3000);
});

test('les valeurs par défaut des curseurs sont celles de l’artefact d’origine et tiennent dans leurs bornes', () => {
  for (const [key, bounds] of Object.entries(OTA_SIMULATOR_BOUNDS)) {
    assert.equal(bounds.default, DEFAULTS[key as keyof OtaSimulatorInput], key);
    assert.ok(bounds.min <= bounds.default && bounds.default <= bounds.max, key);
    assert.equal((bounds.default - bounds.min) % bounds.step, 0, `${key} : défaut hors pas`);
  }
});
