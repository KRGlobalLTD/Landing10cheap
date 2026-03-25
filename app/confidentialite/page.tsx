import type { Metadata } from 'next';
import { PageShell } from '@/components/shared/page-shell';

export const metadata: Metadata = {
  title: 'Politique de confidentialité',
  description: 'Comment KR Global Solutions LTD collecte, utilise et protège vos données personnelles.',
  alternates: { canonical: '/confidentialite' },
};

export default function ConfidentialitePage() {
  return (
    <PageShell
      title="Politique de confidentialité"
      description="KR Global Solutions LTD accorde une importance particulière à la protection des données personnelles des utilisateurs."
    >
      <div className="space-y-10 text-sm text-muted leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-base font-semibold text-foreground">Données collectées</h2>
          <p>Nous pouvons collecter les informations suivantes :</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>nom et adresse email</li>
            <li>informations de paiement</li>
            <li>données de navigation (adresse IP, logs techniques)</li>
          </ul>
        </section>
        <section className="space-y-3">
          <h2 className="text-base font-semibold text-foreground">Utilisation des données</h2>
          <p>Les données collectées sont utilisées pour fournir et améliorer les services, traiter les paiements, assurer le support client et améliorer l&apos;expérience utilisateur.</p>
        </section>
        <section className="space-y-3">
          <h2 className="text-base font-semibold text-foreground">Outils et services tiers</h2>
          <p>Nous utilisons des outils tiers nécessaires au fonctionnement du service :</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Stripe</strong> — paiement sécurisé</li>
            <li><strong>Supabase</strong> — base de données</li>
            <li><strong>Vercel</strong> — hébergement</li>
            <li><strong>Cloudflare</strong> — sécurité et performance</li>
            <li><strong>WhatsApp</strong> — communication client</li>
            <li><strong>Calendly</strong> — prise de rendez-vous</li>
          </ul>
        </section>
        <section className="space-y-3">
          <h2 className="text-base font-semibold text-foreground">Conservation des données</h2>
          <p>Les données sont conservées uniquement pendant la durée nécessaire à la fourniture du service et au respect des obligations légales.</p>
        </section>
        <section className="space-y-3">
          <h2 className="text-base font-semibold text-foreground">Droits des utilisateurs</h2>
          <p>Conformément aux réglementations en vigueur, vous disposez des droits d&apos;accès, de rectification et de suppression de vos données.</p>
          <p>Toute demande peut être envoyée à : <a href="mailto:support@krglobalsolutionsltd.com" className="underline underline-offset-4 hover:text-foreground transition-colors">support@krglobalsolutionsltd.com</a></p>
        </section>
      </div>
    </PageShell>
  );
}
