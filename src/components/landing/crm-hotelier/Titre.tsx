import type { CSSProperties, RefObject } from 'react';
import { GAP_H } from './moteur';

/** Le titre de la pub en quatre morceaux : la carte de Sophie apparaît entre « connecté » et « à votre PMS. ». */
export interface LignesTitre {
  line1: string;
  line2: string;
  line3: string;
  line4: string;
}

export const titreEntier = (l: LignesTitre) => [l.line1, l.line2, l.line3, l.line4].join(' ');

/**
 * Le H1, avec le trou où apparaît la carte. Le texte complet est dans le HTML servi (aria-label et texte) ;
 * le trou est fermé au repos. `cut` : classes du retour à la ligne après « hôtelier ».
 */
export function Titre({ lignes, gap, gapStyle, className, cut }: { lignes: LignesTitre; gap: RefObject<HTMLSpanElement | null>; gapStyle?: CSSProperties; className?: string; cut?: string }) {
  return (
    <h1 aria-label={titreEntier(lignes)} className={className}>
      <span aria-hidden>
        {lignes.line1}
        <br className={cut} /> {lignes.line2}
        <span ref={gap} className="inline-block align-middle" style={gapStyle ?? { width: 0, height: `${GAP_H}em` }} /> {lignes.line3}
        {/* Téléphone : la coupe est fixée, pour que l'ouverture du trou ne fasse sauter aucun mot à la ligne. */}
        <br className="lg:hidden" /> {lignes.line4}
      </span>
    </h1>
  );
}
