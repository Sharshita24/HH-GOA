import { convertHeicToJpeg, isHeicFile } from './heicConverter';

export const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB

export async function processUploadedFile(file: File): Promise<{
  dataUrl: string;
  file: File;
}> {
  // Validate file size
  if (file.size > MAX_FILE_SIZE_BYTES) {
    throw new Error('Image is too large. Please upload an image under 10 MB.');
  }

  let processableFile = file;

  // HEIC conversion check
  if (isHeicFile(file)) {
    try {
      const blob = await convertHeicToJpeg(file);
      processableFile = new File([blob], file.name.replace(/\.(heic|heif)$/i, '.jpg'), {
        type: 'image/jpeg',
      });
    } catch (err: any) {
      throw new Error(err.message || 'HEIC image conversion failed. Please use JPG or PNG.');
    }
  }

  // Verify valid image type
  const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  if (!validTypes.includes(processableFile.type) && !processableFile.name.match(/\.(jpg|jpeg|png|webp)$/i)) {
    throw new Error('Unsupported image format. Please upload JPG, PNG, or WEBP.');
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (typeof e.target?.result === 'string') {
        resolve({
          dataUrl: e.target.result,
          file: processableFile,
        });
      } else {
        reject(new Error('Failed to read image file content.'));
      }
    };
    reader.onerror = () => reject(new Error('Error reading image file.'));
    reader.readAsDataURL(processableFile);
  });
}

export function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('Failed to load image element into canvas.'));
    img.src = src;
  });
}
