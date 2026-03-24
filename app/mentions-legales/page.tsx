import { PageShell } from '@/components/shared/page-shell';

export default function MentionsLegalesPage() {
  return (
    <PageShell
      title="Mentions légales"
      description="Informations légales relatives à l'édition et à l'exploitation du présent site web."
    >
      <div className="space-y-10 text-sm text-muted-foreground leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-base font-semibold text-foreground">Éditeur du site</h2>
          <p>Le présent site est édité par la société <strong>KR Global Solutions LTD</strong>, société enregistrée au Royaume-Uni.</p>
          <p>Contact : <a href="mailto:contact@krglobalsolutionsltd.com" className="underline underline-offset-4 hover:text-foreground transition-colors">contact@krglobalsolutionsltd.com</a></p>
          <p>Le site propose des services digitaux accessibles en ligne, incluant la création de sites web, des solutions SaaS et des services numériques.</p>
        </section>
        <section className="space-y-3">
          <h2 className="text-base font-semibold text-foreground">Hébergement</h2>
          <p>Le site est hébergé par <strong>Vercel Inc.</strong>, 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis.</p>
        </section>
        <section className="space-y-3">
          <h2 className="text-base font-semibold text-foreground">Propriété intellectuelle</h2>
          <p>L'ensemble du contenu présent sur ce site est protégé par les lois en vigueur sur la propriété intellectuelle. Toute reproduction sans autorisation préalable écrite de KR Global Solutions LTD est strictement interdite.</p>
        </section>
        <section className="space-y-3">
          <h2 className="text-base font-semibold text-foreground">Responsabilité</h2>
          <p>KR Global Solutions LTD s'efforce d'assurer l'exactitude des informations diffusées sur le site mais ne peut être tenue responsable :</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>des dommages liés à l'utilisation du site</li>
            <li>d'une indisponibilité temporaire du service</li>
            <li>de problèmes techniques indépendants de sa volonté</li>
          </ul>
        </section>
      </div>
    </PageShell>
  );
}
