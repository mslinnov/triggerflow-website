import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { DsButton } from '@/components/ds';
import { brand } from '@/data/brand';

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

/** Les connexions réelles (brand.ts), par famille, avec leurs logos. */
export function HomeIntegrations() {
  const t = useTranslations('home2.integrations');
  const groups: { key: string; names: readonly string[] }[] = [
    { key: 'pms', names: brand.pms },
    { key: 'locks', names: brand.connections.locks },
    { key: 'payments', names: brand.connections.payments.filter((n) => n !== 'Thaïs') },
    { key: 'channels', names: ['WhatsApp', 'Booking.com', 'Airbnb'] },
    { key: 'automation', names: brand.automation },
  ];
  return (
    <div className="mt-20 rounded-2xl border border-white/10 bg-white p-6 text-ink md:p-8">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-accent">{t('eyebrow')}</p>
          <p className="mt-2 text-[22px] font-medium tracking-[-0.01em]">{t('title')}</p>
        </div>
        <DsButton href="/integrations" variant="link" arrow>
          {t('more')}
        </DsButton>
      </div>
      <div className="mt-6 space-y-5">
        {groups.map((g) => (
          <div key={g.key} className="grid gap-3 border-t border-line pt-5 md:grid-cols-[160px_1fr] md:items-center">
            <p className="font-mono text-[11px] uppercase tracking-[0.06em] text-ink-2">{t(`groups.${g.key}`)}</p>
            <ul className="flex flex-wrap items-center gap-x-7 gap-y-4">
              {g.names.map((name) => {
                const logo = LOGOS[name];
                return (
                  <li key={name} className="flex h-7 items-center">
                    {logo && logo.w / logo.h < 1.6 ? (
                      // Logo carré (icône seule) : on ajoute le nom pour qu'il reste lisible.
                      <span className="flex items-center gap-2 text-[14px] font-semibold text-ink">
                        <Image src={`/images/integrations/${logo.src}`} alt="" width={logo.w} height={logo.h} className="h-6 w-6 object-contain" />
                        {name}
                      </span>
                    ) : logo ? (
                      <Image src={`/images/integrations/${logo.src}`} alt={name} width={logo.w} height={logo.h} className="h-6 w-auto max-w-[110px] object-contain" />
                    ) : (
                      <span className="text-[14px] font-semibold text-ink-2">{name}</span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
