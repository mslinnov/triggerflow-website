'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { Container } from '@/components/ui';

const faqs = [
  {
    question: 'Puis-je tester TriggerFlow avant de payer ?',
    answer:
      "Nous proposons une démo personnalisée gratuite de 30 minutes où nous configurons ensemble votre première automatisation. Vous voyez concrètement comment TriggerFlow fonctionne avec vos données Thaïs avant tout engagement.",
  },
  {
    question: 'Mes données clients sont-elles sécurisées (RGPD) ?',
    answer:
      "Absolument. TriggerFlow est 100% conforme RGPD. Vos données sont hébergées en Europe, chiffrées en transit et au repos. Nous ne revendons jamais vos données. Chaque contact peut exercer ses droits (accès, suppression) directement depuis vos emails.",
  },
  {
    question: "Que se passe-t-il si j'ai plusieurs établissements ?",
    answer:
      "TriggerFlow gère parfaitement le multi-établissement. Chaque hôtel a son propre espace avec ses automatisations personnalisées, tout en partageant les templates et bonnes pratiques. Contactez-nous pour un tarif groupe adapté.",
  },
  {
    question: 'Le support est-il inclus dans tous les forfaits ?',
    answer:
      "Oui, tous les forfaits incluent un support francophone par email et chat. Le forfait Marketing+ inclut en plus un support prioritaire avec temps de réponse garanti sous 4h et un Customer Success Manager dédié.",
  },
  {
    question: 'Combien de temps pour être opérationnel ?',
    answer:
      "En moyenne, nos clients sont opérationnels en 48 heures. L'intégration Thaïs prend 2 minutes, puis notre équipe vous accompagne pour configurer vos 3 premières automatisations. Vous pouvez ensuite créer les vôtres en autonomie.",
  },
];

export function ThaisFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-[var(--thais-bg)]/30">
      <Container>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--thais-bg)] border border-[var(--thais-primary)]/20 rounded-full mb-6">
            <HelpCircle className="w-5 h-5 text-[var(--thais-primary)]" />
            <span className="text-sm font-semibold text-[var(--thais-primary)]">Questions fréquentes</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-brand-dark sm:text-4xl">
            Vous avez des questions ?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-600">
            Tout ce que vous devez savoir sur TriggerFlow et l&apos;intégration Thaïs
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="mb-3"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className={`w-full flex items-center justify-between p-5 rounded-xl text-left transition-all ${
                  openIndex === index
                    ? 'bg-[var(--thais-primary)] text-white shadow-lg'
                    : 'bg-white text-brand-dark hover:bg-gray-50 border border-gray-200'
                }`}
              >
                <span className="font-semibold pr-4">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 flex-shrink-0 transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-5 bg-white border border-t-0 border-gray-200 rounded-b-xl">
                      <p className="text-zinc-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
