'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';
import {
  CONSENT_CHANGED_EVENT,
  clearAnalyticsCookies,
  hasValidConsent,
  getConsent,
} from '@/lib/cookies';

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

declare global {
  interface Window {
    dataLayer?: unknown[];
    [gaDisableKey: `ga-disable-${string}`]: boolean;
  }
}

export function GoogleAnalytics() {
  const [analyticsAllowed, setAnalyticsAllowed] = useState(false);

  useEffect(() => {
    const evaluate = () => {
      const allowed = hasValidConsent() && getConsent()?.analytics === true;
      setAnalyticsAllowed(allowed);

      if (!GA_ID) return;
      if (allowed) {
        // Lift any previous disable flag set during a refusal in the same session.
        window[`ga-disable-${GA_ID}`] = false;
      } else {
        window[`ga-disable-${GA_ID}`] = true;
        clearAnalyticsCookies();
      }
    };

    evaluate();
    window.addEventListener(CONSENT_CHANGED_EVENT, evaluate);
    return () => window.removeEventListener(CONSENT_CHANGED_EVENT, evaluate);
  }, []);

  if (!GA_ID || !analyticsAllowed) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', { anonymize_ip: true });
        `}
      </Script>
    </>
  );
}
