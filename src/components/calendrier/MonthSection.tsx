import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui';
import type { CalendarMonth, KeyDate } from '@/data/calendrier-marketing';
import { formatDateShort, toPlainText } from '@/lib/calendrier';
import { cn } from '@/lib/utils';
import { TempsFortCard } from './TempsFortCard';

interface MonthSectionProps {
  month: CalendarMonth;
  /** Marge de défilement des ancres : en-tête fixe du site + barre des mois. */
  scrollMarginClass: string;
  muted?: boolean;
}

function formatKeyDate(k: KeyDate): string {
  if (!k.end) return formatDateShort(k.start);
  // Vacances : de la fin des cours au jour de la reprise, comme le calendrier officiel.
  return `${formatDateShort(k.start)} au ${formatDateShort(k.end)}${k.school ? ' (reprise)' : ''}`;
}

export function MonthSection({ month, scrollMarginClass, muted }: MonthSectionProps) {
  const t = useTranslations('calendrierMarketing.month');

  return (
    <section
      id={month.id}
      aria-labelledby={`${month.id}-titre`}
      className={cn('py-10 md:py-14', muted ? 'bg-surface-secondary' : 'bg-white', scrollMarginClass)}
    >
      <Container>
        <div className="grid gap-6 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-10">
          <div>
            <h2 id={`${month.id}-titre`} className="font-serif text-3xl font-bold tracking-tight text-text-primary">
              {month.title}
            </h2>
            <h3 className="mt-4 text-xs font-semibold uppercase tracking-wider text-text-muted">{t('keyDates')}</h3>
            <ul className="mt-2 space-y-2">
              {month.keyDates.map((k) => (
                <li key={`${k.start}-${k.label}-${k.note ?? ''}`} className="text-sm">
                  <span className="font-semibold text-brand-primary">{formatKeyDate(k)}</span>
                  <span className="block text-text-primary">
                    {k.label}
                    {k.note && <span className="text-text-muted"> · {toPlainText(k.note)}</span>}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            {month.campaigns.map((campaign) => (
              <TempsFortCard key={campaign.id} campaign={campaign} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
