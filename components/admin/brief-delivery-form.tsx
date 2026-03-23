'use client';

import { useFormState as useActionState } from 'react-dom';
import { useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  INITIAL_SEND_BRIEF_DELIVERY_STATE,
  INITIAL_UPDATE_BRIEF_DELIVERY_STATE,
  sendBriefDeliveryAction,
  updateBriefDeliveryAction,
  type SendBriefDeliveryState,
  type UpdateBriefDeliveryState
} from '@/app/admin/briefs/actions';
import type { BriefDelivery } from '@/lib/types/delivery';

type BriefDeliveryFormProps = {
  briefId: string;
  initialDelivery: BriefDelivery;
};

type DeliveryDraft = Omit<BriefDelivery, 'deliveredAt' | 'deliveryEmailSentAt'>;

function toDraft(delivery: BriefDelivery): DeliveryDraft {
  return {
    siteUrl: delivery.siteUrl,
    adminUrl: delivery.adminUrl,
    githubUrl: delivery.githubUrl,
    vercelUrl: delivery.vercelUrl,
    supportEmail: delivery.supportEmail,
    supportWhatsapp: delivery.supportWhatsapp,
    customMessage: delivery.customMessage
  };
}

export function BriefDeliveryForm({ briefId, initialDelivery }: BriefDeliveryFormProps) {
  const [draft, setDraft] = useState<DeliveryDraft>(toDraft(initialDelivery));

  const [saveState, saveAction, isSaving] = useActionState<UpdateBriefDeliveryState, FormData>(
    updateBriefDeliveryAction,
    INITIAL_UPDATE_BRIEF_DELIVERY_STATE
  );
  const [sendState, sendAction, isSending] = useActionState<SendBriefDeliveryState, FormData>(
    sendBriefDeliveryAction,
    INITIAL_SEND_BRIEF_DELIVERY_STATE
  );

  useEffect(() => {
    setDraft(toDraft(initialDelivery));
  }, [initialDelivery]);

  const saveFeedbackClassName = useMemo(() => {
    if (saveState.status === 'error') {
      return 'text-rose-400';
    }

    if (saveState.status === 'success') {
      return 'text-emerald-400';
    }

    return 'text-zinc-500';
  }, [saveState.status]);

  const sendFeedbackClassName = useMemo(() => {
    if (sendState.status === 'error') {
      return 'text-rose-400';
    }

    if (sendState.status === 'success') {
      return 'text-emerald-400';
    }

    return 'text-zinc-500';
  }, [sendState.status]);

  const alreadySent = Boolean(initialDelivery.deliveryEmailSentAt);

  return (
    <div className="space-y-3 rounded-md border border-zinc-800 bg-zinc-900/60 p-3">
      <p className="text-xs uppercase tracking-wide text-zinc-500">Livraison client</p>

      <form action={saveAction} className="space-y-2">
        <input type="hidden" name="briefId" value={briefId} />

        <label className="block space-y-1 text-xs text-zinc-300">
          <span className="uppercase tracking-wide text-zinc-500">Lien site (requis pour l’envoi)</span>
          <input
            name="siteUrl"
            value={draft.siteUrl}
            onChange={(event) => setDraft((current) => ({ ...current, siteUrl: event.target.value }))}
            placeholder="https://..."
            className="h-9 w-full rounded-md border border-zinc-800 bg-zinc-900 px-3 text-sm text-zinc-100 outline-none transition focus:border-zinc-600"
          />
        </label>

        <div className="grid gap-2 sm:grid-cols-2">
          <label className="block space-y-1 text-xs text-zinc-300">
            <span className="uppercase tracking-wide text-zinc-500">Admin URL</span>
            <input
              name="adminUrl"
              value={draft.adminUrl}
              onChange={(event) => setDraft((current) => ({ ...current, adminUrl: event.target.value }))}
              placeholder="https://..."
              className="h-9 w-full rounded-md border border-zinc-800 bg-zinc-900 px-3 text-sm text-zinc-100 outline-none transition focus:border-zinc-600"
            />
          </label>

          <label className="block space-y-1 text-xs text-zinc-300">
            <span className="uppercase tracking-wide text-zinc-500">GitHub URL</span>
            <input
              name="githubUrl"
              value={draft.githubUrl}
              onChange={(event) => setDraft((current) => ({ ...current, githubUrl: event.target.value }))}
              placeholder="https://github.com/..."
              className="h-9 w-full rounded-md border border-zinc-800 bg-zinc-900 px-3 text-sm text-zinc-100 outline-none transition focus:border-zinc-600"
            />
          </label>

          <label className="block space-y-1 text-xs text-zinc-300">
            <span className="uppercase tracking-wide text-zinc-500">Vercel URL</span>
            <input
              name="vercelUrl"
              value={draft.vercelUrl}
              onChange={(event) => setDraft((current) => ({ ...current, vercelUrl: event.target.value }))}
              placeholder="https://..."
              className="h-9 w-full rounded-md border border-zinc-800 bg-zinc-900 px-3 text-sm text-zinc-100 outline-none transition focus:border-zinc-600"
            />
          </label>

          <label className="block space-y-1 text-xs text-zinc-300">
            <span className="uppercase tracking-wide text-zinc-500">Support email</span>
            <input
              name="supportEmail"
              value={draft.supportEmail}
              onChange={(event) => setDraft((current) => ({ ...current, supportEmail: event.target.value }))}
              placeholder="support@..."
              className="h-9 w-full rounded-md border border-zinc-800 bg-zinc-900 px-3 text-sm text-zinc-100 outline-none transition focus:border-zinc-600"
            />
          </label>

          <label className="block space-y-1 text-xs text-zinc-300 sm:col-span-2">
            <span className="uppercase tracking-wide text-zinc-500">Support WhatsApp</span>
            <input
              name="supportWhatsapp"
              value={draft.supportWhatsapp}
              onChange={(event) => setDraft((current) => ({ ...current, supportWhatsapp: event.target.value }))}
              placeholder="+33 ..."
              className="h-9 w-full rounded-md border border-zinc-800 bg-zinc-900 px-3 text-sm text-zinc-100 outline-none transition focus:border-zinc-600"
            />
          </label>

          <label className="block space-y-1 text-xs text-zinc-300 sm:col-span-2">
            <span className="uppercase tracking-wide text-zinc-500">Message personnalisé</span>
            <textarea
              name="customMessage"
              value={draft.customMessage}
              onChange={(event) => setDraft((current) => ({ ...current, customMessage: event.target.value }))}
              placeholder="Message optionnel pour le client..."
              className="min-h-20 w-full rounded-md border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 outline-none transition focus:border-zinc-600"
            />
          </label>
        </div>

        <div className="flex items-center justify-between gap-2">
          <p className={`text-xs ${saveFeedbackClassName}`} role="status" aria-live="polite">
            {isSaving ? 'Sauvegarde en cours...' : saveState.message || 'Renseignez les accès puis sauvegardez.'}
          </p>
          <Button type="submit" variant="ghost" className="h-8 px-3 py-1 text-xs" disabled={isSaving || isSending}>
            {isSaving ? 'Sauvegarde...' : 'Sauvegarder livraison'}
          </Button>
        </div>
      </form>

      <form action={sendAction} className="space-y-2 border-t border-zinc-800 pt-3">
        <input type="hidden" name="briefId" value={briefId} />
        <p className="text-xs text-zinc-500">
          {initialDelivery.deliveredAt ? `Livré le ${new Date(initialDelivery.deliveredAt).toLocaleString('fr-FR')}.` : 'Pas encore livré.'}{' '}
          {initialDelivery.deliveryEmailSentAt
            ? `Email envoyé le ${new Date(initialDelivery.deliveryEmailSentAt).toLocaleString('fr-FR')}.`
            : 'Email non envoyé.'}
        </p>

        <div className="flex items-center justify-between gap-2">
          <p className={`text-xs ${sendFeedbackClassName}`} role="status" aria-live="polite">
            {isSending ? 'Envoi en cours...' : sendState.message || 'Envoyez l’email quand le site est prêt.'}
          </p>
          <Button
            type="submit"
            className="h-8 px-3 py-1 text-xs"
            disabled={isSaving || isSending || alreadySent}
            title={alreadySent ? 'Envoi déjà effectué.' : undefined}
          >
            {isSending ? 'Envoi...' : 'Envoyer la livraison'}
          </Button>
        </div>
      </form>
    </div>
  );
}
