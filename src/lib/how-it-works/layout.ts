/**
 * Taille de la scène. Ces valeurs reprennent les classes CSS de la scène de la LP CRM hôtelier (Immersion) : elles
 * servent seulement à savoir, avant d'afficher la scène, si l'écran est assez grand pour elle.
 */

/** En dessous de ce côté, le visuel n'est plus lisible : on montre la version fixe. */
export const MIN_SIDE = 240;

/**
 * Hauteur par défaut de l'en-tête fixe du site (`pt-[100px]`). La LP CRM hôtelier passe la sienne
 * (`HEADER` de moteur.ts).
 */
export const HEADER = 100;
/** Bande de la ligne de séjour, sous le visuel. */
const STRIP = 60;
/** Bloc de texte sous le visuel, en une colonne. */
const TEXT = 152;
/** Largeur à partir de laquelle texte et visuel passent côte à côte (point de rupture `lg`). */
const TWO_COLUMNS = 1024;

/** Côté du visuel carré pour une fenêtre donnée, en pixels. Peut être négatif si rien ne tient. */
export function fitSide(width: number, height: number, header = HEADER): number {
  return width >= TWO_COLUMNS
    ? Math.min(0.46 * width, 580, height - header - STRIP - 32)
    : Math.min(width, 430, height - header - STRIP - TEXT);
}

/**
 * Dit si l'écran est trop court pour la scène, en ne refaisant le calcul que lorsque la largeur change
 * (rotation, fenêtre redimensionnée). Sur téléphone, la hauteur varie dès que la barre d'adresse se replie :
 * sans cette mémoire, la page basculerait d'une version à l'autre en plein défilement.
 */
export function shortScreenTracker(header = HEADER): (width: number, height: number) => boolean {
  let lastWidth = -1;
  let tooShort = false;
  return (width, height) => {
    if (width !== lastWidth) {
      lastWidth = width;
      tooShort = fitSide(width, height, header) < MIN_SIDE;
    }
    return tooShort;
  };
}
