'use client';

import { useTranslations } from 'next-intl';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ArrowDown, MessageCircle, MessageSquare, Hotel, Lock, Printer, CreditCard, Star, Zap, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import { Container, ButtonLink, Badge } from '@/components/ui';
import { cn } from '@/lib/utils';
import { fadeInUp, staggerContainer, staggerItem, defaultViewport } from '@/lib/animations';

interface Integration {
  key: string;
  logo: string;
}

interface Category {
  key: string;
  iconBg: string;
  borderColor: string;
  icon: React.ComponentType<{ className?: string }>;
  integrations: Integration[];
}

const integrationCategories: Category[] = [
  {
    key: 'pms',
    borderColor: 'group-hover:border-blue-200',
    iconBg: 'bg-blue-100 text-blue-600',
    icon: Hotel,
    integrations: [
      { key: 'thais', logo: '/images/integrations/thais.svg' },
      { key: 'misterbooking', logo: '/images/integrations/misterbooking.png' },
      { key: 'medialog', logo: '/images/integrations/medialog.svg' },
      { key: 'opera', logo: '/images/integrations/opera.png' },
      { key: 'mews', logo: '/images/integrations/mews.svg' },
      { key: 'asterio', logo: '/images/integrations/asterio.png' },
      { key: 'leanpms', logo: '/images/integrations/leanpms.webp' },
      { key: 'chloe', logo: '/images/integrations/chloe.webp' },
      { key: 'vega', logo: '/images/integrations/vega.png' },
      { key: 'apaleo', logo: '/images/integrations/apaleo.png' },
      { key: 'zeswitch', logo: '/images/integrations/zeswitch.png' },
      { key: 'protel', logo: '/images/integrations/protel.svg' },
      { key: 'clockpms', logo: '/images/integrations/clockpms.svg' },
    ],
  },
  {
    key: 'hardware',
    borderColor: 'group-hover:border-amber-200',
    iconBg: 'bg-amber-100 text-amber-600',
    icon: Lock,
    integrations: [
      { key: 'sesame', logo: '/images/integrations/sesame.png' },
      { key: 'igloohome', logo: '/images/integrations/igloohome.svg' },
      { key: 'salto', logo: '/images/integrations/salto.svg' },
      { key: 'printer', logo: '/images/integrations/printer.svg' },
    ],
  },
  {
    key: 'payments',
    borderColor: 'group-hover:border-emerald-200',
    iconBg: 'bg-emerald-100 text-emerald-600',
    icon: CreditCard,
    integrations: [
      { key: 'stripe', logo: '/images/integrations/stripe.svg' },
      { key: 'mollie', logo: '/images/integrations/mollie.svg' },
      { key: 'paypal', logo: '/images/integrations/paypal.svg' },
      { key: 'payzen', logo: '/images/integrations/payzen.png' },
      { key: 'applepay', logo: '/images/integrations/applepay.svg' },
      { key: 'googlepay', logo: '/images/integrations/googlepay.svg' },
    ],
  },
  {
    key: 'reviews',
    borderColor: 'group-hover:border-purple-200',
    iconBg: 'bg-purple-100 text-purple-600',
    icon: Star,
    integrations: [
      { key: 'google', logo: '/images/integrations/google.svg' },
      { key: 'tripadvisor', logo: '/images/integrations/tripadvisor.svg' },
      { key: 'booking', logo: '/images/integrations/booking.svg' },
      { key: 'airbnb', logo: '/images/integrations/airbnb.svg' },
      { key: 'trustpilot', logo: '/images/integrations/trustpilot.svg' },
      { key: 'hotelscom', logo: '/images/integrations/hotelscom.svg' },
    ],
  },
  {
    key: 'messaging',
    borderColor: 'group-hover:border-green-200',
    iconBg: 'bg-green-100 text-green-600',
    icon: MessageSquare,
    integrations: [
      { key: 'whatsapp', logo: '/images/integrations/whatsapp.svg' },
      { key: 'microsoft', logo: '/images/integrations/microsoft.svg' },
      { key: 'twilio', logo: '/images/integrations/twilio.svg' },
      { key: 'google', logo: '/images/integrations/google.svg' },
      { key: 'smtp', logo: '/images/integrations/smtp.svg' },
    ],
  },
  {
    key: 'other',
    borderColor: 'group-hover:border-orange-200',
    iconBg: 'bg-orange-100 text-orange-600',
    icon: Zap,
    integrations: [
      { key: 'zapier', logo: '/images/integrations/zapier.svg' },
      { key: 'make', logo: '/images/integrations/make.svg' },
      { key: 'n8n', logo: '/images/integrations/n8n.svg' },
      { key: 'webhook', logo: '/images/integrations/webhook.svg' },
      { key: 'api', logo: '/images/integrations/api.svg' },
    ],
  },
];

