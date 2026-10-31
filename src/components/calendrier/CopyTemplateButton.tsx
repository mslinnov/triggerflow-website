'use client';

import { useEffect, useRef, useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CopyTemplateButtonProps {
  /** Texte à copier, déjà dans la page (modèle texte)… */
  text?: string;
  /** …ou adresse du fichier à copier, récupéré au clic (MJML, HTML). */
  url?: string;
  /** Code du temps fort, envoyé à GA4 (`calendar_copy`). */
  tempsFort: string;
  format: 'text' | 'mjml' | 'html';
  labels: { copy: string; copied: string; fallback: string };
  variant?: 'primary' | 'secondary';
}

async function fetchText(url: string): Promise<string> {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.text();
}

/**
 * Copie un modèle dans le presse-papier.
 *
 * Pour un fichier, la copie part avec un `ClipboardItem` dont le contenu est une
 * promesse : Safari exige que l'écriture commence pendant le clic, avant la fin du
 * téléchargement. Navigateur sans `ClipboardItem` : téléchargement puis `writeText`.
 * En cas de refus (permission, contexte non sécurisé), le texte s'affiche dans une
 * zone sélectionnée : le visiteur le copie lui-même.
 */
export function CopyTemplateButton({ text, url, tempsFort, format, labels, variant = 'primary' }: CopyTemplateButtonProps) {
  const [state, setState] = useState<'idle' | 'copied' | 'fallback'>('idle');
  const [fallbackText, setFallbackText] = useState('');
  const fallbackRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (state === 'fallback') fallbackRef.current?.select();
    if (state !== 'copied') return;
    const timer = window.setTimeout(() => setState('idle'), 2500);
    return () => window.clearTimeout(timer);
  }, [state]);

  async function copy(): Promise<void> {
    if (text !== undefined) return navigator.clipboard.writeText(text);
    if (!url) throw new Error('rien à copier');
    if (typeof ClipboardItem !== 'undefined' && navigator.clipboard?.write) {
      const blob = fetchText(url).then((value) => new Blob([value], { type: 'text/plain' }));
      return navigator.clipboard.write([new ClipboardItem({ 'text/plain': blob })]);
    }
    return navigator.clipboard.writeText(await fetchText(url));
  }

  async function handleClick() {
    window.gtag?.('event', 'calendar_copy', { temps_fort: tempsFort, format });
    try {
      await copy();
      setState('copied');
    } catch {
      try {
        setFallbackText(text ?? (url ? await fetchText(url) : ''));
        setState('fallback');
      } catch {
        setState('idle');
      }
    }
  }

  return (
    <div className="w-full sm:w-auto">
      <button
        type="button"
        onClick={handleClick}
        className={cn(
          'inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 sm:w-auto',
          variant === 'primary'
            ? 'bg-brand-primary text-white shadow-md shadow-brand-primary/20 hover:bg-brand-primary/90'
            : 'bg-brand-dark text-white hover:bg-brand-dark/90',
        )}
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
            value={fallbackText}
            rows={10}
            className="mt-2 w-full rounded-xl border border-border-default bg-surface-secondary p-3 font-mono text-xs text-text-primary"
          />
        </div>
      )}
    </div>
  );
}
