import assert from 'node:assert/strict';
import { test } from 'node:test';
import { calendarStatFor, calendarStatForClick, createStatsQueue, loadOrCreateVisit, trackCalendarEvent, uuidV4 } from './calendrier-tracking';

test('suivi du calendrier : un événement GA4 par action, paramètres absents retirés, rien sans consentement', () => {
  const calls: unknown[][] = [];
  const scope = globalThis as unknown as { window?: { gtag?: (...args: unknown[]) => void } };
  scope.window = { gtag: (...args: unknown[]) => calls.push(args) };
  try {
    trackCalendarEvent('calendar_download', { temps_fort: 'valentines_day', format: 'html', theme: 'soiree' });
    trackCalendarEvent('calendar_copy', { temps_fort: 'valentines_day', format: 'text', theme: undefined });
    trackCalendarEvent('calendar_activate', { temps_fort: 'new_year_eve', destination: 'app', theme: 'moderne' });
    assert.deepEqual(calls, [
      ['event', 'calendar_download', { temps_fort: 'valentines_day', format: 'html', theme: 'soiree' }],
      ['event', 'calendar_copy', { temps_fort: 'valentines_day', format: 'text' }],
      ['event', 'calendar_activate', { temps_fort: 'new_year_eve', destination: 'app', theme: 'moderne' }],
    ]);
    // Sans consentement, gtag.js n'est pas chargé : aucun envoi, aucune erreur (la file des
    // statistiques, sans navigateur ici, échoue en silence).
    scope.window = {};
    trackCalendarEvent('calendar_download', { temps_fort: 'valentines_day', format: 'mjml', theme: 'moderne' });
    assert.equal(calls.length, 3);
  } finally {
    delete scope.window;
  }
});

test('statistiques de l’app : copie, téléchargement, « Activer » et « Déjà client » traduits', () => {
  assert.deepEqual(calendarStatFor('calendar_copy', { temps_fort: 'valentines_day', format: 'html', theme: 'soiree' }), {
    type: 'copy',
    temps_fort: 'valentines_day',
    theme: 'soiree',
    format: 'html',
  });
  // Modèle texte : pas de format pour l'app (mjml ou html seulement).
  assert.equal(calendarStatFor('calendar_copy', { temps_fort: 'valentines_day', format: 'text' }).format, null);
  assert.equal(calendarStatFor('calendar_download', { temps_fort: 'valentines_day', format: 'mjml', theme: 'moderne' }).type, 'download');
  assert.equal(calendarStatFor('calendar_activate', { temps_fort: 'valentines_day', destination: 'page' }).type, 'activate_click');
  assert.deepEqual(calendarStatFor('calendar_activate', { temps_fort: 'valentines_day', destination: 'app', theme: 'soiree' }), {
    type: 'client_click',
    temps_fort: 'valentines_day',
    theme: 'soiree',
    format: null,
  });
});

test('visite : UUID v4 et UTM d’arrivée figés le temps de l’onglet ; stockage refusé, visite quand même', () => {
  const store = new Map<string, string>();
  const storage = { getItem: (k: string) => store.get(k) ?? null, setItem: (k: string, v: string) => void store.set(k, v) };
  const first = loadOrCreateVisit(storage, '?utm_source=flyer&utm_medium=qr&utm_campaign=equiphotel-2026&utm_content=stand');
  assert.match(first.visit_id, /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/);
  assert.deepEqual({ ...first, visit_id: 'x' }, { visit_id: 'x', utm_source: 'flyer', utm_medium: 'qr', utm_campaign: 'equiphotel-2026' });
  // Page suivante de la visite, sans UTM dans l'URL : même visite, mêmes UTM d'arrivée.
  assert.deepEqual(loadOrCreateVisit(storage, ''), first);
  // Sans UTM dans l'URL : ceux de l'attribution connue, sinon rien.
  assert.equal(loadOrCreateVisit(null, '', { utm_source: 'google' }).utm_source, 'google');
  assert.equal(loadOrCreateVisit(null, '').utm_campaign, null);
  // UTM bornés dès le navigateur (100 points de code), pour que le lot reste petit.
  assert.equal(loadOrCreateVisit(null, `?utm_campaign=${encodeURIComponent('é'.repeat(300))}`).utm_campaign, 'é'.repeat(100));
  // Navigation privée : le stockage lève une erreur, la visite existe quand même.
  const refusing = {
    getItem: () => {
      throw new Error('SecurityError');
    },
    setItem: () => {
      throw new Error('QuotaExceededError');
    },
  };
  assert.match(loadOrCreateVisit(refusing, '?utm_source=flyer').visit_id, /^[0-9a-f-]{36}$/);
  // Hors contexte sécurisé (pas de crypto.randomUUID) : UUID v4 quand même.
  const realRandomUUID = crypto.randomUUID;
  Object.defineProperty(crypto, 'randomUUID', { value: undefined, configurable: true });
  try {
    assert.match(uuidV4(), /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/);
  } finally {
    Object.defineProperty(crypto, 'randomUUID', { value: realRandomUUID, configurable: true });
  }
});

