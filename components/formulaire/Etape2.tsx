'use client';

import { useRef, useState } from 'react';
import { FormulaireData } from '@/types/formulaire';
import { CardSelectable } from './CardSelectable';

const OBJECTIFS_PRO = [
  { id: 'contacter', icon: '✉️', label: 'Être contacté', sub: 'Formulaire, email, téléphone' },
  { id: 'acheter', icon: '🛒', label: 'Vendre en ligne', sub: 'Boutique, e-commerce' },
  { id: 'visiter', icon: '📍', label: 'Recevoir des clients', sub: 'Restaurant, commerce, salon' },
  { id: 'rdv', icon: '📅', label: 'Prendre des rendez-vous', sub: 'Médecin, coach, coiffeur' },
];

const OBJECTIFS_PART = [
  { id: 'projet', icon: '🚀', label: 'Présenter mon projet', sub: 'Landing page, side project' },
  { id: 'passion', icon: '📝', label: 'Partager ma passion', sub: 'Blog, vlog, hobby' },
  { id: 'evenement', icon: '💍', label: 'Célébrer un événement', sub: 'Mariage, anniversaire' },
  { id: 'asso', icon: '🤝', label: 'Représenter mon asso', sub: 'Club, association' },
];

const PALETTES = [
  { id: 'elegant', label: 'Élégant', colors: ['#0f0f0f', '#c9a84c', '#f5f0e8', '#1a1a1a'] },
  { id: 'nature', label: 'Nature', colors: ['#1b4332', '#52b788', '#d8f3dc', '#95d5b2'] },
  { id: 'ocean', label: 'Océan', colors: ['#03045e', '#0077b6', '#90e0ef', '#caf0f8'] },
  { id: 'chaleur', label: 'Chaleur', colors: ['#370617', '#e85d04', '#f48c06', '#ffd60a'] },
  { id: 'minimaliste', label: 'Minimaliste', colors: ['#ffffff', '#e5e5e5', '#737373', '#171717'] },
  { id: 'violet', label: 'Luxe violet', colors: ['#10002b', '#5a189a', '#c77dff', '#e0aaff'] },
  { id: 'rose', label: 'Douceur', colors: ['#590d22', '#c9184a', '#ff4d6d', '#ffb3c6'] },
  { id: 'terre', label: 'Terre', colors: ['#582f0e', '#936639', '#c8a26b', '#fdf0d5'] },
];

const TONS = [
  { id: 'professionnel', label: 'Professionnel', desc: 'Sobre, rassurant' },
  { id: 'chaleureux', label: 'Chaleureux', desc: 'Accueillant, humain' },
  { id: 'moderne', label: 'Épuré / Moderne', desc: 'Minimaliste, tendance' },
  { id: 'luxe', label: 'Luxe / Premium', desc: 'Élégant, haut de gamme' },
  { id: 'dynamique', label: 'Dynamique / Sportif', desc: 'Énergique, bold' },
  { id: 'street', label: 'Street / Urban', desc: 'Brut, authentique' },
];

interface Etape2Props {
  data: FormulaireData;
  onChange: <K extends keyof FormulaireData>(key: K, value: FormulaireData[K]) => void;
}

