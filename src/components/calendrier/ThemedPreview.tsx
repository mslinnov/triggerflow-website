'use client';

import { useEffect, useRef, useState } from 'react';
import { Maximize2, X } from 'lucide-react';
import type { MjmlTheme, TempsFortCode } from '@/data/calendrier-marketing';
import { cn } from '@/lib/utils';
import { CopyMjmlButtons } from './CopyMjmlButtons';
import { TemplatePreview } from './TemplatePreview';
import { ThemePills } from './ThemePills';
import { useThemeSelection } from './ThemeSelection';

export interface ThemeVariant {
  theme: MjmlTheme;
  subject: string;
  preheader: string;
}

export interface ThemedPreviewLabels {
  subject: string;
  preheader: string;
  preview: string;
  frameTitle: string;
  themePicker: string;
  themeNames: Record<MjmlTheme, string>;
  copyMjml: string;
  copyHtml: string;
  download: string;
  downloadMjml: string;
  downloadHtml: string;
  copied: string;
  fallback: string;
  error: string;
  seeFull: string;
  close: string;
  loading: string;
}

interface ThemedPreviewProps {
  code: TempsFortCode;
  /** Titre du temps fort, en tête de la vue plein écran. */
  title: string;
  /** Thèmes livrés pour ce code, dans l'ordre d'affichage. */
  variants: ThemeVariant[];
  variables: Record<string, string>;
  mode?: 'template' | 'example';
  /** Boutons copier / télécharger dans la vue plein écran (page calendrier). */
  withCopy?: boolean;
  labels: ThemedPreviewLabels;
}

/**
 * L'e-mail rendu dans une iframe sans script, avec un squelette tant qu'il charge. Le
 * squelette est SOUS l'iframe (transparente tant qu'elle est vide) : l'e-mail le
 * recouvre dès qu'il se peint (tous les modèles ont un fond sur <body>), même si le
 * chargement a fini avant l'hydratation et que React n'a pas vu l'événement load.
 */
function PreviewFrame({ src, title, loading, interactive, className }: { src: string; title: string; loading: string; interactive: boolean; className?: string }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className={cn('relative', className)}>
      {!loaded && (
        <div aria-hidden="true" title={loading} className="absolute inset-0 z-0 space-y-4 bg-white p-5">
          <div className="mx-auto h-5 w-1/2 rounded bg-surface-secondary motion-safe:animate-pulse" />
          <div className="h-40 rounded-lg bg-surface-secondary motion-safe:animate-pulse" />
          <div className="h-3 w-5/6 rounded bg-surface-secondary motion-safe:animate-pulse" />
          <div className="h-3 w-2/3 rounded bg-surface-secondary motion-safe:animate-pulse" />
        </div>
      )}
      <iframe
        src={src}
        title={title}
        sandbox=""
        loading="lazy"
        referrerPolicy="no-referrer"
        onLoad={() => setLoaded(true)}
        // Aperçu court : ni focus ni défilement interne (plus de piège à doigt) ; la vue
        // plein écran, elle, se lit et se fait défiler normalement.
        tabIndex={interactive ? undefined : -1}
        aria-hidden={interactive ? undefined : true}
        className={cn('relative z-10 block w-full border-0 bg-transparent', interactive ? 'h-full' : 'pointer-events-none h-[1400px]')}
      />
    </div>
  );
}

/**
 * Aperçu d'un modèle MJML décliné en thèmes : pastilles, objet et pré-en-tête, haut de
 * l'e-mail (hauteur limitée, fondu, sans défilement interne) et bouton « Voir l'e-mail
 * en entier » qui ouvre une vue plein écran (feuille sur mobile, fenêtre sur desktop) :
 * <dialog> natif, donc Échap, focus piégé et arrière-plan inerte ; le focus revient au
 * bouton à la fermeture.
 */
