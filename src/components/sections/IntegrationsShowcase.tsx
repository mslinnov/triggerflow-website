'use client';

import { useTranslations } from 'next-intl';
import { motion, type Variants } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight, Check, Plug } from 'lucide-react';
import { Container, Badge } from '@/components/ui';
import { fadeInUp, defaultViewport } from '@/lib/animations';
import { Link } from '@/i18n/navigation';

interface PmsIntegration {
  name: string;
  slug: string;
  src: string;
  color: string;
}

const integrations: PmsIntegration[] = [
  { name: 'Mews', slug: 'mews', src: '/images/pms/mews.svg', color: '#1C1D24' },
  { name: 'Opera', slug: 'opera', src: '/images/pms/opera.svg', color: '#C74634' },
  { name: 'Thaïs', slug: 'thais', src: '/images/pms/thais.svg', color: '#051991' },
  { name: 'D-EDGE', slug: 'dedge', src: '/images/pms/dedge.svg', color: '#432975' },
  { name: 'Misterbooking', slug: 'misterbooking', src: '/images/pms/misterbooking.svg', color: '#098AFF' },
  { name: 'Asterio', slug: 'asterio', src: '/images/pms/asterio.svg', color: '#FF6136' },
  { name: 'Amenitiz', slug: 'amenitiz', src: '/images/pms/amenitiz.svg', color: '#006AFF' },
  { name: 'Reservit', slug: 'reservit', src: '/images/pms/reservit.svg', color: '#0F172A' },
  { name: 'Medialog', slug: 'medialog', src: '/images/pms/medialog.svg', color: '#0070B0' },
];

// --- Animations ---

const staggerGrid: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.15,
    },
  },
};

const cardReveal: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

// --- Main Component ---

export function IntegrationsShowcase() {
  const t = useTranslations('integrationsShowcase');

  return (
    <section className="bg-[var(--v3-bg-primary)] py-16 md:py-24 overflow-hidden">
      <Container>
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeInUp}
          className="text-center mb-10 md:mb-14"
        >
          <Badge variant="accent" className="mb-3">
            {t('badge')}
          </Badge>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-v3-text-primary">
            {t('title')}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-lg text-v3-text-secondary">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* PMS Grid — All equal */}
        <motion.div
          variants={staggerGrid}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="mx-auto max-w-5xl grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5"
        >
          {integrations.map((pms) => (
            <PMSCard key={pms.slug} pms={pms} />
          ))}

          {/* +50 card */}
          <motion.div
            variants={cardReveal}
            whileHover={{ y: -4, scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="flex flex-col items-center justify-center rounded-2xl border border-brand-primary/20 bg-brand-primary/5 p-5 md:p-6 cursor-default"
          >
            <div className="flex items-center justify-center h-14 md:h-16 w-full mb-3">
              <Plug className="h-8 w-8 text-brand-primary" />
            </div>
            <span className="text-sm font-bold text-brand-primary">
              {t('count')}
            </span>
          </motion.div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeInUp}
          className="mt-8 md:mt-10 text-center"
        >
          <Link
            href="/integrations"
            className="inline-flex items-center gap-2 text-brand-primary font-semibold hover:underline underline-offset-4 transition-colors"
          >
            {t('cta')}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}

/* ——— Sub-components ——— */

function PMSCard({ pms }: { pms: PmsIntegration }) {
  return (
    <motion.div
      variants={cardReveal}
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="group relative flex flex-col items-center rounded-2xl border border-v3-border/50 bg-white p-5 md:p-6 shadow-[var(--v3-shadow-sm)] transition-all duration-300 hover:shadow-[var(--v3-shadow-lg)] hover:border-brand-primary/30 cursor-default"
    >
      {/* Colored accent bar */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 h-1 w-10 rounded-b-full opacity-60 group-hover:opacity-100 group-hover:w-16 transition-all duration-300"
        style={{ backgroundColor: pms.color }}
      />

      {/* Logo */}
      <div className="flex items-center justify-center h-14 md:h-16 w-full mb-3">
        <Image
          src={pms.src}
          alt={`Logo ${pms.name}`}
          width={160}
          height={48}
          style={{ width: 'auto', maxWidth: '140px', height: 'auto', maxHeight: '48px' }}
          className="object-contain transition-all duration-300 group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
            if (e.currentTarget.parentElement) {
              e.currentTarget.parentElement.innerHTML = `<span class="text-lg font-bold" style="color: ${pms.color}">${pms.name}</span>`;
            }
          }}
        />
      </div>

      {/* Name */}
      <span className="text-sm font-semibold text-v3-text-primary mb-1.5">
        {pms.name}
      </span>

      {/* Native badge */}
      <span className="inline-flex items-center gap-1 text-[10px] font-medium text-brand-primary bg-brand-primary/8 rounded-full px-2 py-0.5">
        <Check className="h-2.5 w-2.5" />
        Natif
      </span>
    </motion.div>
  );
}
