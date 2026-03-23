import { PageShell } from '@/components/shared/page-shell';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SITE_CONFIG } from '@/lib/constants/site';

export default function SupportPage() {
  return (
    <PageShell title="Support" description="Une question avant ou après votre commande ? Nous sommes disponibles.">
      <Card className="space-y-8 p-10">
        <p className="text-base text-muted leading-relaxed">
          Le support est prévu pour les demandes rapides : informations sur l&apos;offre, suivi de livraison,
          correction mineure et questions pratiques. Notre équipe vous répond dans les meilleurs délais.
        </p>
        <Button href={SITE_CONFIG.whatsapp}>Ouvrir WhatsApp</Button>
      </Card>
    </PageShell>
  );
}
