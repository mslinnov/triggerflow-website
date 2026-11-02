import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readDownloadUrl, safeDownloadUrl, TRACKED_LINK_HOST } from './lead-magnet-download';

function backendReply(status: number, body: unknown): Response {
  return new Response(typeof body === 'string' ? body : JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}

test('le relais renvoie le lien compté que le backend donne sur 201', async () => {
  const url = `https://${TRACKED_LINK_HOST}/AbC123`;
  assert.equal(await readDownloadUrl(backendReply(201, { message: 'Merci, votre guide est prêt.', download_url: url })), url);
});

test('le relais ne renvoie rien quand le lien pointe vers un domaine étranger', async () => {
  for (const foreign of [
    'https://evil.example/AbC123',
    'https://t-f.co.evil.example/AbC123',
    'https://evil.example/https://t-f.co/AbC123',
    'https://t-f.co@evil.example/AbC123',
    'https://sub.t-f.co/AbC123',
  ]) {
    assert.equal(await readDownloadUrl(backendReply(201, { download_url: foreign })), null, foreign);
  }
});

test('le relais ne renvoie rien sans https, avec un port ou des identifiants, ou sur un autre schéma', () => {
  for (const bad of [
    'http://t-f.co/AbC123',
    'https://t-f.co:8443/AbC123',
    'https://user:pass@t-f.co/AbC123',
    'javascript:alert(1)//t-f.co',
    '//t-f.co/AbC123',
  ]) {
    assert.equal(safeDownloadUrl(bad), null, bad);
  }
});

test('le relais ne renvoie rien quand le backend refuse, ne donne pas de lien ou répond autre chose que du JSON', async () => {
  assert.equal(await readDownloadUrl(backendReply(422, { download_url: `https://${TRACKED_LINK_HOST}/AbC123` })), null);
  assert.equal(await readDownloadUrl(backendReply(201, { message: 'Merci, votre guide est prêt.' })), null);
  assert.equal(await readDownloadUrl(backendReply(201, { download_url: 42 })), null);
  assert.equal(await readDownloadUrl(backendReply(201, '<html>oops</html>')), null);
});
