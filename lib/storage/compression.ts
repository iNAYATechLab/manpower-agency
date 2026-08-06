/**
 * Step 97: Image Compression Algorithm
 * Compresses images before storage (using sharp-like logic via placeholder)
 */

export interface CompressionOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number; // 0-100
  format?: "jpeg" | "webp" | "png";
}

export interface CompressionResult {
  originalSize: number;
  compressedSize: number;
  ratio: number; // 0-1
  format: string;
  width: number;
  height: number;
}

/**
 * Step 97: Compress image buffer
 * In production, use `sharp` library: sharp(buffer).resize(...).jpeg({quality}).toBuffer()
 * Here we simulate compression
 */
export async function compressImage(
  buffer: Buffer,
  options: CompressionOptions = {}
): Promise<{ buffer: Buffer; result: CompressionResult }> {
  const { maxWidth = 1024, maxHeight = 1024, quality = 80, format = "jpeg" } = options;

  // Simulate: reduce size by quality factor
  const ratio = quality / 100;
  const simulatedReduction = 0.3 + ratio * 0.6; // 30% + quality*60% = 30-90% of original
  const compressedSize = Math.floor(buffer.length * (1 - simulatedReduction * 0.5)); // 15-45% reduction
  const compressedBuffer = buffer.subarray(0, Math.min(buffer.length, compressedSize));

  const result: CompressionResult = {
    originalSize: buffer.length,
    compressedSize: compressedBuffer.length,
    ratio: compressedBuffer.length / buffer.length,
    format,
    width: maxWidth,
    height: maxHeight,
  };

  return { buffer: compressedBuffer, result };
}

/**
 * Check if file is image
 */
export function isImageMime(mimeType: string): boolean {
  return mimeType.startsWith("image/");
}
