'use client';

import { useState } from 'react';
import type { MjmlTheme } from '@/data/calendrier-marketing';
import { cn } from '@/lib/utils';
import { CopyTemplateButton } from './CopyTemplateButton';
import { MjmlPreview } from './MjmlPreview';

export interface ThemeVariant {
  theme: MjmlTheme;
  subject: string;
  preheader: string;
}

interface ThemedMjmlTemplateProps {
  code: string;
  /** Thèmes livrés pour ce code, dans l'ordre d'affichage ; le premier est sélectionné. */
  variants: ThemeVariant[];
  variables: Record<string, string>;
  mode?: 'template' | 'example';
  /** Boutons « Copier le MJML / le HTML » sous l'aperçu (page calendrier), absents sur la page Activer. */
  withCopy?: boolean;
  labels: {
    subject: string;
    preheader: string;
    preview: string;
    frameTitle: string;
    themePicker: string;
    themeNames: Record<MjmlTheme, string>;
    copyMjml: string;
    copyHtml: string;
    copied: string;
    fallback: string;
  };
}

/**
 * Un modèle MJML décliné en thèmes (Élégant, Soirée, Éditorial) : pastilles de choix
 * (affichées dès que deux thèmes sont livrés), aperçu du thème choisi, et copie du
 * MJML ou du HTML de CE thème. Les fichiers restent servis à la demande par
 * /api/calendrier/modele/<code>/<format>?theme=<thème>.
 */
export function ThemedMjmlTemplate({ code, variants, variables, mode = 'template', withCopy = false, labels }: ThemedMjmlTemplateProps) {
  const [theme, setTheme] = useState<MjmlTheme>(variants[0].theme);
  const current = variants.find((v) => v.theme === theme) ?? variants[0];
  const fileUrl = (format: 'mjml' | 'html') => `/api/calendrier/modele/${code}/${format}?theme=${current.theme}`;
  const copyLabels = { copied: labels.copied, fallback: labels.fallback };

  return (
    <div className="space-y-3">
      {variants.length > 1 && (
        <div role="radiogroup" aria-label={labels.themePicker} className="flex flex-wrap gap-2">
          {variants.map(({ theme: value }) => (
            <button
              key={value}
              type="button"
              role="radio"
              aria-checked={value === current.theme}
              onClick={() => setTheme(value)}
              className={cn(
                'rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2',
                value === current.theme
                  ? 'border-brand-primary bg-brand-primary text-white'
                  : 'border-border-light bg-white text-text-primary hover:border-brand-primary hover:text-brand-primary',
              )}
            >
              {labels.themeNames[value]}
            </button>
          ))}
        </div>
      )}

      <MjmlPreview
        code={code}
        theme={current.theme}
        subject={current.subject}
        preheader={current.preheader}
        variables={variables}
        mode={mode}
        labels={{ subject: labels.subject, preheader: labels.preheader, preview: labels.preview, frameTitle: labels.frameTitle }}
      />

      {withCopy && (
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <CopyTemplateButton
            url={fileUrl('mjml')}
            tempsFort={code}
            format="mjml"
            theme={current.theme}
            labels={{ copy: labels.copyMjml, ...copyLabels }}
          />
          <CopyTemplateButton
            url={fileUrl('html')}
            tempsFort={code}
            format="html"
            theme={current.theme}
            variant="secondary"
            labels={{ copy: labels.copyHtml, ...copyLabels }}
          />
        </div>
      )}
    </div>
  );
}
