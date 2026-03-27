'use client';

import { Lock, Globe, CreditCard, Building2 } from 'lucide-react';

export function PaymentLinkMockup() {
  return (
    <div className="flex h-full w-full items-start justify-center bg-gradient-to-b from-[#f0faf8] to-white p-4 pt-6">
      {/* Payment page preview */}
      <div className="w-full max-w-sm rounded-2xl border border-gray-200 bg-white shadow-lg">
        {/* Hotel branding header */}
        <div className="rounded-t-2xl bg-gradient-to-r from-brand-primary to-brand-primary/80 px-5 py-4 text-center">
          <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur">
            <Building2 className="h-5 w-5 text-white" />
          </div>
          <p className="text-xs font-bold text-white">Hôtel & Spa Le Clos ****</p>
          <p className="mt-0.5 text-[9px] text-white/70">Paiement sécurisé</p>
        </div>

        <div className="p-4">
          {/* Amount */}
          <div className="mb-4 text-center">
            <p className="text-[10px] text-gray-500">Acompte - Réservation #4521</p>
            <p className="mt-1 text-2xl font-bold text-gray-800">150,00 €</p>
            <p className="mt-0.5 text-[9px] text-gray-400">Sophie Durand &middot; 15-18 jan 2026</p>
          </div>

          {/* Language selector */}
          <div className="mb-3 flex items-center justify-center gap-1">
            <Globe className="h-2.5 w-2.5 text-gray-400" />
            {['FR', 'EN', 'ES', 'DE', 'IT'].map((lang) => (
              <button
                key={lang}
                className={`rounded px-1.5 py-0.5 text-[8px] font-medium ${
                  lang === 'FR'
                    ? 'bg-brand-primary/10 text-brand-primary'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>

          {/* Card input */}
          <div className="space-y-2">
            <div className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2">
              <p className="text-[8px] text-gray-400">Numéro de carte</p>
              <div className="flex items-center gap-2">
                <p className="text-[10px] text-gray-700">4242 •••• •••• 4242</p>
                <div className="ml-auto flex gap-1">
                  <div className="h-3.5 w-5.5 rounded-sm bg-[#1a1f71] px-0.5 text-center text-[6px] font-bold leading-[14px] text-white">VISA</div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2">
                <p className="text-[8px] text-gray-400">Expiration</p>
                <p className="text-[10px] text-gray-700">12/28</p>
              </div>
              <div className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2">
                <p className="text-[8px] text-gray-400">CVC</p>
                <p className="text-[10px] text-gray-700">•••</p>
              </div>
            </div>
          </div>

          {/* Pay button */}
          <button className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-xl bg-brand-primary py-2.5 text-xs font-semibold text-white shadow-md shadow-brand-primary/20">
            <Lock className="h-3 w-3" />
            Payer 150,00 €
          </button>

          {/* Stripe badge */}
          <div className="mt-2.5 flex items-center justify-center gap-1 text-[8px] text-gray-400">
            <Lock className="h-2 w-2" />
            Paiement sécurisé via Stripe
          </div>
        </div>
      </div>
    </div>
  );
}
