import type { SolutionData } from './solutions';
import { brand } from './brand';

export interface SolutionTextEn {
  title: string;
  headline: string;
  description: string;
  challenges: { title: string; description: string }[];
  painPoints?: string[];
  benefits?: string[];
  statLabels: string[];
  features: { highlight: string; whyForPersona?: string; bullets?: string[] }[];
  useCases: { title: string; description: string; steps: string[]; result?: string }[];
  testimonial?: { quote: string; role: string };
  faq?: { question: string; answer: string }[];
  ctaTitle?: string;
  ctaSubtitle?: string;
}

const paidWithin2hLabel = 'of payment-link payments settled within 2 hours (last 12 months)';
const messagesLabel = 'messages sent by our client hotels';
const whatsappReadLabel = 'of delivered WhatsApp messages are read (last 12 months)';
const pmsLabel = 'PMS connected, plus locks, payment, Zapier and n8n';

export const solutionsEn: Record<string, SolutionTextEn> = {
  'hotels-independants': {
    title: 'Independent hotels',
    headline: 'The marketing tools of the big chains, within reach of independents',
    description:
      'You run everything: the front desk, housekeeping, bookings, marketing... TriggerFlow automates your guest communication so you can focus on hospitality.',
    challenges: [
      {
        title: 'No time',
        description: 'Between the front desk and management, personalized marketing is out of reach.',
      },
      {
        title: 'Small team',
        description: 'No dedicated marketing manager, everyone does a bit of everything.',
      },
      {
        title: 'OTA dependency',
        description: 'Booking.com and Expedia capture your guests, and winning them back for direct bookings is hard.',
      },
      {
        title: 'Online reputation',
        description: 'Few reviews despite happy guests, and no time to reply.',
      },
    ],
    painPoints: [
      'Hours lost every week on manual confirmation and information emails',
      'Happy guests leave without writing a Google review',
      'Guests book through Booking.com even after a first stay with you',
      'No post-stay follow-up, so you lose touch with past guests',
      'The front desk is swamped and never gets to offer additional services',
    ],
    benefits: [
      'Automatic email and SMS sequences from booking to post-stay',
      'Google reviews collected automatically from satisfied guests',
      'Built-in loyalty program that encourages direct bookings',
      'Pre-arrival SMS with practical info, sent with no effort from you',
      'Upsells offered automatically at the right moment',
    ],
    statLabels: [
      paidWithin2hLabel,
      messagesLabel,
      pmsLabel,
    ],
    features: [
      {
        highlight: 'Automate effortlessly',
        whyForPersona: 'Build your sequences once and they run 24/7, even while you are at the front desk.',
        bullets: ['Visual drag-and-drop workflows', 'Triggered automatically from your PMS', 'No technical skills needed'],
      },
      {
        highlight: 'Personalized emails',
        whyForPersona: 'Every guest receives an email with their name, dates and stay details, without you touching the keyboard.',
        bullets: ['Professional ready-to-use templates', 'Automatic dynamic personalization', 'Open and click tracking'],
      },
      {
        highlight: 'More Google reviews',
        whyForPersona: 'Your happy guests become your ambassadors. The right message at the right time invites them to post a review.',
        bullets: ['Satisfaction survey before the review request', 'Direct link to Google', 'AI-assisted review replies'],
      },
      {
        highlight: 'Know your guests',
        whyForPersona: 'A full history for every guest: past stays, preferences, emails sent. Welcome them like regulars.',
        bullets: ['Guest profile enriched automatically', 'Real-time PMS sync', 'Smart segmentation'],
      },
      {
        highlight: 'SMS at the right moment',
        whyForPersona: 'Access code the day before, check-out reminder in the morning: your guests always have the right information at the right time.',
        bullets: ['Sent automatically on PMS events', 'Open and click tracking', 'GDPR compliant'],
      },
      {
        highlight: 'Build loyalty, direct',
        whyForPersona: 'Offer a loyalty program worthy of the big chains. Your guests come back direct instead of going through Booking.com.',
        bullets: ['Points earned on every stay', 'Customizable rewards', 'Dedicated guest portal'],
      },
    ],
    useCases: [
      {
        title: 'Automatic pre-arrival sequence',
        description: 'As soon as a booking is made, TriggerFlow sends: a confirmation, a D-7 email with practical info, and a D-1 SMS with the access code.',
        steps: ['PMS booking', 'Confirmation email', 'D-7 email', 'D-1 SMS'],
        result: 'Guests arrive informed',
      },
      {
        title: 'Smart review collection',
        description: 'After check-out, a satisfaction survey is sent automatically, followed by an invitation to leave a Google review. A low score alerts the manager.',
        steps: ['Check-out', 'D+1 email', 'Review invitation', 'Low score → manager alert'],
        result: 'A review invitation after every stay',
      },
      {
        title: 'Loyalty-driven direct booking',
        description: 'Reward guests who book direct: a subscriber-only offer, loyalty points, room upgrades...',
        steps: ['Newsletter subscriber', 'Exclusive offer', 'Direct booking', 'Loyalty points'],
        result: 'More guests booking direct',
      },
    ],
    testimonial: {
      quote: 'You can automate highly personalized messages and anticipate every situation, so the right guest gets the message you want, at the best moment.',
      role: 'Owner',
    },
    faq: [
      {
        question: 'How long does setup take for an independent hotel?',
        answer: 'We connect your PMS, set up your first sequences and train your team. Timing depends on your property: we agree on it together during the demo.',
      },
      {
        question: 'Do I need technical skills?',
        answer: 'No. The interface is visual: you drag and drop the steps of your workflows. If you can use email, you can use TriggerFlow.',
      },
      {
        question: 'Is my PMS compatible?',
        answer: "TriggerFlow connects to the main PMS on the market: Mews, Thaïs, Opera Cloud, Misterbooking, Medialog, Asterio, Vega, Apaleo and Reservit. If yours is not listed, contact us.",
      },
      {
        question: 'How much does it cost for an independent hotel?',
        answer: 'Our pricing is public. For an independent hotel, the One Way or Two Way plan covers most needs: the details are on our pricing page. Since the pricing is public, you can compare the subscription cost with the OTA commissions you pay today.',
      },
      {
        question: 'Is TriggerFlow GDPR compliant?',
        answer: 'Yes. Data is hosted in Europe, consent is managed automatically and the right to erasure is built in. You stay compliant without extra effort.',
      },
    ],
    ctaTitle: 'Ready to automate your independent hotel?',
    ctaSubtitle: 'Join the hoteliers who have automated their guest communication with TriggerFlow',
  },

  'groupes-hoteliers': {
    title: 'Hotel groups',
    headline: 'One unified marketing strategy for all your properties',
    description: 'Manage several hotels from a single platform. Shared templates, group-wide automations, consolidated reporting.',
    challenges: [
      {
        title: 'Brand consistency',
        description: 'It is hard to keep a consistent image across every property.',
      },
      {
        title: 'Scattered reporting',
        description: 'Each hotel has its own tools, so a group-level view is impossible.',
      },
      {
        title: 'Team training',
        description: 'With high turnover, training every team on marketing tools is difficult.',
      },
      {
        title: 'Duplicated effort',
        description: 'Each hotel rebuilds the same emails and the same workflows.',
      },
    ],
    painPoints: [
      'Each hotel uses different tools, so performance cannot be compared',
      'Email templates are rebuilt from scratch in every property',
      'High turnover means teams constantly have to be retrained',
      'No group loyalty program: guests earn nothing across hotels',
      'Marketing campaigns launch in a scattered way with no consistency',
    ],
    benefits: [
      'Shared templates at group level, customizable by each hotel',
      'Consolidated dashboard with real-time KPIs for all properties',
      'Simple interface that teams pick up quickly',
      'Multi-hotel loyalty program that encourages stays across properties',
      'Campaigns rolled out to the whole group in one click, with local personalization',
    ],
    statLabels: [
      'dashboard for all your properties',
      pmsLabel,
      paidWithin2hLabel,
    ],
    features: [
      {
        highlight: 'Shared group templates',
        whyForPersona: 'Create a template at head office and each hotel personalizes it with its own logo and colors. No more duplication.',
        bullets: ['Centralized template library', 'Local variables per property', 'Templates shared across properties'],
      },
      {
        highlight: 'Consolidated reporting',
        whyForPersona: 'Compare your hotels at a glance. Spot best practices and roll them out.',
        bullets: ['Real-time group dashboard', 'Property-to-property comparison', 'Automatic PDF export'],
      },
      {
        highlight: 'Unified branding',
        whyForPersona: 'Guarantee a consistent brand image while leaving local teams some flexibility.',
        bullets: ['Locked group brand guidelines', 'Editable zones per hotel', 'Approval before sending'],
      },
      {
        highlight: 'Group guest database',
        whyForPersona: 'A guest who stays at your Paris hotel is recognized when they book in Marseille.',
        bullets: ['Unified cross-hotel guest profile', 'Group-wide stay history', 'Global segmentation'],
      },
      {
        highlight: 'Multi-hotel program',
        whyForPersona: 'Your guests earn points across all your properties and stay within the group ecosystem.',
        bullets: ['Points earned across hotels', 'Customizable rewards', 'Shared catalog'],
      },
      {
        highlight: 'Centralized campaigns',
        whyForPersona: 'Launch a national campaign in one go, automatically personalized by each hotel.',
        bullets: ['Simultaneous multi-hotel sending', 'Automatic local personalization', 'Segments per property'],
      },
    ],
    useCases: [
      {
        title: 'Customizable group templates',
        description: 'Create templates at group level, customizable by each hotel (logo, colors, signature).',
        steps: ['Head office template', 'Local personalization', 'Rollout', 'Unified reporting'],
        result: 'One template built once at head office, adapted everywhere',
      },
      {
        title: 'Multi-hotel loyalty program',
        description: 'Guests earn points across all your properties. A unified view of their group history.',
        steps: ['Stay at Hotel A', 'Group points', 'Booking at Hotel B', 'Reward'],
        result: 'Guests steered towards the group’s other hotels',
      },
      {
        title: 'Group promotional campaign',
        description: 'Launch a campaign for the whole group in one click, with automatic personalization for each hotel.',
        steps: ['Head office creation', 'Per-hotel variables', 'Simultaneous sending', 'Group reporting'],
        result: 'A campaign prepared once, rolled out to every hotel',
      },
    ],
    testimonial: {
      quote: 'TriggerFlow gives head office a complete view and front desk agents a simplified one: they only see their inbox to answer questions and the dashboard to track upsell and orders.',
      role: 'Group',
    },
    faq: [
      {
        question: 'Can access rights be managed per hotel?',
        answer: 'Yes. Each hotel has its own dedicated space with its own users. Head office keeps a group-wide view and can control what can be changed locally.',
      },
      {
        question: 'How does rollout work across several hotels?',
        answer: 'We start with a pilot hotel, then roll out to the others in parallel.',
      },
      {
        question: 'Is data kept separate between hotels?',
        answer: 'Yes, each hotel can only access its own data. Head office has a consolidated view and can access the data of each property.',
      },
      {
        question: 'Which multi-property PMS are supported?',
        answer: 'Each property is connected to its own PMS, and you manage them all from a single account. For a PMS we do not connect yet, our technical team assesses feasibility.',
      },
    ],
    ctaTitle: 'Unify your group’s marketing strategy',
    ctaSubtitle: 'Request a multi-property demo with consolidated reporting',
  },

  residences: {
    title: 'Tourist residences',
    headline: 'Handle long stays and owners efficiently',
    description: 'Guest communication, owner relations, self check-in management... TriggerFlow adapts to the specifics of tourist residences.',
    challenges: [
      {
        title: 'Self check-in',
        description: 'Guests arrive at all hours and need clear instructions.',
      },
      {
        title: 'Owner relations',
        description: 'Keeping owners informed: occupancy, revenue, maintenance.',
      },
      {
        title: 'Long stays',
        description: 'Stays from one week to several months call for a different kind of communication.',
      },
      {
        title: 'Maintenance',
        description: 'Handling repair requests and inspection reports.',
      },
    ],
    painPoints: [
      'Guests call on Sunday evening because they did not receive their access code',
      'Owners ask for a monthly report that you put together by hand',
      'Paper inspection reports get lost and cause disputes',
      'Long-term guests do not know who to contact when there is a problem',
      'No structured communication during long stays',
    ],
    benefits: [
      'Automatic SMS with key box code, WiFi and parking before every arrival',
      'Monthly owner report generated and sent automatically',
      'Digital inspection reports with photos and electronic signature',
      'Dedicated WhatsApp channel for guest support, 7 days a week',
      'Regular communication during long stays with local info',
    ],
    statLabels: [
      messagesLabel,
      whatsappReadLabel,
      pmsLabel,
    ],
    features: [
      {
        highlight: 'Arrival instructions',
        whyForPersona: 'Guests automatically receive everything they need: code, parking, WiFi. Zero calls on the weekend.',
        bullets: ['Automatic D-1 sending', 'Key box or smart lock code', 'Multilingual instructions'],
      },
      {
        highlight: 'Long-stay workflows',
        whyForPersona: 'Adapt communication to the length of stay: one week or three months, every guest gets the right messages.',
        bullets: ['Sequences adapted to stay length', 'Automatic mid-stay check-in', 'Housekeeping and linen reminders'],
      },
      {
        highlight: 'Digital inspection reports',
        whyForPersona: 'No more lost paperwork. Photo, comment, signature: everything is archived and sent to the owner.',
        bullets: ['Form with photos', 'Electronic signature', 'Automatically sent to the owner'],
      },
      {
        highlight: 'Owner reports',
        whyForPersona: 'Every month, the owner receives their report: occupancy rate, revenue, interventions. Without you lifting a finger.',
        bullets: ['Automatic monthly report', 'PDF with PMS data', 'Emailed to the owner'],
      },
      {
        highlight: 'Guest support',
        whyForPersona: 'A plumbing problem at 10 pm? The guest sends a WhatsApp message, you get the alert and the owner is informed.',
        bullets: ['Dedicated WhatsApp channel per residence', 'AI-suggested replies', 'Conversation history'],
      },
      {
        highlight: 'Owner database',
        whyForPersona: 'Manage your owners like your guests: preferences, history, documents, all in one place.',
        bullets: ['Complete owner profile', 'Shared documents', 'Communication history'],
      },
    ],
    useCases: [
      {
        title: 'The perfect self check-in',
        description: 'Automatic SMS with key box code, parking instructions and WiFi code. The guest has everything before arriving.',
        steps: ['Booking', 'Info email', 'D-1 SMS with code', 'WhatsApp welcome'],
        result: 'Fewer calls on Sunday evening',
      },
      {
        title: 'Monthly owner report',
        description: 'Automatic email every month: occupancy rate, revenue, schedule, interventions.',
        steps: ['End of month', 'Data compiled', 'Automatic email', 'PDF attached'],
        result: 'Owners informed without having to chase you',
      },
      {
        title: 'Repair request',
        description: 'The guest reports a problem through a form. Automatic alert to the manager and the owner.',
        steps: ['Guest form', 'Manager alert', 'Owner notified', 'Resolution tracking'],
        result: 'The manager alerted as soon as the issue is reported',
      },
    ],
    faq: [
      {
        question: 'Does TriggerFlow handle smart locks?',
        answer: 'Yes, TriggerFlow connects to Sesame and Igloohome locks. The code is sent automatically to the guest before arrival.',
      },
      {
        question: 'Do owners have access to a portal?',
        answer: 'Owners receive an automatic monthly report by email.',
      },
      {
        question: 'How do I handle stays of several months?',
        answer: 'TriggerFlow automatically adapts communication to the length of stay. For long stays, regular touchpoints are scheduled (mid-stay, reminders, local info).',
      },
      {
        question: 'Can inspection reports be sent to owners automatically?',
        answer: 'Yes. As soon as the inspection report is completed and signed by the guest, it is automatically sent to the owner and archived in the CRM.',
      },
    ],
    ctaTitle: 'Simplify the management of your residences',
    ctaSubtitle: 'Self check-in, owner reports and guest support, automated',
  },

  campings: {
    title: 'Campsites & outdoor hospitality',
    headline: 'Keep your campsite lively all season long',
    description: 'Strong seasonality, entertainment, extra services... TriggerFlow helps campsites get the most from every stay and build loyalty for next season.',
    challenges: [
      {
        title: 'Strong seasonality',
        description: '3 to 4 months to make the year’s revenue, so every booking counts.',
      },
      {
        title: 'Entertainment',
        description: 'Getting the activity program across to guests on site.',
      },
      {
        title: 'Extra services',
        description: 'Restaurant, grocery store, bike rental... it is hard to promote everything.',
      },
      {
        title: 'Loyalty',
        description: 'Bringing guests back next year despite the competition.',
      },
    ],
    painPoints: [
      'Guests do not know half of the services available on site',
      'The activity program is posted at reception but nobody reads it',
      'When the season ends, you lose touch with your guests',
      'Early booking campaigns are done by hand and sent too late',
      'No way to measure which service generates the most revenue',
    ],
    benefits: [
      'Automatic SMS to promote the restaurant, spa and activities during the stay',
      'Activity program emailed every Monday to all guests on site',
      'Automatic early booking campaign from September to summer guests',
      'Seasonal loyalty program that rewards returning guests',
      'Analytics per service to optimize your offers and revenue',
    ],
    statLabels: [
      messagesLabel,
      paidWithin2hLabel,
      whatsappReadLabel,
    ],
    features: [
      {
        highlight: 'Activity program',
        whyForPersona: 'Every guest receives the program directly on their phone. No more notice board.',
        bullets: ['Automatic weekly sending', 'Activity booking links', 'Segmentation by age group'],
      },
      {
        highlight: 'Early booking campaign',
        whyForPersona: 'As soon as the season ends, automatically follow up with your guests with an early bird offer. Fill up before the competition.',
        bullets: ['Summer guest segmentation', 'Personalized early bird offer', 'Automatic follow-up sequence'],
      },
      {
        highlight: 'Seasonal loyalty',
        whyForPersona: 'A loyalty program suited to campsites: points per stay, rewards in services, VIP status.',
        bullets: ['Points earned per night', 'Rewards in activities and services', 'VIP status for regulars'],
      },
      {
        highlight: 'Service cross-sell',
        whyForPersona: 'Restaurant, spa, bike rental... automatically offer the right services at the right moment of the stay.',
        bullets: ['Contextual offers by day of stay', 'Automatic on-site guest promotions', 'Conversion tracking'],
      },
      {
        highlight: 'Guest sequences',
        whyForPersona: 'From arrival to departure, every guest enjoys a perfectly orchestrated experience.',
        bullets: ['Welcome and practical info', 'Day-by-day service promotions', 'Satisfaction survey and early booking'],
      },
      {
        highlight: 'End-of-stay reviews',
        whyForPersona: 'Capitalize on the emotion of the stay. Ask for a Google review while the guest is still under the spell.',
        bullets: ['Survey on the last day', 'Redirect to Google if satisfied', 'Alert if dissatisfied'],
      },
    ],
    useCases: [
      {
        title: 'Weekly activity newsletter',
        description: 'Every Monday, guests receive the week’s program: evenings, activities, outings.',
        steps: ['Monday morning', 'Automatic sending', 'Weekly program', 'Booking links'],
        result: 'Activities announced at the right time',
      },
      {
        title: 'Early booking for next season',
        description: 'From September, an automatic campaign goes out to summer guests: an early bird offer for next season.',
        steps: ['September', 'Summer guest segmentation', 'Email with an early-booking offer', 'Follow-up one week later'],
        result: 'Summer campers followed up for next season',
      },
      {
        title: 'On-site service promotion',
        description: 'SMS during the stay: an invitation to try the campsite restaurant, with an offer for residents.',
        steps: ['Arrival', 'D+2 restaurant SMS', 'D+4 spa SMS', 'D+5 bike rental SMS'],
        result: 'The campsite’s services offered during the stay',
      },
    ],
    faq: [
      {
        question: 'Does TriggerFlow adapt to a campsite’s seasonality?',
        answer: 'Yes. You can switch sequences on and off depending on the season. Early booking campaigns trigger automatically at the end of the season.',
      },
      {
        question: 'Can the activity program be sent automatically?',
        answer: 'Yes. You update the program in TriggerFlow, and it is sent automatically every Monday to guests on site.',
      },
      {
        question: 'How do I promote extra services during the stay?',
        answer: 'TriggerFlow sends contextual SMS based on the day of the stay: restaurant on D+2, spa on D+4, bike rental on D+5. You set the schedule once.',
      },
      {
        question: 'Does the loyalty program carry over from one season to the next?',
        answer: 'Yes. Points are kept from one season to the next. Your loyal guests enjoy their status from the first day of the new season.',
      },
    ],
    ctaTitle: 'Ready to bring your campsite to life like never before?',
    ctaSubtitle: 'Get the most from every stay and build loyalty for next season',
  },

  'hotels-luxe': {
    title: 'Luxury & 5-star hotels',
    headline: 'The relational excellence your premium guests expect',
    description:
      'Your guests expect flawless service at every interaction. TriggerFlow orchestrates tailor-made communication that elevates the experience, from first contact to the next stay.',
    challenges: [
      {
        title: 'Sky-high expectations',
        description: 'Every detail counts: a poorly personalized email or a forgotten preference can cost you a guest for life.',
      },
      {
        title: 'Personalization at scale',
        description: 'You cannot treat every guest as a VIP by hand when arrivals keep coming.',
      },
      {
        title: 'Expected responsiveness',
        description: 'Luxury guests do not wait. Every request must be handled in minutes, not hours.',
      },
      {
        title: 'Premium loyalty',
        description: 'Your guests can choose among the best hotels in the world. Why would they come back to you?',
      },
    ],
    painPoints: [
      'Guest preferences (pillow, minibar, floor) are jotted on sticky notes that get lost',
      'A guest returns for the 3rd time and nobody recognizes them, so they are treated like a new guest',
      'The confirmation email is the same generic template as for a 2-star hotel',
      'The concierge is overwhelmed and cannot contact every guest before arrival',
      'No structured post-stay follow-up: the guest disappears and books elsewhere',
    ],
    benefits: [
      'Guest profile enriched automatically: preferences, allergies, special occasions, full history',
      'Personalized pre-arrival communication: an elegant email with name, room type and tailor-made offers',
      'Automatic VIP alerts: staff are notified when a loyal guest or a VIP arrives',
      'Discreet, elegant satisfaction survey, with immediate escalation if the guest is dissatisfied',
      'Premium loyalty program with exclusive rewards (upgrade, spa, complimentary dinner)',
    ],
    statLabels: [
      'single guest profile, across all stays',
      'email open rate, excluding OTA relays (last 12 months)',
      messagesLabel,
    ],
    features: [
      {
        highlight: 'Ultra-detailed guest profile',
        whyForPersona: 'Every guest has a complete profile: room preferences, allergies, birthdays, stay history. Your team welcomes them like a regular, even if it is their first visit in 2 years.',
        bullets: ['Remembered preferences (pillow, minibar, floor)', 'Complete multi-stay history', 'Custom notes and tags added by staff'],
      },
      {
        highlight: 'Tailor-made guest journey',
        whyForPersona: 'From the first email to the birthday follow-up, every touchpoint is orchestrated to reflect your standing.',
        bullets: ['Premium pre-stay, in-stay and post-stay sequence', 'Conditions by segment (VIP, returning, new)', 'Timing tuned for luxury (no sending at 6 am)'],
      },
      {
        highlight: 'Emails worthy of your brand',
        whyForPersona: 'Elegant templates customizable to your brand guidelines. Every email reflects the excellence of your property.',
        bullets: ['Customizable premium design', 'Dynamic variables (name, room, dates)', 'Messages in the guest’s language'],
      },
      {
        highlight: 'WhatsApp concierge',
        whyForPersona: 'Your international guests prefer WhatsApp. Offer a direct, elegant and responsive communication channel.',
        bullets: ['Dedicated WhatsApp Business channel', 'Quick replies to frequent requests', 'Automatic escalation to the concierge'],
      },
      {
        highlight: 'Contextual premium upsell',
        whyForPersona: 'Offer the spa, the fine-dining restaurant, the suite upgrade, at the right moment, to the right person.',
        bullets: ['Contextual offers by guest profile', 'Experience packs (champagne, spa, dinner)', 'Built-in online payment'],
      },
      {
        highlight: 'Exclusive loyalty program',
        whyForPersona: 'A program worthy of the big luxury chains. Your best guests build up privileges that bring them back.',
        bullets: ['VIP tiers with progressive benefits', 'Exclusive rewards (suite, dinner, spa)', 'Recognition across stays'],
      },
    ],
    useCases: [
      {
        title: 'Personalized VIP welcome',
        description: 'A loyal guest books. TriggerFlow alerts the team with their full profile: preferences, history, special occasion. Staff prepare a tailor-made welcome.',
        steps: ['Booking detected', 'Guest profile enriched', 'VIP staff alert', 'Personalized welcome'],
        result: 'Every guest welcomed according to their preferences',
      },
      {
        title: 'Luxury pre-arrival sequence',
        description: 'An elegant email at D-10 with a preferences questionnaire, an email at D-3 with a tailor-made program, and an SMS at D-1 with access details and luggage storage.',
        steps: ['D-10 preferences email', 'D-3 program email', 'D-1 access SMS', 'WhatsApp welcome'],
        result: 'Preferences known before arrival',
      },
      {
        title: 'Premium post-stay follow-up',
        description: 'A thank-you email with photos of the stay, a discreet satisfaction survey, a personalized loyalty offer, and a birthday follow-up.',
        steps: ['D+1 thank-you email', 'D+2 survey', 'Loyalty points credited', 'Automatic birthday offer'],
        result: 'Loyal guests recognized and invited back',
      },
    ],
    faq: [
      {
        question: 'Is TriggerFlow suitable for a 5-star hotel or a palace?',
        answer: 'Yes. TriggerFlow adapts to the standards of luxury: elegant customizable templates, fine-grained management of guest preferences, VIP alerts and a premium loyalty program.',
      },
      {
        question: 'Do the emails and SMS reflect our brand image?',
        answer: 'Absolutely. You customize every template with your logo, colors, typography and tone of voice. The result is an email as polished as your printed brochure.',
      },
      {
        question: 'How do I manage guest preferences between stays?',
        answer: 'The TriggerFlow CRM automatically remembers preferences provided by the guest or noted by staff. With every new booking, the profile is pre-filled and the team is alerted.',
      },
      {
        question: 'Can the loyalty program be customized?',
        answer: 'Fully. You define the tiers (Silver, Gold, Platinum...), the points per night, and the rewards: upgrade, complimentary night, spa access, fine-dining dinner, early check-in, late check-out...',
      },
      {
        question: 'Does TriggerFlow integrate with Opera Cloud?',
        answer: 'Yes, Opera Cloud is natively supported, along with Mews, Thaïs and other PMS used in upscale hospitality. Synchronization is in real time.',
      },
    ],
    ctaTitle: 'Give your guests the excellence they expect',
    ctaSubtitle: 'Request a personalized demo for luxury hospitality',
  },

  'maisons-hotes': {
    title: 'Bed and breakfasts & guesthouses',
    headline: 'The welcome of a guesthouse, without spending your evenings on it',
    description:
      'You do everything yourself: bookings, welcoming guests, breakfast, messages. TriggerFlow sends the right messages at the right time, so you keep time for your guests.',
    challenges: [
      { title: 'Everything rests on you', description: 'Welcome, housekeeping, breakfast, bookings: messages come last.' },
      { title: 'The same answers every day', description: 'Access code, arrival time, parking: you repeat the same information over and over.' },
      { title: 'Late arrivals', description: 'Waiting up for a guest arriving at 11 pm, or sending them instructions at the last minute.' },
      { title: 'Reviews count double', description: 'On Booking.com or Airbnb, every rating weighs heavily for a small property.' },
    ],
    painPoints: [
      'Arrival information sent by hand, one guest at a time',
      'Requests coming in through Booking.com, Airbnb, email and phone',
      'No systematic review request after departure',
    ],
    benefits: [
      'A personalized arrival message sent automatically',
      'All your messages in a single inbox',
      'A review request after every stay, at the right moment',
    ],
    statLabels: [
      messagesLabel,
      whatsappReadLabel,
      pmsLabel,
    ],
    features: [
      {
        highlight: 'Stay messages that send themselves',
        whyForPersona: 'Confirmation, arrival information, welcome message and review request go out at the right time.',
        bullets: ['Ready-to-adapt templates', 'Based on the booking channel', 'Email, SMS or WhatsApp'],
      },
      {
        highlight: 'One inbox for everything',
        whyForPersona: 'Booking.com, Airbnb, email, WhatsApp: all questions in one place, with the guest’s history.',
        bullets: ['AI-suggested replies', 'Guest history', 'On desktop and mobile'],
      },
      {
        highlight: 'More positive reviews',
        whyForPersona: 'A survey at departure, then an invitation to post when the stay went well.',
        bullets: ['Automatic request', 'Alert on a low score', 'AI-assisted review replies'],
      },
    ],
    useCases: [
      { title: 'Self check-in', description: 'The guest receives their instructions and code on the day of arrival.', steps: ['Booking received', 'D-1 arrival message with instructions', 'Code or key sent on the day'] },
      { title: 'Breakfast', description: 'Preferences collected before arrival.', steps: ['Pre-stay form', 'Preferences and allergies', 'Added to the guest profile'] },
      { title: 'The review after departure', description: 'One request at the right moment.', steps: ['Departure', 'Satisfaction survey', 'Invitation to post if all went well'] },
    ],
    faq: [
      { question: 'Is TriggerFlow suited to a small property?', answer: 'Yes: the One Way plan covers the essentials, and ready-to-use templates let you get started without any technical skills.' },
      { question: 'Can I manage my Booking.com and Airbnb messages?', answer: 'Yes: Expedia goes through relay emails, Airbnb through forms sent automatically, and the native Booking.com connection is in progress.' },
      { question: 'Do I need a PMS?', answer: 'TriggerFlow connects to your PMS to automate from your bookings; let us talk about your tool during the demo.' },
    ],
    ctaTitle: 'Keep time for your guests',
    ctaSubtitle: 'A 45-minute demo, built around your hotel',
  },
};


/** Version affichée d'une solution : texte anglais fusionné par index sur la donnée française. */
export function localizeSolution(s: SolutionData, locale: string): SolutionData {
  const en = locale === 'en' ? solutionsEn[s.slug] : undefined;
  if (!en) return s;
  return {
    ...s,
    title: en.title,
    headline: en.headline,
    description: en.description,
    challenges: s.challenges.map((c, i) => ({ ...c, ...en.challenges[i] })),
    painPoints: en.painPoints ?? s.painPoints,
    benefits: en.benefits ?? s.benefits,
    stats: s.stats.map((st, i) => ({ ...st, label: en.statLabels[i] ?? st.label })),
    features: s.features.map((f, i) => ({ ...f, ...en.features[i] })),
    useCases: s.useCases.map((u, i) => ({ ...u, ...en.useCases[i] })),
    testimonial: s.testimonial && en.testimonial ? { ...s.testimonial, ...en.testimonial } : s.testimonial,
    faq: en.faq ?? s.faq,
    ctaTitle: en.ctaTitle ?? s.ctaTitle,
    ctaSubtitle: en.ctaSubtitle ?? s.ctaSubtitle,
  };
}
