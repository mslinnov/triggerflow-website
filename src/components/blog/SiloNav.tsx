import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { getSilos } from '@/lib/blog';
import { siloName } from '@/data/silos';

interface SiloNavProps {
  activeSilo?: string;
  allLabel: string;
  locale: string;
}

export function SiloNav({ activeSilo, allLabel, locale }: SiloNavProps) {
  const silos = getSilos();

  return (
    <nav className="flex flex-wrap gap-2" aria-label="Blog categories">
      <Link
        href="/blog"
        className={cn(
          'rounded-full border px-4 py-1.5 text-sm font-medium transition-all duration-200',
          !activeSilo
            ? 'border-brand-primary bg-brand-primary text-white'
            : 'border-gray-200 text-gray-600 hover:border-brand-primary hover:text-brand-primary'
        )}
      >
        {allLabel}
      </Link>
      {silos.map((silo) => (
        <Link
          key={silo.id}
          href={`/blog/${silo.slug}`}
          className={cn(
            'rounded-full border px-4 py-1.5 text-sm font-medium transition-all duration-200',
            activeSilo === silo.slug
              ? 'border-brand-primary bg-brand-primary text-white'
              : 'border-gray-200 text-gray-600 hover:border-brand-primary hover:text-brand-primary'
          )}
        >
          {siloName(silo, locale)}
        </Link>
      ))}
    </nav>
  );
}
