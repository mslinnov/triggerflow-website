'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { CLIENTS_OTA_MISTAKES } from '@/data/clients-ota';
import { UpsellSection } from '../upsell/primitives';

/**
 * L'erreur la plus coûteuse, en bande sombre, avant les sept règles : comme sur
 * la landing post-séjour, le visiteur veut d'abord savoir ce qui cloche.
 *
 * Une seule erreur retenue (décision de Mounir du 1er novembre 2026) : les
 * autres erreurs mesurées par l'étude sont déjà corrigées par défaut dans
 * TriggerFlow. La liste reste un tableau pour garder la mise en page des
 * landings jumelles. Le chiffre est écrit dans les traductions.
 */
export function ClientsOtaGap() {
  const t = useTranslations('lpClientsOta.gap');

  return (
    <UpsellSection className="bg-[var(--up-ink)] text-[var(--up-bg)]">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20 lg:px-8">
        <div>
          <h2 className="text-3xl font-bold leading-tight tracking-tight md:text-4xl">{t('title')}</h2>
          <p className="mt-5 max-w-[40ch] text-lg leading-relaxed opacity-75">{t('subtitle')}</p>
        </div>

        <ul className="divide-y divide-white/15">
          {CLIENTS_OTA_MISTAKES.map((mistake, index) => (
            <motion.li
              key={mistake}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="grid gap-x-7 gap-y-3 py-7 first:pt-0 last:pb-0 sm:grid-cols-[9rem_1fr]"
            >
              <p className="font-[family-name:var(--font-geist-mono)] text-[15px] font-semibold leading-snug text-[var(--up-highlight)] sm:pt-1.5">
                {t(`${mistake}.figure`)}
              </p>
              <div>
                <h3 className="text-xl leading-snug md:text-[1.35rem]">{t(`${mistake}.statement`)}</h3>
                <p className="mt-2.5 max-w-[52ch] text-[15px] leading-relaxed opacity-65">
                  {t(`${mistake}.consequence`)}
                </p>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </UpsellSection>
  );
}
