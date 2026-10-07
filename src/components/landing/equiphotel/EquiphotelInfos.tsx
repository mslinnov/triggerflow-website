import { useTranslations } from 'next-intl';
import { CalendarDays, Clock, ExternalLink, MapPin, Store, TrainFront } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Container } from '@/components/ui';
import { EQUIPHOTEL } from '@/data/equiphotel';
import { ShowWhen } from './ShowWhen';

const rows: { key: 'where' | 'when' | 'hours' | 'address' | 'access'; icon: LucideIcon }[] = [
  { key: 'where', icon: Store },
  { key: 'when', icon: CalendarDays },
  { key: 'hours', icon: Clock },
  { key: 'address', icon: MapPin },
  { key: 'access', icon: TrainFront },
];

export function EquiphotelInfos() {
  const t = useTranslations('equiphotel.infos');

  return (
    <ShowWhen until={EQUIPHOTEL.endsAt}>
      <section id="infos" className="scroll-mt-16 bg-surface-tertiary py-16 md:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-brand-primary">{t('eyebrow')}</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-text-primary md:text-4xl">{t('title')}</h2>
              <a
                href={EQUIPHOTEL.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-dark px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-dark/90"
              >
                {t('mapsCta')}
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>

            <dl className="divide-y divide-border-light rounded-3xl bg-white px-6 shadow-[var(--shadow-sm)] ring-1 ring-border-light">
              {rows.map(({ key, icon: Icon }) => (
                <div key={key} className="flex gap-4 py-5">
                  <Icon className="mt-0.5 h-5 w-5 shrink-0 text-brand-primary" aria-hidden="true" />
                  <div>
                    <dt className="text-sm text-text-muted">{t(`${key}.label`)}</dt>
                    <dd className="mt-0.5 font-semibold text-text-primary">{t(`${key}.value`)}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </section>
    </ShowWhen>
  );
}
