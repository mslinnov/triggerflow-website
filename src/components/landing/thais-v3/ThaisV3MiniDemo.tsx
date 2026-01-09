'use client';

import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Check, Mail, User, Clock } from 'lucide-react';
import { Container } from '@/components/ui';

const demoMessages = [
  'Bonjour [Prénom],',
  'Votre séjour approche !',
  'Voici les infos pratiques...',
];

function TypewriterText({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayedText(text);
      setIsComplete(true);
      return;
    }

    const timeout = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        if (i < text.length) {
          setDisplayedText(text.slice(0, i + 1));
          i++;
        } else {
          setIsComplete(true);
          clearInterval(interval);
        }
      }, 40);
      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, delay, prefersReducedMotion]);

  return (
    <span>
      {displayedText}
      {!isComplete && <span className="animate-pulse">|</span>}
    </span>
  );
}

export function ThaisV3MiniDemo() {
  const prefersReducedMotion = useReducedMotion();
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowSuccess(true), 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="bg-[var(--v3-bg-secondary)] py-20 md:py-28">
      <Container>
        {/* Header */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <span className="mb-4 inline-block rounded-full border border-[var(--v3-accent-gold)]/30 bg-[var(--v3-accent-gold-light)] px-4 py-2 text-sm font-medium text-[var(--v3-accent-gold)]">
            Aperçu en direct
          </span>
          <h2 className="font-[family-name:var(--font-cormorant)] text-3xl font-semibold tracking-tight text-[var(--v3-text-primary)] md:text-4xl">
            Voyez comment ça marche
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-[var(--v3-text-secondary)]">
            Vos emails s'écrivent et s'envoient automatiquement
          </p>
        </motion.div>

        {/* Demo Interface */}
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl"
        >
          <div className="overflow-hidden rounded-2xl border border-[var(--v3-border)] bg-[var(--v3-bg-primary)] shadow-[var(--v3-shadow-lg)]">
            {/* Window header */}
            <div className="flex items-center gap-2 border-b border-[var(--v3-border)] bg-[var(--v3-bg-secondary)] px-4 py-3">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-[var(--v3-border)]" />
                <div className="h-3 w-3 rounded-full bg-[var(--v3-border)]" />
                <div className="h-3 w-3 rounded-full bg-[var(--v3-border)]" />
              </div>
              <span className="ml-4 text-sm text-[var(--v3-text-muted)]">Email automatique - Pré-séjour</span>
            </div>

            {/* Email editor area */}
            <div className="p-6">
              {/* Email header */}
              <div className="mb-6 space-y-3 border-b border-[var(--v3-border)] pb-6">
                <div className="flex items-center gap-3">
                  <span className="w-16 text-sm text-[var(--v3-text-muted)]">De :</span>
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--v3-accent-green)]/10">
                      <Mail className="h-4 w-4 text-[var(--v3-accent-green)]" />
                    </div>
                    <span className="text-sm text-[var(--v3-text-primary)]">Hôtel Le Clos &lt;contact@hotel-leclos.fr&gt;</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-16 text-sm text-[var(--v3-text-muted)]">À :</span>
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--v3-bg-card)]">
                      <User className="h-4 w-4 text-[var(--v3-text-muted)]" />
                    </div>
                    <span className="text-sm text-[var(--v3-text-primary)]">Marie Dupont &lt;marie.dupont@email.com&gt;</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-16 text-sm text-[var(--v3-text-muted)]">Objet :</span>
                  <span className="text-sm font-medium text-[var(--v3-text-primary)]">Votre séjour dans 3 jours</span>
                </div>
              </div>

              {/* Email body - typewriter effect */}
              <div className="min-h-[120px] rounded-xl bg-[var(--v3-bg-card)] p-5">
                <div className="space-y-2 text-[var(--v3-text-primary)]">
                  {demoMessages.map((message, index) => (
                    <p key={index}>
                      <TypewriterText text={message} delay={index * 1200} />
                    </p>
                  ))}
                </div>
              </div>

              {/* Success message */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={showSuccess ? { opacity: 1, y: 0 } : {}}
                className="mt-6 flex items-center justify-between"
              >
                <div className="flex items-center gap-2 text-[var(--v3-accent-green)]">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--v3-accent-green)]">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm font-medium">Envoyé automatiquement</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-[var(--v3-text-muted)]">
                  <Clock className="h-4 w-4" />
                  <span>47 clients ce matin</span>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Floating badge */}
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="mx-auto mt-8 flex max-w-md items-center justify-center gap-3 rounded-full border border-[var(--v3-border)] bg-[var(--v3-bg-primary)] px-6 py-3 shadow-md"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--v3-accent-gold)]/10">
              <Clock className="h-4 w-4 text-[var(--v3-accent-gold)]" />
            </div>
            <span className="text-sm text-[var(--v3-text-primary)]">
              <strong className="font-semibold">Temps passé par vous :</strong> 0 minute
            </span>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
