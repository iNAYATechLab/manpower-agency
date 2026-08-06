/**
 * Step 284: Image & Asset Loading Speed Tune
 */

export const IMAGE_TUNING = {
  formats: ["webp", "avif"] as const,
  sizes: [640, 750, 828, 1080, 1200, 1920],
  quality: 75,
  lazyLoad: true,
  priority: ["hero", "logo"] as const,
};

export function getOptimizedImageProps(src: string, alt: string, priority = false) {
  return {
    src,
    alt,
    loading: priority ? ("eager" as const) : ("lazy" as const),
    quality: IMAGE_TUNING.quality,
    sizes: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
    priority,
  };
}

export function getImageTuningReport(): string {
  return `Tuned: WebP/AVIF, ${IMAGE_TUNING.sizes.length} sizes, quality ${IMAGE_TUNING.quality}, lazyLoad ${IMAGE_TUNING.lazyLoad}`;
}
