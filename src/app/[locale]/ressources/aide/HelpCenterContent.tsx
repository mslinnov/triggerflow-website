'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import {
  Search,
  BookOpen,
  Settings,
  Zap,
  MessageSquare,
  CreditCard,
  Shield,
  ChevronRight,
  HelpCircle,
  Play,
  FileText,
  Headphones,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const categories = [
  {
    slug: 'demarrage',
    title: 'Prise en main',
    description: 'Premiers pas avec TriggerFlow',
    icon: Play,
    articles: 12,
  },
  {
    slug: 'configuration',
    title: 'Configuration',
    description: 'Paramétrage de votre compte',
    icon: Settings,
    articles: 18,
  },
  {
    slug: 'automatisation',
    title: 'Automatisation',
    description: 'Créer et gérer vos workflows',
    icon: Zap,
    articles: 24,
  },
  {
    slug: 'communication',
    title: 'Communication',
    description: 'Email, SMS et WhatsApp',
    icon: MessageSquare,
    articles: 15,
  },
  {
    slug: 'facturation',
    title: 'Facturation',
    description: 'Abonnement et paiements',
    icon: CreditCard,
    articles: 8,
  },
  {
    slug: 'securite',
    title: 'Sécurité & RGPD',
    description: 'Protection des données',
    icon: Shield,
    articles: 10,
  },
];

const popularArticles = [
  {
    slug: 'connecter-pms',
    title: 'Comment connecter mon PMS à TriggerFlow ?',
    category: 'Configuration',
    views: '2.4k',
  },
  {
    slug: 'premier-workflow',
    title: 'Créer mon premier workflow automatique',
    category: 'Automatisation',
    views: '1.8k',
  },
  {
    slug: 'template-email',
    title: "Personnaliser les templates d'emails",
    category: 'Communication',
    views: '1.5k',
  },
  {
    slug: 'demande-avis',
    title: 'Automatiser les demandes d\'avis Google',
    category: 'Automatisation',
    views: '1.3k',
  },
  {
    slug: 'importer-contacts',
    title: 'Importer ma base de contacts existante',
    category: 'Configuration',
    views: '1.1k',
  },
];

const quickLinks = [
  {
    title: 'Documentation API',
    description: 'Intégrez TriggerFlow à vos outils',
    icon: FileText,
    href: '#',
  },
  {
    title: 'Tutoriels vidéo',
    description: 'Apprenez en regardant',
    icon: Play,
    href: '#',
  },
  {
    title: 'Support technique',
    description: 'Contactez notre équipe',
    icon: Headphones,
    href: '#',
  },
];

export default function HelpCenterContent() {
  const t = useTranslations('helpCenter');
  const prefersReducedMotion = useReducedMotion();
  const [searchQuery, setSearchQuery] = useState('');

  const fadeIn = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6 },
      };

  const stagger = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
      };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    alert(t('searchComingSoon'));
  };

  const handleCategoryClick = (slug: string) => {
    alert(t('comingSoon'));
  };

  const handleArticleClick = (slug: string) => {
    alert(t('comingSoon'));
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section with Search */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-brand-light via-white to-emerald-50/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeIn} className="text-center">
            <HelpCircle className="w-16 h-16 text-brand-primary mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-dark mb-6">
              {t('hero.title')}
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              {t('hero.subtitle')}
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t('hero.searchPlaceholder')}
                  className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent text-lg"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-2 bg-brand-primary hover:bg-brand-primary/90 text-white font-medium rounded-lg transition-colors"
                >
                  {t('hero.searchButton')}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-8 bg-brand-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-4">
            {quickLinks.map((link, index) => {
              const Icon = link.icon;
              return (
                <motion.div
                  key={link.title}
                  {...stagger}
                  transition={{ delay: index * 0.1 }}
                >
                  <button
                    onClick={() => alert(t('comingSoon'))}
                    className="w-full flex items-center gap-4 p-4 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-left"
                  >
                    <div className="w-10 h-10 rounded-lg bg-brand-primary/20 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-brand-primary" />
                    </div>
                    <div>
                      <div className="text-white font-medium">{link.title}</div>
                      <div className="text-white/60 text-sm">{link.description}</div>
                    </div>
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeIn} className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-brand-dark mb-4">
              {t('categories.title')}
            </h2>
            <p className="text-gray-600">{t('categories.subtitle')}</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => {
              const Icon = category.icon;
              return (
                <motion.div
                  key={category.slug}
                  {...stagger}
                  transition={{ delay: index * 0.1 }}
                >
                  <button
                    onClick={() => handleCategoryClick(category.slug)}
                    className="w-full group bg-white rounded-xl border border-gray-100 p-6 hover:shadow-lg hover:border-brand-primary/20 transition-all text-left"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-brand-primary/10 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-brand-primary" />
                      </div>
                      <span className="text-sm text-gray-500">
                        {category.articles} {t('categories.articles')}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-brand-dark mb-2 group-hover:text-brand-primary transition-colors">
                      {category.title}
                    </h3>
                    <p className="text-gray-600 text-sm">{category.description}</p>
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Popular Articles */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeIn} className="text-center mb-12">
            <BookOpen className="w-10 h-10 text-brand-primary mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl font-bold text-brand-dark mb-4">
              {t('popular.title')}
            </h2>
            <p className="text-gray-600">{t('popular.subtitle')}</p>
          </motion.div>

          <div className="space-y-3">
            {popularArticles.map((article, index) => (
              <motion.div
                key={article.slug}
                {...stagger}
                transition={{ delay: index * 0.05 }}
              >
                <button
                  onClick={() => handleArticleClick(article.slug)}
                  className="w-full group flex items-center justify-between p-4 bg-white rounded-lg border border-gray-100 hover:shadow-md hover:border-brand-primary/20 transition-all text-left"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-lg bg-brand-primary/10 flex items-center justify-center">
                      <FileText className="w-4 h-4 text-brand-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-brand-dark group-hover:text-brand-primary transition-colors">
                        {article.title}
                      </h3>
                      <span className="text-sm text-gray-500">{article.category}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-400">{article.views} vues</span>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-brand-primary group-hover:translate-x-1 transition-all" />
                  </div>
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Support CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-brand-primary to-emerald-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div {...fadeIn}>
            <Headphones className="w-12 h-12 text-white/80 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t('support.title')}
            </h2>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
              {t('support.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => alert(t('comingSoon'))}
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-brand-primary px-8 py-4 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl"
              >
                <MessageSquare className="w-5 h-5" />
                {t('support.chatButton')}
              </button>
              <a
                href="mailto:support@trigger-flow.com"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-lg font-semibold transition-all border border-white/20"
              >
                {t('support.emailButton')}
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
