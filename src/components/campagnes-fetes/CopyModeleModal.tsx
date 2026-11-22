'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { CopyTemplateButton } from '@/components/calendrier/CopyTemplateButton';
import { DownloadTemplateLink } from '@/components/calendrier/DownloadTemplateLink';
import { FETES_STYLE } from '@/data/campagnes-fetes';

export interface ModaleCampagne {
  code: string;
  nom: string;
  htmlUrl: string;
  htmlDownloadUrl: string;
  mjmlUrl: string;
  mjmlDownloadUrl: string;
}

export interface ModaleLabels {
  title: string;
  tabsLabel: string;
  html: string;
  mjml: string;
  noteHtml: string;
  noteMjml: string;
  copyHtml: string;
  copyMjml: string;
  download: string;
  downloadHtml: string;
  downloadMjml: string;
  copied: string;
  copiedShort: string;
  copyFallback: string;
  copyError: string;
  close: string;
}

interface CopyModeleModalProps {
  campagne: ModaleCampagne | null;
  labels: ModaleLabels;
  onClose: () => void;
}

/** Fenêtre « Copier le modèle » : onglets HTML et MJML, copie et téléchargement du même fichier (route du calendrier). */
export function CopyModeleModal({ campagne, labels, onClose }: CopyModeleModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (campagne && !dialog.open) dialog.showModal();
    if (!campagne && dialog.open) dialog.close();
  }, [campagne]);

  return (
    <dialog
      ref={dialogRef}
      className="cf-dialog"
      aria-labelledby={titleId}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === dialogRef.current) onClose();
      }}
    >
      {campagne && <ModaleContenu key={campagne.code} campagne={campagne} labels={labels} onClose={onClose} titleId={titleId} />}
    </dialog>
  );
}

interface ModaleContenuProps {
  campagne: ModaleCampagne;
  labels: ModaleLabels;
  onClose: () => void;
  titleId: string;
}

/** Contenu de la fenêtre ; remonté à chaque campagne (clé), l'onglet HTML revient donc seul. */
function ModaleContenu({ campagne, labels, onClose, titleId }: ModaleContenuProps) {
  const [format, setFormat] = useState<'html' | 'mjml'>('html');
  const copyLabels = { copied: labels.copied, copiedShort: labels.copiedShort, fallback: labels.copyFallback, error: labels.copyError };

  return (
    <div className="cf-dialog-in">
      <div className="cf-dialog-tete">
        <h2 id={titleId}>
          {labels.title} : {campagne.nom}
        </h2>
        <button type="button" className="cf-lien" onClick={onClose} aria-label={labels.close}>
          <X size={22} aria-hidden="true" />
        </button>
      </div>
      <div className="cf-onglets" role="tablist" aria-label={labels.tabsLabel}>
        {(['html', 'mjml'] as const).map((f) => (
          <button key={f} type="button" role="tab" className="cf-onglet" aria-selected={format === f} onClick={() => setFormat(f)}>
            {labels[f]}
          </button>
        ))}
      </div>
      <p className="cf-dialog-note">{format === 'html' ? labels.noteHtml : labels.noteMjml}</p>
      <CopyTemplateButton
        key={format}
        url={format === 'html' ? campagne.htmlUrl : campagne.mjmlUrl}
        tempsFort={campagne.code}
        format={format}
        theme={FETES_STYLE}
        variant={format === 'mjml' ? 'primary' : 'secondary'}
        labels={{ copy: format === 'html' ? labels.copyHtml : labels.copyMjml, ...copyLabels }}
      >
        <DownloadTemplateLink
          href={format === 'html' ? campagne.htmlDownloadUrl : campagne.mjmlDownloadUrl}
          fileName={`${campagne.code}-${FETES_STYLE}.${format}`}
          tempsFort={campagne.code}
          format={format}
          theme={FETES_STYLE}
          variant={format === 'mjml' ? 'primary' : 'secondary'}
          label={labels.download}
          ariaLabel={format === 'html' ? labels.downloadHtml : labels.downloadMjml}
        />
      </CopyTemplateButton>
    </div>
  );
}
