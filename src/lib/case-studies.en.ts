import type { CaseStudy } from './case-studies';

/** Versions anglaises des témoignages clients (traduction fidèle des propos recueillis en français). */
type EnOverride = Pick<CaseStudy, 'type' | 'location' | 'contactRole' | 'quote' | 'objectives' | 'highlights' | 'sections'>;

export const caseStudiesEn: Record<string, EnOverride> = {
  'edgar-hotel-spa': {
    type: 'Independent hotel',
    location: 'Saint-Brieuc, Brittany',
    contactRole: 'General manager',
    quote: 'After testing several CRM solutions, we found in TriggerFlow the tool that truly fits our needs.',
    objectives: ['Loyalty', 'Upselling', 'Automation'],
    highlights: ['Guest loyalty and upselling', 'Personalised conditional forms', 'Mid-stay WhatsApp and satisfaction survey'],
    sections: [
      { question: 'Why did you choose TriggerFlow?', answer: 'I was working with another CRM when I discovered TriggerFlow and its potential.\n\nWe were among the very first users of the tool, which let us share our feedback on the features we needed.' },
      { question: 'What do you think of the solution and what it can do?', answer: 'Once I dug into it, I found a tool with incredible possibilities, fully managed by the hotelier.\n\nWe are not limited, we are completely in control.' },
      { question: 'What are its strengths in your view?', answer: 'Forms can adapt to the answers. Depending on what the guest says, other questions open up: that’s a real strength.' },
      { question: 'Any final words?', answer: 'The team is lovely and always there. The tool is great. They understood exactly what we want on today’s market.' },
    ],
  },
  'causse-comtal': {
    type: 'Hotel, restaurant & spa, 100 rooms',
    location: 'Montrozier, near Rodez',
    contactRole: 'Owner',
    quote: 'I am truly blown away by the tool. The possibilities are practically endless.',
    objectives: ['Automation', 'Upselling', 'Loyalty'],
    highlights: ['A complete guest journey: pre-stay, mid-stay, post-stay', 'Marketing and transactional email in one place', 'A system worthy of a large chain, set up in one week'],
    sections: [
      { question: 'Why did you add TriggerFlow to your digital ecosystem?', answer: 'It started with a conversation with the team at Thaïs, our PMS. Thaïs had just set up the connection with TriggerFlow, and I was telling them how important it was for us to limit the number of tools in the hotel through deeper integration: everything should talk to everything, through as few interfaces as possible. Thaïs went as far as building TriggerFlow straight into the PMS, with a dedicated button in its navigation menu.\n\nAurélien from Thaïs explained that TriggerFlow would let me do two things: run my marketing sends using my guest database pulled automatically from Thaïs, and run my automated emails in a more advanced and personalised way than the PMS’s built-in tool.' },
      { question: 'Why did TriggerFlow meet your needs?', answer: 'Until then we used two tools for email: Thaïs for transactional and Brevo for marketing. The problem with Brevo was re-importing our databases every time. It was cumbersome, so we didn’t use it enough.\n\nTriggerFlow handles everything in one place, and more. It includes everything you expect from a powerful CRM: segmentation, guest profiles, sales pages, forms and flows, a scenario editor to manage sends. All connected directly to the PMS.\n\nOnce we understood how powerful it is, it was obvious it would make us more efficient.' },
      { question: 'How did the launch go?', answer: 'In stages. The tool is incredibly customisable. Getting started takes some effort, but TriggerFlow’s founders are true developers and opened up a huge range of possibilities.\n\nThis summer we started with marketing sends and launched two campaigns fairly easily. Then I waited until autumn to work on transactional emails. Our goal was to rethink the entire guest journey.\n\nDuring setup I had practically a dedicated hotline. Mounir and Soufiane were extremely available and responsive.\n\nToday, guests receive a personalised email based on their booking. No breakfast? We offer to book one. No dinner? Same. Half board included? A form lets them choose their dinner time. A spa treatment included? A questionnaire asks for their availability and preferences.\n\nThree days before arrival, they receive another email with a registration form. They fill in all mandatory information in advance, and it is written automatically to their guest profile in the PMS.\n\nAfter departure, they receive a thank-you email with a satisfaction form, and management is alerted when a guest is unhappy.' },
      { question: 'What do you think of the solution and what it can do?', answer: 'I am truly blown away by the tool. The possibilities are practically endless. Unlike other CRM tools, you no longer have to start from what the software can do and adapt to it. With TriggerFlow, you start from the need, draw the scenario you want… and then set it up in the tool, without getting stuck.\n\nIn one week, we set up an automated email system you normally only find in very large hotel chains, where whole teams spend months making it work. It is truly incredible, as long as you take the time to think about what you want.' },
      { question: 'Any comments on the team? Wishes for the future?', answer: 'Thanks of course to Mounir and Soufiane for their availability, their help and their work: building a tool like this with a small team, well done.\n\nAt the hotel, the team loves the possibilities it gives us. The tool is incredible. We will try to use it to the full, because we are still far from having explored everything!' },
    ],
  },
  'le-vieux-pressoir': {
    type: 'Holiday residence, 4 studios & 2 apartments',
    location: 'Dieffenthal, Alsace',
    contactRole: 'Owner',
    quote: 'I save an enormous amount of time, knowing the relationship with my guests is taken care of.',
    objectives: ['Automation', 'Loyalty'],
    highlights: ['Highly personalised messages by booking channel', 'Fully automated, runs on its own', 'Guest reactions tracked in real time'],
    sections: [
      { question: 'Why did you choose TriggerFlow?', answer: 'My PMS didn’t give me enough flexibility to personalise messages by booking channel, guest type, group, gift voucher…\n\nI sell on many platforms, so I have specific messages for guests depending on where they booked.\n\nSix months ago, Alicia from Thaïs told me about a new partner with the features I was looking for, within our budget. I was put in touch with the TriggerFlow team, we got on well, I dived in, and that’s how it started!' },
      { question: 'After a few months, what do you think of the tool?', answer: 'I am very happy with it. We can automate highly personalised messages and anticipate every situation, so the right guest gets the message we want at the best time.\n\nThe tool is powerful and flexible. We covered every possible arrival and departure scenario: booking source, guest type, arrival time, type of accommodation…\n\nThere is some work at the start to set everything up. Now it runs on its own, I don’t need to deal with it and I save an enormous amount of time, knowing the relationship with my guests is taken care of.\n\nAnd we can see how guests react. With a single tool, I can go a long way.' },
      { question: 'And the support? Does it live up to the tool?', answer: 'The team is very responsive: it’s not just a tool, there is a service.\n\nThere are people behind it doing the work, there to support us.\n\nI shared my feedback with Soufiane along the way, and it has been taken into account or is being taken into account.\n\nThere are new features regularly. I haven’t tested them all yet, like the forms that just arrived.' },
      { question: 'TriggerFlow in three words?', answer: 'Simplicity. Time saved. Great relationships, with our guests and with the TriggerFlow team.\n\nLong may it last.' },
    ],
  },
  'groupe-noemys': {
    type: 'Hotel group, 15 properties',
    location: 'France (multi-site)',
    contactRole: 'Head of Communications',
    quote: 'They don’t just provide a solution, they adapt it to our reality.',
    objectives: ['Automation', 'Loyalty', 'Reputation'],
    highlights: ['Centralised email for 15 properties', 'Personalised, traceable guest communication', 'Reputation and satisfaction management'],
    sections: [
      { question: 'Why did you choose TriggerFlow?', answer: 'TriggerFlow was chosen during a global restructuring where cost optimisation was a priority. We wanted excellent value for money, a solution able to adapt to our new economic constraints without sacrificing performance.\n\nBeyond the technology, it was the quality of the human relationship and support that tipped the balance.\n\nOperationally, we were overwhelmed by manual emails; automating our processes had become essential to gain efficiency while staying close to our guests.' },
      { question: 'Which objectives does the solution help you meet?', answer: 'TriggerFlow helps us meet major strategic objectives:\n\nPersonalised marketing and loyalty: we centralise email for all our hotels, ensuring a consistent brand image. With a unified database, we personalise communication for each guest, keep a precise record of every interaction and support guests from booking to after their stay.\n\nReputation and satisfaction: by automating review requests and management, we improve overall satisfaction and react faster to feedback.\n\nBusiness monitoring: the solution gives us valuable visibility on booking flows.' },
      { question: 'What are the solution’s strengths?', answer: 'As a hospitality specialist, the platform offers major strategic advantages:\n\nAutomation and centralisation: precious time saved with automated emails centralised for the whole portfolio.\n\nData and personalisation: effective data collection to build a highly personalised, high-performing marketing strategy.' },
      { question: 'What are your next projects?', answer: 'After a few successful months, we are moving to the next stage:\n\nRolling out pre-stay emails for all our hotels, to improve the guest experience from booking.\n\nCentralising reviews: full integration of Google and Tripadvisor to manage our reputation from a single interface.' },
    ],
  },
};
