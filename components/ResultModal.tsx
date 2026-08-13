import React, { useState } from 'react';
import { Download, Share2, Check, Copy, Sparkles, X, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  previewDataUrl: string | null;
}

export const ResultModal: React.FC<ResultModalProps> = ({
  isOpen,
  onClose,
  canvasRef,
  previewDataUrl,
}) => {
  const [copied, setCopied] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  if (!isOpen) return null;

  const captionText =
    'Building, shipping and creating from Goa. See you at Hacker House Goa 2026. #FrameInGoa';

  const handleDownload = () => {
    try {
      const link = document.createElement('a');
      link.download = 'hh-goa-2026-pfp-frame.png';

      if (previewDataUrl) {
        link.href = previewDataUrl;
      } else if (canvasRef.current) {
        link.href = canvasRef.current.toDataURL('image/png');
      } else {
        return;
      }

      link.click();
      setDownloaded(true);

      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#ffd600', '#ff007a', '#0b6635', '#ffffff'],
      });
    } catch (err) {
      console.error('Download error:', err);
    }
  };

  const handleCopyCaption = () => {
    navigator.clipboard.writeText(captionText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShareToX = () => {
    if (!downloaded) {
      handleDownload();
    }

    const encodedText = encodeURIComponent(captionText);
    const xUrl = `https://x.com/intent/post?text=${encodedText}`;
    window.open(xUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-lg bg-[#063c1f] border-4 border-[#ffd600] rounded-3xl shadow-2xl overflow-hidden relative p-6 sm:p-8 flex flex-col items-center text-center">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-white bg-[#042915] border-2 border-[#ffd600] hover:bg-[#0b6635]"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Icon */}
        <div className="w-14 h-14 rounded-full bg-[#ffd600] border-2 border-[#063c1f] flex items-center justify-center text-[#063c1f] font-black mb-3">
          <Sparkles className="w-7 h-7 text-[#ff007a]" />
        </div>

        <h3 className="text-2xl sm:text-3xl font-orbitron font-black uppercase tracking-[0.12em] text-[#ffd600] mb-1">
          Your frame is live
        </h3>
        <p className="text-xs sm:text-sm text-slate-200 mb-6 font-medium">
          Download your custom HH Goa identity and post it with the hype.
        </p>

        {/* Circular Avatar Image Preview */}
        {previewDataUrl && (
          <div className="w-52 h-52 rounded-full overflow-hidden border-4 border-[#ffd600] shadow-2xl mb-6 bg-[#042915]">
            <img
              src={previewDataUrl}
              alt="HH Goa 2026 Round Profile Frame Preview"
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Primary CTA: Download */}
        <button
          onClick={handleDownload}
          className="w-full goa-button-yellow py-4 px-6 rounded-2xl font-black text-lg shadow-lg flex items-center justify-center gap-2 mb-3"
        >
          <Download className="w-5 h-5 text-[#063c1f]" />
          <span>{downloaded ? 'DOWNLOAD AGAIN (PNG)' : 'DOWNLOAD ROUND PFP (1080x1080)'}</span>
        </button>

        {/* Secondary CTA: Share to X */}
        <button
          onClick={handleShareToX}
          className="w-full goa-button-pink py-3.5 px-6 rounded-2xl font-black text-base flex items-center justify-center gap-2 mb-4"
        >
          <Share2 className="w-5 h-5 text-white" />
          <span>SHARE TO X (#FrameInGoa)</span>
        </button>

        {/* Copy Caption Utility */}
        <div className="w-full p-3.5 rounded-xl bg-[#042915] border border-[#0b6635] text-left flex items-center justify-between gap-3 text-xs mb-2">
          <p className="text-slate-200 line-clamp-1 font-mono italic">
            "{captionText}"
          </p>
          <button
            onClick={handleCopyCaption}
            className="shrink-0 px-3 py-1 rounded-lg bg-[#ffd600] text-[#063c1f] font-black text-xs flex items-center gap-1"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#ff007a]" />
                <span>COPIED!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>COPY CAPTION</span>
              </>
            )}
          </button>
        </div>

        <div className="flex items-center gap-2 text-[11px] text-slate-300 mt-2 font-mono">
          <AlertCircle className="w-3.5 h-3.5 text-[#ffd600] shrink-0" />
          <span>Note: X requires attaching your downloaded photo manually to your tweet.</span>
        </div>

      </div>
    </div>
  );
};
