/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CafeasyLogo } from './CafeasyLogo';

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    if (countdown <= 0) {
      onComplete();
      return;
    }

    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown, onComplete]);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col justify-between p-8 font-sans select-none relative overflow-hidden">
      
      {/* Decorative Bold Typo background elements */}
      <div className="absolute top-10 left-10 text-[90px] font-black leading-none tracking-tighter uppercase text-white/5 pointer-events-none select-none hidden sm:block">
        CAFEASY.
      </div>
      <div className="absolute bottom-10 right-10 text-[90px] font-black leading-none tracking-tighter uppercase text-white/5 pointer-events-none select-none hidden sm:block">
        BUILD_3000.
      </div>

      {/* Top spacer */}
      <div />

      {/* Main Branding Section */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="flex flex-col items-center justify-center text-center space-y-8 z-10"
      >
        {/* Dynamic Glowing Brand Indicator */}
        <div className="text-white hover:scale-105 transition-transform duration-300">
          <CafeasyLogo className="w-20 h-20 stroke-[4]" />
        </div>

        <div className="space-y-3">
          <h1 className="text-5xl md:text-6xl font-display font-black tracking-tighter leading-none text-white uppercase">
            CAFEASY.
          </h1>
          <p className="text-[10px] tracking-widest font-black text-zinc-500 uppercase">
            PRODUK KREASI HALLODECK SYSTEMS
          </p>
        </div>

        {/* Redirect timer block */}
        <motion.div 
          onClick={onComplete}
          className="cursor-pointer group flex flex-col items-center space-y-3 pt-8"
        >
          <div className="text-xs tracking-widest font-black text-zinc-400 group-hover:text-white transition-colors uppercase">
            MEMASUKI PORTAL DALAM <span className="font-mono font-black text-white bg-zinc-800 px-2 py-1 rounded">{countdown}SEC</span>
          </div>
          <span className="text-[10px] uppercase tracking-wider font-extrabold text-zinc-500 group-hover:text-zinc-300 transition-colors underline decoration-2">
            Klik untuk langsung masuk
          </span>
        </motion.div>
      </motion.div>

      {/* Footer Branding */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="text-center text-[10px] tracking-widest text-zinc-600 font-extrabold font-mono uppercase"
      >
        © CAFEASY ADMIN SYSTEM. ALL RIGHTS RESERVED.
      </motion.div>
    </div>
  );
}
