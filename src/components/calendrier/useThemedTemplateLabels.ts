import { useTranslations } from 'next-intl';
import { MJML_THEMES, type MjmlTheme } from '@/data/calendrier-marketing';
import type { ThemedPreviewLabels } from './ThemedPreview';

/** Libellés de l'aperçu à thèmes et des boutons copier / télécharger (page calendrier et page Activer). */
export function useThemedTemplateLabels(): ThemedPreviewLabels {
  const t = useTranslations('calendrierMarketing.card');
  return {
    subject: t('subject'),
    preheader: t('preheader'),
    preview: t('previewLabel'),
    frameTitle: t('mjmlPreviewTitle'),
    themePicker: t('themePicker'),
    themeNames: Object.fromEntries(MJML_THEMES.map((theme) => [theme, t(`themes.${theme}`)])) as Record<MjmlTheme, string>,
    copyMjml: t('copyMjml'),
    copyHtml: t('copyHtml'),
    download: t('download'),
    downloadMjml: t('downloadMjml'),
    downloadHtml: t('downloadHtml'),
    copied: t('copied'),
    copiedShort: t('copiedShort'),
    fallback: t('copyFallback'),
    error: t('copyError'),
    seeFull: t('seeFull'),
    close: t('close'),
    loading: t('loading'),
  };
}
