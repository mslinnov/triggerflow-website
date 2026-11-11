'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import {
  BarChart3, Bot, Plug, Check, HelpCircle, Minus, MessageSquare, ShoppingBag, Workflow,
  type LucideIcon,
} from 'lucide-react';
import { Container, CtaBand, DsButton, Eyebrow, FaqList, SectionHeader } from '@/components/ds';
import { cn } from '@/lib/utils';
import { brand } from '@/data/brand';
import { clientLogos, homeTestimonials } from '@/data/clients';
import type { AddonKey, DisplayAddon, DisplayPlan } from '@/data/pricing';
import { UpcomingPrice } from '@/components/pricing/UpcomingPrice';
import { FromPriceStar } from '@/components/pricing/FromPriceStar';
import { PricingReassurance } from '@/components/pricing/PricingReassurance';
import { Link } from '@/i18n/navigation';
import { navIcons } from '@/data/nav-icons';

/* ─── Données du tableau comparatif ─────────────────────────────── */

type Cell = boolean | string;
const U = 'unlimited';
const ALL = 'all';

/** Colonnes : Découverte, One Way, Two Way, All Inclusive. Volumes repris des anciens plans Communication et Conversion. */
const featureGroups: { key: string; icon: typeof Check; features: { key: string; values: Cell[] }[] }[] = [
  {
    key: 'automation',
    icon: Workflow,
    features: [
      { key: 'segments', values: ['5', '10', '45', U] },
      { key: 'flows', values: ['1', '5', '10', U] },
      { key: 'conditions', values: [false, false, true, true] },
      { key: 'stats', values: [true, true, true, true] },
    ],
  },
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
    key: 'marketing',
    icon: ShoppingBag,
    features: [
      { key: 'forms', values: [false, false, '5', U] },
      { key: 'upsell', values: [false, false, true, true] },
    ],
  },
  {
    key: 'tools',
    icon: BarChart3,
    features: [
      { key: 'modulesIncluded', values: ['0', '1', '2', ALL] },
      { key: 'groupPortal', values: [false, false, true, true] },
    ],
  },
];

/** Prix dans `@/data/pricing` ; ici, seulement l'icône de chaque module. */
/** Affichage des modules payants : icône, libellé (clé de navigation), page produit. */
const ADDON_META: Record<AddonKey, { icon: LucideIcon; name: string; desc: string; href: string }> = {
  reviews: { icon: navIcons.reviews, name: 'reviews', desc: 'reviews', href: '/produit/reviews' },
  aiAgent: { icon: Bot, name: 'ai', desc: '', href: '/plateforme/ia' },
  housekeeping: { icon: navIcons.housekeeping, name: 'custom', desc: 'housekeeping', href: '/produit/housekeeping' },
  payments: { icon: navIcons.pay, name: 'pay', desc: 'pay', href: '/produit/pay' },
  loyalty: { icon: navIcons.loyalty, name: 'loyalty', desc: 'loyalty', href: '/produit/loyalty' },
  guestApp: { icon: navIcons.guestApp, name: 'guestApp', desc: 'guestApp', href: '/produit/guest-app' },
  voice: { icon: navIcons.voice, name: 'custom', desc: 'voice', href: '/produit/voice' },
  b2b: { icon: navIcons.b2b, name: 'custom', desc: 'events', href: '/produit/b2b' },
};


const faqItems = ['modules', 'connections', 'changePlan', 'commitment', 'groupRates', 'smsIncluded'];

interface PricingV2ContentProps {
  plans: DisplayPlan[];
  addons: DisplayAddon[];
  /** Période d'annonce d'un changement de prix (aucune aujourd'hui). */
  announcing: boolean;
}

