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
  UserCheck,
  Zap,
  ArrowRight
} from 'lucide-react';
import { Container } from '@/components/ui';
import { fadeInUp, defaultViewport } from '@/lib/animations';

// Triggers - events that start automation
const triggers = [
  { key: 'reservation', icon: CalendarCheck, angle: 270 },
  { key: 'checkin', icon: LogIn, angle: 342 },
  { key: 'checkout', icon: LogOut, angle: 54 },
  { key: 'birthday', icon: Gift, angle: 126 },
  { key: 'delay', icon: Clock, angle: 198 },
];

// Actions - what happens after trigger
const actions = [
  { key: 'email', icon: Mail, angle: 270 },
  { key: 'sms', icon: MessageSquare, angle: 342 },
  { key: 'whatsapp', icon: MessageCircle, angle: 54 },
  { key: 'form', icon: FileText, angle: 126 },
  { key: 'upsell', icon: ShoppingBag, angle: 198 },
];

export function CommunicationFlow() {
  const t = useTranslations('communicationFlow');
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="bg-gradient-to-b from-white via-zinc-50/50 to-white py-16 md:py-24 overflow-hidden">
      <Container>
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          variants={fadeInUp}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl font-bold tracking-tight text-brand-dark md:text-4xl lg:text-[2.75rem]">
            {t('title')}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-600">
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
            className="relative"
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
                  className="absolute inset-0 flex items-center justify-center"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <ArrowRight className="h-8 w-8 text-brand-primary/50" />
                </motion.div>
              )}
            </div>
            <span className="text-xs text-zinc-400 font-medium">{t('flow.triggers')}</span>
          </motion.div>

          {/* Actions Orbit */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={defaultViewport}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
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
              <ArrowRight className="h-8 w-8 text-green-500" />
              {!prefersReducedMotion && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                >
                  <ArrowRight className="h-8 w-8 text-green-500/50" />
                </motion.div>
              )}
            </div>
            <span className="text-xs text-zinc-400 font-medium">{t('flow.sends')}</span>
          </motion.div>

          {/* Result: Client satisfait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={defaultViewport}
            transition={{ duration: 0.6, delay: 0.4, type: 'spring' }}
            className="relative flex flex-col items-center"
          >
            {/* Glow */}
            <div className="absolute inset-0 -m-4 rounded-full bg-green-500/20 blur-2xl" />

            {/* Pulse ring */}
            {!prefersReducedMotion && (
              <motion.div
                className="absolute -inset-3 rounded-full border-2 border-green-400/30"
                animate={{
                  scale: [1, 1.15, 1],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            )}

            {/* Icon */}
            <motion.div
              className="relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-green-600 text-white shadow-2xl"
              animate={!prefersReducedMotion ? { scale: [1, 1.05, 1] } : {}}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <UserCheck className="h-10 w-10" />
            </motion.div>
            <p className="mt-3 font-bold text-brand-dark text-center">{t('result.title')}</p>
            <p className="text-sm text-zinc-500">{t('result.subtitle')}</p>
          </motion.div>
        </div>

        {/* Tablet Flow */}
        <div className="hidden md:flex lg:hidden flex-col items-center gap-8">
          <div className="flex items-center justify-center gap-6">
            {/* Triggers */}
            <OrbitHub
              label={t('triggers.label')}
              items={triggers}
              translations={(key) => t(`triggers.${key}`)}
              color="brand"
              prefersReducedMotion={prefersReducedMotion}
              size="sm"
            />

            <ArrowRight className="h-6 w-6 text-brand-primary" />

            {/* Actions */}
            <OrbitHub
              label={t('actions.label')}
              items={actions}
              translations={(key) => t(`actions.${key}`)}
              color="primary"
              prefersReducedMotion={prefersReducedMotion}
              size="sm"
            />
          </div>

          <ArrowDown />

          {/* Result */}
          <div className="flex items-center gap-3 rounded-2xl bg-green-50 px-6 py-4 border border-green-200">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-green-600 text-white">
              <UserCheck className="h-7 w-7" />
            </div>
            <div>
              <p className="font-bold text-brand-dark">{t('result.title')}</p>
              <p className="text-sm text-zinc-500">{t('result.subtitle')}</p>
            </div>
          </div>
        </div>

        {/* Mobile Flow */}
        <div className="md:hidden">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            className="flex flex-col items-center gap-6"
          >
            {/* Triggers */}
            <motion.div
              variants={fadeInUp}
              className="w-full"
            >
              <MobileFlowCard
                title={t('triggers.label')}
                items={triggers.slice(0, 4)}
                translations={(key) => t(`triggers.${key}`)}
                color="brand"
              />
            </motion.div>

            <ArrowDown />

            {/* Actions */}
            <motion.div
              variants={fadeInUp}
              className="w-full"
            >
              <MobileFlowCard
                title={t('actions.label')}
                items={actions.slice(0, 4)}
                translations={(key) => t(`actions.${key}`)}
                color="primary"
              />
            </motion.div>

            <ArrowDown />

            {/* Result */}
            <motion.div
              variants={fadeInUp}
              className="flex items-center gap-3 rounded-2xl bg-green-50 px-5 py-4 border border-green-200 w-full max-w-xs"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-green-600 text-white">
                <UserCheck className="h-6 w-6" />
              </div>
              <div>
                <p className="font-bold text-brand-dark">{t('result.title')}</p>
                <p className="text-sm text-zinc-500">{t('result.subtitle')}</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

// Orbit Hub Component
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
  const orbitRadius = size === 'sm' ? 70 : 90;
  const containerSize = size === 'sm' ? 200 : 260;
  const hubSize = size === 'sm' ? 'h-16 w-16' : 'h-20 w-20';
  const itemSize = size === 'sm' ? 'h-10 w-10' : 'h-12 w-12';
  const iconSize = size === 'sm' ? 'h-4 w-4' : 'h-5 w-5';

  const bgColor = color === 'brand' ? 'bg-brand-dark' : 'bg-brand-primary';
  const bgColorLight = color === 'brand' ? 'bg-brand-dark/10' : 'bg-brand-primary/10';
  const borderColor = color === 'brand' ? 'border-brand-dark/20' : 'border-brand-primary/20';
  const textColor = color === 'brand' ? 'text-brand-dark' : 'text-brand-primary';

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
          strokeOpacity="0.15"
          strokeDasharray="4 4"
        />

        {/* Animated particles on orbit */}
        {!prefersReducedMotion && (
          <>
            <circle r="3" fill={color === 'brand' ? '#002B28' : '#006F68'} opacity="0.5">
              <animateMotion
                dur="8s"
                repeatCount="indefinite"
                path={`M ${containerSize / 2 + orbitRadius} ${containerSize / 2} A ${orbitRadius} ${orbitRadius} 0 1 1 ${containerSize / 2 + orbitRadius - 0.01} ${containerSize / 2}`}
              />
            </circle>
            <circle r="2" fill={color === 'brand' ? '#002B28' : '#006F68'} opacity="0.3">
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
          className={`${hubSize} rounded-full ${bgColor} flex items-center justify-center shadow-lg`}
          animate={!prefersReducedMotion ? { scale: [1, 1.05, 1] } : {}}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Zap className={`${size === 'sm' ? 'h-7 w-7' : 'h-8 w-8'} text-white`} />
        </motion.div>
      </div>

      {/* Label */}
      <div className="absolute inset-x-0 -bottom-2 text-center">
        <span className={`text-sm font-semibold ${textColor}`}>{label}</span>
      </div>

      {/* Orbiting items */}
      {items.map((item, index) => {
        const angleRad = (item.angle * Math.PI) / 180;
        const x = Math.cos(angleRad) * orbitRadius;
        const y = Math.sin(angleRad) * orbitRadius;

        return (
          <motion.div
            key={item.key}
            className="absolute"
            style={{
              left: containerSize / 2 + x - (size === 'sm' ? 20 : 24),
              top: containerSize / 2 + y - (size === 'sm' ? 20 : 24),
            }}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={defaultViewport}
            transition={{ delay: 0.1 + index * 0.1, duration: 0.4, type: 'spring' }}
          >
            <motion.div
              className={`${itemSize} rounded-full bg-white ${borderColor} border-2 flex items-center justify-center shadow-md cursor-pointer relative group`}
              whileHover={{ scale: 1.15, y: -3 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            >
              <item.icon className={`${iconSize} ${textColor}`} />

              {/* Tooltip */}
              <div className={`absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap ${bgColorLight} ${textColor} text-xs px-2 py-1 rounded font-medium`}>
                {translations(item.key)}
              </div>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}

// Mobile Flow Card
function MobileFlowCard({
  title,
  items,
  translations,
  color,
}: {
  title: string;
  items: { key: string; icon: React.ComponentType<{ className?: string }> }[];
  translations: (key: string) => string;
  color: 'brand' | 'primary';
}) {
  const bgColor = color === 'brand' ? 'bg-brand-dark/5' : 'bg-brand-primary/5';
  const borderColor = color === 'brand' ? 'border-brand-dark/10' : 'border-brand-primary/10';
  const textColor = color === 'brand' ? 'text-brand-dark' : 'text-brand-primary';
  const iconBg = color === 'brand' ? 'bg-brand-dark/10' : 'bg-brand-primary/10';

  return (
    <div className={`${bgColor} ${borderColor} border rounded-2xl p-4 max-w-xs mx-auto`}>
      <p className={`text-sm font-semibold ${textColor} mb-3 text-center`}>{title}</p>
      <div className="grid grid-cols-4 gap-2">
        {items.map((item) => (
          <div key={item.key} className="flex flex-col items-center gap-1">
            <div className={`h-10 w-10 rounded-full ${iconBg} flex items-center justify-center`}>
              <item.icon className={`h-5 w-5 ${textColor}`} />
            </div>
            <span className="text-[10px] text-zinc-500 text-center truncate w-full">
              {translations(item.key)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Arrow Down Component
function ArrowDown() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={defaultViewport}
      className="text-brand-primary/40"
    >
      <svg width="24" height="32" viewBox="0 0 24 32">
        <path
          d="M12 0 L12 27 M5 20 L12 27 L19 20"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        />
      </svg>
    </motion.div>
  );
}
