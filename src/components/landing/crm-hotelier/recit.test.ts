import assert from 'node:assert/strict';
import { test } from 'node:test';
import fr from '../../../../messages/fr.json';
import { poserStyle } from './defilement';
import { DEPART, histoire, presence, segment, type NomForme, type TextesRecit } from './histoire';
import { jourDe } from './jour';

const TEXTES = fr.lpCrmHotelier.story as TextesRecit;
const CHIFFRES = { pms: '+20', whatsapp: '84 %', upsell: '5 %' };
/** Les quatre récits servis : ordinateur et téléphone, animé (3D) et fixe. */
const RECITS = [true, false].flatMap((wide) => [true, false].map((trois) => ({ wide, trois, recit: histoire(TEXTES, CHIFFRES, wide, trois) })));
const ORDRE = ['pms', 'fiche', 'ventes', 'paiement', 'avis', 'retour', 'cta'];

test('récit : étapes dans l’ordre du séjour, clés et rail croissants', () => {
  for (const { wide, recit } of RECITS) {
    const ids = recit.blocs.map((b) => b.id);
    assert.deepEqual(ids, ORDRE.filter((id) => wide ? id !== 'fiche' : true));
    for (let i = 1; i < recit.blocs.length; i++) assert.ok(recit.blocs[i].at > recit.blocs[i - 1].at, `${ids[i]} avant ${ids[i - 1]}`);
    for (let i = 1; i < recit.cles.length; i++) assert.ok(recit.cles[i].s >= recit.cles[i - 1].s);
    assert.equal(recit.rail.length, TEXTES.rail.length);
    for (let i = 1; i < recit.rail.length; i++) assert.ok(recit.rail[i].s > recit.rail[i - 1].s && recit.rail[i].de > recit.rail[i - 1].de);
    assert.ok(recit.h.debut < recit.h.lu0 && recit.h.lu0 < recit.h.lu1 && recit.h.lu1 < recit.h.fin);
    assert.ok(recit.ecrans >= recit.blocs[recit.blocs.length - 1].at);
  }
});

test('récit : segment et présence bornés, sans saut d’un défilement à l’autre', () => {
  const formes = new Set<NomForme>(RECITS[0].recit.cles.map((c) => c.forme));
  for (const { recit } of RECITS) {
    const pas = 0.002;
    const prec = new Map<NomForme, number>();
    for (let s = -0.5; s <= recit.ecrans + 0.5; s += pas) {
      const i = segment(recit.cles, s);
      assert.ok(i >= 0 && i <= recit.cles.length - 2);
      for (const nom of formes) {
        const p = presence(recit.cles, nom, s);
        assert.ok(p >= 0 && p <= 1, `${nom} hors bornes à ${s}`);
        const avant = prec.get(nom);
        // Entrée sur 45 % et sortie sur 40 % de la transformation la plus courte (0,1 écran) : moins de 0,05 par pas.
        if (avant !== undefined) assert.ok(Math.abs(p - avant) < 0.05, `${nom} saute de ${avant} à ${p} à ${s.toFixed(3)}`);
        prec.set(nom, p);
      }
    }
  }
});

test('récit : le passage au papier tient dans le dézoom et finit avant le premier texte', () => {
  for (let s = 0; s <= DEPART - 0.08; s += 0.01) assert.equal(jourDe(s), 0, `jour levé trop tôt à ${s}`);
  for (const { recit } of RECITS) {
    // Un texte calme commence son fondu 0,33 écran avant son milieu (Immersion.tsx).
    const premier = recit.blocs[0].at - 0.33;
    assert.equal(jourDe(premier), 1, 'le texte PMS apparaît avant la fin du passage au papier');
  }
  for (let s = 0; s < 4; s += 0.01) assert.ok(jourDe(s + 0.01) >= jourDe(s));
});

test('récit : poserStyle n’écrit dans le DOM que si la valeur change', () => {
  const valeurs = new Map<string, string>();
  let ecritures = 0;
  const el = {
    style: {
      getPropertyValue: (nom: string) => valeurs.get(nom) ?? '',
      setProperty: (nom: string, valeur: string) => {
        ecritures++;
        valeurs.set(nom, valeur);
      },
    },
  } as unknown as HTMLElement;
  poserStyle(el, 'opacity', '0.5');
  poserStyle(el, 'opacity', '0.5');
  poserStyle(el, 'opacity', '0.5');
  assert.equal(ecritures, 1);
  poserStyle(el, 'opacity', '1');
  assert.equal(ecritures, 2);
  poserStyle(null, 'opacity', '1');
  assert.equal(ecritures, 2);
});
