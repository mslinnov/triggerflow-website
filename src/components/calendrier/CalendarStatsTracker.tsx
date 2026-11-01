'use client';

import { useEffect } from 'react';
import { TEMPS_FORT_CODES } from '@/data/calendrier-marketing';
import { recordCalendarStat } from '@/lib/calendrier-tracking';

interface CalendarStatsTrackerProps {
  /** Page « Activer » : son temps fort, porté par la vue de page et les clics. */
  tempsFort?: string;
}

/** Temps fort d'un lien de démo : son `utm_content` quand c'est un code (calendarDemoUrl). */
function tempsFortOfLink(href: string): string | null {
  try {
    const content = new URL(href).searchParams.get('utm_content');
    return content && (TEMPS_FORT_CODES as readonly string[]).includes(content) ? content : null;
  } catch {
    return null;
  }
}

/**
 * Statistiques des pages du calendrier : la vue de la page (avec son temps fort sur une
 * page « Activer »), puis, par un seul écouteur délégué, les clics vers la démo
 * (liens lemcal) et les liens « Déjà client » marqués `data-calendar-stat="client_click"`.
 * Copier, télécharger, activer et thèmes sont comptés par leurs boutons.
 */
export function CalendarStatsTracker({ tempsFort }: CalendarStatsTrackerProps) {
  useEffect(() => {
    recordCalendarStat({ type: 'page_view', temps_fort: tempsFort ?? null });

    const handleClick = (event: MouseEvent) => {
      const link = event.target instanceof Element ? event.target.closest('a') : null;
      if (!link?.href) return;
      if (link.href.includes('lemcal.com')) {
        recordCalendarStat({ type: 'demo_click', temps_fort: tempsFortOfLink(link.href) ?? tempsFort ?? null });
      } else if (link.dataset.calendarStat === 'client_click') {
        recordCalendarStat({ type: 'client_click', temps_fort: tempsFort ?? null });
      }
    };
    document.addEventListener('click', handleClick, { capture: true });
    return () => document.removeEventListener('click', handleClick, { capture: true });
  }, [tempsFort]);

  return null;
}
