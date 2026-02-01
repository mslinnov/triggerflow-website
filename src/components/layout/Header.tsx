'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import {
  Menu,
  X,
  User,
  ChevronDown,
  Mail,
  MessageSquare,
  MessageCircle,
  Inbox,
  Workflow,
  Users,
  Newspaper,
  Heart,
  Building2,
  FileText,
  ShoppingBag,
  BarChart3,
  Star,
  Hotel,
  Building,
  Home,
  BedDouble,
  Zap,
  TrendingUp,
  ThumbsUp,
  UserPlus,
  BookOpen,
  FileQuestion,
  HelpCircle,
  ArrowRight,
  LayoutGrid,
  Tent,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ButtonLink } from '@/components/ui';
import { LanguageSwitcher } from './LanguageSwitcher';

// Menu structure
const menuItems = {
  produit: {
    labelKey: 'product',
    columns: [
      {
        title: 'Communication',
        items: [
          { icon: Mail, label: 'Email', description: 'Campagnes email personnalisées', href: '/produit/email' },
          { icon: MessageSquare, label: 'SMS', description: 'Messages texte automatisés', href: '/produit/sms' },
          { icon: MessageCircle, label: 'WhatsApp', description: 'Conversations WhatsApp', href: '/produit/whatsapp' },
          { icon: Inbox, label: 'Hub messagerie', description: 'Centralisez vos échanges', href: '/produit/hub-messagerie' },
        ],
      },
      {
        title: 'Automatisation',
        items: [
          { icon: Workflow, label: 'Workflows & Triggers', description: 'Scénarios automatiques', href: '/produit/automatisations' },
          { icon: Users, label: 'CRM & Segments', description: 'Ciblez vos audiences', href: '/produit/crm' },
        ],
      },
      {
        title: 'Marketing',
        items: [
          { icon: Newspaper, label: 'Newsletter & Campagnes', description: 'Diffusez vos actualités', href: '/produit/newsletter' },
          { icon: Heart, label: 'Programme fidélité', description: 'Récompensez vos clients', href: '/produit/fidelite' },
        ],
      },
      {
        title: 'Outils',
        items: [
          { icon: Building2, label: 'CRM Hôtelier', description: 'Gestion relation client', href: '/produit/crm' },
          { icon: FileText, label: 'Formulaires', description: 'Collectez des données', href: '/produit/formulaires' },
          { icon: ShoppingBag, label: 'Ventes additionnelles', description: 'Boostez votre CA', href: '/produit/ventes-additionnelles' },
          { icon: BarChart3, label: 'Analytics', description: 'Tableaux de bord', href: '/produit/analytics' },
        ],
      },
      {
        title: 'Réputation',
        items: [
          { icon: Star, label: 'Gestion des avis', description: 'Améliorez votre e-réputation', href: '/produit/avis' },
        ],
      },
    ],
    featured: {
      icon: LayoutGrid,
      label: 'Vue d\'ensemble',
      description: 'Découvrez toutes nos fonctionnalités',
      href: '/produit',
    },
  },
  solutions: {
    labelKey: 'solutions',
    columns: [
      {
        title: 'Par établissement',
        items: [
          { icon: Hotel, label: 'Hôtels indépendants', description: 'Solution sur mesure', href: '/solutions/hotels-independants' },
          { icon: Building, label: 'Groupes hôteliers', description: 'Multi-établissements', href: '/solutions/groupes-hoteliers' },
          { icon: Home, label: 'Résidences', description: 'Locations saisonnières', href: '/solutions/residences' },
          { icon: Tent, label: 'Campings', description: 'Hôtellerie de plein air', href: '/solutions/campings' },
        ],
      },
      {
        title: 'Par objectif',
        items: [
          { icon: Zap, label: 'Automatiser communication', description: 'Gagnez du temps', href: '/solutions/automatiser-communication' },
          { icon: ThumbsUp, label: 'Augmenter avis Google', description: 'Boostez votre réputation', href: '/solutions/augmenter-avis' },
          { icon: TrendingUp, label: 'Booster upsell', description: 'Augmentez votre CA', href: '/solutions/booster-upsell' },
          { icon: UserPlus, label: 'Fidéliser clients', description: 'Créez des ambassadeurs', href: '/solutions/fideliser-clients' },
        ],
      },
    ],
  },
  ressources: {
    labelKey: 'resources',
    columns: [
      {
        title: 'Ressources',
        items: [
          { icon: BookOpen, label: 'Blog', description: 'Articles et actualités', href: '/blog' },
          { icon: Building2, label: 'Cas clients', description: 'Témoignages et succès', href: '/ressources/cas-clients' },
          { icon: FileQuestion, label: 'Guides & Ebooks', description: 'Contenus téléchargeables', href: '/ressources/guides' },
          { icon: HelpCircle, label: 'Centre d\'aide', description: 'FAQ et documentation', href: '/ressources/aide' },
        ],
      },
    ],
  },
};

