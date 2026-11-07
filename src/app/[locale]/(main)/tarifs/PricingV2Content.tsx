'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  BarChart3, Bot, Check, CreditCard, Heart, HelpCircle, Minus, MessageSquare, ShoppingBag, Smartphone, Star, Workflow,
} from 'lucide-react';
import { Container, CtaBand, DsButton, Eyebrow, FaqList, SectionHeader } from '@/components/ds';
import { cn } from '@/lib/utils';
import { brand } from '@/data/brand';
import type { AddonKey, DisplayAddon, DisplayPlan } from '@/data/pricing';
import { UpcomingPrice } from '@/components/pricing/UpcomingPrice';

/* ─── Données du tableau comparatif ─────────────────────────────── */

type Cell = boolean | string;
const U = 'unlimited';

const featureGroups: { key: string; icon: typeof Check; features: { key: string; values: Cell[] }[] }[] = [
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
      { key: 'segments', values: ['5', '10', '45', U] },
      { key: 'flows', values: ['1', '5', '10', U] },
      { key: 'conditions', values: [false, false, true, true] },
    ],
  },
  {
    key: 'marketing',
    icon: ShoppingBag,
    features: [
      { key: 'marketing', values: [false, false, true, true] },
      { key: 'forms', values: [false, false, '5', U] },
      { key: 'salesCatalog', values: [false, false, true, true] },
    ],
  },
  {
    key: 'tools',
    icon: BarChart3,
    features: [
      { key: 'stats', values: [true, true, true, true] },
      { key: 'groupPortal', values: [false, false, true, true] },
      { key: 'addonsIncluded', values: [false, false, false, true] },
    ],
  },
];

/** Prix dans `@/data/pricing` ; ici, seulement l'icône de chaque module. */
const addonIcons: Record<AddonKey, typeof Star> = {
  reviews: Star,
  aiAgent: Bot,
  payments: CreditCard,
  loyalty: Heart,
  guestApp: Smartphone,
};

const faqItems = ['changePlan', 'commitment', 'groupRates', 'smsIncluded'];

interface PricingV2ContentProps {
  plans: DisplayPlan[];
  addons: DisplayAddon[];
  /** Période d'annonce de la hausse du 1er janvier 2027. */
  announcing: boolean;
}

