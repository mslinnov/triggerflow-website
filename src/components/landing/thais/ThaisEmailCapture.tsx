'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Gift, Mail, ArrowRight, CheckCircle } from 'lucide-react';
import Image from 'next/image';

export function ThaisEmailCapture() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    // Check if already shown in this session
    const shown = sessionStorage.getItem('thais-popup-shown');
    if (shown) {
      return;
    }

    // Exit intent detection (desktop only)
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShown) {
        setIsOpen(true);
        setHasShown(true);
        sessionStorage.setItem('thais-popup-shown', 'true');
      }
    };

    // Scroll-based trigger (mobile fallback) - show after 60% scroll
    const handleScroll = () => {
      const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
      if (scrollPercent > 60 && !hasShown) {
        setIsOpen(true);
        setHasShown(true);
        sessionStorage.setItem('thais-popup-shown', 'true');
      }
    };

    // Time-based trigger - show after 45 seconds
    const timer = setTimeout(() => {
      if (!hasShown) {
        setIsOpen(true);
        setHasShown(true);
        sessionStorage.setItem('thais-popup-shown', 'true');
      }
    }, 45000);

    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, [hasShown]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would integrate with your email service (Brevo, etc.)
    console.log('Email captured:', email);
    setIsSubmitted(true);

    // Close after 3 seconds
    setTimeout(() => {
      setIsOpen(false);
    }, 3000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-lg mx-4"
          >
            <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden">
              {/* Close button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors z-10"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>

              {/* Header with gradient */}
              <div className="bg-gradient-to-br from-[var(--thais-primary)] via-[#0a2590] to-[var(--thais-cyan)] p-6 pb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                    <Gift className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Image
                      src="/images/logo.webp"
                      alt="TriggerFlow"
                      width={100}
                      height={28}
                      className="h-6 w-auto brightness-0 invert"
                    />
                    <span className="text-white/60">×</span>
                    <Image
                      src="/images/partners/thais-logo.svg"
                      alt="Thaïs"
                      width={70}
                      height={24}
                      className="h-5 w-auto brightness-0 invert"
                    />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Envie de réduire votre charge mentale ?
                </h3>
                <p className="text-white/80">
                  Recevez notre guide gratuit : <strong>10 automatisations</strong> pour ne plus penser à vos emails clients
                </p>
              </div>

              {/* Content */}
              <div className="p-6">
                {!isSubmitted ? (
                  <>
                    {/* Benefits */}
                    <ul className="space-y-3 mb-6">
                      {[
                        'Automatisez vos emails de bienvenue selon le code tarif',
                        'Plus jamais de rappel pré-séjour oublié',
                        'Demandes d\'avis envoyées sans y penser',
                        'Upsells proposés automatiquement au bon moment',
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-zinc-600">
                          <CheckCircle className="w-4 h-4 text-[var(--thais-cyan)] flex-shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-3">
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Votre email professionnel"
                          required
                          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--thais-primary)] focus:border-transparent outline-none transition-all"
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[var(--thais-primary)] to-brand-primary text-white font-semibold rounded-lg hover:shadow-lg transition-all"
                      >
                        Recevoir le guide gratuit
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </form>

                    <p className="mt-4 text-xs text-center text-gray-500">
                      En soumettant ce formulaire, vous acceptez de recevoir nos communications.
                      Désabonnement possible à tout moment.
                    </p>
                  </>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-6"
                  >
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h4 className="text-xl font-bold text-brand-dark mb-2">
                      Guide envoyé !
                    </h4>
                    <p className="text-zinc-600">
                      Vérifiez votre boîte mail dans quelques instants.
                    </p>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
