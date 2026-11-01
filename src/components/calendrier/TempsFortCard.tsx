import { useTranslations } from 'next-intl';
import { CalendarClock, Repeat, Users } from 'lucide-react';
import { DEFAULT_MJML_THEME, signatureTextLine, TEMPS_FORTS, type Campaign } from '@/data/calendrier-marketing';
import { emailToPlainText, toPlainText } from '@/lib/calendrier';
import { loadMjmlThemes } from '@/lib/calendrier-mjml';
import { ActivateLink } from './ActivateLink';
import { CopyMjmlButtons } from './CopyMjmlButtons';
import { CopyTemplateButton } from './CopyTemplateButton';
import { OpenInAppLink } from './OpenInAppLink';
import { TemplatePreview } from './TemplatePreview';
import { ThemedPreview } from './ThemedPreview';
import { ThemeSelectionProvider } from './ThemeSelection';
import { useThemedTemplateLabels } from './useThemedTemplateLabels';
import { useVariableLabels } from './useVariableLabels';
import { cn } from '@/lib/utils';

interface TempsFortCardProps {
  campaign: Campaign;
  /** Marge de défilement de l'ancre de la carte (#<campagne>), sous l'en-tête et la barre des mois. */
  scrollMarginClass?: string;
}

/**
 * Carte d'un temps fort. Mobile : infos, aperçu, puis UN groupe d'actions. Desktop :
 * infos et actions à gauche, aperçu à droite (zones de grille, sans dupliquer les
 * boutons). Le thème choisi est partagé par l'aperçu, les copies et le lien vers l'app.
 */
export function TempsFortCard({ campaign, scrollMarginClass }: TempsFortCardProps) {
  const t = useTranslations('calendrierMarketing.card');
  const variables = useVariableLabels();
  const labels = useThemedTemplateLabels();
  const info = TEMPS_FORTS[campaign.code];
  // Modèles MJML de la bibliothèque de l'app (un par thème livré), sinon le modèle texte.
  const variants = loadMjmlThemes(campaign.code).map(({ theme, subject, preheader }) => ({ theme, subject, preheader }));
  const themes = variants.length > 0 ? variants.map((v) => v.theme) : [DEFAULT_MJML_THEME];

  const rows = [
    { icon: Users, term: t('audience'), value: info.audience },
    { icon: CalendarClock, term: t('send'), value: toPlainText(campaign.send) },
    ...(campaign.reminder ? [{ icon: Repeat, term: t('reminder'), value: toPlainText(campaign.reminder) }] : []),
  ];

  return (
    <ThemeSelectionProvider initial={themes[0]}>
      <article
        id={campaign.id}
        className={cn(
          "grid gap-5 rounded-2xl border border-border-light bg-white p-4 shadow-sm [grid-template-areas:'info'_'preview'_'actions'] sm:p-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-x-8 lg:[grid-template-areas:'info_preview'_'actions_preview'] lg:[grid-template-rows:auto_1fr]",
          scrollMarginClass,
        )}
      >
        <div className="[grid-area:info]">
          <h3 className="text-xl font-bold text-text-primary sm:text-2xl">{info.title}</h3>
          <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-1">
            {rows.map(({ icon: Icon, term, value }) => (
              <div key={term} className="flex gap-3">
                <Icon className="mt-0.5 h-4 w-4 shrink-0 text-brand-primary" aria-hidden="true" />
                <div>
                  <dt className="font-semibold text-text-primary">{term}</dt>
                  <dd className="text-text-secondary">{value}</dd>
                </div>
              </div>
            ))}
          </dl>
        </div>

        <div className="min-w-0 [grid-area:preview]">
          {variants.length > 0 ? (
            <ThemedPreview code={campaign.code} title={info.title} variants={variants} variables={variables} withCopy labels={labels} />
          ) : (
            <TemplatePreview
              email={campaign.email}
              mode="template"
              variables={variables}
              labels={{ subject: t('subject'), preheader: t('preheader'), preview: t('previewLabel') }}
            />
          )}
        </div>

        <div className="flex flex-col gap-3 [grid-area:actions] lg:self-start">
          {/* Une paire « Copier | Télécharger » par ligne : deux paires côte à côte brouilleraient à quel format va chaque bouton. */}
          <div className="flex flex-col items-start gap-3">
            {variants.length > 0 ? (
              <CopyMjmlButtons code={campaign.code} themes={themes} labels={labels} />
            ) : (
              <CopyTemplateButton
                text={emailToPlainText(campaign.email, signatureTextLine(campaign.code))}
                tempsFort={campaign.code}
                format="text"
                labels={{ copy: t('copy'), copied: t('copied'), fallback: t('copyFallback'), error: t('copyError') }}
              />
            )}
          </div>
          <div className="flex flex-col gap-3 border-t border-border-light pt-3 sm:flex-row sm:flex-wrap sm:items-center lg:flex-col lg:items-start xl:flex-row xl:items-center">
            <ActivateLink href={`/fr/calendrier-marketing/${info.slug}`} tempsFort={campaign.code} destination="page">
              {t('activate')}
            </ActivateLink>
            <OpenInAppLink code={campaign.code} themes={themes} themeNames={labels.themeNames} variant="link">
              {t('openInApp')}
            </OpenInAppLink>
          </div>
        </div>
      </article>
    </ThemeSelectionProvider>
  );
}
