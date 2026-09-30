import Image from "next/image";

import { isSeasonalThemeActive, seasonalStickerSrc } from "@/lib/seasonal-theme";

import styles from "@/components/seasonal/hero-seasonal.module.css";

function HeroSticker({
  file,
  width,
  className,
  eager = true,
}: {
  file: string;
  width: number;
  className: string;
  eager?: boolean;
}) {
  return (
    <Image
      src={seasonalStickerSrc(file)}
      alt=""
      aria-hidden
      width={width}
      height={width}
      className={className}
      style={{ width, height: "auto" }}
      sizes={`${width}px`}
      draggable={false}
      loading={eager ? undefined : "lazy"}
      priority={false}
    />
  );
}

/** Couche stickers hero — positions identiques à hero-halloween.html */
export function HeroSeasonalDecor() {
  if (!isSeasonalThemeActive()) return null;

  return (
    <div className={styles.plane} aria-hidden="true">
      <HeroSticker file="chauve-souris" width={100} className={`${styles.stk} ${styles.stkBat}`} />
      <HeroSticker file="fantome" width={68} className={`${styles.stk} ${styles.stkGhost}`} />
      <HeroSticker
        file="feuille-erable"
        width={54}
        className={`${styles.stk} ${styles.stkLeafCard}`}
      />
      <HeroSticker
        file="spooky-season"
        width={104}
        className={`${styles.stk} ${styles.stkBadge}`}
      />
      <HeroSticker
        file="toile-araignee"
        width={72}
        className={`${styles.stk} ${styles.stkPlain} ${styles.stkWeb}`}
      />
      <span className={`${styles.stkThread} ${styles.stkPlain}`} />
      <svg
        className={`${styles.stk} ${styles.stkPlain} ${styles.stkSpider}`}
        viewBox="0 0 30 30"
        width={22}
        aria-hidden="true"
      >
        <g stroke="#2E2352" strokeWidth="1.6" strokeLinecap="round" fill="none">
          <path d="M11 12 5 7M11 15 3 14M11 18 5 23M19 12l6-5M19 15l8-1M19 18l6 5" />
        </g>
        <ellipse cx="15" cy="15" rx="6" ry="7" fill="#2E2352" />
        <circle cx="13" cy="13" r="1.3" fill="#fff" />
        <circle cx="17" cy="13" r="1.3" fill="#fff" />
      </svg>
      <HeroSticker
        file="feuille-erable"
        width={46}
        className={`${styles.stk} ${styles.stkFall1}`}
      />
      <HeroSticker
        file="feuille-erable"
        width={42}
        className={`${styles.stk} ${styles.stkFall2}`}
      />
    </div>
  );
}

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
