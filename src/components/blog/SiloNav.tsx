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
          'rounded-full border px-4 py-1.5 text-[14px] font-medium transition-colors duration-150',
          !activeSilo
            ? 'border-ink bg-ink text-white'
            : 'border-line bg-white text-ink-2 hover:border-accent hover:text-accent'
        )}
      >
        {allLabel}
      </Link>
      {silos.map((silo) => (
        <Link
          key={silo.id}
          href={`/blog/${silo.slug}`}
          className={cn(
            'rounded-full border px-4 py-1.5 text-[14px] font-medium transition-colors duration-150',
            activeSilo === silo.slug
              ? 'border-ink bg-ink text-white'
              : 'border-line bg-white text-ink-2 hover:border-accent hover:text-accent'
          )}
        >
          {siloName(silo, locale)}
        </Link>
      ))}
    </nav>
  );
}
