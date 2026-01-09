'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Users, MessageCircle, BookOpen, HeadphonesIcon } from 'lucide-react';
import { Container } from '@/components/ui';

const supportPillars = [
  {
    icon: Users,
    title: 'Formation personnalisée',
    description: '30 minutes pour configurer ensemble vos premiers emails automatiques. On fait avec vous, pas pour vous.',
  },
  {
    icon: MessageCircle,
    title: 'Support humain en français',
    description: 'Des vraies personnes qui comprennent l\'hôtellerie. Réponse en moins de 2h, pas des jours.',
  },
  {
    icon: BookOpen,
    title: 'Guides et modèles',
    description: 'Bibliothèque de templates prêts à l\'emploi. Copiez-collez, personnalisez, c\'est parti.',
  },
];

export function ThaisV3Accompaniment() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="accompagnement" className="bg-gradient-to-b from-[var(--v3-bg-primary)] to-[var(--v3-bg-secondary)] py-20 md:py-28">
      <Container>
        {/* Header */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600">
            <HeadphonesIcon className="h-4 w-4" />
            Support 100% français
          </span>
          <h2 className="font-[family-name:var(--font-cormorant)] text-3xl font-semibold tracking-tight text-[var(--v3-text-primary)] md:text-4xl lg:text-5xl">
            On vous accompagne pour
            <br />
            <span className="text-[var(--v3-accent-green)]">devenir autonome</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-[var(--v3-text-secondary)]">
            Pas de chatbot, pas de support offshore.
            <br className="hidden sm:block" />
            Une vraie équipe française qui vous guide jusqu'à ce que vous maîtrisiez l'outil.
          </p>
        </motion.div>

        {/* Support pillars */}
        <div className="mb-16 grid gap-6 md:grid-cols-3 md:gap-8">
          {supportPillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="rounded-2xl border border-[var(--v3-border)] bg-[var(--v3-bg-primary)] p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-[var(--v3-accent-green)]/10">
                <pillar.icon className="h-7 w-7 text-[var(--v3-accent-green)]" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-[var(--v3-text-primary)]">{pillar.title}</h3>
              <p className="text-[var(--v3-text-secondary)]">{pillar.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Team testimonial card */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="overflow-hidden rounded-3xl border border-[var(--v3-border)] bg-[var(--v3-bg-primary)] shadow-[var(--v3-shadow-md)]"
        >
          <div className="grid items-center gap-8 p-8 lg:grid-cols-2 lg:p-12">
            {/* Team visual placeholder */}
            <div className="relative">
              <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-gradient-to-br from-[var(--v3-bg-card)] to-[var(--v3-border)]">
                <div className="flex h-full items-center justify-center">
                  <div className="text-center">
                    <div className="mx-auto mb-4 flex -space-x-3">
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className="h-16 w-16 rounded-full border-4 border-[var(--v3-bg-card)] bg-[var(--v3-bg-secondary)]"
                        />
                      ))}
                    </div>
                    <p className="text-sm text-[var(--v3-text-muted)]">L'équipe TriggerFlow</p>
                  </div>
                </div>
              </div>

              {/* Online badge */}
              <div className="absolute -bottom-3 -right-3 flex items-center gap-2 rounded-xl border border-[var(--v3-border)] bg-[var(--v3-bg-primary)] px-4 py-2 shadow-lg">
                <div className="h-3 w-3 animate-pulse rounded-full bg-emerald-500" />
                <span className="text-sm font-medium text-[var(--v3-text-primary)]">En ligne maintenant</span>
              </div>
            </div>

            {/* Testimonial */}
            <div>
              <blockquote className="mb-6 font-[family-name:var(--font-cormorant)] text-2xl leading-relaxed text-[var(--v3-text-primary)] md:text-3xl">
                "J'avais peur de ne pas y arriver avec la technologie. Leur équipe m'a guidé pas à pas.{' '}
                <span className="text-[var(--v3-accent-green)]">En 2 semaines, j'étais autonome.</span>"
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-full bg-[var(--v3-bg-card)]" />
                <div>
                  <p className="font-semibold text-[var(--v3-text-primary)]">Marie Durand</p>
                  <p className="text-sm text-[var(--v3-text-muted)]">Hôtel Le Clos, Normandie</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
