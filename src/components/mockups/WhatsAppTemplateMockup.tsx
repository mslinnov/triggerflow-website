'use client';

import { Check, MessageCircle } from 'lucide-react';

export function WhatsAppTemplateMockup() {
  return (
    <div className="h-full w-full p-5 bg-white">
        {/* Template list */}
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-xs font-semibold text-gray-800">Templates approuvés</h4>
          <span className="text-[10px] bg-green-50 text-green-700 px-2 py-0.5 rounded-full border border-green-200">Meta ✓</span>
        </div>

        <div className="space-y-2.5">
          <TemplateCard
            name="Confirmation réservation"
            status="approved"
            lang="FR · EN · ES"
            preview="Bonjour {{prenom}} ! Votre réservation du {{date}} est confirmée. 🏨"
          />
          <TemplateCard
            name="Rappel check-in"
            status="approved"
            lang="FR · EN"
            preview="{{prenom}}, nous vous attendons demain ! Check-in dès {{heure}}. 📍"
          />
          <TemplateCard
            name="Offre spa"
            status="pending"
            lang="FR"
            preview="Envie de détente ? Notre spa vous propose -20% aujourd'hui. 💆"
          />
        </div>

        {/* Variable mapping */}
        <div className="mt-4 pt-3 border-t border-gray-100">
          <p className="text-[10px] text-gray-500 mb-2">Variables mappées depuis votre PMS</p>
          <div className="flex flex-wrap gap-1.5">
            {['prenom', 'date', 'heure', 'chambre', 'hotel'].map((v) => (
              <span key={v} className="text-[9px] bg-brand-primary/10 text-brand-primary px-2 py-0.5 rounded-full font-mono">
                {`{{${v}}}`}
              </span>
            ))}
          </div>
        </div>
    </div>
  );
}

function TemplateCard({ name, status, lang, preview }: { name: string; status: 'approved' | 'pending'; lang: string; preview: string }) {
  return (
    <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 hover:border-brand-primary/20 transition-colors">
      <div className="flex items-start justify-between mb-1.5">
        <div className="flex items-center gap-2">
          <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
          <span className="text-xs font-medium text-gray-800">{name}</span>
        </div>
        <span className={`text-[8px] px-1.5 py-0.5 rounded flex items-center gap-0.5 ${status === 'approved' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
          {status === 'approved' && <Check className="w-2.5 h-2.5" />}
          {status === 'approved' ? 'Approuvé' : 'En attente'}
        </span>
      </div>
      <p className="text-[10px] text-gray-600 mb-1.5">{preview}</p>
      <span className="text-[8px] text-gray-400">{lang}</span>
    </div>
  );
}
