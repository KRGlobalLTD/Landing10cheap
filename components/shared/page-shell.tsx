import { Footer } from '@/components/layout/footer';
import { Navbar } from '@/components/layout/navbar';
import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';

type PageShellProps = {
  title: string;
  description: string;
  children?: React.ReactNode;
};

export function PageShell({ title, description, children }: PageShellProps) {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Section className="pt-32 md:pt-40">
          <Container className="max-w-3xl space-y-12">
            <header className="space-y-6">
              <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">{title}</h1>
              <p className="text-base text-muted md:text-lg leading-relaxed">{description}</p>
            </header>
            {children}
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
