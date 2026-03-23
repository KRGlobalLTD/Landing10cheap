'use client';

import { useEffect } from 'react';
import { FormulaireData } from '@/types/formulaire';

const STORAGE_KEY = 'siteasy_form';

export function saveFormToStorage(data: Omit<FormulaireData, 'logoFile'>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {}
}

export function loadFormFromStorage(): Partial<Omit<FormulaireData, 'logoFile'>> | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function clearFormFromStorage() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {}
}
