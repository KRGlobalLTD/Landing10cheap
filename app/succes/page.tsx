import { PageShell } from '@/components/shared/page-shell';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function SuccesPage() {
  return (
    <PageShell
      title="Commande confirmée"
      description="Votre demande a bien été prise en compte. Merci pour votre confiance."
    >
      <Card className="space-y-4">
        <p className="text-sm text-muted">
          Cette page de confirmation sera reliée au flux de paiement lors de l’intégration Stripe. Vous recevrez les
          prochaines instructions pour transmettre vos informations.
        </p>
        <Button href="/formulaire">Accéder au formulaire</Button>
      </Card>
    </PageShell>
  );
}
