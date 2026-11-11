import assert from 'node:assert/strict';
import { test } from 'node:test';
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
