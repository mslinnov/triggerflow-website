'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Filter, Users, Target, Sparkles } from 'lucide-react';

export function SegmentationVisual() {
  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Main Screenshot */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative rounded-2xl overflow-hidden shadow-2xl"
      >
        {/* Placeholder */}
        {/*<div className="aspect-[16/10] bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">*/}
        {/*  <div className="text-center">*/}
        {/*    <Filter className="w-16 h-16 text-gray-400 mx-auto mb-4" />*/}
        {/*    <p className="text-gray-500 text-sm">*/}
        {/*      Remplacer par capture d&apos;écran de la Segmentation*/}
        {/*    </p>*/}
        {/*    <p className="text-gray-400 text-xs mt-1">*/}
        {/*      /public/images/assets/segmentation.png*/}
        {/*    </p>*/}
        {/*  </div>*/}
        {/*</div>*/}

        {/* Uncomment when you have the screenshot */}
        <Image
          src="/images/assets/segmentation.png"
          alt="TriggerFlow Segmentation"
          width={1200}
          height={750}
          className="w-full h-auto"
        />
      </motion.div>

      {/* Floating Element 1: Top Left - Active Filters */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, x: -20 }}
        whileInView={{ opacity: 1, scale: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="absolute -top-4 -left-4 bg-white rounded-xl shadow-xl p-3 border-2 border-purple-500/30"
      >
        <div className="flex items-center gap-2 mb-2">
          <Filter className="w-4 h-4 text-purple-600" />
          <span className="text-sm font-semibold text-gray-800">Filtres actifs</span>
        </div>
        <div className="flex flex-wrap gap-1">
          <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded">
            VIP
          </span>
          <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded">
            Séjour &gt; 3j
          </span>
          <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded">
            2024
          </span>
        </div>
      </motion.div>

      {/* Floating Element 2: Top Right - Matched Count */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: -20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="absolute -top-6 -right-6 bg-gradient-to-br from-brand-primary to-emerald-600 text-white rounded-2xl shadow-xl p-5"
      >
        <div className="flex items-center gap-2 mb-1">
          <Target className="w-5 h-5" />
          <span className="text-sm font-semibold">Correspondances</span>
        </div>
        <p className="text-3xl font-bold">342</p>
        <p className="text-xs opacity-90">clients ciblés</p>
      </motion.div>

      {/* Floating Element 3: Bottom Left - Segments */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, x: -20 }}
        whileInView={{ opacity: 1, scale: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4 border border-gray-200"
      >
        <p className="text-xs text-gray-500 mb-2">Segments populaires</p>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-purple-500" />
            <span className="text-sm font-medium text-gray-700">Clients VIP</span>
            <span className="text-xs text-gray-400 ml-auto">128</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-500" />
            <span className="text-sm font-medium text-gray-700">Habitués</span>
            <span className="text-xs text-gray-400 ml-auto">89</span>
          </div>
        </div>
      </motion.div>

      {/* Floating Element 4: Bottom Right - Dynamic Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.9, duration: 0.5 }}
        className="absolute -bottom-4 -right-4 bg-amber-500 text-white rounded-full px-4 py-2 shadow-lg flex items-center gap-2"
      >
        <Sparkles className="w-4 h-4" />
        <span className="text-sm font-semibold">Mise à jour temps réel</span>
      </motion.div>

      {/* Floating Element 5: Left Side - User Icon */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.5 }}
        animate={{ y: [0, -8, 0] }}
        className="absolute top-1/3 -left-8 bg-white rounded-full w-16 h-16 flex items-center justify-center shadow-xl border-2 border-brand-primary/30"
      >
        <Users className="w-8 h-8 text-brand-primary" />
      </motion.div>
    </div>
  );
}
