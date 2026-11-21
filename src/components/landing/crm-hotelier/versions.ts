/*
 * Version animée ou fixe du récit. Le serveur ne connaît ni les préférences du visiteur ni son écran : tant que la page
 * n'est pas hydratée (`fixe` nul), les deux versions sont dans le HTML et le CSS montre celle que demande
 * `prefers-reduced-motion`. React garde ensuite celle-là : ni saut de mise en page, ni ancre décalée (#rappel).
 * Un écran trop court (téléphone couché) reste choisi au client.
 */

/** Hauteurs d'écran de la fin du récit sur lesquelles le bas de page remonte en rideau. */
export const QUEUE = 0.72;

/** La classe de chaque version, ou null quand elle n'est pas rendue. */
export function versions(fixe: boolean | null): { animee: string | null; fixe: string | null } {
  if (fixe === null) return { animee: 'motion-reduce:hidden', fixe: 'hidden motion-reduce:block' };
  return fixe ? { animee: null, fixe: '' } : { animee: '', fixe: null };
}

// Les deux listes, écrites en entier pour que Tailwind les trouve : la seconde est la première sous `motion-safe:`.
const RIDEAU = 'overflow-hidden rounded-t-[28px] shadow-[0_-30px_80px_-30px_rgba(0,40,36,0.22)] lg:rounded-t-[40px] -mt-[72svh]';
const RIDEAU_SI_ANIME =
  'motion-safe:overflow-hidden motion-safe:rounded-t-[28px] motion-safe:shadow-[0_-30px_80px_-30px_rgba(0,40,36,0.22)] motion-safe:lg:rounded-t-[40px] motion-safe:-mt-[72svh]';

/** Le bas de page : en rideau sur la fin du récit animé, coupe nette sous la version fixe. */
export function rideau(fixe: boolean | null): string {
  return fixe === null ? RIDEAU_SI_ANIME : fixe ? '' : RIDEAU;
}
