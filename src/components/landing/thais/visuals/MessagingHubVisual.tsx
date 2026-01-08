'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { MessageSquare, Mail, Phone, Clock } from 'lucide-react';

export function MessagingHubVisual() {
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
        {/*    <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />*/}
        {/*    <p className="text-gray-500 text-sm">*/}
        {/*      Remplacer par capture d&apos;écran du Messaging Hub*/}
        {/*    </p>*/}
        {/*    <p className="text-gray-400 text-xs mt-1">*/}
        {/*      /public/images/assets/messaging-hub.png*/}
        {/*    </p>*/}
        {/*  </div>*/}
        {/*</div>*/}

        {/* Uncomment when you have the screenshot */}
        <Image
          src="/images/assets/messaging.png"
          alt="TriggerFlow Messaging Hub"
          width={1200}
          height={750}
          className="w-full h-auto"
        />
      </motion.div>

      {/* Floating Element 1: Top Left - Channel Badges */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="absolute -top-6 left-2 md:-top-4 md:-left-4 bg-white rounded-xl shadow-xl p-2 md:p-3 border border-gray-200"
      >
        <p className="text-[10px] md:text-xs text-gray-500 mb-1.5 md:mb-2 font-semibold">Canaux actifs</p>
        <div className="flex gap-1.5 md:gap-2">
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-blue-100 flex items-center justify-center">
            <Mail className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
          </div>
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-green-100 flex items-center justify-center">
            <Phone className="w-4 h-4 md:w-5 md:h-5 text-green-600" />
          </div>
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
            <MessageSquare className="w-4 h-4 md:w-5 md:h-5 text-emerald-600" />
          </div>
        </div>
      </motion.div>

      {/* Floating Element 2: Top Right - New Messages - Hidden on mobile */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="hidden md:flex absolute -top-6 -right-6 bg-red-500 text-white rounded-full w-16 h-16 items-center justify-center shadow-lg"
      >
        <div className="text-center">
          <p className="text-2xl font-bold">3</p>
          <p className="text-[10px] opacity-90">nouveaux</p>
        </div>
      </motion.div>

      {/* Floating Element 3: Bottom Left - Response Time - Hidden on mobile */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="hidden md:flex absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4 border-2 border-blue-500/30"
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
            <Clock className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Temps de réponse</p>
            <p className="text-2xl font-bold text-brand-dark">2min</p>
          </div>
        </div>
      </motion.div>

      {/* Floating Element 4: Right Side - WhatsApp Badge - Hidden on mobile */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="hidden lg:block absolute top-1/2 -right-6 bg-[#25D366] text-white rounded-lg px-3 py-2 shadow-lg"
      >
        <div className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5" />
          <div>
            <p className="text-xs font-semibold">WhatsApp</p>
            <p className="text-[10px] opacity-90">Business API</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
