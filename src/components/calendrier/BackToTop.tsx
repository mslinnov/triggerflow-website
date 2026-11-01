'use client';

import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

/** Petit bouton « Haut de page » sur mobile, après un long défilement (sous le bandeau cookies). */
export function BackToTop({ label }: { label: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 1200);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      aria-label={label}
      onClick={() => {
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
      }}
      className="fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] right-4 z-30 inline-flex h-11 w-11 items-center justify-center rounded-full bg-brand-dark text-white shadow-lg transition-colors hover:bg-brand-dark/90 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 lg:hidden"
    >
      <ArrowUp className="h-5 w-5" aria-hidden="true" />
    </button>
  );
}
