'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';
import {
  CONSENT_CHANGED_EVENT,
  CONSENT_STORAGE_KEY,
  CONSENT_VERSION,
  CONSENT_MAX_AGE_MS,
  clearAnalyticsCookies,
  hasValidConsent,
  getConsent,
} from '@/lib/cookies';
import { GOOGLE_ADS_ID } from '@/lib/ads';

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
// Google Ads (AW-…) partage gtag.js avec GA4 : un seul chargement, deux `config`.
const ADS_ID = GOOGLE_ADS_ID;
// La bibliothèque se charge pour l'un OU l'autre identifiant.
const TAG_ID = GA_ID || ADS_ID;

/**
 * Consent Mode strategy, set via NEXT_PUBLIC_GA_CONSENT_MODE:
 *   - 'advanced' (default): gtag.js loads for everyone with consent defaulting
 *     to denied. Non-consenting visitors send cookieless, pseudonymized pings
 *     that GA4 uses to model their traffic. Maximizes measurement.
 *   - 'basic': gtag.js is withheld until the visitor grants analytics consent.
 *     Zero request to Google before consent (strictest CNIL reading), at the
 *     cost of measuring only consenting visitors (no modeling).
 */
const CONSENT_MODE =
  process.env.NEXT_PUBLIC_GA_CONSENT_MODE === 'basic' ? 'basic' : 'advanced';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function GoogleAnalytics() {
  // Only used to gate script rendering in basic mode.
  const [granted, setGranted] = useState(false);

  useEffect(() => {
    if (!TAG_ID) return;

    const apply = () => {
      const valid = hasValidConsent();
      const isGranted = valid && getConsent()?.analytics === true;
      // Publicité (Google Ads) : suit le consentement « marketing », jamais
      // celui de la mesure d'audience. Avant ce correctif, les trois signaux
      // publicitaires restaient refusés même après un accord marketing.
      const adsGranted = valid && getConsent()?.marketing === true;
      setGranted(isGranted || adsGranted);

      if (CONSENT_MODE === 'advanced') {
        // gtag.js is already loaded; reflect runtime consent changes.
        const ad = adsGranted ? 'granted' : 'denied';
        window.gtag?.('consent', 'update', {
          analytics_storage: isGranted ? 'granted' : 'denied',
          ad_storage: ad,
          ad_user_data: ad,
          ad_personalization: ad,
        });
      }
      if (!isGranted) clearAnalyticsCookies();
    };

    apply();
    window.addEventListener(CONSENT_CHANGED_EVENT, apply);
    return () => window.removeEventListener(CONSENT_CHANGED_EVENT, apply);
  }, []);

  if (!TAG_ID) return null;

  // Basic mode: nothing reaches Google until the visitor grants consent.
  if (CONSENT_MODE === 'basic' && !granted) return null;

  return (
    <>
      {/*
        Consent defaults + gtag bootstrap. Declared before the gtag.js <Script>
        so it runs first and the `consent: default` is queued in dataLayer
        before the library processes it. afterInteractive is required here
        because beforeInteractive is only supported in the root layout.

        The initial analytics_storage is derived synchronously from the stored
        consent (same key/version/max-age as lib/cookies.ts) so a returning
        visitor's grant is honored on the very first ping, with no dependency on
        when the React effect or gtag.js run.
      */}
      <Script id="ga-consent-default" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          var granted = false;
          var adsGranted = false;
          try {
            var raw = localStorage.getItem('${CONSENT_STORAGE_KEY}');
            if (raw) {
              var c = JSON.parse(raw);
              if (c && c.version === '${CONSENT_VERSION}' &&
                  (Date.now() - new Date(c.timestamp).getTime()) < ${CONSENT_MAX_AGE_MS}) {
                granted = c.analytics === true;
                adsGranted = c.marketing === true;
              }
            }
          } catch (e) {}
          var ad = adsGranted ? 'granted' : 'denied';
          gtag('consent', 'default', {
            ad_storage: ad,
            ad_user_data: ad,
            ad_personalization: ad,
            analytics_storage: granted ? 'granted' : 'denied',
            wait_for_update: 500
          });
          gtag('js', new Date());
          ${GA_ID ? `gtag('config', '${GA_ID}');` : ''}
          ${ADS_ID ? `gtag('config', '${ADS_ID}');` : ''}
        `}
      </Script>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${TAG_ID}`}
        strategy="afterInteractive"
      />
    </>
  );
}
