'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';
import {
  CONSENT_CHANGED_EVENT,
  hasValidConsent,
  getConsent,
  clearMarketingCookies,
} from '@/lib/cookies';

/**
 * Advertising pixels (Meta, TikTok, LinkedIn, Microsoft/Bing, Google Ads).
 *
 * Each pixel reads its id from a build-time NEXT_PUBLIC_* env var and stays
 * DORMANT (renders nothing, loads no script) while its id is unset — so the
 * whole layer ships now and lights up id-by-id as ad accounts are created.
 *
 * Unlike GA4 (which can run in cookieless "advanced" Consent Mode before
 * consent), advertising pixels rely on cookies and are NEVER loaded until the
 * visitor grants the `marketing` consent category. Revoking it stops rendering
 * them and best-effort clears their first-party cookies.
 */

const META_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;
const TIKTOK_ID = process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID;
const LINKEDIN_ID = process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID;
const MS_UET_ID = process.env.NEXT_PUBLIC_MS_UET_TAG_ID;
const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
const GA_PRESENT = !!process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

function useMarketingConsent(): boolean {
  const [granted, setGranted] = useState(false);

  useEffect(() => {
    const apply = () => {
      const ok = hasValidConsent() && getConsent()?.marketing === true;
      setGranted(ok);
      if (!ok) clearMarketingCookies();
    };
    apply();
    window.addEventListener(CONSENT_CHANGED_EVENT, apply);
    return () => window.removeEventListener(CONSENT_CHANGED_EVENT, apply);
  }, []);

  return granted;
}

export function MarketingPixels() {
  const granted = useMarketingConsent();
  if (!granted) return null;

  return (
    <>
      {META_ID && <MetaPixel id={META_ID} />}
      {TIKTOK_ID && <TikTokPixel id={TIKTOK_ID} />}
      {LINKEDIN_ID && <LinkedInInsight id={LINKEDIN_ID} />}
      {MS_UET_ID && <MicrosoftUet id={MS_UET_ID} />}
      {GOOGLE_ADS_ID && <GoogleAds id={GOOGLE_ADS_ID} />}
    </>
  );
}

/* ── Meta (Facebook/Instagram) Pixel ──────────────────────────────────────── */
function MetaPixel({ id }: { id: string }) {
  return (
    <>
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
          fbq('init', '${id}');
          fbq('track', 'PageView');
        `}
      </Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          alt=""
          src={`https://www.facebook.com/tr?id=${id}&ev=PageView&noscript=1`}
        />
      </noscript>
    </>
  );
}

/* ── TikTok Pixel ─────────────────────────────────────────────────────────── */
function TikTokPixel({ id }: { id: string }) {
  return (
    <Script id="tiktok-pixel" strategy="afterInteractive">
      {`
        !function (w, d, t) {
          w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];
          ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"];
          ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};
          for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);
          ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e};
          ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};var s=document.createElement("script");s.type="text/javascript",s.async=!0,s.src=r+"?sdkid="+e+"&lib="+t;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(s,a)};
          ttq.load('${id}');
          ttq.page();
        }(window, document, 'ttq');
      `}
    </Script>
  );
}

/* ── LinkedIn Insight Tag ─────────────────────────────────────────────────── */
function LinkedInInsight({ id }: { id: string }) {
  return (
    <>
      <Script id="linkedin-insight-init" strategy="afterInteractive">
        {`
          window._linkedin_partner_id = "${id}";
          window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
          window._linkedin_data_partner_ids.push("${id}");
        `}
      </Script>
      <Script id="linkedin-insight" strategy="afterInteractive">
        {`
          (function(l) {
            if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
            window.lintrk.q=[]}
            var s = document.getElementsByTagName("script")[0];
            var b = document.createElement("script");
            b.type = "text/javascript";b.async = true;
            b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
            s.parentNode.insertBefore(b, s);
          })(window.lintrk);
        `}
      </Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          alt=""
          src={`https://px.ads.linkedin.com/collect/?pid=${id}&fmt=gif`}
        />
      </noscript>
    </>
  );
}

/* ── Microsoft / Bing UET ─────────────────────────────────────────────────── */
function MicrosoftUet({ id }: { id: string }) {
  return (
    <Script id="ms-uet" strategy="afterInteractive">
      {`
        (function(w,d,t,r,u){
          var f,n,i;w[u]=w[u]||[],f=function(){var o={ti:"${id}",enableAutoSpaTracking:true};o.q=w[u],w[u]=new UET(o),w[u].push("pageLoad")},
          n=d.createElement(t),n.src=r,n.async=1,n.onload=n.onreadystatechange=function(){var s=this.readyState;s&&s!=="loaded"&&s!=="complete"||(f(),n.onload=n.onreadystatechange=null)},
          i=d.getElementsByTagName(t)[0],i.parentNode.insertBefore(n,i)
        })(window,document,"script","//bat.bing.com/bat.js","uetq");
      `}
    </Script>
  );
}

/* ── Google Ads ───────────────────────────────────────────────────────────── */
function GoogleAds({ id }: { id: string }) {
  // gtag.js and the Consent Mode v2 defaults are bootstrapped by <GoogleAnalytics/>
  // (it loads gtag for everyone in advanced mode); the ad_* signals are flipped to
  // granted there when marketing consent is given. We only register the Ads config.
  // If GA is absent, we load the gtag library ourselves so the Ads tag still fires.
  return (
    <>
      {!GA_PRESENT && (
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
          strategy="afterInteractive"
        />
      )}
      <Script id="google-ads-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          window.gtag = window.gtag || function(){dataLayer.push(arguments);};
          ${GA_PRESENT ? '' : "gtag('js', new Date());"}
          gtag('config', '${id}');
        `}
      </Script>
    </>
  );
}
