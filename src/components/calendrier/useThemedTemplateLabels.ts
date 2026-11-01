import { useTranslations } from 'next-intl';
import { MJML_THEMES, type MjmlTheme } from '@/data/calendrier-marketing';

/** Libellés du bloc ThemedMjmlTemplate (page calendrier et page Activer). */
export function useThemedTemplateLabels() {
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
    copied: t('copied'),
    fallback: t('copyFallback'),
    error: t('copyError'),
  };
}
