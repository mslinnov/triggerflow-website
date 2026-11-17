'use client';

import { useEffect } from 'react';
import { decorateBookingUrl } from '@/lib/attribution';
import { classifyDemoLink } from '@/lib/demo-link';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Tracks clicks on every "Book a demo" link (any <a> pointing to lemcal.com, or to
 * the site's own `/demo` page that embeds the calendar) and sends a GA4
 * `book_demo_click` event (with `destination`: `lemcal` or `demo_page`) plus a
 * Meta `Lead` event. The booking itself is counted on `/merci-rdv` (`demo_booked`). Implemented as a
 * single delegated listener on the document so it captures ALL demo CTAs at once —
 * ButtonLink components, raw <a> tags, the sticky mobile CTA, and the markdown
 * links inside MDX articles — without touching any of the individual buttons.
 *
 * Consent-aware, and per purpose: `window.gtag` only exists once analytics consent
 * is granted, `window.fbq` only once marketing consent is granted (see
 * GoogleAnalytics.tsx / MetaPixel.tsx / lib/cookies.ts). The two guards are
 * independent, so a visitor who accepts audience measurement but refuses
 * advertising is counted in GA4 and never sent to Meta.
 */
export function DemoClickTracker() {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as Element | null;
      const link = target?.closest('a');
      if (!link) return;

      // `link.href` resolves to the absolute URL of the anchor.
      const href = link.href;
      if (!href || typeof window === 'undefined') return;
      const destination = classifyDemoLink(href, window.location.origin);
      if (!destination) return;

      // La source de la visite (UTM, et gclid avec accord marketing) suit le
      // visiteur jusqu'à lemcal : on sait d'où vient chaque rendez-vous. Le lien
      // est réécrit avant la navigation, qui part donc avec les paramètres.
      // Vers /demo, rien à réécrire : la page garde la source et la passe au
      // calendrier intégré (DemoCalendarFrame).
      if (destination === 'lemcal') {
        const decorated = decorateBookingUrl(href);
        if (decorated !== href) link.href = decorated;
      }

      // Analytics consent granted (gtag is defined).
      window.gtag?.('event', 'book_demo_click', {
        link_url: href,
        destination,
        page_path: window.location.pathname,
      });

      // Marketing consent granted (fbq is defined). `Lead` is the standard Meta
      // event for a demo request — it is what the campaign optimises against.
      window.fbq?.('track', 'Lead', {
        content_name: 'book_demo_click',
        source_url: window.location.pathname,
      });
      // No preventDefault: the link navigates normally.
    };

    // Capture phase so the event is observed even if a nested handler stops propagation.
    document.addEventListener('click', handleClick, { capture: true });
    return () => document.removeEventListener('click', handleClick, { capture: true });
  }, []);

  return null;
}
