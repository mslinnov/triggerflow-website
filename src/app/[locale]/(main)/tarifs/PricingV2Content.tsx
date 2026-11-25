'use client';

import { useMemo, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import {
  Check, X, Mail, ChevronDown, Star, Heart, Smartphone, Bot, CreditCard,
  ArrowRight, Sparkles, MessageSquare, Workflow, BarChart3,
  ShoppingBag,
} from 'lucide-react';
import { Container, ButtonLink, Badge } from '@/components/ui';
import { cn } from '@/lib/utils';
import { fadeInUp, staggerContainer, staggerItem, defaultViewport } from '@/lib/animations';
import type { AddonKey, DisplayAddon, DisplayPlan } from '@/data/pricing';
import { UpcomingPrice } from '@/components/pricing/UpcomingPrice';
import { FeatureTooltip } from '@/components/pricing/FeatureTooltip';
import { RoiBlock } from '@/components/pricing/RoiBlock';
import { COMPARISON_GROUPS, type ComparisonGroupKey, type FeatureValue } from '@/data/pricing-comparison';

/* ─── Data ──────────────────────────────────────────────────── */

/** Téléphone : libellé sur toute la largeur, puis les 4 valeurs ; ordinateur : libellé à gauche. */
const TABLE_GRID = 'grid-cols-4 md:grid-cols-[240px_repeat(4,1fr)] lg:grid-cols-[300px_repeat(4,1fr)]';

const DEMO_URL = 'https://app.lemcal.com/@trigger-flow/demo';

/** Lignes et valeurs du tableau : `@/data/pricing-comparison` ; ici, l'icône de chaque groupe. */
const groupIcons: Record<ComparisonGroupKey, typeof MessageSquare> = {
  communication: MessageSquare,
  automation: Workflow,
  marketing: ShoppingBag,
  tools: BarChart3,
};

/** Prix dans `@/data/pricing` ; ici, seulement l'habillage de chaque module. */
const addonStyles: Record<AddonKey, { icon: typeof Star; color: keyof typeof addonColors }> = {
  reviews: { icon: Star, color: 'amber' },
  aiAgent: { icon: Bot, color: 'violet' },
  payments: { icon: CreditCard, color: 'emerald' },
  loyalty: { icon: Heart, color: 'rose' },
  guestApp: { icon: Smartphone, color: 'sky' },
};

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
  emerald: {
    bg: 'bg-emerald-50',
    icon: 'text-emerald-500',
    border: 'border-emerald-200',
    hoverBorder: 'hover:border-emerald-300',
    badge: 'bg-emerald-100 text-emerald-700',
    check: 'text-emerald-500',
    checkBg: 'bg-emerald-50',
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
  plans: DisplayPlan[];
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

interface PricingV2ContentProps {
  plans: DisplayPlan[];
  addons: DisplayAddon[];
  /** Période d'annonce de la hausse du 1er janvier 2027. */
  announcing: boolean;
  /** Bloc « Ce que ça rapporte », derrière `PRICING_ROI_PREVIEW`. */
  showRoi: boolean;
}

export function PricingV2Content({ plans, addons, announcing, showRoi }: PricingV2ContentProps) {
  const t = useTranslations('pricing');
  const tChange = useTranslations('priceChange');
  const prefersReducedMotion = useReducedMotion();
  const [activeMobilePlan, setActiveMobilePlan] = useState(2); // Default to "Conversion" (popular)
  const locale = useLocale();
  const number = useMemo(() => new Intl.NumberFormat(locale), [locale]);

  const formatValue = (value: Exclude<FeatureValue, boolean>) =>
    typeof value === 'number' ? number.format(value) : t(`comparison.values.${value}`);

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
            {announcing && (
              <div className="mx-auto mt-6 max-w-2xl rounded-2xl border border-white/15 bg-white/10 p-4">
                <p className="font-semibold text-white">{tChange('lockTitle')}</p>
                <p className="mt-1 text-sm text-white/70">{tChange('lockBody')}</p>
              </div>
            )}
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
                    <UpcomingPrice
                      price={plan.upcomingPrice}
                      className={plan.popular ? 'text-brand-primary' : 'text-white/60'}
                    />

                    <p className={cn(
                      'mt-1.5 text-xs',
                      plan.popular ? 'text-brand-primary/70' : 'text-white/40'
                    )}>
                      {t(`plans.${plan.key}.trial`)}
                    </p>
                    <p className={cn(
                      'mt-3 inline-flex items-center gap-1.5 self-start rounded-full px-2.5 py-1 text-xs font-medium',
                      plan.popular ? 'bg-brand-primary/10 text-brand-primary' : 'bg-white/10 text-white/80'
                    )}>
                      <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                      {t('emailsPerMonth', { count: plan.emailsPerMonth })}
                    </p>

                    <p className={cn(
                      'mt-4 text-sm leading-relaxed',
                      plan.popular ? 'text-zinc-500' : 'text-white/60'
                    )}>
                      {t(`plans.${plan.key}.description`)}
                    </p>

                    <div className="mt-5">
                      <ButtonLink
                        href={DEMO_URL}
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
                <UpcomingPrice
                  price={plan.upcomingPrice}
                  className={plan.popular ? 'text-brand-primary' : 'text-white/60'}
                />

                <p className={cn(
                  'mt-1.5 text-xs',
                  plan.popular ? 'text-brand-primary/70' : 'text-white/40'
                )}>
                  {t(`plans.${plan.key}.trial`)}
                </p>
                <p className={cn(
                  'mt-3 inline-flex items-center gap-1.5 self-start rounded-full px-2.5 py-1 text-xs font-medium',
                  plan.popular ? 'bg-brand-primary/10 text-brand-primary' : 'bg-white/10 text-white/80'
                )}>
                  <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                  {t('emailsPerMonth', { count: plan.emailsPerMonth })}
                </p>

                <p className={cn(
                  'mt-4 text-sm leading-relaxed flex-1',
                  plan.popular ? 'text-zinc-500' : 'text-white/60'
                )}>
                  {t(`plans.${plan.key}.description`)}
                </p>

                <div className="mt-5">
                  <ButtonLink
                    href={DEMO_URL}
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

          {/* Pas de défilement horizontal : sur téléphone, le libellé passe au-dessus des 4 valeurs. */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={defaultViewport}
          >
            {/* En-tête collant (noms et prix) sous le header fixe ; le bandeau d'annonce ajoute h-9. */}
            <div className={cn(
              'sticky z-20 bg-white/95 backdrop-blur-md rounded-t-2xl border border-zinc-200 border-b-0',
              announcing ? 'top-[100px] md:top-[116px]' : 'top-16 md:top-20'
            )}>
              <div className={cn('grid', TABLE_GRID)}>
                <div className="hidden md:block py-4 px-5" />
                {plans.map((plan) => (
                  <div
                    key={plan.key}
                    className={cn(
                      'relative py-3 px-1 md:py-4 md:px-4 text-center',
                      plan.popular && 'bg-brand-primary/[0.04]'
                    )}
                  >
                    {/* Dans le flux : en position absolue, elle passait sous le header quand l'en-tête colle. */}
                    <span className={cn(
                      'mb-1 hidden md:inline-flex whitespace-nowrap rounded-full bg-brand-primary px-2.5 py-0.5 text-[10px] font-semibold text-white',
                      !plan.popular && 'invisible'
                    )} aria-hidden={!plan.popular}>
                      {t('comparison.popular')}
                    </span>
                    <div className={cn(
                      'text-[11px] md:text-sm font-bold',
                      plan.popular ? 'text-brand-primary' : 'text-brand-dark'
                    )}>
                      {t(`plans.${plan.key}.name`)}
                    </div>
                    <div className={cn(
                      'text-base md:text-lg font-bold mt-0.5',
                      plan.popular ? 'text-brand-primary' : 'text-brand-dark'
                    )}>
                      {plan.price}€<span className="text-[10px] md:text-xs font-normal text-zinc-400">/{t('perMonth')}</span>
                    </div>
                    {/* Sur téléphone, le prix 2027 reste sur la carte de l'offre : l'en-tête collant garde 2 lignes. */}
                    <UpcomingPrice price={plan.upcomingPrice} className="hidden md:block text-zinc-500 font-normal" />
                  </div>
                ))}
              </div>
            </div>

            {/* Feature groups */}
            <div className="border border-zinc-200 rounded-b-2xl overflow-hidden">
              {COMPARISON_GROUPS.map((group, groupIdx) => {
                const GroupIcon = groupIcons[group.key];
                return (
                  <div key={group.key}>
                    {/* Group header */}
                    <div className={cn(
                      'grid', TABLE_GRID,
                      groupIdx > 0 ? 'border-t-2 border-zinc-200' : ''
                    )}>
                      <div className="col-span-4 md:col-span-1 py-3 px-4 md:px-5 bg-zinc-50 flex items-center gap-2.5">
                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-primary/10">
                          <GroupIcon className="h-4 w-4 text-brand-primary" aria-hidden="true" />
                        </div>
                        <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                          {t(`comparison.categories.${group.key}`)}
                        </span>
                      </div>
                      {plans.map((plan) => (
                        <div
                          key={plan.key}
                          className={cn(
                            'hidden md:block py-3 px-4 bg-zinc-50',
                            plan.popular && 'bg-brand-primary/[0.04]'
                          )}
                        />
                      ))}
                    </div>

                    {/* Features */}
                    {group.features.map((feature, featureIdx) => {
                      const label = t(`comparison.features.${feature.key}`);
                      return (
                        <div
                          key={feature.key}
                          className={cn(
                            'grid transition-colors hover:bg-zinc-50/80', TABLE_GRID,
                            featureIdx < group.features.length - 1 && 'border-b border-zinc-100'
                          )}
                        >
                          <div className="col-span-4 md:col-span-1 pt-3 pb-1 px-4 md:py-3.5 md:pr-5 md:pl-14 text-sm text-zinc-600 flex items-center justify-between gap-2">
                            <span>{label}</span>
                            <FeatureTooltip
                              label={t('comparison.moreInfo', { feature: label })}
                              what={t(`comparison.tooltips.${feature.key}.what`)}
                              example={t(`comparison.tooltips.${feature.key}.example`)}
                              exampleLabel={t('comparison.example')}
                            />
                          </div>
                          {feature.values.map((value, i) => (
                            <div
                              key={plans[i]?.key ?? i}
                              className={cn(
                                'py-2 px-1 md:py-3.5 md:px-4 flex items-center justify-center text-center',
                                plans[i]?.popular && 'bg-brand-primary/[0.03]'
                              )}
                            >
                              {typeof value === 'boolean' ? (
                                value ? (
                                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-primary/10">
                                    <Check className="h-3.5 w-3.5 text-brand-primary" aria-label={t('comparison.included')} />
                                  </div>
                                ) : (
                                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-red-50">
                                    <X className="h-3.5 w-3.5 text-red-400" aria-label={t('comparison.notIncluded')} />
                                  </div>
                                )
                              ) : (
                                <span className={cn(
                                  'text-xs md:text-sm font-semibold',
                                  plans[i]?.popular ? 'text-brand-primary' : 'text-brand-dark'
                                )}>
                                  {formatValue(value)}
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      );
                    })}
                  </div>
                );
              })}

              {/* CTA row : sur téléphone, le bouton est déjà sur la carte de l'offre. */}
              <div className={cn('hidden md:grid border-t-2 border-zinc-200 bg-zinc-50/50', TABLE_GRID)}>
                <div className="py-5 px-5" />
                {plans.map((plan) => (
                  <div key={plan.key} className={cn(
                    'py-5 px-4 flex items-center justify-center',
                    plan.popular && 'bg-brand-primary/[0.03]'
                  )}>
                    <ButtonLink
                      href={DEMO_URL}
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
          </motion.div>
        </Container>
      </section>

      {showRoi && <RoiBlock plans={plans} />}

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
              const { icon: AddonIcon, color } = addonStyles[addon.key];
              const colors = addonColors[color];
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
                        <AddonIcon className={cn('h-6 w-6 md:h-7 md:w-7', colors.icon)} />
                      </div>
                      <div>
                        <h3 className="text-base md:text-lg font-bold text-brand-dark">
                          {t(`addons.items.${addon.key}.name`)}
                        </h3>
                        <div className="flex items-baseline gap-1 mt-0.5">
                          <span className="text-lg md:text-xl font-bold text-brand-dark">+{addon.price}€</span>
                          <span className="text-xs text-zinc-400">/{t('perMonth')}</span>
                        </div>
                        <UpcomingPrice price={addon.upcomingPrice} variant="addon" className="text-zinc-500" />
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
                        href={DEMO_URL}
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
            {announcing && (
              <motion.div variants={staggerItem}>
                <FaqAccordion
                  question={tChange('faqQuestion')}
                  answer={tChange('faqAnswer')}
                  defaultOpen
                />
              </motion.div>
            )}
            {faqItems.map((item, idx) => (
              <motion.div key={item} variants={staggerItem}>
                <FaqAccordion
                  question={t(`faq.items.${item}.question`)}
                  answer={t(`faq.items.${item}.answer`)}
                  defaultOpen={!announcing && idx === 0}
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
