'use client';

import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { placeTooltip, type TooltipPlacement } from './tooltip-position';

/** Une seule info-bulle ouverte à la fois : chaque ouverture prévient les autres. */
const OPEN_EVENT = 'tf:feature-tooltip-open';

interface FeatureTooltipProps {
  /** Nom accessible du bouton, ex. « En savoir plus : Segments clients ». */
  label: string;
  what: string;
  example: string;
  exampleLabel: string;
}

/**
 * Bouton (?) d'une ligne du tableau des tarifs : s'ouvre au survol de la souris, au focus clavier
 * et au toucher ; se ferme par Échap, en quittant le bouton ou en touchant ailleurs.
 * La bulle est rendue dans un portail en position fixe : le tableau ne la coupe pas.
 */
export function FeatureTooltip({ label, what, example, exampleLabel }: FeatureTooltipProps) {
  const id = useId();
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState<TooltipPlacement | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const tipRef = useRef<HTMLDivElement>(null);
  /** Type du dernier appui : un toucher bascule, un clic de souris laisse ouvert. */
  const pointerType = useRef<string | null>(null);

  const place = useCallback(() => {
    const button = buttonRef.current;
    const tip = tipRef.current;
    if (!button || !tip) return;
    const rect = button.getBoundingClientRect();
    setPlacement(
      placeTooltip(
        rect,
        { width: tip.offsetWidth, height: tip.offsetHeight },
        { width: window.innerWidth, height: window.innerHeight },
      ),
    );
  }, []);

  // Placée avant l'affichage : une position restée d'une ouverture précédente n'est jamais peinte.
  useLayoutEffect(() => {
    if (open) place();
  }, [open, place]);

  useEffect(() => {
    if (!open) return;
    window.dispatchEvent(new CustomEvent(OPEN_EVENT, { detail: id }));
    const onOtherOpen = (event: Event) => {
      if ((event as CustomEvent<string>).detail !== id) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (!buttonRef.current?.contains(target) && !tipRef.current?.contains(target)) setOpen(false);
    };
    window.addEventListener(OPEN_EVENT, onOtherOpen);
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('scroll', place, { capture: true, passive: true });
    window.addEventListener('resize', place);
    return () => {
      window.removeEventListener(OPEN_EVENT, onOtherOpen);
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('scroll', place, { capture: true });
      window.removeEventListener('resize', place);
    };
  }, [open, id, place]);

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        aria-label={label}
        aria-expanded={open}
        aria-describedby={open ? id : undefined}
        onPointerDown={(event) => {
          pointerType.current = event.pointerType;
        }}
        onPointerEnter={(event) => {
          if (event.pointerType === 'mouse') setOpen(true);
        }}
        onPointerLeave={(event) => {
          if (event.pointerType === 'mouse') setOpen(false);
        }}
        onFocus={() => {
          // Focus venu du clavier : le toucher et la souris passent par le clic.
          if (pointerType.current === null) setOpen(true);
        }}
        onBlur={() => setOpen(false)}
        onClick={() => {
          if (pointerType.current === 'mouse') setOpen(true);
          else setOpen((value) => !value);
          pointerType.current = null;
        }}
        className={cn(
          'inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-colors',
          'focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-brand-primary',
          open ? 'text-brand-primary' : 'text-zinc-400 hover:text-zinc-600',
        )}
      >
        <HelpCircle className="h-4 w-4" aria-hidden="true" />
      </button>
      {open &&
        createPortal(
          <div
            ref={tipRef}
            id={id}
            role="tooltip"
            style={{
              top: placement?.top ?? 0,
              left: placement?.left ?? 0,
              visibility: placement ? 'visible' : 'hidden',
            }}
            className="fixed z-[100] w-[min(300px,calc(100vw-32px))] rounded-xl bg-brand-dark px-3.5 py-3 text-[13px] leading-relaxed text-white/90 shadow-xl"
          >
            <span
              aria-hidden="true"
              style={{ left: (placement?.arrowLeft ?? 0) - 6 }}
              className={cn(
                'absolute h-3 w-3 rotate-45 bg-brand-dark',
                placement?.side === 'top' ? '-bottom-1.5' : '-top-1.5',
              )}
            />
            <p>{what}</p>
            <p className="mt-2 text-white/75">
              <span className="font-semibold text-brand-accent">{exampleLabel}</span> {example}
            </p>
          </div>,
          document.body,
        )}
    </>
  );
}
