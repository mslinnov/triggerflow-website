import { useTranslations } from 'next-intl';
import { ArrowDown, CalendarDays, MapPin } from 'lucide-react';
import { Container } from '@/components/ui';
import { EQUIPHOTEL } from '@/data/equiphotel';
import { ShowWhen } from './ShowWhen';

export function EquiphotelHero() {
  const t = useTranslations('equiphotel.hero');

  return (
    <section className="relative overflow-hidden bg-surface-dark text-text-on-dark">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-brand-primary/40 blur-3xl"
      />

      <Container className="relative">
        <div className="grid gap-10 py-12 md:py-20 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-16">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm font-medium text-brand-light">
              <span className="h-2 w-2 rounded-full bg-brand-accent" aria-hidden="true" />
              <ShowWhen until={EQUIPHOTEL.startsAt}>{t('eyebrowBefore')}</ShowWhen>
              <ShowWhen from={EQUIPHOTEL.startsAt} until={EQUIPHOTEL.endsAt}>
                {t('eyebrowDuring')}
              </ShowWhen>
              <ShowWhen from={EQUIPHOTEL.endsAt}>{t('eyebrowAfter')}</ShowWhen>
            </p>

            <h1 className="mt-6 text-4xl font-bold uppercase leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              {t('titleLine1')}
              <br />
              <span className="text-brand-light">{t('titleLine2')}</span>
              <br />
              {t('titleLine3')}
            </h1>

            <p className="mt-6 max-w-xl border-l-4 border-brand-primary pl-4 text-lg leading-relaxed text-white/80">
              <ShowWhen until={EQUIPHOTEL.endsAt}>{t('subtitle')}</ShowWhen>
              <ShowWhen from={EQUIPHOTEL.endsAt}>{t('subtitleAfter')}</ShowWhen>
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#guides"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-accent px-6 py-3.5 font-semibold text-brand-dark transition-colors hover:bg-brand-accent/90"
              >
                {t('ctaGuides')}
                <ArrowDown className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href="#rdv"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-6 py-3.5 font-semibold text-white transition-colors hover:bg-white/10"
              >
                {t('ctaRdv')}
              </a>
            </div>
          </div>

          <ShowWhen until={EQUIPHOTEL.endsAt}>
            <div className="rounded-3xl bg-white p-6 text-text-primary shadow-xl lg:w-80">
              <p className="text-xs font-semibold uppercase tracking-widest text-brand-primary">
                {t('card.label')}
              </p>
              <div className="mt-4 flex items-end justify-between gap-4 border-b border-border-light pb-4">
                <div>
                  <p className="text-sm text-text-muted">{t('card.stand')}</p>
                  <p className="text-5xl font-bold tracking-tight">{EQUIPHOTEL.stand}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-text-muted">{t('card.hall')}</p>
                  <p className="text-3xl font-bold tracking-tight text-brand-primary">{EQUIPHOTEL.hall}</p>
                </div>
              </div>
              <ul className="mt-4 space-y-2 text-sm text-text-secondary">
                <li className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 shrink-0 text-brand-primary" aria-hidden="true" />
                  {t('card.dates')}
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 shrink-0 text-brand-primary" aria-hidden="true" />
                  {t('card.venue')}
                </li>
              </ul>
              <a
                href="#infos"
                className="mt-5 inline-flex text-sm font-semibold text-brand-primary underline-offset-4 hover:underline"
              >
                {t('card.cta')}
              </a>
            </div>
          </ShowWhen>
        </div>
      </Container>
    </section>
  );
}
