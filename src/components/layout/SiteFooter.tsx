import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Linkedin } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { CookieManagerLink } from '@/components/cookies';
import { brand } from '@/data/brand';
import { footerColumns } from '@/data/navigation';

/** Footer de la charte : fond encre, 7 colonnes, mention « Hébergé en France · RGPD ». */
export function SiteFooter() {
  const t = useTranslations('nav.footer');
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto max-w-[1200px] px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_4fr]">
          <div>
            <Image src="/images/logo-white.webp" alt="TriggerFlow" width={140} height={35} className="h-7 w-auto" />
            <p className="mt-5 max-w-[240px] text-[15px] leading-relaxed text-white/65">{t('tagline')}</p>
            <a href={brand.sameAs[0]} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="mt-6 inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 text-white/70 hover:text-white">
              <Linkedin className="h-4 w-4" />
            </a>
          </div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4 lg:grid-cols-7">
            {footerColumns.map((col) => (
              <div key={col.key}>
                <p className="font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-white/45">{t(`columns.${col.key}`)}</p>
                <ul className="mt-4 space-y-2.5">
                  {col.items.map((item) => (
                    <li key={item.key}>
                      <Link href={item.href} className="text-[14px] text-white/75 transition-colors hover:text-white">
                        {t(`items.${item.key}`)}
                      </Link>
                    </li>
                  ))}
                  {col.key === 'legal' && (
                    <li>
                      <CookieManagerLink className="text-left text-[14px] text-white/75 transition-colors hover:text-white" />
                    </li>
                  )}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-16 flex flex-col gap-3 border-t border-white/10 pt-6 font-mono text-[12px] uppercase tracking-[0.06em] text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} TriggerFlow · {t('company')}</span>
          <span>{t('hosted')}</span>
        </div>
      </div>
    </footer>
  );
}
