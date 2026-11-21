import { IBM_Plex_Sans_Condensed } from 'next/font/google';

/** Chiffres forts et repères du séjour (+20, J-3, 72 €) : pas une police du premier affichage, donc pas préchargée. */
const plexCondensed = IBM_Plex_Sans_Condensed({ variable: '--font-plex-condensed', subsets: ['latin'], weight: ['300', '400', '500'], display: 'swap', preload: false });

export default function CrmHotelierLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${plexCondensed.variable} bg-white font-sans selection:bg-[#CCE2E1] selection:text-ink [&_a:focus-visible]:outline-2 [&_a:focus-visible]:outline-offset-4 [&_a:focus-visible]:outline-[#006F68]`}>
      {children}
    </div>
  );
}
