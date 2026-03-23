'use client';

import * as React from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Wifi } from 'lucide-react';

const ROTATION_RANGE = 6;

export function CreditCard3D() {
  const [isHovered, setIsHovered] = React.useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [ROTATION_RANGE, -ROTATION_RANGE]);
  const rotateY = useTransform(x, [-100, 100], [-ROTATION_RANGE, ROTATION_RANGE]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - (rect.left + rect.width / 2));
    y.set(event.clientY - (rect.top + rect.height / 2));
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <div className="relative w-full max-w-sm mx-auto" style={{ perspective: '1000px' }}>


      <motion.div
        className="relative w-full aspect-[1.586/1] cursor-default"
        style={{
          transformStyle: 'preserve-3d',
          rotateX,
          rotateY,
          zIndex: 1,
          filter: 'drop-shadow(16px 28px 36px rgba(0,0,0,0.7)) drop-shadow(4px 8px 20px rgba(0,0,0,0.5))',
        }}
        initial={{ opacity: 0, scale: 0.88, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, type: 'spring', stiffness: 90, damping: 18 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={() => setIsHovered(true)}
      >
        {/* Card face */}
        <motion.div
          className="absolute inset-0 rounded-2xl p-6 sm:p-8 text-zinc-950 overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #c8ff3e 0%, #AAFF00 40%, #7acc00 100%)',
            transform: 'translateZ(30px)',
            boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.4), inset 0 -1px 1px rgba(0,0,0,0.1)',
          }}
        >
          {/* Shimmer */}
          <div className="absolute inset-0 overflow-hidden rounded-2xl">
            <motion.div
              className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/30 to-white/0"
              style={{ width: '200%', left: '-100%' }}
              animate={{ left: ['−100%', '100%'] }}
              transition={{ duration: 3.5, repeat: Infinity, repeatDelay: 2.5, ease: 'linear' }}
            />
          </div>

          {/* Texture overlay */}
          <div
            className="absolute inset-0 rounded-2xl opacity-20 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at 80% 20%, rgba(255,255,255,0.5) 0%, transparent 60%)' }}
          />

          <div className="relative h-full flex flex-col justify-between z-10">
            {/* Top */}
            <div className="flex justify-between items-start">
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-3"
              >
                <div className="w-10 h-7 rounded-md shadow-md" style={{ background: 'linear-gradient(135deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.1) 100%)', border: '1px solid rgba(0,0,0,0.15)' }} />
                <Wifi className="w-4 h-4 rotate-90 opacity-50" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-xs font-black tracking-widest opacity-60 uppercase"
              >
                Siteasy
              </motion.div>
            </div>

            {/* Bottom */}
            <div className="flex justify-between items-end">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="text-[9px] uppercase tracking-widest opacity-50 mb-0.5">Paiement unique</div>
                <div className="text-sm font-bold">Site web en 24h</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-right"
              >
                <div className="text-[9px] uppercase tracking-widest opacity-50 mb-0.5">Hébergement</div>
                <div className="text-sm font-bold">1 an inclus</div>
              </motion.div>
            </div>
          </div>

          {/* Hover sheen */}
          <motion.div
            className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/0 via-white/15 to-white/0"
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
