import { Fragment, type ReactNode } from 'react';

/** The company name in both languages; mentions of it are highlighted in the accent colour. */
const BRAND = /(اتش هانترز|H HUNTERS)/;
const BRAND_WORDS = new Set(['اتش', 'هانترز', 'H', 'HUNTERS']);

/** Wraps every mention of the company name in an accent-coloured span. Non-strings pass through unchanged. */
export function brandify(text: ReactNode): ReactNode {
  if (typeof text !== 'string' || !BRAND.test(text)) return text;
  return text.split(BRAND).map((part, i) =>
  i % 2 === 1 ?
  <span key={i} className="text-accent-ink">{part}</span> :
  <Fragment key={i}>{part}</Fragment>
  );
}

/**
 * For word-by-word renderers (SplitText): marks which words belong to a brand mention, so each word
 * can be coloured on its own. Trailing punctuation ("هانترز؟") still counts as part of the word.
 */
export function brandWordMask(words: string[]): boolean[] {
  const bare = words.map((w) => w.replace(/[^\p{L}]/gu, ''));
  return words.map((_, i) =>
  BRAND_WORDS.has(bare[i]) && (
  bare[i] === 'اتش' && bare[i + 1] === 'هانترز' ||
  bare[i] === 'هانترز' && bare[i - 1] === 'اتش' ||
  bare[i] === 'H' && bare[i + 1] === 'HUNTERS' ||
  bare[i] === 'HUNTERS' && bare[i - 1] === 'H')
  );
}
