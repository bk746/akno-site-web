import Image from "next/image";

import { isSeasonalThemeActive, seasonalStickerSrc } from "@/lib/seasonal-theme";

import styles from "@/components/seasonal/hero-seasonal.module.css";

export function HeroTagPumpkin() {
  if (!isSeasonalThemeActive()) return null;

  return (
    <Image
      src={seasonalStickerSrc("citrouille")}
      alt=""
      aria-hidden
      width={13}
      height={13}
      className={styles.tagPk}
      sizes="13px"
      draggable={false}
    />
  );
}
