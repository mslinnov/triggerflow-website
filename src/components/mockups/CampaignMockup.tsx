'use client';

import { BrowserMockup } from './PhoneMockup';
import {
  Mail,
  Users,
  Calendar,
  Send,
  Eye,
  BarChart3,
  Clock,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

export function CampaignMockup() {
  return (
    <BrowserMockup title="Campagne Marketing" className="max-w-lg">
      <div className="p-4">
        {/* Campaign header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
              <Mail className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-800">Offre Spa -20%</h4>
              <p className="text-xs text-gray-500">Brouillon • Créé il y a 2h</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 text-gray-600 text-xs font-medium rounded-lg hover:bg-gray-50">
              <Eye className="w-3.5 h-3.5" />
              Aperçu
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-brand-primary text-white text-xs font-medium rounded-lg">
              <Send className="w-3.5 h-3.5" />
              Envoyer
            </button>
          </div>
        </div>

        {/* Stats preview */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <StatCard
            icon={Users}
            value="1 247"
            label="Destinataires"
            color="text-blue-600"
            bgColor="bg-blue-50"
          />
          <StatCard
            icon={CheckCircle2}
            value="42%"
            label="Ouverture estimée"
            color="text-green-600"
            bgColor="bg-green-50"
          />
          <StatCard
            icon={BarChart3}
            value="2 400 €"
            label="Revenu estimé"
            color="text-purple-600"
            bgColor="bg-purple-50"
          />
        </div>

        {/* Campaign details */}
        <div className="bg-gray-50 rounded-xl p-3 mb-4 space-y-3">
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-500 w-16">Objet:</span>
            <span className="text-sm text-gray-800 flex-1">
              Votre offre exclusive : -20% sur nos soins spa 💆
            </span>
          </div>
          <div className="h-px bg-gray-200" />
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-500 w-16">Segment:</span>
            <div className="flex gap-1.5">
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                Clients fidèles
              </span>
              <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                Panier &gt; 200€
              </span>
            </div>
          </div>
          <div className="h-px bg-gray-200" />
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-500 w-16">Envoi:</span>
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span>Programmé : Vendredi 10h00</span>
            </div>
          </div>
        </div>

        {/* Email preview thumbnail */}
        <div className="border border-gray-200 rounded-xl overflow-hidden">
          <div className="bg-gray-100 px-3 py-2 flex items-center justify-between border-b border-gray-200">
            <span className="text-xs text-gray-500">Aperçu du template</span>
            <div className="flex items-center gap-1 text-xs text-brand-primary">
              <Sparkles className="w-3 h-3" />
              <span>Modifier</span>
            </div>
          </div>
          <div className="p-3 bg-white">
            {/* Mini email preview */}
            <div className="border border-gray-100 rounded-lg p-3 space-y-2">
              <div className="w-16 h-16 bg-brand-primary/10 rounded-lg mx-auto flex items-center justify-center">
                <span className="text-2xl">💆</span>
              </div>
              <div className="text-center">
                <p className="text-xs font-semibold text-gray-800">Offre exclusive Spa</p>
                <p className="text-[10px] text-gray-500 mt-1">
                  Profitez de -20% sur tous nos soins
                </p>
              </div>
              <div className="h-6 bg-brand-primary rounded text-white text-[10px] flex items-center justify-center">
                Réserver maintenant
              </div>
            </div>
          </div>
        </div>

        {/* Schedule options */}
        <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Clock className="w-3.5 h-3.5" />
            <span>Meilleur moment suggéré : Vendredi 10h</span>
          </div>
          <button className="text-xs text-brand-primary hover:underline">Modifier</button>
        </div>
      </div>
    </BrowserMockup>
  );
}

function StatCard({
  icon: Icon,
  value,
  label,
  color,
  bgColor,
}: {
  icon: React.ComponentType<{ className?: string }>;
  value: string;
  label: string;
  color: string;
  bgColor: string;
}) {
  return (
    <div className={`${bgColor} rounded-xl p-3 text-center`}>
      <Icon className={`w-4 h-4 ${color} mx-auto mb-1`} />
      <p className="text-sm font-bold text-gray-800">{value}</p>
      <p className="text-[10px] text-gray-500">{label}</p>
    </div>
  );
}
