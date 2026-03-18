import Link from 'next/link';
import { FOOTER_LINKS, SITE_CONFIG } from '@/lib/constants/site';
import { Container } from '@/components/ui/container';

export function Footer() {
  return (
    <footer className="border-t border-white/10 py-10">
      <Container className="grid gap-10 md:grid-cols-3">
        <div className="space-y-2">
          <p className="text-sm font-semibold text-foreground">{SITE_CONFIG.name}</p>
          <p className="text-sm text-muted">{SITE_CONFIG.description}</p>
        </div>

        {FOOTER_LINKS.map((group) => (
          <div key={group.title} className="space-y-3">
            <p className="text-sm font-medium text-foreground">{group.title}</p>
            <ul className="space-y-2">
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted transition-colors hover:text-foreground">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Container>
    </footer>
  );
}
