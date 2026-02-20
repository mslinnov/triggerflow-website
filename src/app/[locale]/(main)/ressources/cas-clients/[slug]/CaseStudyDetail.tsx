'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { ArrowLeft, ArrowRight, Quote, MapPin, Building2, ChevronRight, CalendarDays } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { getCaseStudyBySlug, getAdjacentCaseStudies } from '@/lib/case-studies';
import {
  fadeInUp,
  staggerContainer,
  staggerItem,
  defaultViewport,
} from '@/lib/animations';

interface CaseStudyDetailProps {
  slug: string;
}

export default function CaseStudyDetail({ slug }: CaseStudyDetailProps) {
  const t = useTranslations('caseStudyDetail');
  const caseStudy = getCaseStudyBySlug(slug)!;
  const { prev, next } = getAdjacentCaseStudies(slug);
  const prefersReducedMotion = useReducedMotion();

  return (
    <main className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-brand-light/50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/ressources/cas-clients" className="hover:text-brand-primary transition-colors">
              {t('breadcrumb.caseStudies')}
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-brand-dark font-medium">{caseStudy.name}</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={prefersReducedMotion ? 'visible' : 'hidden'}
            whileInView="visible"
            variants={fadeInUp}
            viewport={defaultViewport}
            className="grid md:grid-cols-2 gap-8 md:gap-12 items-center"
          >
            {/* Content */}
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-brand-primary/10 text-brand-primary">
                  {caseStudy.type}
                </span>
                <span className="flex items-center gap-1 text-sm text-gray-500">
                  <MapPin className="w-3.5 h-3.5" />
                  {caseStudy.location}
                </span>
                {caseStudy.pms && (
                  <span className="flex items-center gap-1 text-sm text-gray-500">
                    <Building2 className="w-3.5 h-3.5" />
                    {caseStudy.pms}
                  </span>
                )}
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-dark mb-6">
                {caseStudy.name}
              </h1>

              <blockquote className="text-xl text-gray-600 italic leading-relaxed mb-8">
                <Quote className="w-6 h-6 text-brand-primary/40 inline mr-2 -mt-1" />
                {caseStudy.quote}
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-primary to-brand-dark flex items-center justify-center text-sm font-bold text-white">
                  {caseStudy.initials}
                </div>
                <div>
                  {caseStudy.contactName ? (
                    <>
                      <p className="font-semibold text-brand-dark">{caseStudy.contactName}</p>
                      <p className="text-sm text-gray-500">{caseStudy.contactRole}</p>
                    </>
                  ) : (
                    <p className="font-semibold text-brand-dark">{caseStudy.contactRole}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Image */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 shadow-lg">
              <Image
                src={caseStudy.image}
                alt={caseStudy.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Info Bar */}
      <section className="bg-brand-dark py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {caseStudy.highlights.map((highlight, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="mt-1 w-2 h-2 rounded-full bg-brand-primary shrink-0" />
                <p className="text-white/90 text-sm">{highlight}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Objectives Tags */}
      <section className="py-8 border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm font-medium text-gray-500">{t('objectives')} :</span>
            {caseStudy.objectives.map((objective) => (
              <span
                key={objective}
                className="px-3 py-1 rounded-full text-sm font-medium bg-brand-primary/10 text-brand-primary"
              >
                {objective}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Interview / Content Sections */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {caseStudy.sections.map((section, index) => (
              <motion.div
                key={index}
                initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <h2 className="text-xl md:text-2xl font-bold text-brand-dark mb-4 flex items-start gap-3">
                  <span className="mt-1 w-8 h-8 rounded-lg bg-brand-primary/10 flex items-center justify-center shrink-0">
                    <CalendarDays className="w-4 h-4 text-brand-primary" />
                  </span>
                  {section.question}
                </h2>
                <div className="pl-11">
                  {section.answer.split('\n\n').map((paragraph, pIndex) => (
                    <p key={pIndex} className="text-gray-600 leading-relaxed mb-4 last:mb-0">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Navigation between case studies */}
      <section className="border-t border-gray-100 bg-brand-light/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200">
            {/* Previous */}
            <div className="py-8 md:pr-8">
              {prev ? (
                <Link
                  href={`/ressources/cas-clients/${prev.slug}`}
                  className="group flex items-center gap-4 hover:opacity-80 transition-opacity"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-400 group-hover:-translate-x-1 transition-transform" />
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                      {t('nav.previous')}
                    </p>
                    <p className="font-semibold text-brand-dark group-hover:text-brand-primary transition-colors">
                      {prev.name}
                    </p>
                  </div>
                </Link>
              ) : (
                <Link
                  href="/ressources/cas-clients"
                  className="group flex items-center gap-4 hover:opacity-80 transition-opacity"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-400 group-hover:-translate-x-1 transition-transform" />
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                      {t('nav.backToList')}
                    </p>
                    <p className="font-semibold text-brand-dark group-hover:text-brand-primary transition-colors">
                      {t('nav.allCaseStudies')}
                    </p>
                  </div>
                </Link>
              )}
            </div>

            {/* Next */}
            <div className="py-8 md:pl-8 flex justify-end">
              {next ? (
                <Link
                  href={`/ressources/cas-clients/${next.slug}`}
                  className="group flex items-center gap-4 text-right hover:opacity-80 transition-opacity"
                >
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                      {t('nav.next')}
                    </p>
                    <p className="font-semibold text-brand-dark group-hover:text-brand-primary transition-colors">
                      {next.name}
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform" />
                </Link>
              ) : (
                <Link
                  href="/ressources/cas-clients"
                  className="group flex items-center gap-4 text-right hover:opacity-80 transition-opacity"
                >
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                      {t('nav.backToList')}
                    </p>
                    <p className="font-semibold text-brand-dark group-hover:text-brand-primary transition-colors">
                      {t('nav.allCaseStudies')}
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform" />
                </Link>
              )}
            </div>
          </div>
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
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t('cta.title')}
            </h2>
            <p className="text-white/80 text-lg mb-8">
              {t('cta.subtitle')}
            </p>
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
