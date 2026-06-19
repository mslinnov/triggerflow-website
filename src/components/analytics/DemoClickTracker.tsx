'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Tracks clicks on every "Book a demo" link (any <a> pointing to lemcal.com) and
 * sends a GA4 `book_demo_click` event. Implemented as a single delegated listener
 * on the document so it captures ALL demo CTAs at once — ButtonLink components,
 * raw <a> tags, the sticky mobile CTA, and the markdown links inside MDX articles —
 * without touching any of the individual buttons.
 *
 * Consent-aware: `window.gtag` only exists after the user opts in via the RGPD
 * banner (see GoogleAnalytics.tsx / lib/cookies.ts). The guard below means clicks
 * from non-consenting visitors are simply not tracked.
 */
export function DemoClickTracker() {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as Element | null;
      const link = target?.closest('a');
      if (!link) return;

      // `link.href` resolves to the absolute URL of the anchor.
      const href = link.href;
      if (!href || !href.includes('lemcal.com')) return;

      // Only fire if analytics consent has been granted (gtag is defined).
      if (typeof window === 'undefined' || !window.gtag) return;

      window.gtag('event', 'book_demo_click', {
        link_url: href,
        page_path: window.location.pathname,
      });
      // No preventDefault: the link navigates normally.
    };

    // Capture phase so the event is observed even if a nested handler stops propagation.
    document.addEventListener('click', handleClick, { capture: true });
    return () => document.removeEventListener('click', handleClick, { capture: true });
  }, []);

  return null;
}
