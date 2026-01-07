'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ShoppingCart, ArrowLeftRight, TrendingUp, CreditCard, Package } from 'lucide-react';

export function CatalogVisual() {
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
            <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-sm">
              Remplacer par capture d&apos;écran du Catalogue
            </p>
            <p className="text-gray-400 text-xs mt-1">
              /public/images/assets/catalog.png
            </p>
          </div>
        </div>

        {/* Uncomment when you have the screenshot */}
        {/* <Image
          src="/images/assets/catalog.png"
          alt="TriggerFlow Catalog"
          width={1200}
          height={750}
          className="w-full h-auto"
        /> */}
      </motion.div>

      {/* Floating Element 1: Top Left - Shopping Cart */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, x: -20 }}
        whileInView={{ opacity: 1, scale: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.5 }}
        animate={{ scale: [1, 1.05, 1] }}
        className="absolute -top-6 -left-6 bg-brand-primary text-white rounded-full w-16 h-16 flex items-center justify-center shadow-xl relative"
      >
        <ShoppingCart className="w-8 h-8" />
        <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-7 h-7 flex items-center justify-center text-xs font-bold">
          3
        </div>
      </motion.div>

      {/* Floating Element 2: Top Right - Sync Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: -20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="absolute -top-4 -right-4 bg-gradient-to-r from-brand-primary to-emerald-600 text-white rounded-xl shadow-xl px-4 py-3"
      >
        <div className="flex items-center gap-2 mb-1">
          <ArrowLeftRight className="w-5 h-5" />
          <span className="text-sm font-bold">Sync 2-way</span>
        </div>
        <p className="text-xs opacity-90">avec Thaïs PMS</p>
      </motion.div>

      {/* Floating Element 3: Bottom Left - Price Tag */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, x: -20 }}
        whileInView={{ opacity: 1, scale: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4 border-2 border-amber-500/30"
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
            <span className="text-2xl">💰</span>
          </div>
          <div>
            <p className="text-sm text-gray-500">À partir de</p>
            <p className="text-2xl font-bold text-brand-dark">49€</p>
          </div>
        </div>
      </motion.div>

      {/* Floating Element 4: Bottom Right - Conversion Rate */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.9, duration: 0.5 }}
        className="absolute -bottom-4 -right-4 bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-2xl shadow-xl p-4"
      >
        <div className="flex items-center gap-2 mb-1">
          <TrendingUp className="w-5 h-5" />
          <span className="text-sm font-semibold">Conversion</span>
        </div>
        <p className="text-3xl font-bold">+32%</p>
        <p className="text-xs opacity-90">vs email</p>
      </motion.div>

      {/* Floating Element 5: Left Side - Payment Badge */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="absolute top-1/3 -left-8 bg-white rounded-lg shadow-lg p-3 border border-gray-200"
      >
        <div className="flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-blue-600" />
          <div>
            <p className="text-xs font-semibold text-gray-700">Paiement</p>
            <p className="text-[10px] text-gray-500">en ligne</p>
          </div>
        </div>
      </motion.div>

      {/* Floating Element 6: Right Side - Products Count */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6, duration: 0.5 }}
        animate={{ y: [0, -8, 0] }}
        className="absolute top-1/2 -right-8 bg-purple-500 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg"
      >
        <div className="text-center">
          <Package className="w-6 h-6 mx-auto mb-1" />
          <p className="text-xs font-bold">24 items</p>
        </div>
      </motion.div>
    </div>
  );
}
