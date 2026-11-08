import { cn } from '@/lib/utils';

/**
 * Astérisque d'un prix d'entrée : au survol (ou au focus clavier), une bulle précise que c'est un prix
 * « à partir de », qui dépend du volume. Le texte est aussi lu par les lecteurs d'écran.
 */
export function FromPriceStar({ label, className }: { label: string; className?: string }) {
  return (
    <span tabIndex={0} className={cn('group/star relative inline-flex cursor-help align-super text-[0.7em] font-semibold text-accent outline-none', className)}>
      <span aria-hidden>*</span>
      <span className="sr-only">{label}</span>
      <span
        aria-hidden
        className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 w-52 -translate-x-1/2 rounded-lg bg-ink px-3 py-2 text-center text-[12px] font-normal leading-snug text-white opacity-0 shadow-lg transition-opacity group-hover/star:opacity-100 group-focus/star:opacity-100"
      >
        {label}
      </span>
    </span>
  );
}
