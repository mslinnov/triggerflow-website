import assert from 'node:assert/strict';
import { test } from 'node:test';
import { parseRappelBody, relayOutcome, salonLeadUrl, toSalonPayload } from './calendrier-rappel';

const valid = { hotelName: 'Hôtel des Tilleuls', city: 'Lyon', firstname: 'Camille', lastname: 'Martin', email: 'camille@tilleuls.fr', phone: '06 12 34 56 78', wantsDemo: true };

test('demande complète : corps attendu par l’API salon (prénom et nom séparés, démo)', () => {
  const parsed = parseRappelBody(valid);
  assert.equal(parsed.kind, 'ok');
  if (parsed.kind !== 'ok') return;
  assert.deepEqual(toSalonPayload(parsed.input), {
    establishment: { name: 'Hôtel des Tilleuls', city: 'Lyon' },
    contact: { firstname: 'Camille', lastname: 'Martin', email: 'camille@tilleuls.fr', phone: '06 12 34 56 78' },
    wants_demo: true,
  });
});

test('champs facultatifs absents : non envoyés, démo à faux par défaut', () => {
  const parsed = parseRappelBody({ hotelName: 'H', firstname: 'C', email: 'c@h.fr', wantsDemo: 'oui' });
  assert.equal(parsed.kind, 'ok');
  if (parsed.kind !== 'ok') return;
  assert.deepEqual(toSalonPayload(parsed.input), { establishment: { name: 'H' }, contact: { firstname: 'C', email: 'c@h.fr' }, wants_demo: false });
});

test('champ piège rempli : robot, quel que soit le reste', () => {
  assert.deepEqual(parseRappelBody({ website: 'http://spam' }), { kind: 'bot' });
  assert.deepEqual(parseRappelBody({ ...valid, website: 'x' }), { kind: 'bot' });
});

test('champs obligatoires et adresse : refusés, jamais tronqués', () => {
  assert.deepEqual(parseRappelBody({}), { kind: 'invalid', fields: ['hotelName', 'firstname', 'email'] });
  assert.deepEqual(parseRappelBody(null), { kind: 'invalid', fields: ['hotelName', 'firstname', 'email'] });
  assert.deepEqual(parseRappelBody({ ...valid, email: 'pas-une-adresse' }), { kind: 'invalid', fields: ['email'] });
  assert.deepEqual(parseRappelBody({ ...valid, email: `${'a'.repeat(250)}@hotel.fr` }), { kind: 'invalid', fields: ['email'] });
});

test('URL du relais : jeton et transport contrôlés', () => {
  assert.equal(salonLeadUrl('https://api.trigger-flow.com/', 'abcDEF123_-x'), 'https://api.trigger-flow.com/api/public-salon-flyer/abcDEF123_-x/leads');
  assert.equal(salonLeadUrl('http://localhost:8000', 'abcdefgh'), 'http://localhost:8000/api/public-salon-flyer/abcdefgh/leads');
  assert.equal(salonLeadUrl(undefined, 'abcdefgh'), null);
  assert.equal(salonLeadUrl('https://x.fr', undefined), null);
  assert.equal(salonLeadUrl('https://x.fr', '../../admin'), null);
  assert.equal(salonLeadUrl('http://x.fr', 'abcdefgh'), null);
});

test('réponse de l’app traduite', () => {
  assert.equal(relayOutcome(201), 'ok');
  assert.equal(relayOutcome(409), 'busy');
  assert.equal(relayOutcome(429), 'busy');
  assert.equal(relayOutcome(422), 'invalid');
  assert.equal(relayOutcome(404), 'error');
  assert.equal(relayOutcome(500), 'error');
});
