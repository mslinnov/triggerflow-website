'use client';

import { PhoneMockup } from './PhoneMockup';
import { CheckCircle, CreditCard, Star } from 'lucide-react';

export function UpsellCheckoutMockup() {
  return (
    <PhoneMockup>
      <div className="px-4 py-3 bg-white h-full">
        {/* Email header */}
        <div className="text-center mb-3">
          <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-100 rounded-full mb-2">
            <Star className="w-2.5 h-2.5 text-amber-500" />
            <span className="text-[8px] text-gray-500">email</span>
          </div>
          <h3 className="text-xs font-bold text-gray-800">Votre surclassement vous attend</h3>
        </div>

        {/* Offer card */}
        <div className="relative bg-gradient-to-br from-brand-primary/5 to-brand-primary/10 rounded-xl border border-brand-primary/20 p-3 mb-3">
          {/* Savings badge */}
          <div className="absolute -top-2 -right-1 bg-red-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-sm">
            -40%
          </div>

          <p className="text-[10px] font-semibold text-gray-800 mb-1">Chambre Sup&eacute;rieure Vue Mer</p>

          <div className="flex items-baseline gap-1.5 mb-2">
            <span className="text-sm font-bold text-brand-primary">39&euro;</span>
            <span className="text-[10px] text-gray-400">/nuit</span>
            <span className="text-[10px] text-gray-400 line-through ml-1">65&euro;</span>
          </div>

          <div className="flex items-center gap-1 text-[9px] text-gray-500 mb-3">
            <CreditCard className="w-3 h-3" />
            <span>Ajout&eacute; directement &agrave; votre facture</span>
          </div>

          {/* CTA Button */}
          <button className="w-full py-2 bg-brand-primary text-white rounded-lg text-xs font-semibold hover:bg-brand-primary/90 transition-colors shadow-sm">
            R&eacute;server maintenant
          </button>
        </div>

        {/* Confirmation state */}
        <div className="bg-green-50 rounded-xl border border-green-200 p-3 text-center">
          <CheckCircle className="w-6 h-6 text-green-500 mx-auto mb-1" />
          <p className="text-xs font-bold text-green-700 mb-0.5">R&eacute;serv&eacute; !</p>
          <p className="text-[9px] text-green-600">Ajout&eacute; &agrave; votre facture automatiquement</p>
        </div>

        {/* Client info */}
        <div className="mt-3 pt-2.5 border-t border-gray-100 text-center">
          <p className="text-[9px] text-gray-400">Sophie Durand &middot; S&eacute;jour du 15 au 18 jan</p>
        </div>
      </div>
    </PhoneMockup>
  );
}
