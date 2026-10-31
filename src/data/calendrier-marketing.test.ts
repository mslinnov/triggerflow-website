import assert from 'node:assert/strict';
import { test } from 'node:test';
import { emailToPlainText, formatDateLong, formatDateShort, toExampleText, tokenize, toPlainText, weekday } from '../lib/calendrier';
import {
  ALL_YEAR,
  CALENDAR,
  CAMPAIGNS,
  currentCampaign,
  EXAMPLE_VARIABLES,
  TEMPS_FORT_CODES,
  TEMPS_FORTS,
  type KeyDate,
} from './calendrier-marketing';

// ── Rendu des jetons ────────────────────────────────────────────────────────

test('le jour de la semaine est calculé, et le 1er du mois s’écrit « 1er »', () => {
  assert.equal(formatDateLong('2027-05-06'), 'jeudi 6 mai');
  assert.equal(formatDateLong('2027-11-01'), 'lundi 1er novembre');
  assert.equal(formatDateLong('2027-11-11'), 'jeudi 11 novembre');
  assert.equal(formatDateShort('2027-02-14'), 'dim. 14 févr.');
  assert.throws(() => formatDateLong('2027-02-30'));
});

test('texte copié : variables intactes, champs entre crochets avec leur exemple, dates écrites', () => {
  assert.equal(
    toPlainText('Bonjour {{firstname}}, [[Remise|-20 %]] jusqu’au {date:2027-11-28}.'),
    'Bonjour {{firstname}}, [Remise : -20 %] jusqu’au dimanche 28 novembre.',
  );
  assert.equal(toExampleText('{{facility_name}} : [[Remise|-20 %]]', EXAMPLE_VARIABLES), 'Hôtel des Tilleuls : -20 %');
  const plain = emailToPlainText(CAMPAIGNS[0].email);
  assert.match(plain, /^Objet : /);
  assert.match(plain, /\nPré-en-tête : /);
  assert.match(plain, /\nBouton : /);
  assert.doesNotMatch(plain, /\{date:|\[\[/);
});

// ── Dates vérifiées ─────────────────────────────────────────────────────────

const allKeyDates: KeyDate[] = CALENDAR.flatMap((month) => month.keyDates);

function iso(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function addDays(isoDate: string, days: number): string {
  const date = new Date(`${isoDate}T12:00:00Z`);
  date.setUTCDate(date.getUTCDate() + days);
  return iso(date);
}

/** Dimanche de Pâques (algorithme de Meeus/Jones/Butcher). */
function easter(year: number): string {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return iso(new Date(Date.UTC(year, month - 1, day, 12)));
}

/** n-ième jour `dow` (0 = dimanche) du mois ; n = -1 pour le dernier. */
function nthWeekday(year: number, month: number, dow: number, n: number): string {
  if (n > 0) {
    const first = new Date(Date.UTC(year, month - 1, 1, 12));
    const offset = (dow - first.getUTCDay() + 7) % 7;
    return iso(new Date(Date.UTC(year, month - 1, 1 + offset + (n - 1) * 7, 12)));
  }
  const last = new Date(Date.UTC(year, month, 0, 12));
  const offset = (last.getUTCDay() - dow + 7) % 7;
  return iso(new Date(Date.UTC(year, month, -offset, 12)));
}

function keyDate(label: RegExp, year: number): string {
  const found = allKeyDates.filter((k) => label.test(k.label) && k.start.startsWith(String(year)));
  assert.equal(found.length, 1, `${label} ${year} : ${found.length} date(s)`);
  return found[0].start;
}

test('fêtes mobiles et dates calculées : recalculées, pas recopiées', () => {
  const e = easter(2027);
  assert.equal(e, '2027-03-28');
  assert.equal(keyDate(/^Pâques/, 2027), e);
  assert.equal(keyDate(/Lundi de Pâques/, 2027), addDays(e, 1));
  assert.equal(keyDate(/Pont de l'Ascension/, 2027), addDays(e, 39));
  assert.equal(keyDate(/Pentecôte/, 2027), addDays(e, 50));
  // Fête des mères : dernier dimanche de mai, sauf s'il tombe à la Pentecôte.
  const mothers = nthWeekday(2027, 5, 0, -1);
  assert.notEqual(mothers, addDays(e, 49));
  assert.equal(keyDate(/Fête des mères/, 2027), mothers);
  assert.equal(keyDate(/Fête des pères/, 2027), nthWeekday(2027, 6, 0, 3));
  assert.equal(keyDate(/grands-mères/, 2027), nthWeekday(2027, 3, 0, 1));
  assert.equal(keyDate(/heure d'été/, 2027), nthWeekday(2027, 3, 0, -1));
  assert.equal(keyDate(/heure d'hiver/, 2027), nthWeekday(2027, 10, 0, -1));
  for (const year of [2026, 2027]) {
    assert.equal(keyDate(/Beaujolais/, year), nthWeekday(year, 11, 4, 3));
    assert.equal(keyDate(/Black Friday/, year), addDays(nthWeekday(year, 11, 4, 4), 1));
  }
  assert.equal(keyDate(/patrimoine/, 2027), nthWeekday(2027, 9, 6, 3));
});

/**
 * Calendrier scolaire officiel (data.education.gouv.fr, « fr-en-calendrier-scolaire »,
 * relevé le 31/10/2026) : premier et dernier jour sans école, heure de Paris.
 */
const OFFICIAL_HOLIDAYS: Array<[RegExp, string, string]> = [
  [/^Vacances de Noël$/, '2026-12-19', '2027-01-03'],
  [/^Vacances d'hiver$/, '2027-02-06', '2027-02-21'], // zone C
  [/^Vacances d'hiver$/, '2027-02-13', '2027-02-28'], // zone A
  [/^Vacances d'hiver$/, '2027-02-20', '2027-03-07'], // zone B
  [/^Vacances de printemps$/, '2027-04-03', '2027-04-18'], // zone C
  [/^Vacances de printemps$/, '2027-04-10', '2027-04-25'], // zone A
  [/^Vacances de printemps$/, '2027-04-17', '2027-05-02'], // zone B
  [/^Pont de l'Ascension$/, '2027-05-06', '2027-05-09'],
  [/^Vacances d'été$/, '2027-07-03', '2027-09-01'],
  [/^Vacances de la Toussaint$/, '2027-10-23', '2027-11-07'],
  [/^Vacances de Noël$/, '2027-12-18', '2028-01-02'],
];

test('vacances scolaires : exactement celles du calendrier officiel', () => {
  const shown = allKeyDates
    .filter((k) => /^(Vacances|Pont)/.test(k.label))
    .map((k) => `${k.label} ${k.start} ${k.end}`)
    .sort();
  const official = OFFICIAL_HOLIDAYS.map(([label, start, end]) => `${label.source.replace(/[\^$]/g, '')} ${start} ${end}`).sort();
  assert.deepEqual(shown, official);
  // Les e-mails citent les mêmes bornes (zones du printemps, Toussaint).
  const text = JSON.stringify(CAMPAIGNS);
  for (const [, start, end] of OFFICIAL_HOLIDAYS.filter(([l]) => /printemps|Toussaint/.test(l.source))) {
    assert.ok(text.includes(`{date:${start}} au {date:${end}}`), `${start} → ${end} absent des e-mails`);
  }
});

test('jours fériés fixes : bien datés', () => {
  for (const [label, date] of [
    [/Toussaint \(férié\)/, '11-01'],
    [/Armistice/, '11-11'],
    [/Noël \(férié\)/, '12-25'],
    [/Fête nationale/, '07-14'],
    [/Assomption/, '08-15'],
    [/Fête du Travail/, '05-01'],
    [/Victoire 1945/, '05-08'],
  ] as const) {
    for (const k of allKeyDates.filter((x) => label.test(x.label))) assert.ok(k.start.endsWith(date), `${k.label} ${k.start}`);
  }
});

// ── Contenu ─────────────────────────────────────────────────────────────────

function allTexts(): string[] {
  const texts: string[] = [];
  for (const month of CALENDAR) {
    for (const k of month.keyDates) texts.push(k.label, k.note ?? '');
    for (const c of month.campaigns) {
      texts.push(c.send, c.reminder ?? '', c.email.subject, c.email.preheader, c.email.cta.label, c.email.cta.url);
      for (const block of c.email.body) texts.push(...(Array.isArray(block) ? block : [block]));
    }
  }
  for (const item of ALL_YEAR) texts.push(item.title, item.text, item.when);
  return texts;
}

test('chaque jeton est valide : date existante, champ avec un exemple', () => {
  for (const text of allTexts()) {
    for (const token of tokenize(text)) {
      if (token.kind === 'date') assert.doesNotThrow(() => weekday(token.iso), token.iso);
      if (token.kind === 'field') assert.ok(token.label.trim() && token.example.trim(), text);
      if (token.kind === 'text') assert.doesNotMatch(token.value, /\[\[|\]\]|\{date:|\{\{|\}\}/, `jeton mal formé : ${text}`);
    }
  }
});

test('aucun tiret cadratin ni demi-cadratin', () => {
  for (const text of allTexts()) assert.doesNotMatch(text, /[—–]/, text);
});

test('aucun chiffre promis hors d’un champ à remplir (décision 16)', () => {
  // On retire champs, dates et variables : ce qui reste est le texte fixe du modèle.
  const PROMISE = /\d+\s?(%|€|h\b|min|minutes?|heures?|jours?|semaines?|mois|nuits?)|-\s?\d/i;
  for (const c of CAMPAIGNS) {
    const parts = [c.email.subject, c.email.preheader, c.email.cta.label, ...c.email.body.flat()];
    for (const text of parts) {
      const fixed = tokenize(text)
        .filter((t) => t.kind === 'text')
        .map((t) => (t.kind === 'text' ? t.value : ''))
        .join(' ');
      assert.doesNotMatch(fixed, PROMISE, `${c.id} : « ${text} »`);
    }
  }
});

test('temps forts : codes convenus avec l’app, slugs uniques, chaque code daté', () => {
  assert.deepEqual(Object.keys(TEMPS_FORTS).sort(), [...TEMPS_FORT_CODES].sort());
  const slugs = Object.values(TEMPS_FORTS).map((t) => t.slug);
  assert.equal(new Set(slugs).size, slugs.length);
  for (const slug of slugs) assert.match(slug, /^[a-z0-9-]+$/);
  for (const code of TEMPS_FORT_CODES) assert.ok(CAMPAIGNS.some((c) => c.code === code), code);
  const ids = [...CAMPAIGNS.map((c) => c.id), ...CALENDAR.map((m) => m.id)];
  assert.equal(new Set(ids).size, ids.length);
  // Les ancres des mois de l'année pleine sont les noms sans accent (#janvier… #decembre).
  assert.deepEqual(
    CALENDAR.slice(2).map((m) => m.id),
    ['janvier', 'fevrier', 'mars', 'avril', 'mai', 'juin', 'juillet', 'aout', 'septembre', 'octobre', 'novembre', 'decembre'],
  );
});

test('page « Activer » : la campagne en cours, puis la suivante quand elle est passée', () => {
  assert.equal(currentCampaign('black_friday_voucher', '2026-11-02').id, 'black_friday_voucher-2026');
  assert.equal(currentCampaign('black_friday_voucher', '2026-11-30').id, 'black_friday_voucher-2027');
  assert.equal(currentCampaign('black_friday_voucher', '2028-06-01').id, 'black_friday_voucher-2027');
  assert.equal(currentCampaign('valentines_day', '2026-11-02').id, 'valentines_day-2027');
});
