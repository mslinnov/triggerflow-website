'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';
import {
  CONSENT_CHANGED_EVENT,
  clearMarketingCookies,
  getConsent,
  hasValidConsent,
} from '@/lib/cookies';

/**
 * Meta (Facebook) Pixel — chargé uniquement après consentement explicite sur la
 * catégorie « marketing ». Même modèle que GoogleAnalytics.tsx : rien n'est
 * injecté tant que le consentement n'est pas donné, et les cookies déposés sont
 * supprimés en cas de refus ou de révocation.
 *
 * Les événements métier (ViewContent, Lead) sont émis par les composants de
 * landing page via `trackMetaEvent()` ci-dessous.
 */

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

type FbqFn = ((...args: unknown[]) => void) & {
  queue?: unknown[];
  callMethod?: (...args: unknown[]) => void;
  loaded?: boolean;
  version?: string;
  push?: unknown;
};

declare global {
  interface Window {
    fbq?: FbqFn;
    _fbq?: FbqFn;
  }
}

export function MetaPixel() {
  const [marketingAllowed, setMarketingAllowed] = useState(false);

  useEffect(() => {
    const evaluate = () => {
      const allowed = hasValidConsent() && getConsent()?.marketing === true;
      setMarketingAllowed(allowed);
      if (!allowed) clearMarketingCookies();
    };

    evaluate();
    window.addEventListener(CONSENT_CHANGED_EVENT, evaluate);
    return () => window.removeEventListener(CONSENT_CHANGED_EVENT, evaluate);
  }, []);

  if (!PIXEL_ID || !marketingAllowed) return null;

  return (
    <Script id="meta-pixel-init" strategy="afterInteractive">
      {`
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window,document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '${PIXEL_ID}');
        fbq('track', 'PageView');
      `}
    </Script>
  );
}

/**
 * Émet un événement Meta. No-op silencieux si le pixel n'est pas chargé
 * (consentement refusé, pixel non configuré, bloqueur de pub) : le parcours de
 * conversion ne doit jamais dépendre du tracking.
 */
export function trackMetaEvent(
  event: 'ViewContent' | 'Lead' | 'CompleteRegistration',
  params?: Record<string, unknown>
): void {
  if (typeof window === 'undefined' || typeof window.fbq !== 'function') return;
  try {
    window.fbq('track', event, params);
  } catch {
    // Ignoré volontairement : le tracking ne doit jamais casser la page.
  }
}
