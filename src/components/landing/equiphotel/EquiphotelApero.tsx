import { useTranslations } from 'next-intl';
import { CalendarPlus, Wine } from 'lucide-react';
import { Container } from '@/components/ui';
import { EQUIPHOTEL } from '@/data/equiphotel';
import { ShowWhen } from './ShowWhen';

export function EquiphotelApero() {
  const t = useTranslations('equiphotel.apero');

  return (
    <ShowWhen until={EQUIPHOTEL.apero.endsAt}>
      <section className="bg-surface-tertiary py-8 md:py-10">
        <Container>
          <div className="flex flex-col gap-5 rounded-3xl bg-brand-accent-light p-6 ring-1 ring-brand-accent md:flex-row md:items-center md:justify-between md:p-8">
            <div className="flex gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-accent text-brand-dark">
                <Wine className="h-6 w-6" aria-hidden="true" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-brand-primary">
                  {t('badge')}
                </p>
                <h2 className="mt-1 text-xl font-bold text-text-primary md:text-2xl">{t('title')}</h2>
                <p className="mt-2 max-w-2xl text-text-secondary">{t('text')}</p>
              </div>
            </div>
            <a
              href={EQUIPHOTEL.apero.icsPath}
              download
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-brand-dark px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-dark/90"
            >
              <CalendarPlus className="h-4 w-4" aria-hidden="true" />
              {t('cta')}
            </a>
          </div>
        </Container>
      </section>
    </ShowWhen>
  );
}
