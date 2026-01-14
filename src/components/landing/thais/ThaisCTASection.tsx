'use client';

import { motion } from 'framer-motion';
import { Container } from '@/components/ui';
import { Calendar, ArrowRight, Check } from 'lucide-react';
import Image from 'next/image';

interface ThaisCTASectionProps {
  variant?: 'default' | 'gradient' | 'minimal';
  title?: string;
  subtitle?: string;
}

export function ThaisCTASection({
  variant = 'default',
  title = 'Mettez enfin en place ce que vous avez toujours voulu',
  subtitle = 'Réservez une démo personnalisée et découvrez comment TriggerFlow automatise vos communications',
}: ThaisCTASectionProps) {
  const variants = {
    default: {
      containerClass: 'bg-white border-2 border-brand-primary/20',
      titleClass: 'text-brand-dark',
      subtitleClass: 'text-gray-600',
      buttonClass: 'bg-gradient-to-r from-brand-primary to-emerald-600 text-white hover:shadow-xl',
    },
    gradient: {
      containerClass: 'bg-gradient-to-br from-[var(--thais-primary)] via-[#0a2590] to-brand-primary',
      titleClass: 'text-white',
      subtitleClass: 'text-white/90',
      buttonClass: 'bg-white text-[var(--thais-primary)] hover:bg-gray-50',
    },
    minimal: {
      containerClass: 'bg-gradient-to-r from-[var(--thais-bg)]/50 to-brand-light/30 border border-[var(--thais-cyan)]/30',
      titleClass: 'text-brand-dark',
      subtitleClass: 'text-gray-600',
      buttonClass: 'bg-gradient-to-r from-[var(--thais-primary)] to-brand-primary text-white hover:shadow-lg',
    },
  };

  const currentVariant = variants[variant];

  return (
    <section className="py-8 md:py-12">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className={`rounded-2xl p-8 md:p-12 shadow-lg ${currentVariant.containerClass}`}
        >
          <div className="max-w-3xl mx-auto text-center">
            <h3 className={`text-2xl md:text-3xl font-bold mb-4 ${currentVariant.titleClass}`}>
              {title}
            </h3>
            <p className={`text-lg mb-8 ${currentVariant.subtitleClass}`}>{subtitle}</p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://app.lemcal.com/@trigger-flow/tf-thais"
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 px-6 py-3 font-semibold rounded-lg transition-all ${currentVariant.buttonClass}`}
              >
                <Calendar className="w-5 h-5" />
                Réserver une démo gratuite
                <ArrowRight className="w-4 h-4" />
              </a>

              {variant === 'default' && (
                <p className="text-sm text-gray-500">
                  <span className="font-semibold">30 minutes</span> • Sans engagement • Offre exclusive Thaïs
                </p>
              )}
            </div>

            {variant === 'gradient' && (
              <div className="mt-8 flex flex-col items-center gap-3">
                <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm">
                  <span className="text-sm text-white/80">En partenariat avec</span>
                  <Image
                    src="/images/partners/thais-logo.svg"
                    alt="Thaïs PMS"
                    width={70}
                    height={24}
                    className="h-5 w-auto brightness-0 invert"
                  />
                </div>
                <div className="flex items-center gap-4 text-sm text-white/70">
                  <span className="flex items-center gap-1">
                    <Check className="h-3.5 w-3.5 text-[var(--thais-cyan)]" />
                    Intégration native
                  </span>
                  <span className="flex items-center gap-1">
                    <Check className="h-3.5 w-3.5 text-[var(--thais-cyan)]" />
                    Support francophone
                  </span>
                </div>
              </div>
            )}

            {variant === 'minimal' && (
              <div className="mt-6 flex items-center justify-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--thais-bg)] border border-[var(--thais-primary)]/20">
                  <Image
                    src="/images/partners/thais-logo.svg"
                    alt="Thaïs PMS"
                    width={60}
                    height={20}
                    className="h-4 w-auto"
                  />
                  <span className="text-xs font-medium text-[var(--thais-primary)]">×</span>
                  <Image
                    src="/images/logo.webp"
                    alt="TriggerFlow"
                    width={80}
                    height={20}
                    className="h-4 w-auto"
                  />
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
