'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import {
  Mail,
  MessageSquare,
  Send,
  Workflow,
  Users,
  FileText,
  ShoppingBag,
  BarChart3,
  Star,
  Heart,
  ArrowRight,
} from 'lucide-react';
import { Container } from '@/components/ui';

const modules = [
  {
    key: 'email',
    icon: Mail,
    color: 'from-blue-500 to-indigo-600',
    size: 'large',
    preview: (
      <div className="space-y-2">
        <div className="h-2 w-3/4 rounded bg-white/20" />
        <div className="h-2 w-1/2 rounded bg-white/10" />
        <div className="mt-4 h-12 rounded-lg bg-white/10" />
      </div>
    ),
  },
  {
    key: 'sms',
    icon: MessageSquare,
    color: 'from-emerald-500 to-teal-600',
    size: 'small',
    preview: (
      <div className="flex items-end gap-2">
        <div className="h-8 w-24 rounded-xl rounded-bl-none bg-white/20" />
      </div>
    ),
  },
  {
    key: 'whatsapp',
    icon: Send,
    color: 'from-green-500 to-emerald-600',
    size: 'small',
    preview: (
      <div className="flex flex-col gap-1">
        <div className="ml-auto h-6 w-20 rounded-xl rounded-br-none bg-white/20" />
        <div className="h-6 w-16 rounded-xl rounded-bl-none bg-white/10" />
      </div>
    ),
  },
  {
    key: 'automation',
    icon: Workflow,
    color: 'from-purple-500 to-violet-600',
    size: 'large',
    preview: (
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-lg bg-white/20" />
        <div className="h-1 w-6 rounded bg-white/10" />
        <div className="h-8 w-8 rounded-lg bg-white/15" />
        <div className="h-1 w-6 rounded bg-white/10" />
        <div className="h-8 w-8 rounded-lg bg-white/10" />
      </div>
    ),
  },
  {
    key: 'crm',
    icon: Users,
    color: 'from-cyan-500 to-blue-600',
    size: 'medium',
    preview: (
      <div className="space-y-2">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-full bg-white/20" />
            <div className="h-2 flex-1 rounded bg-white/10" />
          </div>
        ))}
      </div>
    ),
  },
  {
    key: 'forms',
    icon: FileText,
    color: 'from-rose-500 to-pink-600',
    size: 'small',
    preview: (
      <div className="space-y-2">
        <div className="h-6 rounded bg-white/20" />
        <div className="h-6 rounded bg-white/10" />
      </div>
    ),
  },
  {
    key: 'upsell',
    icon: ShoppingBag,
    color: 'from-orange-500 to-red-600',
    size: 'small',
    preview: (
      <div className="flex items-center gap-2">
        <div className="h-10 w-10 rounded-lg bg-white/20" />
        <div className="flex-1">
          <div className="h-2 w-full rounded bg-white/10" />
          <div className="mt-1 h-2 w-2/3 rounded bg-white/15" />
        </div>
      </div>
    ),
  },
  {
    key: 'analytics',
    icon: BarChart3,
    color: 'from-amber-500 to-orange-600',
    size: 'medium',
    preview: (
      <div className="flex items-end gap-1">
        {[40, 65, 45, 80, 55, 70].map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-t bg-white/20"
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
    ),
  },
  {
    key: 'reviews',
    icon: Star,
    color: 'from-yellow-500 to-amber-600',
    size: 'small',
    preview: (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star key={i} className="h-4 w-4 fill-white/30 text-white/30" />
        ))}
      </div>
    ),
  },
  {
    key: 'loyalty',
    icon: Heart,
    color: 'from-pink-500 to-rose-600',
    size: 'small',
    preview: (
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
          <Heart className="h-4 w-4 text-white/60" />
        </div>
        <div className="text-xs text-white/60">250 pts</div>
      </div>
    ),
  },
];

export function ModulesV2() {
  const t = useTranslations('modules');

  return (
    <section id="modules" className="relative overflow-hidden bg-white py-24 md:py-32">
      {/* Background decorations */}
      <div className="absolute -right-64 top-1/4 h-[600px] w-[600px] rounded-full bg-brand-primary/5 blur-3xl" />
      <div className="absolute -left-64 bottom-1/4 h-[400px] w-[400px] rounded-full bg-brand-accent/5 blur-3xl" />

      <Container className="relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="font-serif text-4xl font-bold tracking-tight text-brand-dark md:text-5xl lg:text-6xl">
            {t('title')}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-600">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid gap-4 md:grid-cols-4 md:gap-6 lg:grid-cols-6">
          {modules.map((module, index) => {
            const gridClass =
              module.size === 'large'
                ? 'md:col-span-2 md:row-span-2'
                : module.size === 'medium'
                ? 'md:col-span-2'
                : 'md:col-span-2 lg:col-span-1';

            return (
              <motion.div
                key={module.key}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className={`group relative overflow-hidden rounded-3xl bg-gradient-to-br ${module.color} p-6 ${gridClass} cursor-pointer`}
              >
                {/* Glass overlay on hover */}
                <div className="absolute inset-0 bg-white/0 transition-colors group-hover:bg-white/10" />

                {/* Content */}
                <div className="relative flex h-full flex-col">
                  {/* Icon */}
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
                    <module.icon className="h-6 w-6 text-white" />
                  </div>

                  {/* Title and description */}
                  <h3 className="mb-2 text-xl font-bold text-white">
                    {t(`items.${module.key}.title`)}
                  </h3>
                  <p className="mb-4 text-sm text-white/70">
                    {t(`items.${module.key}.description`)}
                  </p>

                  {/* Preview mockup */}
                  <div className="mt-auto flex-1">
                    {module.preview}
                  </div>

                  {/* Arrow on hover */}
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileHover={{ opacity: 1, x: 0 }}
                    className="absolute bottom-6 right-6 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    <ArrowRight className="h-5 w-5 text-white" />
                  </motion.div>
                </div>

                {/* Decorative gradient blob */}
                <div className="absolute -bottom-16 -right-16 h-32 w-32 rounded-full bg-white/10 blur-2xl transition-transform group-hover:scale-150" />
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <a
            href="/produit"
            className="group inline-flex items-center gap-2 rounded-full border-2 border-brand-dark px-8 py-4 font-medium text-brand-dark transition-all hover:bg-brand-dark hover:text-white"
          >
            {t('learnMore')}
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </a>
        </motion.div>
      </Container>
    </section>
  );
}
