'use client';

import { motion } from 'framer-motion';
import { Container } from '@/components/ui';
import { Star, MapPin } from 'lucide-react';

// Anonymized hotel logos represented as styled cards
const hotels = [
  { name: 'Hôtel & Spa', stars: 4, location: 'Annecy', initial: 'HS' },
  { name: 'Le Relais', stars: 3, location: 'Lyon', initial: 'LR' },
  { name: 'Domaine des Vignes', stars: 4, location: 'Bordeaux', initial: 'DV' },
  { name: 'Maison d\'hôtes', stars: 4, location: 'Provence', initial: 'MH' },
  { name: 'Hôtel de la Plage', stars: 3, location: 'Biarritz', initial: 'HP' },
  { name: 'Le Provençal', stars: 4, location: 'Nice', initial: 'LP' },
  { name: 'Château Hotel', stars: 5, location: 'Loire', initial: 'CH' },
  { name: 'Boutique Hotel', stars: 4, location: 'Paris', initial: 'BH' },
];

// Duplicate for infinite scroll effect
const allHotels = [...hotels, ...hotels];

export function ThaisLogoCarousel() {
  return (
    <section className="py-12 bg-white border-y border-gray-100 overflow-hidden">
      <Container>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-sm font-medium text-zinc-500 mb-8"
        >
          Ils nous font confiance — <span className="text-[var(--thais-primary)] font-semibold">200+ hôtels</span>
        </motion.p>
      </Container>

      {/* Infinite scroll carousel */}
      <div className="relative">
        {/* Gradient masks */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10" />

        {/* Scrolling track */}
        <motion.div
          animate={{ x: [0, -50 * hotels.length] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 30,
              ease: 'linear',
            },
          }}
          className="flex gap-6"
        >
          {allHotels.map((hotel, index) => (
            <div
              key={index}
              className="flex-shrink-0 flex items-center gap-3 px-5 py-3 bg-gray-50 rounded-xl border border-gray-200 hover:border-[var(--thais-cyan)]/50 hover:bg-[var(--thais-bg)]/30 transition-all"
            >
              {/* Initial badge */}
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[var(--thais-primary)] to-[var(--thais-cyan)] flex items-center justify-center text-white font-bold text-sm">
                {hotel.initial}
              </div>

              {/* Info */}
              <div className="min-w-[120px]">
                <div className="flex items-center gap-1 mb-0.5">
                  {[...Array(hotel.stars)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-sm font-medium text-brand-dark">{hotel.name}</p>
                <p className="text-xs text-zinc-500 flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {hotel.location}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Trust indicators */}
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-6 mt-8 text-sm text-zinc-500"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span>98% de satisfaction client</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[var(--thais-cyan)]" />
            <span>Support francophone</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[var(--thais-primary)]" />
            <span>Intégration Thaïs native</span>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
