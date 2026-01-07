'use client';

import { motion } from 'framer-motion';
import { Mail, MessageSquare, MessageCircle, Search, MoreVertical, Send, Circle } from 'lucide-react';

export function MessagingHubVisual() {
  const conversations = [
    {
      name: 'Sophie Martin',
      message: 'Merci pour votre accueil...',
      channel: 'email',
      time: '10:30',
      unread: true,
      avatar: 'SM',
    },
    {
      name: 'Jean Dupont',
      message: 'Question sur le spa',
      channel: 'whatsapp',
      time: '09:15',
      unread: true,
      avatar: 'JD',
    },
    {
      name: 'Marie Laurent',
      message: 'Réservation confirmée',
      channel: 'sms',
      time: 'Hier',
      unread: false,
      avatar: 'ML',
    },
    {
      name: 'Pierre Dubois',
      message: 'Facture demandée',
      channel: 'email',
      time: 'Hier',
      unread: false,
      avatar: 'PD',
    },
  ];

  const channelIcons = {
    email: Mail,
    whatsapp: MessageCircle,
    sms: MessageSquare,
  };

  const channelColors = {
    email: 'text-blue-500',
    whatsapp: 'text-green-500',
    sms: 'text-purple-500',
  };

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
            app.trigger-flow.com/inbox
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex h-[450px]">
        {/* Left sidebar - Conversation list */}
        <div className="w-80 border-r border-gray-200 flex flex-col bg-gray-50">
          {/* Sidebar header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-base font-bold text-gray-800">Messages</h4>
              <div className="flex items-center gap-2">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="w-6 h-6 rounded-full bg-brand-primary flex items-center justify-center"
                >
                  <span className="text-white text-xs font-bold">2</span>
                </motion.div>
              </div>
            </div>

            {/* Search bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher..."
                className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:border-brand-primary"
              />
            </div>
          </div>

          {/* Conversation list */}
          <div className="flex-1 overflow-y-auto">
            {conversations.map((conv, index) => {
              const ChannelIcon = channelIcons[conv.channel as keyof typeof channelIcons];
              const channelColor = channelColors[conv.channel as keyof typeof channelColors];

              return (
                <motion.div
                  key={conv.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className={`p-4 border-b border-gray-200 cursor-pointer transition-colors ${
                    index === 0 ? 'bg-brand-primary/5 border-l-4 border-l-brand-primary' : 'hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {/* Avatar */}
                    <div className="relative">
                      <div className="w-11 h-11 rounded-full bg-gradient-to-br from-brand-primary to-brand-dark flex items-center justify-center text-white font-semibold text-sm">
                        {conv.avatar}
                      </div>
                      {/* Channel badge */}
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-md">
                        <ChannelIcon className={`w-3 h-3 ${channelColor}`} />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline justify-between mb-1">
                        <span className={`text-sm font-semibold ${conv.unread ? 'text-gray-900' : 'text-gray-600'}`}>
                          {conv.name}
                        </span>
                        <span className="text-xs text-gray-500">{conv.time}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <p
                          className={`text-xs truncate ${conv.unread ? 'text-gray-700 font-medium' : 'text-gray-500'}`}
                        >
                          {conv.message}
                        </p>
                        {conv.unread && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.4 + index * 0.1 }}
                            className="w-2 h-2 bg-brand-primary rounded-full ml-2 shrink-0"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Right panel - Active conversation */}
        <div className="flex-1 flex flex-col bg-white">
          {/* Conversation header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="p-4 border-b border-gray-200 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-primary to-brand-dark flex items-center justify-center text-white font-semibold text-sm">
                SM
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-800">Sophie Martin</h4>
                <div className="flex items-center gap-1 text-green-600">
                  <Circle className="w-2 h-2 fill-current" />
                  <span className="text-xs">En ligne</span>
                </div>
              </div>
            </div>
            <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors">
              <MoreVertical className="w-5 h-5" />
            </button>
          </motion.div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50/50 to-white">
            {/* Incoming message */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              className="flex gap-2 items-start"
            >
              <div className="max-w-xs">
                <div className="bg-gray-100 rounded-2xl rounded-tl-none px-4 py-3">
                  <p className="text-sm text-gray-800">
                    Bonjour ! Merci pour votre accueil exceptionnel lors de mon séjour la semaine dernière 😊
                  </p>
                </div>
                <span className="text-xs text-gray-500 ml-3 mt-1 block">10:30</span>
              </div>
            </motion.div>

            {/* Outgoing message */}
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 }}
              className="flex gap-2 items-start justify-end"
            >
              <div className="max-w-xs">
                <div className="bg-brand-primary rounded-2xl rounded-tr-none px-4 py-3">
                  <p className="text-sm text-white">
                    Bonjour Sophie ! C'est nous qui vous remercions pour votre visite. Au plaisir de vous revoir
                    bientôt ! 🏨
                  </p>
                </div>
                <span className="text-xs text-gray-500 mr-3 mt-1 block text-right">10:32</span>
              </div>
            </motion.div>

            {/* Typing indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 1, 0] }}
              transition={{ delay: 1.5, duration: 2, repeat: Infinity }}
              className="flex gap-2 items-center"
            >
              <div className="bg-gray-100 rounded-2xl px-4 py-3 flex gap-1">
                <Circle className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <Circle
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: '150ms' }}
                />
                <Circle
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: '300ms' }}
                />
              </div>
            </motion.div>
          </div>

          {/* Input area */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="p-4 border-t border-gray-200"
          >
            <div className="flex items-end gap-3">
              <div className="flex-1 flex items-center gap-2 bg-gray-100 rounded-xl px-4 py-3">
                <input
                  type="text"
                  placeholder="Écrire un message..."
                  className="flex-1 bg-transparent text-sm outline-none placeholder-gray-400"
                />
              </div>
              <button className="w-11 h-11 bg-brand-primary text-white rounded-xl flex items-center justify-center hover:bg-brand-dark transition-colors shadow-md">
                <Send className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
