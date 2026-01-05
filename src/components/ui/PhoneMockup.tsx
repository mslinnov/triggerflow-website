'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface PhoneMockupProps {
  children: ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function PhoneMockup({ children, className = '', size = 'md' }: PhoneMockupProps) {
  const sizeClasses = {
    sm: 'max-w-[160px]',
    md: 'max-w-[200px]',
    lg: 'max-w-[280px]',
  };

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <div className="relative rounded-[2.5rem] border-[8px] border-gray-800 bg-gray-800 shadow-xl">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-6 bg-gray-800 rounded-b-xl z-10" />

        {/* Screen */}
        <div className="relative bg-white rounded-[2rem] overflow-hidden aspect-[9/19]">
          {/* Status bar */}
          <div className="absolute top-0 inset-x-0 h-8 bg-white flex items-center justify-between px-6 pt-2 text-[10px] text-gray-800 z-10">
            <span className="font-medium">9:41</span>
            <div className="flex items-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.33 4.67L18 10.33V20H6V10.33L12.33 4.67z" />
              </svg>
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M2 17h20v2H2v-2zm0-5h20v2H2v-2zm0-5h20v2H2V7z" />
              </svg>
              <div className="w-5 h-2 bg-gray-800 rounded-sm" />
            </div>
          </div>

          {/* Content */}
          <div className="pt-8 h-full">
            {children}
          </div>
        </div>

        {/* Home indicator */}
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-gray-400 rounded-full" />
      </div>
    </div>
  );
}

// Pre-built content types for phone mockups

interface EmailPreviewProps {
  subject: string;
  preview: string;
  from?: string;
}

export function EmailPreview({ subject, preview, from = 'TriggerFlow' }: EmailPreviewProps) {
  return (
    <div className="h-full bg-gray-50 p-3">
      <div className="bg-white rounded-xl p-3 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-full bg-brand-primary flex items-center justify-center">
            <span className="text-white text-xs font-bold">TF</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-semibold text-gray-800 truncate">{from}</p>
            <p className="text-[8px] text-gray-500">maintenant</p>
          </div>
        </div>
        <p className="text-[10px] font-semibold text-gray-800 mb-1 line-clamp-2">{subject}</p>
        <p className="text-[8px] text-gray-500 line-clamp-2">{preview}</p>
      </div>
    </div>
  );
}

interface SMSBubbleProps {
  message: string;
  sender?: string;
}

export function SMSBubble({ message, sender = 'Hotel Bellevue' }: SMSBubbleProps) {
  return (
    <div className="h-full bg-gray-100 p-3">
      <div className="text-center mb-3">
        <div className="w-10 h-10 rounded-full bg-brand-primary mx-auto flex items-center justify-center mb-1">
          <span className="text-white text-sm font-bold">HB</span>
        </div>
        <p className="text-[10px] font-medium text-gray-800">{sender}</p>
      </div>
      <div className="bg-gray-200 rounded-2xl rounded-tl-sm p-2.5 max-w-[90%]">
        <p className="text-[9px] text-gray-800 leading-relaxed">{message}</p>
      </div>
      <p className="text-[7px] text-gray-400 mt-1 ml-1">10:32</p>
    </div>
  );
}

interface GoogleReviewProps {
  rating?: number;
  hotelName?: string;
}

export function GoogleReview({ rating = 5, hotelName = 'Hotel Bellevue' }: GoogleReviewProps) {
  return (
    <div className="h-full bg-white p-3">
      <div className="text-center mb-3">
        <svg className="w-8 h-8 mx-auto mb-1" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
        <p className="text-[10px] font-medium text-gray-800">Évaluez votre séjour</p>
        <p className="text-[8px] text-gray-500">{hotelName}</p>
      </div>
      <div className="flex justify-center gap-1 mb-3">
        {[1, 2, 3, 4, 5].map((star) => (
          <motion.svg
            key={star}
            className={`w-6 h-6 ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
            fill="currentColor"
            viewBox="0 0 24 24"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: star * 0.1, type: 'spring' }}
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </motion.svg>
        ))}
      </div>
      <div className="bg-gray-100 rounded-lg p-2">
        <p className="text-[8px] text-gray-400">Partagez votre expérience...</p>
      </div>
    </div>
  );
}
