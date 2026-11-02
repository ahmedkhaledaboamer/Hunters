/** Widths of the resized copies generated next to every `/<id>.webp` photo in public/ (`/<id>-<w>.webp`). */
const VARIANTS = [320, 640, 960];

/**
 * Responsive candidates for project photos. Pair with a `sizes` attribute describing how wide the image renders.
 */
export const photoSrcSet = (src: string) =>
src.endsWith('.webp') ?
[...VARIANTS.map((w) => `${src.replace(/\.webp$/, `-${w}.webp`)} ${w}w`), `${src} 1376w`].join(', ') :
undefined;

/** The 160px copy, for small thumbnails. */
export const photoSmall = (src: string) => src.replace(/\.webp$/, '-160.webp');
