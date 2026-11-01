'use client';

import type { MjmlTheme } from '@/data/calendrier-marketing';
import { CopyTemplateButton } from './CopyTemplateButton';
import { useThemeSelection } from './ThemeSelection';

interface CopyMjmlButtonsProps {
  code: string;
  themes: MjmlTheme[];
  labels: { copyMjml: string; copyHtml: string; copied: string; fallback: string; error: string };
}

/** « Copier le MJML » (action principale) et « Copier le HTML », pour le thème choisi. */
export function CopyMjmlButtons({ code, themes, labels }: CopyMjmlButtonsProps) {
  const [selected] = useThemeSelection(themes[0]);
  const theme = themes.includes(selected) ? selected : themes[0];
  const fileUrl = (format: 'mjml' | 'html') => `/api/calendrier/modele/${code}/${format}?theme=${theme}`;
  const copyLabels = { copied: labels.copied, fallback: labels.fallback, error: labels.error };

  return (
    <>
      <CopyTemplateButton url={fileUrl('mjml')} tempsFort={code} format="mjml" theme={theme} labels={{ copy: labels.copyMjml, ...copyLabels }} />
      <CopyTemplateButton
        url={fileUrl('html')}
        tempsFort={code}
        format="html"
        theme={theme}
        variant="secondary"
        labels={{ copy: labels.copyHtml, ...copyLabels }}
      />
    </>
  );
}
