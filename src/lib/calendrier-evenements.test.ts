import assert from 'node:assert/strict';
import { afterEach, beforeEach, test } from 'node:test';
import { NextRequest } from 'next/server';
import { MJML_THEMES } from '../data/calendrier-marketing';
import { POST } from '../app/api/calendrier/evenements/route';
import {
  calendarEventsUrl,
  EVENTS_LIMIT,
  isBotUserAgent,
  MAX_BODY_BYTES,
  MAX_EVENTS_PER_BATCH,
  parseCalendarEventsBody,
  readBoundedText,
  sanitizeCalendarEvent,
  utmValue,
} from './calendrier-evenements';

const VISIT = '3f2b8c1e-9a4d-4e2f-8b1a-2c3d4e5f6a7b';
const copy = { type: 'copy', visit_id: VISIT, temps_fort: 'valentines_day', theme: 'soiree', format: 'html' };

test('événement : ramené au contrat de l’app, champs absents à null, UTM bornés, date réécrite', () => {
  assert.deepEqual(
    sanitizeCalendarEvent({
      ...copy,
      utm_source: ' flyer ',
      utm_medium: 'x'.repeat(150),
      occurred_at: '2026-11-02T09:30:00+01:00',
      ip: '1.2.3.4',
      user_agent: 'Mozilla',
      email: 'a@b.fr',
    }),
    {
      type: 'copy',
      visit_id: VISIT,
      temps_fort: 'valentines_day',
      theme: 'soiree',
      format: 'html',
      utm_source: 'flyer',
      utm_medium: 'x'.repeat(100),
      utm_campaign: null,
      occurred_at: '2026-11-02T08:30:00.000Z',
    },
  );
  // Vue de la page : sans temps fort, thème ni format ; date illisible retirée.
  assert.deepEqual(sanitizeCalendarEvent({ type: 'page_view', visit_id: VISIT, occurred_at: 'hier' }), {
    type: 'page_view',
    visit_id: VISIT,
    temps_fort: null,
    theme: null,
    format: null,
    utm_source: null,
    utm_medium: null,
    utm_campaign: null,
  });
});

test('événement hors des listes de l’app : écarté (sinon l’app refuse tout le lot)', () => {
  for (const bad of [
    { ...copy, type: 'scroll' },
    { ...copy, visit_id: 'court' },
    { ...copy, visit_id: 'a'.repeat(65) },
    { ...copy, visit_id: '../jeton' },
    { ...copy, temps_fort: 'page' },
    { ...copy, theme: 'pastel' },
    { ...copy, format: 'text' },
    { type: 'theme_change', visit_id: VISIT, temps_fort: 'valentines_day' },
    null,
    'copy',
  ]) {
    assert.equal(sanitizeCalendarEvent(bad), null, JSON.stringify(bad));
  }
  // Les thèmes viennent des données du site : un thème ajouté à MJML_THEMES passe sans retouche.
  for (const theme of MJML_THEMES) {
    assert.ok(sanitizeCalendarEvent({ type: 'theme_change', visit_id: VISIT, temps_fort: 'valentines_day', theme }), theme);
  }
});

test('lot : seuls les événements valides, 20 au plus ; corps illisible → aucun', () => {
  const events = parseCalendarEventsBody({ events: [copy, { ...copy, type: 'inconnu' }, { type: 'page_view', visit_id: VISIT }] });
  assert.deepEqual(events.map((e) => e.type), ['copy', 'page_view']);
  assert.equal(parseCalendarEventsBody({ events: Array.from({ length: 35 }, () => copy) }).length, MAX_EVENTS_PER_BATCH);
  assert.deepEqual(parseCalendarEventsBody(null), []);
  assert.deepEqual(parseCalendarEventsBody({ events: 'copy' }), []);
});

