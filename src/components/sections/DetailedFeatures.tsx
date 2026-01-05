'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { FileText, Workflow, TrendingUp, Check, Send, ChevronRight, Mail, User, Calendar, ShoppingBag, Star } from 'lucide-react';
import { Container, SectionHeader, Card, CardHeader, CardTitle, CardDescription } from '@/components/ui';

const features = [
  { key: 'forms', icon: FileText },
  { key: 'automations', icon: Workflow },
  { key: 'sales', icon: TrendingUp },
] as const;

export function DetailedFeatures() {
  const t = useTranslations('detailedFeatures');

  return (
    <section className="bg-brand-light/50 py-16 md:py-24">
      <Container>
        <SectionHeader
          title={t('title')}
          subtitle={t('subtitle')}
        />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.15 }}
            >
              <Card className="group h-full overflow-hidden border border-zinc-100 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-brand-primary/20">
                {/* Illustration - Fixed height for consistency */}
                <div className="relative flex h-[220px] items-center justify-center bg-gradient-to-br from-brand-light/50 to-white p-4">
                  <FeatureIllustration type={feature.key} />
                </div>

                <div className="p-6">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-brand-dark shadow-md">
                    <feature.icon className="h-5 w-5 text-white" />
                  </div>
                  <CardHeader className="p-0">
                    <CardTitle className="text-lg">{t(`items.${feature.key}.title`)}</CardTitle>
                  </CardHeader>
                  <CardDescription className="mt-2 text-sm leading-relaxed">
                    {t(`items.${feature.key}.description`)}
                  </CardDescription>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function FeatureIllustration({ type }: { type: string }) {
  if (type === 'forms') {
    return (
      <div className="w-full max-w-[200px]">
        <div className="rounded-xl border border-zinc-200 bg-white p-3 shadow-lg">
          {/* Form header */}
          <div className="mb-3 flex items-center gap-2">
            <div className="h-5 w-5 rounded bg-brand-primary/20 flex items-center justify-center">
              <FileText className="h-2.5 w-2.5 text-brand-primary" />
            </div>
            <span className="text-[10px] font-semibold text-brand-dark">Pré-séjour</span>
          </div>

          {/* Form fields */}
          <div className="space-y-2">
            <div>
              <div className="mb-0.5 flex items-center gap-1">
                <User className="h-2 w-2 text-zinc-400" />
                <span className="text-[8px] text-zinc-500">Nom</span>
              </div>
              <div className="h-5 rounded border border-zinc-200 bg-zinc-50 px-1.5 flex items-center">
                <span className="text-[8px] text-zinc-400">Jean Dupont</span>
              </div>
            </div>
            <div>
              <div className="mb-0.5 flex items-center gap-1">
                <Mail className="h-2 w-2 text-zinc-400" />
                <span className="text-[8px] text-zinc-500">Email</span>
              </div>
              <div className="h-5 rounded border border-zinc-200 bg-zinc-50 px-1.5 flex items-center">
                <span className="text-[8px] text-zinc-400">jean@email.com</span>
              </div>
            </div>
            <button className="w-full rounded bg-brand-primary py-1.5 text-[8px] font-medium text-white">
              Envoyer
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'automations') {
    return (
      <div className="w-full max-w-[240px]">
        <div className="flex items-center justify-center gap-1.5">
          {/* Trigger */}
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center"
          >
            <div className="h-12 w-12 rounded-full bg-brand-dark shadow-md flex items-center justify-center">
              <Calendar className="h-5 w-5 text-white" />
            </div>
            <span className="mt-1 text-[8px] font-medium text-zinc-600">Check-in</span>
          </motion.div>

          {/* Arrow */}
          <div className="flex items-center">
            <div className="h-0.5 w-4 bg-zinc-300" />
            <ChevronRight className="h-3 w-3 text-zinc-400" />
          </div>

          {/* Condition */}
          <div className="flex flex-col items-center">
            <div className="h-12 w-12 rounded-full bg-brand-dark/70 shadow-md flex items-center justify-center">
              <span className="text-base font-bold text-white">?</span>
            </div>
            <span className="mt-1 text-[8px] font-medium text-zinc-600">Condition</span>
          </div>

          {/* Arrow */}
          <div className="flex items-center">
            <div className="h-0.5 w-4 bg-zinc-300" />
            <ChevronRight className="h-3 w-3 text-zinc-400" />
          </div>

          {/* Action */}
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            className="flex flex-col items-center"
          >
            <div className="h-12 w-12 rounded-full bg-brand-primary shadow-md flex items-center justify-center">
              <Send className="h-5 w-5 text-white" />
            </div>
            <span className="mt-1 text-[8px] font-medium text-zinc-600">SMS</span>
          </motion.div>
        </div>

        {/* Status badge */}
        <div className="mt-3 flex justify-center">
          <div className="flex items-center gap-1 rounded-full bg-brand-primary/10 px-2.5 py-1">
            <div className="h-1.5 w-1.5 rounded-full bg-brand-primary animate-pulse" />
            <span className="text-[9px] font-medium text-brand-primary">Actif</span>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'sales') {
    return (
      <div className="w-full max-w-[220px]">
        <div className="grid grid-cols-2 gap-2">
          {/* Product 1 */}
          <div className="rounded-lg border border-zinc-200 bg-white p-2 shadow-sm">
            <div className="mb-1.5 h-8 rounded bg-gradient-to-br from-brand-accent/30 to-brand-accent/10 flex items-center justify-center">
              <span className="text-base">🍳</span>
            </div>
            <div className="text-[9px] font-semibold text-brand-dark">Petit-déj</div>
            <div className="text-[8px] text-zinc-500">+15€</div>
          </div>

          {/* Product 2 */}
          <div className="rounded-lg border border-zinc-200 bg-white p-2 shadow-sm">
            <div className="mb-1.5 h-8 rounded bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center">
              <span className="text-base">🧖</span>
            </div>
            <div className="text-[9px] font-semibold text-brand-dark">Spa</div>
            <div className="text-[8px] text-zinc-500">+45€</div>
          </div>

          {/* Product 3 */}
          <div className="rounded-lg border border-zinc-200 bg-white p-2 shadow-sm">
            <div className="mb-1.5 h-8 rounded bg-gradient-to-br from-purple-100 to-purple-50 flex items-center justify-center">
              <span className="text-base">⬆️</span>
            </div>
            <div className="text-[9px] font-semibold text-brand-dark">Suite</div>
            <div className="text-[8px] text-zinc-500">+80€</div>
          </div>

          {/* Stats */}
          <div className="rounded-lg border border-brand-primary/20 bg-brand-primary/5 p-2 flex flex-col justify-center">
            <div className="text-[8px] text-zinc-500">RevPAR</div>
            <div className="text-base font-bold text-brand-primary">+17%</div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
