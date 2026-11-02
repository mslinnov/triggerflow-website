'use client';

import { templateFileName, templateFileUrl, type MjmlTheme, type TempsFortCode } from '@/data/calendrier-marketing';
import { CopyTemplateButton } from './CopyTemplateButton';
import { DownloadTemplateLink } from './DownloadTemplateLink';
import { useThemeSelection } from './ThemeSelection';

interface CopyMjmlButtonsProps {
  code: TempsFortCode;
  themes: MjmlTheme[];
  labels: {
    copyMjml: string;
    copyHtml: string;
    download: string;
    downloadMjml: string;
    downloadHtml: string;
    copied: string;
    copiedShort: string;
    fallback: string;
    error: string;
  };
}

/**
 * Deux paires, pour le thème choisi : « Copier le MJML » | « Télécharger » (action
 * principale, en vert), puis « Copier le HTML » | « Télécharger ». Copie et
 * téléchargement servent le même fichier (templateFileUrl).
 */
export function CopyMjmlButtons({ code, themes, labels }: CopyMjmlButtonsProps) {
  const [selected] = useThemeSelection(themes[0]);
  const theme = themes.includes(selected) ? selected : themes[0];
  const copyLabels = { copied: labels.copied, copiedShort: labels.copiedShort, fallback: labels.fallback, error: labels.error };
  const pairs = [
    { format: 'mjml', variant: 'primary', copy: labels.copyMjml, download: labels.downloadMjml },
    { format: 'html', variant: 'secondary', copy: labels.copyHtml, download: labels.downloadHtml },
  ] as const;

  return (
    <>
      {pairs.map(({ format, variant, copy, download }) => (
        <CopyTemplateButton
          key={format}
          url={templateFileUrl(code, theme, format)}
          tempsFort={code}
          format={format}
          theme={theme}
          variant={variant}
          labels={{ copy, ...copyLabels }}
        >
          <DownloadTemplateLink
            href={templateFileUrl(code, theme, format, true)}
            fileName={templateFileName(code, theme, format)}
            tempsFort={code}
            format={format}
            theme={theme}
            variant={variant}
            label={labels.download}
            ariaLabel={download}
          />
        </CopyTemplateButton>
      ))}
    </>
  );
}