export function IntegrationsContent() {
  const t = useTranslations('integrations');
  const prefersReducedMotion = useReducedMotion();

  const totalIntegrations = integrationCategories.reduce(
    (acc, cat) => acc + cat.integrations.length,
    0
  );

  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-dark via-brand-dark to-brand-primary/80 pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="absolute inset-0 opacity-[0.07]" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }} />
        <Container className="relative">
          <motion.div
            initial={prefersReducedMotion ? 'visible' : 'hidden'}
            animate="visible"
            variants={fadeInUp}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 mb-8">
              <div className="h-2 w-2 rounded-full bg-brand-primary animate-pulse" />
              <span className="text-sm font-medium text-white/90">
                {totalIntegrations}+ {t('hero.count').replace(/\d+\+?\s*/, '')}
              </span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
              {t('hero.title')}
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-white/70">
              {t('hero.subtitle')}
            </p>

            {/* Category pills */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              {integrationCategories.map((category) => {
                const Icon = category.icon;
                return (
                  <a
                    key={category.key}
                    href={`#cat-${category.key}`}
                    className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 px-4 py-2 text-sm text-white/80 hover:bg-white/20 hover:text-white transition-colors"
                  >
                    <Icon className="h-4 w-4" />
                    {t(`categories.${category.key}.title`)}
                    <span className="text-white/40">({category.integrations.length})</span>
                  </a>
                );
              })}
            </div>

            <div className="mt-10">
              <a
                href="#request-integration"
                className="inline-flex items-center gap-2 text-white font-medium hover:text-white transition-colors bg-white/15 backdrop-blur-sm rounded-full px-5 py-2.5 border border-white/20 hover:bg-white/25"
              >
                {t('hero.cta')}
                <ArrowDown className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Integration Categories */}
      {integrationCategories.map((category) => {
        const Icon = category.icon;
        return (
          <section
            key={category.key}
            id={`cat-${category.key}`}
            className="py-16 md:py-20 border-b border-zinc-100 last:border-b-0 scroll-mt-20"
          >
            <Container>
              <motion.div
                initial={prefersReducedMotion ? 'visible' : 'hidden'}
                whileInView="visible"
                variants={fadeInUp}
                viewport={defaultViewport}
                className="mb-10"
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className={cn('flex items-center justify-center w-10 h-10 rounded-xl', category.iconBg)}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-brand-dark">
                      {t(`categories.${category.key}.title`)}
                    </h2>
                  </div>
                  <Badge variant="secondary" className="ml-auto text-xs">
                    {category.integrations.length} {category.integrations.length > 1 ? 'intégrations' : 'intégration'}
                  </Badge>
                </div>
                <p className="text-zinc-500 max-w-2xl ml-14">
                  {t(`categories.${category.key}.description`)}
                </p>
              </motion.div>

              <motion.div
                initial={prefersReducedMotion ? 'visible' : 'hidden'}
                whileInView="visible"
                variants={staggerContainer}
                viewport={defaultViewport}
                className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
              >
                {category.integrations.map((integration) => (
                  <motion.div
                    key={integration.key}
                    variants={staggerItem}
                    whileHover={!prefersReducedMotion ? { y: -4 } : {}}
                    className="group relative"
                  >
                    <div className={cn(
                      'relative rounded-2xl border border-zinc-200/80 bg-white p-1 transition-all duration-200',
                      'hover:shadow-lg hover:shadow-zinc-200/50',
                      category.borderColor
                    )}>
                      {/* Logo container */}
                      <div className="flex items-center justify-center rounded-xl h-24 mb-1 bg-gradient-to-b from-zinc-50/80 to-white">
                        <Image
                          src={integration.logo}
                          alt={t(`categories.${category.key}.integrations.${integration.key}.name`)}
                          width={160}
                          height={48}
                          className="max-h-10 w-auto max-w-[130px] object-contain"
                        />
                      </div>

                      {/* Info */}
                      <div className="px-3 pb-3 pt-1 text-center">
                        <h3 className="font-semibold text-brand-dark text-[13px] truncate">
                          {t(`categories.${category.key}.integrations.${integration.key}.name`)}
                        </h3>
                        <p className="text-[11px] text-zinc-400 mt-0.5 truncate">
                          {t(`categories.${category.key}.integrations.${integration.key}.description`)}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </Container>
          </section>
        );
      })}

      {/* Synapse Label Section */}
      <section className="py-16 md:py-20 border-b border-zinc-100">
        <Container>
          <motion.div
            initial={prefersReducedMotion ? 'visible' : 'hidden'}
            whileInView="visible"
            variants={fadeInUp}
            viewport={defaultViewport}
            className="relative overflow-hidden rounded-2xl border border-zinc-200/80 bg-gradient-to-br from-[#1a1f3c] to-[#2d1b69] p-8 md:p-12"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

            <div className="relative flex flex-col md:flex-row items-center gap-8 md:gap-12">
              <div className="flex-shrink-0 bg-white rounded-2xl p-6 shadow-lg">
                <Image
                  src="/images/integrations/synapse.svg"
                  alt="Label Synapse"
                  width={180}
                  height={60}
                  className="h-12 w-auto object-contain"
                />
              </div>
              <div className="text-center md:text-left">
                <h2 className="text-xl font-bold text-white md:text-2xl">
                  {t('synapse.title')}
                </h2>
                <p className="mt-3 text-white/70 leading-relaxed max-w-xl">
                  {t('synapse.description')}
                </p>
                <a
                  href="https://synapse-hotel.fr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-5 text-sm font-medium text-white/90 hover:text-white transition-colors"
                >
                  {t('synapse.link')}
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Request Integration Section */}
      <section id="request-integration" className="py-20 md:py-28 bg-gradient-to-b from-zinc-50 to-white scroll-mt-20">
        <Container>
          <motion.div
            initial={prefersReducedMotion ? 'visible' : 'hidden'}
            whileInView="visible"
            variants={fadeInUp}
            viewport={defaultViewport}
            className="max-w-xl mx-auto text-center"
          >
            <div className="w-16 h-16 bg-brand-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <MessageCircle className="h-8 w-8 text-brand-primary" />
            </div>
            <h2 className="text-2xl font-bold text-brand-dark md:text-3xl">
              {t('request.title')}
            </h2>
            <p className="mt-4 text-zinc-500 leading-relaxed">
              {t('request.description')}
            </p>
            <div className="mt-8">
              <ButtonLink
                href="https://app.lemcal.com/@trigger-flow/demo"
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                size="lg"
                className="gap-2"
              >
                {t('request.cta')}
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <Container>
          <motion.div
            initial={prefersReducedMotion ? 'visible' : 'hidden'}
            whileInView="visible"
            variants={fadeInUp}
            viewport={defaultViewport}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-dark to-brand-dark/90 p-10 md:p-16 text-center"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand-primary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

            <div className="relative">
              <h2 className="text-2xl font-bold text-white md:text-3xl">
                {t('cta.title')}
              </h2>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <ButtonLink
                  href="https://app.lemcal.com/@trigger-flow/demo"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="primary"
                  size="lg"
                  className="gap-2"
                >
                  {t('cta.demo')}
                  <ArrowRight className="h-4 w-4" />
                </ButtonLink>
                <ButtonLink
                  href="/tarifs"
                  variant="secondary"
                  size="lg"
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  {t('cta.pricing')}
                </ButtonLink>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>
    </main>
  );
}
