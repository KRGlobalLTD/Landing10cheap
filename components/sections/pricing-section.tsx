import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { LetterSlide } from '@/components/ui/letter-slide';

const INCLUDED = [
  'Site web complet généré automatiquement',
  'Design unique adapté à votre activité',
  'Responsive mobile / tablette / desktop',
  'SEO optimisé dès la génération',
  'Hébergement inclus 1 an',
  'Domaine personnalisé (ou subdomain gratuit)',
  '1 révision de contenu offerte',
  'Support par e-mail'
];

const COMPARISON = [
  { item: 'Création du site', us: true, agency: true },
  { item: 'Design sur-mesure', us: true, agency: true },
  { item: 'Hébergement inclus', us: true, agency: false },
  { item: 'SEO de base', us: true, agency: false },
  { item: 'En ligne en 30 secondes', us: true, agency: false },
  { item: 'Modifications rapides', us: true, agency: false },
  { item: 'Prix transparent', us: true, agency: false }
];

export function PricingSection() {
  return (
    <section id="pricing" className="py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-xs font-medium uppercase tracking-widest text-muted/50">
            Tarif
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            <span style={{ color: '#AAFF00' }}>Un prix.</span> Un site.{' '}
            Pour toujours.
          </h2>
          <p className="mt-4 text-sm text-muted">
            Pas d&apos;abonnement, pas de frais cachés. Vous payez une fois, votre site est à vous.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-2 lg:items-stretch mx-auto max-w-4xl">
          {/* Pricing card */}
          <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-white/[0.03] p-6 flex flex-col">
            {/* Glow */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(170, 255, 0, 0.07) 0%, transparent 60%)'
              }}
            />

            <div className="relative">
              <div className="mb-4">
                <span className="rounded-full border px-3 py-1 text-xs font-medium" style={{ borderColor: '#AAFF0040', backgroundColor: '#AAFF0010', color: '#AAFF00' }}>
                  Paiement unique
                </span>
              </div>

              <div className="mb-1 flex items-end gap-2">
                <span className="text-5xl font-bold tracking-tight text-foreground">9,99€</span>
                <span className="mb-1.5 text-sm text-muted">TTC · une seule fois</span>
              </div>
              <p className="mb-6 text-sm text-muted">
                Aucun abonnement. Aucune surprise. Votre site reste en ligne.
              </p>

              <ul className="mb-6 space-y-2.5">
                {INCLUDED.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-muted">
                    <span className="mt-0.5 shrink-0" style={{ color: '#AAFF00' }}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>

              <Button href="/formulaire" className="letter-btn relative w-full h-10 rounded-xl text-sm font-semibold">
                <LetterSlide>Créer mon site maintenant</LetterSlide>
              </Button>

              <p className="mt-3 text-center text-xs text-muted/50">
                Remboursé si non satisfait sous 7 jours
              </p>
              <p className="mt-2 text-center text-xs text-muted/40">
                Besoin de fonctionnalités supplémentaires ?{' '}
                <a
                  href="https://wa.me/33743561304?text=Bonjour%2C%20je%20souhaite%20avoir%20plus%20d%E2%80%99informations%20sur%20vos%20services%20et%20les%20fonctionnalit%C3%A9s%20suppl%C3%A9mentaires."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2 transition-colors hover:text-muted"
                >
                  WhatsApp
                </a>
                {' '}ou{' '}
                <a
                  href="mailto:contact@krglobalsolutionsltd.com"
                  className="underline underline-offset-2 transition-colors hover:text-muted"
                >
                  email
                </a>
              </p>
            </div>
          </div>

          {/* Comparison table */}
          <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-white/[0.03] p-6 flex flex-col space-y-3">
            <h3 className="text-base font-semibold text-foreground">
              Pourquoi pas une agence ?
            </h3>
            <p className="text-sm text-muted">
              Une agence web facture entre 1 500€ et 8 000€ pour un site équivalent. Et encore, sans l&apos;hébergement.
            </p>

            <div className="overflow-hidden rounded-xl border border-white/8">
              {/* Header */}
              <div className="grid grid-cols-3 border-b border-white/8 bg-white/[0.02] px-4 py-2.5">
                <span className="text-xs font-medium text-muted" />
                <span className="text-center text-xs font-semibold text-foreground">Avec nous</span>
                <span className="text-center text-xs text-muted">Agence classique</span>
              </div>

              {COMPARISON.map((row, i) => (
                <div
                  key={row.item}
                  className={`grid grid-cols-3 px-4 py-2.5 ${
                    i < COMPARISON.length - 1 ? 'border-b border-white/5' : ''
                  }`}
                >
                  <span className="text-xs text-muted">{row.item}</span>
                  <span className="text-center text-xs font-medium text-accent">
                    {row.us ? '✓' : '✗'}
                  </span>
                  <span
                    className={`text-center text-xs ${row.agency ? 'text-accent font-medium' : 'text-muted/40'}`}
                  >
                    {row.agency ? '✓' : '✗'}
                  </span>
                </div>
              ))}

              {/* Price row */}
              <div className="grid grid-cols-3 border-t border-white/8 bg-white/[0.02] px-4 py-2.5">
                <span className="text-xs font-medium text-foreground">Prix</span>
                <span className="text-center text-xs font-bold text-foreground">9,99€</span>
                <span className="text-center text-xs text-muted">1 500€ – 8 000€</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
