'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Download, FileText, BookOpen, CheckSquare, Mail } from 'lucide-react';

const guides = [
  {
    slug: 'guide-automatisation-email-hotel',
    title: "Le guide complet de l'automatisation email pour hôtels",
    description: "Tout ce qu'il faut savoir pour automatiser vos communications : templates, timing, bonnes pratiques.",
    type: 'Guide',
    pages: 32,
    icon: FileText,
  },
  {
    slug: 'checklist-pre-sejour',
    title: 'Checklist : Les 15 points de contact pré-séjour',
    description: "Ne manquez plus aucune opportunité de communication avant l'arrivée de vos clients.",
    type: 'Checklist',
    pages: 8,
    icon: CheckSquare,
  },
  {
    slug: 'ebook-avis-google',
    title: 'E-book : Maîtriser les avis Google pour hôteliers',
    description: "Stratégies avancées pour collecter plus d'avis et améliorer votre note.",
    type: 'Ebook',
    pages: 45,
    icon: BookOpen,
  },
  {
    slug: 'guide-upsell-hotel',
    title: "Guide : L'upsell hôtelier de A à Z",
    description: 'Techniques, exemples et templates pour booster vos ventes additionnelles.',
    type: 'Guide',
    pages: 28,
    icon: FileText,
  },
  {
    slug: 'template-emails-hotel',
    title: "Pack : 20 templates d'emails hôteliers",
    description: "Templates prêts à l'emploi pour toutes les étapes du parcours client.",
    type: 'Templates',
    pages: 20,
    icon: Mail,
  },
  {
    slug: 'guide-fidelisation',
    title: 'Guide : Créer son programme de fidélité hôtelier',
    description: 'Comment concevoir et lancer un programme fidélité efficace sans budget énorme.',
    type: 'Guide',
    pages: 36,
    icon: FileText,
  },
];

export default function GuidesContent() {
  const t = useTranslations('guides');
  const prefersReducedMotion = useReducedMotion();
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

  const handleDownload = (_slug: string) => {
    alert(t('comingSoon'));
  };

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

      {/* Guides Grid */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {guides.map((guide, index) => {
              const Icon = guide.icon;
              return (
                <motion.div
                  key={guide.slug}
                  {...stagger}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="group bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg hover:border-brand-primary/20 transition-all h-full flex flex-col">
                    {/* Image placeholder */}
                    <div className="aspect-[4/3] bg-gradient-to-br from-brand-primary/10 to-brand-primary/5 flex items-center justify-center">
                      <div className="text-center">
                        <Icon className="w-16 h-16 text-brand-primary/40 mx-auto mb-2" />
                        <span className="text-sm text-brand-primary/60">{guide.pages} pages</span>
                      </div>
                    </div>

                    <div className="p-6 flex flex-col flex-1">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-brand-primary/10 text-brand-primary w-fit mb-3">
                        {guide.type}
                      </span>
                      <h3 className="text-lg font-bold text-brand-dark mb-2 group-hover:text-brand-primary transition-colors line-clamp-2">
                        {guide.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-6 line-clamp-3 flex-1">
                        {guide.description}
                      </p>
                      <button
                        onClick={() => handleDownload(guide.slug)}
                        className="inline-flex items-center justify-center gap-2 bg-brand-primary hover:bg-brand-primary/90 text-white px-4 py-2 rounded-lg font-medium transition-colors w-full"
                      >
                        <Download className="w-4 h-4" />
                        {t('download')}
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 md:py-24 bg-brand-dark">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div {...fadeIn}>
            <BookOpen className="w-12 h-12 text-brand-primary mx-auto mb-6" />
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
