'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { ArrowRight, Quote, MapPin, Building2 } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { caseStudies } from '@/lib/case-studies';
import {
  fadeInUp,
  staggerContainer,
  staggerItem,
  defaultViewport,
} from '@/lib/animations';

export default function CaseStudiesContent() {
  const t = useTranslations('caseStudies');
  const prefersReducedMotion = useReducedMotion();

  const featured = caseStudies[0]; // Edgar Hotel & Spa
  const others = caseStudies.slice(1);

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-brand-light via-white to-emerald-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={prefersReducedMotion ? 'visible' : 'hidden'}
            whileInView="visible"
            variants={fadeInUp}
            viewport={defaultViewport}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-dark mb-6">
              {t('hero.title')}
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              {t('hero.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Social Proof Banner */}
      <section className="py-8 bg-brand-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-white/80 text-lg">
            {t('socialProof')}
          </p>
        </div>
      </section>

      {/* Featured Case Study */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={prefersReducedMotion ? 'visible' : 'hidden'}
            whileInView="visible"
            variants={fadeInUp}
            viewport={defaultViewport}
          >
            <Link
              href={`/ressources/cas-clients/${featured.slug}`}
              className="group block"
            >
              <div className="grid md:grid-cols-2 gap-8 items-center rounded-2xl border border-gray-100 bg-white p-6 md:p-10 shadow-sm hover:shadow-xl hover:border-brand-primary/20 transition-all">
                {/* Image */}
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-gray-100">
                  <Image
                    src={featured.image}
                    alt={featured.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-brand-primary/10 text-brand-primary">
                      {featured.type}
                    </span>
                    <span className="flex items-center gap-1 text-sm text-gray-500">
                      <MapPin className="w-3.5 h-3.5" />
                      {featured.location}
                    </span>
                  </div>

                  <h2 className="text-2xl md:text-3xl font-bold text-brand-dark mb-4 group-hover:text-brand-primary transition-colors">
                    {featured.name}
                  </h2>

                  <blockquote className="text-lg text-gray-600 italic mb-6 leading-relaxed">
                    <Quote className="w-5 h-5 text-brand-primary/40 inline mr-2 -mt-1" />
                    {featured.quote}
                  </blockquote>

                  {/* Highlights */}
                  <ul className="space-y-2 mb-6">
                    {featured.highlights.map((highlight, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-primary shrink-0" />
                        {highlight}
                      </li>
                    ))}
                  </ul>

                  {/* Author + CTA */}
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-primary to-brand-dark flex items-center justify-center text-sm font-bold text-white">
                        {featured.initials}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-brand-dark">{featured.contactName}</p>
                        <p className="text-xs text-gray-500">{featured.contactRole}</p>
                      </div>
                    </div>
                    <span className="flex items-center gap-2 text-sm font-medium text-brand-primary group-hover:text-brand-dark transition-colors">
                      {t('readMore')}
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Other Case Studies Grid */}
      <section className="pb-16 md:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={prefersReducedMotion ? 'visible' : 'hidden'}
            whileInView="visible"
            variants={staggerContainer}
            viewport={defaultViewport}
            className="grid md:grid-cols-2 gap-6"
          >
            {others.map((study) => (
              <motion.div key={study.slug} variants={staggerItem}>
                <Link
                  href={`/ressources/cas-clients/${study.slug}`}
                  className="group block h-full"
                >
                  <div className="h-full bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg hover:border-brand-primary/20 transition-all">
                    {/* Image */}
                    <div className="relative aspect-[16/9] bg-gray-100">
                      <Image
                        src={study.image}
                        alt={study.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute top-4 left-4 flex gap-2">
                        <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-white/90 text-brand-dark backdrop-blur-sm">
                          {study.type}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col">
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                        <MapPin className="w-3.5 h-3.5" />
                        {study.location}
                        {study.pms && (
                          <>
                            <span className="text-gray-300">|</span>
                            <Building2 className="w-3.5 h-3.5" />
                            {study.pms}
                          </>
                        )}
                      </div>

                      <h3 className="text-xl font-bold text-brand-dark mb-3 group-hover:text-brand-primary transition-colors">
                        {study.name}
                      </h3>

                      <blockquote className="text-gray-600 italic mb-4 leading-relaxed">
                        <Quote className="w-4 h-4 text-brand-primary/40 inline mr-1.5 -mt-1" />
                        {study.quote}
                      </blockquote>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {study.objectives.map((objective) => (
                          <span
                            key={objective}
                            className="px-2 py-0.5 rounded-full text-xs bg-brand-light text-gray-600"
                          >
                            {objective}
                          </span>
                        ))}
                      </div>

                      {/* Author + CTA */}
                      <div className={cn(
                        'flex items-center justify-between mt-auto pt-4 border-t border-gray-100',
                      )}>
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-primary to-brand-dark flex items-center justify-center text-xs font-bold text-white">
                            {study.initials}
                          </div>
                          <div>
                            {study.contactName ? (
                              <>
                                <p className="text-sm font-semibold text-brand-dark">{study.contactName}</p>
                                <p className="text-xs text-gray-500">{study.contactRole}</p>
                              </>
                            ) : (
                              <p className="text-sm font-semibold text-brand-dark">{study.contactRole}</p>
                            )}
                          </div>
                        </div>
                        <span className="flex items-center gap-2 text-sm font-medium text-brand-primary group-hover:text-brand-dark transition-colors">
                          {t('readMore')}
                          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-brand-primary to-emerald-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={prefersReducedMotion ? 'visible' : 'hidden'}
            whileInView="visible"
            variants={fadeInUp}
            viewport={defaultViewport}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              {t('cta.title')}
            </h2>
            <a
              href="https://app.lemcal.com/@trigger-flow/demo"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-brand-primary px-8 py-4 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl"
            >
              {t('cta.button')}
              <ArrowRight className="w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