test('clics : démo avec le temps fort de son attribut, pas de son utm_content réécrit par la visite', () => {
  // DemoClickTracker a déjà remplacé utm_content par celui de la visite (« stand »).
  const demo = { href: 'https://app.lemcal.com/@trigger-flow/demo?utm_content=stand', dataset: { tempsFort: 'black_friday_voucher' } };
  assert.deepEqual(calendarStatForClick(demo, null), { type: 'demo_click', temps_fort: 'black_friday_voucher' });
  // Visite arrivée avec un utm_content qui est un autre temps fort : l'attribut l'emporte.
  const misleading = { href: 'https://app.lemcal.com/@trigger-flow/demo?utm_content=valentines_day', dataset: { tempsFort: 'new_year_eve' } };
  assert.equal(calendarStatForClick(misleading, null)?.temps_fort, 'new_year_eve');
  // Démo de la page calendrier (hors temps fort), puis page « Activer » (temps fort de la page).
  const generic = { href: 'https://app.lemcal.com/@trigger-flow/demo?utm_content=valentines_day', dataset: {} };
  assert.deepEqual(calendarStatForClick(generic, null), { type: 'demo_click', temps_fort: null });
  assert.equal(calendarStatForClick(generic, 'last_minute_gift')?.temps_fort, 'last_minute_gift');
  // « Déjà client : se connecter », puis un lien ordinaire.
  assert.deepEqual(calendarStatForClick({ href: 'https://app.trigger-flow.com/login', dataset: { calendarStat: 'client_click' } }, null), {
    type: 'client_click',
    temps_fort: null,
  });
  assert.equal(calendarStatForClick({ href: 'https://www.trigger-flow.com/fr/tarifs', dataset: {} }, null), null);
});

function fakeQueue({ beaconAccepts = true, postThrows = false } = {}) {
  const posts: number[] = [];
  const beacons: number[] = [];
  let pending: (() => void) | null = null;
  const queue = createStatsQueue(
    {
      post: (body) => {
        if (postThrows) throw new Error('réseau');
        posts.push((JSON.parse(body) as { events: unknown[] }).events.length);
      },
      beacon: (body) => {
        if (!beaconAccepts) return false;
        beacons.push((JSON.parse(body) as { events: unknown[] }).events.length);
        return true;
      },
    },
    (run) => {
      pending = run;
      return () => {
        pending = null;
      };
    },
  );
  return { queue, posts, beacons, tick: () => pending?.() };
}

test('file : lots de 20 au plus, envoi différé ; sortie de page par sendBeacon, sinon fetch', () => {
  const a = fakeQueue();
  for (let i = 0; i < 3; i++) a.queue.push({ type: 'copy' });
  assert.deepEqual(a.posts, []);
  a.tick();
  assert.deepEqual(a.posts, [3]);

  const b = fakeQueue();
  for (let i = 0; i < 45; i++) b.queue.push({ type: 'theme_change' });
  assert.deepEqual(b.posts, [20, 20]);
  b.queue.flush(true);
  assert.deepEqual(b.beacons, [5]);
  b.tick();
  assert.deepEqual(b.posts, [20, 20], 'le minuteur annulé ne renvoie rien');

  const c = fakeQueue({ beaconAccepts: false });
  c.queue.push({ type: 'page_view' });
  c.queue.flush(true);
  assert.deepEqual(c.posts, [1]);

  // Réseau en panne : la page n'en sait rien.
  const d = fakeQueue({ postThrows: true });
  assert.doesNotThrow(() => {
    for (let i = 0; i < 25; i++) d.queue.push({ type: 'copy' });
    d.queue.flush();
  });
});
