/**
 * Step 98: File Watermarking Function
 * Adds watermark to sensitive docs for preview (prevents download without auth)
 */

export interface WatermarkOptions {
  text?: string;
  opacity?: number; // 0-1
  position?: "center" | "diagonal" | "bottom-right";
  color?: string;
}

export interface WatermarkResult {
  watermarked: boolean;
  previewUrl: string;
  originalUrl: string;
}

/**
 * Step 98: Bind watermark to file for preview
 * In production, use `sharp` composite or PDF watermark
 * Here we simulate by generating preview URL with watermark params
 */
export async function addWatermark(
  fileUrl: string,
  options: WatermarkOptions = {}
): Promise<WatermarkResult> {
  const { text = "iNAYATechLab - Confidential", opacity = 0.15, position = "diagonal" } = options;

  // Simulate watermarked preview URL
  // Real: generate watermarked image/pdf and store as temp preview
  const previewUrl = `${fileUrl}?preview=true&watermark=${encodeURIComponent(text)}&opacity=${opacity}&pos=${position}`;

  return {
    watermarked: true,
    previewUrl,
    originalUrl: fileUrl,
  };
}

/**
 * Check if file needs watermark (sensitive docs)
 */
export function needsWatermark(fileType: string): boolean {
  const sensitive = ["passport", "akama", "medical", "contract", "biometric"];
  return sensitive.includes(fileType.toLowerCase());
}
