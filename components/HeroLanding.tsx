import React from 'react';
import { Upload, ArrowRight, Sparkles, Zap, Image as ImageIcon } from 'lucide-react';

interface HeroLandingProps {
  onSelectFile: (file: File) => void;
  isLoading: boolean;
  onOpenTeamBuilder?: () => void;
}

export const HeroLanding: React.FC<HeroLandingProps> = ({ onSelectFile, isLoading, onOpenTeamBuilder }) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onSelectFile(e.target.files[0]);
    }
  };

  return (
    <section className="relative mx-auto w-full py-0 text-center">
      <div className="relative isolate overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(243,213,59,0.18),_transparent_35%),linear-gradient(180deg,#0d5f3c_0%,#0c5a38_100%)] px-3 py-5 sm:px-6 lg:px-10">
        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#0d5f3c] via-[#0d5f3c]/60 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#08150f] via-[#08150f]/30 to-transparent" />
        <div className="mx-auto max-w-[1700px] relative z-10">
          <div className="flex justify-center pb-2">
            <img src="/HHGoa.png" alt="HH Goa logo" className="h-16 w-16 rounded-full border-2 border-[#f3d53b] bg-[#f3d53b]/90 object-cover shadow-[0_0_32px_rgba(243,213,59,0.4)] sm:h-20 sm:w-20" />
          </div>

          <div className="mb-2 flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#f3d53b]/40 bg-[#0f2d1d]/80 px-4 py-2 text-[10px] font-mono-tech font-bold uppercase tracking-[0.26em] text-[#f3d53b] shadow-[0_0_18px_rgba(243,213,59,0.14)]">
              2:47 AM presents
            </div>
          </div>

          <div className="relative mx-auto max-w-[1500px]">
            <div className="select-none font-serif-display leading-[0.68] tracking-[-0.08em] text-[#f3d53b] [text-shadow:0_2px_0_rgba(0,0,0,0.18)]">
              <div className="text-[19vw] sm:text-[16vw] lg:text-[15vw]" style={{ fontWeight: 900, transform: 'scaleY(0.92)' }}>
                <span className="block">HACKER</span>
                <span className="block">HOUSE</span>
              </div>
            </div>

            <div className="pointer-events-none absolute left-1/2 top-[55%] -translate-x-1/2 -translate-y-1/2">
              <div className="inline-flex items-center justify-center rounded-[22px] border-[3px] border-[#f3d53b] bg-[#ff46a8] px-4 py-2 text-[clamp(2.6rem,6.5vw,8rem)] font-black leading-none text-[#f3d53b] shadow-[0_10px_0_rgba(0,0,0,0.12)] md:px-6 md:py-3">
                गोवा
              </div>
            </div>
          </div>

          <div className="mt-3 flex flex-col gap-2 px-2 pb-2 text-left text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[#f3d53b] sm:flex-row sm:items-center sm:justify-between sm:text-[1.05rem]">
            <span>GOA, INDIA • 28 - 31 OCT 2026</span>
            <span className="sm:text-right">2:47 PM STUDIO</span>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-8 w-full max-w-3xl px-4">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/heic,image/heif,image/webp"
          onChange={handleFileChange}
          className="hidden"
          id="hero-file-input"
        />

        <div className="goa-card rounded-[30px] p-5 text-center shadow-[0_30px_80px_rgba(0,0,0,0.45)] sm:p-8">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#0e241d] px-3 py-1 text-[10px] font-mono-tech font-bold uppercase tracking-[0.25em] text-[#f4d75d] border border-[#f4d75d]/30">
            <Sparkles className="h-3.5 w-3.5 text-[#f4d75d]" />
            mission control
          </div>

          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isLoading}
            className="w-full goa-button-yellow py-5 px-8 rounded-2xl text-lg font-black uppercase tracking-[0.12em] sm:text-2xl"
          >
            <span className="inline-flex items-center justify-center gap-3">
              <Upload className="h-6 w-6" />
              upload your photo
              <ArrowRight className="h-5 w-5" />
            </span>
          </button>

          <button
            onClick={() => onOpenTeamBuilder && onOpenTeamBuilder()}
            disabled={isLoading}
            className="mt-4 w-full rounded-2xl border border-[#dfe6dd]/20 bg-[#0c1d1a] px-6 py-3 text-sm font-black uppercase tracking-[0.16em] text-[#dfe6dd] transition hover:border-[#f4d75d]/40 hover:text-[#f4d75d]"
          >
            <span className="inline-flex items-center justify-center gap-3">
              <ImageIcon className="h-5 w-5 text-[#f4d75d]" />
              build a team frame
            </span>
          </button>

          <p className="mt-4 font-mono-tech text-[10px] uppercase tracking-[0.24em] text-[#cfbfa9]">
            JPG • PNG • HEIC
          </p>
        </div>
      </div>

      <div className="mx-auto mt-10 grid w-full max-w-5xl gap-4 px-4 sm:grid-cols-3">
        {[
          ['01', 'Upload', 'Drop in any portrait, and let the studio fit it for you.'],
          ['02', 'Customize', 'Adjust your frame, zoom, rotation, and personal builder details.'],
          ['03', 'Download', 'Export your final clash-ready frame and share it with the crew.'],
        ].map(([n, title, text]) => (
          <div key={n} className="goa-card rounded-[24px] p-5 text-left shadow-[0_20px_40px_rgba(0,0,0,0.26)]">
            <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-[#f4d75d] font-orbitron text-sm font-black text-[#071a15]">
              {n}
            </div>
            <h3 className="text-lg font-black uppercase tracking-[0.08em] text-[#f4d75d]">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-[#dfe6dd]">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
