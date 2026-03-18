import { PageShell } from '@/components/shared/page-shell';
import { Card } from '@/components/ui/card';

export default function RemboursementPage() {
  return (
    <PageShell
      title="Politique de remboursement"
      description="Informations temporaires sur les conditions de remboursement de l’offre."
    >
      <Card className="space-y-3 text-sm text-muted">
        <p>Le service étant une prestation numérique à exécution rapide, le remboursement n’est pas automatique.</p>
        <p>Chaque demande est étudiée au cas par cas en fonction de l’avancement de la prestation.</p>
        <p>Si aucun travail n’a débuté, une annulation peut être envisagée.</p>
        <p>Pour toute demande, contactez le support via WhatsApp.</p>
      </Card>
    </PageShell>
  );
}
