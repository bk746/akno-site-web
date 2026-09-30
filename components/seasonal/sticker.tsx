import Image from "next/image";
import type { CSSProperties } from "react";

import { isSeasonalThemeActive, seasonalStickerSrc } from "@/lib/seasonal-theme";

import styles from "@/components/seasonal/sticker.module.css";

export type StickerProps = {
  /** Nom de fichier sans chemin (ex. `citrouille` ou `citrouille.png`) */
  src: string;
  size: number;
  rotate?: number;
  top?: string | number;
  left?: string | number;
  right?: string | number;
  bottom?: string | number;
  className?: string;
  /** Hero : chargement immédiat, sans lazy */
  eager?: boolean;
  float?: boolean;
  floatDelay?: number;
  floatDuration?: number;
  soft?: boolean;
  keepMobile?: boolean;
  hideTablet?: boolean;
  hideMobile?: boolean;
};

function toCss(value: string | number | undefined): string | undefined {
  if (value === undefined) return undefined;
  return typeof value === "number" ? `${value}px` : value;
}

export function Sticker({
  src,
  size,
  rotate = 0,
  top,
  left,
  right,
  bottom,
  className,
  eager = false,
  float = true,
  floatDelay = 0,
  floatDuration = 5,
  soft = false,
  keepMobile = false,
  hideTablet = false,
  hideMobile = false,
}: StickerProps) {
  if (!isSeasonalThemeActive()) return null;

  const imageSrc = seasonalStickerSrc(src);

  const style = {
    "--sticker-size": `${size}px`,
    "--sticker-rotate": `${rotate}deg`,
    "--float-delay": `${floatDelay}s`,
    "--float-duration": `${floatDuration}s`,
    top: toCss(top),
    left: toCss(left),
    right: toCss(right),
    bottom: toCss(bottom),
  } as CSSProperties;

  const classNames = [
    styles.sticker,
    !float ? styles.stickerNoFloat : "",
    soft ? styles.stickerSoft : "",
    keepMobile ? styles.keepMobile : "",
    hideTablet ? styles.hideTablet : "",
    hideMobile ? styles.hideMobile : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Image
      src={imageSrc}
      alt=""
      aria-hidden
      width={size}
      height={size}
      className={classNames}
      style={style}
      sizes={`${size}px`}
      draggable={false}
      loading={eager ? undefined : "lazy"}
      priority={false}
    />
  );
}
