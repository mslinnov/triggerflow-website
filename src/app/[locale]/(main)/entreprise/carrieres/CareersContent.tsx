'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import {
  Rocket,
  Heart,
  Users,
  Lightbulb,
  MapPin,
  Clock,
  Euro,
  Laptop,
  Coffee,
  Plane,
  GraduationCap,
  ArrowRight,
  Briefcase,
  Code,
  Megaphone,
  HeadphonesIcon,
} from 'lucide-react';

const values = [
  {
    icon: Rocket,
    title: 'Impact',
    description: 'Chaque membre de l\'équipe a un impact direct sur notre produit et nos clients.',
  },
  {
    icon: Heart,
    title: 'Passion',
    description: 'Nous sommes passionnés par l\'hôtellerie et la technologie qui la transforme.',
  },
  {
    icon: Users,
    title: 'Collaboration',
    description: 'Une équipe soudée où chacun peut s\'exprimer et contribuer.',
  },
  {
    icon: Lightbulb,
    title: 'Innovation',
    description: 'Nous challengeons le statu quo et cherchons toujours à faire mieux.',
  },
];

const benefits = [
  { icon: Euro, title: 'Salaire compétitif', description: 'Rémunération au-dessus du marché + BSPCE' },
  { icon: Laptop, title: 'Full remote', description: 'Travaillez d\'où vous voulez en France' },
  { icon: Clock, title: 'Flexibilité', description: 'Horaires flexibles, autonomie totale' },
  { icon: Coffee, title: 'Team buildings', description: 'Séminaires 2x/an dans des lieux inspirants' },
  { icon: Plane, title: 'Congés généreux', description: '6 semaines de congés payés' },
  { icon: GraduationCap, title: 'Formation', description: 'Budget formation annuel de 1500€' },
];

const openPositions = [
  {
    slug: 'senior-fullstack-developer',
    title: 'Senior Full-Stack Developer',
    department: 'Engineering',
    location: 'Remote France',
    type: 'CDI',
    icon: Code,
  },
  {
    slug: 'product-marketing-manager',
    title: 'Product Marketing Manager',
    department: 'Marketing',
    location: 'Remote France',
    type: 'CDI',
    icon: Megaphone,
  },
  {
    slug: 'customer-success-manager',
    title: 'Customer Success Manager',
    department: 'Customer Success',
    location: 'Remote France',
    type: 'CDI',
    icon: HeadphonesIcon,
  },
];

const stats = [
  { value: '15', label: 'Collaborateurs' },
  { value: '100%', label: 'Remote' },
  { value: '200+', label: 'Hôtels clients' },
  { value: '2022', label: 'Création' },
];

export default function CareersContent() {
  const t = useTranslations('careers');
  const prefersReducedMotion = useReducedMotion();

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

  const handleApply = (_slug: string) => {
    alert(t('applyComingSoon'));
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-brand-light via-white to-emerald-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeIn} className="text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-brand-primary/10 text-brand-primary mb-6">
              <Briefcase className="w-4 h-4 mr-2" />
              {t('hero.badge')}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-dark mb-6">
              {t('hero.title')}
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              {t('hero.subtitle')}
            </p>
            {/* eslint-disable-next-line */}
            <a
              href="#positions"
              className="inline-flex items-center justify-center gap-2 bg-brand-primary hover:bg-brand-primary/90 text-white px-8 py-4 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl"
            >
              {t('hero.cta')}
              <ArrowRight className="w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-brand-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                {...stagger}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-brand-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-white/70">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeIn} className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-brand-dark mb-4">
              {t('values.title')}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('values.subtitle')}
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  {...stagger}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="bg-white rounded-xl border border-gray-100 p-6 hover:shadow-lg hover:border-brand-primary/20 transition-all h-full">
                    <div className="w-12 h-12 rounded-xl bg-brand-primary/10 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-brand-primary" />
                    </div>
                    <h3 className="text-lg font-bold text-brand-dark mb-2">{value.title}</h3>
                    <p className="text-gray-600 text-sm">{value.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeIn} className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-brand-dark mb-4">
              {t('benefits.title')}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('benefits.subtitle')}
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={benefit.title}
                  {...stagger}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-start gap-4 bg-white rounded-xl border border-gray-100 p-6">
                    <div className="w-10 h-10 rounded-lg bg-brand-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-brand-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-brand-dark mb-1">{benefit.title}</h3>
                      <p className="text-gray-600 text-sm">{benefit.description}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section id="positions" className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeIn} className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-brand-dark mb-4">
              {t('positions.title')}
            </h2>
            <p className="text-gray-600">
              {t('positions.subtitle')}
            </p>
          </motion.div>

          <div className="space-y-4">
            {openPositions.map((position, index) => {
              const Icon = position.icon;
              return (
                <motion.div
                  key={position.slug}
                  {...stagger}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="group bg-white rounded-xl border border-gray-100 p-6 hover:shadow-lg hover:border-brand-primary/20 transition-all">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-brand-primary/10 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-6 h-6 text-brand-primary" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-brand-dark group-hover:text-brand-primary transition-colors">
                            {position.title}
                          </h3>
                          <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <Briefcase className="w-4 h-4" />
                              {position.department}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {position.location}
                            </span>
                            <span className="px-2 py-0.5 bg-brand-primary/10 text-brand-primary rounded-full text-xs font-medium">
                              {position.type}
                            </span>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => handleApply(position.slug)}
                        className="inline-flex items-center justify-center gap-2 bg-brand-primary hover:bg-brand-primary/90 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                      >
                        {t('positions.apply')}
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {openPositions.length === 0 && (
            <div className="text-center py-12 bg-gray-50 rounded-xl">
              <p className="text-gray-600">{t('positions.noOpenings')}</p>
            </div>
          )}
        </div>
      </section>

      {/* Spontaneous Application CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-brand-primary to-emerald-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div {...fadeIn}>
            <Heart className="w-12 h-12 text-white/80 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t('spontaneous.title')}
            </h2>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
              {t('spontaneous.subtitle')}
            </p>
            <a
              href="mailto:careers@trigger-flow.com"
              className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-brand-primary px-8 py-4 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl"
            >
              {t('spontaneous.cta')}
              <ArrowRight className="w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
