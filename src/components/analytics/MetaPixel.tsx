'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';
import {
  CONSENT_CHANGED_EVENT,
  clearMarketingCookies,
  hasValidConsent,
  getConsent,
} from '@/lib/cookies';

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

declare global {
  interface Window {
    fbq?: ((...args: unknown[]) => void) & { callMethod?: (...args: unknown[]) => void };
    _fbq?: unknown;
  }
}

/**
 * Meta pixel, gated on the `marketing` consent category.
 *
 * Unlike GA4 there is no Consent Mode equivalent worth relying on here: the
 * pixel either fires or it does not. So we apply the strictest reading —
 * nothing reaches Meta until the visitor explicitly opts in to advertising
 * cookies, and revoking the choice removes the cookies the pixel dropped.
 *
 * Deliberately separate from GoogleAnalytics.tsx: measuring the audience and
 * building advertising audiences are two distinct purposes, and the visitor
 * can accept one while refusing the other.
 */
export function MetaPixel() {
  const [granted, setGranted] = useState(false);

  useEffect(() => {
    if (!PIXEL_ID) return;

    const apply = () => {
      const isGranted = hasValidConsent() && getConsent()?.marketing === true;
      setGranted(isGranted);
      if (!isGranted) clearMarketingCookies();
    };

    apply();
    window.addEventListener(CONSENT_CHANGED_EVENT, apply);
    return () => window.removeEventListener(CONSENT_CHANGED_EVENT, apply);
  }, []);

  if (!PIXEL_ID || !granted) return null;

  return (
    <Script id="meta-pixel" strategy="afterInteractive">
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
 * Emits a Meta standard event. Silent no-op when the pixel is not loaded
 * (consent refused, pixel not configured, ad blocker): the conversion path
 * must never depend on tracking being available.
 *
 * Used by the acquisition landing pages to report simulator engagement
 * (ViewContent) and form submissions (Lead) with the estimated revenue as the
 * event value, so campaigns can optimise on lead quality rather than volume.
 */
export function trackMetaEvent(
  event: 'ViewContent' | 'Lead' | 'CompleteRegistration',
  params?: Record<string, unknown>
): void {
  if (typeof window === 'undefined' || typeof window.fbq !== 'function') return;
  try {
    window.fbq('track', event, params);
  } catch {
    // Ignored on purpose: tracking must never break the page.
  }
}
