import { CheckCircle2, Download } from 'lucide-react';
import { safeDownloadUrl } from '@/lib/lead-magnet-download';
import { cn } from '@/lib/utils';

/**
 * Écran de succès des formulaires de livre blanc, commun aux trois landings.
 *
 * Les séquences d'e-mails des guides sont éteintes (décision de Mounir du
 * 02/11/2026) : le guide n'arrive plus par e-mail, il se télécharge ici, tout de
 * suite. Le bouton ouvre le lien compté du backend dans un nouvel onglet, ce qui
 * compte le téléchargement dans le funnel du guide.
 *
 * Sans lien (relais en échec, guide sans document câblé), le message reste
 * honnête : il ne promet pas d'e-mail, l'équipe reprend le lead à la main. Le
 * lien est recontrôlé ici, en plus de la route : rien d'autre qu'un lien compté
 * du backend ne finit dans le `href`.
 *
 * Sans hook ni traduction : les textes arrivent en props, déjà traduits, ce qui
 * garde le composant testable par un simple rendu serveur.
 */
interface LeadMagnetSuccessProps {
  title: string;
  /** Phrase qui précède le bouton, quand le lien est là. */
  ready: string;
  /** Libellé du bouton. */
  download: string;
  /** Message quand le lien manque. */
  fallback: string;
  downloadUrl: string | null;
  className?: string;
}

export function LeadMagnetSuccess({ title, ready, download, fallback, downloadUrl, className }: LeadMagnetSuccessProps) {
  const href = safeDownloadUrl(downloadUrl);

  return (
    <div
      className={cn('rounded-2xl border border-[var(--up-accent)] bg-[var(--up-accent-wash)] p-6 text-center', className)}
      role="status"
    >
      <CheckCircle2 className="mx-auto h-8 w-8 text-[var(--up-accent)]" strokeWidth={1.8} aria-hidden />
      <p className="mt-3 text-lg font-semibold text-[var(--up-ink)]">{title}</p>

      {href ? (
        <>
          <p className="mt-1.5 text-sm leading-relaxed text-[var(--up-ink-soft)]">{ready}</p>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-[var(--up-accent)] px-7 py-3.5 text-base font-semibold text-[var(--up-accent-ink)] transition-colors hover:bg-[var(--up-accent-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--up-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--up-accent-wash)] active:translate-y-[1px]"
          >
            <Download className="h-4 w-4" strokeWidth={2.2} aria-hidden />
            {download}
          </a>
        </>
      ) : (
        <p className="mt-1.5 text-sm leading-relaxed text-[var(--up-ink-soft)]">{fallback}</p>
      )}
    </div>
  );
}
