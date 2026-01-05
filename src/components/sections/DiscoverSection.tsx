'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import {
  MessageSquare,
  LogOut,
  FileText,
  ShoppingCart,
  ClipboardCheck,
  Calendar,
  ArrowRight,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Container, ButtonLink, Badge } from '@/components/ui';

const bubbles = [
  { icon: MessageSquare, labelKey: 'arrivalSms', color: 'bg-brand-primary', position: 'top-[8%] left-[5%] md:left-[15%]' },
  { icon: LogOut, labelKey: 'departureSms', color: 'bg-brand-primary', position: 'top-[8%] right-[5%] md:right-[15%]' },
  { icon: FileText, labelKey: 'preStayForm', color: 'bg-brand-primary', position: 'top-[35%] right-[0%] md:right-[5%]' },
  { icon: ShoppingCart, labelKey: 'upsell', color: 'bg-brand-primary', position: 'bottom-[35%] left-[0%] md:left-[5%]' },
  { icon: ClipboardCheck, labelKey: 'postStaySurvey', color: 'bg-brand-primary', position: 'bottom-[8%] left-[5%] md:left-[15%]' },
  { icon: Calendar, labelKey: 'eventAnnouncement', color: 'bg-brand-primary', position: 'bottom-[8%] right-[5%] md:right-[15%]' },
];

export function DiscoverSection() {
  const t = useTranslations('discover');

  return (
    <section className="relative bg-brand-light/40 py-20 md:py-28 overflow-hidden">
      <Container>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <Badge variant="outline" className="mb-4">
            Découvrez TriggerFlow
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight text-brand-dark md:text-4xl lg:text-[2.75rem] lg:leading-tight">
            {t('title')}
          </h2>
          <p className="mt-4 text-lg text-zinc-600">{t('subtitle')}</p>
        </motion.div>

        {/* Visual with person and floating bubbles */}
        <div className="relative mx-auto mt-16 max-w-4xl" style={{ minHeight: '450px' }}>
          {/* Center Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative mx-auto w-64 md:w-80"
          >
            <Image
              src="/images/discover-person.webp"
              alt="Automatisation relation client"
              width={320}
              height={400}
              className="h-auto w-full"
            />
          </motion.div>

          {/* Floating Bubbles */}
          {bubbles.map((bubble, index) => (
            <motion.div
              key={bubble.labelKey}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
              className={`absolute ${bubble.position}`}
            >
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{
                  duration: 3 + index * 0.3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="flex items-center gap-2 rounded-full bg-white px-4 py-2.5 shadow-lg border border-zinc-100"
              >
                <span className={`flex h-7 w-7 items-center justify-center rounded-full ${bubble.color}`}>
                  <bubble.icon className="h-3.5 w-3.5 text-white" />
                </span>
                <span className="text-sm font-medium text-brand-dark whitespace-nowrap">
                  {t(`bubbles.${bubble.labelKey}`)}
                </span>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 flex justify-center"
        >
          <ButtonLink
            href="https://app.lemcal.com/@trigger-flow/demo"
            target="_blank"
            rel="noopener noreferrer"
            variant="secondary"
            size="lg"
            className="group gap-2"
          >
            {t('cta')}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </ButtonLink>
        </motion.div>
      </Container>
    </section>
  );
}
