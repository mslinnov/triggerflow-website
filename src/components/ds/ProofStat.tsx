import { cn } from '@/lib/utils';

interface ProofStatProps {
  value: string;
  label: string;
  source?: string;
  onDark?: boolean;
  className?: string;
}

/** Chiffre de preuve : valeur en mono, libellé, source en petit. Valeur toujours rendue côté serveur. */
export function ProofStat({ value, label, source, onDark, className }: ProofStatProps) {
  return (
    <div className={cn('flex flex-col', className)}>
      <span className={cn('text-[2.5rem] font-medium leading-none tracking-[-0.03em] tabular-nums md:text-[3.5rem]', onDark ? 'text-white' : 'text-ink')}>
        {value}
      </span>
      <span className={cn('mt-3 text-base', onDark ? 'text-white/80' : 'text-ink-2')}>{label}</span>
      {source && <span className={cn('mt-1 font-mono text-[11px] uppercase tracking-[0.06em]', onDark ? 'text-white/45' : 'text-ink-3')}>{source}</span>}
    </div>
  );
}
