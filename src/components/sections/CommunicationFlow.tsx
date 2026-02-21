'use client';

import { useTranslations } from 'next-intl';
import { motion, useReducedMotion } from 'framer-motion';
import {
  CalendarCheck,
  LogIn,
  LogOut,
  Gift,
  Clock,
  Mail,
  MessageSquare,
  MessageCircle,
  FileText,
  ShoppingBag,
  Star,
  TrendingUp,
  Zap,
  ArrowRight,
  ChevronRight,
} from 'lucide-react';
import { Container } from '@/components/ui';
import { fadeInUp, staggerContainer, staggerItem, defaultViewport } from '@/lib/animations';

const triggers = [
  { key: 'reservation', icon: CalendarCheck, angle: 270 },
  { key: 'checkin', icon: LogIn, angle: 342 },
  { key: 'checkout', icon: LogOut, angle: 54 },
  { key: 'birthday', icon: Gift, angle: 126 },
  { key: 'delay', icon: Clock, angle: 198 },
];

const actions = [
  { key: 'email', icon: Mail, angle: 270 },
  { key: 'sms', icon: MessageSquare, angle: 342 },
  { key: 'whatsapp', icon: MessageCircle, angle: 54 },
  { key: 'form', icon: FileText, angle: 126 },
  { key: 'upsell', icon: ShoppingBag, angle: 198 },
];

const results = [
  { key: 'reviews', icon: Star },
  { key: 'timeSaved', icon: Clock },
  { key: 'upsell', icon: TrendingUp },
];

