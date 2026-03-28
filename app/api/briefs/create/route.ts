// FIXED: new route — saves the full form data to Supabase before payment, returns briefId
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createBrief } from '@/lib/briefs';
import { BRIEF_SOURCE, BRIEF_DEFAULT_STATUS } from '@/lib/constants/brief';
import { EMPTY_BRIEF_DELIVERY } from '@/lib/types/delivery';
import { captureApiException } from '@/lib/monitoring/sentry';

export const runtime = 'nodejs';

// FIXED: validates all serializable fields of FormulaireData (File objects excluded — cannot be JSON)
const formSchema = z.object({
  typeClient: z.enum(['professionnel', 'particulier', '']),
  metier: z.string().default(''),
  metierAutre: z.string().default(''),
  nomEntreprise: z.string().default(''),
  typeProjet: z.string().default(''),
  ville: z.string().default(''),
  adresse: z.string().default(''),
  visibiliteAdresse: z.string().default(''),
  objectifVisiteur: z.string().default(''),
  aLogo: z.boolean().default(false),
  couleur: z.string().default('je-ne-sais-pas'),
  couleurPrincipale: z.string().default(''),
  palettePersonnalisee: z.array(z.string()).default([]),
  ton: z.string().default(''),
  prenom: z.string().min(1, 'Le prénom est requis.'),
  email: z.string().trim().email('Email invalide.'),
  telephone: z.string().default(''),
  aNomDeDomaine: z.boolean().default(false),
  nomDeDomaine: z.string().default(''),
  infosComplementaires: z.string().default(''),
});

type FormData = z.infer<typeof formSchema>;

// FIXED: convert palette selection to a readable colors string
function buildDesiredColors(couleur: string, couleurPrincipale: string, palettePersonnalisee: string[]): string {
  if (couleur === 'personnalise') {
    const all = [couleurPrincipale, ...palettePersonnalisee].filter(Boolean);
    return all.join(', ');
  }
  if (couleur === 'je-ne-sais-pas') return '';
  return couleur; // preset palette id: 'elegant', 'nature', 'ocean', etc.
}

// FIXED: pack ville, adresse and free-text infos into activityDescription (no dedicated BriefRecord field for these)
function buildActivityDescription(data: FormData): string {
  const parts: string[] = [];
  if (data.ville) parts.push(`Ville : ${data.ville}`);
  if (data.adresse) parts.push(`Adresse : ${data.adresse}`);
  if (data.visibiliteAdresse) parts.push(`Visibilité adresse : ${data.visibiliteAdresse}`);
  if (data.infosComplementaires) parts.push(data.infosComplementaires);
  return parts.join('\n');
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = formSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Données du formulaire invalides.', details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const data = parsed.data;
    const isPro = data.typeClient === 'professionnel';

    // FIXED: create full BriefRecord in Supabase from form data
    // Fields not in the current form (targetAudience, mainOffer, heroTitle, etc.) are left empty
    const brief = await createBrief({
      status: BRIEF_DEFAULT_STATUS,
      source: BRIEF_SOURCE,
      customer: {
        fullName: data.prenom, // form collects first name only — no separate last name field
        email: data.email,
        phoneOrWhatsapp: data.telephone,
      },
      business: {
        businessName: isPro ? data.nomEntreprise : data.typeProjet,
        activityType: isPro ? data.metier : data.typeProjet,
        activityDescription: buildActivityDescription(data),
        mainGoal: data.objectifVisiteur,
        targetAudience: '', // not in current form
      },
      offer: {
        mainOffer: '',        // not in current form
        showPrice: '',        // not in current form
        mainCTA: data.objectifVisiteur,
        secondaryServices: '', // not in current form
      },
      design: {
        desiredStyle: data.ton,
        desiredColors: buildDesiredColors(data.couleur, data.couleurPrincipale, data.palettePersonnalisee),
        inspirationSite1: '', // not a separate form field (may appear in infosComplementaires)
        inspirationSite2: '', // not a separate form field
        hasLogo: data.aLogo,
        hasPhotos: false,     // File objects cannot be transmitted as JSON — assets remain empty
      },
      content: {
        heroTitle: '',        // not in current form
        subtitle: '',         // not in current form
        keyArguments: '',     // not in current form
        hasTestimonials: false, // not in current form
        wantsFAQ: false,      // not in current form
        mandatoryInformation: data.infosComplementaires,
      },
      contact: {
        publicEmail: data.email,
        publicPhone: data.telephone,
        publicWhatsapp: data.telephone,
        instagramUrl: '',    // not in current form
        facebookUrl: '',     // not in current form
        tiktokUrl: '',       // not in current form
        hasExistingDomain: data.aNomDeDomaine,
        desiredDomain: data.nomDeDomaine,
      },
      assets: {
        logoFileNames: [],   // File upload not handled via JSON — stay empty until S3/upload flow added
        photoFileNames: [],
      },
      payment: {
        stripeSessionId: null,
        paymentStatus: 'pending',
        amountTotal: null,
        currency: null,
        paidAt: null,
      },
      delivery: EMPTY_BRIEF_DELIVERY,
    });

    console.info(`[briefs/create] Brief ${brief.id} created for ${data.email}.`);

    return NextResponse.json({ briefId: brief.id }); // FIXED: return briefId to be passed through to Stripe metadata
  } catch (error) {
    captureApiException(error, { route: '/api/briefs/create', feature: 'brief_creation' });
    console.error('[briefs/create] Failed to create brief.', error);
    return NextResponse.json({ error: 'Erreur serveur lors de la sauvegarde du formulaire.' }, { status: 500 });
  }
}
