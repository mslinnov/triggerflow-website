'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { ChevronDown, Menu, X } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { brand } from '@/data/brand';
import { companyMenu, frOnlyKeys, platformMenu, productMenu, resourcesMenu, solutionsMenu } from '@/data/navigation';
import { PlatformMenu, ProductMenu, ResourcesMenu, SolutionsMenu } from './MegaMenus';
import { LanguageSwitcher } from './LanguageSwitcher';

type MenuKey = 'product' | 'platform' | 'solutions' | 'resources';

interface SiteHeaderProps {
  banner?: React.ReactNode;
}

/** Header de la charte : blanc, flou au défilement, méga-menu Produit rangé par moment du séjour. */
export function SiteHeader({ banner }: SiteHeaderProps) {
  const t = useTranslations('nav');
  const locale = useLocale();
  const [open, setOpen] = useState<MenuKey | null>(null);
  const [mobile, setMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && (setOpen(null), setMobile(false));
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobile ? 'hidden' : '';
  }, [mobile]);

  const enter = (key: MenuKey) => {
    window.clearTimeout(closeTimer.current);
    setOpen(key);
  };
  const leave = () => {
    closeTimer.current = window.setTimeout(() => setOpen(null), 120);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {banner}
      <div
        className={cn(
          'border-b transition-colors duration-200',
          scrolled || open ? 'border-line bg-white/[0.97] backdrop-blur-md' : 'border-transparent bg-white'
        )}
        onMouseLeave={leave}
      >
        <div className="mx-auto flex h-16 max-w-[1200px] items-center gap-8 px-4 sm:px-6 lg:px-8">
          <Link href="/" className="shrink-0" aria-label="TriggerFlow">
            <Image src="/images/logo.webp" alt="TriggerFlow" width={140} height={35} className="h-7 w-auto" priority />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label={t('product')}>
            <MenuTrigger label={t('product')} active={open === 'product'} onEnter={() => enter('product')} onToggle={() => setOpen(open === 'product' ? null : 'product')} />
            <MenuTrigger label={t('platform')} active={open === 'platform'} onEnter={() => enter('platform')} onToggle={() => setOpen(open === 'platform' ? null : 'platform')} />
            <MenuTrigger label={t('solutions')} active={open === 'solutions'} onEnter={() => enter('solutions')} onToggle={() => setOpen(open === 'solutions' ? null : 'solutions')} />
            <TopLink href="/clients" onEnter={leave}>{t('clients')}</TopLink>
            <TopLink href="/tarifs" onEnter={leave}>{t('pricing')}</TopLink>
            <MenuTrigger label={t('resources')} active={open === 'resources'} onEnter={() => enter('resources')} onToggle={() => setOpen(open === 'resources' ? null : 'resources')} />
          </nav>

          <div className="ml-auto hidden items-center gap-3 lg:flex">
            <LanguageSwitcher />
            <a href="https://app.trigger-flow.com/login" target="_blank" rel="noopener noreferrer" className="px-2 text-[14px] font-medium text-ink-2 hover:text-ink">
              {t('login')}
            </a>
            <Link href={brand.demoPage} onClick={() => setMobile(false)} className="inline-flex h-10 items-center rounded-lg bg-accent px-4 font-mono text-[13px] font-medium uppercase tracking-[0.04em] text-white transition-colors hover:bg-accent-hover">
              {t('startFree')}
            </Link>
          </div>

          <Link href={brand.demoPage} onClick={() => setMobile(false)} className="ml-auto inline-flex h-9 items-center rounded-lg bg-accent px-3 font-mono text-[12px] font-medium uppercase tracking-[0.04em] text-white lg:hidden">
            {t('demoShort')}
          </Link>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-lg text-ink lg:hidden"
            onClick={() => setMobile(!mobile)}
            aria-label={mobile ? t('closeMenu') : t('openMenu')}
            aria-expanded={mobile}
          >
            {mobile ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Méga-menus desktop */}
        {open && (
          <div className="hidden border-t border-line bg-white lg:block" onMouseEnter={() => window.clearTimeout(closeTimer.current)}>
            <div className="mx-auto max-w-[1200px] px-8 py-8">
              {open === 'product' && <ProductMenu onPick={() => setOpen(null)} />}
              {open === 'platform' && <PlatformMenu onPick={() => setOpen(null)} />}
              {open === 'solutions' && <SolutionsMenu onPick={() => setOpen(null)} />}
              {open === 'resources' && <ResourcesMenu onPick={() => setOpen(null)} />}
            </div>
          </div>
        )}
      </div>

      {/* Menu mobile plein écran */}
      {mobile && (
        <div className="fixed inset-x-0 bottom-0 top-[100px] overflow-y-auto bg-white lg:hidden">
          <div className="px-4 pb-40 pt-4">
            <MobileGroup title={t('product')}>
              {productMenu.flatMap((c) => c.items).map((item) => (
                <MobileLink key={item.key} href={item.href} onPick={() => setMobile(false)}>{t(`items.${item.key}`)}</MobileLink>
              ))}
            </MobileGroup>
            <MobileGroup title={t('platform')}>
              {platformMenu.map((item) => (
                <MobileLink key={item.key} href={item.href} onPick={() => setMobile(false)}>{t(`items.${item.key}`)}</MobileLink>
              ))}
            </MobileGroup>
            <MobileGroup title={t('solutions')}>
              {solutionsMenu.map((item) => (
                <MobileLink key={item.key} href={item.href} onPick={() => setMobile(false)}>{t(`items.${item.key}`)}</MobileLink>
              ))}
            </MobileGroup>
            <MobileLink href="/clients" onPick={() => setMobile(false)} strong>{t('clients')}</MobileLink>
            <MobileLink href="/tarifs" onPick={() => setMobile(false)} strong>{t('pricing')}</MobileLink>
            <MobileGroup title={t('resources')}>
              {[...resourcesMenu, ...companyMenu].filter((i) => locale === 'fr' || !frOnlyKeys.has(i.key)).map((item) => (
                <MobileLink key={item.key} href={item.href} onPick={() => setMobile(false)}>{t(`items.${item.key}`)}</MobileLink>
              ))}
            </MobileGroup>
            <div className="mt-6">
              <LanguageSwitcher />
            </div>
          </div>
          <div className="fixed inset-x-0 bottom-0 grid gap-2 border-t border-line bg-white p-4">
            <Link href={brand.demoPage} onClick={() => setMobile(false)} className="flex h-12 items-center justify-center rounded-lg bg-accent font-mono text-sm font-medium uppercase tracking-[0.04em] text-white">
              {t('startFree')}
            </Link>
            <a href="https://app.trigger-flow.com/login" target="_blank" rel="noopener noreferrer" className="flex h-12 items-center justify-center rounded-lg border border-ink/80 font-mono text-sm font-medium uppercase tracking-[0.04em] text-ink">
              {t('login')}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

function MenuTrigger({ label, active, onEnter, onToggle }: { label: string; active: boolean; onEnter: () => void; onToggle: () => void }) {
  return (
    <button
      type="button"
      onMouseEnter={onEnter}
      onClick={onToggle}
      aria-expanded={active}
      className={cn('inline-flex items-center gap-1 rounded-md px-3 py-2 text-[14px] font-medium transition-colors', active ? 'text-ink' : 'text-ink-2 hover:text-ink')}
    >
      {label}
      <ChevronDown aria-hidden className={cn('h-3.5 w-3.5 transition-transform duration-150', active && 'rotate-180')} />
    </button>
  );
}

function TopLink({ href, children, onEnter }: { href: string; children: React.ReactNode; onEnter: () => void }) {
  return (
    <Link href={href} onMouseEnter={onEnter} className="rounded-md px-3 py-2 text-[14px] font-medium text-ink-2 transition-colors hover:text-ink">
      {children}
    </Link>
  );
}

function MobileGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <details className="group border-b border-line py-1">
      <summary className="flex cursor-pointer list-none items-center justify-between py-3 text-[17px] font-semibold text-ink [&::-webkit-details-marker]:hidden">
        {title}
        <ChevronDown aria-hidden className="h-4 w-4 text-ink-3 transition-transform group-open:rotate-180" />
      </summary>
      <div className="pb-3">{children}</div>
    </details>
  );
}

function MobileLink({ href, children, onPick, strong }: { href: string; children: React.ReactNode; onPick: () => void; strong?: boolean }) {
  return (
    <Link
      href={href}
      onClick={onPick}
      className={cn('block', strong ? 'border-b border-line py-4 text-[17px] font-semibold text-ink' : 'py-2 pl-1 text-[15px] text-ink-2')}
    >
      {children}
    </Link>
  );
}
