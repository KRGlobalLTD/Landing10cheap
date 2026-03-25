import type { Metadata } from 'next';
import { PageShell } from '@/components/shared/page-shell';

export const metadata: Metadata = {
  title: 'Politique de remboursement',
  description: 'Conditions et procédure de remboursement pour les services KR Global Solutions LTD.',
  alternates: { canonical: '/remboursement' },
};

export default function RemboursementPage() {
  return (
    <PageShell
      title="Politique de remboursement"
      description="KR Global Solutions LTD s'engage à traiter toute demande de remboursement de manière équitable et transparente."
    >
      <div className="space-y-10 text-sm text-muted leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-base font-semibold text-foreground">Délai</h2>
          <p>Une demande de remboursement peut être effectuée dans un délai de <strong>7 jours</strong> suivant la date d&apos;achat.</p>
        </section>
        <section className="space-y-3">
          <h2 className="text-base font-semibold text-foreground">Conditions d&apos;éligibilité</h2>
          <p>Un remboursement est possible uniquement si :</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>le service n&apos;a pas été livré dans le délai convenu</li>
            <li>le service fourni est non conforme à la commande passée</li>
          </ul>
        </section>
        <section className="space-y-3">
          <h2 className="text-base font-semibold text-foreground">Exclusions</h2>
          <p>Aucun remboursement ne sera accordé si :</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>le service a été correctement livré</li>
            <li>le service a été utilisé par le client</li>
            <li>la demande est effectuée au-delà du délai de 7 jours</li>
          </ul>
        </section>
        <section className="space-y-3">
          <h2 className="text-base font-semibold text-foreground">Procédure</h2>
          <p>Toute demande doit être adressée à : <a href="mailto:support@krglobalsolutionsltd.com" className="underline underline-offset-4 hover:text-foreground transition-colors">support@krglobalsolutionsltd.com</a></p>
          <p>La demande doit inclure le numéro de commande, la date d&apos;achat et le motif détaillé.</p>
        </section>
        <section className="space-y-3">
          <h2 className="text-base font-semibold text-foreground">Traitement</h2>
          <p>Après validation, le remboursement est effectué via le moyen de paiement initial (Stripe) dans un délai raisonnable.</p>
        </section>
      </div>
    </PageShell>
  );
}
