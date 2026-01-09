'use client';

import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowRight, Mail, Check } from 'lucide-react';
import Image from 'next/image';
import { Container, ButtonLink } from '@/components/ui';

export function ThaisCTA() {
  const searchParams = useSearchParams();

  // Build Calendly URL with UTM parameters
  const calendlyUrl = useMemo(() => {
    const baseUrl = 'https://app.lemcal.com/@trigger-flow/tf-thais';
    const utmParams = new URLSearchParams();

    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'].forEach((param) => {
      const value = searchParams.get(param);
      if (value) utmParams.append(param, value);
    });

    return utmParams.toString() ? `${baseUrl}?${utmParams.toString()}` : baseUrl;
  }, [searchParams]);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[var(--thais-primary)] via-[#0a2590] to-brand-primary/90 py-20 md:py-28">
      {/* Decorative elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-[var(--thais-cyan)]/20 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-brand-primary/20 blur-3xl" />
      </div>

      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
            Prêt à transformer votre relation client ?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
            Rejoignez les 200+ hôtels qui utilisent TriggerFlow pour gagner du temps et améliorer
            la satisfaction client
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <ButtonLink
              href={calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
              size="lg"
              className="group gap-2 bg-white text-brand-dark shadow-lg hover:bg-zinc-100"
            >
              Réserver une démo gratuite
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </ButtonLink>

            <ButtonLink
              href="mailto:contact@trigger-flow.com"
              variant="ghost"
              size="lg"
              className="border-2 border-white/30 text-white hover:border-white/50 hover:bg-white/10"
            >
              <Mail className="h-4 w-4" />
              Nous contacter
            </ButtonLink>
          </div>

          {/* Co-branding footer */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-10 flex flex-col items-center gap-4"
          >
            <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm">
              <span className="text-sm text-white/80">En partenariat avec</span>
              <Image
                src="/images/partners/thais-logo.svg"
                alt="Thaïs PMS"
                width={70}
                height={24}
                className="h-5 w-auto brightness-0 invert"
              />
            </div>
            <div className="flex items-center gap-4 text-sm text-white/60">
              <span className="flex items-center gap-1">
                <Check className="h-3.5 w-3.5 text-[var(--thais-cyan)]" />
                Intégration native
              </span>
              <span className="flex items-center gap-1">
                <Check className="h-3.5 w-3.5 text-[var(--thais-cyan)]" />
                Support francophone
              </span>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
