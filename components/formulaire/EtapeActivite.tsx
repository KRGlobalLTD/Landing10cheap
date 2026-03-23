'use client';

import { FormulaireData } from '@/types/formulaire';
import { CardSelectable } from './CardSelectable';

const TYPES_PROJET = [
  { id: 'portfolio', icon: '🎨', label: 'Portfolio personnel' },
  { id: 'blog', icon: '✍️', label: 'Blog / Vlog' },
  { id: 'evenement', icon: '💍', label: 'Mariage / Événement' },
  { id: 'asso', icon: '🤝', label: 'Club / Association' },
  { id: 'autre', icon: '💡', label: 'Autre projet' },
];

const VISIBILITE_OPTIONS = [
  { id: 'complete' as const, label: "L'adresse complète" },
  { id: 'ville' as const, label: 'Uniquement la ville' },
  { id: 'aucune' as const, label: 'Non affichée (à distance)' },
];

const inputClass =
  'w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-zinc-500 outline-none focus:border-[#AAFF00]/60 focus:bg-white/[0.07] transition-all';

interface EtapeActiviteProps {
  data: FormulaireData;
  onChange: <K extends keyof FormulaireData>(key: K, value: FormulaireData[K]) => void;
}

export function EtapeActivite({ data, onChange }: EtapeActiviteProps) {
  const isPro = data.typeClient === 'professionnel';

  return (
    <div className="space-y-6">

      {/* — PROFESSIONNEL — */}
      {isPro && (
        <>
          {/* Métier — champ texte libre */}
          <div>
            <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-zinc-400">
              Secteur d&apos;activité <span style={{ color: '#AAFF00' }}>*</span>
            </label>
            <input
              type="text"
              placeholder="Ex : Plombier, Coiffeur, Restaurant…"
              value={data.metier}
              onChange={(e) => onChange('metier', e.target.value)}
              className={inputClass}
            />
          </div>

          {/* Nom de l'entreprise */}
          <div>
            <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-zinc-400">
              Nom de l&apos;entreprise <span style={{ color: '#AAFF00' }}>*</span>
            </label>
            <input
              type="text"
              placeholder="Ex : Le Petit Bistro, Plomberie Martin…"
              value={data.nomEntreprise}
              onChange={(e) => onChange('nomEntreprise', e.target.value)}
              className={inputClass}
            />
          </div>
        </>
      )}

      {/* — PARTICULIER — */}
      {!isPro && (
        <div>
          <label className="mb-3 block text-xs font-medium uppercase tracking-wider text-zinc-400">
            Type de projet <span style={{ color: '#AAFF00' }}>*</span>
          </label>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {TYPES_PROJET.map((t) => (
              <CardSelectable
                key={t.id}
                selected={data.typeProjet === t.id}
                onClick={() => onChange('typeProjet', t.id)}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{t.icon}</span>
                  <span className="text-sm font-medium text-white">{t.label}</span>
                </div>
              </CardSelectable>
            ))}
          </div>
        </div>
      )}

      {/* — VILLE + TÉLÉPHONE (côte à côte) — */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-zinc-400">
            Ville
            {isPro && <span style={{ color: '#AAFF00' }}> *</span>}
          </label>
          <input
            type="text"
            placeholder="Ex : Paris, Lyon…"
            value={data.ville}
            onChange={(e) => onChange('ville', e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-zinc-400">
            Téléphone <span className="text-zinc-600 normal-case font-normal">(optionnel)</span>
          </label>
          <input
            type="tel"
            placeholder="06 12 34 56 78"
            value={data.telephone}
            onChange={(e) => onChange('telephone', e.target.value)}
            className={inputClass}
          />
          <p className="mt-1.5 text-xs text-zinc-600">Votre numéro sera utilisé pour que vos clients vous contactent.</p>
        </div>
      </div>

      {/* — ADRESSE complète (commun) — */}
      <div>
        <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-zinc-400">
          Adresse complète
          {!isPro && <span className="ml-1 text-zinc-600 normal-case font-normal">(optionnel)</span>}
        </label>
        <input
          type="text"
          placeholder={isPro ? 'Ex : 12 rue de la Paix, Paris 75001' : 'Ex : Paris 15e, Bordeaux et alentours…'}
          value={data.adresse}
          onChange={(e) => onChange('adresse', e.target.value)}
          className={inputClass}
        />

        {/* Visibilité */}
        <div className="mt-3">
          <p className="mb-2 text-xs text-zinc-500">Sur mon site, l&apos;adresse affichée sera…</p>
          <div className="flex flex-col gap-2">
            {VISIBILITE_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => onChange('visibiliteAdresse', opt.id)}
                className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-sm text-left transition-all ${
                  data.visibiliteAdresse === opt.id
                    ? 'border-[#AAFF00] bg-[#1a1a1a] text-[#AAFF00]'
                    : 'border-white/10 bg-white/[0.03] text-zinc-400 hover:border-white/25'
                }`}
              >
                <span
                  className={`flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full border transition-all ${
                    data.visibiliteAdresse === opt.id ? 'border-[#AAFF00] bg-[#AAFF00]' : 'border-white/20'
                  }`}
                >
                  {data.visibiliteAdresse === opt.id && (
                    <span className="h-1.5 w-1.5 rounded-full bg-black" />
                  )}
                </span>
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
