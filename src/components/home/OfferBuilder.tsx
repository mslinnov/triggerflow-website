'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  BedDouble, Bot, Briefcase, CalendarDays, ClipboardList, CreditCard, Heart, KeyRound, Megaphone, PhoneCall, ShoppingBag, Smartphone, Sparkles, Star, Check, UserCheck,
} from 'lucide-react';
import { DsButton } from '@/components/ds';
import { brand } from '@/data/brand';
import { BUILDER_COLUMNS, recommendPlan, TWO_WAY_BUNDLE, type BuilderModuleKey } from '@/data/offer-builder';
import type { DisplayPlan } from '@/data/pricing';
import { cn } from '@/lib/utils';

const ICONS: Record<BuilderModuleKey, typeof Star> = {
  forms: ClipboardList,
  upsell: ShoppingBag,
  pay: CreditCard,
  checkin: UserCheck,
  guestApp: Smartphone,
  voice: PhoneCall,
  keys: KeyRound,
  housekeeping: BedDouble,
  reviews: Star,
  campaigns: Megaphone,
  loyalty: Heart,
  aiAgent: Bot,
  events: CalendarDays,
  b2b: Briefcase,
};

/** Configurateur : le CRM au centre, les modules autour, la formule conseillée en direct. */
export function OfferBuilder({ plans }: { plans: DisplayPlan[] }) {
  const t = useTranslations('home2.builder');
  const nav = useTranslations('nav');
  const tp = useTranslations('pricing.plans');
  const [selected, setSelected] = useState<BuilderModuleKey[]>(['upsell']);

  const toggle = (key: BuilderModuleKey) =>
    setSelected((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]));

  const choice = recommendPlan(selected);
  const plan = plans.find((p) => p.key === choice);
  const name = (key: BuilderModuleKey) => (key === 'aiAgent' ? t('aiAgent.name') : nav(`items.${key}`));
  const description = (key: BuilderModuleKey) => (key === 'aiAgent' ? t('aiAgent.description') : nav(`descriptions.${key}`));
  const leftOn = BUILDER_COLUMNS[0].some((k) => selected.includes(k));
  const rightOn = BUILDER_COLUMNS[1].some((k) => selected.includes(k));
  const extras = selected.filter((key) => !TWO_WAY_BUNDLE.includes(key)).length;

  const column = (keys: BuilderModuleKey[], side: 'left' | 'right') => (
    <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
      {keys.map((key, i) => {
        const on = selected.includes(key);
        // Rail vertical : le tronçon entre ce module et son voisin côté centre ne s'allume
        // que si un module choisi se trouve sur ce chemin (jamais toute la colonne).
        const mid = (keys.length - 1) / 2;
        const railOn = i < mid ? keys.slice(0, i + 1).some((k) => selected.includes(k)) : keys.slice(i).some((k) => selected.includes(k));
        const Icon = ICONS[key];
        return (
          <li key={key} className="relative">
            <button
              type="button"
              aria-pressed={on}
              onClick={() => toggle(key)}
              className={cn(
                'flex w-full items-center gap-3 rounded-lg border bg-white px-3 py-2.5 text-left transition-all duration-200',
                on ? 'border-accent shadow-[0_0_0_3px_rgba(0,111,104,0.10)]' : 'border-line hover:border-ink-3/40',
                side === 'right' && 'lg:flex-row-reverse lg:text-right'
              )}
            >
              <span className={cn('flex h-8 w-8 shrink-0 items-center justify-center rounded-md transition-colors', on ? 'bg-accent text-white' : 'bg-paper text-ink-3')}>
                {on ? <Check aria-hidden className="h-4 w-4" /> : <Icon aria-hidden className="h-4 w-4" />}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[14px] font-semibold leading-tight text-ink">{name(key)}</span>
                <span className="mt-0.5 block truncate text-[12.5px] text-ink-3">{description(key)}</span>
              </span>
            </button>
            {/* Liaison vers le CRM, allumée quand le module est choisi */}
            <span
              aria-hidden
              className={cn(
                'absolute top-1/2 hidden h-px w-12 transition-colors lg:block',
                side === 'left' ? '-right-12' : '-left-12',
                on ? 'bg-accent' : 'bg-line'
              )}
            />
            {i !== mid && (
              <span
                aria-hidden
                className={cn(
                  'absolute hidden h-[calc(100%+0.5rem)] w-px transition-colors lg:block',
                  side === 'left' ? '-right-12' : '-left-12',
                  i < mid ? 'top-1/2' : 'bottom-1/2',
                  railOn ? 'bg-accent' : 'bg-line'
                )}
              />
            )}
          </li>
        );
      })}
    </ul>
  );

  return (
    <div>
      <div className="grid gap-8 lg:grid-cols-[1fr_300px_1fr] lg:gap-12">
        <div className="order-2 lg:order-1">{column(BUILDER_COLUMNS[0], 'left')}</div>

        {/* La brique centrale */}
        <div className="relative order-1 flex items-center lg:order-2">
          {/* Liaisons des rails vers le CRM */}
          <span aria-hidden className={cn('absolute left-0 top-1/2 hidden h-px w-6 transition-colors lg:block', leftOn ? 'bg-accent' : 'bg-line')} />
          <span aria-hidden className={cn('absolute right-0 top-1/2 hidden h-px w-6 transition-colors lg:block', rightOn ? 'bg-accent' : 'bg-line')} />
          <div className="relative w-full rounded-2xl bg-ink lg:mx-6 p-7 text-white shadow-product">
            <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-mint">{t('hubLabel')}</span>
            <p className="mt-3 flex items-center gap-2 text-[28px] font-medium tracking-[-0.02em]">
              <Sparkles aria-hidden className="h-6 w-6 text-mint" />
              {t('hubTitle')}
            </p>
            <ul className="mt-5 space-y-2">
              {(t.raw('hubItems') as string[]).map((item) => (
                <li key={item} className="flex items-center gap-2 text-[14px] text-white/85">
                  <Check aria-hidden className="h-4 w-4 shrink-0 text-mint" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-6 border-t border-white/10 pt-4 font-mono text-[11px] uppercase tracking-[0.06em] text-white/60">
              {t('selectedCount', { count: selected.length })}
            </p>
          </div>
        </div>

        <div className="order-3">{column(BUILDER_COLUMNS[1], 'right')}</div>
      </div>

      {/* La formule conseillée */}
      <div aria-live="polite" className="mt-10 flex flex-col gap-6 rounded-2xl border border-accent bg-white p-6 shadow-[0_0_0_4px_rgba(0,111,104,0.08)] md:flex-row md:items-center md:justify-between md:p-8">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-accent">{t('resultLabel')}</p>
          <p className="mt-2 flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="text-[28px] font-medium tracking-[-0.02em] text-ink">{tp(`${choice}.name`)}</span>
            {plan && (
              <span className="text-[20px] font-medium tabular-nums text-ink">
                {plan.price} € <span className="text-[13px] font-normal text-ink-3">{t('perMonth')}</span>
              </span>
            )}
          </p>
          <p className="mt-2 max-w-xl text-[14.5px] leading-relaxed text-ink-2">{t(`why.${choice}`, { count: selected.length, extras })}</p>
        </div>
        <div className="flex shrink-0 flex-col gap-2 sm:flex-row md:flex-col lg:flex-row">
          <DsButton href={brand.demoPage} variant="primary">
            {t('cta')}
          </DsButton>
          {selected.length > 0 && (
            <button type="button" onClick={() => setSelected([])} className="px-3 py-2 text-[13px] text-ink-3 underline-offset-2 hover:text-ink hover:underline">
              {t('reset')}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
