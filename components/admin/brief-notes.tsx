'use client';

import { useFormState as useActionState } from 'react-dom';
import { useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  INITIAL_UPDATE_BRIEF_NOTES_STATE,
  updateBriefNotesAction,
  type UpdateBriefNotesState
} from '@/app/admin/briefs/actions';

type BriefNotesProps = {
  briefId: string;
  initialNotes: string;
};

export function BriefNotes({ briefId, initialNotes }: BriefNotesProps) {
  const [notesValue, setNotesValue] = useState(initialNotes);
  const [state, formAction, isPending] = useActionState<UpdateBriefNotesState, FormData>(
    updateBriefNotesAction,
    INITIAL_UPDATE_BRIEF_NOTES_STATE
  );

  useEffect(() => {
    setNotesValue(initialNotes);
  }, [initialNotes]);

  const feedbackClassName = useMemo(() => {
    if (state.status === 'error') {
      return 'text-rose-400';
    }

    if (state.status === 'success') {
      return 'text-emerald-400';
    }

    return 'text-zinc-500';
  }, [state.status]);

  return (
    <form action={formAction} className="space-y-2">
      <input type="hidden" name="briefId" value={briefId} />
      <label className="block text-xs uppercase tracking-wide text-zinc-500" htmlFor={`notes-${briefId}`}>
        Notes internes
      </label>
      <textarea
        id={`notes-${briefId}`}
        name="internalNotes"
        value={notesValue}
        onChange={(event) => setNotesValue(event.target.value)}
        placeholder="Ajouter des notes de production..."
        className="min-h-24 w-full rounded-md border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 outline-none transition focus:border-zinc-600"
      />
      <div className="flex items-center justify-between gap-2">
        <p className={`text-xs ${feedbackClassName}`} role="status" aria-live="polite">
          {isPending ? 'Sauvegarde en cours...' : state.message || 'Aucune note enregistrée pour le moment.'}
        </p>
        <Button type="submit" variant="ghost" className="h-8 px-3 py-1 text-xs" disabled={isPending}>
          {isPending ? 'Sauvegarde...' : 'Sauvegarder'}
        </Button>
      </div>
    </form>
  );
}
