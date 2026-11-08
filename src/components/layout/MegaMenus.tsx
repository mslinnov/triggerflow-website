'use client';

import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import {
  ArrowRight,
  FileText,
} from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { brand } from '@/data/brand';
import { clientLogos, homeTestimonials } from '@/data/clients';
import { companyMenu, frOnlyKeys, platformMenu, productMenu, resourcesMenu, solutionsMenu, type NavItem } from '@/data/navigation';
import { pmsPages } from '@/content/pms';
import { navIcons } from '@/data/nav-icons';

const icons = navIcons;

/** Logos PMS affichés dans l'encadré Plateforme (connecteurs existants uniquement, cf. brand.pms). */
const pmsLogos = [
  { name: 'Mews', logo: '/images/integrations/mews.svg' },
  ...['thais', 'opera-cloud', 'medialog', 'misterbooking', 'apaleo', 'asterio', 'reservit'].map((slug) => ({
    name: pmsPages[slug].name,
    logo: pmsPages[slug].logo,
  })),
];

/** Colonnes du menu Produit : « Après le séjour » et « Marketing » partagent une colonne. */
const productSlots = [['before'], ['during'], ['after', 'marketing'], ['core']];

type T = ReturnType<typeof useTranslations>;

interface MenuProps {
  onPick: () => void;
}

