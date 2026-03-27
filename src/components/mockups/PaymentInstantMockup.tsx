'use client';

import { Send, MousePointerClick, CheckCircle2, ArrowRight, Mail, CreditCard, Banknote } from 'lucide-react';

export function PaymentInstantMockup() {
  return (
    <div className="h-full w-full bg-white p-4">
      <h4 className="mb-3 text-xs font-semibold text-gray-800">Flux de paiement immédiat</h4>

      {/* Flow steps */}
      <div className="relative mb-4 space-y-2">
        {/* Connecting line */}
        <div className="absolute left-[15px] top-6 bottom-6 w-px bg-gray-200" />

        <FlowStep
          icon={Send}
          label="Lien envoyé"
          detail="Email automatique - 14:02"
          status="done"
        />
        <FlowStep
          icon={MousePointerClick}
          label="Client clique"
          detail="Ouvert à 14:08 - 6 min après"
          status="done"
        />
        <FlowStep
          icon={CreditCard}
          label="Paiement effectué"
          detail="CB Visa •••• 4242 - 14:09"
          status="done"
        />
        <FlowStep
          icon={Banknote}
          label="Fonds reçus"
          detail="150,00 € sur votre compte Stripe"
          status="done"
        />
        <FlowStep
          icon={Mail}
          label="Confirmation envoyée"
          detail="Reçu automatique au client"
          status="done"
        />
      </div>

      {/* Result card */}
      <div className="rounded-xl border border-green-200 bg-green-50 p-3">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-green-600" />
          <div>
            <p className="text-[10px] font-semibold text-green-800">Acompte encaissé - 150,00 €</p>
            <p className="text-[9px] text-green-600">Sophie Durand &middot; Réservation #4521</p>
          </div>
        </div>
        <div className="mt-2 flex gap-4">
          <MiniStat label="Temps total" value="7 min" />
          <MiniStat label="Actions manuelles" value="0" />
          <MiniStat label="Relances" value="0" />
        </div>
      </div>
    </div>
  );
}

function FlowStep({ icon: Icon, label, detail, status }: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  detail: string;
  status: 'done' | 'active' | 'pending';
}) {
  return (
    <div className="relative flex items-start gap-2.5 pl-0">
      <div className={`z-10 flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full ${
        status === 'done' ? 'bg-green-100' : status === 'active' ? 'bg-brand-primary/10' : 'bg-gray-100'
      }`}>
        <Icon className={`h-3.5 w-3.5 ${
          status === 'done' ? 'text-green-600' : status === 'active' ? 'text-brand-primary' : 'text-gray-400'
        }`} />
      </div>
      <div className="pt-1">
        <p className="text-[10px] font-semibold text-gray-800">{label}</p>
        <p className="text-[9px] text-gray-500">{detail}</p>
      </div>
      {status === 'done' && (
        <CheckCircle2 className="ml-auto mt-1.5 h-3 w-3 shrink-0 text-green-500" />
      )}
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[8px] text-green-600">{label}</p>
      <p className="text-[10px] font-bold text-green-800">{value}</p>
    </div>
  );
}
