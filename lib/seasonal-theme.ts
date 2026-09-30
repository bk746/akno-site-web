/** Thème saisonnier : passer à `null` le 1er novembre pour tout désactiver. */
export type SeasonalTheme = "halloween" | null;

export const SEASONAL_THEME: SeasonalTheme = "halloween";

export const SEASONAL_STICKERS_PATH = "/stickers/halloween";

export function isSeasonalThemeActive(): boolean {
  return SEASONAL_THEME === "halloween";
}

export function seasonalStickerSrc(file: string): string {
  const name = file.endsWith(".png") ? file : `${file}.png`;
  return `${SEASONAL_STICKERS_PATH}/${name}`;
}