test('UTM : 100 points de code au plus, jamais un emoji coupé en deux (PHP refuserait tout le lot)', () => {
  assert.equal(utmValue(`${'a'.repeat(99)}😀b`), `${'a'.repeat(99)}😀`);
  assert.equal(utmValue('😀'.repeat(120)), '😀'.repeat(100));
  // Moitié d'emoji orpheline envoyée telle quelle : remplacée.
  assert.equal(utmValue('\udc00salon'), '\ufffdsalon');
  assert.equal(utmValue('  \n '), null);
  assert.equal(utmValue(42), null);
});

test('robots écartés (même motif que l’app), navigateurs gardés, y compris les téléphones Cubot', () => {
  for (const ua of [
    'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
    'Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)',
    'Mozilla/5.0 (compatible; AhrefsBot/7.0; +http://ahrefs.com/robot/)',
    'Mozilla/5.0 (compatible; Baiduspider/2.0; +http://www.baidu.com/search/spider.html)',
    'Screaming Frog SEO Spider/19.0',
    'Some Crawler',
    'GPTBot/1.0',
  ]) {
    assert.ok(isBotUserAgent(ua), ua);
  }
  for (const ua of [
    'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 Safari/604.1',
    'Mozilla/5.0 (Linux; Android 12; CUBOT X30) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Mobile Safari/537.36',
    'Mozilla/5.0 (Linux; Android 10; CUBOT NOTE 7 Build/QP1A) AppleWebKit/537.36 Chrome/120.0 Mobile Safari/537.36',
  ]) {
    assert.equal(isBotUserAgent(ua), false, ua);
  }
  assert.equal(isBotUserAgent(null), false);
});

test('corps borné : refusé dès l’en-tête s’il annonce trop, ou en cours de lecture sans en-tête', async () => {
  const post = (body: BodyInit, headers: Record<string, string> = {}) =>
    new Request('https://www.trigger-flow.com/api/calendrier/evenements', { method: 'POST', body, headers, duplex: 'half' } as RequestInit);
  assert.equal(await readBoundedText(post('{"events":[]}'), MAX_BODY_BYTES), '{"events":[]}');
  assert.equal(await readBoundedText(post('{}', { 'content-length': String(MAX_BODY_BYTES + 1) }), MAX_BODY_BYTES), null);
  // Flux sans Content-Length : lecture arrêtée dès le dépassement.
  let pulled = 0;
  const stream = new ReadableStream<Uint8Array>({
    pull(controller) {
      pulled++;
      if (pulled > 100) controller.close();
      else controller.enqueue(new Uint8Array(1024).fill(32));
    },
  });
  assert.equal(await readBoundedText(post(stream), MAX_BODY_BYTES), null);
  assert.ok(pulled < 30, `lecture arrêtée tôt (${pulled} morceaux)`);
});

test('adresse de l’app : jeton du salon dans le chemin, sinon pas de relais', () => {
  assert.equal(
    calendarEventsUrl('https://api.trigger-flow.com/', 'jeton_salon-123'),
    'https://api.trigger-flow.com/api/public-salon-flyer/jeton_salon-123/calendar-events',
  );
  assert.equal(calendarEventsUrl('https://api.trigger-flow.com', undefined), null);
  assert.equal(calendarEventsUrl('http://api.trigger-flow.com', 'jeton_salon-123'), null);
  assert.equal(calendarEventsUrl('https://api.trigger-flow.com', '../admin'), null);
});

// --- Route /api/calendrier/evenements, réseau simulé ---

const realFetch = globalThis.fetch;
let relayed: { url: string; body: unknown }[] = [];
let appStatus = 202;
let ipCounter = 0;

beforeEach(() => {
  relayed = [];
  appStatus = 202;
  process.env.TRIGGERFLOW_API_URL = 'https://api.example.test';
  process.env.CALENDRIER_SALON_FLYER_TOKEN = 'jeton_salon-123';
  globalThis.fetch = (async (url: string | URL, init?: RequestInit) => {
    relayed.push({ url: String(url), body: JSON.parse(String(init?.body)) });
    return new Response(null, { status: appStatus });
  }) as typeof fetch;
});

afterEach(() => {
  globalThis.fetch = realFetch;
  delete process.env.TRIGGERFLOW_API_URL;
  delete process.env.CALENDRIER_SALON_FLYER_TOKEN;
});

