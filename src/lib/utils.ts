export function normalizeEs(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // remove diacritics
    .replace(/[^a-z0-9ñ\s]/g, " ") // keep ñ and digits, remove punctuation
    .replace(/\s+/g, " ")
    .trim();
}

const SEP = "~"; // separator unlikely to appear in Spanish words

export function encodeWords(words: string[]): string {
  return encodeURIComponent(words.join(SEP));
}

export function decodeWords(encoded: string | null): string[] {
  if (!encoded) return [];
  try {
    const raw = decodeURIComponent(encoded);
    return raw
      .split(SEP)
      .map((w) => w.trim())
      .filter(Boolean);
  } catch {
    return [];
  }
}

export function unique<T>(arr: T[]): T[] {
  return Array.from(new Set(arr));
}

export function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function parseUserInputToWords(input: string): string[] {
  // Split on commas, semicolons, newlines and multiple spaces
  const tokens = input
    .replace(/[\r\t]/g, " ")
    .split(/[\n,;]+|\s{2,}/g)
    .map((t) => t.trim())
    .filter(Boolean);
  return tokens;
}
