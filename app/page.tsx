import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { HeroSection } from '@/components/sections/hero-section';
import { SocialProofSection } from '@/components/sections/social-proof-section';
import { HowItWorksSection } from '@/components/sections/how-it-works-section';
import { GallerySection } from '@/components/sections/gallery-section';
import { FeaturesSection } from '@/components/sections/features-section';
import { PricingSection } from '@/components/sections/pricing-section';
import { TestimonialsSection } from '@/components/sections/testimonials-section';
import { FaqSection } from '@/components/sections/faq-section';
import { EmailCaptureSection } from '@/components/sections/email-capture-section';
import { FinalCtaSection } from '@/components/sections/final-cta-section';
import { ScrollReveal } from '@/components/ui/scroll-reveal';

export const metadata: Metadata = {
  title: 'Créez votre site web en 3 questions',
  description:
    'Notre générateur crée automatiquement votre site professionnel. Responsive, hébergé, en ligne en moins de 3 minutes. Paiement unique, aucun abonnement.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Créez votre site web en 3 questions',
    description:
      'Notre générateur crée automatiquement votre site professionnel. Responsive, hébergé, en ligne en moins de 3 minutes.',
    url: '/'
  }
};

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <ScrollReveal delay={0}>
          <SocialProofSection />
        </ScrollReveal>
        <ScrollReveal delay={0.05}>
          <HowItWorksSection />
        </ScrollReveal>
        <ScrollReveal delay={0.05}>
          <GallerySection />
        </ScrollReveal>
        <ScrollReveal delay={0.05}>
          <FeaturesSection />
        </ScrollReveal>
        <ScrollReveal delay={0.05}>
          <TestimonialsSection />
        </ScrollReveal>
        <ScrollReveal delay={0.05}>
          <PricingSection />
        </ScrollReveal>
        <ScrollReveal delay={0.05}>
          <FaqSection />
        </ScrollReveal>
        <ScrollReveal delay={0.05}>
          <EmailCaptureSection />
        </ScrollReveal>
        <ScrollReveal delay={0.05}>
          <FinalCtaSection />
        </ScrollReveal>
      </main>
      <Footer />
    </>
  );
}
