import { PageShell } from '@/components/shared/page-shell';
import { Card } from '@/components/ui/card';

export default function MentionsLegalesPage() {
  return (
    <PageShell
      title="Mentions légales"
      description="Informations légales temporaires, à personnaliser avant mise en production."
    >
      <Card className="space-y-3 text-sm text-muted">
        <p>Éditeur : Landing Express 10€ (informations complètes à compléter).</p>
        <p>Responsable de publication : à compléter.</p>
        <p>Hébergement : Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA.</p>
        <p>Contact : via la page Support et WhatsApp.</p>
      </Card>
    </PageShell>
  );
}
