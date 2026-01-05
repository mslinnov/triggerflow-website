'use client';

import { ReactNode } from 'react';

interface PhoneMockupProps {
  children: ReactNode;
  variant?: 'light' | 'dark';
  className?: string;
}

export function PhoneMockup({ children, variant = 'light', className = '' }: PhoneMockupProps) {
  return (
    <div className={`w-[280px] ${className}`}>
      <div className="relative bg-gray-900 rounded-[3rem] p-3 shadow-2xl">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-7 bg-gray-900 rounded-b-2xl z-20" />

        {/* Dynamic Island style notch */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-full z-20" />

        {/* Screen */}
        <div className={`relative rounded-[2.2rem] h-full overflow-hidden ${variant === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
          {/* Status bar */}
          <div className={`h-12 flex items-end justify-between px-6 pb-1 ${variant === 'dark' ? 'text-white' : 'text-black'}`}>
            <span className="text-sm font-semibold">9:41</span>
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.33 4.67L18 10.33V20H6V10.33L12.33 4.67z" />
              </svg>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/>
              </svg>
              <div className="flex items-center">
                <div className="w-6 h-3 border border-current rounded-sm relative">
                  <div className="absolute inset-0.5 right-1 bg-current rounded-sm" />
                </div>
                <div className="w-0.5 h-1.5 bg-current rounded-r ml-px" />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="h-[calc(100%-3rem)]" style={{ aspectRatio: '9/17' }}>
            {children}
          </div>

          {/* Home indicator */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-gray-800 rounded-full" />
        </div>
      </div>
    </div>
  );
}

// Browser window mockup
interface BrowserMockupProps {
  children: ReactNode;
  title?: string;
  className?: string;
}

export function BrowserMockup({ children, title = 'TriggerFlow', className = '' }: BrowserMockupProps) {
  return (
    <div className={`bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden ${className}`}>
      {/* Header */}
      <div className="h-10 bg-gray-100 flex items-center px-4 gap-2 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <div className="flex-1 flex justify-center">
          <div className="px-4 py-1 bg-white rounded-md text-xs text-gray-500 border border-gray-200">
            {title}
          </div>
        </div>
        <div className="w-16" /> {/* Spacer for symmetry */}
      </div>

      {/* Content */}
      <div>
        {children}
      </div>
    </div>
  );
}
