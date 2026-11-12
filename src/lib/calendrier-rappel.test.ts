import assert from 'node:assert/strict';
import { test } from 'node:test';
import { parseRappelBody, RAPPEL_LIMIT, relayOutcome, salonLeadUrl, SlidingWindowLimiter, toSalonPayload } from './calendrier-rappel';

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
  // Formes que la règle `email` de l'app refuserait (422) : refusées ici, avec un message clair.
  for (const email of ['a@b', 'a@b.c', 'a..b@hotel.fr', 'a@hotel..fr', 'a@.hotel.fr', 'a@hotel.fr.']) {
    assert.deepEqual(parseRappelBody({ ...valid, email }), { kind: 'invalid', fields: ['email'] }, email);
  }
  assert.equal(parseRappelBody({ ...valid, email: 'resa.direction@hotel-des-tilleuls.co.uk' }).kind, 'ok');
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

test('limite par IP : 5 demandes sur 10 minutes, puis refus jusqu’à la fin de la fenêtre', () => {
  assert.deepEqual(RAPPEL_LIMIT, { limit: 5, windowMs: 600_000 });
  const limiter = new SlidingWindowLimiter(RAPPEL_LIMIT.limit, RAPPEL_LIMIT.windowMs);
  const t0 = 1_000_000;
  for (let i = 0; i < 5; i++) assert.equal(limiter.allow('1.2.3.4', t0 + i), true, `demande ${i + 1}`);
  assert.equal(limiter.allow('1.2.3.4', t0 + 10), false);
  // Une autre IP n'est pas touchée.
  assert.equal(limiter.allow('5.6.7.8', t0 + 10), true);
  // Un refus ne prolonge pas le blocage : la fenêtre glisse depuis les demandes acceptées.
  assert.equal(limiter.allow('1.2.3.4', t0 + 600_000), true);
});

test('limiteur : mémoire bornée, les IP expirées sont purgées', () => {
  const limiter = new SlidingWindowLimiter(1, 1000, 3);
  for (const ip of ['a', 'b', 'c']) limiter.allow(ip, 0);
  assert.equal(limiter.size, 3);
  // Une 4e IP dépasse le plafond : les trois expirées sont oubliées.
  limiter.allow('d', 5000);
  assert.equal(limiter.size, 1);
});
