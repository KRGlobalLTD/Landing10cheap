'use client';

import { FormulaireData } from '@/types/formulaire';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface Etape3Props {
  data: FormulaireData;
  onChange: <K extends keyof FormulaireData>(key: K, value: FormulaireData[K]) => void;
  touched: Record<string, boolean>;
  onBlur: (field: string) => void;
}

const inputClass = 'w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-zinc-500 outline-none focus:border-[#AAFF00]/60 focus:bg-white/[0.07] transition-all';
const errorClass = 'mt-1.5 text-xs text-red-400';

export function Etape3({ data, onChange, touched, onBlur }: Etape3Props) {
  const emailInvalid = touched.email && data.email.length > 0 && !EMAIL_REGEX.test(data.email);
  const charCount = data.infosComplementaires.length;

  return (
    <div className="space-y-6">
      {/* Prénom */}
      <div>
        <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-zinc-400">
          Prénom <span style={{ color: '#AAFF00' }}>*</span>
        </label>
        <input
          type="text"
          placeholder="Votre prénom"
          value={data.prenom}
          onChange={(e) => onChange('prenom', e.target.value)}
          className={inputClass}
        />
      </div>

      {/* Email */}
      <div>
        <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-zinc-400">
          Email <span style={{ color: '#AAFF00' }}>*</span>
        </label>
        <input
          type="email"
          placeholder="votre@email.fr"
          value={data.email}
          onChange={(e) => onChange('email', e.target.value)}
          onBlur={() => onBlur('email')}
          className={`${inputClass} ${emailInvalid ? 'border-red-500/60' : ''}`}
        />
        {emailInvalid && <p className={errorClass}>Format d&apos;email invalide.</p>}
      </div>

      {/* Nom de domaine */}
      <div>
        <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-zinc-400">
          Avez-vous un nom de domaine ?
        </label>
        <div className="flex gap-3">
          {[true, false].map((val) => (
            <button
              key={String(val)}
              type="button"
              onClick={() => onChange('aNomDeDomaine', val)}
              className={`flex-1 rounded-xl border py-3 text-sm font-medium transition-all ${
                data.aNomDeDomaine === val
                  ? 'border-[#AAFF00] bg-[#1a1a1a] text-[#AAFF00]'
                  : 'border-white/10 bg-white/[0.03] text-zinc-400 hover:border-white/25'
              }`}
            >
              {val ? 'Oui' : 'Non'}
            </button>
          ))}
        </div>
        {data.aNomDeDomaine && (
          <input
            type="text"
            placeholder="Ex : monsite.fr"
            value={data.nomDeDomaine}
            onChange={(e) => onChange('nomDeDomaine', e.target.value)}
            className={`mt-3 ${inputClass}`}
          />
        )}
      </div>

      {/* Infos complémentaires */}
      <div>
        <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-zinc-400">
          Informations complémentaires <span className="text-zinc-600 normal-case font-normal">(optionnel)</span>
        </label>
        <textarea
          rows={4}
          maxLength={500}
          placeholder="Décrivez votre activité, vos attentes, des références de sites que vous aimez…"
          value={data.infosComplementaires}
          onChange={(e) => onChange('infosComplementaires', e.target.value)}
          className={`${inputClass} resize-none`}
        />
        <p className={`mt-1 text-right text-xs ${charCount > 450 ? 'text-amber-400' : 'text-zinc-600'}`}>
          {charCount} / 500
        </p>
      </div>

      {/* RGPD */}
      <label className="flex cursor-pointer items-start gap-3">
        <div className="relative mt-0.5 flex-shrink-0">
          <input
            type="checkbox"
            checked={data.rgpd}
            onChange={(e) => onChange('rgpd', e.target.checked)}
            className="sr-only"
          />
          <div
            className={`h-5 w-5 rounded border transition-all ${
              data.rgpd ? 'border-[#AAFF00] bg-[#AAFF00]' : 'border-white/20 bg-transparent'
            }`}
          >
            {data.rgpd && (
              <svg className="h-5 w-5 p-0.5" viewBox="0 0 20 20" fill="none">
                <path d="M4 10l4 4 8-8" stroke="#000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </div>
        </div>
        <span className="text-sm text-zinc-400 leading-relaxed">
          J&apos;accepte que mes données soient utilisées pour la création de mon site.{' '}
          <span style={{ color: '#AAFF00' }}>*</span>
        </span>
      </label>
    </div>
  );
}
