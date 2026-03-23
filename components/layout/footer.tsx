import Link from 'next/link';
import Image from 'next/image';
import { FOOTER_LINKS, SITE_CONFIG } from '@/lib/constants/site';
import { Container } from '@/components/ui/container';

export function Footer() {
  return (
    <footer className="border-t border-white/5 py-12">
      <Container>
        <div className="grid gap-10 md:grid-cols-3">
          <div className="space-y-3">
            <Image src="/logo/logo-horizontal.svg" alt="Siteasy" width={100} height={25} />
            <p className="text-sm leading-relaxed text-muted">{SITE_CONFIG.description}</p>
            <p className="text-xs text-muted/40">
              © {new Date().getFullYear()} {SITE_CONFIG.name}. Tous droits réservés.
            </p>
          </div>

          {FOOTER_LINKS.map((group) => (
            <div key={group.title} className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted/50">
                {group.title}
              </p>
              <ul className="space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </footer>
  );
}
