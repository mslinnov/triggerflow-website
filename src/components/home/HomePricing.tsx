import { useTranslations } from 'next-intl';
import { Check } from 'lucide-react';
import { Container, DsButton, Section, SectionHeader } from '@/components/ds';
import { cn } from '@/lib/utils';
import { brand } from '@/data/brand';
import type { DisplayPlan } from '@/data/pricing';

export function HomePricing({ plans }: { plans: DisplayPlan[] }) {
  const t = useTranslations('home2.pricing');
  const tp = useTranslations('pricing.plans');
  return (
    <Section tone="paper">
      <Container>
        <SectionHeader eyebrow={t('eyebrow')} title={t('title')} titleMuted={t('titleMuted')} align="left" />
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan) => {
            const free = plan.price === '0';
            return (
              <div key={plan.key} className={cn('flex flex-col rounded-xl border bg-white p-6', plan.popular ? 'border-accent shadow-[0_0_0_3px_rgba(0,111,104,0.10)]' : 'border-line')}>
                <div className="flex items-center justify-between">
                  <p className="font-mono text-[12px] font-medium uppercase tracking-[0.08em] text-ink-2">{tp(`${plan.key}.name`)}</p>
                  {plan.popular && <span className="rounded-full bg-mint px-2 py-0.5 text-[11px] font-medium text-ink">{tp(`${plan.key}.badge`)}</span>}
                </div>
                <p className="mt-5 flex items-baseline gap-1">
                  <span className="text-[2.5rem] font-medium leading-none tracking-[-0.03em] tabular-nums text-ink">{plan.price} €</span>
                </p>
                <p className="mt-2 text-[12.5px] text-ink-3">{t('perMonth')}</p>
                {plan.upcomingPrice && <p className="mt-1 text-[12.5px] text-ink-3">{t('then', { price: plan.upcomingPrice })}</p>}
                <p className="mt-5 flex-1 text-[14.5px] leading-relaxed text-ink-2">{tp(`${plan.key}.description`)}</p>
                <p className="mt-4 flex items-center gap-1.5 text-[13px] text-ink-3">
                  <Check aria-hidden className="h-3.5 w-3.5 text-accent" /> {tp(`${plan.key}.trial`)}
                </p>
                <DsButton href={brand.demoUrl} variant={plan.popular ? 'primary' : 'secondary'} size="sm" className="mt-6 w-full">
                  {free ? t('startFree') : t('startTrial')}
                </DsButton>
              </div>
            );
          })}
        </div>
        <DsButton href="/tarifs" variant="link" arrow className="mt-8">
          {t('compare')}
        </DsButton>
      </Container>
    </Section>
  );
}
