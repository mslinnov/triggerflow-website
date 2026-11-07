'use client';

import { useLocale, useTranslations } from 'next-intl';
import { motion, useReducedMotion } from 'framer-motion';
import { Mail, MessageSquare, MessageCircle, CreditCard } from 'lucide-react';
import { Container } from '@/components/ui';
import { fadeInUp, staggerContainer, staggerItem, defaultViewport } from '@/lib/animations';
import { stat, type StatId } from '@/data/company-stats';

/**
 * Vrais clients TriggerFlow et Utelys (docs/preuves.md, sélection validée le 07/11/2026).
 * Affichés en lettrage en attendant les fichiers logo : aucun logo de chaîne ou d'enseigne.
 */
const clients = [
  'Groupe Noemys',
  'AMMI Hôtels',
  'Edgar Hôtel & Spa',
  'Hôtel Causse Comtal',
  'Urban Bivouac',
  'Hôtel Arc en Ciel',
  'Le Vieux Pressoir',
  'Sezz Saint-Tropez',
  'Château de Courban',
  'Odomo',
  'BonjourSauvage',
  'Cime Hotel',
  'Pépites Lodges & Spas',
  'Soko Hotels',
  'Le Phébus & Spa',
  'Château Autignac',
];

/** Taux mesurés et sourcés de company-stats.ts (12 derniers mois). */
const kpis: { id: StatId; icon: typeof Mail; labelKey: string }[] = [
  { id: 'emailDelivered', icon: Mail, labelKey: 'emailDelivered' },
  { id: 'smsDelivered', icon: MessageSquare, labelKey: 'smsDelivered' },
  { id: 'whatsappRead', icon: MessageCircle, labelKey: 'whatsappRead' },
  { id: 'paidWithin2h', icon: CreditCard, labelKey: 'paidWithin2h' },
];

export function LogoCloud() {
  const t = useTranslations('logoCloud');
  const locale = useLocale();
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="border-y border-border-light bg-white py-10 md:py-14">
      <Container>
        <motion.p
          initial={prefersReducedMotion ? 'visible' : 'hidden'}
          whileInView="visible"
          variants={fadeInUp}
          viewport={defaultViewport}
          className="text-center text-sm font-medium uppercase tracking-wider text-text-muted"
        >
          {t('title')}
        </motion.p>

        {/* Noms des clients */}
        <ul className="mx-auto mt-6 flex max-w-5xl flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {clients.map((name) => (
            <li key={name} className="whitespace-nowrap text-base font-semibold tracking-tight text-text-secondary/70 md:text-lg">
              {name}
            </li>
          ))}
        </ul>

        {/* Taux mesurés */}
        <motion.div
          initial={prefersReducedMotion ? 'visible' : 'hidden'}
          whileInView="visible"
          variants={staggerContainer}
          viewport={defaultViewport}
          className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-0"
        >
          {kpis.map((kpi, index) => {
            const Icon = kpi.icon;
            return (
              <motion.div
                key={kpi.id}
                variants={staggerItem}
                className={`flex flex-col items-center px-4 py-2 text-center${
                  index < kpis.length - 1 ? ' sm:border-r sm:border-border-light' : ''
                }`}
              >
                <Icon className="mb-2 h-4 w-4 text-brand-primary/40" strokeWidth={1.5} />
                <span className="text-2xl font-bold text-brand-primary md:text-3xl">{stat(kpi.id, locale)}</span>
                <p className="mt-1 text-xs text-text-muted">{t(`rates.${kpi.labelKey}`)}</p>
              </motion.div>
            );
          })}
        </motion.div>
        <p className="mt-4 text-center text-xs text-text-muted">{t('ratesSource')}</p>
      </Container>
    </section>
  );
}
