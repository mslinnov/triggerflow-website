'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import {
  Users,
  Zap,
  Mail,
  MessageSquare,
  MessageCircle,
  FileText,
  ShoppingCart,
  BarChart3,
  Newspaper,
  Star,
  Gift,
  LucideIcon,
} from 'lucide-react';
import { Container } from '@/components/ui';
import { cn } from '@/lib/utils';

interface OrbitModule {
  key: string;
  icon: LucideIcon;
  angle: number;
}

const orbitModules: OrbitModule[] = [
  { key: 'email', icon: Mail, angle: 0 },
  { key: 'sms', icon: MessageSquare, angle: 40 },
  { key: 'whatsapp', icon: MessageCircle, angle: 80 },
  { key: 'forms', icon: FileText, angle: 120 },
  { key: 'sales', icon: ShoppingCart, angle: 160 },
  { key: 'analytics', icon: BarChart3, angle: 200 },
  { key: 'newsletter', icon: Newspaper, angle: 240 },
  { key: 'reviews', icon: Star, angle: 280 },
  { key: 'loyalty', icon: Gift, angle: 320 },
];

const centerModules = [
  { key: 'crm', icon: Users },
  { key: 'automation', icon: Zap },
];

export function EcosystemSection() {
  const t = useTranslations('ecosystem');

  const orbitRadius = 240;
  const containerSize = 600;
  const center = containerSize / 2;

  // Calculate position on orbit based on angle
  const getOrbitPosition = (angle: number) => {
    const radian = ((angle - 90) * Math.PI) / 180;
    return {
      x: Math.cos(radian) * orbitRadius,
      y: Math.sin(radian) * orbitRadius,
    };
  };

  return (
    <section className="bg-gradient-to-b from-white to-brand-light/30 py-16 md:py-24 overflow-hidden">
      <Container>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-brand-dark md:text-4xl lg:text-[2.75rem]">
            {t('title')}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-600">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Desktop: Orbit View */}
        <div className="mt-16 hidden md:flex justify-center">
          <div
            className="relative"
            style={{ width: containerSize, height: containerSize }}
          >
            {/* SVG Connection Lines */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox={`0 0 ${containerSize} ${containerSize}`}
            >
              <defs>
                {/* Gradient for particles */}
                <linearGradient id="particleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#006F68" stopOpacity="0" />
                  <stop offset="50%" stopColor="#006F68" stopOpacity="1" />
                  <stop offset="100%" stopColor="#006F68" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Orbit circle (dashed) */}
              <circle
                cx={center}
                cy={center}
                r={orbitRadius}
                fill="none"
                stroke="#d4d4d8"
                strokeWidth="1.5"
                strokeDasharray="8 8"
              />

              {/* Connection lines and animated particles */}
              {orbitModules.map((module, index) => {
                const pos = getOrbitPosition(module.angle);
                const lineId = `line-${module.key}`;
                // Alternate direction for visual variety
                const goingOut = index % 2 === 0;
                // Stagger the animation delays
                const delay = index * 0.4;

                return (
                  <g key={module.key}>
                    {/* Static connection line */}
                    <line
                      x1={center}
                      y1={center}
                      x2={center + pos.x}
                      y2={center + pos.y}
                      stroke="#e4e4e7"
                      strokeWidth="1"
                      strokeDasharray="4 8"
                      opacity="0.6"
                    />

                    {/* Path for particle animation */}
                    <path
                      id={lineId}
                      d={`M ${center} ${center} L ${center + pos.x} ${center + pos.y}`}
                      fill="none"
                      stroke="transparent"
                    />

                    {/* Animated particle going outward */}
                    <circle r="3" fill="#006F68" opacity="0.8">
                      <animateMotion
                        dur={`${2 + (index % 3) * 0.5}s`}
                        repeatCount="indefinite"
                        begin={`${delay}s`}
                      >
                        <mpath href={`#${lineId}`} />
                      </animateMotion>
                      <animate
                        attributeName="opacity"
                        values="0;0.8;0.8;0"
                        dur={`${2 + (index % 3) * 0.5}s`}
                        repeatCount="indefinite"
                        begin={`${delay}s`}
                      />
                      <animate
                        attributeName="r"
                        values="2;3;3;2"
                        dur={`${2 + (index % 3) * 0.5}s`}
                        repeatCount="indefinite"
                        begin={`${delay}s`}
                      />
                    </circle>

                    {/* Animated particle coming inward (offset timing) */}
                    <circle r="2.5" fill="#00875a" opacity="0.6">
                      <animateMotion
                        dur={`${2.5 + (index % 2) * 0.5}s`}
                        repeatCount="indefinite"
                        begin={`${delay + 1.2}s`}
                        keyPoints="1;0"
                        keyTimes="0;1"
                        calcMode="linear"
                      >
                        <mpath href={`#${lineId}`} />
                      </animateMotion>
                      <animate
                        attributeName="opacity"
                        values="0;0.6;0.6;0"
                        dur={`${2.5 + (index % 2) * 0.5}s`}
                        repeatCount="indefinite"
                        begin={`${delay + 1.2}s`}
                      />
                    </circle>
                  </g>
                );
              })}

              {/* Rotating particles on the orbit circle */}
              <circle r="4" fill="#006F68" opacity="0.7">
                <animateMotion
                  dur="12s"
                  repeatCount="indefinite"
                  path={`M ${center + orbitRadius} ${center} A ${orbitRadius} ${orbitRadius} 0 1 1 ${center + orbitRadius - 0.1} ${center}`}
                />
              </circle>
              <circle r="3" fill="#00875a" opacity="0.5">
                <animateMotion
                  dur="12s"
                  repeatCount="indefinite"
                  begin="-4s"
                  path={`M ${center + orbitRadius} ${center} A ${orbitRadius} ${orbitRadius} 0 1 1 ${center + orbitRadius - 0.1} ${center}`}
                />
              </circle>
              <circle r="3" fill="#006F68" opacity="0.5">
                <animateMotion
                  dur="12s"
                  repeatCount="indefinite"
                  begin="-8s"
                  path={`M ${center + orbitRadius} ${center} A ${orbitRadius} ${orbitRadius} 0 1 1 ${center + orbitRadius - 0.1} ${center}`}
                />
              </circle>
            </svg>

            {/* Pulse animation ring */}
            <div
              className="absolute rounded-full border-2 border-brand-primary/10 animate-pulse"
              style={{
                width: orbitRadius * 2 + 80,
                height: orbitRadius * 2 + 80,
                left: center - orbitRadius - 40,
                top: center - orbitRadius - 40,
              }}
            />

            {/* Center Hub - using flex centering instead of transform */}
            <div
              className="absolute inset-0 flex items-center justify-center z-20"
            >
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, type: 'spring' }}
              >
                <div className="flex items-center gap-4 rounded-2xl bg-gradient-to-br from-white to-brand-light/50 p-8 shadow-2xl ring-1 ring-brand-primary/10">
                  {centerModules.map((module, index) => (
                    <div key={module.key} className="flex items-center gap-3">
                      {index > 0 && (
                        <div className="h-16 w-px bg-brand-primary/20" />
                      )}
                      <div className="flex flex-col items-center gap-3 px-3">
                        <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-brand-primary text-white shadow-lg">
                          <module.icon className="h-8 w-8" />
                        </div>
                        <span className="text-sm font-bold text-brand-dark whitespace-nowrap">
                          {t(`center.${module.key}`)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Orbit Modules */}
            {orbitModules.map((module, index) => {
              const pos = getOrbitPosition(module.angle);
              return (
                <div
                  key={module.key}
                  className="absolute z-10"
                  style={{
                    left: center + pos.x,
                    top: center + pos.y,
                  }}
                >
                  <motion.a
                    href="#"
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.4,
                      delay: 0.3 + index * 0.08,
                      type: 'spring',
                    }}
                    className="group block -translate-x-1/2 -translate-y-1/2"
                  >
                    <div className="relative flex flex-col items-center">
                      <div
                        className={cn(
                          'flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-lg ring-1 ring-zinc-200',
                          'transition-all duration-200 group-hover:bg-brand-primary group-hover:ring-brand-primary group-hover:shadow-xl group-hover:scale-110'
                        )}
                      >
                        <module.icon className="h-6 w-6 text-brand-dark transition-colors group-hover:text-white" />
                      </div>
                      <span className="mt-2.5 whitespace-nowrap text-sm font-semibold text-brand-dark transition-colors group-hover:text-brand-primary">
                        {t(`modules.${module.key}`)}
                      </span>

                      {/* Tooltip on hover */}
                      <div className="pointer-events-none absolute -bottom-14 left-1/2 -translate-x-1/2 opacity-0 transition-all duration-200 group-hover:opacity-100">
                        <div className="relative whitespace-nowrap rounded-lg bg-brand-dark px-3 py-1.5 text-xs text-white shadow-lg">
                          {t(`tooltips.${module.key}`)}
                          <div className="absolute -top-1 left-1/2 -translate-x-1/2 h-2 w-2 rotate-45 bg-brand-dark" />
                        </div>
                      </div>
                    </div>
                  </motion.a>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile: Grid View */}
        <div className="mt-12 md:hidden">
          {/* Center modules */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8 flex justify-center"
          >
            <div className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-lg ring-1 ring-zinc-100">
              {centerModules.map((module, index) => (
                <div key={module.key} className="flex items-center gap-3">
                  {index > 0 && (
                    <div className="h-10 w-px bg-zinc-200" />
                  )}
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-primary text-white shadow-md">
                      <module.icon className="h-6 w-6" />
                    </div>
                    <span className="text-xs font-semibold text-brand-dark">
                      {t(`center.${module.key}`)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Peripheral modules grid */}
          <div className="grid grid-cols-3 gap-3">
            {orbitModules.map((module, index) => (
              <motion.a
                key={module.key}
                href="#"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="group flex flex-col items-center gap-2 rounded-xl border border-zinc-100 bg-white p-4 shadow-sm transition-all hover:border-brand-primary/30 hover:shadow-md"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-50 transition-colors group-hover:bg-brand-primary/10">
                  <module.icon className="h-5 w-5 text-zinc-500 transition-colors group-hover:text-brand-primary" />
                </div>
                <span className="text-center text-xs font-medium text-zinc-700">
                  {t(`modules.${module.key}`)}
                </span>
              </motion.a>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
