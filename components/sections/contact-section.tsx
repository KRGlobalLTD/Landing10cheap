import { Calendar, Mail, MessageCircle } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { SITE_CONFIG } from '@/lib/constants/site';

const CONTACT_ITEMS = ['Questions avant commande', 'Ajout de fonctionnalités', 'Support après livraison'];
const CALENDLY_ITEMS = ['Fonctionnalités sur mesure', 'Conseils personnalisés', 'Évolution après livraison'];

export function ContactSection() {
  return (
    <section id="contact" className="border-t border-white/5 py-24">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Quick contact */}
          <div className="flex flex-col justify-between gap-8">
            <div className="space-y-4">
              <p className="text-xs font-medium uppercase tracking-widest text-muted/50">Support & Contact</p>
              <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">Un besoin spécifique ?</h2>
              <p className="text-sm leading-relaxed text-muted">Notre équipe est disponible pour répondre à toutes vos questions avant, pendant et après la commande.</p>
              <ul className="space-y-2.5">
                {CONTACT_ITEMS.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-muted">
                    <span className="shrink-0" style={{ color: '#AAFF00' }}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href={SITE_CONFIG.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center gap-2 rounded-full bg-white px-5 text-sm font-medium text-black transition-colors hover:bg-zinc-200"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </a>
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="inline-flex h-11 items-center gap-2 rounded-full border border-border bg-transparent px-5 text-sm font-medium text-foreground transition-colors hover:bg-zinc-900"
              >
                <Mail className="h-4 w-4" />
                Envoyer un email
              </a>
            </div>
          </div>

          {/* Calendly upsell */}
          <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-white/[0.03] p-8">
            <div
              className="pointer-events-none absolute inset-0"
              style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(170, 255, 0, 0.06) 0%, transparent 60%)' }}
            />
            <div className="relative space-y-6">
              <div className="space-y-3">
                <span
                  className="rounded-full border px-3 py-1 text-xs font-medium"
                  style={{ borderColor: '#AAFF0040', backgroundColor: '#AAFF0010', color: '#AAFF00' }}
                >
                  Gratuit · 30 minutes
                </span>
                <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">Réservez un appel gratuit</h2>
                <p className="text-sm leading-relaxed text-muted">
                  Vous souhaitez ajouter des fonctionnalités, adapter votre site à votre activité ou prévoir une évolution ? Réservez un appel gratuit pour en discuter.
                </p>
              </div>
              <ul className="space-y-2.5">
                {CALENDLY_ITEMS.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-muted">
                    <span className="shrink-0" style={{ color: '#AAFF00' }}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="flex flex-col gap-3 sm:flex-row">
                <a
                  href={SITE_CONFIG.calendly}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-white px-5 text-sm font-medium text-black transition-colors hover:bg-zinc-200"
                >
                  <Calendar className="h-4 w-4" />
                  Réserver un appel gratuit
                </a>
                <a
                  href={SITE_CONFIG.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-border bg-transparent px-5 text-sm font-medium text-foreground transition-colors hover:bg-zinc-900"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
