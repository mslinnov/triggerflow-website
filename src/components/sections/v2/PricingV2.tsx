'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Shield, Headphones, Settings } from 'lucide-react';
import { Container, ButtonLink } from '@/components/ui';

const plans = [
  {
    key: 'discovery',
    price: '0',
    gradient: 'from-zinc-100 to-zinc-50',
    borderColor: 'border-zinc-200',
    popular: false,
  },
  {
    key: 'communication',
    price: '49',
    gradient: 'from-blue-50 to-cyan-50',
    borderColor: 'border-blue-200',
    popular: false,
  },
  {
    key: 'conversion',
    price: '99',
    gradient: 'from-brand-primary to-emerald-600',
    borderColor: 'border-brand-primary',
    popular: true,
    dark: true,
  },
  {
    key: 'allInclusive',
    price: '249',
    gradient: 'from-purple-50 to-violet-50',
    borderColor: 'border-purple-200',
    popular: false,
  },
];

const includedFeatures = [
  { icon: Headphones, key: 'support' },
  { icon: Settings, key: 'setup' },
  { icon: Shield, key: 'rgpd' },
];

export function PricingV2() {
  const t = useTranslations('pricingPreview');

  return (
    <section id="pricing" className="relative overflow-hidden bg-zinc-50 py-24 md:py-32">
      {/* Background pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgb(0 0 0 / 0.03) 1px, transparent 0)`,
          backgroundSize: '32px 32px',
        }}
      />

      {/* Decorative blobs */}
      <div className="absolute -left-32 top-1/3 h-64 w-64 rounded-full bg-brand-primary/5 blur-3xl" />
      <div className="absolute -right-32 bottom-1/3 h-64 w-64 rounded-full bg-brand-accent/5 blur-3xl" />

      <Container className="relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="font-serif text-4xl font-bold tracking-tight text-brand-dark md:text-5xl lg:text-6xl">
            {t('title')}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-600">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.key}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className={`relative overflow-hidden rounded-3xl border-2 ${plan.borderColor} ${
                plan.popular
                  ? `bg-gradient-to-br ${plan.gradient} text-white shadow-2xl shadow-brand-primary/30`
                  : `bg-gradient-to-br ${plan.gradient}`
              } p-6 transition-shadow hover:shadow-xl`}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -right-8 top-6 rotate-45 bg-brand-accent px-10 py-1 text-xs font-bold uppercase tracking-wider text-brand-dark">
                  {t('popular')}
                </div>
              )}

              {/* Plan name */}
              <div className="mb-4">
                <h3 className={`text-xl font-bold ${plan.dark ? 'text-white' : 'text-brand-dark'}`}>
                  {t(`plans.${plan.key}.name`)}
                </h3>
                <p className={`mt-1 text-sm ${plan.dark ? 'text-white/70' : 'text-zinc-500'}`}>
                  {t(`plans.${plan.key}.description`)}
                </p>
              </div>

              {/* Price */}
              <div className="mb-6">
                <span className={`text-5xl font-bold ${plan.dark ? 'text-white' : 'text-brand-dark'}`}>
                  {plan.price}€
                </span>
                <span className={`text-sm ${plan.dark ? 'text-white/70' : 'text-zinc-500'}`}>
                  /{t('perMonth')}
                </span>
              </div>

              {/* Features summary */}
              <p className={`mb-6 text-sm ${plan.dark ? 'text-white/80' : 'text-zinc-600'}`}>
                {t(`plans.${plan.key}.features`)}
              </p>

              {/* CTA Button */}
              <ButtonLink
                href="https://app.lemcal.com/@trigger-flow/demo"
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full justify-center rounded-xl py-3 font-medium transition-all ${
                  plan.popular
                    ? 'bg-white text-brand-dark hover:bg-white/90'
                    : 'bg-brand-dark text-white hover:bg-brand-dark/90'
                }`}
              >
                {plan.price === '0' ? 'Commencer gratuitement' : 'Essai gratuit'}
              </ButtonLink>

              {/* Decorative element */}
              {plan.popular && (
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -bottom-12 -right-12 h-32 w-32 rounded-full bg-white/20 blur-2xl"
                />
              )}
            </motion.div>
          ))}
        </div>

        {/* Included features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12"
        >
          <p className="mb-4 text-center text-sm font-medium text-zinc-500">
            {t('included')}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {includedFeatures.map((feature) => (
              <div key={feature.key} className="flex items-center gap-2 text-sm text-zinc-600">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-primary/10">
                  <feature.icon className="h-4 w-4 text-brand-primary" />
                </div>
                {t(`includedFeatures.${feature.key}`)}
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA to full pricing page */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7 }}
          className="mt-12 text-center"
        >
          <a
            href="/tarifs"
            className="group inline-flex items-center gap-2 font-medium text-brand-primary transition-colors hover:text-brand-dark"
          >
            <Sparkles className="h-4 w-4" />
            {t('cta')}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </motion.div>
      </Container>
    </section>
  );
}
