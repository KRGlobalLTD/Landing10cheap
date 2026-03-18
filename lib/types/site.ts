export type NavItem = {
  label: string;
  href: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type OfferItem = {
  title: string;
  description: string;
};

export type FooterLinkGroup = {
  title: string;
  links: NavItem[];
};
