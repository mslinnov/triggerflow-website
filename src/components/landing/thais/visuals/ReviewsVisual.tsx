'use client';

import { motion } from 'framer-motion';
import { Star, TrendingUp, AlertCircle, CheckCircle, MessageSquare } from 'lucide-react';

export function ReviewsVisual() {
  const sources = [
    { name: 'Google', rating: 4.8, count: 234, color: 'bg-blue-500', trend: '+12' },
    { name: 'Booking.com', rating: 4.6, count: 412, color: 'bg-blue-600', trend: '+8' },
    { name: 'TripAdvisor', rating: 4.7, count: 189, color: 'bg-green-600', trend: '+15' },
  ];

  const recentReviews = [
    {
      name: 'Marie D.',
      rating: 5,
      comment: 'Excellent séjour, accueil chaleureux et chambre impeccable !',
      source: 'Google',
      time: 'il y a 2h',
      sentiment: 'positive',
    },
    {
      name: 'Jean P.',
      rating: 4,
      comment: 'Très bon hôtel, petite remarque sur le petit-déjeuner',
      source: 'Booking',
      time: 'il y a 5h',
      sentiment: 'neutral',
    },
    {
      name: 'Sophie M.',
      rating: 3,
      comment: 'Chambre correcte mais bruit de la rue',
      source: 'TripAdvisor',
      time: 'il y a 1j',
      sentiment: 'negative',
    },
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
            app.trigger-flow.com/reviews
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 bg-gradient-to-br from-yellow-50/30 to-white">
        {/* Header with overall stats */}
        <div className="flex items-start gap-6 mb-6">
          {/* Overall rating card */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="bg-gradient-to-br from-brand-primary to-brand-dark rounded-2xl p-6 text-white shadow-xl"
          >
            <div className="text-center">
              <p className="text-5xl font-bold mb-2">4.7</p>
              <div className="flex gap-0.5 justify-center mb-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i <= 4 ? 'fill-yellow-400 text-yellow-400' : 'text-white/30'}`}
                  />
                ))}
              </div>
              <p className="text-sm text-white/80">835 avis au total</p>
              <div className="mt-3 flex items-center justify-center gap-1 text-green-300">
                <TrendingUp className="w-4 h-4" />
                <span className="text-xs font-semibold">+12% ce mois</span>
              </div>
            </div>
          </motion.div>

          {/* Sources breakdown */}
          <div className="flex-1 space-y-3">
            {sources.map((source, index) => (
              <motion.div
                key={source.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg ${source.color} flex items-center justify-center`}>
                      <span className="text-white text-xs font-bold">{source.name[0]}</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{source.name}</p>
                      <p className="text-xs text-gray-500">{source.count} avis</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 mb-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-bold text-gray-800">{source.rating}</span>
                    </div>
                    <span className="text-xs text-green-600 font-medium">{source.trend}%</span>
                  </div>
                </div>

                {/* Mini progress bar */}
                <div className="mt-3 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full ${source.color} rounded-full`}
                    initial={{ width: 0 }}
                    animate={{ width: `${(source.rating / 5) * 100}%` }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mb-6" />

        {/* Recent reviews */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-bold text-gray-800 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-brand-primary" />
              Derniers avis reçus
            </h4>
            <button className="text-xs text-brand-primary font-medium hover:text-brand-dark transition-colors">
              Voir tous
            </button>
          </div>

          <div className="space-y-3">
            {recentReviews.map((review, index) => {
              const sentimentConfig = {
                positive: { icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50' },
                neutral: { icon: AlertCircle, color: 'text-blue-600', bg: 'bg-blue-50' },
                negative: { icon: AlertCircle, color: 'text-orange-600', bg: 'bg-orange-50' },
              };

              const config = sentimentConfig[review.sentiment as keyof typeof sentimentConfig];
              const SentimentIcon = config.icon;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className={`${config.bg} rounded-xl p-4 border border-gray-200`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center text-white text-xs font-semibold">
                        {review.name.split(' ')[0][0]}
                        {review.name.split(' ')[1][0]}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-800">{review.name}</p>
                        <div className="flex items-center gap-2">
                          <div className="flex gap-0.5">
                            {[1, 2, 3, 4, 5].map((i) => (
                              <Star
                                key={i}
                                className={`w-3 h-3 ${
                                  i <= review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-gray-500">• {review.time}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-gray-500">{review.source}</span>
                      <SentimentIcon className={`w-4 h-4 ${config.color}`} />
                    </div>
                  </div>
                  <p className="text-sm text-gray-700">{review.comment}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Footer action */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="mt-6 pt-4 border-t border-gray-200 flex items-center justify-between"
        >
          <p className="text-xs text-gray-500">🔔 Recevez une alerte pour chaque nouvel avis</p>
          <button className="px-4 py-2 bg-brand-primary text-white text-sm font-medium rounded-lg hover:bg-brand-dark transition-colors shadow-md">
            Demander plus d'avis
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}
