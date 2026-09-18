import { NextRequest, NextResponse } from 'next/server';

/**
 * Réception des leads des landing pages d'acquisition (Facebook Ads).
 *
 * 1. Crée / met à jour le contact dans une liste Brevo dédiée, avec les
 *    attributs de qualification (hôtel, chambres, PMS, potentiel estimé).
 * 2. Notifie l'équipe par email transactionnel pour un rappel à chaud.
 * 3. Quand le corps porte un `magnet` (le slug d'un livre blanc), relaie la
 *    capture à l'API TriggerFlow, qui envoie le guide et lance la séquence de
 *    relance. Ce relais est un effet en plus, jamais une condition de succès.
 *
 * Calqué sur src/app/api/newsletter/route.ts (même validation, même honeypot,
 * même traitement du contact déjà existant).
 */

// `.trim()` volontaire : une clé copiée avec un retour à la ligne rend
// l'en-tête `api-key` invalide et Brevo répond 401, sans que rien ne
// distingue ce cas d'une clé réellement révoquée.
const BREVO_API_KEY = process.env.BREVO_API_KEY?.trim();
const BREVO_LEADS_LIST_ID = Number(process.env.BREVO_LEADS_LIST_ID) || 0;
const LEADS_NOTIFICATION_EMAIL = process.env.LEADS_NOTIFICATION_EMAIL;
const NOTIFICATION_SENDER = { name: 'TriggerFlow Site', email: 'noreply@trigger-flow.com' };

/**
 * Base de l'API TriggerFlow. La barre oblique finale est retirée ici plutôt
 * que d'être interdite : la variable est saisie à la main dans le tableau de
 * bord Cloudflare, et une base collée avec sa barre produirait sinon une URL
 * à double barre que le routeur Laravel ne reconnaît pas.
 */
const TRIGGERFLOW_API_URL = process.env.TRIGGERFLOW_API_URL?.trim().replace(/\/+$/, '');
// Secret partagé avec le backend, attendu dans l'en-tête X-TF-Lead-Secret.
// `.trim()` pour la même raison que la clé Brevo.
const LEAD_MAGNET_SECRET = process.env.LEAD_MAGNET_SECRET?.trim();

/**
 * Le secret ne part que sur un canal chiffré. Une base saisie en `http://` par
 * inadvertance dans le tableau de bord Cloudflare le mettrait en clair sur le
 * réseau, et rien dans la réponse ne le signalerait. Seul `http://localhost`
 * est toléré, pour travailler contre un backend local.
 */
function isTransportSafe(baseUrl: string): boolean {
  return baseUrl.startsWith('https://') || baseUrl.startsWith('http://localhost');
}

/**
 * Délai maximal du relais. Le visiteur attend cette réponse, derrière deux
 * appels Brevo eux-mêmes non bornés : trois secondes suffisent, puisque le
 * guide part par e-mail et non par affichage immédiat. L'attente n'achèterait
 * qu'un lien de téléchargement, et le lead est de toute façon déjà dans Brevo.
 */
const RELAY_TIMEOUT_MS = 3000;

/**
 * Slugs de livres blancs connus du backend. La liste est fermée parce que le
 * `magnet` vient du navigateur et finit dans un chemin d'URL : une valeur
 * libre ouvrirait la porte à un chemin fabriqué, et ferait de toute façon
 * répondre 404 au backend.
 */
const LEAD_MAGNET_SLUGS = ['post-sejour', 'ventes-additionnelles'] as const;
type LeadMagnetSlug = (typeof LEAD_MAGNET_SLUGS)[number];

const MAX_TEXT_LENGTH = 120;

interface LeadBody {
  email: string;
  firstName?: string;
  hotelName?: string;
  rooms?: number;
  phone?: string;
  pms?: string;
  /** Potentiel mensuel estimé par le simulateur, en euros. */
  estimatedRevenue?: number;
  /** Identifiant de la landing page source (ex. « fb-upsell »). */
  source?: string;
  /** Offre de conversion testée : « demo » ou « whitepaper ». */
  goal?: string;
  /** Slug du livre blanc demandé, quand la page en propose un. */
  magnet?: string;
  locale?: string;
  honeypot?: string;
}