type MenuKey = 'produit' | 'solutions' | 'ressources';

export function Header() {
  const t = useTranslations('header');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<MenuKey | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const handleMouseEnter = (key: MenuKey) => {
    setActiveDropdown(key);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled
            ? 'bg-white/95 backdrop-blur-lg shadow-sm'
            : 'bg-white/80 backdrop-blur-sm'
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <Logo />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden items-center gap-1 lg:flex">
              {/* Produit Dropdown */}
              <div
                onMouseEnter={() => handleMouseEnter('produit')}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  className={cn(
                    'flex items-center gap-1 rounded-lg px-4 py-2 text-sm font-medium transition-colors',
                    activeDropdown === 'produit' ? 'bg-zinc-100 text-brand-primary' : 'text-brand-dark hover:bg-zinc-100'
                  )}
                >
                  {t('product')}
                  <ChevronDown className={cn(
                    'h-4 w-4 transition-transform duration-200',
                    activeDropdown === 'produit' && 'rotate-180'
                  )} />
                </button>
              </div>

              {/* Intégrations Link */}
              <Link
                href="/integrations"
                className="flex items-center gap-1 rounded-lg px-4 py-2 text-sm font-medium text-brand-dark transition-colors hover:bg-zinc-100"
              >
                {t('integrations')}
              </Link>

              {/* Solutions Dropdown */}
              <div
                onMouseEnter={() => handleMouseEnter('solutions')}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  className={cn(
                    'flex items-center gap-1 rounded-lg px-4 py-2 text-sm font-medium transition-colors',
                    activeDropdown === 'solutions' ? 'bg-zinc-100 text-brand-primary' : 'text-brand-dark hover:bg-zinc-100'
                  )}
                >
                  {t('solutions')}
                  <ChevronDown className={cn(
                    'h-4 w-4 transition-transform duration-200',
                    activeDropdown === 'solutions' && 'rotate-180'
                  )} />
                </button>
              </div>

              {/* Tarifs Link */}
              <Link
                href="/tarifs"
                className="flex items-center gap-1 rounded-lg px-4 py-2 text-sm font-medium text-brand-dark transition-colors hover:bg-zinc-100"
              >
                {t('pricing')}
              </Link>

              {/* Blog Link */}
              <Link
                href="/blog"
                className="flex items-center gap-1 rounded-lg px-4 py-2 text-sm font-medium text-brand-dark transition-colors hover:bg-zinc-100"
              >
                Blog
              </Link>
            </nav>

            {/* Desktop Actions */}
            <div className="hidden items-center gap-3 lg:flex">
              <LanguageSwitcher />
              <a
                href="https://app.trigger-flow.com/login"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm font-medium text-brand-dark transition-colors hover:bg-zinc-100"
                aria-label={t('login')}
              >
                <User className="h-4 w-4" />
                <span className="hidden xl:inline">{t('login')}</span>
              </a>
              <ButtonLink
                href="https://app.lemcal.com/@trigger-flow/demo"
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                size="sm"
                className="whitespace-nowrap"
              >
                {t('demo')}
              </ButtonLink>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-lg text-brand-dark transition-colors hover:bg-brand-light lg:hidden"
              aria-label={isMobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Full-width Mega Menu */}
        <AnimatePresence>
          {activeDropdown && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute left-0 right-0 top-full border-t border-zinc-100 bg-white shadow-xl"
              onMouseEnter={() => setActiveDropdown(activeDropdown)}
              onMouseLeave={handleMouseLeave}
            >
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
                {activeDropdown === 'produit' && <MegaMenuProduit />}
                {activeDropdown === 'solutions' && <MegaMenuSolutions />}
                {/* Ressources menu removed — only Blog link */}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileMenu t={t} onClose={() => setIsMobileMenuOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}

function Logo() {
  const [imageError, setImageError] = useState(false);

  if (imageError) {
    return (
      <span className="text-xl font-bold text-brand-dark">
        Trigger<span className="text-brand-primary">Flow</span>
      </span>
    );
  }

  return (
    <Image
      src="/images/logo.webp"
      alt="TriggerFlow"
      width={160}
      height={40}
      className="h-8 w-auto md:h-10"
      priority
      onError={() => setImageError(true)}
    />
  );
}

function MegaMenuProduit() {
  return (
    <div>
      <div className="grid grid-cols-5 gap-8">
        {menuItems.produit.columns.map((column) => (
          <div key={column.title}>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-zinc-500">
              {column.title}
            </h3>
            <ul className="space-y-1">
              {column.items.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href as any}
                    className="group flex items-start gap-3 rounded-lg p-2 transition-colors hover:bg-brand-light/50"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-light group-hover:bg-brand-primary/10">
                      <item.icon className="h-5 w-5 text-brand-primary" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-brand-dark group-hover:text-brand-primary">
                        {item.label}
                      </div>
                      <div className="text-xs text-zinc-500 leading-snug">
                        {item.description}
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Featured Link */}
      <div className="mt-8 pt-6 border-t border-zinc-100">
        <Link
          href="/produit"
          className="group flex items-center gap-4 rounded-xl bg-gradient-to-r from-brand-light to-brand-light/50 p-4 transition-all hover:from-brand-light hover:to-brand-light"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-primary shadow-lg shadow-brand-primary/20">
            <menuItems.produit.featured.icon className="h-6 w-6 text-white" />
          </div>
          <div className="flex-1">
            <div className="text-base font-semibold text-brand-dark">
              {menuItems.produit.featured.label}
            </div>
            <div className="text-sm text-zinc-600">
              {menuItems.produit.featured.description}
            </div>
          </div>
          <ArrowRight className="h-5 w-5 text-brand-primary transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}

function MegaMenuSolutions() {
  return (
    <div className="grid grid-cols-2 gap-12">
      {menuItems.solutions.columns.map((column) => (
        <div key={column.title}>
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-zinc-500">
            {column.title}
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {column.items.map((item) => (
              <Link
                key={item.label}
                href={item.href as any}
                className="group flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-brand-light/50"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-light group-hover:bg-brand-primary/10">
                  <item.icon className="h-5 w-5 text-brand-primary" />
                </div>
                <div>
                  <div className="text-sm font-medium text-brand-dark group-hover:text-brand-primary">
                    {item.label}
                  </div>
                  <div className="text-xs text-zinc-500 leading-snug">
                    {item.description}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function MegaMenuRessources() {
  return (
    <div className="grid grid-cols-4 gap-4">
      {menuItems.ressources.columns[0].items.map((item) => (
        <a
          key={item.label}
          href={item.href}
          target={item.href.startsWith('http') ? '_blank' : undefined}
          rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
          className="group flex items-start gap-4 rounded-xl border border-zinc-100 bg-white p-4 transition-all hover:border-brand-primary/20 hover:shadow-lg"
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-light group-hover:bg-brand-primary/10">
            <item.icon className="h-6 w-6 text-brand-primary" />
          </div>
          <div>
            <div className="text-base font-medium text-brand-dark group-hover:text-brand-primary">
              {item.label}
            </div>
            <div className="mt-1 text-sm text-zinc-500 leading-snug">
              {item.description}
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}

interface MobileMenuProps {
  t: (key: string) => string;
  onClose: () => void;
}

function MobileMenu({ t, onClose }: MobileMenuProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-40 lg:hidden"
    >
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Menu Panel */}
      <motion.nav
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="absolute right-0 top-0 h-full w-full max-w-sm bg-white shadow-xl overflow-y-auto"
      >
        <div className="flex h-16 items-center justify-between px-4 md:h-20 border-b border-zinc-100">
          <span className="text-lg font-semibold text-brand-dark">Menu</span>
          <button
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-brand-dark transition-colors hover:bg-brand-light"
            aria-label="Fermer le menu"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="flex flex-col p-4">
          {/* Produit */}
          <MobileAccordion
            title={t('product')}
            isExpanded={expandedSection === 'produit'}
            onToggle={() => setExpandedSection(expandedSection === 'produit' ? null : 'produit')}
          >
            {menuItems.produit.columns.map((column) => (
              <div key={column.title} className="mb-4">
                <div className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2 px-2">
                  {column.title}
                </div>
                {column.items.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href as any}
                    onClick={onClose}
                    className="flex items-center gap-3 rounded-lg px-2 py-2 text-sm text-brand-dark hover:bg-zinc-50"
                  >
                    <item.icon className="h-4 w-4 text-brand-primary" />
                    {item.label}
                  </Link>
                ))}
              </div>
            ))}
          </MobileAccordion>

          {/* Intégrations */}
          <Link
            href="/integrations"
            onClick={onClose}
            className="flex items-center justify-between rounded-lg px-4 py-3 text-base font-medium text-brand-dark hover:bg-zinc-50"
          >
            {t('integrations')}
          </Link>

          {/* Solutions */}
          <MobileAccordion
            title={t('solutions')}
            isExpanded={expandedSection === 'solutions'}
            onToggle={() => setExpandedSection(expandedSection === 'solutions' ? null : 'solutions')}
          >
            {menuItems.solutions.columns.map((column) => (
              <div key={column.title} className="mb-4">
                <div className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2 px-2">
                  {column.title}
                </div>
                {column.items.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href as any}
                    onClick={onClose}
                    className="flex items-center gap-3 rounded-lg px-2 py-2 text-sm text-brand-dark hover:bg-zinc-50"
                  >
                    <item.icon className="h-4 w-4 text-brand-primary" />
                    {item.label}
                  </Link>
                ))}
              </div>
            ))}
          </MobileAccordion>

          {/* Tarifs */}
          <Link
            href="/tarifs"
            onClick={onClose}
            className="flex items-center justify-between rounded-lg px-4 py-3 text-base font-medium text-brand-dark hover:bg-zinc-50"
          >
            {t('pricing')}
          </Link>

          {/* Blog */}
          <Link
            href="/blog"
            onClick={onClose}
            className="flex items-center justify-between rounded-lg px-4 py-3 text-base font-medium text-brand-dark hover:bg-zinc-50"
          >
            Blog
          </Link>

          <div className="my-4 border-t border-zinc-200" />

          <div className="px-2 mb-4">
            <LanguageSwitcher />
          </div>

          <a
            href="https://app.trigger-flow.com/login"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg px-4 py-3 text-base font-medium text-brand-dark hover:bg-zinc-50"
          >
            <User className="h-5 w-5" />
            {t('login')}
          </a>

          <div className="mt-4 px-2">
            <ButtonLink
              href="https://app.lemcal.com/@trigger-flow/demo"
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
              size="lg"
              className="w-full justify-center"
            >
              {t('demo')}
            </ButtonLink>
          </div>
        </div>
      </motion.nav>
    </motion.div>
  );
}

interface MobileAccordionProps {
  title: string;
  isExpanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

function MobileAccordion({ title, isExpanded, onToggle, children }: MobileAccordionProps) {
  return (
    <div>
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between rounded-lg px-4 py-3 text-base font-medium text-brand-dark hover:bg-zinc-50"
      >
        {title}
        <ChevronDown className={cn(
          'h-5 w-5 text-zinc-500 transition-transform duration-200',
          isExpanded && 'rotate-180'
        )} />
      </button>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pl-4 pb-2">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
