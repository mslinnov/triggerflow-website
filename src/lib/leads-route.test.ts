import assert from 'node:assert/strict';
import { test } from 'node:test';
import { NextRequest } from 'next/server';

/**
 * Route /api/leads, Brevo remplacé par un faux `fetch` : aucun appel réel, ni contact créé ni e-mail envoyé.
 * La route lit sa configuration au chargement du module, d'où les variables posées avant l'import.
 */
process.env.BREVO_API_KEY = 'cle-de-test';
process.env.BREVO_LEADS_LIST_ID = '42';
process.env.LEADS_NOTIFICATION_EMAIL = 'equipe@example.test';
delete process.env.TRIGGERFLOW_API_URL;

interface BrevoCall {
  url: string;
  body: Record<string, unknown>;
}

const calls: BrevoCall[] = [];
globalThis.fetch = (async (input: string | URL | Request, init?: RequestInit) => {
  calls.push({ url: String(input), body: JSON.parse(String(init?.body ?? '{}')) });
  return new Response('{"id":1}', { status: 201, headers: { 'content-type': 'application/json' } });
}) as typeof fetch;

async function post(body: Record<string, unknown>) {
  const { POST } = await import('../app/api/leads/route');
  calls.length = 0;
  const response = await POST(
    new NextRequest('http://localhost/api/leads', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body),
    }),
  );
  return { status: response.status, payload: (await response.json()) as Record<string, unknown> };
}

const contactCall = () => calls.find((call) => call.url.endsWith('/v3/contacts'));
const notificationCall = () => calls.find((call) => call.url.endsWith('/v3/smtp/email'));

const rappel = {
  email: 'Directrice@Hotel-Test.fr',
  firstName: 'Claire',
  hotelName: 'Hôtel des Tests',
  source: 'lp-crm-hotelier',
  goal: 'rappel',
  slot: 'Le matin',
  locale: 'fr',
};

test('rappel : numéro valide, contact dans la liste des leads et notification « Demande de rappel » avec le créneau', async () => {
  const { status, payload } = await post({ ...rappel, phone: '06 12 34 56 78' });
  assert.equal(status, 200);
  assert.equal(payload.success, true);

  const contact = contactCall();
  assert.ok(contact, 'contact Brevo créé');
  assert.deepEqual(contact.body.listIds, [42]);
  const attributes = contact.body.attributes as Record<string, unknown>;
  assert.equal(attributes.OFFRE, 'rappel');
  assert.equal(attributes.SMS, '+33612345678');
  // Brevo refuse le contact entier pour un attribut non déclaré : le créneau reste dans la notification.
  assert.equal(attributes.CRENEAU, undefined);

  const notification = notificationCall();
  assert.ok(notification, 'équipe notifiée');
  assert.equal(notification.body.subject, 'Demande de rappel : Hôtel des Tests');
  assert.match(String(notification.body.htmlContent), /CRENEAU<\/strong><\/td><td[^>]*>Le matin</);
  assert.match(String(notification.body.htmlContent), /TELEPHONE_SAISI<\/strong><\/td><td[^>]*>06 12 34 56 78</);
});

test('rappel : numéro étranger écrit sans +, accepté et transmis tel que saisi, sans attribut SMS', async () => {
  const { status, payload } = await post({ ...rappel, phone: '32 475 12 34 56' });
  assert.equal(status, 200);
  assert.equal(payload.success, true);
  // Brevo refuse un SMS hors E.164 : le numéro non normalisé ne va pas dans le contact...
  const attributes = contactCall()?.body.attributes as Record<string, unknown>;
  assert.equal(attributes.SMS, undefined);
  // ...mais l'équipe le reçoit pour rappeler.
  assert.match(String(notificationCall()?.body.htmlContent), /TELEPHONE_SAISI<\/strong><\/td><td[^>]*>32 475 12 34 56</);
});

test('rappel : numéro trop court (moins de 8 chiffres) refusé avant tout appel à Brevo', async () => {
  const { status, payload } = await post({ ...rappel, phone: '+33 12 34 5' });
  assert.equal(status, 400);
  assert.equal(payload.error, 'invalid_phone');
  assert.equal(calls.length, 0);
});

test('rappel : numéro invalide refusé avant tout appel à Brevo', async () => {
  const { status, payload } = await post({ ...rappel, phone: '12 34' });
  assert.equal(status, 400);
  assert.equal(payload.error, 'invalid_phone');
  assert.equal(calls.length, 0);
});

test('rappel : numéro absent refusé avant tout appel à Brevo', async () => {
  const { status, payload } = await post(rappel);
  assert.equal(status, 400);
  assert.equal(payload.error, 'invalid_phone');
  assert.equal(calls.length, 0);
});

test('autres offres inchangées : téléphone facultatif, objet de la notification selon l’offre', async () => {
  const lead = { email: 'contact@hotel-test.fr', hotelName: 'Hôtel des Tests', source: 'lp-test' };
  const expected: Array<[string, string]> = [
    ['demo', 'Demande de démo : Hôtel des Tests'],
    ['contact', 'Message du site : Hôtel des Tests'],
    ['whitepaper', 'Livre blanc à envoyer : Hôtel des Tests'],
  ];
  for (const [goal, subject] of expected) {
    // Un numéro illisible ne bloque pas ces offres : le lead part sans téléphone.
    const { status } = await post({ ...lead, goal, phone: '12 34' });
    assert.equal(status, 200, goal);
    const attributes = contactCall()?.body.attributes as Record<string, unknown>;
    assert.equal(attributes.OFFRE, goal);
    assert.equal(attributes.SMS, undefined);
    assert.equal(notificationCall()?.body.subject, subject);
    assert.doesNotMatch(String(notificationCall()?.body.htmlContent), /TELEPHONE_SAISI/);
  }
});
