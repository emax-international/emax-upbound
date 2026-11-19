/**
 * Design switches. Each alternative is kept in the code so it can be turned
 * back on by changing the value here.
 */

/**
 * Site header:
 * - 'classic': the original header (glass buttons; the desktop logo floats
 *   over the page) — components/Header.tsx
 * - 'bar': the black rounded menu bar with the logo inside it, built
 *   2026-11-18 — components/HeaderBar.tsx
 */
export type HeaderDesign = 'classic' | 'bar';
export const HEADER_DESIGN: HeaderDesign = 'classic';

/**
 * Homepage hero (both read the same `hero_with_cta` entry):
 * - 'image': the image only (its words are part of the picture) with a mint
 *   SHOP NOW button, bottom right on desktop / bottom left on mobile —
 *   components/home/HomeHeroClassic.tsx
 * - 'text': title (**bold** words), description and an outlined pill button
 *   over a dark fade, built 2026-11-18 — components/home/HomeHero.tsx
 */
export type HomeHeroDesign = 'image' | 'text';
export const HOME_HERO_DESIGN: HomeHeroDesign = 'image';
