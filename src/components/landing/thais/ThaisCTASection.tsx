'use client';

import { motion } from 'framer-motion';
import { Container } from '@/components/ui';
import { Calendar, ArrowRight } from 'lucide-react';

interface ThaisCTASectionProps {
  variant?: 'default' | 'gradient' | 'minimal';
  title?: string;
  subtitle?: string;
}

export function ThaisCTASection({
  variant = 'default',
  title = 'Prêt à automatiser votre communication ?',
  subtitle = 'Réservez une démo personnalisée et découvrez comment TriggerFlow peut transformer votre hôtel',
}: ThaisCTASectionProps) {
  const variants = {
    default: {
      containerClass: 'bg-white border-2 border-brand-primary/20',
      titleClass: 'text-brand-dark',
      subtitleClass: 'text-gray-600',
      buttonClass: 'bg-gradient-to-r from-brand-primary to-emerald-600 text-white hover:shadow-xl',
    },
    gradient: {
      containerClass: 'bg-gradient-to-br from-brand-primary to-emerald-600',
      titleClass: 'text-white',
      subtitleClass: 'text-white/90',
      buttonClass: 'bg-white text-brand-primary hover:bg-gray-50',
    },
    minimal: {
      containerClass: 'bg-gradient-to-r from-brand-light/30 to-purple-50/30 border border-gray-200',
      titleClass: 'text-brand-dark',
      subtitleClass: 'text-gray-600',
      buttonClass: 'bg-brand-primary text-white hover:bg-brand-dark',
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
              <p className="mt-6 text-sm text-white/80">
                💡 Tarifs préférentiels pour les utilisateurs Thaïs • Support francophone dédié
              </p>
            )}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
