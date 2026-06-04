import type {
  HTMLAttributes,
  TdHTMLAttributes,
  ThHTMLAttributes,
} from 'react';
import { cn } from '@/lib/utils';

/**
 * Composants de tableau pour les pages légales rendues en MDX.
 *
 * Le contenu légal contient de nombreux tableaux (bases légales, sous-traitants,
 * durées de conservation, cookies…). Le plugin `prose` ne gère pas le débordement
 * horizontal sur mobile et son rendu reste générique : on remplace donc les
 * éléments de tableau par des composants maîtrisés, sortis du flux `prose`
 * (`not-prose`) et enveloppés dans un conteneur scrollable.
 */

export function LegalTable({
  className,
  ...props
}: HTMLAttributes<HTMLTableElement>) {
  return (
    <div className="not-prose my-8 overflow-x-auto rounded-xl border border-zinc-200">
      <table
        className={cn(
          'w-full border-collapse text-left text-sm text-zinc-700',
          className
        )}
        {...props}
      />
    </div>
  );
}

export function LegalThead({
  className,
  ...props
}: HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <thead
      className={cn('bg-zinc-50 text-brand-dark', className)}
      {...props}
    />
  );
}

export function LegalTr({
  className,
  ...props
}: HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr
      className={cn(
        'border-b border-zinc-200 last:border-0 even:bg-zinc-50/40',
        className
      )}
      {...props}
    />
  );
}

export function LegalTh({
  className,
  ...props
}: ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th
      scope="col"
      className={cn(
        'whitespace-nowrap px-4 py-3 text-xs font-semibold uppercase tracking-wide',
        className
      )}
      {...props}
    />
  );
}

export function LegalTd({
  className,
  ...props
}: TdHTMLAttributes<HTMLTableCellElement>) {
  return (
    <td
      className={cn('px-4 py-3 align-top leading-relaxed', className)}
      {...props}
    />
  );
}
