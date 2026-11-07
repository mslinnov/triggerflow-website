import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
/**
 * Lien interne d'article : retire le slash final (évite une redirection 308) et ajoute la locale
 * quand elle manque (évite une redirection 307). Les liens externes, ancres et fichiers restent intacts.
 */
export function normalizeInternalHref(href: string, locale: string): string {
  if (!href.startsWith('/') || href.startsWith('//')) return href;
  const [path, rest = ''] = href.split(/(?=[?#])/);
  let out = path.length > 1 && path.endsWith('/') ? path.slice(0, -1) : path;
  if (!/^\/(fr|en)(\/|$)/.test(out) && !/\.[a-z0-9]+$/i.test(out) && !out.startsWith('/images') && !out.startsWith('/api')) out = `/${locale}${out === '/' ? '' : out}`;
  return out + rest;
}

/** Meta description de 160 caractères au plus, coupée sur un mot (Google tronque au-delà). */
export function clampDescription(text: string, max = 160): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(' ')).replace(/[\s,;:]+$/, '')}…`;
}
