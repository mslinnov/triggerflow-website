'use client';

import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { UpsellSection } from './primitives';

/**
 * Les six objections qui restent avant le formulaire. Accordéon propre à la LP
 * pour rester sur ses tokens de couleur (le composant FaqAccordion du site est
 * figé sur la palette du site vitrine et ne suit pas le thème sombre d'ici).
 */

const QUESTIONS = ['retyping', 'spam', 'pms', 'setup', 'noSpa', 'price', 'gdpr'] as const;

export function UpsellFaq() {
  const t = useTranslations('lpUpsell.faq');
  const reduce = useReducedMotion();
  const [openKey, setOpenKey] = useState<string | null>(null);

  return (
    <UpsellSection className="bg-[var(--up-bg-sunken)]">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-[var(--up-ink)] md:text-4xl">
          {t('title')}
        </h2>

        <div className="mt-10 divide-y divide-[var(--up-line)] border-y border-[var(--up-line)]">
          {QUESTIONS.map((key) => {
            const isOpen = openKey === key;
            return (
              <div key={key}>
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpenKey(isOpen ? null : key)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left"
                  >
                    <span className="text-[17px] font-medium text-[var(--up-ink)]">
                      {t(`${key}.q`)}
                    </span>
                    <ChevronDown
                      className={cn(
                        'h-5 w-5 shrink-0 text-[var(--up-ink-muted)] transition-transform duration-200',
                        isOpen && 'rotate-180 text-[var(--up-accent-text)]'
                      )}
                      strokeWidth={2}
                    />
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={reduce ? false : { height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={reduce ? undefined : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 pr-10 text-[15px] leading-relaxed text-[var(--up-ink-soft)]">
                        {t(`${key}.a`)}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </UpsellSection>
  );
}
