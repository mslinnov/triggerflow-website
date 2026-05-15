'use client';

import Image from 'next/image';
import { Container } from '@/components/ui';

export function ThaisV3Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--v3-border)] bg-[var(--v3-bg-primary)] py-10">
      <Container>
        <div className="flex flex-col items-center space-y-6">
          {/* Logos */}
          <div className="flex items-center gap-4">
            <Image
              src="/images/logo.webp"
              alt="TriggerFlow"
              width={120}
              height={32}
              className="h-7 w-auto"
            />
            <span className="text-xl text-[var(--v3-text-muted)]">×</span>
            <Image
              src="/images/partners/thais-logo.svg"
              alt="Thaïs PMS"
              width={100}
              height={32}
              className="h-6 w-auto"
            />
          </div>

          {/* Legal Links */}
          <nav className="flex flex-wrap items-center justify-center gap-4 text-sm text-[var(--v3-text-muted)]">
            <a
              href="/fr/mentions-legales"
              className="transition-colors hover:text-[var(--v3-text-primary)]"
            >
              Mentions légales
            </a>
            <span className="text-[var(--v3-border)]">•</span>
            <a href="/fr/cgv" className="transition-colors hover:text-[var(--v3-text-primary)]">
              CGV
            </a>
            <span className="text-[var(--v3-border)]">•</span>
            <a href="/fr/cgu" className="transition-colors hover:text-[var(--v3-text-primary)]">
              CGU
            </a>
            <span className="text-[var(--v3-border)]">•</span>
            <a
              href="/fr/politique-confidentialite"
              className="transition-colors hover:text-[var(--v3-text-primary)]"
            >
              Politique de confidentialité
            </a>
          </nav>

          {/* Copyright */}
          <p className="text-center text-sm text-[var(--v3-text-muted)]">
            © {currentYear} TriggerFlow. Tous droits réservés.
          </p>
        </div>
      </Container>
    </footer>
  );
}
