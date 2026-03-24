import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { LetterSlide } from '@/components/ui/letter-slide';

export function FinalCtaSection() {
  return (
    <section className="relative overflow-hidden py-28">
      {/* Glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 70% at 50% 50%, rgba(170, 255, 0, 0.08) 0%, rgba(170, 255, 0, 0.03) 50%, transparent 75%)'
        }}
      />

      <Container>
        <div className="relative mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            Votre site est à{' '}
            <span
              style={{
                background: '#AAFF00',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              3 questions
            </span>{' '}
            de vous.
          </h2>

          <p className="mt-6 text-base text-muted md:text-lg">
            Rejoignez les 2 400+ créateurs qui ont lancé leur présence en ligne en quelques minutes.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button
              href="/formulaire"
              className="letter-btn relative h-14 w-full rounded-full px-10 text-base font-semibold sm:w-auto"
            >
              <LetterSlide>Créer mon site — 14,99€</LetterSlide>
            </Button>
          </div>

          {/* Reassurance */}
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-xs text-muted/50">
            <span className="flex items-center gap-1.5">
              <span style={{ color: '#AAFF00' }}>✓</span>
              Remboursé si non satisfait sous 7 jours
            </span>
            <span className="flex items-center gap-1.5">
              <span style={{ color: '#AAFF00' }}>✓</span>
              Hébergement inclus à vie
            </span>
            <span className="flex items-center gap-1.5">
              <span style={{ color: '#AAFF00' }}>✓</span>
              Paiement sécurisé
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}
