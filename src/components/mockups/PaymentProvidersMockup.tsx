'use client';

import { CheckCircle2, Clock, Settings, ArrowRight, Shield, Zap, Globe } from 'lucide-react';

export function PaymentProvidersMockup() {
  return (
    <div className="h-full w-full bg-white p-4">
      <h4 className="mb-1 text-xs font-semibold text-gray-800">Prestataires de paiement</h4>
      <p className="mb-3 text-[9px] text-gray-500">Un seul système, plusieurs prestataires - changez sans migration</p>

      {/* Provider cards */}
      <div className="space-y-2.5">
        {/* Stripe — connected */}
        <div className="rounded-xl border-2 border-brand-primary/30 bg-brand-primary/5 p-3">
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-14 items-center justify-center rounded-lg bg-[#635bff]">
                <span className="text-[10px] font-bold text-white">stripe</span>
              </div>
              <div>
                <p className="text-[10px] font-semibold text-gray-800">Stripe Connect</p>
                <p className="text-[9px] text-gray-500">~1,5% + 0,25€ par transaction</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="flex items-center gap-0.5 rounded-full bg-green-100 px-1.5 py-0.5">
                <CheckCircle2 className="h-2.5 w-2.5 text-green-600" />
                <span className="text-[8px] font-bold text-green-700">Connecté</span>
              </div>
              <button className="flex h-5 w-5 items-center justify-center rounded-md bg-gray-100">
                <Settings className="h-2.5 w-2.5 text-gray-500" />
              </button>
            </div>
          </div>

          {/* Stripe features */}
          <div className="flex gap-3">
            <ProviderFeature icon={Shield} label="3D Secure" />
            <ProviderFeature icon={Globe} label="Multi-devises" />
            <ProviderFeature icon={Zap} label="Pré-auth 31j" />
          </div>
        </div>

        {/* Mollie — coming soon */}
        <div className="rounded-xl border border-gray-200 bg-gray-50 p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-14 items-center justify-center rounded-lg bg-black">
                <span className="text-[10px] font-bold text-white">mollie</span>
              </div>
              <div>
                <p className="text-[10px] font-semibold text-gray-800">Mollie</p>
                <p className="text-[9px] text-gray-400">iDEAL, Bancontact, SEPA...</p>
              </div>
            </div>
            <div className="flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5">
              <Clock className="h-2.5 w-2.5 text-amber-500" />
              <span className="text-[8px] font-medium text-amber-600">Bientôt</span>
            </div>
          </div>
        </div>

        {/* Payline — coming soon */}
        <div className="rounded-xl border border-gray-200 bg-gray-50 p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-14 items-center justify-center rounded-lg bg-[#00a7e1]">
                <span className="text-[9px] font-bold text-white">payline</span>
              </div>
              <div>
                <p className="text-[10px] font-semibold text-gray-800">Payline</p>
                <p className="text-[9px] text-gray-400">Monext / CB française</p>
              </div>
            </div>
            <div className="flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5">
              <Clock className="h-2.5 w-2.5 text-amber-500" />
              <span className="text-[8px] font-medium text-amber-600">Bientôt</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom note */}
      <div className="mt-3 rounded-lg bg-blue-50 p-2 text-center">
        <p className="text-[9px] text-blue-700">
          <span className="font-semibold">0€ de commission TriggerFlow</span>, seuls les frais prestataire s&apos;appliquent
        </p>
      </div>
    </div>
  );
}

function ProviderFeature({ icon: Icon, label }: { icon: React.ComponentType<{ className?: string }>; label: string }) {
  return (
    <div className="flex items-center gap-1">
      <Icon className="h-2.5 w-2.5 text-brand-primary" />
      <span className="text-[8px] font-medium text-gray-600">{label}</span>
    </div>
  );
}
