import { generateBriefPdf } from '@/lib/pdf/brief-pdf';
import type { BriefPdfContent } from '@/lib/pdf/render-brief-pdf';

function buildGuideClientContent(): BriefPdfContent {
  return {
    title: 'Guide client - Gerer et faire evoluer votre site',
    subtitle: 'KR Global Solutions LTD - contact@krglobalsolutionsltd.com',
    sections: [
      {
        title: '1. Felicitations - votre site est en ligne',
        bullets: [
          'Votre site web est maintenant en ligne et accessible. Felicitations !',
          'Vous etes proprietaire a 100% de votre site : le code source, le contenu et les donnees vous appartiennent.',
          'Conservez precisement le lien de votre site et tous les acces fournis lors de la livraison.'
        ]
      },
      {
        title: '2. Acceder a votre site et le partager',
        bullets: [
          "Le lien de votre site vous a ete envoye par email lors de la livraison. Bookmarkez-le.",
          "Partagez ce lien sur vos cartes de visite, reseaux sociaux, email, WhatsApp et devis.",
          "Testez votre site depuis un telephone, une tablette et un ordinateur pour verifier son rendu.",
          "Sur mobile, vous pouvez l'ajouter a votre ecran d'accueil comme une application."
        ]
      },
      {
        title: '3. Gerer votre site (modifications, mises a jour)',
        bullets: [
          'Une correction mineure est incluse dans votre offre. Contactez-nous pour en beneficier.',
          'Pour des modifications plus importantes (textes, images, sections), consultez la grille tarifaire jointe.',
          'Toute demande de modification doit etre precisee clairement : indiquez la section, le texte actuel et le texte souhaite.',
          'Nous traitons les demandes dans les meilleurs delais et vous confirmons la modification par retour.'
        ]
      },
      {
        title: '4. Nom de domaine - pourquoi et comment',
        bullets: [
          "Un nom de domaine est votre adresse personnalisee sur internet (ex : monautoentreprise.fr).",
          'Sans nom de domaine, votre site utilise une URL technique. Avec un domaine, vous professionnalisez votre image.',
          "Ou acheter un domaine : OVH, Gandi, Namecheap - comptez entre 10 et 20 EUR/an pour un .fr ou .com.",
          "Une fois achete, transmettez-nous votre domaine et nous nous occupons de la connexion a votre site.",
          "Le domaine vous appartient et est independant de votre site : vous pouvez le conserver meme si vous changez de prestataire."
        ]
      },
      {
        title: '5. GitHub - votre coffre-fort de code',
        bullets: [
          "GitHub est la plateforme de reference pour stocker et gerer le code source de votre site.",
          "Si vous avez recu un acces GitHub pour votre projet, vous etes proprietaire du code.",
          "Creez un compte gratuit sur github.com. Vous pourrez y consulter et exporter votre code a tout moment.",
          "Votre depot GitHub est votre sauvegarde : meme si le site est hors ligne, le code reste disponible.",
          "Un developpeur tiers peut reprendre votre projet depuis GitHub sans repartir de zero."
        ]
      },
      {
        title: '6. Etre proprietaire a 100%',
        bullets: [
          "Domaine : achete a votre nom, chez un registrar de votre choix (OVH, Namecheap...).",
          "Code source : stocke sur votre compte GitHub personnel.",
          "Hebergement : votre site tourne sur des serveurs professionnels (Vercel). Acces transmettre sur demande.",
          "Contenu : tous vos textes et images vous appartiennent. Aucune exclusivite de notre part.",
          "En cas de besoin, vous pouvez confier votre projet a un autre prestataire avec toutes les cles en main."
        ]
      },
      {
        title: '7. Utiliser l\'IA pour faire evoluer votre site',
        bullets: [
          "ChatGPT (chat.openai.com) vous aide a rediger des textes, titres, descriptions, et idees de contenu.",
          "Exemple de prompt utile : 'Ecris un texte de 3 lignes qui presente mon activite de coiffure pour une landing page.'",
          "L'IA peut aussi vous proposer des idees de nouvelles sections : FAQ, temoignages, blog, offres speciales.",
          "Pour des modifications de code, decrivez simplement ce que vous voulez : nous traiterons la demande.",
          "Claude.ai et Gemini sont d'autres IA utiles pour generer du contenu ou reformuler vos textes."
        ]
      },
      {
        title: '8. Demander des modifications',
        bullets: [
          "WhatsApp : contactez-nous directement sur +33 7 43 56 13 04 pour toute question rapide.",
          "Calendly : reservez un appel gratuit de 30 minutes sur calendly.com/krglobalsolutionsltd/30-minute-meeting-clone",
          "Email : support@krglobalsolutionsltd.com pour toute demande ecrite detaillee.",
          "Lors de votre demande, precisez : la section concernee, ce que vous voulez modifier, et si vous avez des visuels.",
          "Toute demande superieure a la correction mineure incluse sera traitee selon la grille tarifaire jointe."
        ]
      },
      {
        title: '9. Conclusion - nous restons disponibles',
        bullets: [
          "Votre site est un outil vivant : faites-le evoluer avec votre activite.",
          "N'hesitez pas a nous contacter pour des ajouts, des ameliorations ou simplement des conseils.",
          "Nous sommes disponibles pour vous accompagner a chaque etape de votre developpement digital.",
          "Merci pour votre confiance. KR Global Solutions LTD."
        ]
      }
    ]
  };
}

export async function generateGuideClientPdf(): Promise<Uint8Array> {
  return generateBriefPdf(buildGuideClientContent());
}
