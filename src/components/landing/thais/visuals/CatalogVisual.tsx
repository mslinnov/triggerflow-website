'use client';

import { motion } from 'framer-motion';
import { ShoppingCart, RefreshCw, Check, Plus, Minus } from 'lucide-react';

export function CatalogVisual() {
  const products = [
    {
      emoji: '💆',
      name: 'Massage Relaxant',
      price: 75,
      duration: '60 min',
      category: 'Spa',
      badge: 'Populaire',
    },
    {
      emoji: '🍽️',
      name: 'Dîner Gastronomique',
      price: 95,
      duration: '2h',
      category: 'Restaurant',
      badge: null,
    },
    {
      emoji: '🍾',
      name: 'Champagne Premium',
      price: 45,
      duration: null,
      category: 'Boissons',
      badge: null,
    },
    {
      emoji: '⭐',
      name: 'Surclassement Suite',
      price: 120,
      duration: '1 nuit',
      category: 'Hébergement',
      badge: 'Offre spéciale',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden max-w-3xl mx-auto"
    >
      {/* Browser Header */}
      <div className="h-10 bg-gray-100 flex items-center px-4 gap-2 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <div className="flex-1 flex justify-center">
          <div className="px-4 py-1 bg-white rounded-md text-xs text-gray-500 border border-gray-200">
            boutique.hotel-spa-dulac.com
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative">
        {/* Header with sync badge */}
        <div className="bg-gradient-to-r from-brand-primary to-brand-dark p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold mb-1">Améliorez votre séjour</h3>
              <p className="text-sm text-white/80">Découvrez nos services exclusifs</p>
            </div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring' }}
              className="flex items-center gap-2 px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full"
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </motion.div>
              <span className="text-xs font-semibold">Sync Thaïs</span>
            </motion.div>
          </div>
        </div>

        {/* Products grid */}
        <div className="p-6 bg-gradient-to-br from-gray-50 to-white">
          <div className="grid grid-cols-2 gap-4 mb-6">
            {products.map((product, index) => (
              <motion.div
                key={product.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                whileHover={{ scale: 1.03, y: -4 }}
                className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden shadow-md hover:shadow-xl hover:border-brand-primary/50 transition-all cursor-pointer group"
              >
                {/* Image placeholder */}
                <div className="relative h-32 bg-gradient-to-br from-brand-light/30 to-gray-100 flex items-center justify-center overflow-hidden">
                  <span className="text-5xl">{product.emoji}</span>
                  {product.badge && (
                    <div className="absolute top-2 right-2 px-2 py-1 bg-brand-primary text-white text-[10px] font-bold rounded-full">
                      {product.badge}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4">
                  <div className="mb-2">
                    <span className="text-[10px] text-brand-primary font-semibold uppercase tracking-wide">
                      {product.category}
                    </span>
                    <h4 className="text-sm font-bold text-gray-800 mt-0.5 group-hover:text-brand-primary transition-colors">
                      {product.name}
                    </h4>
                    {product.duration && (
                      <p className="text-xs text-gray-500 mt-0.5">⏱️ {product.duration}</p>
                    )}
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <span className="text-lg font-bold text-brand-primary">{product.price}€</span>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 bg-brand-primary text-white text-xs font-semibold rounded-lg hover:bg-brand-dark transition-colors shadow-md"
                    >
                      Ajouter
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Cart summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-gradient-to-br from-brand-primary to-brand-dark rounded-2xl p-6 text-white shadow-2xl relative overflow-hidden"
          >
            {/* Decorative elements */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />

            <div className="relative">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <ShoppingCart className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold mb-0.5">Panier</h4>
                    <p className="text-xs text-white/80">2 articles sélectionnés</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-white/70 mb-0.5">Total</p>
                  <p className="text-2xl font-bold">170€</p>
                </div>
              </div>

              {/* Cart items */}
              <div className="space-y-2 mb-4">
                {[
                  { name: 'Massage Relaxant', price: 75, qty: 1 },
                  { name: 'Dîner Gastronomique', price: 95, qty: 1 },
                ].map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 + index * 0.1 }}
                    className="flex items-center justify-between bg-white/10 backdrop-blur-sm rounded-lg p-3"
                  >
                    <div className="flex-1">
                      <p className="text-sm font-medium">{item.name}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2 bg-white/10 rounded-lg px-2 py-1">
                        <button className="hover:bg-white/20 rounded p-0.5 transition-colors">
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-semibold w-4 text-center">{item.qty}</span>
                        <button className="hover:bg-white/20 rounded p-0.5 transition-colors">
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <span className="text-sm font-bold w-12 text-right">{item.price}€</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Checkout button */}
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-white text-brand-primary py-3 rounded-xl font-bold text-sm hover:bg-gray-100 transition-colors shadow-xl flex items-center justify-center gap-2"
              >
                <Check className="w-4 h-4" />
                Valider la commande
              </motion.button>

              {/* Sync indicator */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="text-center text-xs text-white/60 mt-3"
              >
                ✨ Votre commande sera automatiquement ajoutée à votre facture Thaïs
              </motion.p>
            </div>
          </motion.div>

          {/* Success notification */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 1.8, type: 'spring' }}
            className="mt-4 bg-green-50 border-2 border-green-200 rounded-xl p-4 flex items-center gap-3"
          >
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shrink-0">
              <Check className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-green-800">Commande confirmée !</p>
              <p className="text-xs text-green-600 mt-0.5">
                Synchronisée avec Thaïs PMS • Confirmation envoyée par email
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