/** Page Tarifs de la charte : prix HT par établissement, un seul CTA « Demander une démo ». */
export function PricingV2Content({ plans, addons, announcing }: PricingV2ContentProps) {
  const t = useTranslations('pricing');
  const tChange = useTranslations('priceChange');
  const tNav = useTranslations('nav');
  const tb = useTranslations('home2.builder');
  const locale = useLocale() as 'fr' | 'en';
  // Témoignage sur la valeur : Causse Comtal (citation publiée, docs/preuves.md).
  const quote = homeTestimonials.find((q) => q.company === 'Hôtel Causse Comtal') ?? homeTestimonials[0];
  const cell = (v: Cell) => (v === U ? t('comparison.unlimited') : v === ALL ? t('comparison.allModules') : v);

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
                <p className="mt-4 inline-flex w-fit items-center rounded-md bg-mint/50 px-2.5 py-1 text-[12.5px] font-medium text-accent-hover">
                  {tb(`included.${plan.key}`)}
                </p>
                <p className="mt-4 text-[2.5rem] font-medium leading-none tracking-[-0.03em] tabular-nums text-ink">{plan.price} €</p>
                <p className="mt-2 text-[12.5px] text-ink-3">{t('perMonthFull')}</p>
                <UpcomingPrice price={plan.upcomingPrice} className="font-normal text-ink-3" />
                <p className="mt-5 text-[14.5px] leading-relaxed text-ink-2">{t(`plans.${plan.key}.description`)}</p>
                <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-3">{t('includesTitle')}</p>
                <ul className="mt-3 flex-1 space-y-2">
                  {(t.raw(`plans.${plan.key}.includes`) as string[]).map((item) => (
                    <li key={item} className="flex gap-2 text-[14px] text-ink">
                      <Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
                <DsButton href={brand.demoPage} variant={plan.popular ? 'primary' : 'secondary'} size="sm" className="mt-6 w-full">
                  {t('cta.demo')}
                </DsButton>
              </div>
            ))}
          </div>
          <PricingReassurance className="mt-6" />
          <figure className="mt-6 flex flex-col gap-5 rounded-2xl bg-ink p-6 text-white md:flex-row md:items-center md:p-8">
            <blockquote className="flex-1 text-[18px] leading-relaxed md:text-[20px]"><q>{quote.quote[locale]}</q></blockquote>
            <figcaption className="flex shrink-0 items-center gap-3">
              {clientLogos[quote.company as keyof typeof clientLogos] && (
                <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-white p-1.5">
                  <Image
                    src={clientLogos[quote.company as keyof typeof clientLogos]!.src}
                    alt={quote.company}
                    width={clientLogos[quote.company as keyof typeof clientLogos]!.width}
                    height={clientLogos[quote.company as keyof typeof clientLogos]!.height}
                    className="h-auto max-h-9 w-auto max-w-full object-contain"
                  />
                </span>
              )}
              <span>
                <span className="block text-[15px] font-semibold">{quote.name}</span>
                <span className="block text-[13px] text-white/75">{quote.role[locale]}, {quote.company}</span>
              </span>
            </figcaption>
          </figure>
        </Container>
      </section>

      {/* Modules payants (grille du 08/11/2026), puis les connexions incluses */}
      <section className="border-t border-line bg-paper py-20 md:py-28">
        <Container>
          <SectionHeader eyebrow={t('addons.badge')} title={t('addons.title')} subtitle={t('addons.subtitle')} align="left" />
          <div className="mt-8 grid gap-3 rounded-xl border border-line bg-paper p-5 sm:grid-cols-2 lg:grid-cols-4">
            {(['discovery', 'communication', 'conversion', 'allInclusive'] as const).map((key) => (
              <p key={key} className="text-[14px] text-ink-2">
                <span className="block font-mono text-[11px] uppercase tracking-[0.08em] text-ink-3">{t(`plans.${key}.name`)}</span>
                <span className="mt-1 block font-semibold text-ink">{tb(`included.${key}`)}</span>
              </p>
            ))}
          </div>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {addons.map((addon) => {
              const meta = ADDON_META[addon.key];
              const Icon = meta.icon;
              const name = meta.name === 'ai' ? tb('aiAgent.name') : meta.name === 'custom' ? t(`addons.names.${addon.key}`) : tNav(`items.${meta.name}`);
              const desc = meta.name === 'ai' ? tb('aiAgent.description') : tNav(`descriptions.${meta.desc}`);
              return (
                <li key={addon.key}>
                  <Link href={meta.href} className="group flex h-full flex-col rounded-xl border border-line bg-white p-5 transition-colors hover:border-accent">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-mint/50 text-accent">
                      <Icon aria-hidden className="h-4 w-4" strokeWidth={1.75} />
                    </span>
                    <span className="mt-4 text-[15px] font-semibold text-ink group-hover:text-accent">{name}</span>
                    <span className="mt-0.5 flex-1 text-[13px] text-ink-3">{desc}</span>
                    <span className="mt-4 flex flex-wrap items-baseline gap-x-1.5 border-t border-line pt-3">
                      <span className="text-[20px] font-medium tabular-nums text-ink">
                        {addon.price} €{addon.from && <FromPriceStar label={t('addons.fromTooltip')} />}
                      </span>
                      <span className="text-[12px] text-ink-3">{t('perMonthFull')}</span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <p className="mt-4 text-[13px] text-ink-3">{t('addons.note')}</p>

          <div className="mt-10 flex flex-col gap-4 rounded-2xl bg-ink p-6 text-white md:flex-row md:items-center md:justify-between md:p-8">
            <div className="flex items-start gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/10 text-mint">
                <Plug aria-hidden className="h-5 w-5" strokeWidth={1.75} />
              </span>
              <div>
                <p className="text-[18px] font-semibold">{t('connect.title')}</p>
                <p className="mt-1 max-w-2xl text-[14.5px] leading-relaxed text-white/80">{t('connect.text')}</p>
              </div>
            </div>
            <DsButton href="/integrations" variant="secondaryOnDark" className="shrink-0">
              {t('connect.more')}
            </DsButton>
          </div>
        </Container>
      </section>

      {/* Comparatif (détail, en dernier) */}
      <section className="bg-white py-20 md:py-28">
        <Container>
          <SectionHeader eyebrow={t('comparison.eyebrow')} title={t('comparison.title')} subtitle={t('comparison.subtitle')} align="left" />
          <div className="mt-12 -mx-4 overflow-x-auto px-4 md:mx-0 md:px-0">
            <table className="w-full table-fixed border-separate md:table-auto border-spacing-0 overflow-hidden rounded-xl border border-line bg-white text-left">
              <thead>
                <tr>
                  <th scope="col" className="w-[32%] border-b border-line px-2 py-4 md:w-[30%] md:px-5">
                    <span className="sr-only">{t('comparison.featureCol')}</span>
                  </th>
                  {plans.map((plan) => (
                    <th key={plan.key} scope="col" className={cn('border-b border-line px-1 py-4 text-center align-bottom md:px-4', plan.popular && 'bg-mint/40')}>
                      <span className="block font-mono text-[8.5px] font-medium uppercase leading-tight tracking-normal text-ink-2 [overflow-wrap:anywhere] md:text-[11.5px] md:tracking-[0.08em]">{t(`plans.${plan.key}.name`)}</span>
                      <span className="mt-1 block text-[14px] font-medium tabular-nums text-ink md:text-[17px]">{plan.price} €</span>
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
        <th scope="colgroup" colSpan={plans.length + 1} className="border-b border-line bg-paper/70 px-3 py-3 md:px-5">
          <span className="flex items-center gap-2 font-mono text-[11.5px] font-medium uppercase tracking-[0.08em] text-ink-2">
            <Icon aria-hidden className="h-4 w-4 text-accent" strokeWidth={1.75} />
            {t(`comparison.categories.${group.key}`)}
          </span>
        </th>
      </tr>
      {group.features.map((feature) => (
        <tr key={feature.key}>
          <th scope="row" className="border-b border-line px-3 py-3 text-[13px] font-normal text-ink-2 md:px-5 md:py-3.5 md:text-[14px]">
            <span className="flex items-center justify-between gap-3">
              {t(`comparison.features.${feature.key}`)}
              <FeatureTooltip text={t(`comparison.tooltips.${feature.key}`)} label={t('comparison.moreInfo')} />
            </span>
          </th>
          {feature.values.map((value, i) => {
            const v = cell(value);
            return (
              <td key={i} className={cn('border-b border-line px-1 py-3 text-center md:px-4 md:py-3.5', plans[i]?.popular && 'bg-mint/25')}>
                {typeof v === 'boolean' ? (
                  v ? (
                    <Check aria-label={t('comparison.included')} className="mx-auto h-4 w-4 text-accent" strokeWidth={2} />
                  ) : (
                    <Minus aria-label={t('comparison.notIncluded')} className="mx-auto h-4 w-4 text-ink-3/60" />
                  )
                ) : (
                  <span className="text-[12.5px] font-medium tabular-nums text-ink md:text-[14px]">{v}</span>
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
    <span className="relative hidden shrink-0 md:inline-flex">
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
