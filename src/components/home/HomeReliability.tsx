import { useLocale, useTranslations } from 'next-intl';
import { RefreshCw, Users } from 'lucide-react';
import { Container, LogoMotif, ProofStat, SectionHeader } from '@/components/ds';
import { DedupScenario } from '@/components/visuals';
import { stat, type StatId } from '@/data/company-stats';

const STATS: StatId[] = ['emailDelivered', 'smsDelivered', 'paidWithin2h'];

export function HomeReliability() {
  const t = useTranslations('home2.reliability');
  const locale = useLocale();
  return (
    <section className="relative overflow-hidden bg-ink py-20 text-white md:py-32">
      <LogoMotif className="pointer-events-none absolute -right-40 -bottom-40 h-[560px] w-[560px] text-white/[0.025]" />
      <Container className="relative">
        <SectionHeader eyebrow={t('eyebrow')} title={t('title')} titleMuted={t('titleMuted')} align="left" onDark />
        <div className="mt-14 grid gap-10 border-t border-white/10 pt-10 sm:grid-cols-3">
          {STATS.map((id) => (
            <ProofStat key={id} value={stat(id, locale)} label={t(`stats.${id}`)} source={t('source')} onDark />
          ))}
        </div>
        <div className="mt-20 grid items-center gap-12 lg:grid-cols-2">
          <div className="space-y-10">
            <div>
              <p className="flex items-center gap-2 text-lg font-semibold">
                <RefreshCw aria-hidden className="h-5 w-5 text-mint" strokeWidth={1.75} />
                {t('syncTitle')}
              </p>
              <p className="mt-3 max-w-md text-[16px] leading-relaxed text-white/70">{t('syncText')}</p>
            </div>
            <div>
              <p className="flex items-center gap-2 text-lg font-semibold">
                <Users aria-hidden className="h-5 w-5 text-mint" strokeWidth={1.75} />
                {t('dedupTitle')}
              </p>
              <p className="mt-3 max-w-md text-[16px] leading-relaxed text-white/70">{t('dedupText')}</p>
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <DedupScenario onDark />
          </div>
        </div>
      </Container>
    </section>
  );
}
