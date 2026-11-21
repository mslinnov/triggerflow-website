/** Outils de calcul du parcours « Comment ça marche ». Aucune dépendance. */

/** Borne `v` entre `lo` et `hi`. Une valeur non numérique vaut `lo`. */
export const clamp = (v: number, lo = 0, hi = 1): number => (v > lo ? (v < hi ? v : hi) : lo);

export const lerp = (a: number, b: number, t: number): number => a + (b - a) * t;

/** Lissage doux : t²(3 − 2t). */
export const smooth = (t: number): number => {
  const c = clamp(t);
  return c * c * (3 - 2 * c);
};

/** Lissage cubique, plus marqué au départ et à l'arrivée. */
export const easeInOut = (t: number): number => {
  const c = clamp(t);
  return c < 0.5 ? 4 * c * c * c : 1 - Math.pow(-2 * c + 2, 3) / 2;
};

/** Tirage pseudo-aléatoire reproductible (mulberry32). */
export function rng(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Mélange deux couleurs `#rrggbb`. */
export const mixHex = (a: string, b: string, t: number): string =>
  `#${[1, 3, 5]
    .map((i) =>
      Math.round(lerp(parseInt(a.slice(i, i + 2), 16), parseInt(b.slice(i, i + 2), 16), clamp(t)))
        .toString(16)
        .padStart(2, '0'),
    )
    .join('')}`;

/**
 * Arrondit pour l'écriture dans le HTML. Les fonctions trigonométriques peuvent différer d'une dernière
 * décimale entre le serveur et le navigateur : sans arrondi, React signale un écart à l'hydratation.
 */
export const round = (v: number, digits = 2): number => {
  const k = Math.pow(10, digits);
  return Math.round(v * k) / k;
};
