/**
 * Modèles MJML du calendrier marketing (/fr/calendrier-marketing).
 *
 * Source unique : la bibliothèque de l'app (backend/resources/email-library/seasonal/
 * <thème>/<code>.{mjml,html,json}), recopiée telle quelle dans
 * src/data/calendrier-mjml/<thème>/. Le HTML arrive déjà compilé : aucune dépendance
 * MJML côté site. Thèmes : MJML_THEMES (src/data/calendrier-marketing.ts).
 *
 * Conventions des fichiers :
 * - `{{firstname}}`… : variables de fusion de l'app, gardées dans le texte copié ;
 * - `[[Libellé|exemple]]` (ou `[[exemple]]`) : champ que l'hôtelier remplit ;
 * - `<code>.json` : { "subject": "…", "preheader": "…" }.
 *
 * Un thème sans les trois fichiers d'un code n'est pas proposé pour ce code ; un code
 * sans aucun thème complet retombe sur le modèle texte (src/data/calendrier-marketing.ts).
 */

import fs from 'fs';
import path from 'path';
import {
  DEFAULT_MJML_THEME,
  MJML_THEMES,
  TEMPS_FORT_CODES,
  type MjmlTheme,
  type TempsFortCode,
} from '@/data/calendrier-marketing';

export const MJML_DIR = path.join(process.cwd(), 'src', 'data', 'calendrier-mjml');

export interface MjmlTemplate {
  code: TempsFortCode;
  theme: MjmlTheme;
  mjml: string;
  html: string;
  subject: string;
  preheader: string;
}

export type MjmlFormat = 'mjml' | 'html';

/** Lit les trois fichiers d'un code dans `<baseDir>/<theme>/` ; null s'il en manque un. */
export function loadMjmlTemplate(
  code: TempsFortCode,
  theme: MjmlTheme = DEFAULT_MJML_THEME,
  baseDir: string = MJML_DIR,
): MjmlTemplate | null {
  const file = (ext: string) => path.join(baseDir, theme, `${code}.${ext}`);
  if (!['mjml', 'html', 'json'].every((ext) => fs.existsSync(file(ext)))) return null;
  const meta = JSON.parse(fs.readFileSync(file('json'), 'utf8')) as { subject?: unknown; preheader?: unknown };
  return {
    code,
    theme,
    mjml: fs.readFileSync(file('mjml'), 'utf8'),
    html: fs.readFileSync(file('html'), 'utf8'),
    subject: typeof meta.subject === 'string' ? meta.subject : '',
    preheader: typeof meta.preheader === 'string' ? meta.preheader : '',
  };
}

/** Thèmes livrés (trois fichiers présents) pour un code, dans l'ordre de MJML_THEMES. */
export function loadMjmlThemes(code: TempsFortCode, baseDir: string = MJML_DIR): MjmlTemplate[] {
  return MJML_THEMES.map((theme) => loadMjmlTemplate(code, theme, baseDir)).filter((t): t is MjmlTemplate => t !== null);
}

// ── Aperçu ──────────────────────────────────────────────────────────────────

const FIELD = /\[\[([^\]|]+)(?:\|([^\]]*))?\]\]/g;
const VARIABLE = /\{\{\s*([a-z_]+)\s*\}\}/g;

