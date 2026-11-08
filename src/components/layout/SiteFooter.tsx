import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { FileCheck2, Linkedin, Mail, MapPin, ShieldCheck } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { CookieManagerLink } from '@/components/cookies';
import { brand } from '@/data/brand';
import { footerColumns } from '@/data/navigation';
import { FooterNewsletter } from './FooterNewsletter';

/** Colonnes de liens : « Ressources » et « Entreprise » partagent une colonne ; « Légal » passe dans la barre du bas. */
const linkSlots = [['product'], ['solutions'], ['clients'], ['resources', 'company'], ['trust']];

/**
 * Footer de la charte, en 4 étages : marque + contact et newsletter, liens, labels de confiance, barre légale.
 */
export function SiteFooter() {
  const t = useTranslations('nav.footer');
  const legal = footerColumns.find((c) => c.key === 'legal');
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto max-w-[1200px] px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        {/* 1. Marque, contact et newsletter */}
        <div className="grid grid-cols-1 gap-10 border-b border-white/10 pb-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div>
            <Image src="/images/logo-white.webp" alt="TriggerFlow" width={140} height={35} className="h-7 w-auto" />
            <p className="mt-5 max-w-sm text-[17px] leading-relaxed text-white/80">{t('tagline')}</p>
            <ul className="mt-7 space-y-3 text-[14.5px]">
              <li>
                <a href={`mailto:${brand.email}`} className="inline-flex items-center gap-2.5 text-white/85 transition-colors hover:text-white">
                  <Mail aria-hidden className="h-4 w-4 text-mint" />
                  {brand.email}
                </a>
              </li>
              <li className="inline-flex items-center gap-2.5 text-white/85">
                <MapPin aria-hidden className="h-4 w-4 text-mint" />
                {t('location')}
              </li>
              <li>
                <a href={brand.sameAs[0]} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 text-white/85 transition-colors hover:text-white">
                  <Linkedin aria-hidden className="h-4 w-4 text-mint" />
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
          <div className="self-start rounded-2xl border border-white/10 bg-white/[0.04] p-6 md:p-8">
            <FooterNewsletter />
          </div>
        </div>

        {/* 2. Liens */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-12 sm:grid-cols-3 lg:grid-cols-5">
          {linkSlots.map((slot) => (
            <div key={slot.join('-')} className="space-y-10">
              {slot.map((key) => {
                const col = footerColumns.find((c) => c.key === key);
                if (!col) return null;
                return (
                  <div key={col.key}>
                    <p className="font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-mint/80">{t(`columns.${col.key}`)}</p>
                    <ul className="mt-4 space-y-3">
                      {col.items.map((item) => (
                        <li key={item.key}>
                          <Link href={item.href} className="text-[14.5px] text-white/80 transition-colors hover:text-white">
                            {t(`items.${item.key}`)}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* 3. Labels de confiance */}
        <div className="flex flex-col gap-5 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between">
          <a
            href="https://synapse-hotel.fr/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-4 text-[14px] text-white/85 transition-colors hover:text-white"
          >
            <span className="flex h-11 items-center rounded-lg bg-white px-3">
              <Image src="/images/integrations/synapse.svg" alt="Synapse" width={132} height={43} className="h-6 w-auto" />
            </span>
            {t('synapse')}
          </a>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-[11.5px] uppercase tracking-[0.06em] text-white/75">
            <li className="inline-flex items-center gap-1.5"><MapPin aria-hidden className="h-3.5 w-3.5" />{t('badges.france')}</li>
            <li className="inline-flex items-center gap-1.5"><ShieldCheck aria-hidden className="h-3.5 w-3.5" />{t('badges.gdpr')}</li>
            <li>
              <Link href="/dpa" className="inline-flex items-center gap-1.5 transition-colors hover:text-white">
                <FileCheck2 aria-hidden className="h-3.5 w-3.5" />
                {t('badges.dpa')}
              </Link>
            </li>
          </ul>
        </div>

        {/* 4. Barre légale */}
        <div className="mt-8 flex flex-col gap-4 border-t border-white/10 pt-6 text-[13px] text-white/65 md:flex-row md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} TriggerFlow</span>
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {legal?.items.map((item) => (
              <li key={item.key}>
                <Link href={item.href} className="transition-colors hover:text-white">{t(`items.${item.key}`)}</Link>
              </li>
            ))}
            <li>
              <CookieManagerLink className="text-left transition-colors hover:text-white" />
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
