/** Thème saisonnier : `null` le 1er novembre → pack Halloween masqué, pack AKNO conservé. */
export type SeasonalTheme = "halloween" | null;

export const SEASONAL_THEME: SeasonalTheme = "halloween";

export const STICKER_PATH_AKNO = "/stickers/akno";
export const STICKER_PATH_HALLOWEEN = "/stickers/halloween";

/** @deprecated Utiliser `isHalloweenPackEnabled()` */
export function isSeasonalThemeActive(): boolean {
  return SEASONAL_THEME === "halloween";
}

export function isHalloweenPackEnabled(): boolean {
  return SEASONAL_THEME === "halloween";
}

export function isAknoStickerPackEnabled(): boolean {
  return true;
}

export function shouldShowStickerPack(pack: "akno" | "halloween"): boolean {
  if (pack === "akno") return isAknoStickerPackEnabled();
  return isHalloweenPackEnabled();
}

export function stickerSrc(name: string, pack: "akno" | "halloween"): string {
  const base = pack === "akno" ? STICKER_PATH_AKNO : STICKER_PATH_HALLOWEEN;
  const file = name.endsWith(".png") ? name : `${name}.png`;
  return `${base}/${file}`;
}

/** @deprecated Utiliser `stickerSrc(name, "halloween")` */
export function seasonalStickerSrc(file: string): string {
  return stickerSrc(file, "halloween");
}
