import { useTranslations } from 'next-intl';
import { ArrowRight, MapPin, Video } from 'lucide-react';
import { Container } from '@/components/ui';
import { EQUIPHOTEL, EQUIPHOTEL_BOOKING } from '@/data/equiphotel';
import { ShowWhen } from './ShowWhen';

export function EquiphotelBooking() {
  const t = useTranslations('equiphotel.rdv');

  return (
    <section id="rdv" className="scroll-mt-16 bg-white py-16 md:py-24">
      <Container>
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-primary">{t('eyebrow')}</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-text-primary md:text-4xl">{t('title')}</h2>
          <p className="mt-4 text-lg text-text-secondary">{t('subtitle')}</p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <ShowWhen until={EQUIPHOTEL.endsAt}>
            <article className="flex flex-col rounded-3xl bg-surface-dark p-7 text-white md:p-8">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-accent text-brand-dark">
                <MapPin className="h-6 w-6" aria-hidden="true" />
              </span>
              <p className="mt-6 text-xs font-semibold uppercase tracking-widest text-brand-light">
                {t('stand.badge')}
              </p>
              <h3 className="mt-2 text-2xl font-bold">{t('stand.title')}</h3>
              <p className="mt-3 flex-1 text-white/75">{t('stand.text')}</p>
              <a
                href={EQUIPHOTEL_BOOKING.stand}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-brand-accent px-6 py-3.5 font-semibold text-brand-dark transition-colors hover:bg-brand-accent/90"
              >
                {t('stand.cta')}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </a>
            </article>
          </ShowWhen>

          <article className="flex flex-col rounded-3xl bg-surface-secondary p-7 ring-1 ring-border-default md:p-8">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-primary text-white">
              <Video className="h-6 w-6" aria-hidden="true" />
            </span>
            <p className="mt-6 text-xs font-semibold uppercase tracking-widest text-brand-primary">
              {t('visio.badge')}
            </p>
            <h3 className="mt-2 text-2xl font-bold text-text-primary">{t('visio.title')}</h3>
            <p className="mt-3 flex-1 text-text-secondary">{t('visio.text')}</p>
            <a
              href={EQUIPHOTEL_BOOKING.visio}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-brand-primary px-6 py-3.5 font-semibold text-white transition-colors hover:bg-brand-primary/90"
            >
              {t('visio.cta')}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </a>
          </article>
        </div>
      </Container>
    </section>
  );
}
