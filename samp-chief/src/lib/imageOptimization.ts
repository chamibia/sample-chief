/**
 * Image optimization utilities for consistent quality and sizing across the app
 */

export interface ImageOptimizationConfig {
  sizes: string;
  quality: number;
}

/**
 * Get optimized sizes and quality for project block images based on grid span
 * Grid span determines viewport coverage, which determines quality needed
 */
export function getProjectBlockOptimization(gridSpan?: string): ImageOptimizationConfig {
  // Default: col-span-1
  let sizes = "(min-width:1280px) 18vw, (min-width:1024px) 24vw, (min-width:640px) 40vw, 80vw";
  let quality = 75;

  if (gridSpan === 'col-span-2' || gridSpan?.includes('col-span-2')) {
    sizes = "(min-width:1280px) 36vw, (min-width:1024px) 48vw, (min-width:640px) 80vw, 100vw";
    quality = 80;
  } else if (gridSpan === 'col-span-3' || gridSpan?.includes('col-span-3')) {
    sizes = "(min-width:1280px) 54vw, (min-width:1024px) 72vw, (min-width:640px) 100vw, 100vw";
    quality = 85;
  } else if (gridSpan === 'col-span-4' || gridSpan?.includes('col-span-4')) {
    sizes = "(min-width:1280px) 72vw, (min-width:1024px) 100vw, (min-width:640px) 100vw, 100vw";
    quality = 90;
  }

  return { sizes, quality };
}

/**
 * Get optimized sizes and quality for project card images
 * Quality tier: LCP (first/priority) > large cards > standard cards
 */
export function getProjectCardOptimization(
  isLCP: boolean,
  isLarge: boolean
): ImageOptimizationConfig {
  // Quality tiers: LCP=75, large cards=85, standard=70
  const quality = isLCP ? 75 : isLarge ? 85 : 70;
  const sizes = isLCP
    ? "(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
    : isLarge
      ? "(max-width: 768px) 100vw, 66vw"
      : "(max-width: 768px) 100vw, 33vw";

  return { sizes, quality };
}
