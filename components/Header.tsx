import React from 'react';
import { Calendar, MapPin, Sparkles } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="w-full sticky top-0 z-50 border-b border-[#ffd600]/10 bg-[#071a15]/90 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl border border-[#ffd600]/40 bg-[#f4d75d] shadow-[0_0_22px_rgba(244,215,93,0.35)]">
            <img src="/Sunrise.png" alt="HH Goa sunrise logo" className="h-full w-full object-cover" />
          </div>

          <div className="flex flex-col leading-none">
            <div className="flex items-center gap-2">
              <h1 className="font-orbitron text-base sm:text-xl font-black uppercase tracking-[0.12em] text-[#f3ead0]">
                hacker house
              </h1>
              <span className="rounded-md border border-[#ffd600]/40 bg-[#0d2a22] px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.18em] text-[#f4d75d]">
                goa
              </span>
            </div>
            <span className="mt-1 font-mono-tech text-[9px] sm:text-[10px] uppercase tracking-[0.28em] text-[#d6d0b5]">
              2026 / frame lab
            </span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <div className="rounded-full border border-[#d7d1ae]/25 bg-white/5 px-3 py-1.5 font-mono-tech text-[10px] uppercase tracking-[0.2em] text-[#d7d1ae]">
            28–31 OCT 2026
          </div>
          <div className="rounded-full border border-[#ffd600]/25 bg-white/5 px-3 py-1.5 font-mono-tech text-[10px] uppercase tracking-[0.2em] text-[#ffd600]">
            goa, india
          </div>
        </div>

        <a
          href="https://hhgoa.com"
          target="_blank"
          rel="noreferrer"
          className="goa-button-yellow px-4 py-2 rounded-xl text-[10px] sm:text-xs font-black uppercase tracking-[0.16em]"
        >
          official site
        </a>
      </div>
    </header>
  );
};
