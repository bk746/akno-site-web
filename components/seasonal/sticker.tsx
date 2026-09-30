import Image from "next/image";
import type { CSSProperties } from "react";

import { shouldShowStickerPack, stickerSrc } from "@/lib/seasonal-theme";

import styles from "@/components/seasonal/sticker.module.css";

export type StickerPack = "akno" | "halloween";
export type StickerSize = "S" | "M" | "L";

const SIZE_PX: Record<StickerSize, number> = {
  S: 84,
  M: 116,
  L: 164,
};

export type StickerProps = {
  name: string;
  pack: StickerPack;
  size: StickerSize;
  rotate?: number;
  top?: string | number;
  left?: string | number;
  right?: string | number;
  bottom?: string | number;
  style?: CSSProperties;
  className?: string;
  eager?: boolean;
  float?: boolean;
  floatDelay?: number;
  floatDuration?: number;
  /** Sticker L conservé seul en dessous de 1024 px */
  sectionLarge?: boolean;
  /** Stickers de marge masqués sous 768 px */
  voidMobile?: boolean;
  /** Masqué sous 1024 px (stickers non-L) */
  hideBelowLg?: boolean;
  /** Conservé sous 1024 px (navbar uniquement) */
  keepOnMobile?: boolean;
};

function toCss(value: string | number | undefined): string | undefined {
  if (value === undefined) return undefined;
  return typeof value === "number" ? `${value}px` : value;
}

export function Sticker({
  name,
  pack,
  size,
  rotate = 0,
  top,
  left,
  right,
  bottom,
  style,
  className,
  eager = false,
  float = true,
  floatDelay = 0,
  floatDuration = 5,
  sectionLarge = false,
  voidMobile = false,
  hideBelowLg = false,
  keepOnMobile = false,
}: StickerProps) {
  if (!shouldShowStickerPack(pack)) return null;

  const px = SIZE_PX[size];
  const imageSrc = stickerSrc(name, pack);

  const mergedStyle = {
    "--sticker-size": `${px}px`,
    "--sticker-rotate": `${rotate}deg`,
    "--float-delay": `${floatDelay}s`,
    "--float-duration": `${floatDuration}s`,
    width: `calc(${px}px * var(--sticker-scale, 1))`,
    height: `calc(${px}px * var(--sticker-scale, 1))`,
    top: toCss(top),
    left: toCss(left),
    right: toCss(right),
    bottom: toCss(bottom),
    ...style,
  } as CSSProperties;

  const classNames = [
    styles.sticker,
    !float ? styles.stickerNoFloat : "",
    sectionLarge ? styles.sectionLarge : "",
    voidMobile ? styles.voidMobile : "",
    hideBelowLg ? styles.hideBelowLg : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Image
      src={imageSrc}
      alt=""
      aria-hidden
      width={px}
      height={px}
      data-akno-section-sticker={keepOnMobile ? undefined : true}
      className={classNames}
      style={mergedStyle}
      sizes={`${px}px`}
      draggable={false}
      loading={eager ? undefined : "lazy"}
      priority={false}
    />
  );
}

export { SIZE_PX as STICKER_SIZE_PX };
