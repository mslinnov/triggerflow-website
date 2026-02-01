'use client';

import { BrowserMockup } from './PhoneMockup';
import { FileText, Download, Clock, Mail, CheckCircle, Zap } from 'lucide-react';

export function AnalyticsReportMockup() {
  return (
    <BrowserMockup title="Analytics — Rapports" className="max-w-lg">
      <div className="p-4 min-h-[300px]">
        {/* Report Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-brand-primary/10 flex items-center justify-center">
              <FileText className="w-4 h-4 text-brand-primary" />
            </div>
            <div>
              <h3 className="text-xs font-semibold text-gray-900">Rapport hebdomadaire</h3>
              <p className="text-[10px] text-gray-500">Semaine 4</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <button className="flex items-center gap-1 px-2 py-1 text-[10px] font-medium text-gray-600 bg-gray-100 rounded-md border border-gray-200 hover:bg-gray-150">
              <Download className="w-3 h-3" />
              PDF
            </button>
            <button className="flex items-center gap-1 px-2 py-1 text-[10px] font-medium text-gray-600 bg-gray-100 rounded-md border border-gray-200 hover:bg-gray-150">
              <Download className="w-3 h-3" />
              Excel
            </button>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-4 gap-2 mb-4">
          <SummaryCard label="Envois" value="3,240" />
          <SummaryCard label="Ouvertures" value="1,458" sub="45%" />
          <SummaryCard label="Clics" value="486" sub="15%" />
          <SummaryCard label="Conversions" value="73" sub="2.3%" />
        </div>

        {/* Best Workflow Highlight */}
        <div className="bg-emerald-50 rounded-xl p-3 border border-emerald-200 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-brand-primary/20 flex items-center justify-center flex-shrink-0">
              <Zap className="w-4 h-4 text-brand-primary" />
            </div>
            <div className="flex-1">
              <p className="text-[10px] text-emerald-700 font-medium mb-0.5">Meilleur workflow</p>
              <p className="text-xs font-semibold text-gray-900">Séquence pré-séjour</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-brand-primary">62%</p>
              <p className="text-[10px] text-gray-500">d&apos;ouverture</p>
            </div>
          </div>
        </div>

        {/* Schedule & Recipients */}
        <div className="bg-gray-50 rounded-xl p-3 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-gray-400" />
              <span className="text-[10px] text-gray-600">Prochain rapport : <span className="font-medium text-gray-800">Lundi 8h00</span></span>
            </div>
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-green-100 text-green-700 rounded-full text-[10px] font-medium">
              <CheckCircle className="w-3 h-3" />
              Envoyé automatiquement
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-gray-400" />
            <div className="flex items-center gap-1 flex-wrap">
              <span className="px-1.5 py-0.5 bg-white rounded text-[10px] text-gray-600 border border-gray-200">direction@hotel.fr</span>
              <span className="px-1.5 py-0.5 bg-white rounded text-[10px] text-gray-600 border border-gray-200">revenue@hotel.fr</span>
            </div>
          </div>
        </div>
      </div>
    </BrowserMockup>
  );
}

function SummaryCard({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="bg-white rounded-lg p-2 border border-gray-200 text-center">
      <p className="text-[10px] text-gray-500 mb-0.5">{label}</p>
      <p className="text-sm font-bold text-gray-900">{value}</p>
      {sub && <p className="text-[10px] text-brand-primary font-medium">({sub})</p>}
    </div>
  );
}
