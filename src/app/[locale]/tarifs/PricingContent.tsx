'use client';

import { useTranslations } from 'next-intl';
import { motion, useReducedMotion } from 'framer-motion';
import { Check, X, Mail, HelpCircle } from 'lucide-react';
import { Container, ButtonLink, Badge } from '@/components/ui';
import { cn } from '@/lib/utils';
import { fadeInUp, staggerContainer, staggerItem, defaultViewport } from '@/lib/animations';

const plans = [
  {
    key: 'discovery',
    price: '0',
    badge: 'free',
    popular: false,
    ctaVariant: 'secondary' as const,
    ctaKey: 'startFree',
  },
  {
    key: 'communication',
    price: '69',
    badge: null,
    popular: false,
    ctaVariant: 'secondary' as const,
    ctaKey: 'tryFree',
  },
  {
    key: 'conversion',
    price: '149',
    badge: 'popular',
    popular: true,
    ctaVariant: 'primary' as const,
    ctaKey: 'tryFree',
  },
  {
    key: 'marketing',
    price: '199',
    badge: null,
    popular: false,
    ctaVariant: 'secondary' as const,
    ctaKey: 'contactSales',
  },
];

const featureCategories = [
  {
    key: 'communication',
    features: [
      { key: 'emails', values: ['1000/mois', '5000/mois', '15000/mois', 'Illimités'] },
      { key: 'sms', values: [false, '0.06€/SMS', '500 inclus', '1000 inclus'] },
      { key: 'whatsapp', values: [false, true, true, true] },
      { key: 'hub', values: [false, true, true, true] },
    ],
  },
  {
    key: 'automation',
    features: [
      { key: 'workflows', values: ['1', '5', '10', 'Illimités'] },
      { key: 'triggers', values: [true, true, true, true] },
      { key: 'segmentation', values: [false, true, true, true] },
    ],
  },
  {
    key: 'marketing',
    features: [
      { key: 'newsletter', values: [false, false, false, true] },
      { key: 'campaigns', values: [false, false, false, true] },
      { key: 'loyalty', values: [false, false, false, true] },
    ],
  },
  {
    key: 'tools',
    features: [
      { key: 'crm', values: [true, true, true, true] },
      { key: 'forms', values: ['1', '5', 'Illimités', 'Illimités'] },
      { key: 'upsell', values: [false, false, true, true] },
      { key: 'analytics', values: ['Basique', 'Standard', 'Avancé', 'Complet'] },
    ],
  },
  {
    key: 'support',
    features: [
      { key: 'users', values: ['1', '3', '5', 'Illimités'] },
      { key: 'supportType', values: ['Email', 'Prioritaire', 'Prioritaire + Tél.', 'Account Manager'] },
      { key: 'onboarding', values: [false, true, true, true] },
    ],
  },
];

const faqItems = [
  'changePlan',
  'commitment',
  'trial',
  'groupRates',
  'smsIncluded',
];

