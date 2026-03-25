import Link from 'next/link';
import Image from 'next/image';
import { Mail, MessageCircle } from 'lucide-react';
import { FOOTER_LINKS, SITE_CONFIG } from '@/lib/constants/site';
import { Container } from '@/components/ui/container';

export function Footer() {
  return (
    <footer className="border-t border-white/5 py-12">
      <Container>
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4 items-start">
          <div className="space-y-3">
            <Image src="/logo/logo-horizontal.svg" alt="KR Global Solutions LTD" width={100} height={25} />
            <p className="text-sm leading-relaxed text-muted">{SITE_CONFIG.description}</p>
            <p className="text-xs text-muted/40">
              © {new Date().getFullYear()} {SITE_CONFIG.name}. Tous droits réservés.
            </p>
          </div>

          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted/50">Contact</p>
            <ul className="space-y-2.5">
              <li>
                <a
                  href={SITE_CONFIG.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
                >
                  <MessageCircle className="h-3.5 w-3.5 shrink-0" />
                  {SITE_CONFIG.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
                >
                  <Mail className="h-3.5 w-3.5 shrink-0" />
                  {SITE_CONFIG.email}
                </a>
              </li>
            </ul>
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
