'use client';

import { Container } from '@/components/ui/container';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';

const FAQS = [
  {
    question: 'Combien de temps faut-il pour avoir mon site ?',
    answer:
      "Dès la réception de votre commande, notre équipe analyse votre dossier et travaille dessus directement. Nous nous engageons à vous fournir le site web en 24h."
  },
  {
    question: 'Suis-je propriétaire de mon site ?',
    answer:
      "Oui, totalement. Le site généré vous appartient. Vous pouvez l'exporter, le transférer ou en faire ce que vous voulez. Aucune clause de propriété de notre côté."
  },
  {
    question: 'Puis-je modifier mon site après la génération ?',
    answer:
      "Oui, vous pouvez modifier le site web après génération. Vous avez une modification mineure offerte et ensuite les autres seront facturées."
  },
  {
    question: "Et si je ne suis pas satisfait ?",
    answer:
      "Si vous n'êtes pas satisfait, vous pouvez contacter le support directement pour discuter avec les membres de notre équipe et voir les possibilités de modification à apporter."
  },
  {
    question: "L'hébergement est vraiment inclus pour toujours ?",
    answer:
      "Nous vous fournissons 1 an d'hébergement. Pour le prolonger, vous avez juste à vous rendre sur votre hébergeur et prolonger votre nom de domaine."
  },
  {
    question: 'Puis-je connecter mon propre nom de domaine ?',
    answer:
      "Absolument. Vous pouvez connecter un domaine que vous possédez déjà, ou en acheter un nouveau. La configuration DNS est automatique, ça prend moins de 2 minutes."
  },
  {
    question: 'Le site est-il bien référencé sur Google ?',
    answer:
      "Votre site est généré avec les meilleures pratiques SEO : balises méta, structure H1/H2, données structurées, sitemap et robots.txt. Vous partez sur de bonnes bases dès le départ."
  },
  {
    question: 'Comment je reçois mon site ?',
    answer:
      "Notre équipe crée votre site. Une fois le site créé, vous recevez un rapport par mail avec le détail complet, votre lien d'accès à votre site et votre facture."
  }
];

export function FaqSection() {
  return (
    <section className="py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-xs font-medium uppercase tracking-widest text-muted/50">FAQ</p>
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Les questions qu&apos;on nous pose{' '}
            <span style={{ color: '#AAFF00' }}>tout le temps.</span>
          </h2>
        </div>

        <div className="mx-auto mt-14 max-w-2xl">
          <Accordion type="single" collapsible className="space-y-0">
            {FAQS.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-left text-sm font-medium text-foreground [&[data-state=open]]:text-[#AAFF00]">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Container>
    </section>
  );
}
