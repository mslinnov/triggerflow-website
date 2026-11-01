import { TemplatePreview } from './TemplatePreview';

interface MjmlPreviewProps {
  code: string;
  /** Thème de l'aperçu (dossier src/data/calendrier-mjml/<thème>/). */
  theme: string;
  subject: string;
  preheader: string;
  /** Libellé humain de chaque variable (mode template) ou valeur d'exemple (mode example), pour l'objet et le pré-en-tête. */
  variables: Record<string, string>;
  mode?: 'template' | 'example';
  labels: { subject: string; preheader: string; preview: string; frameTitle: string };
}

/**
 * Aperçu d'un modèle MJML : objet et pré-en-tête (champs surlignés), puis l'e-mail
 * rendu dans une iframe chargée à la demande. `sandbox` vide : aucun script, aucun
 * formulaire, origine opaque. La largeur de l'iframe suit celle de l'écran : les
 * règles mobiles du MJML s'appliquent sur téléphone.
 */
export function MjmlPreview({ code, theme, subject, preheader, variables, mode = 'template', labels }: MjmlPreviewProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border-light bg-white shadow-sm">
      <TemplatePreview
        email={{ subject, preheader, body: [], cta: { label: '', url: '' } }}
        mode={mode}
        variables={variables}
        labels={{ subject: labels.subject, preheader: labels.preheader, preview: labels.preview }}
        headerOnly
        className="rounded-none border-0 shadow-none"
      />
      <iframe
        src={`/api/calendrier/modele/${code}/apercu?theme=${theme}`}
        title={labels.frameTitle}
        sandbox=""
        loading="lazy"
        referrerPolicy="no-referrer"
        className="block h-[560px] w-full border-0 bg-white sm:h-[640px]"
      />
    </div>
  );
}
