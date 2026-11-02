/**
 * Responsive candidates for project photos: every `/<id>.webp` in public/ has a 640px `/<id>-640.webp` sibling.
 * Pair with a `sizes` attribute describing how wide the image renders.
 */
export const photoSrcSet = (src: string) =>
src.endsWith('.webp') ? `${src.replace(/\.webp$/, '-640.webp')} 640w, ${src} 1376w` : undefined;

/** The small variant, for thumbnails. */
export const photoSmall = (src: string) => src.replace(/\.webp$/, '-640.webp');
