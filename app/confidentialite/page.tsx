import { PageShell } from '@/components/shared/page-shell';
import { Card } from '@/components/ui/card';

export default function ConfidentialitePage() {
  return (
    <PageShell
      title="Politique de confidentialité"
      description="Cadre temporaire de traitement des données pour la phase de lancement."
    >
      <Card className="space-y-3 text-sm text-muted">
        <p>Les données collectées via le formulaire serviront uniquement à produire votre landing page.</p>
        <p>Aucune revente de données n’est réalisée.</p>
        <p>Les accès techniques seront limités aux membres du projet strictement nécessaires à la livraison.</p>
        <p>Une version détaillée conforme sera publiée avant l’ouverture commerciale complète.</p>
      </Card>
    </PageShell>
  );
}
