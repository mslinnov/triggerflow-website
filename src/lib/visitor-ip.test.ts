import assert from 'node:assert/strict';
import { test } from 'node:test';
import { NextRequest } from 'next/server';
import { POST as postEvenements } from '../app/api/calendrier/evenements/route';
import { POST as postRappel } from '../app/api/calendrier/rappel/route';
import { localServer, type LocalServer } from './__fixtures__/local-server';
import { EVENTS_LIMIT } from './calendrier-evenements';
import { RAPPEL_LIMIT } from './calendrier-rappel';
import { readVisitorIp, visitorKey } from './visitor-ip';

test('IP visiteur : le dernier membre de x-forwarded-for (ajouté par Apache), jamais le premier', () => {
  const req = (headers: Record<string, string>) => ({ headers: new Headers(headers) });
  assert.equal(readVisitorIp(req({ 'x-forwarded-for': '6.6.6.6, 203.0.113.9' })), '203.0.113.9');
  // Pas derrière Cloudflare : cf-connecting-ip vient du client tel quel, il est ignoré...
  assert.equal(readVisitorIp(req({ 'cf-connecting-ip': '198.51.100.1', 'x-forwarded-for': '1.1.1.1' }), false), '1.1.1.1');
  // ...par défaut (TRUST_CF_CONNECTING_IP absente)...
  assert.equal(readVisitorIp(req({ 'cf-connecting-ip': '198.51.100.1', 'x-forwarded-for': '1.1.1.1' })), '1.1.1.1');
  // ...et lu seulement quand un proxy Cloudflare est déclaré devant.
  assert.equal(readVisitorIp(req({ 'cf-connecting-ip': '198.51.100.1', 'x-forwarded-for': '1.1.1.1' }), true), '198.51.100.1');
  assert.equal(readVisitorIp(req({ 'x-forwarded-for': 'pas-une-ip' })), null);
  assert.equal(readVisitorIp(req({})), null);
});

test('clé d’un visiteur : IPv4 telle quelle, IPv6 réduite à son /64, illisible regroupée', () => {
  assert.equal(visitorKey('203.0.113.9'), '203.0.113.9');
  assert.equal(visitorKey('2001:db8:1:2::a'), '2001:db8:1:2::/64');
  assert.equal(visitorKey('2001:0DB8:0001:0002:aaaa:bbbb:cccc:dddd'), '2001:db8:1:2::/64');
  assert.equal(visitorKey('2001:db8::1'), '2001:db8:0:0::/64');
  assert.equal(visitorKey('::1'), '0:0:0:0::/64');
  assert.equal(visitorKey('::ffff:203.0.113.9'), '203.0.113.9');
  assert.equal(visitorKey('1:2:3:4:5:6:7:8:9'), 'ip-inconnue');
  assert.equal(visitorKey('1::2::3'), 'ip-inconnue');
  assert.equal(visitorKey(null), 'ip-inconnue');
});

/** Les routes du calendrier relaient à l'app : un faux serveur local en tient lieu. */
async function withFakeApp(run: (app: LocalServer) => Promise<void>): Promise<void> {
  const app = await localServer((_, res) => {
    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end('{}');
  });
  const before = { url: process.env.TRIGGERFLOW_API_URL, token: process.env.CALENDRIER_SALON_FLYER_TOKEN };
  process.env.TRIGGERFLOW_API_URL = app.url;
  process.env.CALENDRIER_SALON_FLYER_TOKEN = 'jeton-du-salon-test';
  try {
    await run(app);
  } finally {
    for (const [key, value] of [['TRIGGERFLOW_API_URL', before.url], ['CALENDRIER_SALON_FLYER_TOKEN', before.token]] as const) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
    await app.close();
  }
}

const post = (path: string, ip: string, body: unknown) =>
  new NextRequest(`https://www.trigger-flow.com${path}`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'user-agent': 'Mozilla/5.0 (iPhone)', 'x-forwarded-for': ip },
    body: JSON.stringify(body),
  });

test('rappel du calendrier : les adresses d’un même /64 IPv6 sont un seul visiteur, la 6e demande attend', async () => {
  await withFakeApp(async (app) => {
    const demande = { hotelName: 'Hôtel des Tilleuls', firstname: 'Camille', email: 'camille@tilleuls.fr' };
    const statuts: number[] = [];
    // Une adresse différente à chaque demande, toutes chez le même abonné.
    for (let i = 1; i <= RAPPEL_LIMIT.limit + 1; i++) statuts.push((await postRappel(post('/api/calendrier/rappel', `2001:db8:5:6::${i}`, demande))).status);

    assert.deepEqual(statuts, [...Array<number>(RAPPEL_LIMIT.limit).fill(200), 429]);
    assert.equal(app.hits.length, RAPPEL_LIMIT.limit);
  });
});

test('statistiques du calendrier : les adresses d’un même /64 IPv6 sont un seul visiteur, au-delà de la limite rien n’est relayé', async () => {
  await withFakeApp(async (app) => {
    const lot = { events: [{ type: 'page_view', visit_id: 'visite-12345678' }] };
    for (let i = 1; i <= EVENTS_LIMIT.limit + 1; i++) {
      assert.equal((await postEvenements(post('/api/calendrier/evenements', `2001:db8:5:7::${i.toString(16)}`, lot))).status, 202);
    }

    assert.equal(app.hits.length, EVENTS_LIMIT.limit);
  });
});
