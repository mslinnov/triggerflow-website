export interface AnchorRect {
  top: number;
  bottom: number;
  left: number;
  width: number;
}

export interface TooltipPlacement {
  side: 'top' | 'bottom';
  /** Coordonnées dans la fenêtre (position: fixed). */
  top: number;
  left: number;
  /** Centre de la flèche, depuis le bord gauche de la bulle. */
  arrowLeft: number;
}

const GAP = 10;
const MARGIN = 16;
const ARROW_INSET = 12;

/**
 * Place l'info-bulle sous le bouton (au-dessus seulement si le bas manque de place et que le haut en a),
 * centrée sur lui et bornée à 16 px des bords de la fenêtre.
 */
export function placeTooltip(
  anchor: AnchorRect,
  tip: { width: number; height: number },
  viewport: { width: number; height: number },
): TooltipPlacement {
  const center = anchor.left + anchor.width / 2;
  const fitsBelow = anchor.bottom + GAP + tip.height <= viewport.height - MARGIN;
  const fitsAbove = anchor.top - GAP - tip.height >= MARGIN;
  const side = !fitsBelow && fitsAbove ? 'top' : 'bottom';
  const maxLeft = Math.max(MARGIN, viewport.width - MARGIN - tip.width);
  const left = Math.min(Math.max(center - tip.width / 2, MARGIN), maxLeft);
  const arrowLeft = Math.min(Math.max(center - left, ARROW_INSET), tip.width - ARROW_INSET);
  return {
    side,
    top: side === 'bottom' ? anchor.bottom + GAP : anchor.top - GAP - tip.height,
    left,
    arrowLeft,
  };
}
