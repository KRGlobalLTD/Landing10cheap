'use server';

import { revalidatePath } from 'next/cache';
import { updateBrief } from '@/lib/briefs';

export type UpdateBriefNotesState = {
  status: 'idle' | 'success' | 'error';
  message: string;
  updatedAt?: string;
};

export const INITIAL_UPDATE_BRIEF_NOTES_STATE: UpdateBriefNotesState = {
  status: 'idle',
  message: ''
};

const MAX_NOTES_LENGTH = 10_000;

export async function updateBriefNotesAction(
  _previousState: UpdateBriefNotesState,
  formData: FormData
): Promise<UpdateBriefNotesState> {
  const briefId = formData.get('briefId');
  const notesRaw = formData.get('internalNotes');

  if (typeof briefId !== 'string' || briefId.trim().length === 0) {
    return {
      status: 'error',
      message: 'Identifiant du brief invalide.'
    };
  }

  if (typeof notesRaw !== 'string') {
    return {
      status: 'error',
      message: 'Valeur de notes invalide.'
    };
  }

  const internalNotes = notesRaw.slice(0, MAX_NOTES_LENGTH);

  const updatedBrief = await updateBrief(briefId, {
    internalNotes
  });

  if (!updatedBrief) {
    return {
      status: 'error',
      message: 'Brief introuvable.'
    };
  }

  revalidatePath('/admin/briefs');

  return {
    status: 'success',
    message: 'Notes internes sauvegardées.',
    updatedAt: updatedBrief.updatedAt
  };
}
