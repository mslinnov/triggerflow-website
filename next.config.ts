import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains',
  },
];

const nextConfig: NextConfig = {
  images: {
    minimumCacheTTL: 0,
  },
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      };
    }
    return config;
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
  async redirects() {
    return [
      // ── Slugs légaux : anciens chemins WP → slugs réels (FR sur les 2 locales) ──
      {
        source: '/en/privacy-policy',
        destination: '/en/politique-confidentialite',
        permanent: true,
      },
      {
        source: '/fr/condition-generale-dutilisation',
        destination: '/fr/cgu',
        permanent: true,
      },

      // ── Vestige locale en-us (inexistante) — spécifique AVANT le général ──
      {
        source: '/en-us/mentions-legales',
        destination: '/en/mentions-legales',
        permanent: true,
      },
      {
        source: '/en-us',
        destination: '/en',
        permanent: true,
      },

      // ── Articles de blog : slug FR servi sous /en (404) → version réelle ──
      {
        source: '/en/blog/experience-client/crm-hotelier-guide',
        destination: '/fr/blog/experience-client/crm-hotelier-guide',
        permanent: true,
      },
      {
        source: '/en/blog/automatisation/marketing-automation-hotelier-guide',
        destination: '/fr/blog/automatisation/marketing-automation-hotelier-guide',
        permanent: true,
      },
      // Règle 7 : la version EN existe (smart-locks) → on garde le visiteur en anglais
      {
        source: '/en/blog/tech-integrations/serrures-connectees-hotel-guide',
        destination: '/en/blog/tech-integrations/smart-locks-hotel-guide',
        permanent: true,
      },
    ];
  },
};

if (process.env.NODE_ENV === 'development') {
  initOpenNextCloudflareForDev();
}

export default withNextIntl(nextConfig);
