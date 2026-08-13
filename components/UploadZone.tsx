import React, { useState, useRef } from 'react';
import { Upload, AlertCircle, Loader2 } from 'lucide-react';

interface UploadZoneProps {
  onSelectFile: (file: File) => void;
  isProcessing: boolean;
  error: string | null;
}

export const UploadZone: React.FC<UploadZoneProps> = ({
  onSelectFile,
  isProcessing,
  error,
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onSelectFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onSelectFile(e.target.files[0]);
    }
  };

  return (
    <div className="w-full">
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/heic,image/heif,image/webp"
        onChange={handleFileChange}
        className="hidden"
      />

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !isProcessing && inputRef.current?.click()}
        className={`w-full relative border-3 border-dashed rounded-2xl p-5 sm:p-6 text-center cursor-pointer transition-all duration-300 ${
          isDragOver
            ? 'border-[#ffd600] bg-[#ffd600]/20 scale-[1.01]'
            : 'border-[#ffd600]/70 bg-[#042915] hover:border-[#ffd600] hover:bg-[#0b6635]'
        }`}
      >
        {isProcessing ? (
          <div className="flex flex-col items-center justify-center py-2">
            <Loader2 className="w-9 h-9 text-[#ffd600] animate-spin mb-2" />
            <p className="text-sm font-bold text-white">Processing photo...</p>
            <p className="text-xs text-slate-300 mt-0.5">Converting HEIC / Adjusting canvas fit</p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-1.5">
            <div className="w-10 h-10 rounded-xl bg-[#ffd600] text-[#063c1f] flex items-center justify-center font-bold mb-0.5">
              <Upload className="w-5 h-5" />
            </div>
            <p className="text-sm font-black text-white">
              Drop new photo or <span className="text-[#ffd600] underline">browse</span>
            </p>
            <p className="text-[11px] font-mono text-slate-300">
              JPG • PNG • HEIC (Max 10 MB)
            </p>
          </div>
        )}
      </div>

      {error && (
        <div className="mt-3 p-3 rounded-xl bg-[#ff007a]/20 border border-[#ff007a] text-white text-xs flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-[#ff007a] shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};
