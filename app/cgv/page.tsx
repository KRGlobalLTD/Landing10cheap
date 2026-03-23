import { PageShell } from '@/components/shared/page-shell';
import { Card } from '@/components/ui/card';

export default function CgvPage() {
  return (
    <PageShell title="Conditions Générales de Vente" description="Version temporaire des CGV en attendant la version finale.">
      <Card className="space-y-3 text-sm text-muted">
        <p>Offre : création d’une landing page 1 page au prix fixe de 10 €.</p>
        <p>Délai : mise en ligne en 30 secondes après réception des éléments nécessaires.</p>
        <p>Périmètre : hébergement et mise en ligne inclus, 1 correction mineure offerte.</p>
        <p>Exclusions : fonctionnalités avancées, dashboard, authentification et intégrations complexes.</p>
      </Card>
    </PageShell>
  );
}
