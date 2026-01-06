'use client';

import { useTranslations } from 'next-intl';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Check, HeadphonesIcon, Settings, ShieldCheck } from 'lucide-react';
import { Container, ButtonLink, Badge } from '@/components/ui';
import { cn } from '@/lib/utils';
import { fadeInUp, staggerContainer, staggerItem, cardHover, defaultViewport } from '@/lib/animations';

const plans = [
  {
    key: 'discovery',
    price: '0',
    popular: false,
  },
  {
    key: 'communication',
    price: '69',
    popular: false,
  },
  {
    key: 'conversion',
    price: '149',
    popular: true,
  },
  {
    key: 'marketing',
    price: '199',
    popular: false,
  },
];

const includedFeatures = [
  { icon: HeadphonesIcon, key: 'support' },
  { icon: Settings, key: 'setup' },
  { icon: ShieldCheck, key: 'rgpd' },
];

export function PricingPreview() {
  const t = useTranslations('pricingPreview');
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="pricing" className="bg-brand-light/30 py-16 md:py-24">
      <Container>
        {/* Header */}
        <motion.div
          initial={prefersReducedMotion ? 'visible' : 'hidden'}
          whileInView="visible"
          variants={fadeInUp}
          viewport={defaultViewport}
          className="text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-brand-dark md:text-4xl lg:text-[2.75rem]">
            {t('title')}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-600">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Pricing Cards with stagger */}
        <motion.div
          initial={prefersReducedMotion ? 'visible' : 'hidden'}
          whileInView="visible"
          variants={staggerContainer}
          viewport={defaultViewport}
          className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {plans.map((plan) => (
            <motion.div
              key={plan.key}
              variants={staggerItem}
              whileHover={!prefersReducedMotion ? { scale: 1.02, y: -5 } : {}}
              className={cn(
                'relative rounded-2xl p-6 transition-shadow',
                plan.popular
                  ? 'bg-brand-dark text-white shadow-xl hover:shadow-2xl'
                  : 'border border-zinc-100 bg-white shadow-sm hover:shadow-xl hover:border-brand-primary/20'
              )}
            >
              {/* Popular Badge with pulse animation */}
              {plan.popular && (
                <motion.div
                  className="absolute -top-3 left-1/2 -translate-x-1/2"
                  animate={!prefersReducedMotion ? {
                    scale: [1, 1.05, 1],
                  } : {}}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <Badge variant="primary" className="whitespace-nowrap bg-brand-primary text-white shadow-lg">
                    {t('popular')}
                  </Badge>
                </motion.div>
              )}

              {/* Plan Name */}
              <h3 className={cn(
                'text-lg font-bold',
                plan.popular ? 'text-white' : 'text-brand-dark'
              )}>
                {t(`plans.${plan.key}.name`)}
              </h3>

              {/* Price */}
              <div className="mt-3 flex items-baseline gap-1">
                <span className={cn(
                  'text-4xl font-bold',
                  plan.popular ? 'text-white' : 'text-brand-dark'
                )}>
                  {plan.price}€
                </span>
                <span className={cn(
                  'text-sm',
                  plan.popular ? 'text-white/70' : 'text-zinc-500'
                )}>
                  /{t('perMonth')}
                </span>
              </div>

              {/* Description */}
              <p className={cn(
                'mt-2 text-sm',
                plan.popular ? 'text-white/80' : 'text-zinc-600'
              )}>
                {t(`plans.${plan.key}.description`)}
              </p>

              {/* Features */}
              <p className={cn(
                'mt-4 text-xs',
                plan.popular ? 'text-white/70' : 'text-zinc-500'
              )}>
                {t(`plans.${plan.key}.features`)}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={prefersReducedMotion ? 'visible' : 'hidden'}
          whileInView="visible"
          variants={fadeInUp}
          viewport={defaultViewport}
          className="mt-10 text-center"
        >
          <ButtonLink
            href="/tarifs"
            variant="primary"
            size="lg"
            className="group gap-2"
          >
            {t('cta')}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </ButtonLink>
        </motion.div>

        {/* Included in all plans */}
        <motion.div
          initial={prefersReducedMotion ? 'visible' : 'hidden'}
          whileInView="visible"
          variants={staggerContainer}
          viewport={defaultViewport}
          className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-zinc-600"
        >
          <span className="font-medium">{t('included')}</span>
          {includedFeatures.map((feature) => (
            <motion.div
              key={feature.key}
              variants={staggerItem}
              className="flex items-center gap-2"
            >
              <feature.icon className="h-4 w-4 text-brand-primary" />
              <span>{t(`includedFeatures.${feature.key}`)}</span>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