export function CommunicationFlow() {
  const t = useTranslations('communicationFlow');
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="bg-surface-secondary py-16 md:py-24 overflow-hidden">
      <Container>
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeInUp}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="font-serif text-3xl font-bold tracking-tight text-text-primary md:text-4xl lg:text-[2.75rem]">
            {t('title')}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-text-secondary">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Desktop Flow */}
        <div className="hidden lg:flex items-center justify-center gap-6 xl:gap-10">
          {/* Triggers Orbit */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={defaultViewport}
            transition={{ duration: 0.6 }}
          >
            <OrbitHub
              label={t('triggers.label')}
              items={triggers}
              translations={(key) => t(`triggers.${key}`)}
              color="brand"
              prefersReducedMotion={prefersReducedMotion}
            />
          </motion.div>

          {/* Arrow 1 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={defaultViewport}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col items-center gap-1"
          >
            <div className="relative">
              <ArrowRight className="h-8 w-8 text-brand-primary" />
              {!prefersReducedMotion && (
                <motion.div
                  className="absolute inset-0"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <ArrowRight className="h-8 w-8 text-brand-primary/50" />
                </motion.div>
              )}
            </div>
            <span className="text-xs text-text-muted font-medium">{t('flow.triggers')}</span>
          </motion.div>

          {/* Actions Orbit */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={defaultViewport}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <OrbitHub
              label={t('actions.label')}
              items={actions}
              translations={(key) => t(`actions.${key}`)}
              color="primary"
              prefersReducedMotion={prefersReducedMotion}
            />
          </motion.div>

          {/* Arrow 2 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={defaultViewport}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-col items-center gap-1"
          >
            <div className="relative">
              <ArrowRight className="h-8 w-8 text-brand-accent" />
              {!prefersReducedMotion && (
                <motion.div
                  className="absolute inset-0"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                >
                  <ArrowRight className="h-8 w-8 text-brand-accent/50" />
                </motion.div>
              )}
            </div>
            <span className="text-xs text-text-muted font-medium">{t('flow.sends')}</span>
          </motion.div>

          {/* Results Stack */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={defaultViewport}
            transition={{ duration: 0.6, delay: 0.4, type: 'spring' }}
            className="flex flex-col gap-3"
          >
            <p className="text-sm font-semibold uppercase tracking-wider text-brand-accent text-center mb-1">
              {t('results.label')}
            </p>
            {results.map((result, i) => (
              <motion.div
                key={result.key}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={defaultViewport}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="flex items-center gap-3 rounded-xl border-2 border-brand-accent/40 bg-brand-accent-light/30 px-4 py-2.5 shadow-sm"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-accent/20">
                  <result.icon className="h-4 w-4 text-brand-accent" />
                </div>
                <span className="text-sm font-bold text-brand-dark whitespace-nowrap">{t(`results.${result.key}`)}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Tablet Flow */}
        <div className="hidden md:flex lg:hidden flex-col items-center gap-8">
          <div className="flex items-center justify-center gap-6">
            <OrbitHub
              label={t('triggers.label')}
              items={triggers}
              translations={(key) => t(`triggers.${key}`)}
              color="brand"
              prefersReducedMotion={prefersReducedMotion}
              size="sm"
            />
            <ArrowRight className="h-6 w-6 text-brand-primary" />
            <OrbitHub
              label={t('actions.label')}
              items={actions}
              translations={(key) => t(`actions.${key}`)}
              color="primary"
              prefersReducedMotion={prefersReducedMotion}
              size="sm"
            />
          </div>

          <ChevronRight className="h-6 w-6 rotate-90 text-brand-accent/40" />

          {/* Results */}
          <div className="flex flex-wrap justify-center gap-3">
            {results.map((result) => (
              <div
                key={result.key}
                className="flex items-center gap-2.5 rounded-xl border-2 border-brand-accent/40 bg-brand-accent-light/30 px-4 py-2.5"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-accent/20">
                  <result.icon className="h-4 w-4 text-brand-accent" />
                </div>
                <span className="text-sm font-bold text-brand-dark">{t(`results.${result.key}`)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Flow */}
        <div className="md:hidden">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            variants={staggerContainer}
            className="flex flex-col items-center gap-5"
          >
            {/* Triggers */}
            <motion.div variants={staggerItem} className="w-full max-w-sm">
              <p className="mb-3 text-center text-xs font-semibold uppercase tracking-wider text-brand-dark">
                {t('triggers.label')}
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {triggers.map((trigger) => (
                  <div
                    key={trigger.key}
                    className="flex items-center gap-2 rounded-full border border-brand-dark/10 bg-white px-3 py-1.5 shadow-sm"
                  >
                    <trigger.icon className="h-3.5 w-3.5 text-brand-dark" />
                    <span className="text-xs font-medium text-brand-dark">{t(`triggers.${trigger.key}`)}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={staggerItem}>
              <ChevronRight className="h-6 w-6 rotate-90 text-brand-primary/40" />
            </motion.div>

            {/* Actions */}
            <motion.div variants={staggerItem} className="w-full max-w-sm">
              <p className="mb-3 text-center text-xs font-semibold uppercase tracking-wider text-brand-primary">
                {t('actions.label')}
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {actions.map((action) => (
                  <div
                    key={action.key}
                    className="flex items-center gap-2 rounded-full border border-brand-primary/10 bg-white px-3 py-1.5 shadow-sm"
                  >
                    <action.icon className="h-3.5 w-3.5 text-brand-primary" />
                    <span className="text-xs font-medium text-brand-dark">{t(`actions.${action.key}`)}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={staggerItem}>
              <ChevronRight className="h-6 w-6 rotate-90 text-brand-accent/40" />
            </motion.div>

            {/* Results */}
            <motion.div variants={staggerItem} className="w-full max-w-sm space-y-2">
              <p className="mb-3 text-center text-xs font-semibold uppercase tracking-wider text-brand-accent">
                {t('results.label')}
              </p>
              {results.map((result) => (
                <div
                  key={result.key}
                  className="flex items-center gap-3 rounded-xl border-2 border-brand-accent/40 bg-brand-accent-light/30 px-4 py-3"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-accent/20">
                    <result.icon className="h-4 w-4 text-brand-accent" />
                  </div>
                  <span className="text-sm font-bold text-brand-dark">{t(`results.${result.key}`)}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

// Orbit Hub with always-visible labels
function OrbitHub({
  label,
  items,
  translations,
  color,
  prefersReducedMotion,
  size = 'md',
}: {
  label: string;
  items: { key: string; icon: React.ComponentType<{ className?: string }>; angle: number }[];
  translations: (key: string) => string;
  color: 'brand' | 'primary';
  prefersReducedMotion: boolean | null;
  size?: 'sm' | 'md';
}) {
  const orbitRadius = size === 'sm' ? 80 : 105;
  const containerSize = size === 'sm' ? 220 : 290;
  const hubSize = size === 'sm' ? 'h-16 w-16' : 'h-20 w-20';
  const itemIconSize = size === 'sm' ? 'h-8 w-8' : 'h-10 w-10';
  const iconSize = size === 'sm' ? 'h-4 w-4' : 'h-4.5 w-4.5';

  const bgColor = color === 'brand' ? 'bg-brand-dark' : 'bg-brand-primary';
  const borderColor = color === 'brand' ? 'border-brand-dark/20' : 'border-brand-primary/20';
  const textColor = color === 'brand' ? 'text-brand-dark' : 'text-brand-primary';
  const labelTextColor = color === 'brand' ? 'text-brand-dark' : 'text-brand-primary';

  return (
    <div
      className="relative"
      style={{ width: containerSize, height: containerSize }}
    >
      {/* Orbit circle */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox={`0 0 ${containerSize} ${containerSize}`}
      >
        <circle
          cx={containerSize / 2}
          cy={containerSize / 2}
          r={orbitRadius}
          fill="none"
          stroke={color === 'brand' ? '#002B28' : '#006F68'}
          strokeWidth="1"
          strokeOpacity="0.12"
          strokeDasharray="4 4"
        />
        {/* Animated particles */}
        {!prefersReducedMotion && (
          <>
            <circle r="3" fill={color === 'brand' ? '#002B28' : '#006F68'} opacity="0.4">
              <animateMotion
                dur="8s"
                repeatCount="indefinite"
                path={`M ${containerSize / 2 + orbitRadius} ${containerSize / 2} A ${orbitRadius} ${orbitRadius} 0 1 1 ${containerSize / 2 + orbitRadius - 0.01} ${containerSize / 2}`}
              />
            </circle>
            <circle r="2" fill={color === 'brand' ? '#002B28' : '#006F68'} opacity="0.2">
              <animateMotion
                dur="8s"
                repeatCount="indefinite"
                begin="-4s"
                path={`M ${containerSize / 2 + orbitRadius} ${containerSize / 2} A ${orbitRadius} ${orbitRadius} 0 1 1 ${containerSize / 2 + orbitRadius - 0.01} ${containerSize / 2}`}
              />
            </circle>
          </>
        )}
      </svg>

      {/* Center hub */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className={`${hubSize} rounded-full ${bgColor} flex flex-col items-center justify-center shadow-lg`}
          animate={!prefersReducedMotion ? { scale: [1, 1.05, 1] } : {}}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Zap className={`${size === 'sm' ? 'h-6 w-6' : 'h-7 w-7'} text-white`} />
        </motion.div>
      </div>

      {/* Hub label */}
      <div className="absolute inset-x-0 flex justify-center" style={{ top: containerSize / 2 + (size === 'sm' ? 34 : 42) }}>
        <span className={`text-sm font-semibold ${labelTextColor}`}>{label}</span>
      </div>

      {/* Orbiting items with labels */}
      {items.map((item, index) => {
        const angleRad = (item.angle * Math.PI) / 180;
        const x = Math.cos(angleRad) * orbitRadius;
        const y = Math.sin(angleRad) * orbitRadius;
        const iconOffset = size === 'sm' ? 16 : 20;

        return (
          <motion.div
            key={item.key}
            className="absolute flex flex-col items-center"
            style={{
              left: containerSize / 2 + x - iconOffset,
              top: containerSize / 2 + y - iconOffset,
              width: iconOffset * 2,
            }}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={defaultViewport}
            transition={{ delay: 0.1 + index * 0.1, duration: 0.4, type: 'spring' }}
          >
            <motion.div
              className={`${itemIconSize} rounded-full bg-white ${borderColor} border-2 flex items-center justify-center shadow-md`}
              whileHover={{ scale: 1.15, y: -2 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            >
              <item.icon className={`${iconSize} ${textColor}`} />
            </motion.div>
            <span className={`mt-1 text-[10px] font-medium ${textColor} text-center leading-tight whitespace-nowrap`}>
              {translations(item.key)}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
}