function sanitize(value: unknown): string {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, MAX_TEXT_LENGTH);
}

/**
 * Normalise un numéro français en E.164 pour l'attribut SMS de Brevo, qui
 * refuse tout autre format et ferait alors échouer la création du contact
 * entier. Retourne null si le numéro n'est pas exploitable : mieux vaut un
 * lead sans téléphone qu'un lead perdu.
 */
function normalizePhone(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  const digits = value.replace(/[^\d+]/g, '');
  if (!digits) return null;
  if (/^\+[1-9]\d{7,14}$/.test(digits)) return digits;
  if (/^00[1-9]\d{7,14}$/.test(digits)) return `+${digits.slice(2)}`;
  if (/^0[1-9]\d{8}$/.test(digits)) return `+33${digits.slice(1)}`;
  if (/^33[1-9]\d{8}$/.test(digits)) return `+${digits}`;
  return null;
}

function sanitizeNumber(value: unknown): number | null {
  const parsed = typeof value === 'number' ? value : Number(value);
  if (!Number.isFinite(parsed) || parsed < 0) return null;
  return Math.round(parsed);
}

function readMagnetSlug(value: unknown): LeadMagnetSlug | null {
  // `sanitize` borne la longueur : la valeur vient du navigateur et finit dans
  // un journal, une chaîne d'un mégaoctet n'a pas à y entrer.
  const slug = sanitize(value);
  if ((LEAD_MAGNET_SLUGS as readonly string[]).includes(slug)) {
    return slug as LeadMagnetSlug;
  }

  // Un slug demandé mais inconnu est le scénario du troisième guide ajouté au
  // site sans étendre cette liste : les leads continueraient d'arriver dans
  // Brevo, le formulaire afficherait un succès, et aucun guide ne partirait
  // jamais. On l'apprendrait par un prospect mécontent. D'où cette trace.
  if (slug) {
    console.error('[leads] Slug de livre blanc inconnu, relais ignoré, slug:', slug);
  }
  return null;
}

// Un en-tête d'IP ne sert à rien s'il n'est pas une IP : le backend le
// refuserait ou, pire, l'enregistrerait tel quel. On vérifie la forme avant de
// transmettre. IPv4 strictement bornée, IPv6 reconnue à sa grammaire.
const IPV4_PATTERN = /^(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}$/;
// Grammaire IPv6 volontairement permissive : elle accepte l'abréviation « :: »
// et la forme mixte « ::ffff:192.0.2.1 » que produisent certains relais. La
// validation stricte reste l'affaire du backend, on filtre ici le n'importe quoi.
const IPV6_PATTERN = /^[0-9a-f]{0,4}(:[0-9a-f]{0,4}){2,7}(:\d{1,3}(\.\d{1,3}){3})?$/i;

function isIpAddress(value: string): boolean {
  return IPV4_PATTERN.test(value) || IPV6_PATTERN.test(value);
}

/**
 * IP réelle du visiteur, pour que la limitation de débit du backend porte sur
 * lui et non sur nous.
 *
 * La cible réelle est un VPS DigitalOcean derrière Apache, pas Cloudflare :
 * `.github/workflows/deploy.yml` déploie par SSH, et Apache relaie vers
 * `http://127.0.0.1:3002/` avec `ProxyAddHeaders` laissé à sa valeur par
 * défaut. Les commandes OpenNext du `package.json` existent mais ne sont pas
 * le chemin de production.
 *
 * D'où l'ordre de lecture :
 *
 * 1. `cf-connecting-ip`, qu'aucun relais ne pose aujourd'hui. Il ne coûte rien
 *    et servira tel quel si un jour un proxy Cloudflare passe devant.
 * 2. le DERNIER membre de `x-forwarded-for`, et surtout pas le premier :
 *    Apache AJOUTE l'adresse du client qu'il voit à la fin de l'en-tête reçu.
 *    Un robot qui fabrique `x-forwarded-for: 1.2.3.4` obtient donc
 *    « 1.2.3.4, son adresse réelle ». Le premier membre est ce qu'il a écrit,
 *    le dernier est ce qu'Apache a constaté : seul le dernier est digne de
 *    confiance.
 *
 * Retourne null dès qu'on ne sait pas : l'appelant DOIT alors omettre
 * l'en-tête. Le transmettre vide ferait retomber le backend sur l'IP de notre
 * serveur, et son quota par IP deviendrait un quota unique pour tout Internet,
 * dix envois par minute pour la Terre entière.
 */
