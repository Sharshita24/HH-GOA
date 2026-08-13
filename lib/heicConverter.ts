/**
 * Converts HEIC/HEIF file to JPEG blob using client-side heic2any
 */
export async function convertHeicToJpeg(file: File): Promise<Blob> {
  if (typeof window === 'undefined') {
    throw new Error('HEIC conversion can only run in the browser.');
  }

  try {
    const heic2any = (await import('heic2any')).default;
    const result = await heic2any({
      blob: file,
      toType: 'image/jpeg',
      quality: 0.92,
    });

    if (Array.isArray(result)) {
      return result[0];
    }
    return result;
  } catch (err: any) {
    console.error('HEIC conversion error:', err);
    throw new Error(err?.message || 'Failed to convert HEIC image. Please try converting to JPG or PNG.');
  }
}

export function isHeicFile(file: File): boolean {
  const name = file.name.toLowerCase();
  const type = file.type.toLowerCase();
  return (
    type.includes('heic') ||
    type.includes('heif') ||
    name.endsWith('.heic') ||
    name.endsWith('.heif')
  );
}
