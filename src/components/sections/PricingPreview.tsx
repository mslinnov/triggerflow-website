'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowRight, Check, HeadphonesIcon, Settings, ShieldCheck } from 'lucide-react';
import { Container, ButtonLink, Badge } from '@/components/ui';
import { cn } from '@/lib/utils';

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

  return (
    <section id="pricing" className="bg-brand-light/30 py-16 md:py-24">
      <Container>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-brand-dark md:text-4xl lg:text-[2.75rem]">
            {t('title')}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-600">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                'relative rounded-2xl p-6 transition-all duration-300',
                plan.popular
                  ? 'bg-brand-dark text-white shadow-xl'
                  : 'border border-zinc-100 bg-white shadow-sm hover:shadow-lg'
              )}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge variant="primary" className="whitespace-nowrap bg-brand-primary text-white shadow-lg">
                    {t('popular')}
                  </Badge>
                </div>
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
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-10 text-center"
        >
          <ButtonLink
            href="#"
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
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-zinc-600"
        >
          <span className="font-medium">{t('included')}</span>
          {includedFeatures.map((feature) => (
            <div key={feature.key} className="flex items-center gap-2">
              <feature.icon className="h-4 w-4 text-brand-primary" />
              <span>{t(`includedFeatures.${feature.key}`)}</span>
            </div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
