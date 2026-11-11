import { cn } from '@/lib/utils';

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
}

interface TestimonialCardProps extends Testimonial {
  onDark?: boolean;
  className?: string;
}

function initials(name: string) {
  return name
    .split(/[\s-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join('');
}

/** Témoignage d'un vrai client (docs/preuves.md) : citation, puis nom, rôle, établissement. */
export function TestimonialCard({ quote, name, role, company, onDark, className }: TestimonialCardProps) {
  return (
    <figure
      className={cn(
        'flex h-full flex-col justify-between rounded-xl border p-7 md:p-8',
        onDark ? 'border-white/10 bg-white/[0.04]' : 'border-line bg-white',
        className
      )}
    >
      <blockquote className={cn('text-lg leading-relaxed md:text-[1.1875rem]', onDark ? 'text-white' : 'text-ink')}>
        <q>{quote}</q>
      </blockquote>
      <figcaption className="mt-8 flex items-center gap-3">
        <span
          aria-hidden
          className={cn(
            'flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-mono text-[13px] font-medium',
            onDark ? 'bg-mint text-ink' : 'bg-ink text-white'
          )}
        >
          {initials(name)}
        </span>
        <span className="flex flex-col">
          <span className={cn('text-[15px] font-semibold', onDark ? 'text-white' : 'text-ink')}>{name}</span>
          <span className={cn('text-sm', onDark ? 'text-white/60' : 'text-ink-3')}>
            {role}, {company}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}
