import { useTranslations } from 'next-intl';
import { CalendarClock, Repeat, Users } from 'lucide-react';
import { TEMPS_FORTS, type Campaign } from '@/data/calendrier-marketing';
import { emailToPlainText, toPlainText } from '@/lib/calendrier';
import { loadMjmlThemes } from '@/lib/calendrier-mjml';
import { ActivateLink } from './ActivateLink';
import { CopyTemplateButton } from './CopyTemplateButton';
import { TemplatePreview } from './TemplatePreview';
import { ThemedMjmlTemplate } from './ThemedMjmlTemplate';
import { useThemedTemplateLabels } from './useThemedTemplateLabels';
import { useVariableLabels } from './useVariableLabels';

interface TempsFortCardProps {
  campaign: Campaign;
}

export function TempsFortCard({ campaign }: TempsFortCardProps) {
  const t = useTranslations('calendrierMarketing.card');
  const variables = useVariableLabels();
  const info = TEMPS_FORTS[campaign.code];
  const themedLabels = useThemedTemplateLabels();
  // Modèles MJML de la bibliothèque de l'app (un par thème livré), sinon le modèle texte.
  const variants = loadMjmlThemes(campaign.code).map(({ theme, subject, preheader }) => ({ theme, subject, preheader }));

  return (
    <article
      id={campaign.id}
      className="grid gap-6 rounded-2xl border border-border-light bg-white p-4 shadow-sm sm:p-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-8"
    >
      <div className="flex flex-col">
        <h3 className="text-xl font-bold text-text-primary sm:text-2xl">{info.title}</h3>
        <dl className="mt-4 space-y-3 text-sm">
          <div className="flex gap-3">
            <Users className="mt-0.5 h-4 w-4 shrink-0 text-brand-primary" aria-hidden="true" />
            <div>
              <dt className="font-semibold text-text-primary">{t('audience')}</dt>
              <dd className="text-text-secondary">{info.audience}</dd>
            </div>
          </div>
          <div className="flex gap-3">
            <CalendarClock className="mt-0.5 h-4 w-4 shrink-0 text-brand-primary" aria-hidden="true" />
            <div>
              <dt className="font-semibold text-text-primary">{t('send')}</dt>
              <dd className="text-text-secondary">{toPlainText(campaign.send)}</dd>
            </div>
          </div>
          {campaign.reminder && (
            <div className="flex gap-3">
              <Repeat className="mt-0.5 h-4 w-4 shrink-0 text-brand-primary" aria-hidden="true" />
              <div>
                <dt className="font-semibold text-text-primary">{t('reminder')}</dt>
                <dd className="text-text-secondary">{toPlainText(campaign.reminder)}</dd>
              </div>
            </div>
          )}
        </dl>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:mt-auto lg:pt-6">
          {variants.length === 0 && (
            <CopyTemplateButton
              text={emailToPlainText(campaign.email)}
              tempsFort={campaign.code}
              format="text"
              labels={{ copy: t('copy'), copied: t('copied'), fallback: t('copyFallback') }}
            />
          )}
          <ActivateLink href={`/fr/calendrier-marketing/${info.slug}`} tempsFort={campaign.code} destination="page">
            {t('activate')}
          </ActivateLink>
        </div>
      </div>

      {variants.length > 0 ? (
        <ThemedMjmlTemplate code={campaign.code} variants={variants} variables={variables} withCopy labels={themedLabels} />
      ) : (
        <TemplatePreview
          email={campaign.email}
          mode="template"
          variables={variables}
          labels={{ subject: t('subject'), preheader: t('preheader'), preview: t('previewLabel') }}
        />
      )}
    </article>
  );
}
