'use client';

import { useEffect, useRef, useState } from 'react';
import { Check, Copy } from 'lucide-react';

interface CopyTemplateButtonProps {
  /** Texte complet du modèle (objet, pré-en-tête, corps, bouton). */
  text: string;
  /** Code du temps fort, envoyé à GA4 (`calendar_copy`). */
  tempsFort: string;
  labels: { copy: string; copied: string; fallback: string };
}

/**
 * Copie le modèle dans le presse-papier. Si le navigateur refuse (contexte non
 * sécurisé, permission refusée, navigateur ancien), le texte s'affiche dans une
 * zone sélectionnée : le visiteur le copie lui-même.
 */
export function CopyTemplateButton({ text, tempsFort, labels }: CopyTemplateButtonProps) {
  const [state, setState] = useState<'idle' | 'copied' | 'fallback'>('idle');
  const fallbackRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (state === 'fallback') fallbackRef.current?.select();
    if (state !== 'copied') return;
    const timer = window.setTimeout(() => setState('idle'), 2500);
    return () => window.clearTimeout(timer);
  }, [state]);

  async function handleClick() {
    window.gtag?.('event', 'calendar_copy', { temps_fort: tempsFort });
    try {
      await navigator.clipboard.writeText(text);
      setState('copied');
    } catch {
      setState('fallback');
    }
  }

  return (
    <div className="w-full sm:w-auto">
      <button
        type="button"
        onClick={handleClick}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-primary px-5 py-3 text-sm font-semibold text-white shadow-md shadow-brand-primary/20 transition-colors hover:bg-brand-primary/90 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 sm:w-auto"
      >
        {state === 'copied' ? <Check className="h-4 w-4" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
        {state === 'copied' ? labels.copied : labels.copy}
      </button>
      <span className="sr-only" role="status">
        {state === 'copied' ? labels.copied : ''}
      </span>
      {state === 'fallback' && (
        <div className="mt-3">
          <p className="text-sm text-text-secondary">{labels.fallback}</p>
          <textarea
            ref={fallbackRef}
            readOnly
            value={text}
            rows={10}
            className="mt-2 w-full rounded-xl border border-border-default bg-surface-secondary p-3 font-mono text-xs text-text-primary"
          />
        </div>
      )}
    </div>
  );
}
