'use client';

import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Calculator, TrendingUp, Clock, ArrowRight } from 'lucide-react';
import { Container, ButtonLink } from '@/components/ui';

export function ThaisROICalculator() {
  const searchParams = useSearchParams();
  const [rooms, setRooms] = useState(30);
  const [occupancy, setOccupancy] = useState(70);
  const [avgRate, setAvgRate] = useState(120);

  // Build Calendly URL with UTM parameters
  const calendlyUrl = useMemo(() => {
    const baseUrl = 'https://app.lemcal.com/@trigger-flow/tf-thais';
    const utmParams = new URLSearchParams();

    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'].forEach((param) => {
      const value = searchParams.get(param);
      if (value) utmParams.append(param, value);
    });

    return utmParams.toString() ? `${baseUrl}?${utmParams.toString()}` : baseUrl;
  }, [searchParams]);

  // ROI Calculations based on industry benchmarks
  const results = useMemo(() => {
    const nightsPerMonth = rooms * (occupancy / 100) * 30;
    const monthlyRevenue = nightsPerMonth * avgRate;

    // Upsell revenue (typically 3-5% of revenue with automation)
    const upsellRate = 0.035;
    const additionalUpsellRevenue = monthlyRevenue * upsellRate;

    // Direct booking increase (reduce OTA fees ~15% of booking value)
    const directBookingIncrease = 0.05; // 5% more direct bookings
    const savedOTAFees = monthlyRevenue * directBookingIncrease * 0.15;

    // Time savings (average 4h/week = 16h/month at ~25€/h)
    const hoursSaved = 16;
    const timeSavingsValue = hoursSaved * 25;

    // Review impact (more reviews = better ranking = more bookings)
    const reviewImpact = monthlyRevenue * 0.01;

    const totalMonthlyROI = additionalUpsellRevenue + savedOTAFees + timeSavingsValue + reviewImpact;
    const annualROI = totalMonthlyROI * 12;

    return {
      upsellRevenue: Math.round(additionalUpsellRevenue),
      savedFees: Math.round(savedOTAFees),
      timeSavings: Math.round(timeSavingsValue),
      reviewImpact: Math.round(reviewImpact),
      monthlyTotal: Math.round(totalMonthlyROI),
      annualTotal: Math.round(annualROI),
      hoursSaved,
    };
  }, [rooms, occupancy, avgRate]);

  return (
    <section id="calculateur" className="py-16 md:py-24 bg-gradient-to-br from-[var(--thais-bg)]/50 via-white to-brand-light/30">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-[var(--thais-primary)]/20 rounded-full mb-6 shadow-sm">
            <Calculator className="w-5 h-5 text-[var(--thais-primary)]" />
            <span className="text-sm font-semibold text-[var(--thais-primary)]">Calculateur ROI</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-brand-dark sm:text-4xl">
            Estimez vos gains avec TriggerFlow
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-600">
            Basé sur les résultats moyens de nos clients hôteliers
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Input Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-gray-200"
            >
              <h3 className="text-lg font-bold text-brand-dark mb-6">Votre établissement</h3>

              {/* Rooms slider */}
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium text-zinc-700">Nombre de chambres</label>
                  <span className="text-sm font-bold text-[var(--thais-primary)]">{rooms}</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="150"
                  value={rooms}
                  onChange={(e) => setRooms(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[var(--thais-primary)]"
                />
                <div className="flex justify-between text-xs text-zinc-400 mt-1">
                  <span>10</span>
                  <span>150</span>
                </div>
              </div>

              {/* Occupancy slider */}
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium text-zinc-700">Taux d&apos;occupation moyen</label>
                  <span className="text-sm font-bold text-[var(--thais-primary)]">{occupancy}%</span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="95"
                  value={occupancy}
                  onChange={(e) => setOccupancy(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[var(--thais-primary)]"
                />
                <div className="flex justify-between text-xs text-zinc-400 mt-1">
                  <span>30%</span>
                  <span>95%</span>
                </div>
              </div>

              {/* Average rate slider */}
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium text-zinc-700">Prix moyen par nuit</label>
                  <span className="text-sm font-bold text-[var(--thais-primary)]">{avgRate}€</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="300"
                  step="10"
                  value={avgRate}
                  onChange={(e) => setAvgRate(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[var(--thais-primary)]"
                />
                <div className="flex justify-between text-xs text-zinc-400 mt-1">
                  <span>50€</span>
                  <span>300€</span>
                </div>
              </div>

              <p className="text-xs text-zinc-500 mt-4">
                * Estimations basées sur les performances moyennes de nos clients avec des configurations similaires.
              </p>
            </motion.div>

            {/* Results Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-[var(--thais-primary)] via-[#0a2590] to-brand-primary rounded-2xl p-6 md:p-8 shadow-lg text-white"
            >
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Vos gains estimés
              </h3>

              {/* Breakdown */}
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center py-3 border-b border-white/20">
                  <span className="text-white/80">Revenus upsells additionnels</span>
                  <span className="font-bold">+{results.upsellRevenue}€/mois</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-white/20">
                  <span className="text-white/80">Économies frais OTA</span>
                  <span className="font-bold">+{results.savedFees}€/mois</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-white/20">
                  <span className="text-white/80 flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    Temps gagné ({results.hoursSaved}h/mois)
                  </span>
                  <span className="font-bold">+{results.timeSavings}€/mois</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-white/20">
                  <span className="text-white/80">Impact e-réputation</span>
                  <span className="font-bold">+{results.reviewImpact}€/mois</span>
                </div>
              </div>

              {/* Total */}
              <div className="bg-white/10 rounded-xl p-4 mb-6 backdrop-blur-sm">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white/80">Total mensuel estimé</span>
                  <span className="text-2xl font-bold text-[var(--thais-cyan)]">
                    +{results.monthlyTotal}€
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/80">Soit par an</span>
                  <span className="text-xl font-bold">
                    +{results.annualTotal.toLocaleString()}€
                  </span>
                </div>
              </div>

              {/* CTA */}
              <ButtonLink
                href={calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
                size="lg"
                className="w-full justify-center bg-white text-[var(--thais-primary)] hover:bg-gray-100 gap-2"
              >
                Valider ces gains avec un expert
                <ArrowRight className="w-4 h-4" />
              </ButtonLink>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
