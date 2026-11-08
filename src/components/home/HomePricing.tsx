import { useTranslations } from 'next-intl';
import { Check } from 'lucide-react';
import { Container, DsButton, Section, SectionHeader } from '@/components/ds';
import { cn } from '@/lib/utils';
import { brand } from '@/data/brand';
import type { DisplayPlan } from '@/data/pricing';
import { OfferBuilder } from './OfferBuilder';

/** Le configurateur d'offre (CRM au centre, modules autour), puis les trois formules. */
export function HomePricing({ plans }: { plans: DisplayPlan[] }) {
  const t = useTranslations('home2.pricing');
  const tb = useTranslations('home2.builder');
  const tp = useTranslations('pricing.plans');
  const tpr = useTranslations('pricing');
  return (
    <Section tone="paper" id="tarifs">
      <Container>
        <SectionHeader eyebrow={tb('eyebrow')} title={tb('title')} titleMuted={tb('titleMuted')} subtitle={tb('subtitle')} align="left" />
        <div className="mt-12">
          <OfferBuilder />
        </div>

        {/* Transition : le CRM « descend » vers les formules */}
        <div aria-hidden className="mx-auto hidden h-14 w-px bg-gradient-to-b from-ink/40 to-accent lg:block" />
        <div className="mt-12 text-center lg:mt-0">
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-white px-4 py-1.5 font-mono text-[11.5px] uppercase tracking-[0.08em] text-accent">
            {tb('plansTitle')}
          </span>
          <p className="mx-auto mt-3 max-w-xl text-[15px] text-ink-2">{tb('plansText')}</p>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {plans.map((plan) => (
            <div key={plan.key} className={cn('flex flex-col rounded-xl border bg-white p-6', plan.popular ? 'border-accent shadow-[0_0_0_3px_rgba(0,111,104,0.10)]' : 'border-line')}>
              <div className="flex items-center justify-between">
                <p className="font-mono text-[12px] font-medium uppercase tracking-[0.08em] text-ink-2">{tp(`${plan.key}.name`)}</p>
                {plan.popular && <span className="rounded-full bg-mint px-2 py-0.5 text-[11px] font-medium text-ink">{tp(`${plan.key}.badge`)}</span>}
              </div>
              <p className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-md bg-mint/50 px-2.5 py-1 text-[12.5px] font-medium text-accent-hover">
                {tb(`included.${plan.key}`)}
              </p>
              <p className="mt-4 text-[2.5rem] font-medium leading-none tracking-[-0.03em] tabular-nums text-ink">{plan.price} €</p>
              <p className="mt-2 text-[12.5px] text-ink-3">{t('perMonth')}</p>
              <p className="mt-5 text-[14.5px] leading-relaxed text-ink-2">{tp(`${plan.key}.description`)}</p>
              <ul className="mt-5 flex-1 space-y-2">
                {(tp.raw(`${plan.key}.includes`) as string[]).map((item) => (
                  <li key={item} className="flex gap-2 text-[14px] text-ink">
                    <Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    {item}
                  </li>
                ))}
              </ul>
              <DsButton href={brand.demoPage} variant={plan.popular ? 'primary' : 'secondary'} size="sm" className="mt-6 w-full">
                {t('startFree')}
              </DsButton>
            </div>
          ))}
        </div>
        <p className="mt-4 text-[13px] text-ink-3">{tpr('addons.subtitle')}</p>
        <DsButton href="/tarifs" variant="link" arrow className="mt-6">
          {t('compare')}
        </DsButton>
      </Container>
    </Section>
  );
}
