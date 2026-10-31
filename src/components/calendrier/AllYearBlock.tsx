import { useTranslations } from 'next-intl';
import { ButtonLink, Container } from '@/components/ui';
import { ALL_YEAR } from '@/data/calendrier-marketing';

interface AllYearBlockProps {
  demoUrl: string;
}

export function AllYearBlock({ demoUrl }: AllYearBlockProps) {
  const t = useTranslations('calendrierMarketing.allYear');

  return (
    <section id="toute-l-annee" className="bg-brand-light py-16 md:py-24">
      <Container>
        <div className="max-w-2xl">
          <h2 className="font-serif text-3xl font-bold tracking-tight text-text-primary md:text-4xl">{t('title')}</h2>
          <p className="mt-4 text-lg text-text-secondary">{t('subtitle')}</p>
        </div>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ALL_YEAR.map((item) => (
            <li key={item.id} className="rounded-2xl border border-border-light bg-white p-5 shadow-sm">
              <span className="inline-flex rounded-full bg-brand-accent-light px-3 py-1 text-xs font-semibold text-brand-dark">
                {item.when}
              </span>
              <h3 className="mt-3 text-lg font-semibold text-text-primary">{item.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-text-secondary">{item.text}</p>
            </li>
          ))}
        </ul>
        <ButtonLink href={demoUrl} target="_blank" rel="noopener noreferrer" className="mt-10">
          {t('cta')}
        </ButtonLink>
      </Container>
    </section>
  );
}
