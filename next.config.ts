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
    // Un jour : à 0, chaque visite faisait recompresser les images (pages
    // d'atterrissage payantes plus lentes). Une image remplacée sous le même
    // nom met au plus un jour à se rafraîchir.
    minimumCacheTTL: 86400,
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
      // Aperçu des modèles MJML du calendrier marketing : encadré par la page du
      // site (iframe sandbox), d'où SAMEORIGIN au lieu de DENY. Déclaré APRÈS la
      // règle générale : à clé égale, la dernière l'emporte.
      {
        source: '/api/calendrier/modele/:code/apercu',
        headers: [{ key: 'X-Frame-Options', value: 'SAMEORIGIN' }],
      },
    ];
  },
  async redirects() {
    return [
      // ── Landings produit de la refonte : anciennes URL → nouvelles (docs/arborescence.md) ──
      { source: '/:locale(fr|en)/produit/ventes-additionnelles', destination: '/:locale/produit/upsell', permanent: true },
      { source: '/:locale(fr|en)/produit/automatisations', destination: '/:locale/produit/flows', permanent: true },
      { source: '/:locale(fr|en)/produit/paiements', destination: '/:locale/produit/pay', permanent: true },
      { source: '/:locale(fr|en)/produit/hub-messagerie', destination: '/:locale/produit/inbox', permanent: true },
      { source: '/:locale(fr|en)/produit/avis', destination: '/:locale/produit/reviews', permanent: true },
      { source: '/:locale(fr|en)/produit/formulaires', destination: '/:locale/produit/forms', permanent: true },
      { source: '/:locale(fr|en)/produit/fidelite', destination: '/:locale/produit/loyalty', permanent: true },
      { source: '/:locale(fr|en)/produit/newsletter', destination: '/:locale/produit/campaigns', permanent: true },
      { source: '/:locale(fr|en)/produit/email', destination: '/:locale/produit/campaigns', permanent: true },
      { source: '/:locale(fr|en)/produit/sms', destination: '/:locale/produit/inbox', permanent: true },
      { source: '/:locale(fr|en)/produit/whatsapp', destination: '/:locale/produit/inbox', permanent: true },
      { source: '/:locale(fr|en)/solutions/augmenter-avis', destination: '/:locale/produit/reviews', permanent: true },
      { source: '/:locale(fr|en)/solutions/fideliser-clients', destination: '/:locale/produit/loyalty', permanent: true },
      { source: '/:locale(fr|en)/solutions/booster-upsell', destination: '/:locale/produit/upsell', permanent: true },
      { source: '/:locale(fr|en)/solutions/automatiser-communication', destination: '/:locale/produit/flows', permanent: true },

      // ── Ancien brouillon de home /v2 supprimé (07/11/2026) ──
      { source: '/:locale(fr|en)/v2', destination: '/:locale', permanent: true },

      // ── Landing Equip'Hotel 2026 : URL courte + page FR uniquement ──
      {
        source: '/equiphotel',
        destination: '/fr/equiphotel',
        permanent: false,
      },
      {
        source: '/en/equiphotel',
        destination: '/fr/equiphotel',
        permanent: false,
      },

      // ── Calendrier marketing : adresse courte imprimée dans le QR du flyer
      // (evergreen). Ne jamais la supprimer : seule la destination peut changer.
      // La query (UTM du flyer) est conservée par Next.
      {
        source: '/calendrier',
        destination: '/fr/calendrier-marketing',
        permanent: false,
      },
      {
        source: '/:locale(fr|en)/calendrier',
        destination: '/fr/calendrier-marketing',
        permanent: false,
      },
      {
        source: '/en/calendrier-marketing',
        destination: '/fr/calendrier-marketing',
        permanent: false,
      },

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
