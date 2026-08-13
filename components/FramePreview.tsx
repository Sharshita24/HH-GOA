import React, { useEffect, useRef, useState } from 'react';
import { FrameStyle } from '../types/image';
import { renderFrameToCanvas } from '../lib/canvasRenderer';
import { Move } from 'lucide-react';

interface FramePreviewProps {
  imageSrc: string;
  zoom: number;
  positionX: number;
  positionY: number;
  rotation: number;
  frameStyle: FrameStyle;
  onPositionChange: (newX: number, newY: number) => void;
}

export const FramePreview: React.FC<FramePreviewProps> = ({
  imageSrc,
  zoom,
  positionX,
  positionY,
  rotation,
  frameStyle,
  onPositionChange,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<{ x: number; y: number; posX: number; posY: number }>({
    x: 0,
    y: 0,
    posX: 0,
    posY: 0,
  });

  useEffect(() => {
    if (!canvasRef.current || !imageSrc) return;

    let isMounted = true;
    renderFrameToCanvas(canvasRef.current, {
      imageSrc,
      zoom,
      positionX,
      positionY,
      rotation,
      frameStyle,
    }).catch((err) => {
      if (isMounted) console.error('Canvas render error:', err);
    });

    return () => {
      isMounted = false;
    };
  }, [imageSrc, zoom, positionX, positionY, rotation, frameStyle]);

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      posX: positionX,
      posY: positionY,
    };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDragging) return;

    const displayWidth = containerRef.current?.clientWidth || 360;
    const canvasScale = 1080 / displayWidth;

    const deltaX = (e.clientX - dragStartRef.current.x) * canvasScale;
    const deltaY = (e.clientY - dragStartRef.current.y) * canvasScale;

    onPositionChange(
      Math.round(dragStartRef.current.posX + deltaX),
      Math.round(dragStartRef.current.posY + deltaY)
    );
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (isDragging) {
      setIsDragging(false);
      try {
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
      } catch (err) {
        // Ignore fallback
      }
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Circular Avatar Aspect Ratio Container */}
      <div
        ref={containerRef}
        className="w-full max-w-[400px] aspect-square relative rounded-full overflow-hidden bg-[#042915] shadow-2xl border-4 border-[#ffd600] touch-none select-none group"
      >
        <canvas
          ref={canvasRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className="w-full h-full object-contain cursor-grab active:cursor-grabbing rounded-full"
        />

        {/* Drag Hint Overlay Badge */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity bg-[#063c1f] px-3.5 py-1 rounded-full border-2 border-[#ffd600] text-[11px] text-white flex items-center gap-1.5 font-mono shadow-lg">
          <Move className="w-3.5 h-3.5 text-[#ffd600]" />
          <span>Drag to fit photo</span>
        </div>
      </div>
    </div>
  );
};
