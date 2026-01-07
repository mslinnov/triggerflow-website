'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Layout, ArrowLeftRight, CheckCircle2, GripVertical, FileText } from 'lucide-react';

export function FormBuilderVisual() {
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
        <div className="aspect-[16/10] bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
          <div className="text-center">
            <Layout className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-sm">
              Remplacer par capture d&apos;écran du Form Builder
            </p>
            <p className="text-gray-400 text-xs mt-1">
              /public/images/assets/form-builder.png
            </p>
          </div>
        </div>

        {/* Uncomment when you have the screenshot */}
        {/* <Image
          src="/images/assets/form-builder.png"
          alt="TriggerFlow Form Builder"
          width={1200}
          height={750}
          className="w-full h-auto"
        /> */}
      </motion.div>

      {/* Floating Element 1: Top Left - Sync Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, x: -20 }}
        whileInView={{ opacity: 1, scale: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="absolute -top-4 -left-4 bg-gradient-to-r from-brand-primary to-emerald-600 text-white rounded-xl shadow-xl px-4 py-3"
      >
        <div className="flex items-center gap-2">
          <ArrowLeftRight className="w-5 h-5" />
          <div>
            <p className="text-sm font-bold">Sync Thaïs</p>
            <p className="text-xs opacity-90">Bidirectionnel</p>
          </div>
        </div>
      </motion.div>

      {/* Floating Element 2: Top Right - Responses Count */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: -20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="absolute -top-6 -right-6 bg-white rounded-2xl shadow-xl p-5 border-2 border-purple-500/30"
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
            <FileText className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <p className="text-3xl font-bold text-brand-dark">156</p>
            <p className="text-xs text-gray-500">réponses</p>
          </div>
        </div>
      </motion.div>

      {/* Floating Element 3: Bottom Left - Drag & Drop */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, x: -20 }}
        whileInView={{ opacity: 1, scale: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.7, duration: 0.5 }}
        animate={{ y: [0, -5, 0] }}
        className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-3 border border-gray-200"
      >
        <div className="flex items-center gap-2">
          <GripVertical className="w-5 h-5 text-gray-400" />
          <span className="text-sm font-semibold text-gray-700">Drag & Drop</span>
        </div>
        <p className="text-xs text-gray-500 mt-1">Interface no-code</p>
      </motion.div>

      {/* Floating Element 4: Bottom Right - RGPD Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.9, duration: 0.5 }}
        className="absolute -bottom-4 -right-4 bg-green-500 text-white rounded-full px-4 py-2 shadow-lg flex items-center gap-2"
      >
        <CheckCircle2 className="w-5 h-5" />
        <span className="text-sm font-semibold">RGPD Compliant</span>
      </motion.div>

      {/* Floating Element 5: Left Side - Field Types */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="absolute top-1/3 -left-8 bg-white rounded-lg shadow-lg p-3 border border-gray-200"
      >
        <p className="text-xs text-gray-500 mb-2 font-semibold">Types de champs</p>
        <div className="space-y-1">
          <div className="text-xs text-gray-700">✓ Texte</div>
          <div className="text-xs text-gray-700">✓ Email</div>
          <div className="text-xs text-gray-700">✓ Date</div>
          <div className="text-xs text-gray-700">✓ Choix</div>
        </div>
      </motion.div>

      {/* Floating Element 6: Right Side - Forms Count */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="absolute top-1/2 -right-6 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-full w-16 h-16 flex flex-col items-center justify-center shadow-xl"
      >
        <p className="text-xl font-bold">∞</p>
        <p className="text-[10px] opacity-90">illimités</p>
      </motion.div>
    </div>
  );
}