function request(body: unknown, { ua = 'Mozilla/5.0 Safari', ip = `203.0.113.${++ipCounter}` } = {}) {
  return new NextRequest('https://www.trigger-flow.com/api/calendrier/evenements', {
    method: 'POST',
    // Comme sendBeacon : du JSON en text/plain.
    headers: { 'content-type': 'text/plain;charset=UTF-8', 'user-agent': ua, 'x-forwarded-for': ip },
    body: typeof body === 'string' ? body : JSON.stringify(body),
  });
}

test('route : lot filtré relayé à l’app avec le jeton, sans IP ni user agent ; toujours 202', async () => {
  const response = await POST(request({ events: [copy, { ...copy, theme: 'pastel' }, { type: 'page_view', visit_id: VISIT, ip: '1.2.3.4' }] }));
  assert.equal(response.status, 202);
  assert.equal(relayed.length, 1);
  assert.equal(relayed[0].url, 'https://api.example.test/api/public-salon-flyer/jeton_salon-123/calendar-events');
  const sent = relayed[0].body as { events: Record<string, unknown>[] };
  assert.deepEqual(sent.events.map((e) => e.type), ['copy', 'page_view']);
  for (const event of sent.events) {
    assert.deepEqual(Object.keys(event).sort(), ['format', 'temps_fort', 'theme', 'type', 'utm_campaign', 'utm_medium', 'utm_source', 'visit_id']);
  }
  // L'app saturée (429) ou en panne : le visiteur n'en sait rien.
  appStatus = 429;
  assert.equal((await POST(request({ events: [copy] }))).status, 202);
  globalThis.fetch = (async () => {
    throw new TypeError('fetch failed');
  }) as typeof fetch;
  assert.equal((await POST(request({ events: [copy] }))).status, 202);
});

test('route : robot, lot vide ou relais non configuré : rien n’est relayé', async () => {
  await POST(request({ events: [copy] }, { ua: 'Mozilla/5.0 (compatible; Googlebot/2.1)' }));
  await POST(request({ events: [{ ...copy, type: 'inconnu' }] }));
  await POST(request('pas du json'));
  delete process.env.CALENDRIER_SALON_FLYER_TOKEN;
  assert.equal((await POST(request({ events: [copy] }))).status, 202);
  assert.equal(relayed.length, 0);
});

test('route : corps trop gros refusé sans être lu ni relayé', async () => {
  const big = { events: Array.from({ length: 20 }, () => ({ ...copy, utm_campaign: 'x'.repeat(5000) })) };
  const response = await POST(request(big));
  assert.equal(response.status, 413);
  const announced = new NextRequest('https://www.trigger-flow.com/api/calendrier/evenements', {
    method: 'POST',
    headers: { 'user-agent': 'Mozilla/5.0', 'x-forwarded-for': '203.0.113.250', 'content-length': '999999' },
    body: JSON.stringify({ events: [copy] }),
  });
  assert.equal((await POST(announced)).status, 413);
  assert.equal(relayed.length, 0);
});

test('route : la limite par IP s’applique avant la lecture, corps illisibles compris', async () => {
  const ip = '198.51.100.20';
  for (let i = 0; i < EVENTS_LIMIT.limit; i++) await POST(request('pas du json', { ip }));
  await POST(request({ events: [copy] }, { ip }));
  assert.equal(relayed.length, 0);
});

test('route : limite par IP visiteur, les autres visiteurs passent', async () => {
  const ip = '198.51.100.7';
  for (let i = 0; i < EVENTS_LIMIT.limit; i++) await POST(request({ events: [copy] }, { ip }));
  assert.equal(relayed.length, EVENTS_LIMIT.limit);
  assert.equal((await POST(request({ events: [copy] }, { ip }))).status, 202);
  assert.equal(relayed.length, EVENTS_LIMIT.limit);
  await POST(request({ events: [copy] }, { ip: '198.51.100.8' }));
  assert.equal(relayed.length, EVENTS_LIMIT.limit + 1);
});
