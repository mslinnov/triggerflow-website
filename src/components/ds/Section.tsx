import { cn } from '@/lib/utils';

export type SectionTone = 'white' | 'paper' | 'dark';

interface SectionProps {
  children: React.ReactNode;
  tone?: SectionTone;
  id?: string;
  className?: string;
  /** Espacement réduit (barres de preuves, bandeaux). */
  compact?: boolean;
  'aria-labelledby'?: string;
}

const tones: Record<SectionTone, string> = {
  white: 'bg-white text-ink',
  paper: 'bg-paper text-ink',
  dark: 'bg-ink text-white',
};

/** Section de page : 80 px mobile, 128 px desktop (charte). */
export function Section({ children, tone = 'white', id, className, compact, ...rest }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(tones[tone], compact ? 'py-12 md:py-16' : 'py-20 md:py-32', 'relative', className)}
      {...rest}
    >
      {children}
    </section>
  );
}