function escapeHtml(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/** Valeur d'exemple d'un champ : l'exemple après la barre, sinon le texte entier. */
function fieldExample(label: string, example: string | undefined): string {
  return (example ?? label).trim();
}

/**
 * HTML d'aperçu : variables remplacées par des valeurs d'exemple, champs à remplir
 * surlignés. Dans une balise (un lien, un attribut), le champ devient sa valeur
 * d'exemple en clair : un <mark> y casserait le HTML. Le surlignage impose son texte
 * sombre : hérité, il serait blanc sur pêche dans les thèmes à fond sombre (Soirée).
 * Les scripts sont retirés
 * (l'iframe est de toute façon en sandbox sans scripts).
 */
export function toPreviewHtml(html: string, variables: Record<string, string>): string {
  const withoutScripts = html.replace(/<script\b[\s\S]*?<\/script>/gi, '');
  return withoutScripts
    .split(/(<[^>]*>)/)
    .map((part) => {
      const inTag = part.startsWith('<');
      const variablesDone = part.replace(VARIABLE, (_, name: string) => escapeHtml(variables[name] ?? ''));
      return variablesDone.replace(FIELD, (_, label: string, example: string | undefined) => {
        const value = escapeHtml(fieldExample(label, example));
        return inTag
          ? value
          : `<mark title="${escapeHtml(label.trim())}" style="background:#FFF4E8;color:#002B28;border-radius:3px;padding:0 2px;box-shadow:0 0 0 1px #FFCFA2;">${value}</mark>`;
      });
    })
    .join('');
}

/** Texte visible d'un modèle, sans balises, styles, commentaires, champs ni variables (pour les tests de contenu). */
export function fixedText(source: string): string {
  return source
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<(style|mj-style|script|head|mj-head)\b[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<[^>]*>/g, ' ')
    .replace(FIELD, ' ')
    .replace(VARIABLE, ' ')
    .replace(/&nbsp;|&#160;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Chiffre promis (remise, délai, durée) écrit en clair au lieu d'un champ à remplir (décision 16). */
const PROMISE = /\d+\s?(%|€|h\b|min\b|minutes?|heures?|jours?|semaines?|mois|nuits?)|-\s?\d/i;

/** Problèmes de contenu d'un texte visible : tiret cadratin, chiffre promis hors champ. */
export function contentIssues(visibleText: string): string[] {
  const issues: string[] = [];
  if (/[—–]/.test(visibleText)) issues.push('tiret cadratin');
  const promise = visibleText.match(PROMISE);
  if (promise) issues.push(`chiffre promis hors champ : « ${promise[0]} »`);
  return issues;
}

/** Problèmes de tous les modèles (tous thèmes) : fichiers hors thème ou orphelins, contenu. */
export function auditMjmlDir(baseDir: string = MJML_DIR): string[] {
  const issues: string[] = [];
  const isTemplateFile = (f: string) => /\.(mjml|html|json)$/.test(f);
  const codeOf = (f: string) => f.replace(/\.(mjml|html|json)$/, '');
  if (!fs.existsSync(baseDir)) return issues;

  for (const entry of fs.readdirSync(baseDir, { withFileTypes: true })) {
    if (entry.isFile() && isTemplateFile(entry.name)) issues.push(`${entry.name} : hors d'un dossier de thème`);
    if (entry.isDirectory() && !entry.name.startsWith('__') && !(MJML_THEMES as readonly string[]).includes(entry.name)) {
      issues.push(`${entry.name}/ : thème inconnu`);
    }
  }

  for (const theme of MJML_THEMES) {
    const dir = path.join(baseDir, theme);
    if (!fs.existsSync(dir)) continue;
    const files = fs.readdirSync(dir).filter(isTemplateFile);
    for (const code of new Set(files.map(codeOf))) {
      const where = `${theme}/${code}`;
      if (!(TEMPS_FORT_CODES as readonly string[]).includes(code)) {
        issues.push(`${where} : code inconnu`);
        continue;
      }
      const template = loadMjmlTemplate(code as TempsFortCode, theme, baseDir);
      if (!template) {
        issues.push(`${where} : il manque un des trois fichiers (.mjml, .html, .json)`);
        continue;
      }
      if (!template.subject || !template.preheader) issues.push(`${where}.json : objet ou pré-en-tête vide`);
      const parts: Array<[string, string]> = [
        [`${where}.mjml`, fixedText(template.mjml)],
        [`${where}.html`, fixedText(template.html)],
        [`${where}.json objet`, fixedText(template.subject)],
        [`${where}.json pré-en-tête`, fixedText(template.preheader)],
      ];
      for (const [label, text] of parts) issues.push(...contentIssues(text).map((issue) => `${label} : ${issue}`));
    }
  }
  return issues;
}
