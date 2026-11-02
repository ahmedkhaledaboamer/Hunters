/**
 * Responsive candidates for project photos: every `/<id>.webp` in public/ has `-320`, `-640` and `-160` siblings.
 * Pair with a `sizes` attribute describing how wide the image renders.
 */
export const photoSrcSet = (src: string) =>
src.endsWith('.webp') ?
`${src.replace(/\.webp$/, '-320.webp')} 320w, ${src.replace(/\.webp$/, '-640.webp')} 640w, ${src} 1376w` :
undefined;

/** The 160px variant, for small thumbnails. */
export const photoSmall = (src: string) => src.replace(/\.webp$/, '-160.webp');
