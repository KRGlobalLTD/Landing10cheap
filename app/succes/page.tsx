import { PageShell } from '@/components/shared/page-shell';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function SuccesPage() {
  return (
    <PageShell
      title="Paiement confirmé"
      description="Merci pour votre commande Landing Express 10€."
    >
      <Card className="space-y-4 bg-zinc-950 text-zinc-100">
        <p className="text-sm text-zinc-300">
          Votre paiement a été validé avec succès. Nous lançons maintenant la préparation de votre landing page 1
          page.
        </p>
        <p className="text-sm text-zinc-300">
          Livraison prévue sous 24h avec hébergement inclus. Si nous avons besoin d’une précision, nous vous
          recontacterons rapidement.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button href="/">Retour à l’accueil</Button>
          <Button href="/formulaire" variant="ghost">
            Revenir au formulaire
          </Button>
        </div>
      </Card>
    </PageShell>
  );
}
