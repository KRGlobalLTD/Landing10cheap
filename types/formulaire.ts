export interface FormulaireData {
  // Étape 1 — Profil
  typeClient: 'particulier' | 'professionnel' | '';

  // Étape 2 — Activité (commun)
  ville: string;
  adresse: string;
  visibiliteAdresse: 'complete' | 'ville' | 'aucune' | '';

  // Étape 2 — Activité (professionnel)
  metier: string;
  metierAutre: string;
  nomEntreprise: string;

  // Étape 2 — Activité (particulier)
  typeProjet: string;

  // Étape 3 — Votre site
  objectifVisiteur: string;
  aLogo: boolean;
  logoFile: File | null;
  couleur: string;
  couleurPrincipale: string;
  palettePersonnalisee: string[];
  ton: string;

  // Photos exemples
  photosExemples: File[];

  // Étape 4 — Coordonnées
  prenom: string;
  email: string;
  telephone: string;
  aNomDeDomaine: boolean;
  nomDeDomaine: string;
  infosComplementaires: string;
  rgpd: boolean;
}

export const INITIAL_FORM_DATA: FormulaireData = {
  typeClient: '',
  ville: '',
  adresse: '',
  visibiliteAdresse: '',
  metier: '',
  metierAutre: '',
  nomEntreprise: '',
  typeProjet: '',
  objectifVisiteur: '',
  aLogo: false,
  logoFile: null,
  couleur: 'je-ne-sais-pas',
  couleurPrincipale: '',
  palettePersonnalisee: [],
  ton: '',
  photosExemples: [],
  prenom: '',
  email: '',
  telephone: '',
  aNomDeDomaine: false,
  nomDeDomaine: '',
  infosComplementaires: '',
  rgpd: false,
};
