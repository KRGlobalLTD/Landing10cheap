'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface Testimonial {
  text: string;
  name: string;
  role: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    text: "J'avais peur que ce soit compliqué, mais j'ai répondu à 3 questions et mon site était prêt. Mes clientes le trouvent très professionnel.",
    name: 'Camille R.',
    role: 'Fleuriste',
    avatar: 'C',
  },
  {
    text: "En tant que dev, j'aurais pu coder mon propre site. Mais pour mon portfolio perso, gagner 3 semaines pour 49€, c'était une évidence.",
    name: 'Thomas D.',
    role: 'Développeur freelance',
    avatar: 'T',
  },
  {
    text: "Le site généré est exactement ce dont j'avais besoin : simple, rassurant et avec mes coordonnées bien visibles. Je reçois des demandes chaque semaine.",
    name: 'Marie-Hélène V.',
    role: 'Ostéopathe',
    avatar: 'M',
  },
  {
    text: "Le rendu est vraiment soigné. Mon portfolio met en valeur mon travail sans distraire. Et il est parfait sur mobile, ce qui était ma priorité.",
    name: 'Julien M.',
    role: 'Photographe',
    avatar: 'J',
  },
  {
    text: "Je ne m'y connais pas du tout en tech. Mais le générateur m'a posé des questions simples et le résultat est bluffant. Je recommande à toutes mes collègues.",
    name: 'Sophie L.',
    role: 'Formatrice RH',
    avatar: 'S',
  },
  {
    text: "Mon restaurant avait besoin d'un site avant l'ouverture. En 5 minutes c'était réglé. Les réservations en ligne marchent très bien.",
    name: 'Antoine B.',
    role: 'Chef cuisinier',
    avatar: 'A',
  },
  {
    text: "Un prix clair, aucun abonnement caché, et un site que je suis fier de montrer à mes clients. C'est tout ce que je voulais.",
    name: 'Romain T.',
    role: 'Électricien',
    avatar: 'R',
  },
  {
    text: "J'ai comparé avec des agences à 2000€. Le résultat est au même niveau. La différence de prix est juste incompréhensible.",
    name: 'Laura K.',
    role: 'Coach bien-être',
    avatar: 'L',
  },
  {
    text: "Mon site était en ligne avant même que j'aie fini mon café. Je l'ai montré à ma famille et ils ne croyaient pas que c'était automatique.",
    name: 'Marc P.',
    role: 'Plombier',
    avatar: 'M',
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

function TestimonialsColumn({
  testimonials,
  duration = 15,
  className,
}: {
  testimonials: Testimonial[];
  duration?: number;
  className?: string;
}) {
  return (
    <div className={className}>
      <motion.ul
        animate={{ translateY: '-50%' }}
        transition={{ duration, repeat: Infinity, ease: 'linear', repeatType: 'loop' }}
        className="flex flex-col gap-4 pb-4 list-none m-0 p-0"
      >
        {[...Array(2)].map((_, index) => (
          <React.Fragment key={index}>
            {testimonials.map(({ text, name, role, avatar }, i) => (
              <motion.li
                key={`${index}-${i}`}
                aria-hidden={index === 1 ? 'true' : 'false'}
                whileHover={{ scale: 1.02, y: -4, transition: { type: 'spring', stiffness: 400, damping: 17 } }}
                className="rounded-2xl border border-white/8 bg-zinc-950 p-6 max-w-xs w-full cursor-default select-none"
              >
                <blockquote className="m-0 p-0">
                  <p className="text-sm leading-relaxed text-zinc-400 m-0">
                    &ldquo;{text}&rdquo;
                  </p>
                  <footer className="flex items-center gap-3 mt-5">
                    <div
                      className="h-9 w-9 rounded-full flex items-center justify-center text-xs font-bold text-zinc-950 shrink-0"
                      style={{ backgroundColor: '#AAFF00' }}
                    >
                      {avatar}
                    </div>
                    <div className="flex flex-col">
                      <cite className="font-semibold not-italic text-sm text-white leading-tight">
                        {name}
                      </cite>
                      <span className="text-xs text-zinc-500 mt-0.5">{role}</span>
                    </div>
                  </footer>
                </blockquote>
              </motion.li>
            ))}
          </React.Fragment>
        ))}
      </motion.ul>
    </div>
  );
}

export function TestimonialsSection() {
  return (
    <section className="py-24 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        {/* Title */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <p className="mb-3 text-xs font-medium uppercase tracking-widest text-muted/50">
            Témoignages
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Ils ont <span style={{ color: '#AAFF00' }}>sauté le pas.</span>{' '}
            Voici ce qu&apos;ils en pensent.
          </h2>
        </div>

        {/* Columns */}
        <div
          className="flex justify-center gap-4 mt-10 max-h-[720px] overflow-hidden"
          style={{
            maskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)',
          }}
        >
          <TestimonialsColumn testimonials={firstColumn} duration={18} />
          <TestimonialsColumn testimonials={secondColumn} duration={22} className="hidden md:block" />
          <TestimonialsColumn testimonials={thirdColumn} duration={20} className="hidden lg:block" />
        </div>
      </motion.div>
    </section>
  );
}
