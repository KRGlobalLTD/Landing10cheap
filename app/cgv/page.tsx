import type { Metadata } from 'next';
import { PageShell } from '@/components/shared/page-shell';

export const metadata: Metadata = {
  title: 'Conditions Générales de Vente',
  description: 'Conditions générales de vente des services digitaux proposés par KR Global Solutions LTD.',
  alternates: { canonical: '/cgv' },
};

export default function CgvPage() {
  return (
    <PageShell
      title="Conditions Générales de Vente"
      description="Les présentes conditions régissent les ventes de services digitaux proposés par KR Global Solutions LTD."
    >
      <div className="space-y-10 text-sm text-muted leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-base font-semibold text-foreground">Objet</h2>
          <p>Les présentes conditions définissent les droits et obligations de KR Global Solutions LTD et de ses clients dans le cadre de la vente de services digitaux.</p>
        </section>
        <section className="space-y-3">
          <h2 className="text-base font-semibold text-foreground">Services</h2>
          <p>Les services proposés incluent notamment :</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>création de sites web</li>
            <li>solutions digitales</li>
            <li>services en ligne</li>
          </ul>
        </section>
        <section className="space-y-3">
          <h2 className="text-base font-semibold text-foreground">Commande</h2>
          <p>Toute commande implique l&apos;acceptation sans réserve des présentes conditions. La commande est confirmée dès réception du paiement.</p>
        </section>
        <section className="space-y-3">
          <h2 className="text-base font-semibold text-foreground">Prix</h2>
          <p>Les prix sont indiqués en euros (€) TTC. KR Global Solutions LTD se réserve le droit de modifier ses tarifs à tout moment. Le prix applicable est celui en vigueur au moment de la commande.</p>
        </section>
        <section className="space-y-3">
          <h2 className="text-base font-semibold text-foreground">Paiement</h2>
          <p>Le paiement est sécurisé et effectué via <strong>Stripe</strong>. Le règlement complet est exigible au moment de la commande.</p>
        </section>
        <section className="space-y-3">
          <h2 className="text-base font-semibold text-foreground">Livraison</h2>
          <p>Les services sont fournis sous format digital dans un délai variable selon la prestation, généralement sous quelques jours ouvrés à compter de la confirmation de commande.</p>
        </section>
        <section className="space-y-3">
          <h2 className="text-base font-semibold text-foreground">Responsabilité</h2>
          <p>KR Global Solutions LTD ne peut être tenue responsable d&apos;une mauvaise utilisation des services, de pertes indirectes ou de problèmes liés à des services tiers.</p>
        </section>
        <section className="space-y-3">
          <h2 className="text-base font-semibold text-foreground">Modification des conditions</h2>
          <p>KR Global Solutions LTD se réserve le droit de modifier les présentes conditions à tout moment. Les nouvelles conditions s&apos;appliquent dès leur publication sur le site.</p>
        </section>
      </div>
    </PageShell>
  );
}
