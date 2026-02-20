'use client';

import { useState, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import {
  Check, X, Mail, ChevronDown, Star, Heart, Smartphone, Bot,
  ArrowRight, Sparkles, MessageSquare, Workflow, BarChart3,
  ShoppingBag, ChevronLeft, ChevronRight, HelpCircle,
} from 'lucide-react';
import { Container, ButtonLink, Badge } from '@/components/ui';
import { cn } from '@/lib/utils';
import { fadeInUp, staggerContainer, staggerItem, defaultViewport } from '@/lib/animations';

/* ─── Data ──────────────────────────────────────────────────── */

const plans = [
  { key: 'discovery', price: '0', popular: false },
  { key: 'communication', price: '69', popular: false },
  { key: 'conversion', price: '149', popular: true },
  { key: 'marketing', price: '199', popular: false },
];

const featureGroups = [
  {
    key: 'communication',
    icon: MessageSquare,
    features: [
      { key: 'emails', values: ['1 000', '5 000', '15 000', '50 000'] },
      { key: 'sms', values: [true, true, true, true] },
      { key: 'whatsapp', values: [false, true, true, true] },
      { key: 'hub', values: [false, true, true, true] },
    ],
  },
  {
    key: 'automation',
    icon: Workflow,
    features: [
      { key: 'segments', values: ['5', '10', '45', 'illimités'] },
      { key: 'flows', values: ['1', '5', '10', 'illimités'] },
      { key: 'conditions', values: [false, false, true, true] },
    ],
  },
  {
    key: 'marketing',
    icon: ShoppingBag,
    features: [
      { key: 'marketing', values: [false, false, true, true] },
      { key: 'forms', values: [false, false, '5', 'illimités'] },
      { key: 'salesCatalog', values: [false, false, true, true] },
    ],
  },
  {
    key: 'tools',
    icon: BarChart3,
    features: [
      { key: 'stats', values: [true, true, true, true] },
      { key: 'groupPortal', values: [false, false, true, true] },
    ],
  },
];

const addons = [
  {
    key: 'reviews',
    icon: Star,
    price: '19',
    color: 'amber' as const,
  },
  {
    key: 'aiAgent',
    icon: Bot,
    price: '19',
    color: 'violet' as const,
  },
  {
    key: 'loyalty',
    icon: Heart,
    price: '39',
    color: 'rose' as const,
  },
  {
    key: 'guestApp',
    icon: Smartphone,
    price: '49',
    color: 'sky' as const,
  },
];

const addonColors = {
  amber: {
    bg: 'bg-amber-50',
    icon: 'text-amber-500',
    border: 'border-amber-200',
    hoverBorder: 'hover:border-amber-300',
    badge: 'bg-amber-100 text-amber-700',
    check: 'text-amber-500',
    checkBg: 'bg-amber-50',
  },
  rose: {
    bg: 'bg-rose-50',
    icon: 'text-rose-500',
    border: 'border-rose-200',
    hoverBorder: 'hover:border-rose-300',
    badge: 'bg-rose-100 text-rose-700',
    check: 'text-rose-500',
    checkBg: 'bg-rose-50',
  },
  sky: {
    bg: 'bg-sky-50',
    icon: 'text-sky-500',
    border: 'border-sky-200',
    hoverBorder: 'hover:border-sky-300',
    badge: 'bg-sky-100 text-sky-700',
    check: 'text-sky-500',
    checkBg: 'bg-sky-50',
  },
  violet: {
    bg: 'bg-violet-50',
    icon: 'text-violet-500',
    border: 'border-violet-200',
    hoverBorder: 'hover:border-violet-300',
    badge: 'bg-violet-100 text-violet-700',
    check: 'text-violet-500',
    checkBg: 'bg-violet-50',
  },
};

const faqItems = ['changePlan', 'commitment', 'trial', 'groupRates', 'smsIncluded'];

/* ─── Mobile Plan Selector ─────────────────────────────────── */

function MobilePlanSelector({
  plans: plansList,
  activePlan,
  onSelect,
  t,
}: {
  plans: typeof plans;
  activePlan: number;
  onSelect: (idx: number) => void;
  t: ReturnType<typeof useTranslations>;
}) {
  return (
    <div className="flex gap-1 p-1 bg-white/10 rounded-xl md:hidden">
      {plansList.map((plan, idx) => (
        <button
          key={plan.key}
          onClick={() => onSelect(idx)}
          className={cn(
            'flex-1 py-2 px-1 rounded-lg text-xs font-semibold transition-all duration-200',
            activePlan === idx
              ? 'bg-white text-brand-dark shadow-sm'
              : 'text-white/60 hover:text-white/80'
          )}
        >
          {t(`plans.${plan.key}.name`)}
        </button>
      ))}
    </div>
  );
}

/* ─── Component ─────────────────────────────────────────────── */

export function PricingV2Content() {
  const t = useTranslations('pricing');
  const prefersReducedMotion = useReducedMotion();
  const [activeMobilePlan, setActiveMobilePlan] = useState(2); // Default to "Conversion" (popular)
  const tableScrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Track horizontal scroll state for mobile table hints
  useEffect(() => {
    const el = tableScrollRef.current;
    if (!el) return;
    const checkScroll = () => {
      setCanScrollLeft(el.scrollLeft > 4);
      setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
    };
    checkScroll();
    el.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll);
    return () => {
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, []);

  return (
    <main className="bg-white">
      {/* ─── Hero ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-28">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark via-brand-dark/98 to-brand-dark/90" />
        {/* Decorative circles */}
        <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-brand-primary/10 blur-3xl" />
        <div className="absolute bottom-10 right-10 h-96 w-96 rounded-full bg-brand-primary/5 blur-3xl" />

        <Container className="relative">
          <motion.div
            initial={prefersReducedMotion ? 'visible' : 'hidden'}
            animate="visible"
            variants={fadeInUp}
            className="text-center"
          >
            <Badge variant="secondary" className="mb-6 bg-white/10 text-white/80 border-white/10">
              {t('hero.badge')}
            </Badge>
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-[3.5rem] lg:leading-tight">
              {t('hero.title')}
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base text-white/60 leading-relaxed md:text-lg md:mt-5">
              {t('hero.subtitle')}
            </p>
          </motion.div>

          {/* ─── Mobile: Plan selector tabs + single card ──── */}
          <motion.div
            initial={prefersReducedMotion ? 'visible' : 'hidden'}
            animate="visible"
            variants={fadeInUp}
            className="mt-10 md:hidden"
          >
            <MobilePlanSelector
              plans={plans}
              activePlan={activeMobilePlan}
              onSelect={setActiveMobilePlan}
              t={t}
            />
            <div className="mt-4">
              {plans.map((plan, idx) => (
                idx === activeMobilePlan && (
                  <motion.div
                    key={plan.key}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className={cn(
                      'relative rounded-2xl p-6 flex flex-col',
                      plan.popular
                        ? 'bg-white shadow-2xl shadow-black/20 ring-2 ring-brand-primary mt-2'
                        : 'bg-white/[0.08] backdrop-blur-sm border border-white/15'
                    )}
                  >
                    {plan.popular && (
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-primary px-3.5 py-1.5 text-xs font-semibold text-white shadow-lg shadow-brand-primary/30">
                          <Sparkles className="h-3 w-3" />
                          {t(`plans.${plan.key}.badge`)}
                        </span>
                      </div>
                    )}

                    <h3 className={cn(
                      'text-sm font-semibold uppercase tracking-wider',
                      plan.popular ? 'text-brand-primary' : 'text-white/50'
                    )}>
                      {t(`plans.${plan.key}.name`)}
                    </h3>

                    <div className="mt-3 flex items-baseline gap-1">
                      <span className={cn(
                        'text-4xl font-bold tracking-tight',
                        plan.popular ? 'text-brand-dark' : 'text-white'
                      )}>
                        {plan.price}€
                      </span>
                      <span className={cn(
                        'text-sm',
                        plan.popular ? 'text-zinc-400' : 'text-white/40'
                      )}>
                        /{t('perMonth')}
                      </span>
                    </div>

                    <p className={cn(
                      'mt-1.5 text-xs',
                      plan.popular ? 'text-brand-primary/70' : 'text-white/40'
                    )}>
                      {t(`plans.${plan.key}.trial`)}
                    </p>

                    <p className={cn(
                      'mt-4 text-sm leading-relaxed',
                      plan.popular ? 'text-zinc-500' : 'text-white/60'
                    )}>
                      {t(`plans.${plan.key}.description`)}
                    </p>

                    <div className="mt-5">
                      <ButtonLink
                        href="https://app.lemcal.com/@trigger-flow/demo"
                        target="_blank"
                        rel="noopener noreferrer"
                        variant={plan.popular ? 'primary' : 'secondary'}
                        size="sm"
                        className={cn(
                          'w-full justify-center font-semibold',
                          plan.popular
                            ? 'shadow-lg shadow-brand-primary/25'
                            : 'border-white/20 text-white hover:bg-white/10 hover:border-white/30'
                        )}
                      >
                        {t('cta.demo')}
                      </ButtonLink>
                    </div>
                  </motion.div>
                )
              ))}
            </div>
          </motion.div>

          {/* ─── Desktop: Plan Cards grid ──────────────────── */}
          <motion.div
            initial={prefersReducedMotion ? 'visible' : 'hidden'}
            animate="visible"
            variants={staggerContainer}
            className="mt-14 hidden md:grid gap-4 md:grid-cols-2 lg:grid-cols-4"
          >
            {plans.map((plan) => (
              <motion.div
                key={plan.key}
                variants={staggerItem}
                whileHover={!prefersReducedMotion ? { y: -4 } : {}}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className={cn(
                  'relative rounded-2xl p-6 flex flex-col transition-all duration-300',
                  plan.popular
                    ? 'bg-white shadow-2xl shadow-black/20 ring-2 ring-brand-primary lg:scale-[1.03] z-10'
                    : 'bg-white/[0.08] backdrop-blur-sm border border-white/15 hover:bg-white/12'
                )}
              >
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-primary px-3.5 py-1.5 text-xs font-semibold text-white shadow-lg shadow-brand-primary/30">
                      <Sparkles className="h-3 w-3" />
                      {t(`plans.${plan.key}.badge`)}
                    </span>
                  </div>
                )}

                <h3 className={cn(
                  'text-sm font-semibold uppercase tracking-wider',
                  plan.popular ? 'text-brand-primary' : 'text-white/50'
                )}>
                  {t(`plans.${plan.key}.name`)}
                </h3>

                <div className="mt-3 flex items-baseline gap-1">
                  <span className={cn(
                    'text-4xl font-bold tracking-tight',
                    plan.popular ? 'text-brand-dark' : 'text-white'
                  )}>
                    {plan.price}€
                  </span>
                  <span className={cn(
                    'text-sm',
                    plan.popular ? 'text-zinc-400' : 'text-white/40'
                  )}>
                    /{t('perMonth')}
                  </span>
                </div>

                <p className={cn(
                  'mt-1.5 text-xs',
                  plan.popular ? 'text-brand-primary/70' : 'text-white/40'
                )}>
                  {t(`plans.${plan.key}.trial`)}
                </p>

                <p className={cn(
                  'mt-4 text-sm leading-relaxed flex-1',
                  plan.popular ? 'text-zinc-500' : 'text-white/60'
                )}>
                  {t(`plans.${plan.key}.description`)}
                </p>

                <div className="mt-5">
                  <ButtonLink
                    href="https://app.lemcal.com/@trigger-flow/demo"
                    target="_blank"
                    rel="noopener noreferrer"
                    variant={plan.popular ? 'primary' : 'secondary'}
                    size="sm"
                    className={cn(
                      'w-full justify-center font-semibold',
                      plan.popular
                        ? 'shadow-lg shadow-brand-primary/25'
                        : 'border-white/20 text-white hover:bg-white/10 hover:border-white/30'
                    )}
                  >
                    {t('cta.demo')}
                  </ButtonLink>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* ─── Grouped Comparison Table ──────────────────────── */}
      <section className="py-16 md:py-24">
        <Container>
          <motion.div
            initial={prefersReducedMotion ? 'visible' : 'hidden'}
            whileInView="visible"
            variants={fadeInUp}
            viewport={defaultViewport}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-brand-dark md:text-4xl">
              {t('comparison.title')}
            </h2>
            <p className="mt-3 text-zinc-500">
              {t('comparison.subtitle')}
            </p>
          </motion.div>

          {/* Table wrapper with scroll indicators */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={defaultViewport}
            className="relative"
          >
            {/* Scroll hint arrows for mobile */}
            {canScrollLeft && (
              <button
                onClick={() => tableScrollRef.current?.scrollBy({ left: -200, behavior: 'smooth' })}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-30 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-lg border border-zinc-200 md:hidden"
              >
                <ChevronLeft className="h-4 w-4 text-zinc-600" />
              </button>
            )}
            {canScrollRight && (
              <button
                onClick={() => tableScrollRef.current?.scrollBy({ left: 200, behavior: 'smooth' })}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-30 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-lg border border-zinc-200 md:hidden"
              >
                <ChevronRight className="h-4 w-4 text-zinc-600" />
              </button>
            )}

            {/* Fade edges on mobile to hint scroll */}
            <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-white to-transparent z-20 pointer-events-none md:hidden" style={{ opacity: canScrollLeft ? 1 : 0 }} />
            <div className="absolute right-0 top-0 bottom-0 w-4 bg-gradient-to-l from-white to-transparent z-20 pointer-events-none md:hidden" style={{ opacity: canScrollRight ? 1 : 0 }} />

            <div
              ref={tableScrollRef}
              className="overflow-x-auto scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0"
            >
              <div className="min-w-[820px]">
                {/* Sticky plan headers - account for fixed nav height */}
                <div className="sticky top-[72px] z-20 bg-white/95 backdrop-blur-md rounded-t-2xl border border-zinc-200 border-b-0">
                  <div className="grid grid-cols-[240px_repeat(4,1fr)]">
                    <div className="py-4 px-5" />
                    {plans.map((plan) => (
                      <div
                        key={plan.key}
                        className={cn(
                          'relative py-4 px-4 text-center',
                          plan.popular && 'bg-brand-primary/[0.04]'
                        )}
                      >
                        {plan.popular && (
                          <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap inline-flex items-center gap-1 rounded-full bg-brand-primary px-2.5 py-0.5 text-[10px] font-semibold text-white">
                            {t('comparison.popular')}
                          </span>
                        )}
                        <div className={cn(
                          'text-sm font-bold',
                          plan.popular ? 'text-brand-primary' : 'text-brand-dark'
                        )}>
                          {t(`plans.${plan.key}.name`)}
                        </div>
                        <div className={cn(
                          'text-lg font-bold mt-0.5',
                          plan.popular ? 'text-brand-primary' : 'text-brand-dark'
                        )}>
                          {plan.price}€<span className="text-xs font-normal text-zinc-400">/{t('perMonth')}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Feature groups */}
                <div className="border border-zinc-200 rounded-b-2xl overflow-hidden">
                  {featureGroups.map((group, groupIdx) => (
                    <div key={group.key}>
                      {/* Group header */}
                      <div className={cn(
                        'grid grid-cols-[240px_repeat(4,1fr)]',
                        groupIdx > 0 ? 'border-t-2 border-zinc-200' : ''
                      )}>
                        <div className="py-3 px-5 bg-zinc-50 flex items-center gap-2.5">
                          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-primary/10">
                            <group.icon className="h-4 w-4 text-brand-primary" />
                          </div>
                          <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                            {t(`comparison.categories.${group.key}`)}
                          </span>
                        </div>
                        {plans.map((plan) => (
                          <div
                            key={plan.key}
                            className={cn(
                              'py-3 px-4 bg-zinc-50',
                              plan.popular && 'bg-brand-primary/[0.04]'
                            )}
                          />
                        ))}
                      </div>

                      {/* Features */}
                      {group.features.map((feature, featureIdx) => (
                        <div
                          key={feature.key}
                          className={cn(
                            'grid grid-cols-[240px_repeat(4,1fr)] transition-colors hover:bg-zinc-50/80',
                            featureIdx < group.features.length - 1 && 'border-b border-zinc-100'
                          )}
                        >
                          <div className="py-3.5 px-5 text-sm text-zinc-600 pl-14 flex items-center justify-between">
                            <span>{t(`comparison.features.${feature.key}`)}</span>
                            <FeatureTooltip text={t(`comparison.tooltips.${feature.key}`)} />
                          </div>
                          {feature.values.map((value, i) => (
                            <div
                              key={i}
                              className={cn(
                                'py-3.5 px-4 flex items-center justify-center',
                                plans[i]?.popular && 'bg-brand-primary/[0.03]'
                              )}
                            >
                              {typeof value === 'boolean' ? (
                                value ? (
                                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-primary/10">
                                    <Check className="h-3.5 w-3.5 text-brand-primary" />
                                  </div>
                                ) : (
                                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-red-50">
                                    <X className="h-3.5 w-3.5 text-red-400" />
                                  </div>
                                )
                              ) : (
                                <span className={cn(
                                  'text-sm font-semibold',
                                  plans[i]?.popular ? 'text-brand-primary' : 'text-brand-dark'
                                )}>
                                  {value}
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  ))}

                  {/* CTA row */}
                  <div className="grid grid-cols-[240px_repeat(4,1fr)] border-t-2 border-zinc-200 bg-zinc-50/50">
                    <div className="py-5 px-5" />
                    {plans.map((plan) => (
                      <div key={plan.key} className={cn(
                        'py-5 px-4 flex items-center justify-center',
                        plan.popular && 'bg-brand-primary/[0.03]'
                      )}>
                        <ButtonLink
                          href="https://app.lemcal.com/@trigger-flow/demo"
                          target="_blank"
                          rel="noopener noreferrer"
                          variant={plan.popular ? 'primary' : 'secondary'}
                          size="sm"
                          className={cn(
                            'justify-center',
                            plan.popular
                              ? 'shadow-lg shadow-brand-primary/20'
                              : 'border-zinc-200 hover:border-brand-primary'
                          )}
                        >
                          {t('cta.demo')}
                        </ButtonLink>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* ─── Add-on Modules ───────────────────────────────── */}
      <section className="py-16 md:py-24 bg-zinc-50/60">
        <Container>
          <motion.div
            initial={prefersReducedMotion ? 'visible' : 'hidden'}
            whileInView="visible"
            variants={fadeInUp}
            viewport={defaultViewport}
            className="text-center mb-12"
          >
            <Badge variant="secondary" className="mb-4">
              {t('addons.badge')}
            </Badge>
            <h2 className="text-3xl font-bold text-brand-dark md:text-4xl">
              {t('addons.title')}
            </h2>
            <p className="mt-3 text-zinc-500 max-w-lg mx-auto leading-relaxed">
              {t('addons.subtitle')}
            </p>
          </motion.div>

          <motion.div
            initial={prefersReducedMotion ? 'visible' : 'hidden'}
            whileInView="visible"
            variants={staggerContainer}
            viewport={defaultViewport}
            className="space-y-4 max-w-4xl mx-auto"
          >
            {addons.map((addon) => {
              const colors = addonColors[addon.color];
              return (
                <motion.div
                  key={addon.key}
                  variants={staggerItem}
                  whileHover={!prefersReducedMotion ? { x: 4 } : {}}
                  className={cn(
                    'group relative rounded-2xl border bg-white p-5 md:p-7 transition-all duration-300 shadow-sm hover:shadow-lg',
                    colors.border,
                    colors.hoverBorder
                  )}
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-5 md:gap-6">
                    {/* Left: icon + name + price */}
                    <div className="flex items-center gap-4 md:w-60 shrink-0">
                      <div className={cn(
                        'flex h-12 w-12 md:h-14 md:w-14 shrink-0 items-center justify-center rounded-2xl',
                        colors.bg
                      )}>
                        <addon.icon className={cn('h-6 w-6 md:h-7 md:w-7', colors.icon)} />
                      </div>
                      <div>
                        <h3 className="text-base md:text-lg font-bold text-brand-dark">
                          {t(`addons.items.${addon.key}.name`)}
                        </h3>
                        <div className="flex items-baseline gap-1 mt-0.5">
                          <span className="text-lg md:text-xl font-bold text-brand-dark">+{addon.price}€</span>
                          <span className="text-xs text-zinc-400">/{t('perMonth')}</span>
                        </div>
                      </div>
                    </div>

                    {/* Center: description + features */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-zinc-500 leading-relaxed">
                        {t(`addons.items.${addon.key}.description`)}
                      </p>
                      <div className="mt-2.5 flex flex-wrap gap-x-5 gap-y-1.5">
                        {(t.raw(`addons.items.${addon.key}.features`) as string[]).map((feature: string, i: number) => (
                          <span key={i} className="flex items-center gap-1.5 text-xs text-zinc-600">
                            <Check className={cn('h-3.5 w-3.5', colors.check)} />
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Right: CTA */}
                    <div className="shrink-0">
                      <ButtonLink
                        href="https://app.lemcal.com/@trigger-flow/demo"
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="secondary"
                        size="sm"
                        className={cn(
                          'gap-2 whitespace-nowrap transition-all duration-300',
                          colors.border,
                          colors.hoverBorder
                        )}
                      >
                        {t('addons.cta')}
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </ButtonLink>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </Container>
      </section>

      {/* ─── FAQ ──────────────────────────────────────────── */}
      <section className="py-16 md:py-24">
        <Container>
          <motion.div
            initial={prefersReducedMotion ? 'visible' : 'hidden'}
            whileInView="visible"
            variants={fadeInUp}
            viewport={defaultViewport}
            className="text-center mb-10"
          >
            <h2 className="text-3xl font-bold text-brand-dark md:text-4xl">
              {t('faq.title')}
            </h2>
          </motion.div>

          <motion.div
            initial={prefersReducedMotion ? 'visible' : 'hidden'}
            whileInView="visible"
            variants={staggerContainer}
            viewport={defaultViewport}
            className="mx-auto max-w-3xl divide-y divide-zinc-200 rounded-2xl border border-zinc-200 bg-white overflow-hidden shadow-sm"
          >
            {faqItems.map((item, idx) => (
              <motion.div key={item} variants={staggerItem}>
                <FaqAccordion
                  question={t(`faq.items.${item}.question`)}
                  answer={t(`faq.items.${item}.answer`)}
                  defaultOpen={idx === 0}
                />
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* ─── CTA Groupes ──────────────────────────────────── */}
      <section className="pb-16 md:pb-24">
        <Container>
          <motion.div
            initial={prefersReducedMotion ? 'visible' : 'hidden'}
            whileInView="visible"
            variants={fadeInUp}
            viewport={defaultViewport}
            className="relative overflow-hidden rounded-3xl bg-brand-dark p-8 md:p-16 text-center"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[600px] rounded-full bg-brand-primary/15 blur-3xl" />
            <div className="absolute bottom-0 right-0 h-[200px] w-[300px] rounded-full bg-brand-primary/10 blur-3xl" />

            <div className="relative">
              <h2 className="text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                {t('groups.title')}
              </h2>
              <p className="mt-4 text-white/60 max-w-lg mx-auto leading-relaxed text-sm md:text-base">
                {t('groups.description')}
              </p>
              <div className="mt-8">
                <ButtonLink
                  href="mailto:contact@trigger-flow.com"
                  variant="primary"
                  size="lg"
                  className="gap-2 shadow-lg shadow-brand-primary/30"
                >
                  <Mail className="h-4 w-4" />
                  {t('groups.cta')}
                </ButtonLink>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>
    </main>
  );
}

/* ─── Feature Tooltip ───────────────────────────────────────── */

function FeatureTooltip({ text }: { text: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-flex shrink-0">
      <button
        type="button"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        onClick={() => setIsOpen((o) => !o)}
        className="text-zinc-300 hover:text-zinc-500 transition-colors"
        aria-label="Plus d'informations"
      >
        <HelpCircle className="h-3.5 w-3.5" />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 bottom-full mb-2 z-[100] w-56 rounded-lg bg-brand-dark px-3 py-2 text-xs text-white/90 leading-relaxed shadow-xl pointer-events-none"
          >
            {text}
            <div className="absolute right-1.5 top-full w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[5px] border-t-brand-dark" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── FAQ Accordion ─────────────────────────────────────────── */

interface FaqAccordionProps {
  question: string;
  answer: string;
  defaultOpen?: boolean;
}

function FaqAccordion({ question, answer, defaultOpen = false }: FaqAccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 md:px-6 md:py-5 text-left transition-colors hover:bg-zinc-50"
      >
        <h3 className="font-semibold text-brand-dark text-sm md:text-[15px]">
          {question}
        </h3>
        <ChevronDown
          className={cn(
            'h-5 w-5 shrink-0 text-zinc-400 transition-transform duration-300',
            isOpen && 'rotate-180 text-brand-primary'
          )}
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-4 md:px-6 md:pb-5 text-sm text-zinc-500 leading-relaxed pr-10 md:pr-12">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