/** Page Tarifs de la charte : prix HT par établissement, un seul CTA « Demander une démo ». */
export function PricingV2Content({ plans, addons, announcing }: PricingV2ContentProps) {
  const t = useTranslations('pricing');
  const tChange = useTranslations('priceChange');
  const tNav = useTranslations('nav');
  const cell = (v: Cell) => (v === U ? t('comparison.unlimited') : v);

  const faq = [
    ...(announcing ? [{ question: tChange('faqQuestion'), answer: tChange('faqAnswer') }] : []),
    ...faqItems.map((k) => ({ question: t(`faq.items.${k}.question`), answer: t(`faq.items.${k}.answer`) })),
  ];

  return (
    <>
      {/* Hero */}
      <section className="bg-white pb-12 pt-14 md:pb-16 md:pt-20">
        <Container className="text-center">
          <Eyebrow>{t('hero.badge')}</Eyebrow>
          <h1 className="mx-auto mt-5 max-w-3xl text-balance text-[2.25rem] font-medium leading-[1.08] tracking-[-0.025em] text-ink md:text-[3.5rem]">
            {t('hero.title')}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink-2">{t('hero.subtitle')}</p>
          {announcing && (
            <div className="mx-auto mt-8 max-w-2xl rounded-xl border border-accent/25 bg-mint/50 px-5 py-4 text-left sm:text-center">
              <p className="font-semibold text-ink">{tChange('lockTitle')}</p>
              <p className="mt-1 text-[14.5px] text-ink-2">{tChange('lockBody')}</p>
            </div>
          )}
        </Container>
      </section>

      {/* Plans */}
      <section className="bg-white pb-20 md:pb-28">
        <Container>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {plans.map((plan) => (
              <div
                key={plan.key}
                className={cn(
                  'relative flex flex-col rounded-xl border bg-white p-6',
                  plan.popular ? 'border-accent shadow-[0_0_0_3px_rgba(0,111,104,0.10)]' : 'border-line',
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <h2 className="font-mono text-[12px] font-medium uppercase tracking-[0.08em] text-ink-2">{t(`plans.${plan.key}.name`)}</h2>
                  {plan.popular && <span className="rounded-full bg-mint px-2 py-0.5 text-[11px] font-medium text-ink">{t(`plans.${plan.key}.badge`)}</span>}
                </div>
                <p className="mt-5 text-[2.5rem] font-medium leading-none tracking-[-0.03em] tabular-nums text-ink">{plan.price} €</p>
                <p className="mt-2 text-[12.5px] text-ink-3">{t('perMonthFull')}</p>
                <UpcomingPrice price={plan.upcomingPrice} className="font-normal text-ink-3" />
                <p className="mt-5 flex-1 text-[14.5px] leading-relaxed text-ink-2">{t(`plans.${plan.key}.description`)}</p>
                <DsButton href={brand.demoPage} variant={plan.popular ? 'primary' : 'secondary'} size="sm" className="mt-6 w-full">
                  {t('cta.demo')}
                </DsButton>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Comparatif */}
      <section className="border-t border-line bg-paper py-20 md:py-28">
        <Container>
          <SectionHeader eyebrow={t('comparison.eyebrow')} title={t('comparison.title')} subtitle={t('comparison.subtitle')} align="left" />
          <div className="mt-12 -mx-4 overflow-x-auto px-4 md:mx-0 md:px-0">
            <table className="w-full min-w-[720px] border-separate border-spacing-0 overflow-hidden rounded-xl border border-line bg-white text-left">
              <thead>
                <tr>
                  <th scope="col" className="w-[34%] border-b border-line px-5 py-4">
                    <span className="sr-only">{t('comparison.featureCol')}</span>
                  </th>
                  {plans.map((plan) => (
                    <th key={plan.key} scope="col" className={cn('border-b border-line px-4 py-4 text-center align-bottom', plan.popular && 'bg-mint/40')}>
                      <span className="block font-mono text-[11.5px] font-medium uppercase tracking-[0.08em] text-ink-2">{t(`plans.${plan.key}.name`)}</span>
                      <span className="mt-1 block text-[17px] font-medium tabular-nums text-ink">{plan.price} €</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {featureGroups.map((group) => (
                  <FeatureGroupRows key={group.key} group={group} plans={plans} t={t} cell={cell} />
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-[13px] text-ink-3">{t('comparison.note')}</p>
        </Container>
      </section>

      {/* Modules */}
      <section className="bg-white py-20 md:py-28">
        <Container>
          <SectionHeader eyebrow={t('addons.badge')} title={t('addons.title')} subtitle={t('addons.subtitle')} align="left" />
          <ul className="mt-12 grid gap-4 md:grid-cols-2">
            {addons.map((addon) => {
              const Icon = addonIcons[addon.key];
              return (
                <li key={addon.key} className="flex flex-col rounded-xl border border-line bg-white p-6">
                  <div className="flex items-start gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-line bg-mint/50 text-accent">
                      <Icon aria-hidden className="h-5 w-5" strokeWidth={1.75} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-[17px] font-semibold text-ink">{t(`addons.items.${addon.key}.name`)}</h3>
                      <p className="mt-0.5 text-[14px] text-ink-2">
                        <span className="font-medium tabular-nums text-ink">+{addon.price} €</span> {t('perMonthFull')}
                      </p>
                      <UpcomingPrice price={addon.upcomingPrice} variant="addon" className="font-normal text-ink-3" />
                    </div>
                  </div>
                  <p className="mt-4 text-[14.5px] leading-relaxed text-ink-2">{t(`addons.items.${addon.key}.description`)}</p>
                  <ul className="mt-4 grid gap-1.5 sm:grid-cols-2">
                    {(t.raw(`addons.items.${addon.key}.features`) as string[]).map((f) => (
                      <li key={f} className="flex items-start gap-2 text-[13.5px] text-ink-2">
                        <Check aria-hidden className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      {/* Groupes */}
      <section className="bg-white pb-20 md:pb-28">
        <Container>
          <div className="flex flex-col gap-6 rounded-2xl border border-line bg-paper p-8 md:flex-row md:items-center md:justify-between md:p-10">
            <div className="max-w-xl">
              <h2 className="text-h3 font-medium tracking-[-0.01em] text-ink">{t('groups.title')}</h2>
              <p className="mt-2 text-[15.5px] leading-relaxed text-ink-2">{t('groups.description')}</p>
            </div>
            <DsButton href="/contact" variant="secondary" arrow className="shrink-0">
              {t('groups.cta')}
            </DsButton>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="border-t border-line bg-white py-20 md:py-28">
        <Container className="grid gap-10 lg:grid-cols-[1fr_2fr]">
          <SectionHeader eyebrow="FAQ" title={t('faq.title')} align="left" />
          <FaqList items={faq} />
        </Container>
      </section>

      <CtaBand title={t('ctaBand')} primary={{ label: tNav('startFree'), href: brand.demoPage }} secondary={{ label: tNav('seeProduct'), href: '/produit' }} />
    </>
  );
}

function FeatureGroupRows({
  group,
  plans,
  t,
  cell,
}: {
  group: (typeof featureGroups)[number];
  plans: DisplayPlan[];
  t: ReturnType<typeof useTranslations>;
  cell: (v: Cell) => Cell;
}) {
  const Icon = group.icon;
  return (
    <>
      <tr>
        <th scope="colgroup" colSpan={plans.length + 1} className="border-b border-line bg-paper/70 px-5 py-3">
          <span className="flex items-center gap-2 font-mono text-[11.5px] font-medium uppercase tracking-[0.08em] text-ink-2">
            <Icon aria-hidden className="h-4 w-4 text-accent" strokeWidth={1.75} />
            {t(`comparison.categories.${group.key}`)}
          </span>
        </th>
      </tr>
      {group.features.map((feature) => (
        <tr key={feature.key}>
          <th scope="row" className="border-b border-line px-5 py-3.5 text-[14px] font-normal text-ink-2">
            <span className="flex items-center justify-between gap-3">
              {t(`comparison.features.${feature.key}`)}
              <FeatureTooltip text={t(`comparison.tooltips.${feature.key}`)} label={t('comparison.moreInfo')} />
            </span>
          </th>
          {feature.values.map((value, i) => {
            const v = cell(value);
            return (
              <td key={i} className={cn('border-b border-line px-4 py-3.5 text-center', plans[i]?.popular && 'bg-mint/25')}>
                {typeof v === 'boolean' ? (
                  v ? (
                    <Check aria-label={t('comparison.included')} className="mx-auto h-4 w-4 text-accent" strokeWidth={2} />
                  ) : (
                    <Minus aria-label={t('comparison.notIncluded')} className="mx-auto h-4 w-4 text-ink-3/60" />
                  )
                ) : (
                  <span className="text-[14px] font-medium tabular-nums text-ink">{v}</span>
                )}
              </td>
            );
          })}
        </tr>
      ))}
    </>
  );
}

function FeatureTooltip({ text, label }: { text: string; label: string }) {
  const [open, setOpen] = useState(false);
  return (
    <span className="relative inline-flex shrink-0">
      <button
        type="button"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onClick={() => setOpen((o) => !o)}
        className="text-ink-3/70 transition-colors hover:text-ink"
        aria-label={label}
        aria-expanded={open}
      >
        <HelpCircle aria-hidden className="h-3.5 w-3.5" />
      </button>
      {open && (
        <span role="tooltip" className="absolute bottom-full right-0 z-30 mb-2 w-56 rounded-lg bg-ink px-3 py-2 text-left text-[12.5px] leading-relaxed text-white shadow-lg">
          {text}
        </span>
      )}
    </span>
  );
}
