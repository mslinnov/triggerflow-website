/**
 * Emballe la formation du stand (content/formation-salon/index.html) dans un
 * module TypeScript servi par src/app/formation-salon/route.ts.
 *
 * Pourquoi un module et pas un fichier de public/ : tout fichier de public/
 * est servi tel quel, sans passer par la route, donc sans mot de passe. Et le
 * Worker Cloudflare n'a pas de système de fichiers pour lire le HTML à la
 * demande : il doit faire partie du bundle.
 *
 * À relancer après chaque modification du HTML :
 *   node scripts/embed-formation-salon.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const source = `${root}content/formation-salon/index.html`;
const target = `${root}src/lib/formation-salon/html.ts`;

const html = readFileSync(source, 'utf8');

writeFileSync(
  target,
  '// Fichier généré par scripts/embed-formation-salon.mjs : ne pas modifier à la main.\n' +
    '// Source : content/formation-salon/index.html\n' +
    `export const FORMATION_HTML = ${JSON.stringify(html)};\n`,
);

console.log(`${target} : ${html.length} caractères`);
