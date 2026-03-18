import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PageShell } from '@/components/shared/page-shell';

export default function FormulairePage() {
  return (
    <PageShell
      title="Formulaire client"
      description="Cette page accueillera bientôt le formulaire complet pour collecter vos besoins."
    >
      <Card className="space-y-4">
        <p className="text-sm text-muted">
          Vous pourrez ici décrire votre activité, votre offre, vos objectifs et vos contenus. Cette base sera ensuite
          connectée à Stripe, Supabase, Resend et à la génération PDF dans les prochaines étapes.
        </p>
        <Button href="/support" variant="ghost">
          Contacter le support WhatsApp
        </Button>
      </Card>
    </PageShell>
  );
}
