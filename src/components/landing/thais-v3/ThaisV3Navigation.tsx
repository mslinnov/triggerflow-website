'use client';

import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';
import { Container, ButtonLink } from '@/components/ui';

const navItems = [
  { label: 'Fonctionnalités', href: '#features' },
  { label: 'Accompagnement', href: '#accompagnement' },
  { label: 'Tarifs', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
];

export function ThaisV3Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const searchParams = useSearchParams();

  const calendlyUrl = useMemo(() => {
    const baseUrl = 'https://app.lemcal.com/@trigger-flow/tf-thais';
    const utmParams = new URLSearchParams();
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'].forEach((param) => {
      const value = searchParams.get(param);
      if (value) utmParams.append(param, value);
    });
    return utmParams.toString() ? `${baseUrl}?${utmParams.toString()}` : baseUrl;
  }, [searchParams]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[var(--v3-bg-primary)]/95 shadow-[var(--v3-shadow-md)] backdrop-blur-md'
            : 'bg-transparent'
        }`}
      >
        <Container>
          <nav className="flex h-20 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <Image
                src="/images/logo.webp"
                alt="TriggerFlow"
                width={140}
                height={40}
                className="h-8 w-auto"
                priority
              />
              <span className="text-[var(--v3-text-muted)]">×</span>
              <Image
                src="/images/partners/thais-logo.svg"
                alt="Thaïs PMS"
                width={80}
                height={28}
                className="h-5 w-auto"
              />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden items-center gap-8 lg:flex">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className="text-sm font-medium text-[var(--v3-text-secondary)] transition-colors hover:text-[var(--v3-text-primary)]"
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* CTA */}
            <div className="hidden lg:block">
              <ButtonLink
                href={calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-full bg-[var(--v3-accent-green)] px-6 py-2.5 text-sm font-semibold text-white shadow-lg transition-all hover:shadow-xl"
              >
                Réserver une démo
                <ArrowRight className="ml-2 inline-block h-4 w-4 transition-transform group-hover:translate-x-1" />
              </ButtonLink>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="rounded-lg p-2 text-[var(--v3-text-primary)] hover:bg-[var(--v3-bg-secondary)] lg:hidden"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </nav>
        </Container>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-20 z-40 bg-[var(--v3-bg-primary)] shadow-lg lg:hidden"
          >
            <Container className="py-6">
              <div className="flex flex-col gap-4">
                {navItems.map((item) => (
                  <button
                    key={item.href}
                    onClick={() => scrollToSection(item.href)}
                    className="text-left text-lg font-medium text-[var(--v3-text-primary)] transition-colors hover:text-[var(--v3-accent-green)]"
                  >
                    {item.label}
                  </button>
                ))}
                <ButtonLink
                  href={calendlyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 w-full justify-center rounded-full bg-[var(--v3-accent-green)] px-6 py-3 text-center font-semibold text-white"
                >
                  Réserver une démo
                </ButtonLink>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-[var(--v3-border)] bg-[var(--v3-bg-primary)]/95 p-4 backdrop-blur-sm lg:hidden">
        <ButtonLink
          href={calendlyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center gap-2 rounded-full bg-[var(--v3-accent-green)] py-3.5 font-semibold text-white"
        >
          Réserver une démo gratuite
          <ArrowRight className="h-4 w-4" />
        </ButtonLink>
      </div>
    </>
  );
}
