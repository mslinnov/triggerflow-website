'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { ArrowRight, Clock, Calendar, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';

const blogPosts = [
  {
    slug: 'comment-augmenter-avis-google',
    title: 'Comment doubler vos avis Google en 3 mois',
    excerpt: "Découvrez les techniques utilisées par les hôtels qui collectent le plus d'avis positifs.",
    category: 'Avis',
    date: '2024-01-15',
    readTime: '8 min',
    featured: true,
  },
  {
    slug: 'automatisation-email-hotel',
    title: '5 emails que tout hôtel devrait automatiser',
    excerpt: "De la confirmation à la demande d'avis, les emails essentiels pour une relation client impeccable.",
    category: 'Automatisation',
    date: '2024-01-10',
    readTime: '6 min',
  },
  {
    slug: 'upsell-hotel-techniques',
    title: 'Upsell hôtelier : 7 techniques qui fonctionnent',
    excerpt: 'Augmentez votre panier moyen avec ces stratégies de ventes additionnelles éprouvées.',
    category: 'Marketing',
    date: '2024-01-05',
    readTime: '10 min',
  },
  {
    slug: 'whatsapp-business-hotellerie',
    title: 'WhatsApp Business pour les hôtels : le guide complet',
    excerpt: 'Pourquoi et comment utiliser WhatsApp pour communiquer avec vos clients.',
    category: 'Communication',
    date: '2023-12-20',
    readTime: '12 min',
  },
  {
    slug: 'fidelisation-client-hotel',
    title: 'Programme fidélité hôtel : par où commencer ?',
    excerpt: 'Les bases pour créer un programme de fidélité efficace sans budget marketing énorme.',
    category: 'Marketing',
    date: '2023-12-15',
    readTime: '7 min',
  },
  {
    slug: 'crm-hotelier-guide',
    title: "CRM hôtelier : pourquoi c'est indispensable en 2024",
    excerpt: 'Comment un CRM peut transformer votre connaissance client et booster vos revenus.',
    category: 'Outils',
    date: '2023-12-10',
    readTime: '9 min',
  },
];

const categories = ['Tous', 'Automatisation', 'Marketing', 'Avis', 'Communication', 'Outils'];

export default function BlogContent() {
  const t = useTranslations('blog');
  const prefersReducedMotion = useReducedMotion();
  const [activeCategory, setActiveCategory] = useState('Tous');
  const [email, setEmail] = useState('');

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

  const featuredPost = blogPosts.find((post) => post.featured);
  const filteredPosts = blogPosts.filter(
    (post) => !post.featured && (activeCategory === 'Tous' || post.category === activeCategory)
  );

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(t('newsletter.comingSoon'));
    setEmail('');
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-brand-light via-white to-emerald-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeIn} className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-dark mb-6">
              {t('hero.title')}
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              {t('hero.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Article */}
      {featuredPost && (
        <section className="py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div {...fadeIn}>
              <div
                className="group relative rounded-2xl overflow-hidden bg-gradient-to-br from-brand-primary/5 to-brand-primary/10 border border-gray-100 cursor-pointer"
                onClick={() => alert(t('comingSoon'))}
              >
                <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12">
                  <div className="flex flex-col justify-center">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-brand-primary/10 text-brand-primary w-fit mb-4">
                      {featuredPost.category}
                    </span>
                    <h2 className="text-2xl md:text-3xl font-bold text-brand-dark mb-4 group-hover:text-brand-primary transition-colors">
                      {featuredPost.title}
                    </h2>
                    <p className="text-gray-600 mb-6">{featuredPost.excerpt}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(featuredPost.date).toLocaleDateString('fr-FR', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {featuredPost.readTime}
                      </span>
                    </div>
                  </div>
                  <div className="relative aspect-video md:aspect-auto rounded-xl bg-gradient-to-br from-brand-primary/20 to-brand-primary/5 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-20 h-20 rounded-full bg-brand-primary/10 flex items-center justify-center mx-auto mb-4">
                        <ArrowRight className="w-8 h-8 text-brand-primary" />
                      </div>
                      <span className="text-brand-primary font-medium">{t('featured')}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Category Filters */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  'px-4 py-2 rounded-full text-sm font-medium transition-all',
                  activeCategory === category
                    ? 'bg-brand-primary text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                )}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.slug}
                {...stagger}
                transition={{ delay: index * 0.1 }}
              >
                <div
                  className="group bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg hover:border-brand-primary/20 transition-all cursor-pointer h-full flex flex-col"
                  onClick={() => alert(t('comingSoon'))}
                >
                  {/* Image placeholder */}
                  <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-brand-primary/10 flex items-center justify-center">
                      <ArrowRight className="w-6 h-6 text-brand-primary/50" />
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 w-fit mb-3">
                      {post.category}
                    </span>
                    <h3 className="text-lg font-bold text-brand-dark mb-2 group-hover:text-brand-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-1">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(post.date).toLocaleDateString('fr-FR', {
                          day: 'numeric',
                          month: 'short',
                        })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 md:py-24 bg-brand-dark">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div {...fadeIn}>
            <Mail className="w-12 h-12 text-brand-primary mx-auto mb-6" />
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              {t('newsletter.title')}
            </h2>
            <p className="text-white/70 mb-8">
              {t('newsletter.subtitle')}
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('newsletter.placeholder')}
                className="flex-1 px-4 py-3 rounded-lg border border-white/20 bg-white/10 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-brand-primary"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 bg-brand-primary hover:bg-brand-primary/90 text-white font-semibold rounded-lg transition-colors"
              >
                {t('newsletter.button')}
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