export function ThemedPreview({ code, title, variants, variables, mode = 'template', withCopy = false, labels }: ThemedPreviewProps) {
  const themes = variants.map((v) => v.theme);
  const [selected] = useThemeSelection(themes[0]);
  const current = variants.find((v) => v.theme === selected) ?? variants[0];
  const src = `/api/calendrier/modele/${code}/apercu?theme=${current.theme}`;
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openerRef = useRef<HTMLAnchorElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (!open) {
      if (dialog.open) dialog.close();
      return;
    }
    if (!dialog.open) dialog.showModal();
    // Focus d'arrivée sur « Fermer » plutôt que sur la première pastille.
    closeRef.current?.focus();
    // Pas de défilement de la page derrière la vue plein écran (iOS en particulier) ;
    // seule la carte ouverte touche à la page, jamais les autres au montage.
    document.documentElement.classList.add('overflow-hidden');
    return () => document.documentElement.classList.remove('overflow-hidden');
  }, [open]);

  // « Voir l'e-mail en entier » est un vrai lien vers l'aperçu (sans JavaScript, il
  // l'ouvre dans un onglet) ; avec JavaScript, un clic simple ouvre la vue plein écran.
  const openFull = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    setOpen(true);
  };

  const header = (
    <TemplatePreview
      email={{ subject: current.subject, preheader: current.preheader, body: [], cta: { label: '', url: '' } }}
      mode={mode}
      variables={variables}
      labels={{ subject: labels.subject, preheader: labels.preheader, preview: labels.preview }}
      headerOnly
      className="rounded-none border-0 shadow-none"
    />
  );

  return (
    <div className="space-y-3">
      <ThemePills themes={themes} themeNames={labels.themeNames} label={labels.themePicker} />

      <div className="overflow-hidden rounded-2xl border border-border-light bg-white shadow-sm">
        {header}
        <div className="relative h-[380px] overflow-hidden sm:h-[460px] lg:h-[380px]">
          <PreviewFrame key={src} src={src} title={labels.frameTitle} loading={labels.loading} interactive={false} />
          {/* Toute la zone ouvre la vue complète au doigt ; le lien visible porte le nom pour le clavier. */}
          <a href={src} target="_blank" rel="noopener" tabIndex={-1} aria-hidden="true" onClick={openFull} className="absolute inset-0 z-20 cursor-zoom-in" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex h-32 items-end justify-center bg-gradient-to-t from-white via-white/90 to-transparent pb-4">
            <a
              ref={openerRef}
              href={src}
              target="_blank"
              rel="noopener"
              onClick={openFull}
              className="pointer-events-auto inline-flex min-h-11 items-center gap-2 rounded-full border border-border-default bg-white px-5 text-sm font-semibold text-text-primary shadow-sm transition-colors hover:border-brand-primary hover:text-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2"
            >
              <Maximize2 className="h-4 w-4" aria-hidden="true" />
              {labels.seeFull}
            </a>
          </div>
        </div>
      </div>

      <dialog
        ref={dialogRef}
        aria-label={`${title} : ${labels.preview}`}
        onClose={() => {
          setOpen(false);
          openerRef.current?.focus();
        }}
        onClick={(event) => {
          // Clic sur le fond (hors du contenu) : ferme, comme Échap.
          if (event.target === event.currentTarget) setOpen(false);
        }}
        className="m-0 h-dvh max-h-none w-full max-w-none bg-white p-0 backdrop:bg-brand-dark/60 sm:m-auto sm:h-[90vh] sm:max-w-2xl sm:rounded-2xl"
      >
        {open && (
          <div className="flex h-full flex-col">
            <div className="flex items-start justify-between gap-3 border-b border-border-light px-4 py-3 sm:px-5">
              <div className="min-w-0 space-y-2">
                <p className="truncate text-base font-semibold text-text-primary">{title}</p>
                <ThemePills themes={themes} themeNames={labels.themeNames} label={labels.themePicker} />
              </div>
              <button
                ref={closeRef}
                type="button"
                onClick={() => setOpen(false)}
                aria-label={labels.close}
                className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-text-secondary transition-colors hover:bg-surface-secondary hover:text-text-primary focus:outline-none focus:ring-2 focus:ring-brand-primary"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            {header}
            <PreviewFrame key={`plein-${src}`} src={src} title={labels.frameTitle} loading={labels.loading} interactive className="min-h-0 flex-1" />
            {withCopy && (
              <div className="flex flex-col items-start gap-3 border-t border-border-light px-4 py-3 sm:px-5">
                <CopyMjmlButtons code={code} themes={themes} labels={labels} />
              </div>
            )}
          </div>
        )}
      </dialog>
    </div>
  );
}