function readVisitorIp(request: NextRequest): string | null {
  const direct = request.headers.get('cf-connecting-ip')?.trim();
  if (direct && isIpAddress(direct)) return direct;

  const forwarded = request.headers.get('x-forwarded-for');
  if (!forwarded) return null;

  const chain = forwarded.split(',');
  const last = chain[chain.length - 1]?.trim();
  return last && isIpAddress(last) ? last : null;
}

/**
 * Relaie la capture au backend TriggerFlow, qui envoie le guide et lance la
 * séquence de relance.
 *
 * Best-effort strict : cette fonction ne lève jamais. Un échec du relais ne
 * doit pas faire perdre le lead, déjà enregistré dans Brevo et déjà signalé à
 * l'équipe à ce stade. On journalise le slug et le code de retour, jamais
 * l'adresse : ces journaux sont consultables largement, une adresse qui y
 * entre n'en ressort plus.
 *
 * Ne retourne rien. Le `download_url` que le backend renvoie sur 201 est
 * volontairement ignoré : le guide part par e-mail, c'est la décision produit,
 * et aucun des deux formulaires n'affiche de lien immédiat. Le remonter au
 * navigateur ferait vivre du code que personne ne consomme.
 *
 * L'attente du relais est en revanche conservée. Elle n'est plus là pour ce
 * lien mais parce qu'elle est notre seule garantie que le lead a bien atteint
 * le backend : sans elle, un échec partirait sans trace.
 */
async function relayLeadMagnet(
  slug: LeadMagnetSlug,
  email: string,
  firstName: string,
  visitorIp: string | null
): Promise<void> {
  if (!TRIGGERFLOW_API_URL || !LEAD_MAGNET_SECRET) {
    const missing = [
      !TRIGGERFLOW_API_URL && 'TRIGGERFLOW_API_URL',
      !LEAD_MAGNET_SECRET && 'LEAD_MAGNET_SECRET',
    ].filter(Boolean);
    console.error('[leads] Relais lead magnet non configuré:', missing.join(', '), 'slug:', slug);
    return;
  }

  if (!isTransportSafe(TRIGGERFLOW_API_URL)) {
    console.error('[leads] Relais refusé, base non chiffrée, le secret ne part pas. Slug:', slug);
    return;
  }

  const headers: Record<string, string> = {
    'accept': 'application/json',
    'content-type': 'application/json',
    'X-TF-Lead-Secret': LEAD_MAGNET_SECRET,
  };
  if (visitorIp) {
    headers['X-TF-Visitor-Ip'] = visitorIp;
  } else {
    // Omettre l'en-tête est le bon choix, mais ce n'est pas anodin : le backend
    // retombe alors sur l'IP de notre serveur et son quota par IP devient un
    // quota unique pour tous nos visiteurs. Si cette ligne se met à sortir en
    // rafale, c'est que `cf-connecting-ip` ne nous parvient plus.
    console.error('[leads] IP visiteur illisible, en-tête omis, slug:', slug);
  }

  try {
    const response = await fetch(`${TRIGGERFLOW_API_URL}/api/public-lead-magnet/${slug}`, {
      method: 'POST',
      headers,
      // `tf_hp` est le honeypot du backend : toujours vide, le nôtre a déjà
      // filtré les bots en amont.
      body: JSON.stringify({ email, firstname: firstName, tf_hp: '' }),
      // Une redirection ne rejoue pas seulement la requête : la spécification
      // ne retire que les en-têtes d'authentification standard, un en-tête
      // maison comme le nôtre est renvoyé tel quel vers l'hôte de destination,
      // fût-il sur un autre domaine. Il suffirait d'avoir saisi le domaine
      // apex au lieu du sous-domaine applicatif pour que le secret parte
      // ailleurs sans le moindre signal. On refuse donc de suivre.
      redirect: 'error',
      signal: AbortSignal.timeout(RELAY_TIMEOUT_MS),
    });

    if (!response.ok) {
      // 409 = capture concurrente, le guide part quand même par l'autre
      // requête ; 422 = adresse refusée ; 404 = slug inconnu ; 503 = secret
      // absent côté backend. Aucun de ces cas ne justifie de réessayer ici :
      // le visiteur attend, et rien n'est perdu.
      console.error('[leads] Relais TriggerFlow en échec, slug:', slug, 'statut:', response.status);
    }
  } catch (error) {
    // Délai dépassé ou réseau injoignable. On journalise le nom de l'erreur
    // seulement : le corps de la requête, donc l'adresse, n'a pas à s'y
    // retrouver par un message d'exception trop bavard.
    const reason = error instanceof Error ? error.name : 'unknown';
    console.error('[leads] Relais TriggerFlow injoignable, slug:', slug, 'cause:', reason);
  }
}

