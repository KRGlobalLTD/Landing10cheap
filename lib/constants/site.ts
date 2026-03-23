import type { FaqItem, FooterLinkGroup, NavItem, OfferItem } from '@/lib/types/site';

export const SITE_CONFIG = {
  name: 'Siteasy',
  description:
    'Votre landing page simple et professionnelle pour 10 €, livrée sous 24h, hébergement et mise en ligne inclus.',
  price: '10 €',
  deliveryDelay: '24h',
  whatsapp: 'https://wa.me/0000000000'
} as const;

export const MAIN_NAVIGATION: NavItem[] = [
  { label: 'Accueil', href: '/' },
  { label: 'Formulaire', href: '/formulaire' },
  { label: 'Checkout', href: '/checkout' },
  { label: 'Paiement', href: '/paiement' },
  { label: 'Support', href: '/support' }
];

export const BENEFITS: OfferItem[] = [
  {
    title: 'Simple et rapide',
    description: 'Idéal pour présenter votre activité rapidement, sans vous perdre dans la technique.'
  },
  {
    title: 'Livrée sous 24h',
    description: 'Votre page est produite et mise en ligne en une journée après validation.'
  },
  {
    title: 'Tout inclus',
    description: 'Hébergement, mise en ligne, support WhatsApp et 1 correction mineure offerts.'
  }
];

export const HOW_IT_WORKS: OfferItem[] = [
  {
    title: '1. Vous répondez au formulaire',
    description: 'Vous partagez votre activité, votre offre et vos objectifs en quelques minutes.'
  },
  {
    title: '2. Nous créons votre landing',
    description: 'Nous construisons une page sobre, claire et orientée conversion.'
  },
  {
    title: '3. Mise en ligne en 24h',
    description: 'Vous recevez une page prête à être partagée avec vos prospects.'
  }
];

export const OFFER_INCLUDES: OfferItem[] = [
  { title: 'Landing page 1 page', description: 'Design premium minimaliste et responsive.' },
  { title: 'Hébergement inclus', description: 'Aucune installation technique à gérer.' },
  { title: 'Mise en ligne incluse', description: 'URL prête à être diffusée immédiatement.' },
  { title: 'Support WhatsApp', description: 'Réponses rapides pour vos questions essentielles.' },
  { title: '1 correction mineure offerte', description: 'Un ajustement léger après livraison.' }
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'À qui s’adresse cette offre ?',
    answer: 'Aux indépendants, petites entreprises et porteurs de projet qui veulent une présence web immédiate.'
  },
  {
    question: 'Que se passe-t-il après le paiement ?',
    answer: 'Vous recevez l’accès au formulaire, puis nous lançons la production de votre page.'
  },
  {
    question: 'Puis-je demander des modifications ?',
    answer: 'Oui, une correction mineure est incluse dans l’offre de base.'
  }
];

export const FOOTER_LINKS: FooterLinkGroup[] = [
  {
    title: 'Navigation',
    links: MAIN_NAVIGATION
  },
  {
    title: 'Informations',
    links: [
      { label: 'Mentions légales', href: '/mentions-legales' },
      { label: 'CGV', href: '/cgv' },
      { label: 'Confidentialité', href: '/confidentialite' },
      { label: 'Remboursement', href: '/remboursement' }
    ]
  }
];
