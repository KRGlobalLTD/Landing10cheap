'use client';

import { useState } from 'react';

const FAQS = [
  {
    question: 'Combien de temps faut-il pour avoir mon site ?',
    answer: "Dès la réception de votre commande, notre équipe analyse votre dossier et travaille dessus directement. Nous nous engageons à vous fournir le site web en 24h."
  },
  {
    question: 'Suis-je propriétaire de mon site ?',
    answer: "Oui, totalement. Le site généré vous appartient. Vous pouvez l'exporter, le transférer ou en faire ce que vous voulez. Aucune clause de propriété de notre côté."
  },
  {
    question: 'Puis-je modifier mon site après la génération ?',
    answer: "Oui, vous pouvez modifier le site web après génération. Vous avez une modification mineure offerte et ensuite les autres seront facturées."
  },
  {
    question: "Et si je ne suis pas satisfait ?",
    answer: "Si vous n'êtes pas satisfait, vous pouvez contacter le support directement pour discuter avec les membres de notre équipe et voir les possibilités de modification à apporter."
  },
  {
    question: "L'hébergement est vraiment inclus pour toujours ?",
    answer: "Nous vous fournissons 1 an d'hébergement. Pour le prolonger, vous avez juste à vous rendre sur votre hébergeur et prolonger votre nom de domaine."
  },
  {
    question: 'Puis-je connecter mon propre nom de domaine ?',
    answer: "Absolument. Vous pouvez connecter un domaine que vous possédez déjà, ou en acheter un nouveau. La configuration DNS est automatique, ça prend moins de 2 minutes."
  },
  {
    question: 'Le site est-il bien référencé sur Google ?',
    answer: "Votre site est généré avec les meilleures pratiques SEO : balises méta, structure H1/H2, données structurées, sitemap et robots.txt. Vous partez sur de bonnes bases dès le départ."
  },
  {
    question: 'Comment je reçois mon site ?',
    answer: "Notre équipe crée votre site. Une fois le site créé, vous recevez un rapport par mail avec le détail complet, votre lien d'accès à votre site et votre facture."
  }
];

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(null);
  const [btnHovered, setBtnHovered] = useState(false);

  return (
    <section style={{ paddingTop: 80, paddingBottom: 80 }}>
      <div style={{ maxWidth: 900, margin: '0 auto', paddingLeft: 40, paddingRight: 40 }}>
        <div style={{ display: 'flex', gap: 60, alignItems: 'flex-start' }}>

          {/* Colonne gauche — sticky */}
          <div style={{ width: '35%', flexShrink: 0, position: 'sticky', top: 40 }}>
            <h2 style={{ fontSize: 32, fontWeight: 700, color: '#ffffff', marginBottom: 16, lineHeight: 1.2 }}>
              Questions <span style={{ color: '#AAFF00' }}>fréquentes</span>
            </h2>
            <p style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.6, marginBottom: 16 }}>
              Vous ne trouvez pas la réponse ?<br />Contactez-nous.
            </p>
            <button
              onMouseEnter={() => setBtnHovered(true)}
              onMouseLeave={() => setBtnHovered(false)}
              style={{
                backgroundColor: 'transparent',
                border: `1px solid ${btnHovered ? '#AAFF00' : '#2a2a2a'}`,
                color: '#ffffff',
                borderRadius: 8,
                padding: '10px 20px',
                fontSize: 14,
                cursor: 'pointer',
                transition: 'border-color 200ms',
              }}
            >
              Nous contacter
            </button>
          </div>

          {/* Colonne droite — accordion */}
          <div style={{ flex: 1, minWidth: 0 }}>
            {FAQS.map((faq, i) => (
              <div key={i} style={{ borderBottom: '1px solid #1f1f1f' }}>
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 16,
                    paddingTop: 18,
                    paddingBottom: 18,
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  <span style={{ fontSize: 15, color: open === i ? '#AAFF00' : '#ffffff', fontWeight: 500, transition: 'color 200ms' }}>
                    {faq.question}
                  </span>
                  <svg
                    width="16" height="16" viewBox="0 0 16 16" fill="none"
                    style={{ flexShrink: 0, transform: open === i ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 200ms' }}
                  >
                    <path d="M3 6l5 5 5-5" stroke="#AAFF00" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <div style={{ overflow: 'hidden', maxHeight: open === i ? 300 : 0, transition: 'max-height 200ms ease' }}>
                  <div style={{ backgroundColor: '#0d0d0d', borderRadius: 8, padding: '14px 16px', marginBottom: 18 }}>
                    <p style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.6, margin: 0 }}>{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