/**
 * Notifie l'équipe. Best-effort : un échec d'envoi ne doit jamais faire perdre
 * le lead, qui est déjà enregistré dans Brevo à ce stade.
 */
async function notifyTeam(lead: Record<string, string>): Promise<void> {
  if (!BREVO_API_KEY || !LEADS_NOTIFICATION_EMAIL) return;

  const rows = Object.entries(lead)
    .map(([key, value]) => `<tr><td style="padding:4px 12px 4px 0"><strong>${key}</strong></td><td>${value}</td></tr>`)
    .join('');

  try {
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
        'api-key': BREVO_API_KEY,
      },
      body: JSON.stringify({
        sender: NOTIFICATION_SENDER,
        to: [{ email: LEADS_NOTIFICATION_EMAIL }],
        // L'offre demandée figure dans l'objet : le livre blanc est envoyé à
        // la main au démarrage, il faut pouvoir trier la boîte sans ouvrir.
        subject:
          lead.OFFRE === 'whitepaper'
            ? `Livre blanc à envoyer : ${lead.ETABLISSEMENT || lead.email}`
            : `Demande de démo : ${lead.ETABLISSEMENT || lead.email}`,
        htmlContent: `<h2>Nouveau lead landing page</h2><table>${rows}</table>`,
      }),
    });

    if (!response.ok) {
      console.error('[leads] Brevo notification error:', response.status);
    }
  } catch (error) {
    console.error('[leads] Notification failed:', error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: LeadBody = await request.json();

    // Honeypot — si rempli, on rejette silencieusement (le bot croit avoir réussi)
    if (body.honeypot) {
      return NextResponse.json({ success: true });
    }

    const email = sanitize(body.email).toLowerCase();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { success: false, error: 'invalid_email' },
        { status: 400 }
      );
    }

    const locale = body.locale === 'en' ? 'en' : 'fr';
    const attributes: Record<string, string | number> = {
      LOCALE: locale,
      SOURCE: sanitize(body.source) || 'landing-page',
    };

    const firstName = sanitize(body.firstName);
    const hotelName = sanitize(body.hotelName);
    const phone = normalizePhone(body.phone);
    const pms = sanitize(body.pms);
    const rooms = sanitizeNumber(body.rooms);
    const estimatedRevenue = sanitizeNumber(body.estimatedRevenue);
    const goal = sanitize(body.goal);
    const magnet = readMagnetSlug(body.magnet);

    if (firstName) attributes.PRENOM = firstName;
    // ETABLISSEMENT existe déjà côté Brevo, on réutilise plutôt que de créer
    // un doublon HOTEL.
    if (hotelName) attributes.ETABLISSEMENT = hotelName;
    if (phone) attributes.SMS = phone;
    if (pms) attributes.PMS = pms;
    if (rooms !== null) attributes.CHAMBRES = rooms;
    if (estimatedRevenue !== null) attributes.POTENTIEL_ESTIME = estimatedRevenue;
    if (goal) attributes.OFFRE = goal;

    // Configuration absente. En développement on laisse passer pour ne pas
    // bloquer le travail sur le formulaire ; en production on échoue bruyamment.
    //
    // Renvoyer un succès quand rien n'est enregistré est le pire comportement
    // possible pendant une campagne payante : le visiteur croit son message
    // parti, l'équipe ne voit rien arriver, et personne ne s'en aperçoit avant
    // d'avoir dépensé le budget. C'est exactement ce qui est arrivé ici.
    if (!BREVO_API_KEY || !BREVO_LEADS_LIST_ID) {
      const missing = [
        !BREVO_API_KEY && 'BREVO_API_KEY',
        !BREVO_LEADS_LIST_ID && 'BREVO_LEADS_LIST_ID',
      ].filter(Boolean);

      console.error('[leads] Configuration manquante:', missing.join(', '), '— lead NON enregistré:', {
        email,
        ...attributes,
      });

      if (process.env.NODE_ENV === 'production') {
        return NextResponse.json(
          { success: false, error: 'not_configured' },
          { status: 503 }
        );
      }

      // En développement le relais est quand même tenté : c'est la seule façon
      // de travailler la chaîne du livre blanc contre un backend local sans
      // avoir à se procurer les identifiants Brevo.
      if (magnet) {
        await relayLeadMagnet(magnet, email, firstName, readVisitorIp(request));
      }

      return NextResponse.json({ success: true });
    }

    const response = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
        'api-key': BREVO_API_KEY,
      },
      body: JSON.stringify({
        email,
        listIds: [BREVO_LEADS_LIST_ID],
        attributes,
        updateEnabled: true,
      }),
    });

    const errorData = response.ok || response.status === 204
      ? null
      : await response.json().catch(() => null);

    // Contact déjà existant — mis à jour par updateEnabled, on traite en succès
    if (errorData && errorData.code !== 'duplicate_parameter') {
      console.error('[leads] Brevo API error:', response.status, errorData);

      // Brevo est en panne, pas nous : le relais est tenté quand même, sans
      // quoi le visiteur repartirait sans guide alors que notre propre backend
      // était disponible. Le lien de téléchargement n'est pas remonté ici, la
      // réponse étant un échec du point de vue du formulaire ; le guide part
      // par e-mail, ce qui est le chemin normal.
      if (magnet) {
        await relayLeadMagnet(magnet, email, firstName, readVisitorIp(request));
      }

      // Le code d'erreur Brevo est renvoye au client : il ne contient aucune
      // donnee personnelle, seulement la nature du refus (`unauthorized`,
      // `invalid_parameter`...), et sans lui un diagnostic impose un acces aux
      // logs du serveur que l'equipe n'a pas toujours sous la main.
      return NextResponse.json(
        {
          success: false,
          error: 'api_error',
          brevoStatus: response.status,
          brevoCode: typeof errorData.code === 'string' ? errorData.code : null,
        },
        { status: 500 }
      );
    }

    await notifyTeam({ email, ...Object.fromEntries(
      Object.entries(attributes).map(([key, value]) => [key, String(value)])
    ) });

    // Relais du livre blanc, en dernier : le lead est enregistré et l'équipe
    // prévenue, donc plus rien ne peut le faire perdre. Rien n'en remonte au
    // navigateur, le guide part par e-mail ; l'attente reste néanmoins, elle
    // est notre seule garantie que le lead a bien atteint le backend.
    if (magnet) {
      await relayLeadMagnet(magnet, email, firstName, readVisitorIp(request));
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[leads] Error:', error);
    return NextResponse.json(
      { success: false, error: 'server_error' },
      { status: 500 }
    );
  }
}
