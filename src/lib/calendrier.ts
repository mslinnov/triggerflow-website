/**
 * Rendu des modèles d'e-mails du calendrier marketing (/fr/calendrier-marketing).
 *
 * Un texte de modèle mêle trois sortes de jetons au texte libre :
 * - `{{firstname}}` : variable de fusion réelle de l'app TriggerFlow, gardée telle
 *   quelle dans le texte copié (l'app la remplace à l'envoi) ;
 * - `[[Libellé|exemple]]` (ou `[[exemple]]`) : champ que l'hôtelier remplit (prix, avantage, lien).
 *   Tout chiffre promis passe par un champ (décision 16 du plan EquipHotel) ;
 * - `{date:2027-05-06}` : une date du calendrier. Le jour de la semaine est
 *   CALCULÉ ici, jamais écrit à la main : un « jeudi 7 mai » faux ne peut pas
 *   exister dans le contenu.
 */

export type Token =
  | { kind: 'text'; value: string }
  | { kind: 'variable'; name: string }
  | { kind: 'field'; label: string; example: string }
  | { kind: 'date'; iso: string };

const TOKEN = /(\{\{[a-z_]+\}\}|\[\[[^\]|]+(?:\|[^\]]*)?\]\]|\{date:\d{4}-\d{2}-\d{2}\})/;

export function tokenize(text: string): Token[] {
  return text
    .split(TOKEN)
    .filter((part) => part !== '')
    .map((part): Token => {
      if (part.startsWith('{{')) return { kind: 'variable', name: part.slice(2, -2) };
      if (part.startsWith('[[')) {
        const [label, example] = part.slice(2, -2).split('|');
        return { kind: 'field', label, example: example ?? label };
      }
      if (part.startsWith('{date:')) return { kind: 'date', iso: part.slice(6, -1) };
      return { kind: 'text', value: part };
    });
}

/** Date ISO (AAAA-MM-JJ) lue à midi UTC : aucun fuseau ne la fait glisser d'un jour. */
function toDate(iso: string): Date {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) throw new Error(`Date ISO invalide : ${iso}`);
  const date = new Date(`${iso}T12:00:00Z`);
  if (Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== iso) {
    throw new Error(`Date inexistante : ${iso}`);
  }
  return date;
}

const LONG = new Intl.DateTimeFormat('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', timeZone: 'UTC' });
const SHORT = new Intl.DateTimeFormat('fr-FR', { weekday: 'short', day: 'numeric', month: 'short', timeZone: 'UTC' });

/** « jeudi 6 mai » ; le 1er du mois s'écrit « 1er ». */
export function formatDateLong(iso: string): string {
  return premier(LONG.format(toDate(iso)));
}

/** « jeu. 6 mai », pour les listes de dates clés. */
export function formatDateShort(iso: string): string {
  return premier(SHORT.format(toDate(iso)));
}

function premier(formatted: string): string {
  return formatted.replace(/(^|\s)1(\s)/, '$11er$2');
}

/** Jour de la semaine (0 = dimanche), pour les tests. */
export function weekday(iso: string): number {
  return toDate(iso).getUTCDay();
}

/** Texte prêt à coller : variables intactes, champs entre crochets avec leur exemple. */
export function toPlainText(text: string): string {
  return tokenize(text)
    .map((token) => {
      switch (token.kind) {
        case 'text':
          return token.value;
        case 'variable':
          return `{{${token.name}}}`;
        case 'field':
          return `[${token.label} : ${token.example}]`;
        case 'date':
          return formatDateLong(token.iso);
      }
    })
    .join('');
}

/** Texte d'aperçu sur une charte d'exemple : variables et champs remplacés par des valeurs plausibles. */
export function toExampleText(text: string, variables: Record<string, string>): string {
  return tokenize(text)
    .map((token) => {
      switch (token.kind) {
        case 'text':
          return token.value;
        case 'variable':
          return variables[token.name] ?? '';
        case 'field':
          return token.example;
        case 'date':
          return formatDateLong(token.iso);
      }
    })
    .join('');
}

export interface EmailModel {
  subject: string;
  preheader: string;
  /** Paragraphes ; un tableau est une liste à puces. */
  body: Array<string | string[]>;
  cta: { label: string; url: string };
}

/** E-mail complet en texte brut, tel que copié par « Copier le template ». */
export function emailToPlainText(email: EmailModel): string {
  const body = email.body
    .map((block) => (Array.isArray(block) ? block.map((item) => `- ${toPlainText(item)}`).join('\n') : toPlainText(block)))
    .join('\n\n');
  return [
    `Objet : ${toPlainText(email.subject)}`,
    `Pré-en-tête : ${toPlainText(email.preheader)}`,
    '',
    body,
    '',
    `Bouton : ${toPlainText(email.cta.label)} (${toPlainText(email.cta.url)})`,
  ].join('\n');
}
