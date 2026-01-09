'use client';

import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Container } from '@/components/ui';

const faqs = [
  {
    question: 'Est-ce que c\'est vraiment facile à configurer ?',
    answer: 'Oui ! On vous accompagne pendant 30 minutes pour configurer vos premiers emails automatiques. Pas besoin de compétences techniques. Si vous savez envoyer un email, vous saurez utiliser TriggerFlow.',
  },
  {
    question: 'Combien de temps ça prend à mettre en place ?',
    answer: 'La configuration initiale prend environ 30 minutes avec notre équipe. Ensuite, tout fonctionne automatiquement. Vous pouvez être opérationnel dès le premier jour.',
  },
  {
    question: 'Est-ce que mes données Thaïs sont en sécurité ?',
    answer: 'Absolument. TriggerFlow est partenaire officiel de Thaïs. Nous ne modifions jamais vos données, nous les lisons uniquement pour personnaliser vos messages. Tout est hébergé en France et conforme au RGPD.',
  },
  {
    question: 'Que se passe-t-il si je me trompe dans la configuration ?',
    answer: 'Pas de panique ! Vous pouvez modifier ou désactiver n\'importe quel email automatique en un clic. Et notre équipe support est là pour vous aider si besoin (réponse en moins de 2h).',
  },
  {
    question: 'Puis-je essayer avant de m\'engager ?',
    answer: 'Bien sûr ! Nous offrons 14 jours d\'essai gratuit, sans carte bancaire. Et vous pouvez annuler à tout moment, sans engagement.',
  },
  {
    question: 'Comment fonctionne le support ?',
    answer: 'Notre équipe est 100% française et spécialisée dans l\'hôtellerie. Support par email avec réponse en moins de 2h, et appels téléphoniques disponibles pour les questions complexes.',
  },
];

function FAQItem({ question, answer, isOpen, onClick }: {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="border-b border-[var(--v3-border)]">
      <button
        onClick={onClick}
        className="flex w-full items-center justify-between py-5 text-left transition-colors hover:text-[var(--v3-accent-green)]"
      >
        <span className="pr-4 text-lg font-medium text-[var(--v3-text-primary)]">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
          className="shrink-0"
        >
          <ChevronDown className="h-5 w-5 text-[var(--v3-text-muted)]" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-[var(--v3-text-secondary)]">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function ThaisV3FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="faq" className="bg-[var(--v3-bg-primary)] py-20 md:py-28">
      <Container>
        <div className="mx-auto max-w-3xl">
          {/* Header */}
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <span className="mb-4 inline-block rounded-full border border-[var(--v3-border)] bg-[var(--v3-bg-secondary)] px-4 py-2 text-sm font-medium text-[var(--v3-text-secondary)]">
              Questions fréquentes
            </span>
            <h2 className="font-[family-name:var(--font-cormorant)] text-3xl font-semibold tracking-tight text-[var(--v3-text-primary)] md:text-4xl">
              Vous avez des questions ?
            </h2>
          </motion.div>

          {/* FAQ list */}
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-[var(--v3-border)] bg-[var(--v3-bg-secondary)] px-6"
          >
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              />
            ))}
          </motion.div>

          {/* Contact prompt */}
          <motion.p
            initial={prefersReducedMotion ? {} : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-8 text-center text-[var(--v3-text-muted)]"
          >
            Vous avez une autre question ?{' '}
            <a
              href="mailto:contact@trigger-flow.com"
              className="font-medium text-[var(--v3-accent-green)] hover:underline"
            >
              Contactez-nous
            </a>
          </motion.p>
        </div>
      </Container>
    </section>
  );
}
