'use client';

import { motion } from 'framer-motion';

type ScrollRevealProps = {
  children: React.ReactNode;
  delay?: number;
  className?: string;
};

export function ScrollReveal({ children, delay = 0, className }: ScrollRevealProps) {
  return (
    <motion.div
      data-scroll-reveal
      className={className}
      initial={{ opacity: 0, y: 56, scale: 0.97, filter: 'blur(4px)' }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
        delay,
        opacity: { duration: 0.6 },
        filter: { duration: 0.5 },
      }}
    >
      {children}
    </motion.div>
  );
}
