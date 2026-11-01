'use client';

import { ArrowRight } from 'lucide-react';
import { trackCalendarEvent } from '@/lib/calendrier-tracking';
import { cn } from '@/lib/utils';

interface ActivateLinkProps {
  href: string;
  /** Code du temps fort, envoyé à GA4 (`calendar_activate`). */
  tempsFort: string;
  /** `page` : vers la page « Activer » du site ; `app` : lien profond de l'app. */
  destination: 'page' | 'app';
  /** Thème du modèle ouvert dans l'app, envoyé à GA4. */
  theme?: string;
  /** `button` : bouton à bordure ; `link` : lien texte, plus discret. */
  variant?: 'button' | 'link';
  className?: string;
  children: React.ReactNode;
}

/** Lien « Activer dans TriggerFlow », compté dans GA4 avant la navigation. */
export function ActivateLink({ href, tempsFort, destination, theme, variant = 'button', className, children }: ActivateLinkProps) {
  return (
    <a
      href={href}
      onClick={() => trackCalendarEvent('calendar_activate', { temps_fort: tempsFort, destination, theme })}
      className={cn(
        variant === 'button'
          ? 'inline-flex w-full items-center justify-center gap-2 rounded-full border border-brand-primary px-5 py-3 text-sm font-semibold text-brand-primary transition-colors hover:bg-brand-light focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 sm:w-auto'
          : 'inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-brand-primary underline-offset-4 hover:underline focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2',
        className,
      )}
    >
      {children}
      <ArrowRight className="h-4 w-4" aria-hidden="true" />
    </a>
  );
}
