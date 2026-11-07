import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Linkedin } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { CookieManagerLink } from '@/components/cookies';
import { brand } from '@/data/brand';
import { footerColumns } from '@/data/navigation';

/** Colonnes de liens : « Ressources » et « Entreprise » partagent une colonne ; « Légal » passe dans la barre du bas. */
const linkSlots = [['product'], ['solutions'], ['clients'], ['resources', 'company'], ['trust']];

/** Footer de la charte : fond encre, marque et appel à l'action en haut, 5 colonnes de liens, légal en bas. */
export function SiteFooter() {
  const t = useTranslations('nav.footer');
  const nav = useTranslations('nav');
  const legal = footerColumns.find((c) => c.key === 'legal');
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto max-w-[1200px] px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        <div className="flex flex-col gap-8 border-b border-white/10 pb-12 md:flex-row md:items-end md:justify-between">
          <div>
            <Image src="/images/logo-white.webp" alt="TriggerFlow" width={140} height={35} className="h-7 w-auto" />
            <p className="mt-5 max-w-sm text-[17px] leading-relaxed text-white/75">{t('tagline')}</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={brand.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center rounded-lg bg-white px-5 font-mono text-[13px] font-medium uppercase tracking-[0.04em] text-ink transition-colors hover:bg-mint"
            >
              {nav('startFree')}
            </a>
            <a
              href={brand.sameAs[0]}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-white/20 text-white/75 transition-colors hover:text-white"
            >
              <Linkedin className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-8 gap-y-10 pt-12 sm:grid-cols-3 lg:grid-cols-5">
          {linkSlots.map((slot) => (
            <div key={slot.join('-')} className="space-y-10">
              {slot.map((key) => {
                const col = footerColumns.find((c) => c.key === key);
                if (!col) return null;
                return (
                  <div key={col.key}>
                    <p className="font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-white/60">{t(`columns.${col.key}`)}</p>
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

        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-6 text-[13px] text-white/60 lg:flex-row lg:items-center lg:justify-between">
          <span className="font-mono text-[12px] uppercase tracking-[0.06em]">© {new Date().getFullYear()} TriggerFlow · {t('company')}</span>
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
          <span className="font-mono text-[12px] uppercase tracking-[0.06em]">{t('hosted')}</span>
        </div>
      </div>
    </footer>
  );
}
