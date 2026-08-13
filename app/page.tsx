'use client';

import React, { useState } from 'react';
import { Header } from '../components/Header';
import { HeroLanding } from '../components/HeroLanding';
import { UploadZone } from '../components/UploadZone';
import { FramePreview } from '../components/FramePreview';
import { EditorControls } from '../components/EditorControls';
import { ResultModal } from '../components/ResultModal';
import { FrameStyle } from '../types/image';
import { processUploadedFile } from '../lib/imageProcessor';
import { renderFrameToCanvas } from '../lib/canvasRenderer';
import { Sparkles, Image as ImageIcon } from 'lucide-react';
import TeamBuilder from '../components/TeamBuilder';

export default function Home() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [zoom, setZoom] = useState<number>(1.0);
  const [positionX, setPositionX] = useState<number>(0);
  const [positionY, setPositionY] = useState<number>(0);
  const [rotation, setRotation] = useState<number>(0);
  const [frameStyle, setFrameStyle] = useState<FrameStyle>('official');
  const [name, setName] = useState<string>('Aarav Singh');
  const [stack, setStack] = useState<string>('Full Stack Builder');
  const [builderClass, setBuilderClass] = useState<string>('A1');

  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isResultOpen, setIsResultOpen] = useState<boolean>(false);
  const [previewDataUrl, setPreviewDataUrl] = useState<string | null>(null);
  const [showTeamBuilder, setShowTeamBuilder] = useState<boolean>(false);

  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

  const handleSelectFile = async (file: File) => {
    setIsProcessing(true);
    setError(null);
    try {
      const result = await processUploadedFile(file);
      setImageSrc(result.dataUrl);
      setFileName(result.file.name);
      setZoom(1.0);
      setPositionX(0);
      setPositionY(0);
      setRotation(0);
    } catch (err: any) {
      setError(err?.message || 'Failed to process image file.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setZoom(1.0);
    setPositionX(0);
    setPositionY(0);
    setRotation(0);
  };

  const handleGenerateFrame = async () => {
    if (!imageSrc) return;

    try {
      const offscreenCanvas = document.createElement('canvas');
      await renderFrameToCanvas(offscreenCanvas, {
        imageSrc,
        zoom,
        positionX,
        positionY,
        rotation,
        frameStyle,
        name,
        stack,
        builderClass,
      });

      const dataUrl = offscreenCanvas.toDataURL('image/png');
      setPreviewDataUrl(dataUrl);
      setIsResultOpen(true);
    } catch (err: any) {
      console.error('Frame generation error:', err);
      setError('Could not generate final frame image. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between text-slate-100 selection:bg-[#ffd600] selection:text-black">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6 sm:py-10 flex flex-col justify-center">
        
        {!imageSrc ? (
          /* Landing Screen */
          <HeroLanding onSelectFile={handleSelectFile} isLoading={isProcessing} onOpenTeamBuilder={() => setShowTeamBuilder(true)} />
        ) : (
          /* Editor Screen */
          <div className="w-full max-w-4xl mx-auto space-y-8 animate-fadeIn">
            
            {/* Top Editor Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-[#042915] border-2 border-[#0b6635]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#ffd600] text-[#063c1f] flex items-center justify-center font-bold">
                  <ImageIcon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white line-clamp-1">{fileName}</p>
                  <p className="text-xs text-[#ffd600] font-mono">Photo Loaded • Drag canvas to fit</p>
                </div>
              </div>

              <div className="w-full sm:w-auto">
                <UploadZone
                  onSelectFile={handleSelectFile}
                  isProcessing={isProcessing}
                  error={error}
                />
              </div>
            </div>

            {/* Workspace: Preview + Controls */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Canvas Preview */}
              <div className="lg:col-span-6 flex flex-col items-center">
                <FramePreview
                  imageSrc={imageSrc}
                  zoom={zoom}
                  positionX={positionX}
                  positionY={positionY}
                  rotation={rotation}
                  frameStyle={frameStyle}
                  onPositionChange={(newX, newY) => {
                    setPositionX(newX);
                    setPositionY(newY);
                  }}
                />
              </div>

              {/* Right Column: Controls & Action */}
              <div className="lg:col-span-6 space-y-6">
                <div className="goa-card rounded-[28px] p-5">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-mono-tech uppercase tracking-[0.28em] text-[#4de2ff]">Builder profile</p>
                      <h3 className="mt-1 text-xl font-orbitron uppercase tracking-[0.08em] text-[#ffd600]">Custom identity</h3>
                    </div>
                    <div className="rounded-full border border-[#ffd600]/60 bg-[#ffd600]/10 px-2 py-1 text-[10px] font-mono-tech uppercase tracking-[0.22em] text-[#ffd600]">
                      Live
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <label className="text-left text-xs font-mono-tech uppercase tracking-[0.18em] text-slate-300">
                      <span className="mb-2 block">Name</span>
                      <input value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-xl border border-white/10 bg-[#031812] px-3 py-2.5 text-sm text-white outline-none ring-0 placeholder:text-slate-500 focus:border-[#ffd600]" placeholder="Your name" />
                    </label>
                    <label className="text-left text-xs font-mono-tech uppercase tracking-[0.18em] text-slate-300">
                      <span className="mb-2 block">Builder class</span>
                      <input value={builderClass} onChange={(e) => setBuilderClass(e.target.value)} className="w-full rounded-xl border border-white/10 bg-[#031812] px-3 py-2.5 text-sm text-white outline-none placeholder:text-slate-500 focus:border-[#ffd600]" placeholder="A1" />
                    </label>
                    <label className="sm:col-span-2 text-left text-xs font-mono-tech uppercase tracking-[0.18em] text-slate-300">
                      <span className="mb-2 block">Stack</span>
                      <input value={stack} onChange={(e) => setStack(e.target.value)} className="w-full rounded-xl border border-white/10 bg-[#031812] px-3 py-2.5 text-sm text-white outline-none placeholder:text-slate-500 focus:border-[#ffd600]" placeholder="Full-stack engineer" />
                    </label>
                  </div>
                </div>

                <EditorControls
                  zoom={zoom}
                  rotation={rotation}
                  frameStyle={frameStyle}
                  onZoomChange={setZoom}
                  onPositionChange={(dx, dy) => {
                    setPositionX((prev) => prev + dx);
                    setPositionY((prev) => prev + dy);
                  }}
                  onRotationChange={setRotation}
                  onFrameStyleChange={setFrameStyle}
                  onReset={handleReset}
                />

                {/* Main CTA */}
                <button
                  onClick={handleGenerateFrame}
                  className="w-full goa-button-yellow py-4 px-6 rounded-2xl text-xl font-black tracking-wide shadow-xl flex items-center justify-center gap-2.5 transition-transform"
                >
                  <Sparkles className="w-6 h-6 text-[#ff007a]" />
                  <span>GENERATE & DOWNLOAD FRAME</span>
                </button>

              </div>

            </div>

          </div>
        )}

      </main>

      {/* Download & Share Result Modal */}
      <ResultModal
        isOpen={isResultOpen}
        onClose={() => setIsResultOpen(false)}
        canvasRef={canvasRef}
        previewDataUrl={previewDataUrl}
      />

      {showTeamBuilder && (
        <TeamBuilder
          onClose={() => setShowTeamBuilder(false)}
          onGenerated={(dataUrl) => {
            setPreviewDataUrl(dataUrl);
            setIsResultOpen(true);
          }}
        />
      )}

      {/* Footer */}
      <footer className="w-full border-t border-[#0b6635] bg-[#042915] py-6 px-4 text-center">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <span className="font-serif-display font-bold text-[#ffd600] text-sm">HACKER HOUSE GOA 2026</span>
            <span>•</span>
            <span>28–31 OCT, GOA, INDIA</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[#ff007a] font-mono font-bold text-sm">#FrameInGoa</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
