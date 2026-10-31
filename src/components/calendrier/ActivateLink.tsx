'use client';

import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ActivateLinkProps {
  href: string;
  /** Code du temps fort, envoyé à GA4 (`calendar_activate`). */
  tempsFort: string;
  /** `page` : vers la page « Activer » du site ; `app` : lien profond de l'app. */
  destination: 'page' | 'app';
  className?: string;
  children: React.ReactNode;
}

/** Lien « Activer dans TriggerFlow », compté dans GA4 avant la navigation. */
export function ActivateLink({ href, tempsFort, destination, className, children }: ActivateLinkProps) {
  return (
    <a
      href={href}
      onClick={() => window.gtag?.('event', 'calendar_activate', { temps_fort: tempsFort, destination })}
      className={cn(
        'inline-flex w-full items-center justify-center gap-2 rounded-full border border-brand-primary px-5 py-3 text-sm font-semibold text-brand-primary transition-colors hover:bg-brand-light focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 sm:w-auto',
        className,
      )}
    >
      {children}
      <ArrowRight className="h-4 w-4" aria-hidden="true" />
    </a>
  );
}
