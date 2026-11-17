import Image from 'next/image';
import { cn } from '@/lib/utils';

interface PhoneShotProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}

/** Capture d'écran mobile dans un cadre de téléphone sobre (même largeur que l'encart PendingShot « phone »). */
export function PhoneShot({ src, alt, width, height, className }: PhoneShotProps) {
  return (
    <div className={cn('mx-auto w-full max-w-[260px] rounded-[2.25rem] bg-ink p-2 shadow-product', className)}>
      <div className="overflow-hidden rounded-[1.75rem] bg-white">
        <Image src={src} alt={alt} width={width} height={height} sizes="260px" className="h-auto w-full" />
      </div>
    </div>
  );
}
