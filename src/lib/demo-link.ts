/**
 * Reconnaît un lien de demande de démo, pour l'événement GA4 `book_demo_click`.
 *
 * Deux destinations comptent : le calendrier lemcal (lien direct) et la page
 * `/demo` du site, où mènent la plupart des boutons depuis la refonte et qui
 * intègre le calendrier. Sans la seconde, la refonte ferait chuter le compteur
 * de démos alors que l'intérêt ne change pas.
 *
 * Le vrai rendez-vous réservé est compté à part, sur `/merci-rdv` (`demo_booked`).
 */
export type DemoLinkTarget = 'lemcal' | 'demo_page';

const DEMO_PATH = /^(?:\/(?:fr|en))?\/demo\/?$/;

export function classifyDemoLink(href: string, siteOrigin: string): DemoLinkTarget | null {
  let url: URL;
  try {
    url = new URL(href, siteOrigin);
  } catch {
    return null;
  }
  if (url.hostname === 'lemcal.com' || url.hostname.endsWith('.lemcal.com')) return 'lemcal';
  if (url.origin === new URL(siteOrigin).origin && DEMO_PATH.test(url.pathname)) return 'demo_page';
  return null;
}
