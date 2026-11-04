/** Folds case, Arabic diacritics and letter variants, so "الاستشارات" finds "الإستشارات". */
export function normalize(s: string) {
  return s.
  toLowerCase().
  normalize('NFKD').
  replace(/[ً-ٰٟـ]/g, '') // harakat, superscript alef, tatweel
  .replace(/[̀-ͯ]/g, '') // latin accents
  .replace(/[أإآٱ]/g, 'ا').
  replace(/ة/g, 'ه').
  replace(/ى/g, 'ي').
  replace(/ؤ/g, 'و').
  replace(/ئ/g, 'ي').
  replace(/\s+/g, ' ').
  trim();
}

/** Scores an entry against the query words: every word must match; title hits and word starts rank higher. */
export function score(entry: {title: string;text: string;}, words: string[]) {
  const title = normalize(entry.title);
  const text = normalize(entry.text);
  let total = 0;
  for (const w of words) {
    if (title.startsWith(w)) total += 6;else
    if (title.includes(` ${w}`)) total += 5;else
    if (title.includes(w)) total += 3;else
    if (text.includes(w)) total += 1;else
    return 0;
  }
  return total;
}
