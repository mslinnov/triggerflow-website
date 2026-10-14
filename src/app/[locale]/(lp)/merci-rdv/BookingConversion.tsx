'use client';

import { useEffect } from 'react';
import { trackAdsConversion } from '@/lib/ads';

const DEJA_COMPTE = 'tf_booking_counted';

/**
 * Compte la réservation : conversion Google Ads « rendez-vous réservé » et
 * événement GA4 `demo_booked`. Une seule fois par onglet, pour qu'un
 * rechargement de la page ne compte pas deux rendez-vous.
 */
export function BookingConversion() {
  useEffect(() => {
    try {
      if (window.sessionStorage.getItem(DEJA_COMPTE)) return;
    } catch {
      // Stockage indisponible : on compte quand même, une seule fois par chargement.
    }
    const source = new URLSearchParams(window.location.search).get('source')?.slice(0, 60) || 'inconnue';
    // gtag.js se charge en `afterInteractive` : on lui laisse le temps d'arriver.
    // Le marqueur est posé au moment de l'envoi, pas avant : un effet annulé
    // (démontage, double appel de React en développement) ne compte rien.
    const timer = window.setTimeout(() => {
      try {
        window.sessionStorage.setItem(DEJA_COMPTE, '1');
      } catch {
        // Voir plus haut.
      }
      trackAdsConversion('demo_booked');
      window.gtag?.('event', 'demo_booked', { booking_source: source });
      window.fbq?.('track', 'Schedule', { content_name: source });
    }, 1500);
    return () => window.clearTimeout(timer);
  }, []);

  return null;
}