export function Etape2({ data, onChange }: Etape2Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [customColorInput, setCustomColorInput] = useState('#3b82f6');

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      alert('Le fichier doit faire moins de 2Mo.');
      return;
    }
    onChange('logoFile', file);
  }

  return (
    <div className="space-y-8">
      {/* Objectif visiteur */}
      <div>
        <label className="mb-3 block text-xs font-medium uppercase tracking-wider text-zinc-400">
          {data.typeClient === 'particulier'
            ? <>Quel est votre objectif principal ? <span style={{ color: '#AAFF00' }}>*</span></>
            : <>Que voulez-vous que vos visiteurs fassent ? <span style={{ color: '#AAFF00' }}>*</span></>
          }
        </label>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {(data.typeClient === 'particulier' ? OBJECTIFS_PART : OBJECTIFS_PRO).map((obj) => (
            <CardSelectable
              key={obj.id}
              selected={data.objectifVisiteur === obj.id}
              onClick={() => onChange('objectifVisiteur', obj.id)}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{obj.icon}</span>
                <div>
                  <p className="text-sm font-medium text-white">{obj.label}</p>
                  <p className="mt-0.5 text-xs" style={{ color: '#6b7280' }}>{obj.sub}</p>
                </div>
              </div>
            </CardSelectable>
          ))}
        </div>
      </div>

      {/* Logo */}
      <div>
        <label className="mb-3 block text-xs font-medium uppercase tracking-wider text-zinc-400">
          Avez-vous déjà un logo ?
        </label>
        <div className="flex gap-3">
          {[true, false].map((val) => (
            <button
              key={String(val)}
              type="button"
              onClick={() => onChange('aLogo', val)}
              className={`flex-1 rounded-xl border py-3 text-sm font-medium transition-all ${
                data.aLogo === val
                  ? 'border-[#AAFF00] bg-[#1a1a1a] text-[#AAFF00]'
                  : 'border-white/10 bg-white/[0.03] text-zinc-400 hover:border-white/25'
              }`}
            >
              {val ? 'Oui' : 'Non'}
            </button>
          ))}
        </div>

        {data.aLogo && (
          <div className="mt-4">
            <input
              ref={fileInputRef}
              type="file"
              accept=".png,.jpg,.jpeg,.svg"
              className="hidden"
              onChange={handleFileChange}
            />
            {data.logoFile ? (
              <div className="flex items-center gap-4 rounded-xl border border-[#AAFF00]/30 bg-[#1a1a1a] p-4">
                <img
                  src={URL.createObjectURL(data.logoFile)}
                  alt="Logo preview"
                  className="h-12 w-12 rounded-lg object-contain bg-white/5"
                />
                <div className="flex-1 min-w-0">
                  <p className="truncate text-sm text-white">{data.logoFile.name}</p>
                  <p className="text-xs text-zinc-500">{(data.logoFile.size / 1024).toFixed(0)} Ko</p>
                </div>
                <button
                  type="button"
                  onClick={() => onChange('logoFile', null)}
                  className="text-xs text-zinc-500 hover:text-red-400 transition-colors"
                >
                  Supprimer
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full rounded-xl border border-dashed border-white/20 bg-white/[0.02] py-6 text-center text-sm text-zinc-400 hover:border-[#AAFF00]/40 hover:text-white transition-all"
              >
                <span className="block text-2xl mb-1">📎</span>
                Cliquez pour uploader votre logo
                <span className="block text-xs mt-1 text-zinc-600">PNG, JPG, SVG — max 2Mo</span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* Couleur */}
      <div>
        <label className="mb-3 block text-xs font-medium uppercase tracking-wider text-zinc-400">
          Palette de couleurs souhaitée
        </label>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {PALETTES.map((palette) => {
            const isSelected = data.couleur === palette.id;
            return (
              <button
                key={palette.id}
                type="button"
                onClick={() => onChange('couleur', palette.id)}
                className={`rounded-xl border p-3 text-left transition-all ${
                  isSelected
                    ? 'border-[#AAFF00] bg-[#1a1a1a]'
                    : 'border-white/10 bg-white/[0.03] hover:border-white/25'
                }`}
              >
                <div className="mb-2 flex gap-1">
                  {palette.colors.map((hex, i) => (
                    <div
                      key={i}
                      className="h-5 flex-1 rounded-sm"
                      style={{ backgroundColor: hex, border: hex === '#ffffff' || hex === '#f5f0e8' || hex === '#caf0f8' || hex === '#fdf0d5' ? '1px solid rgba(255,255,255,0.1)' : 'none' }}
                    />
                  ))}
                </div>
                <p className={`text-xs font-medium ${isSelected ? 'text-[#AAFF00]' : 'text-zinc-400'}`}>
                  {palette.label}
                </p>
              </button>
            );
          })}

          {/* Personnalisée */}
          <button
            type="button"
            onClick={() => onChange('couleur', 'personnalise')}
            className={`rounded-xl border p-3 text-left transition-all ${
              data.couleur === 'personnalise'
                ? 'border-[#AAFF00] bg-[#1a1a1a]'
                : 'border-white/10 bg-white/[0.03] hover:border-white/25'
            }`}
          >
            <div className="mb-2 flex gap-1 items-center">
              {data.couleur === 'personnalise' && data.palettePersonnalisee.length > 0
                ? data.palettePersonnalisee.slice(0, 4).map((hex, i) => (
                    <div key={i} className="h-5 flex-1 rounded-sm" style={{ backgroundColor: hex }} />
                  ))
                : ['#ef4444','#3b82f6','#22c55e','#f59e0b'].map((hex, i) => (
                    <div key={i} className="h-5 flex-1 rounded-sm" style={{ backgroundColor: hex }} />
                  ))
              }
            </div>
            <p className={`text-xs font-medium ${data.couleur === 'personnalise' ? 'text-[#AAFF00]' : 'text-zinc-400'}`}>
              Personnalisée
            </p>
          </button>

          {/* Je ne sais pas */}
          <button
            type="button"
            onClick={() => onChange('couleur', 'je-ne-sais-pas')}
            className={`rounded-xl border p-3 text-left transition-all ${
              data.couleur === 'je-ne-sais-pas'
                ? 'border-[#AAFF00] bg-[#1a1a1a]'
                : 'border-white/10 bg-white/[0.03] hover:border-white/25'
            }`}
          >
            <div className="mb-2 flex items-center justify-center h-5 gap-1">
              <span className="text-base">🤔</span>
            </div>
            <p className={`text-xs font-medium ${data.couleur === 'je-ne-sais-pas' ? 'text-[#AAFF00]' : 'text-zinc-400'}`}>
              Je ne sais pas
            </p>
          </button>
        </div>

        {/* Custom palette builder */}
        {data.couleur === 'personnalise' && (
          <div className="mt-4 space-y-4 rounded-xl border border-white/10 bg-white/[0.02] p-4">

            {/* Couleur principale */}
            <div>
              <p className="mb-3 text-sm font-medium text-white">
                Couleur principale <span style={{ color: '#AAFF00' }}>*</span>
              </p>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={data.couleurPrincipale || '#3b82f6'}
                  onChange={(e) => onChange('couleurPrincipale', e.target.value)}
                  className="h-10 w-10 cursor-pointer rounded-lg border border-white/10 bg-transparent p-0.5"
                />
                <input
                  type="text"
                  value={data.couleurPrincipale}
                  onChange={(e) => onChange('couleurPrincipale', e.target.value)}
                  placeholder="#3b82f6"
                  className="w-28 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm font-mono text-white placeholder:text-zinc-600 outline-none focus:border-[#AAFF00]/60 transition-all"
                />
                {data.couleurPrincipale && (
                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#AAFF00]"
                    style={{ backgroundColor: data.couleurPrincipale }}
                  />
                )}
              </div>
            </div>

            {/* Séparateur */}
            <div className="border-t border-white/[0.06]" />

            {/* Couleurs secondaires */}
            <div>
              <p className="mb-1 text-sm font-medium text-white">Couleurs secondaires</p>
              <p className="mb-3 text-xs text-zinc-500">Ajoutez jusqu&apos;à 5 couleurs complémentaires</p>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={customColorInput}
                  onChange={(e) => setCustomColorInput(e.target.value)}
                  className="h-10 w-10 cursor-pointer rounded-lg border border-white/10 bg-transparent p-0.5"
                />
                <input
                  type="text"
                  value={customColorInput}
                  onChange={(e) => setCustomColorInput(e.target.value)}
                  placeholder="#f59e0b"
                  className="w-28 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm font-mono text-white placeholder:text-zinc-600 outline-none focus:border-[#AAFF00]/60 transition-all"
                />
                <button
                  type="button"
                  onClick={() => {
                    const hex = customColorInput.trim();
                    if (!hex.match(/^#[0-9a-fA-F]{6}$/) && !hex.match(/^#[0-9a-fA-F]{3}$/)) return;
                    if (data.palettePersonnalisee.includes(hex)) return;
                    if (data.palettePersonnalisee.length >= 5) return;
                    onChange('palettePersonnalisee', [...data.palettePersonnalisee, hex]);
                  }}
                  disabled={data.palettePersonnalisee.length >= 5}
                  className="rounded-lg border border-[#AAFF00]/60 bg-[#AAFF00]/10 px-4 py-2 text-xs font-semibold text-[#AAFF00] transition-all hover:bg-[#AAFF00]/20 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  + Ajouter
                </button>
              </div>

              {data.palettePersonnalisee.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {data.palettePersonnalisee.map((hex) => (
                    <div key={hex} className="group relative">
                      <div
                        className="h-9 w-9 rounded-full border-2 border-white/20"
                        style={{ backgroundColor: hex }}
                      />
                      <button
                        type="button"
                        onClick={() => onChange('palettePersonnalisee', data.palettePersonnalisee.filter((c) => c !== hex))}
                        className="absolute -right-1 -top-1 hidden h-4 w-4 items-center justify-center rounded-full bg-zinc-800 text-[9px] text-zinc-300 group-hover:flex hover:bg-red-500/80 hover:text-white"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  {Array.from({ length: 5 - data.palettePersonnalisee.length }).map((_, i) => (
                    <div key={i} className="h-9 w-9 rounded-full border border-dashed border-white/15" />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Ton */}
      <div>
        <label className="mb-3 block text-xs font-medium uppercase tracking-wider text-zinc-400">
          Ton du site <span style={{ color: '#AAFF00' }}>*</span>
        </label>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {TONS.map((ton) => (
            <CardSelectable
              key={ton.id}
              selected={data.ton === ton.id}
              onClick={() => onChange('ton', ton.id)}
            >
              <p className="text-sm font-semibold text-white">{ton.label}</p>
              <p className="mt-0.5 text-xs text-zinc-500">{ton.desc}</p>
            </CardSelectable>
          ))}
        </div>
      </div>
    </div>
  );
}
