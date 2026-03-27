import type { Metadata } from 'next';
import { Suspense } from 'react';
import SuccesContent from './SuccesContent';

export const metadata: Metadata = {
  title: 'Commande confirmée — Siteasy',
  description: 'Votre paiement a été reçu. Votre site web est en cours de préparation.',
  alternates: { canonical: '/succes' },
};

export default function SuccesPage({ searchParams }: { searchParams: { prenom?: string } }) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0a0a0a]" />}>
      <SuccesContent prenom={searchParams.prenom} />
    </Suspense>
  );
}
