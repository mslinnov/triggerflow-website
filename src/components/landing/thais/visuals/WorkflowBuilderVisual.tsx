'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import {Check, TrendingUp, Users } from 'lucide-react';

export function WorkflowBuilderVisual() {
  return (
    <div className="relative w-full max-w-2xl mx-auto px-2 md:px-0">
      {/* Main Screenshot */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative rounded-2xl overflow-hidden shadow-2xl"
      >
        <Image
          src="/images/assets/flow-builder.png"
          alt="TriggerFlow Flow Builder"
          width={1200}
          height={750}
          className="w-full h-auto"
        />
      </motion.div>

      {/* Floating Element 1: Top Left - Active Status - Hidden on mobile */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="hidden md:flex absolute -top-4 -left-4 bg-green-500 text-white px-4 py-2 rounded-full shadow-lg items-center gap-2"
      >
        <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
        <span className="text-sm font-semibold">Automation active</span>
      </motion.div>

      {/* Floating Element 2: Top Right - Stats - Adjusted for mobile */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="absolute top-2 right-2 md:-top-6 md:-right-6 bg-white rounded-xl md:rounded-2xl shadow-xl p-2 md:p-4 border-2 border-brand-primary/20"
      >
        <div className="flex items-center gap-2 md:gap-3">
          <div className="w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-brand-primary/10 flex items-center justify-center">
            <Check className="w-4 h-4 md:w-6 md:h-6 text-brand-primary" />
          </div>
          <div>
            <p className="text-lg md:text-2xl font-bold text-brand-dark">98%</p>
            <p className="text-[10px] md:text-xs text-gray-500">Délivrabilité</p>
          </div>
        </div>
      </motion.div>

      {/* Floating Element 3: Bottom Left - Clients Reached - Hidden on mobile */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="hidden md:flex absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-3 items-center gap-2 border border-gray-200"
      >
        <Users className="w-5 h-5 text-brand-primary" />
        <div>
          <p className="text-lg font-bold text-brand-dark">1,247</p>
          <p className="text-xs text-gray-500">clients contactés</p>
        </div>
      </motion.div>

      {/* Floating Element 4: Bottom Right - Performance - Hidden on mobile */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.9, duration: 0.5 }}
        className="hidden md:block absolute -bottom-6 -right-6 bg-gradient-to-br from-brand-primary to-emerald-600 text-white rounded-xl shadow-lg p-4"
      >
        <div className="flex items-center gap-2 mb-1">
          <TrendingUp className="w-5 h-5" />
          <span className="text-sm font-semibold">Performance</span>
        </div>
        <p className="text-2xl font-bold">+45%</p>
        <p className="text-xs opacity-90">vs mois dernier</p>
      </motion.div>

      {/* Floating Element 5: Right Side - Hidden on mobile */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="hidden lg:flex absolute top-1/2 -right-8 bg-orange-500 text-white rounded-full w-14 h-14 items-center justify-center shadow-lg"
      >
        <div className="text-center">
          <p className="text-xs font-bold">4</p>
          <p className="text-[10px] opacity-90">étapes</p>
        </div>
      </motion.div>
    </div>
  );
}
