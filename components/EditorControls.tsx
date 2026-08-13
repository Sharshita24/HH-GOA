import React from 'react';
import { FrameStyle, FrameOption } from '../types/image';
import {
  ZoomIn,
  ZoomOut,
  RotateCw,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  RotateCcw as ResetIcon,
  Sparkles,
  Sun,
  IdCard,
} from 'lucide-react';

interface EditorControlsProps {
  zoom: number;
  rotation: number;
  frameStyle: FrameStyle;
  onZoomChange: (zoom: number) => void;
  onPositionChange: (x: number, y: number) => void;
  onRotationChange: (rotation: number) => void;
  onFrameStyleChange: (style: FrameStyle) => void;
  onReset: () => void;
}

const FRAME_OPTIONS: FrameOption[] = [
  {
    id: 'official',
    name: 'Official Poster',
    description: 'Yellow serif typography & pink Hindi calligraphic overlay',
    tagline: 'OFFICIAL',
  },
  {
    id: 'beach',
    name: 'Goa Beach & Sun',
    description: 'Golden sun arc & tropical beach signboard',
    tagline: 'BEACH VIBE',
  },
  {
    id: 'builder-id',
    name: 'Builder ID Card',
    description: 'Cream floating ID card with builder badge',
    tagline: 'ID BADGE',
  },
];

export const EditorControls: React.FC<EditorControlsProps> = ({
  zoom,
  rotation,
  frameStyle,
  onZoomChange,
  onPositionChange,
  onRotationChange,
  onFrameStyleChange,
  onReset,
}) => {

  const handleStepZoom = (delta: number) => {
    const newZoom = Math.min(Math.max(Number((zoom + delta).toFixed(2)), 0.5), 3.0);
    onZoomChange(newZoom);
  };

  const handleStepPan = (dx: number, dy: number) => {
    const step = 30; // 30px step in 1080 canvas
    onPositionChange(dx * step, dy * step);
  };

  const handleRotate = () => {
    onRotationChange((rotation + 90) % 360);
  };

  return (
    <div className="w-full space-y-6">
      
      {/* 1. Frame Style Selector */}
      <div>
        <label className="text-xs font-mono font-bold uppercase tracking-wider text-[#ffd600] mb-3 block flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-[#ff007a]" />
          Choose Frame Identity
        </label>

        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {FRAME_OPTIONS.map((opt) => {
            const isSelected = frameStyle === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => onFrameStyleChange(opt.id)}
                className={`relative p-3 rounded-2xl border-2 text-left transition-all duration-200 ${
                  isSelected
                    ? 'bg-[#ffd600] border-[#063c1f] text-[#063c1f] shadow-lg font-bold scale-[1.02]'
                    : 'bg-[#042915] border-[#0b6635] text-slate-200 hover:border-[#ffd600]/60'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs sm:text-sm font-black truncate">
                    {opt.name}
                  </span>
                  {isSelected && (
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ff007a] animate-ping" />
                  )}
                </div>
                <span className={`text-[10px] font-mono block ${isSelected ? 'text-[#063c1f] font-bold' : 'text-[#ffd600]'}`}>
                  {opt.tagline}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Controls Panel */}
      <div className="p-5 rounded-2xl bg-[#042915] border-2 border-[#0b6635] space-y-4">
        
        {/* Zoom Slider */}
        <div>
          <div className="flex items-center justify-between text-xs font-bold text-[#ffd600] mb-2 font-mono">
            <span className="flex items-center gap-1.5">
              <ZoomIn className="w-4 h-4 text-[#ff007a]" /> ZOOM ADJUSTMENT
            </span>
            <span>{Math.round(zoom * 100)}%</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => handleStepZoom(-0.1)}
              className="w-10 h-10 rounded-xl bg-[#0b6635] hover:bg-[#0d7a40] border border-[#ffd600]/50 text-white flex items-center justify-center font-bold"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>

            <input
              type="range"
              min="0.5"
              max="3.0"
              step="0.05"
              value={zoom}
              onChange={(e) => onZoomChange(parseFloat(e.target.value))}
              className="w-full h-2.5 bg-[#063c1f] rounded-lg appearance-none cursor-pointer accent-[#ffd600]"
            />

            <button
              onClick={() => handleStepZoom(0.1)}
              className="w-10 h-10 rounded-xl bg-[#0b6635] hover:bg-[#0d7a40] border border-[#ffd600]/50 text-white flex items-center justify-center font-bold"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Position D-Pad + Rotate + Reset */}
        <div className="pt-3 border-t border-[#0b6635] flex flex-wrap items-center justify-between gap-3">
          
          {/* Position D-Pad */}
          <div className="flex items-center gap-1.5 bg-[#063c1f] p-2 rounded-xl border border-[#0b6635]">
            <span className="text-[11px] font-mono text-[#ffd600] px-1 font-bold">MOVE:</span>
            <button
              onClick={() => handleStepPan(-1, 0)}
              className="w-8 h-8 rounded-lg bg-[#0b6635] hover:bg-[#0d7a40] text-white flex items-center justify-center"
              title="Move Left"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleStepPan(1, 0)}
              className="w-8 h-8 rounded-lg bg-[#0b6635] hover:bg-[#0d7a40] text-white flex items-center justify-center"
              title="Move Right"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleStepPan(0, -1)}
              className="w-8 h-8 rounded-lg bg-[#0b6635] hover:bg-[#0d7a40] text-white flex items-center justify-center"
              title="Move Up"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleStepPan(0, 1)}
              className="w-8 h-8 rounded-lg bg-[#0b6635] hover:bg-[#0d7a40] text-white flex items-center justify-center"
              title="Move Down"
            >
              <ArrowDown className="w-4 h-4" />
            </button>
          </div>

          {/* Rotate & Reset Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleRotate}
              className="px-3.5 py-2 rounded-xl bg-[#0b6635] hover:bg-[#0d7a40] border border-[#ffd600]/40 text-white text-xs font-bold flex items-center gap-1.5"
            >
              <RotateCw className="w-3.5 h-3.5 text-[#ffd600]" />
              <span>Rotate 90°</span>
            </button>

            <button
              onClick={onReset}
              className="px-3.5 py-2 rounded-xl bg-[#063c1f] hover:bg-[#0b6635] border border-slate-600 text-slate-300 text-xs font-bold flex items-center gap-1.5"
            >
              <ResetIcon className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
