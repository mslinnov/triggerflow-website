'use client';

import { useEffect, useRef, useState } from 'react';
import { Container } from '@/components/ui';
import { cn } from '@/lib/utils';

export interface MonthChip {
  id: string;
  chip: string;
  /** Titre complet (« Novembre 2026 »), lu par les lecteurs d'écran. */
  title: string;
}

interface MonthChipsProps {
  /** Mois groupés par année, dans l'ordre du calendrier. */
  years: Array<{ year: string; months: MonthChip[] }>;
  label: string;
  /** Nom accessible de chaque groupe (« Mois de 2026 »). */
  yearLabels: Record<string, string>;
  /** Position collante sous l'en-tête fixe du site (dépend du bandeau tarifaire). */
  stickyTopClass: string;
}

const prefersReducedMotion = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Puces des mois, collées sous l'en-tête, groupées par année (Nov. et Déc. existent en
 * 2026 et en 2027). La puce du mois affiché est marquée (`aria-current`) et ramenée
 * dans la zone visible de la barre, qui défile horizontalement sur mobile.
 */
export function MonthChips({ years, label, yearLabels, stickyTopClass }: MonthChipsProps) {
  const [active, setActive] = useState<string | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Mois actif : la dernière section dont le haut a passé le tiers de l'écran. Calculé
  // au chargement (arrivée sur une ancre) puis à chaque défilement, une fois par image.
  useEffect(() => {
    const sections = years.flatMap((y) => y.months).map((m) => document.getElementById(m.id)).filter((el): el is HTMLElement => !!el);
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.35;
      const current = sections.filter((section) => section.getBoundingClientRect().top <= line).pop();
      setActive(current ? current.id : null);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [years]);

  // Puce active ramenée dans la barre : défilement horizontal seulement, jamais de la page.
  useEffect(() => {
    const list = listRef.current;
    const chip = active ? list?.querySelector<HTMLElement>(`[data-month="${active}"]`) : null;
    if (!list || !chip) return;
    const left = chip.offsetLeft - list.clientWidth / 2 + chip.offsetWidth / 2;
    list.scrollTo({ left, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  }, [active]);

  return (
    <nav aria-label={label} className={cn('sticky z-30 border-b border-border-light bg-white/95 backdrop-blur', stickyTopClass)}>
      <Container className="px-0 sm:px-6">
        <div ref={listRef} className="relative flex items-center gap-4 overflow-x-auto px-4 py-2.5 [scrollbar-width:none] sm:px-0">
          {years.map(({ year, months }) => (
            <div key={year} role="group" aria-label={yearLabels[year]} className="flex shrink-0 items-center gap-2">
              <span aria-hidden="true" className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
                {year}
              </span>
              <ul className="flex gap-2">
                {months.map((month) => {
                  const isActive = month.id === active;
                  return (
                    <li key={month.id} className="shrink-0">
                      <a
                        href={`#${month.id}`}
                        data-month={month.id}
                        aria-label={month.title}
                        aria-current={isActive ? 'true' : undefined}
                        className={cn(
                          'inline-flex min-h-11 items-center rounded-full border px-4 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2',
                          isActive
                            ? 'border-brand-primary bg-brand-primary text-white'
                            : 'border-border-light bg-white text-text-primary hover:border-brand-primary hover:text-brand-primary',
                        )}
                      >
                        {month.chip}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </nav>
  );
}
