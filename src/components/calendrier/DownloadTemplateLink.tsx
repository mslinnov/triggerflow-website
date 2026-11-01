'use client';

import { Download } from 'lucide-react';
import type { TemplateFileFormat } from '@/data/calendrier-marketing';
import { trackCalendarEvent } from '@/lib/calendrier-tracking';
import { cn } from '@/lib/utils';
import { templateButtonClass } from './CopyTemplateButton';

interface DownloadTemplateLinkProps {
  /** Adresse du fichier en pièce jointe (templateFileUrl(…, true)). */
  href: string;
  fileName: string;
  tempsFort: string;
  format: TemplateFileFormat;
  theme: string;
  /** Libellé visible, court (« Télécharger ») : le bouton est à côté de « Copier le MJML ». */
  label: string;
  /** Nom complet pour les lecteurs d'écran (« Télécharger le MJML »), qui contient le libellé visible. */
  ariaLabel: string;
  variant: 'primary' | 'secondary';
}

/**
 * « Télécharger » : un vrai lien `download` vers la route du modèle, qui répond en
 * pièce jointe (même texte que « Copier »). Ni Blob ni script : fiable sur Safari iOS
 * et sans JavaScript ; le clic est compté (`calendar_download`) avant le téléchargement.
 */
export function DownloadTemplateLink({ href, fileName, tempsFort, format, theme, label, ariaLabel, variant }: DownloadTemplateLinkProps) {
  return (
    <a
      href={href}
      download={fileName}
      aria-label={ariaLabel}
      onClick={() => trackCalendarEvent('calendar_download', { temps_fort: tempsFort, format, theme })}
      className={cn(templateButtonClass(variant), 'flex-auto')}
    >
      <Download className="h-4 w-4" aria-hidden="true" />
      {label}
    </a>
  );
}
