'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { CONSENT_CHANGED_EVENT } from '@/lib/cookies';
import { captureAttribution, syncAttributionStorage } from '@/lib/attribution';

/**
 * Lit gclid et UTM à chaque arrivée sur une page, et suit le consentement :
 * accord marketing = attribution gardée 90 jours, refus ou retrait = effacée.
 */
export function AttributionTracker() {
  const pathname = usePathname();

  useEffect(() => {
    captureAttribution(window.location.search, window.location.pathname);
  }, [pathname]);

  useEffect(() => {
    window.addEventListener(CONSENT_CHANGED_EVENT, syncAttributionStorage);
    return () => window.removeEventListener(CONSENT_CHANGED_EVENT, syncAttributionStorage);
  }, []);

  return null;
}
