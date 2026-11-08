import { useLocale, useTranslations } from 'next-intl';
import { RefreshCw, Users } from 'lucide-react';
import { Container, LogoMotif, ProofStat, SectionHeader } from '@/components/ds';
import { ReliabilityScenario } from '@/components/visuals';
import { stat, type StatId } from '@/data/company-stats';
import { HomeIntegrations } from './HomeIntegrations';

const STATS: StatId[] = ['messages', 'whatsappRead', 'paidWithin2h'];

export function HomeReliability() {
  const t = useTranslations('home2.reliability');
  const locale = useLocale();
  return (
    <section className="relative overflow-hidden bg-ink py-20 text-white md:py-32">
      <LogoMotif className="pointer-events-none absolute -right-48 -top-32 h-[520px] w-[520px] text-white/[0.03]" />
      <Container className="relative">
        <SectionHeader eyebrow={t('eyebrow')} title={t('title')} titleMuted={t('titleMuted')} align="left" onDark />
        <div className="mt-14 grid gap-10 border-t border-white/10 pt-10 sm:grid-cols-3">
          {STATS.map((id) => (
            <ProofStat key={id} value={stat(id, locale)} label={t(`stats.${id}`)} source={id === 'messages' ? undefined : t('source')} onDark />
          ))}
        </div>
        <div className="mt-20 grid items-center gap-12 lg:grid-cols-2">
          <div className="space-y-10">
            <div>
              <p className="flex items-center gap-2 text-lg font-semibold">
                <RefreshCw aria-hidden className="h-5 w-5 text-mint" strokeWidth={1.75} />
                {t('syncTitle')}
              </p>
              <p className="mt-3 max-w-md text-[16px] leading-relaxed text-white/85">{t('syncText')}</p>
            </div>
            <div>
              <p className="flex items-center gap-2 text-lg font-semibold">
                <Users aria-hidden className="h-5 w-5 text-mint" strokeWidth={1.75} />
                {t('dedupTitle')}
              </p>
              <p className="mt-3 max-w-md text-[16px] leading-relaxed text-white/85">{t('dedupText')}</p>
            </div>
          </div>
          <ReliabilityScenario />
        </div>
        <HomeIntegrations />
      </Container>
    </section>
  );
}
