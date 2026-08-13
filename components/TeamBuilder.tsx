import React, { useRef, useState } from 'react';
import { X, Upload, Image as ImageIcon, Users } from 'lucide-react';
import { CANVAS_SIZE, renderTeamFrame } from '../lib/canvasRenderer';

interface TeamBuilderProps {
  onClose: () => void;
  onGenerated: (dataUrl: string) => void;
}

export const TeamBuilder: React.FC<TeamBuilderProps> = ({ onClose, onGenerated }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleFiles = (fList: FileList | null) => {
    if (!fList) return;
    const arr = Array.from(fList).slice(0, 4);
    setFiles(arr);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const handleGenerate = async () => {
    if (files.length === 0) return;
    setIsGenerating(true);
    try {
      const canvas = document.createElement('canvas');
      await renderTeamFrame(canvas, files.map((f) => URL.createObjectURL(f)));
      const dataUrl = canvas.toDataURL('image/png');
      onGenerated(dataUrl);
      onClose();
    } catch (err) {
      console.error('Team frame error', err);
      alert('Could not generate team frame.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-black/60">
      <div className="w-full max-w-2xl bg-[#063c1f] border-4 border-[#ffd600] rounded-3xl p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-[#ffd600] flex items-center justify-center text-[#063c1f] font-black">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-serif-display font-black text-[#ffd600]">Team Builder</h3>
              <p className="text-xs text-slate-300">Upload up to 4 teammate photos and create a combined frame.</p>
            </div>
          </div>

          <button onClick={onClose} className="p-2 rounded-full bg-[#042915] text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          className="w-full p-6 rounded-2xl border-2 border-dashed border-[#ffd600] bg-[#042915] text-center cursor-pointer"
          onClick={() => inputRef.current?.click()}
        >
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />

          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#ffd600] text-[#063c1f] flex items-center justify-center">
              <Upload className="w-5 h-5" />
            </div>
            <p className="text-sm text-white font-bold">Drop photos or click to browse</p>
            <p className="text-xs text-slate-300">JPG • PNG • HEIC • Up to 4 photos</p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-4 gap-3">
          {Array.from({ length: 4 }).map((_, i) => {
            const f = files[i];
            return (
              <div key={i} className="w-full h-20 rounded-lg bg-[#042915] border border-[#0b6635] overflow-hidden flex items-center justify-center">
                {f ? (
                  // preview
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={URL.createObjectURL(f)} alt={f.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="text-xs text-slate-400">Empty</div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-5 flex items-center justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 rounded-xl bg-transparent border border-[#0b6635] text-slate-300">Cancel</button>
          <button onClick={handleGenerate} disabled={isGenerating || files.length===0} className="px-4 py-2 rounded-xl bg-[#ffd600] text-[#063c1f] font-black">{isGenerating ? 'Generating...' : 'Generate Team Frame'}</button>
        </div>
      </div>
    </div>
  );
};

export default TeamBuilder;
