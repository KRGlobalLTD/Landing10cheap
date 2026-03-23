import { Container } from '@/components/ui/container';

const SITES = [
  {
    name: 'Portfolio',
    tag: 'Portfolio personnel',
    accent: '#f59e0b',
    lines: [5, 7, 4],
    image: '/ptf.png' as string | undefined
  },
  {
    name: 'Site E-commerce',
    tag: 'Boutique en ligne',
    accent: '#84cc16',
    lines: [6, 4, 7],
    image: '/felizbella.png' as string | undefined
  },
  {
    name: 'Codio',
    tag: 'Agence web',
    accent: '#38bdf8',
    lines: [5, 6, 5],
    image: '/cd.png' as string | undefined
  },
  {
    name: 'Le Petit Bistro',
    tag: 'Restaurant & café',
    accent: '#AAFF00',
    lines: [4, 6, 5],
    image: undefined as string | undefined
  },
  {
    name: 'Clara Coaching',
    tag: 'Coach bien-être',
    accent: '#a78bfa',
    lines: [5, 4, 6],
    image: undefined as string | undefined
  },
  {
    name: 'BâtiPro',
    tag: 'Entreprise du bâtiment',
    accent: '#AAFF00',
    lines: [6, 5, 4],
    image: undefined as string | undefined
  }
];

export function GallerySection() {
  return (
    <section className="py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-xs font-medium uppercase tracking-widest text-muted/50">
            Galerie
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Des sites générés pour{' '}
            <span style={{ color: '#AAFF00' }}>tous les métiers.</span>
          </h2>
          <p className="mt-4 text-sm text-muted">
            Chaque site est unique, adapté à l&apos;activité et au style de son créateur.
          </p>
        </div>

        {/* Grid */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SITES.map((site) => (
            <div
              key={site.name}
              className="group overflow-hidden rounded-2xl border border-white/8 bg-[#0c0c0f] transition-all hover:border-white/15 hover:shadow-[0_8px_32px_rgba(0,0,0,0.4)] cursor-pointer"
            >
              {/* Mini site preview */}
              <div className="relative overflow-hidden">
                {site.image ? (
                  <img
                    src={site.image}
                    alt={site.name}
                    className="h-52 w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="px-4 pb-4 pt-4">
                    <div
                      className="pointer-events-none absolute inset-0 opacity-15 transition-opacity duration-300 group-hover:opacity-25"
                      style={{
                        background: `radial-gradient(ellipse 70% 60% at 50% 100%, ${site.accent}60 0%, transparent 70%)`
                      }}
                    />
                    <div className="mb-3 flex gap-1.5">
                      <div className="h-2 w-2 rounded-full bg-white/15" />
                      <div className="h-2 w-2 rounded-full bg-white/15" />
                      <div className="h-2 w-2 rounded-full bg-white/15" />
                    </div>
                    <div className="mb-4 flex items-center justify-between">
                      <div className="h-2 w-16 rounded-full" style={{ backgroundColor: `${site.accent}70` }} />
                      <div className="flex gap-1.5">
                        <div className="h-1.5 w-8 rounded-full bg-white/10" />
                        <div className="h-1.5 w-8 rounded-full bg-white/10" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-3 w-2/3 rounded-full" style={{ backgroundColor: `${site.accent}50` }} />
                      <div className="h-2 w-full rounded-full bg-white/10" />
                      <div className="h-2 w-4/5 rounded-full bg-white/10" />
                      <div className="mt-3 h-6 w-20 rounded-full" style={{ backgroundColor: `${site.accent}60` }} />
                    </div>
                    <div className="mt-4 grid grid-cols-3 gap-2">
                      {site.lines.map((_, i) => (
                        <div key={i} className="rounded-lg border border-white/5 bg-white/[0.02] p-2">
                          <div className="mb-1 h-1.5 w-full rounded-full bg-white/10" />
                          <div className="h-1.5 w-3/4 rounded-full bg-white/10" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Card footer */}
              <div className="border-t border-white/5 px-4 py-3 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">{site.name}</p>
                  <p className="text-xs text-muted">{site.tag}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
