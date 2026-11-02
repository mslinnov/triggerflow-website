import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  calculateAvoidedCommission,
  capturedShare,
  OTA_SIMULATOR_BOUNDS,
  type OtaSimulatorInput,
} from './ota-simulator';
import { CLIENTS_OTA_CAPTURE_RATE } from '../data/clients-ota';

const DEFAULTS: OtaSimulatorInput = {
  otaStaysPerYear: 3000,
  averageBasket: 320,
  commissionRate: 17,
  captureBeforeArrival: 20,
  captureAtArrival: 7,
  captureSurvey: 3,
  directReturnRate: 8,
};

test('les trois étapes de capture se cumulent sur les clients restants, pas en somme', () => {
  // 1 − 0,80 × 0,93 × 0,97 = 0,27832, et non 20 + 7 + 3 = 30 %.
  assert.ok(Math.abs(capturedShare(DEFAULTS) - (1 - 0.8 * 0.93 * 0.97)) < 1e-12);
});

test('chaîne le calcul : séjours OTA, clients captés, retours en direct, commission évitée', () => {
  const result = calculateAvoidedCommission(DEFAULTS);

  // 3 000 × 0,27832 = 834,96 → 835 captés ; × 8 % = 66,8 → 67 retours.
  assert.equal(result.capturedGuests, 835);
  assert.equal(result.directReturns, 67);
  assert.equal(result.directRevenue, 67 * 320);
  assert.equal(result.avoidedCommission, Math.round(67 * 320 * 0.17));
});

test('une étape à zéro ne capte personne, les autres continuent', () => {
  const result = calculateAvoidedCommission({ ...DEFAULTS, captureAtArrival: 0, captureSurvey: 0 });
  assert.equal(result.capturedGuests, 600);
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

test('les valeurs par défaut des curseurs tiennent dans leurs bornes', () => {
  for (const [key, bounds] of Object.entries(OTA_SIMULATOR_BOUNDS)) {
    assert.equal(bounds.default, DEFAULTS[key as keyof OtaSimulatorInput], key);
    assert.ok(bounds.min <= bounds.default && bounds.default <= bounds.max, key);
    assert.equal((bounds.default - bounds.min) % bounds.step, 0, `${key} : défaut hors pas`);
  }
});

test('par défaut, la part captée sur les trois étapes tombe sur le taux mesuré par l’étude, à un point près', () => {
  // Le bandeau de la page affiche le taux mesuré (environ 28 %) : le simulateur ne doit pas partir du double.
  assert.ok(CLIENTS_OTA_CAPTURE_RATE !== null);
  const defaults = Object.fromEntries(
    Object.entries(OTA_SIMULATOR_BOUNDS).map(([key, bounds]) => [key, bounds.default]),
  ) as unknown as OtaSimulatorInput;
  assert.ok(Math.abs(capturedShare(defaults) - CLIENTS_OTA_CAPTURE_RATE) <= 0.01, `part captée par défaut : ${capturedShare(defaults)}`);
  assert.equal(Math.round(capturedShare(defaults) * 100), Math.round(CLIENTS_OTA_CAPTURE_RATE * 100));
});
