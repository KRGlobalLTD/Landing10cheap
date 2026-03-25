import type { Metadata } from 'next';
import './globals.css';
import { AnalyticsProvider } from '@/components/analytics-provider';
import { SITE_CONFIG } from '@/lib/constants/site';
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { PageTransitionProvider } from '@/components/ui/page-transition';

const geist = Inter({subsets:['latin'],variable:'--font-sans'});

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://krglobalsolutionsltd.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: SITE_CONFIG.name,
    template: `%s | ${SITE_CONFIG.name}`
  },
  description: SITE_CONFIG.description,
  alternates: {
    canonical: '/'
  },
  openGraph: {
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    url: siteUrl,
    siteName: SITE_CONFIG.name,
    type: 'website',
    locale: 'fr_FR'
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
  },
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg'
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={cn("font-sans", geist.variable)}>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <AnalyticsProvider />
        <PageTransitionProvider>
          <div className="relative flex min-h-screen flex-col">{children}</div>
        </PageTransitionProvider>
      </body>
    </html>
  );
}
