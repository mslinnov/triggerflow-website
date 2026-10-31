import { Fragment } from 'react';
import { formatDateLong, tokenize, type EmailModel } from '@/lib/calendrier';
import { cn } from '@/lib/utils';

interface TemplatePreviewProps {
  email: EmailModel;
  /**
   * `template` : variables et champs à remplir surlignés (page calendrier) ;
   * `example` : rendu sur une charte d'exemple, valeurs fictives en clair (page « Activer »).
   */
  mode: 'template' | 'example';
  /** Libellé humain de chaque variable (« Prénom ») en mode template, valeur fictive en mode example. */
  variables: Record<string, string>;
  labels: { subject: string; preheader: string; preview: string };
  /** Objet et pré-en-tête seuls (le corps est rendu ailleurs, ex. iframe MJML). */
  headerOnly?: boolean;
  className?: string;
}

function RichText({ text, mode, variables }: { text: string; mode: TemplatePreviewProps['mode']; variables: Record<string, string> }) {
  return (
    <>
      {tokenize(text).map((token, i) => {
        switch (token.kind) {
          case 'text':
            return <Fragment key={i}>{token.value}</Fragment>;
          case 'date':
            return <Fragment key={i}>{formatDateLong(token.iso)}</Fragment>;
          case 'variable':
            return mode === 'example' ? (
              <Fragment key={i}>{variables[token.name] ?? ''}</Fragment>
            ) : (
              <span key={i} className="rounded bg-brand-light px-1 font-medium text-brand-primary">
                {variables[token.name] ?? token.name}
              </span>
            );
          case 'field':
            return mode === 'example' ? (
              <Fragment key={i}>{token.example}</Fragment>
            ) : (
              <mark
                key={i}
                title={token.label}
                className="rounded bg-brand-accent-light px-1 text-brand-dark ring-1 ring-brand-accent"
              >
                {token.example}
                <span className="sr-only"> ({token.label})</span>
              </mark>
            );
        }
      })}
    </>
  );
}

export function TemplatePreview({ email, mode, variables, labels, headerOnly, className }: TemplatePreviewProps) {
  return (
    <figure
      aria-label={labels.preview}
      className={cn('overflow-hidden rounded-2xl border border-border-light bg-white text-left shadow-sm', className)}
    >
      <div className="space-y-1 border-b border-border-light bg-surface-secondary px-4 py-3 text-sm sm:px-5">
        <p className="text-text-primary">
          <span className="font-semibold text-text-muted">{labels.subject} : </span>
          <span className="font-semibold">
            <RichText text={email.subject} mode={mode} variables={variables} />
          </span>
        </p>
        <p className="text-text-secondary">
          <span className="font-semibold text-text-muted">{labels.preheader} : </span>
          <RichText text={email.preheader} mode={mode} variables={variables} />
        </p>
      </div>

      {!headerOnly && (
        <div className="space-y-3 px-4 py-5 text-[15px] leading-relaxed text-text-primary sm:px-5">
          {email.body.map((block, i) =>
            Array.isArray(block) ? (
              <ul key={i} className="list-disc space-y-1 pl-5">
                {block.map((item, j) => (
                  <li key={j}>
                    <RichText text={item} mode={mode} variables={variables} />
                  </li>
                ))}
              </ul>
            ) : (
              <p key={i} className="whitespace-pre-line">
                <RichText text={block} mode={mode} variables={variables} />
              </p>
            ),
          )}
          <p className="pt-2">
            <span className="inline-flex rounded-full bg-brand-primary px-5 py-2.5 text-sm font-semibold text-white">
              <RichText text={email.cta.label} mode={mode} variables={variables} />
            </span>
          </p>
        </div>
      )}
    </figure>
  );
}
