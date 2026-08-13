export type FrameStyle = 'official' | 'beach' | 'builder-id';

export interface FrameOption {
  id: FrameStyle;
  name: string;
  description: string;
  tagline: string;
}

export interface ImageState {
  imageSrc: string | null;
  file: File | null;
  fileName: string;
  zoom: number; // 0.5 to 3.0
  positionX: number; // offset X px
  positionY: number; // offset Y px
  rotation: number; // 0, 90, 180, 270 degrees
  frameStyle: FrameStyle;
  name: string;
  stack: string;
  builderClass: string;
  isProcessing: boolean;
  error: string | null;
}

export interface ImageDimensions {
  width: number;
  height: number;
  aspectRatio: number;
}
