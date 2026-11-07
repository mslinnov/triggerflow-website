/**
 * Symbole TriggerFlow redessiné en vectoriel d'après le Figma de La rampe (page « Logo & identité »,
 * cadre PP1) : une barre, deux arcs et un demi-disque.
 * Le Figma décompose le logo en 3 formes : Trigger, Automation flows, Arrow (mouse click).
 */
type Part = 'full' | 'trigger' | 'flows' | 'arrow';

interface BrandMarkProps {
  part?: Part;
  className?: string;
}

const ARC = 'M72 0 L106 0 A98 98 0 0 0 138.7 73.5 L116 99 A132 132 0 0 1 72 0 Z';

function Arrow() {
  return (
    <>
      <rect x="0" y="99" width="116" height="32" rx="3" />
      <path d={ARC} />
      <path d={ARC} transform="translate(0 230) scale(1 -1)" />
    </>
  );
}

export function BrandMark({ part = 'full', className }: BrandMarkProps) {
  if (part === 'trigger') {
    return (
      <svg viewBox="66 124 80 112" fill="currentColor" aria-hidden className={className}>
        <path d={ARC} transform="translate(0 230) scale(1 -1)" />
      </svg>
    );
  }
  if (part === 'flows') {
    return (
      <svg viewBox="-45.5 45.5 230 139" fill="currentColor" aria-hidden className={className}>
        <g transform="rotate(90 69.5 115)">
          <Arrow />
        </g>
      </svg>
    );
  }
  if (part === 'arrow') {
    return (
      <svg viewBox="0 0 139 230" fill="currentColor" aria-hidden className={className}>
        <Arrow />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 198 230" fill="currentColor" aria-hidden className={className}>
      <Arrow />
      <path d="M159 76 A39 39 0 0 1 159 154 Z" />
    </svg>
  );
}