export function ProductMenu({ onPick }: MenuProps) {
  const t = useTranslations('nav');
  return (
    <>
      <div className="grid grid-cols-4 gap-8">
        {productSlots.map((slot) => (
          <div key={slot.join('-')} className="space-y-6">
            {slot.map((key) => {
              const col = productMenu.find((c) => c.key === key);
              if (!col) return null;
              return (
                <div key={col.key}>
                  <ColumnTitle>{t(`columns.${col.key}`)}</ColumnTitle>
                  <ul className="mt-3 grid gap-0.5">
                    {col.items.map((item) => {
                      const Icon = icons[item.key] ?? FileText;
                      return (
                        <li key={item.key}>
                          <Link href={item.href} onClick={onPick} className="group -mx-2.5 flex items-start gap-3 rounded-xl p-2.5 transition-colors hover:bg-paper">
                            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line bg-white text-accent transition-colors group-hover:border-accent/40 group-hover:bg-mint/60">
                              <Icon aria-hidden className="h-[17px] w-[17px]" strokeWidth={1.75} />
                            </span>
                            <span className="min-w-0">
                              <span className="block text-[14px] font-semibold leading-tight text-ink group-hover:text-accent-hover">{t(`items.${item.key}`)}</span>
                              <span className="mt-1 block text-[13px] leading-snug text-ink-2">{t(`descriptions.${item.key}`)}</span>
                            </span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <div className="mt-6 flex items-center gap-6 rounded-2xl border border-line bg-paper px-5 py-3.5">
        <Link href="/produit/voice" onClick={onPick} className="group flex min-w-0 items-center gap-3">
          <span className="rounded-full bg-ink px-2.5 py-1 font-mono text-[10.5px] font-medium uppercase tracking-[0.08em] text-white">{t('featured.newLabel')}</span>
          <span className="truncate text-[14px] text-ink-2">
            <span className="font-semibold text-ink group-hover:text-accent-hover">{t('items.voice')}</span> · {t('featured.newText')}
          </span>
        </Link>
        <div className="ml-auto flex shrink-0 items-center gap-6">
          <Link href="/tarifs" onClick={onPick} className="text-[14px] font-semibold text-ink-2 hover:text-ink">{t('featured.pricingLink')}</Link>
          <Link href="/produit" onClick={onPick} className="group inline-flex items-center gap-1.5 text-[14px] font-semibold text-accent hover:text-accent-hover">
            {t('seePlatform')}
            <ArrowRight aria-hidden className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </>
  );
}

export function PlatformMenu({ onPick }: MenuProps) {
  const t = useTranslations('nav');
  return (
    <MenuShell
      main={
        <>
          <ColumnTitle>{t('menuColumns.platform')}</ColumnTitle>
          <RichList items={platformMenu} t={t} onPick={onPick} cols={2} />
        </>
      }
      aside={
        <div className="flex h-full flex-col rounded-2xl border border-line bg-paper p-5">
          <ColumnTitle>{t('featured.pmsEyebrow')}</ColumnTitle>
          <p className="mt-2 text-[17px] font-semibold leading-snug tracking-[-0.01em] text-ink">
            {t('featured.pmsTitle', { count: brand.pms.length })}
          </p>
          <ul className="mt-4 grid grid-cols-4 gap-2">
            {pmsLogos.map((p) => (
              <li key={p.name} className="flex h-11 items-center justify-center rounded-lg border border-line bg-white px-1.5">
                <Image src={p.logo} alt={p.name} width={64} height={24} className="h-auto max-h-5 w-auto max-w-full object-contain" />
              </li>
            ))}
          </ul>
          <AsideLink href="/integrations" onPick={onPick}>{t('featured.pmsCta')}</AsideLink>
        </div>
      }
    />
  );
}

export function SolutionsMenu({ onPick }: MenuProps) {
  const t = useTranslations('nav');
  const locale = useLocale() as 'fr' | 'en';
  const quote = homeTestimonials[0];
  const logo = clientLogos[quote.company as keyof typeof clientLogos];
  return (
    <MenuShell
      main={
        <>
          <ColumnTitle>{t('menuColumns.solutions')}</ColumnTitle>
          <RichList items={solutionsMenu} t={t} onPick={onPick} cols={2} />
        </>
      }
      aside={
        <figure className="flex h-full flex-col rounded-2xl bg-ink p-5 text-white">
          <ColumnTitle dark>{t('featured.quoteEyebrow')}</ColumnTitle>
          <blockquote className="mt-3 text-[15px] leading-relaxed text-white/90">«{'\u00a0'}{quote.quote[locale]}{'\u00a0'}»</blockquote>
          <figcaption className="mt-4 flex items-center gap-3">
            {logo && (
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white p-1.5">
                <Image src={logo.src} alt={quote.company} width={logo.width} height={logo.height} className="h-auto max-h-7 w-auto" />
              </span>
            )}
            <span className="text-[13px] leading-tight">
              <span className="block font-semibold text-white">{quote.name}</span>
              <span className="block text-white/70">{quote.role[locale]}, {quote.company}</span>
            </span>
          </figcaption>
          <AsideLink href="/clients" onPick={onPick} dark>{t('featured.quoteCta')}</AsideLink>
        </figure>
      }
    />
  );
}

export function ResourcesMenu({ onPick }: MenuProps) {
  const t = useTranslations('nav');
  const locale = useLocale();
  const learn = resourcesMenu.filter((i) => locale === 'fr' || !frOnlyKeys.has(i.key));
  return (
    <MenuShell
      main={
        <div className="grid grid-cols-[1.6fr_1fr] gap-8">
          <div>
            <ColumnTitle>{t('menuColumns.learn')}</ColumnTitle>
            <RichList items={learn} t={t} onPick={onPick} cols={2} />
          </div>
          <div className="border-l border-line pl-8">
            <ColumnTitle>{t('menuColumns.company')}</ColumnTitle>
            <RichList items={companyMenu} t={t} onPick={onPick} cols={1} />
          </div>
        </div>
      }
      aside={
        <Link
          href="/lp/upsell-hotel-livre-blanc"
          onClick={onPick}
          className="group flex h-full flex-col rounded-2xl border border-accent/25 bg-mint/50 p-5 transition-colors hover:border-accent/60"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-accent shadow-sm">
            <FileText aria-hidden className="h-5 w-5" strokeWidth={1.75} />
          </span>
          <span className="mt-4 font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-accent-hover">{t('featured.guideEyebrow')}</span>
          <span className="mt-1.5 text-[17px] font-semibold leading-snug tracking-[-0.01em] text-ink">{t('featured.guideTitle')}</span>
          <span className="mt-1.5 text-[13.5px] leading-relaxed text-ink-2">{t('featured.guideText')}</span>
          <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-[14px] font-semibold text-accent group-hover:text-accent-hover">
            {t('featured.guideCta')}
            <ArrowRight aria-hidden className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </span>
        </Link>
      }
    />
  );
}

function MenuShell({ main, aside }: { main: React.ReactNode; aside: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[1fr_320px] gap-10">
      <div>{main}</div>
      <div>{aside}</div>
    </div>
  );
}

function ColumnTitle({ children, dark }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <p className={`font-mono text-[11px] font-medium uppercase tracking-[0.08em] ${dark ? 'text-white/70' : 'text-ink-3'}`}>{children}</p>
  );
}

function RichList({ items, t, onPick, cols }: { items: NavItem[]; t: T; onPick: () => void; cols: 1 | 2 }) {
  return (
    <ul className={`mt-3 grid gap-1 ${cols === 2 ? 'grid-cols-2' : 'grid-cols-1'}`}>
      {items.map((item) => {
        const Icon = icons[item.key] ?? FileText;
        return (
          <li key={item.key}>
            <Link href={item.href} onClick={onPick} className="group -mx-3 flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-paper">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-line bg-white text-accent transition-colors group-hover:border-accent/40 group-hover:bg-mint/60">
                <Icon aria-hidden className="h-[18px] w-[18px]" strokeWidth={1.75} />
              </span>
              <span className="min-w-0">
                <span className="block text-[14px] font-semibold text-ink group-hover:text-accent-hover">{t(`items.${item.key}`)}</span>
                <span className="mt-0.5 block text-[13px] leading-snug text-ink-2">{t(`descriptions.${item.key}`)}</span>
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

function AsideLink({ href, onPick, children, dark }: { href: string; onPick: () => void; children: React.ReactNode; dark?: boolean }) {
  return (
    <Link
      href={href}
      onClick={onPick}
      className={`group mt-auto inline-flex items-center gap-1.5 pt-4 text-[14px] font-semibold ${dark ? 'text-mint hover:text-white' : 'text-accent hover:text-accent-hover'}`}
    >
      {children}
      <ArrowRight aria-hidden className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}
