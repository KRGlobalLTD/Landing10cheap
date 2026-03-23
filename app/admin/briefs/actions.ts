'use server';

import { revalidatePath } from 'next/cache';
import { getBriefById, updateBrief } from '@/lib/briefs';
import { sendCustomerDeliveryEmail } from '@/lib/email/send-customer-delivery-email';
import { withDefaultBriefDelivery } from '@/lib/types/delivery';

export type UpdateBriefNotesState = {
  status: 'idle' | 'success' | 'error';
  message: string;
  updatedAt?: string;
};

export type UpdateBriefDeliveryState = {
  status: 'idle' | 'success' | 'error';
  message: string;
  updatedAt?: string;
};

export type SendBriefDeliveryState = {
  status: 'idle' | 'success' | 'error';
  message: string;
  deliveredAt?: string;
  deliveryEmailSentAt?: string;
};

export const INITIAL_UPDATE_BRIEF_NOTES_STATE: UpdateBriefNotesState = {
  status: 'idle',
  message: ''
};

export const INITIAL_UPDATE_BRIEF_DELIVERY_STATE: UpdateBriefDeliveryState = {
  status: 'idle',
  message: ''
};

export const INITIAL_SEND_BRIEF_DELIVERY_STATE: SendBriefDeliveryState = {
  status: 'idle',
  message: ''
};

const MAX_NOTES_LENGTH = 10_000;
const MAX_CUSTOM_MESSAGE_LENGTH = 5_000;

function readString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === 'string' ? value.trim() : '';
}

function normalizeOptionalUrl(value: string) {
  const normalized = value.trim();
  if (!normalized) {
    return '';
  }

  try {
    const parsed = new URL(normalized);
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      return '';
    }

    return parsed.toString();
  } catch {
    return '';
  }
}

function isValidHttpUrl(value: string) {
  try {
    const parsed = new URL(value);
    return ['http:', 'https:'].includes(parsed.protocol);
  } catch {
    return false;
  }
}

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

export async function updateBriefDeliveryAction(
  _previousState: UpdateBriefDeliveryState,
  formData: FormData
): Promise<UpdateBriefDeliveryState> {
  const briefId = readString(formData, 'briefId');

  if (!briefId) {
    return {
      status: 'error',
      message: 'Identifiant du brief invalide.'
    };
  }

  const siteUrlRaw = readString(formData, 'siteUrl');
  const siteUrl = normalizeOptionalUrl(siteUrlRaw);

  if (siteUrlRaw && !siteUrl) {
    return {
      status: 'error',
      message: 'URL du site invalide. Utilisez un lien http(s).'
    };
  }

  const updatedBrief = await updateBrief(briefId, {
    delivery: {
      siteUrl,
      adminUrl: normalizeOptionalUrl(readString(formData, 'adminUrl')),
      githubUrl: normalizeOptionalUrl(readString(formData, 'githubUrl')),
      vercelUrl: normalizeOptionalUrl(readString(formData, 'vercelUrl')),
      supportEmail: readString(formData, 'supportEmail'),
      supportWhatsapp: readString(formData, 'supportWhatsapp'),
      customMessage: readString(formData, 'customMessage').slice(0, MAX_CUSTOM_MESSAGE_LENGTH)
    }
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
    message: 'Informations de livraison sauvegardées.',
    updatedAt: updatedBrief.updatedAt
  };
}

export async function sendBriefDeliveryAction(
  _previousState: SendBriefDeliveryState,
  formData: FormData
): Promise<SendBriefDeliveryState> {
  const briefId = readString(formData, 'briefId');

  if (!briefId) {
    return {
      status: 'error',
      message: 'Identifiant du brief invalide.'
    };
  }

  const brief = await getBriefById(briefId);

  if (!brief) {
    return {
      status: 'error',
      message: 'Brief introuvable.'
    };
  }

  const customerEmail = brief.customer.email.trim();

  if (!customerEmail) {
    return {
      status: 'error',
      message: 'Impossible d’envoyer la livraison sans email client.'
    };
  }

  const delivery = withDefaultBriefDelivery(brief.delivery);

  if (!isValidHttpUrl(delivery.siteUrl)) {
    return {
      status: 'error',
      message: 'Le lien principal du site est requis et doit être valide avant envoi.'
    };
  }

  if (delivery.deliveryEmailSentAt) {
    return {
      status: 'error',
      message: `Livraison déjà envoyée le ${new Date(delivery.deliveryEmailSentAt).toLocaleString('fr-FR')}.`
    };
  }

  const now = new Date().toISOString();
  const deliveredAt = delivery.deliveredAt ?? now;

  await sendCustomerDeliveryEmail({
    brief,
    delivery: {
      ...delivery,
      deliveredAt,
      deliveryEmailSentAt: now
    },
    customerEmail,
    deliveredAt
  });

  const updatedBrief = await updateBrief(brief.id, {
    status: 'delivered',
    delivery: {
      ...delivery,
      deliveredAt,
      deliveryEmailSentAt: now
    }
  });

  if (!updatedBrief) {
    return {
      status: 'error',
      message: 'Erreur lors de la mise à jour du brief après envoi email.'
    };
  }

  revalidatePath('/admin/briefs');

  return {
    status: 'success',
    message: 'Email de livraison envoyé au client.',
    deliveredAt,
    deliveryEmailSentAt: now
  };
}
