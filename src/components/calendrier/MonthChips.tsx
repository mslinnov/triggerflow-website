import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui';
import type { CalendarMonth } from '@/data/calendrier-marketing';
import { cn } from '@/lib/utils';

interface MonthChipsProps {
  months: CalendarMonth[];
  /** Position collante sous l'en-tête fixe du site (dépend du bandeau tarifaire). */
  stickyTopClass: string;
}

/** Puces des mois, collées sous l'en-tête ; défilement horizontal sur mobile. */
export function MonthChips({ months, stickyTopClass }: MonthChipsProps) {
  const t = useTranslations('calendrierMarketing.nav');

  return (
    <nav aria-label={t('label')} className={cn('sticky z-30 border-b border-border-light bg-white/95 backdrop-blur', stickyTopClass)}>
      <Container className="px-0 sm:px-6">
        <ul className="flex gap-2 overflow-x-auto px-4 py-3 [scrollbar-width:none] sm:px-0">
          {months.map((month) => (
            <li key={month.id} className="shrink-0">
              <a
                href={`#${month.id}`}
                className="inline-flex rounded-full border border-border-light bg-white px-3.5 py-1.5 text-sm font-medium text-text-primary transition-colors hover:border-brand-primary hover:text-brand-primary"
              >
                {month.chip}
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </nav>
  );
}
