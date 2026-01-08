'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Star, TrendingUp, Award, BarChart3 } from 'lucide-react';

export function ReviewsVisual() {
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
        {/* Placeholder */}
        {/*<div className="aspect-[16/10] bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">*/}
        {/*  <div className="text-center">*/}
        {/*    <Star className="w-16 h-16 text-gray-400 mx-auto mb-4" />*/}
        {/*    <p className="text-gray-500 text-sm">*/}
        {/*      Remplacer par capture d&apos;écran de Reviews Dashboard*/}
        {/*    </p>*/}
        {/*    <p className="text-gray-400 text-xs mt-1">*/}
        {/*      /public/images/assets/reviews.png*/}
        {/*    </p>*/}
        {/*  </div>*/}
        {/*</div>*/}

        {/* Uncomment when you have the screenshot */}
        <Image
          src="/images/assets/reviews.png"
          alt="TriggerFlow Reviews Dashboard"
          width={1200}
          height={750}
          className="w-full h-auto"
        />
      </motion.div>

      {/* Floating Element 1: Top Left - Average Rating - Adjusted for mobile */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="max-w-52 absolute -top-6 right-2 md:-top-6 md:-left-6 bg-gradient-to-br from-amber-400 to-orange-500 text-white rounded-xl md:rounded-2xl shadow-xl p-2 md:p-4"
      >
        <div className="flex items-center gap-1.5 md:gap-2">
          <Star className="w-4 h-4 md:w-5 md:h-5 fill-white flex-shrink-0" />
          <span className="text-[10px] md:text-xs font-semibold whitespace-nowrap">Note moyenne</span>
          <span className="text-xl md:text-2xl font-bold">4.8</span>
        </div>
        <div className="hidden md:flex gap-0.5 mt-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-3 h-3 fill-white" />
          ))}
        </div>
      </motion.div>

      {/* Floating Element 2: Top Right - Review Sources - Hidden on mobile */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="hidden md:block absolute -top-4 -right-4 bg-white rounded-xl shadow-xl p-3 border border-gray-200"
      >
        <p className="text-xs text-gray-500 mb-2 font-semibold">Sources</p>
        <div className="flex gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-xs font-bold text-blue-700">
            G
          </div>
          <div className="w-8 h-8 rounded-lg bg-sky-100 flex items-center justify-center text-xs font-bold text-sky-700">
            B
          </div>
          <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center text-xs font-bold text-green-700">
            T
          </div>
        </div>
        <p className="text-[10px] text-gray-400 mt-1">Google, Booking, TripAdvisor</p>
      </motion.div>

      {/* Floating Element 3: Bottom Left - Growth - Hidden on mobile */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="hidden md:flex absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4 border-2 border-green-500/30"
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Ce mois</p>
            <p className="text-xl font-bold text-green-600">+25 avis</p>
          </div>
        </div>
      </motion.div>

      {/* Floating Element 4: Bottom Right - Total Reviews - Hidden on mobile */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.9, duration: 0.5 }}
        className="hidden md:flex absolute -bottom-4 -right-4 bg-gradient-to-br from-brand-primary to-emerald-600 text-white rounded-full w-20 h-20 flex-col items-center justify-center shadow-xl"
      >
        <p className="text-2xl font-bold">547</p>
        <p className="text-[10px] opacity-90">avis total</p>
      </motion.div>

      {/* Floating Element 5: Right Side - Award Badge - Hidden on mobile */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="hidden lg:flex absolute top-1/3 -right-8 bg-purple-500 text-white rounded-full w-16 h-16 items-center justify-center shadow-lg"
      >
        <Award className="w-8 h-8" />
      </motion.div>

      {/* Floating Element 6: Left Side - Analytics - Hidden on mobile */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="hidden lg:block absolute top-1/2 -left-6 bg-white rounded-lg px-3 py-2 shadow-lg border border-gray-200"
      >
        <div className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-brand-primary" />
          <span className="text-xs font-semibold text-gray-700">Analytics</span>
        </div>
      </motion.div>
    </div>
  );
}
