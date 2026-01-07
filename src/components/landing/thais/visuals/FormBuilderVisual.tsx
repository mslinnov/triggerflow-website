'use client';

import { motion } from 'framer-motion';
import {
  Type,
  Mail,
  Phone,
  CheckSquare,
  ChevronDown,
  Calendar,
  GripVertical,
  Plus,
  RefreshCw,
} from 'lucide-react';

export function FormBuilderVisual() {
  const fieldTypes = [
    { icon: Type, label: 'Texte', color: 'text-gray-600' },
    { icon: Mail, label: 'Email', color: 'text-blue-600' },
    { icon: Phone, label: 'Téléphone', color: 'text-green-600' },
    { icon: CheckSquare, label: 'Case à cocher', color: 'text-purple-600' },
    { icon: ChevronDown, label: 'Liste déroulante', color: 'text-orange-600' },
    { icon: Calendar, label: 'Date', color: 'text-pink-600' },
  ];

  const formFields = [
    { label: 'Nom complet', type: 'text', required: true },
    { label: 'Adresse email', type: 'email', required: true },
    { label: 'Heure d\'arrivée estimée', type: 'select', required: false },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden max-w-3xl mx-auto"
    >
      {/* Browser Header */}
      <div className="h-10 bg-gray-100 flex items-center px-4 gap-2 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <div className="flex-1 flex justify-center">
          <div className="px-4 py-1 bg-white rounded-md text-xs text-gray-500 border border-gray-200">
            app.trigger-flow.com/forms/builder
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex h-[480px]">
        {/* Left sidebar - Field types */}
        <div className="w-56 border-r border-gray-200 bg-gray-50 p-4">
          <h4 className="text-xs font-bold text-gray-600 uppercase tracking-wide mb-4">
            Champs disponibles
          </h4>

          <div className="space-y-2">
            {fieldTypes.map((field, index) => (
              <motion.div
                key={field.label}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                whileHover={{ scale: 1.02, x: 2 }}
                className="bg-white rounded-lg p-3 border border-gray-200 cursor-grab active:cursor-grabbing hover:border-brand-primary hover:shadow-sm transition-all"
              >
                <div className="flex items-center gap-2">
                  <GripVertical className="w-3 h-3 text-gray-400" />
                  <field.icon className={`w-4 h-4 ${field.color}`} />
                  <span className="text-xs font-medium text-gray-700">{field.label}</span>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-4 w-full px-3 py-2 border-2 border-dashed border-gray-300 rounded-lg text-xs font-medium text-gray-400 hover:border-brand-primary hover:text-brand-primary transition-colors"
          >
            + Champ personnalisé
          </motion.button>
        </div>

        {/* Center - Form builder canvas */}
        <div className="flex-1 bg-gradient-to-br from-gray-50 to-white p-6 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl border-2 border-gray-200 p-6 max-w-xl mx-auto"
          >
            {/* Form title */}
            <div className="mb-6">
              <input
                type="text"
                value="Formulaire pré-séjour"
                className="text-xl font-bold text-gray-800 w-full border-b-2 border-transparent hover:border-gray-200 focus:border-brand-primary outline-none transition-colors pb-1"
                readOnly
              />
              <p className="text-xs text-gray-500 mt-1">
                Ce formulaire sera envoyé automatiquement 3 jours avant l'arrivée
              </p>
            </div>

            {/* Form fields */}
            <div className="space-y-4">
              {formFields.map((field, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.15 }}
                  whileHover={{ scale: 1.01 }}
                  className={`bg-gradient-to-br ${
                    index === 2
                      ? 'from-brand-primary/5 to-brand-primary/10 border-2 border-brand-primary border-dashed'
                      : 'from-gray-50 to-white border-2 border-gray-200'
                  } rounded-xl p-4 cursor-pointer group transition-all`}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      <GripVertical className="w-4 h-4 text-gray-400 group-hover:text-brand-primary transition-colors" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <label className="text-sm font-semibold text-gray-700">{field.label}</label>
                        {field.required && (
                          <span className="text-xs px-2 py-0.5 bg-red-100 text-red-600 rounded-full font-medium">
                            Requis
                          </span>
                        )}
                      </div>

                      {field.type === 'select' ? (
                        <div className="relative">
                          <select className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-400 appearance-none cursor-pointer">
                            <option>Sélectionner une heure...</option>
                          </select>
                          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        </div>
                      ) : (
                        <input
                          type={field.type}
                          placeholder={`Entrez votre ${field.label.toLowerCase()}...`}
                          className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none"
                        />
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Add field button */}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                whileHover={{ scale: 1.02 }}
                className="w-full border-2 border-dashed border-gray-300 rounded-xl p-4 flex items-center justify-center gap-2 text-gray-400 hover:border-brand-primary hover:text-brand-primary hover:bg-brand-primary/5 transition-all"
              >
                <Plus className="w-5 h-5" />
                <span className="text-sm font-medium">Ajouter un champ</span>
              </motion.button>
            </div>

            {/* Form footer */}
            <div className="mt-6 pt-4 border-t border-gray-200">
              <button className="w-full px-6 py-3 bg-brand-primary text-white font-medium rounded-lg hover:bg-brand-dark transition-colors shadow-md">
                Soumettre
              </button>
            </div>
          </motion.div>
        </div>

        {/* Right sidebar - Settings & Sync */}
        <div className="w-64 border-l border-gray-200 bg-gray-50 p-4">
          <h4 className="text-xs font-bold text-gray-600 uppercase tracking-wide mb-4">
            Paramètres
          </h4>

          {/* Sync status */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6, type: 'spring' }}
            className="bg-gradient-to-br from-brand-primary to-brand-dark rounded-xl p-4 text-white mb-4 shadow-lg"
          >
            <div className="flex items-start gap-3">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                className="mt-0.5"
              >
                <RefreshCw className="w-5 h-5" />
              </motion.div>
              <div>
                <p className="text-sm font-semibold mb-1">Synchronisation Thaïs</p>
                <p className="text-xs text-white/80 leading-relaxed">
                  Les réponses remontent automatiquement dans Thaïs PMS
                </p>
              </div>
            </div>
          </motion.div>

          {/* Settings list */}
          <div className="space-y-3">
            {[
              { label: 'Champs obligatoires', value: '2/3' },
              { label: 'Envoi automatique', value: 'Activé' },
              { label: 'Langue', value: 'Français' },
              { label: 'Rappels', value: '2 jours avant' },
            ].map((setting, index) => (
              <motion.div
                key={setting.label}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="bg-white rounded-lg p-3 border border-gray-200"
              >
                <p className="text-xs text-gray-500 mb-1">{setting.label}</p>
                <p className="text-sm font-semibold text-gray-800">{setting.value}</p>
              </motion.div>
            ))}
          </div>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-4 w-full px-4 py-2 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 hover:border-brand-primary transition-colors"
          >
            Configurer
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
