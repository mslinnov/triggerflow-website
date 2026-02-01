'use client';

import { BrowserMockup } from './PhoneMockup';
import {
  Type,
  Mail,
  Phone,
  CalendarDays,
  ListChecks,
  PenTool,
  GripVertical,
  Pencil,
  Clock,
  Circle,
  Square,
} from 'lucide-react';

export function FormBuilderMockup() {
  return (
    <BrowserMockup title="Formulaires" className="max-w-lg">
      <div className="flex min-h-[300px]">
        {/* Left sidebar - field types */}
        <div className="w-16 bg-gray-50 border-r border-gray-200 p-2 flex flex-col gap-1.5">
          <p className="text-[8px] font-semibold text-gray-400 uppercase text-center mb-1">Champs</p>
          <FieldType icon={Type} label="Texte" active />
          <FieldType icon={Mail} label="Email" />
          <FieldType icon={Phone} label="Téléphone" />
          <FieldType icon={CalendarDays} label="Date" />
          <FieldType icon={ListChecks} label="Choix mult." />
          <FieldType icon={PenTool} label="Signature" />
        </div>

        {/* Center preview area */}
        <div className="flex-1 p-3 bg-gray-100">
          {/* Top bar */}
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-semibold text-gray-800">Formulaire de pré-check-in</p>
            <span className="text-[9px] font-medium bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded">FR</span>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 divide-y divide-gray-100">
            {/* Field: Nom complet */}
            <FormField label="Nom complet" type="Texte">
              <div className="h-6 bg-gray-50 rounded border border-gray-200 px-2 flex items-center">
                <span className="text-[10px] text-gray-400">Jean Dupont</span>
              </div>
            </FormField>

            {/* Field: Heure d'arrivée */}
            <FormField label="Heure d'arrivée estimée" type="Heure" selected>
              <div className="flex items-center gap-1.5">
                <div className="h-6 w-20 bg-gray-50 rounded border border-blue-300 px-2 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-gray-400" />
                  <span className="text-[10px] text-gray-600">15:00</span>
                </div>
              </div>
            </FormField>

            {/* Field: Préférences oreiller */}
            <FormField label="Préférences oreiller" type="Choix">
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-1">
                  <Circle className="w-3 h-3 text-brand-primary fill-brand-primary" />
                  <span className="text-[10px] text-gray-700">Ferme</span>
                </label>
                <label className="flex items-center gap-1">
                  <Circle className="w-3 h-3 text-gray-300" />
                  <span className="text-[10px] text-gray-700">Moelleux</span>
                </label>
              </div>
            </FormField>

            {/* Field: Demandes spéciales */}
            <FormField label="Demandes spéciales" type="Texte">
              <div className="h-10 bg-gray-50 rounded border border-gray-200 px-2 pt-1">
                <span className="text-[10px] text-gray-400">Arrivée tardive, chambre calme...</span>
              </div>
            </FormField>

            {/* Field: Allergies alimentaires */}
            <FormField label="Allergies alimentaires" type="Cases">
              <div className="flex flex-wrap gap-x-3 gap-y-1">
                <label className="flex items-center gap-1">
                  <Square className="w-3 h-3 text-brand-primary fill-brand-primary/20" />
                  <span className="text-[10px] text-gray-700">Gluten</span>
                </label>
                <label className="flex items-center gap-1">
                  <Square className="w-3 h-3 text-gray-300" />
                  <span className="text-[10px] text-gray-700">Lactose</span>
                </label>
                <label className="flex items-center gap-1">
                  <Square className="w-3 h-3 text-brand-primary fill-brand-primary/20" />
                  <span className="text-[10px] text-gray-700">Fruits à coque</span>
                </label>
                <label className="flex items-center gap-1">
                  <Square className="w-3 h-3 text-gray-300" />
                  <span className="text-[10px] text-gray-700">Autre</span>
                </label>
              </div>
            </FormField>
          </div>
        </div>
      </div>
    </BrowserMockup>
  );
}

function FieldType({
  icon: Icon,
  label,
  active,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  active?: boolean;
}) {
  return (
    <div
      className={`flex flex-col items-center gap-0.5 p-1.5 rounded-lg cursor-grab text-center ${
        active ? 'bg-blue-100 text-blue-600' : 'text-gray-500 hover:bg-gray-100'
      }`}
    >
      <Icon className="w-4 h-4" />
      <span className="text-[8px] leading-tight">{label}</span>
    </div>
  );
}

function FormField({
  label,
  type,
  selected,
  children,
}: {
  label: string;
  type: string;
  selected?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`px-3 py-2 relative group ${
        selected ? 'ring-2 ring-blue-500 bg-blue-50/20 rounded' : ''
      }`}
    >
      {selected && (
        <div className="absolute -top-2 left-3 bg-blue-500 text-white text-[8px] px-1.5 py-0.5 rounded font-medium">
          {type}
        </div>
      )}
      <div className="flex items-start gap-1.5">
        <GripVertical className="w-3 h-3 text-gray-300 mt-0.5 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-medium text-gray-700">{label}</span>
            <Pencil className="w-3 h-3 text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
