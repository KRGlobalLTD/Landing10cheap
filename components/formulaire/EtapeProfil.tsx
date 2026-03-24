'use client';

import { FormulaireData } from '@/types/formulaire';
import { CardSelectable } from './CardSelectable';

const PROFILS = [
  {
    id: 'professionnel' as const,
    icon: '🏢',
    label: 'Un professionnel',
    desc: 'Artisan, commerçant, freelance, entreprise…',
  },
  {
    id: 'particulier' as const,
    icon: '👤',
    label: 'Un particulier',
    desc: 'Portfolio, blog, mariage, association…',
  },
];

const TYPES_PROJET = [
  { id: 'projet', icon: '🚀', label: 'Présenter mon projet', sub: 'Landing page, side project' },
  { id: 'passion', icon: '📝', label: 'Partager ma passion', sub: 'Blog, vlog, hobby' },
  { id: 'evenement', icon: '💍', label: 'Célébrer un événement', sub: 'Mariage, anniversaire' },
  { id: 'asso', icon: '🤝', label: 'Représenter mon asso', sub: 'Club, association' },
];

const VISIBILITE_OPTIONS = [
  { id: 'complete' as const, label: "L'adresse complète" },
  { id: 'ville' as const, label: 'Uniquement la ville' },
  { id: 'aucune' as const, label: 'Non affichée (à distance)' },
];

const inputClass =
  'w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-zinc-500 outline-none focus:border-[#AAFF00]/60 focus:bg-white/[0.07] transition-all';

interface EtapeProfilProps {
  data: FormulaireData;
  onChange: <K extends keyof FormulaireData>(key: K, value: FormulaireData[K]) => void;
}

export function EtapeProfil({ data, onChange }: EtapeProfilProps) {
  const isPro = data.typeClient === 'professionnel';
  const isParticulier = data.typeClient === 'particulier';

  return (
    <div>
      {/* Choix Pro / Particulier */}
      <p className="mb-4 text-sm text-zinc-500">Sélectionnez votre profil pour personnaliser votre formulaire.</p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {PROFILS.map((profil) => {
          const isSelected = data.typeClient === profil.id;
          return (
            <button
              key={profil.id}
              type="button"
              onClick={() => onChange('typeClient', profil.id)}
              className={`group relative flex flex-col items-start gap-3 rounded-2xl border p-6 text-left transition-all duration-200 ${
                isSelected
                  ? 'border-[#AAFF00] bg-[#1a1a1a]'
                  : 'border-white/10 bg-white/[0.03] hover:border-white/25 hover:bg-white/[0.05]'
              }`}
            >
              {isSelected && (
                <div className="absolute right-4 top-4 flex h-5 w-5 items-center justify-center rounded-full bg-[#AAFF00]">
                  <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6l3 3 5-5" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}
              <span className="text-3xl">{profil.icon}</span>
              <div>
                <p className={`text-base font-semibold ${isSelected ? 'text-[#AAFF00]' : 'text-white'}`}>
                  {profil.label}
                </p>
                <p className="mt-1 text-xs text-zinc-500">{profil.desc}</p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Séparateur + champs dynamiques */}
      {data.typeClient !== '' && (
        <>
          <div style={{ height: 1, backgroundColor: '#2a2a2a', margin: '24px 0' }} />

          {/* — PROFESSIONNEL — */}
          {isPro && (
            <div className="space-y-6">
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                <div>
                  <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-zinc-400">
                    Ville <span style={{ color: '#AAFF00' }}>*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Ex : Paris, Lyon…"
                    value={data.ville}
                    onChange={(e) => onChange('ville', e.target.value)}
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-zinc-400">
                  Adresse complète <span className="text-zinc-600 normal-case font-normal">(optionnel)</span>
                </label>
                <input
                  type="text"
                  placeholder="Ex : 12 rue de la Paix, Paris 75001"
                  value={data.adresse}
                  onChange={(e) => onChange('adresse', e.target.value)}
                  className={inputClass}
                />
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
          )}

          {/* — PARTICULIER — */}
          {isParticulier && (
            <div className="space-y-6">
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
                        <div>
                          <p className="text-sm font-medium text-white">{t.label}</p>
                          <p className="mt-0.5 text-xs" style={{ color: '#6b7280' }}>{t.sub}</p>
                        </div>
                      </div>
                    </CardSelectable>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-zinc-400">
                    Ville <span className="text-zinc-600 normal-case font-normal">(optionnel)</span>
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
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
