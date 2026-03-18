import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { SITE_CONFIG } from '@/lib/constants/site';

export function Hero() {
  return (
    <section className="py-20 md:py-24">
      <Container>
        <div className="mx-auto flex max-w-3xl flex-col items-start gap-6">
          <Badge>Livrée sous {SITE_CONFIG.deliveryDelay}</Badge>
          <h1 className="text-4xl font-semibold tracking-tight text-foreground md:text-6xl">
            Votre landing page simple et professionnelle pour {SITE_CONFIG.price}
          </h1>
          <p className="text-base text-muted md:text-lg">
            Hébergement et mise en ligne inclus. Un processus simple, sans technique, pour lancer votre présence en ligne
            rapidement.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button href="/formulaire">Démarrer maintenant</Button>
            <Button href="/support" variant="ghost">
              Poser une question
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
