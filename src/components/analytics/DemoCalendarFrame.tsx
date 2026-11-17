'use client';

import { useEffect, useState } from 'react';
import { decorateBookingUrl } from '@/lib/attribution';

interface DemoCalendarFrameProps {
  src: string;
  title: string;
  className?: string;
}

/**
 * Calendrier lemcal intégré à la page `/demo`. La source de la visite (UTM, et
 * gclid avec accord marketing) est ajoutée à l'adresse du calendrier, comme sur
 * les liens directs (DemoClickTracker) : sans elle, lemcal ne saurait pas d'où
 * vient un rendez-vous pris dans la page. Rendu serveur avec l'adresse nue,
 * complétée une fois dans le navigateur.
 */
export function DemoCalendarFrame({ src, title, className }: DemoCalendarFrameProps) {
  const [frameSrc, setFrameSrc] = useState(src);

  useEffect(() => {
    setFrameSrc(decorateBookingUrl(src));
  }, [src]);

  return <iframe src={frameSrc} title={title} loading="lazy" className={className} />;
}
