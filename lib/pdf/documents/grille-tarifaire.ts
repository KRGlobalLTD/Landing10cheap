import { generateBriefPdf } from '@/lib/pdf/brief-pdf';
import type { BriefPdfContent } from '@/lib/pdf/render-brief-pdf';

function buildGrilleTarifaireContent(): BriefPdfContent {
  return {
    title: 'Grille tarifaire - Ajouts et evolutions',
    subtitle: 'KR Global Solutions LTD - orders@krglobalsolutionsltd.com - Prix indicatifs HT',
    sections: [
      {
        title: 'Contenu et textes',
        fields: [
          { label: 'Modification texte ou image', value: 'A partir de 29 EUR' },
          { label: 'Ajout de section simple', value: 'A partir de 79 EUR' },
          { label: 'Nouvelle page complete', value: 'A partir de 149 EUR' },
          { label: 'Ajout FAQ', value: 'A partir de 79 EUR' },
          { label: 'Blog (structure + 3 articles)', value: 'A partir de 299 EUR' }
        ]
      },
      {
        title: 'Fonctionnalites et integrations',
        fields: [
          { label: 'Formulaire de contact', value: 'A partir de 99 EUR' },
          { label: 'Prise de rendez-vous en ligne', value: 'A partir de 149 EUR' },
          { label: 'Connexion WhatsApp Business', value: 'A partir de 49 EUR' },
          { label: 'Fonctionnalite avancee sur mesure', value: 'Sur devis' }
        ]
      },
      {
        title: 'Performance et visibilite',
        fields: [
          { label: 'Optimisation SEO de base', value: 'A partir de 199 EUR' },
          { label: 'Optimisation conversion (CTA, tunnel)', value: 'A partir de 249 EUR' }
        ]
      },
      {
        title: 'Maintenance',
        fields: [
          { label: 'Intervention ponctuelle', value: 'A partir de 99 EUR/intervention' },
          { label: 'Maintenance mensuelle', value: 'A partir de 149 EUR/mois' }
        ]
      },
      {
        title: 'Informations importantes',
        bullets: [
          "Tous les tarifs sont indicatifs et peuvent varier selon la complexite du projet.",
          "Un devis precis vous sera fourni avant tout commencement de travaux.",
          "Aucune facturation sans validation explicite de votre part.",
          "Les delais de livraison sont convenus lors de la commande.",
          "Possibilite de pack evolutif : contactez-nous pour un forfait adapte a vos besoins."
        ]
      },
      {
        title: 'Nous contacter',
        fields: [
          { label: 'Email', value: 'orders@krglobalsolutionsltd.com' },
          { label: 'WhatsApp', value: '+33 7 43 56 13 04' },
          { label: 'Appel 30 min (gratuit)', value: 'calendly.com/krglobalsolutionsltd/30-minute-meeting-clone' }
        ]
      }
    ]
  };
}

export async function generateGrilleTarifairePdf(): Promise<Uint8Array> {
  return generateBriefPdf(buildGrilleTarifaireContent());
}
