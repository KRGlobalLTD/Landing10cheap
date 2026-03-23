import { TrackableCta } from '@/components/analytics/trackable-cta';
import { Badge } from '@/components/ui/badge';
import { Container } from '@/components/ui/container';
import { SITE_CONFIG } from '@/lib/constants/site';

export function Hero() {
  return (
    <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden py-24">
      {/* Radial purple glow — background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 85% 60% at 50% 105%, rgba(170, 255, 0, 0.12) 0%, rgba(170, 255, 0, 0.04) 45%, transparent 68%)'
        }}
      />

      <Container>
        <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center gap-8 text-center">
          <Badge>Livrée sous {SITE_CONFIG.deliveryDelay}</Badge>

          <h1 className="text-5xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-[5.25rem]">
            Votre landing page
            <br />
            professionnelle pour{' '}
            <span
              style={{
                background: '#AAFF00',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              {SITE_CONFIG.price}
            </span>
            .
          </h1>

          <p className="max-w-md text-base text-muted md:text-lg">
            Hébergement et mise en ligne inclus. Un processus simple, sans technique, pour lancer
            votre présence en ligne rapidement.
          </p>

          <TrackableCta
            href="/formulaire"
            location="hero_primary_cta"
            className="h-12 rounded-full px-8 text-sm font-semibold"
          >
            Démarrer maintenant
          </TrackableCta>
        </div>
      </Container>
    </section>
  );
}
