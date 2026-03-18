import type { Metadata } from 'next';
import './globals.css';
import { SITE_CONFIG } from '@/lib/constants/site';

export const metadata: Metadata = {
  metadataBase: new URL('https://landing-express-10e.vercel.app'),
  title: {
    default: SITE_CONFIG.name,
    template: `%s | ${SITE_CONFIG.name}`
  },
  description: SITE_CONFIG.description,
  openGraph: {
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    type: 'website',
    locale: 'fr_FR'
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="min-h-screen bg-background text-foreground">
        <div className="relative flex min-h-screen flex-col">{children}</div>
      </body>
    </html>
  );
}
