import { ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PendingShotProps {
  /** Ce que la future capture montrera (texte visible, remplacé par l'image dès qu'elle existe). */
  label: string;
  /** Format de l'encart : écran (16/10) ou téléphone (9/19). */
  shape?: 'screen' | 'phone';
  className?: string;
}

/**
 * Encart gris en attendant une vraie capture de l'app (décision de Soufiane, 12/11/2026) :
 * jamais d'image inventée, un emplacement neutre qui dit ce qui viendra.
 */
export function PendingShot({ label, shape = 'screen', className }: PendingShotProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-line bg-paper px-6 text-center',
        shape === 'phone' ? 'mx-auto aspect-[9/19] w-full max-w-[260px]' : 'aspect-[16/10] w-full',
        className,
      )}
    >
      <ImageIcon aria-hidden className="h-6 w-6 text-ink-3" strokeWidth={1.5} />
      <p className="max-w-[280px] font-mono text-[11px] uppercase leading-relaxed tracking-[0.06em] text-ink-3">{label}</p>
    </div>
  );
}
