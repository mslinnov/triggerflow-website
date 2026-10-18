import { test } from 'node:test';
import assert from 'node:assert/strict';
import { isValidPassword, isValidSession, sessionToken } from './auth';

const SECRET = 'stand-h006';

test('le bon mot de passe est accepté, un autre refusé', async () => {
  assert.equal(await isValidPassword('stand-h006', SECRET), true);
  assert.equal(await isValidPassword('stand-h007', SECRET), false);
  assert.equal(await isValidPassword('', SECRET), false);
  // Un préfixe du secret ne passe pas : la comparaison porte sur l'empreinte entière.
  assert.equal(await isValidPassword('stand', SECRET), false);
});

test('le cookie posé après connexion ouvre la formation', async () => {
  const token = await sessionToken(SECRET);
  assert.equal(await isValidSession(token, SECRET), true);
});

test('un cookie absent ou falsifié est refusé', async () => {
  const token = await sessionToken(SECRET);
  assert.equal(await isValidSession(undefined, SECRET), false);
  assert.equal(await isValidSession('', SECRET), false);
  assert.equal(await isValidSession(token.slice(0, -1) + (token.endsWith('0') ? '1' : '0'), SECRET), false);
  // Le mot de passe en clair dans le cookie ne suffit pas.
  assert.equal(await isValidSession(SECRET, SECRET), false);
});

test('changer le mot de passe invalide les cookies déjà posés', async () => {
  const ancien = await sessionToken(SECRET);
  assert.equal(await isValidSession(ancien, 'nouveau-mot-de-passe'), false);
});
