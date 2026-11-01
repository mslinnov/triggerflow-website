'use client';

import { useEffect } from 'react';
import { calendarStatForClick, recordCalendarStat } from '@/lib/calendrier-tracking';

interface CalendarStatsTrackerProps {
  /** Page « Activer » : son temps fort, porté par la vue de page et les clics. */
  tempsFort?: string;
}

/**
 * Statistiques des pages du calendrier : la vue de la page (avec son temps fort sur une
 * page « Activer »), puis, par un seul écouteur délégué, les clics vers la démo
 * (liens lemcal) et les liens « Déjà client » marqués `data-calendar-stat="client_click"`
 * (voir calendarStatForClick). Copier, télécharger, activer et thèmes sont comptés par
 * leurs boutons.
 */
export function CalendarStatsTracker({ tempsFort }: CalendarStatsTrackerProps) {
  useEffect(() => {
    recordCalendarStat({ type: 'page_view', temps_fort: tempsFort ?? null });

    const handleClick = (event: MouseEvent) => {
      const link = event.target instanceof Element ? event.target.closest('a') : null;
      const stat = link?.href ? calendarStatForClick(link, tempsFort ?? null) : null;
      if (stat) recordCalendarStat(stat);
    };
    document.addEventListener('click', handleClick, { capture: true });
    return () => document.removeEventListener('click', handleClick, { capture: true });
  }, [tempsFort]);

  return null;
}