export function PricingContent() {
  const t = useTranslations('pricing');
  const prefersReducedMotion = useReducedMotion();

  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-brand-light/30 to-white pt-32 pb-16 md:pt-40 md:pb-24">
        <Container>
          <motion.div
            initial={prefersReducedMotion ? 'visible' : 'hidden'}
            animate="visible"
            variants={fadeInUp}
            className="text-center"
          >
            <h1 className="text-3xl font-bold tracking-tight text-brand-dark md:text-4xl lg:text-5xl">
              {t('hero.title')}
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-600">
              {t('hero.subtitle')}
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Plans Section */}
      <section className="py-16 md:py-24">
        <Container>
          <motion.div
            initial={prefersReducedMotion ? 'visible' : 'hidden'}
            whileInView="visible"
            variants={staggerContainer}
            viewport={defaultViewport}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
          >
            {plans.map((plan) => (
              <motion.div
                key={plan.key}
                variants={staggerItem}
                whileHover={!prefersReducedMotion ? { scale: 1.02, y: -5 } : {}}
                className={cn(
                  'relative rounded-2xl p-6 flex flex-col',
                  plan.popular
                    ? 'bg-brand-dark text-white shadow-xl ring-2 ring-brand-primary lg:scale-105'
                    : 'border border-zinc-200 bg-white shadow-sm hover:shadow-lg'
                )}
              >
                {/* Badge */}
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge
                      variant={plan.popular ? 'primary' : 'secondary'}
                      className={cn(
                        'whitespace-nowrap shadow-lg',
                        plan.popular && 'bg-brand-primary text-white'
                      )}
                    >
                      {t(`plans.${plan.key}.badge`)}
                    </Badge>
                  </div>
                )}

                {/* Plan Name */}
                <h3 className={cn(
                  'text-xl font-bold',
                  plan.popular ? 'text-white' : 'text-brand-dark'
                )}>
                  {t(`plans.${plan.key}.name`)}
                </h3>

                {/* Price */}
                <div className="mt-4 flex items-baseline gap-1">
                  <span className={cn(
                    'text-5xl font-bold',
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

                {/* Features List */}
                <ul className="mt-6 space-y-3 flex-1">
                  {(t.raw(`plans.${plan.key}.features`) as string[]).map((feature: string, i: number) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className={cn(
                        'h-5 w-5 shrink-0',
                        plan.popular ? 'text-brand-primary' : 'text-brand-primary'
                      )} />
                      <span className={cn(
                        'text-sm',
                        plan.popular ? 'text-white/90' : 'text-zinc-700'
                      )}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <div className="mt-8">
                  <ButtonLink
                    href={plan.key === 'marketing' ? 'mailto:contact@trigger-flow.com' : 'https://app.lemcal.com/@trigger-flow/demo'}
                    variant={plan.ctaVariant}
                    className={cn(
                      'w-full justify-center',
                      !plan.popular && 'border-zinc-300 hover:border-brand-primary'
                    )}
                  >
                    {t(`cta.${plan.ctaKey}`)}
                  </ButtonLink>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* Comparison Table */}
      <section className="bg-zinc-50 py-16 md:py-24">
        <Container>
          <motion.div
            initial={prefersReducedMotion ? 'visible' : 'hidden'}
            whileInView="visible"
            variants={fadeInUp}
            viewport={defaultViewport}
            className="text-center mb-12"
          >
            <h2 className="text-2xl font-bold text-brand-dark md:text-3xl">
              {t('comparison.title')}
            </h2>
            <p className="mt-2 text-zinc-600">
              {t('comparison.subtitle')}
            </p>
          </motion.div>

          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={defaultViewport}
            className="overflow-x-auto"
          >
            <table className="w-full min-w-[800px] border-collapse bg-white rounded-xl overflow-hidden shadow-sm">
              <thead>
                <tr className="border-b border-zinc-200">
                  <th className="py-4 px-4 text-left text-sm font-semibold text-zinc-500">
                    {t('comparison.feature')}
                  </th>
                  {plans.map((plan) => (
                    <th
                      key={plan.key}
                      className={cn(
                        'py-4 px-4 text-center text-sm font-semibold',
                        plan.popular ? 'text-brand-primary bg-brand-primary/5' : 'text-brand-dark'
                      )}
                    >
                      {t(`plans.${plan.key}.name`)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {featureCategories.map((category, catIndex) => (
                  <>
                    <tr key={`cat-${category.key}`} className="bg-zinc-100">
                      <td colSpan={5} className="py-3 px-4 text-sm font-semibold text-brand-dark">
                        {t(`comparison.categories.${category.key}`)}
                      </td>
                    </tr>
                    {category.features.map((feature, featureIndex) => (
                      <tr key={`${category.key}-${feature.key}`} className="border-b border-zinc-100">
                        <td className="py-3 px-4 text-sm text-zinc-700">
                          {t(`comparison.features.${feature.key}`)}
                        </td>
                        {feature.values.map((value, i) => (
                          <td key={i} className={cn(
                            'py-3 px-4 text-center',
                            plans[i]?.popular && 'bg-brand-primary/5'
                          )}>
                            {typeof value === 'boolean' ? (
                              value ? (
                                <Check className="h-5 w-5 text-brand-primary mx-auto" />
                              ) : (
                                <X className="h-5 w-5 text-zinc-300 mx-auto" />
                              )
                            ) : (
                              <span className="text-sm text-zinc-700">{value}</span>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </>
                ))}
              </tbody>
            </table>
          </motion.div>
        </Container>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24">
        <Container>
          <motion.div
            initial={prefersReducedMotion ? 'visible' : 'hidden'}
            whileInView="visible"
            variants={fadeInUp}
            viewport={defaultViewport}
            className="text-center mb-12"
          >
            <h2 className="text-2xl font-bold text-brand-dark md:text-3xl">
              {t('faq.title')}
            </h2>
          </motion.div>

          <motion.div
            initial={prefersReducedMotion ? 'visible' : 'hidden'}
            whileInView="visible"
            variants={staggerContainer}
            viewport={defaultViewport}
            className="mx-auto max-w-3xl space-y-4"
          >
            {faqItems.map((item) => (
              <motion.div
                key={item}
                variants={staggerItem}
                className="rounded-xl border border-zinc-200 bg-white p-6"
              >
                <div className="flex items-start gap-3">
                  <HelpCircle className="h-5 w-5 text-brand-primary shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-brand-dark">
                      {t(`faq.items.${item}.question`)}
                    </h3>
                    <p className="mt-2 text-sm text-zinc-600">
                      {t(`faq.items.${item}.answer`)}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* CTA Groups Section */}
      <section className="py-16 md:py-24">
        <Container>
          <motion.div
            initial={prefersReducedMotion ? 'visible' : 'hidden'}
            whileInView="visible"
            variants={fadeInUp}
            viewport={defaultViewport}
            className="rounded-3xl bg-brand-primary/10 p-8 md:p-12 text-center"
          >
            <h2 className="text-2xl font-bold text-brand-dark md:text-3xl">
              {t('groups.title')}
            </h2>
            <p className="mt-4 text-zinc-600 max-w-xl mx-auto">
              {t('groups.description')}
            </p>
            <div className="mt-8">
              <ButtonLink
                href="mailto:contact@trigger-flow.com"
                variant="primary"
                size="lg"
                className="gap-2"
              >
                <Mail className="h-4 w-4" />
                {t('groups.cta')}
              </ButtonLink>
            </div>
          </motion.div>
        </Container>
      </section>
    </main>
  );
}
