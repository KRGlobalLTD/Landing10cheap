import Link from 'next/link';
import Image from 'next/image';
import { MAIN_NAVIGATION } from '@/lib/constants/site';
import { Container } from '@/components/ui/container';
import { TrackableCta } from '@/components/analytics/trackable-cta';

export function Navbar() {
  return (
    <header className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
      <div className="w-full max-w-3xl rounded-full border border-white/10 bg-white/5 px-5 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-xl">
        <Container className="flex h-14 items-center justify-between !px-0">
          <Link href="/" className="flex items-center">
            <Image src="/logo/logo-horizontal.svg" alt="Siteasy" width={120} height={30} priority />
          </Link>

          <nav className="hidden items-center gap-6 md:flex" aria-label="Navigation principale">
            {MAIN_NAVIGATION.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-muted transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <TrackableCta
            href="/formulaire"
            className="h-9 rounded-full px-4 text-xs sm:text-sm"
            location="navbar_cta"
          >
            Commencer
          </TrackableCta>
        </Container>
      </div>
    </header>
  );
}
