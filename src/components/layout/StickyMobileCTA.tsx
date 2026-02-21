'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const SCROLL_THRESHOLD = 400;

export function StickyMobileCTA() {
  const t = useTranslations('stickyMobileCta');
  const [show, setShow] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setShow(window.scrollY > SCROLL_THRESHOLD);
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="md:hidden">
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed bottom-0 left-0 right-0 z-50 border-t border-border-light bg-white shadow-[0_-4px_12px_rgba(0,0,0,0.08)]"
            style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
          >
            <div className="px-4 py-3">
              <a
                href="https://app.lemcal.com/@trigger-flow/demo"
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-primary py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-primary/90"
              >
                {t('label')}
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
