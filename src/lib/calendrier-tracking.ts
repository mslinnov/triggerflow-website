/**
 * Suivi des actions du calendrier marketing (copier, télécharger, activer). Un seul
 * point d'envoi pour tous les boutons : GA4 aujourd'hui (consentement respecté :
 * `window.gtag` n'existe qu'une fois gtag.js autorisé), et le second envoi, vers les
 * statistiques de l'app, se branchera ici.
 */

export interface CalendarEvents {
  calendar_copy: { temps_fort: string; format: 'text' | 'mjml' | 'html'; theme?: string };
  calendar_download: { temps_fort: string; format: 'mjml' | 'html'; theme: string };
  calendar_activate: { temps_fort: string; destination: 'page' | 'app'; theme?: string };
}

export function trackCalendarEvent<E extends keyof CalendarEvents>(event: E, params: CalendarEvents[E]): void {
  // Paramètres absents retirés : GA4 ne reçoit pas de `theme` vide.
  const sent = Object.fromEntries(Object.entries(params).filter(([, value]) => value));
  window.gtag?.('event', event, sent);
}
