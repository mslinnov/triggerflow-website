import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { BadgeCheck } from 'lucide-react';
import { DsButton } from '@/components/ds';
import { cn } from '@/lib/utils';

/** Fichiers logo par nom (public/images/integrations). Un nom sans fichier n'est pas affiché. */
const LOGOS: Record<string, { src: string; w: number; h: number }> = {
  Mews: { src: 'mews.svg', w: 901, h: 114 },
  'Thaïs': { src: 'thais.svg', w: 210, h: 64 },
  'Opera Cloud': { src: 'opera.png', w: 1080, h: 500 },
  Medialog: { src: 'medialog.svg', w: 152, h: 36 },
  Misterbooking: { src: 'misterbooking.png', w: 498, h: 100 },
  Asterio: { src: 'asterio.png', w: 300, h: 157 },
  Apaleo: { src: 'apaleo.png', w: 829, h: 210 },
  Vega: { src: 'vega.png', w: 512, h: 512 },
  Beds24: { src: 'beds24.svg', w: 130, h: 70 },
  Zeswitch: { src: 'zeswitch.png', w: 569, h: 125 },
  Reservit: { src: 'reservit.webp', w: 300, h: 173 },
  'Lean PMS': { src: 'leanpms.webp', w: 336, h: 92 },
  Sesame: { src: 'sesame.png', w: 1249, h: 600 },
  Igloohome: { src: 'igloohome.svg', w: 87, h: 24 },
  Stripe: { src: 'stripe.svg', w: 512, h: 214 },
  PayZen: { src: 'payzen.png', w: 199, h: 84 },
  SystemPay: { src: 'systempay.png', w: 174, h: 50 },
  'Booking.com': { src: 'booking.svg', w: 100, h: 100 },
  Airbnb: { src: 'airbnb.svg', w: 2500, h: 780 },
  WhatsApp: { src: 'whatsapp.svg', w: 175, h: 176 },
  Zapier: { src: 'zapier.svg', w: 2500, h: 2500 },
  n8n: { src: 'n8n.svg', w: 256, h: 256 },
};

/** Échantillon affiché sur l'accueil (12 logos, toutes familles confondues) : un aperçu, pas la liste complète. */
/** Logos dont le dessin est petit dans le fichier : affichés plus grands pour un poids visuel égal. */
const BIGGER = new Set(['Opera Cloud', 'Sesame', 'Misterbooking']);

const FEATURED = ['Mews', 'Thaïs', 'Opera Cloud', 'Apaleo', 'Medialog', 'Misterbooking', 'Stripe', 'Igloohome', 'Sesame', 'Booking.com', 'Airbnb', 'Zapier'];

/** Intégrations : texte à gauche, grille de logos en niveaux de gris à droite, lien vers la liste complète. */
export function HomeIntegrations() {
  const t = useTranslations('home2.integrations');
  return (
    <div className="mt-20 grid overflow-hidden rounded-2xl bg-white text-ink lg:grid-cols-[0.9fr_1.6fr]">
      <div className="flex flex-col justify-center bg-paper p-8 md:p-10">
        <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-accent">{t('eyebrow')}</p>
        <p className="mt-3 text-[26px] font-medium leading-tight tracking-[-0.015em]">{t('title')}</p>
        <p className="mt-4 text-[15px] leading-relaxed text-ink-2">{t('text')}</p>
        <ul className="mt-6 flex flex-wrap gap-2">
          {(t.raw('keywords') as string[]).map((k) => (
            <li key={k} className="rounded-full border border-line bg-white px-3 py-1 text-[13px] text-ink">
              {k}
            </li>
          ))}
        </ul>
        <p className="mt-6 flex items-center gap-2 rounded-lg bg-mint/60 px-3 py-2 text-[13.5px] font-medium text-accent-hover">
          <BadgeCheck aria-hidden className="h-4 w-4 shrink-0" />
          {t('free')}
        </p>
        <DsButton href="/integrations" variant="link" arrow className="mt-4 self-start">
          {t('more')}
        </DsButton>
      </div>
      <ul className="grid auto-rows-fr grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
        {FEATURED.map((name) => {
          const logo = LOGOS[name];
          if (!logo) return null;
          const square = logo.w / logo.h < 1.6;
          return (
            <li key={name} className="group flex min-h-24 items-center justify-center border-b border-l border-line px-6 py-6">
              <span className="flex items-center gap-2 opacity-60 grayscale transition duration-300 group-hover:opacity-100 group-hover:grayscale-0">
                <Image
                  src={`/images/integrations/${logo.src}`}
                  alt={square ? '' : name}
                  width={logo.w}
                  height={logo.h}
                  className={square ? 'h-7 w-7 object-contain' : cn(BIGGER.has(name) ? 'h-10' : 'h-7', 'w-auto max-w-[130px] object-contain')}
                />
                {square && <span className="text-[15px] font-semibold text-ink">{name}</span>}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
