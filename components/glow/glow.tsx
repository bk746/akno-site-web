import type { CSSProperties, ReactNode } from "react";

import styles from "@/components/glow/glow.module.css";

export const GLOW_COLORS = {
  lavender: "#A5B4FC",
  indigo: "#818CF8",
  rose: "#F9A8D4",
  peach: "#FDBA74",
  ctaIndigo: "#6366F1",
} as const;

export type GlowColor = keyof typeof GLOW_COLORS;

export type GlowProps = {
  color: GlowColor;
  size: number;
  opacity?: number;
  blur?: number;
  top?: string | number;
  left?: string | number;
  right?: string | number;
  bottom?: string | number;
  drift?: boolean;
  /** Masqué sous 768 px (2e halo d’une section) */
  hideBelowMd?: boolean;
  /** Centrage horizontal (left: 50 % + marge négative) */
  anchorCenter?: boolean;
  className?: string;
};

function toCss(value: string | number | undefined): string | undefined {
  if (value === undefined) return undefined;
  return typeof value === "number" ? `${value}px` : value;
}

export function SectionGlowLayer({ children }: { children: ReactNode }) {
  return (
    <div className={styles.layer} aria-hidden="true">
      {children}
    </div>
  );
}

export function Glow({
  color,
  size,
  opacity = 0.35,
  blur = 100,
  top,
  left,
  right,
  bottom,
  drift = false,
  hideBelowMd = false,
  anchorCenter = false,
  className,
}: GlowProps) {
  const style = {
    "--glow-color": GLOW_COLORS[color],
    "--glow-size": `${size}px`,
    "--glow-opacity": opacity,
    "--glow-blur": `${blur}px`,
    top: toCss(top),
    left: toCss(left),
    right: toCss(right),
    bottom: toCss(bottom),
  } as CSSProperties;

  const classNames = [
    styles.glow,
    drift ? styles.glowDrift : "",
    hideBelowMd ? styles.glowHideMd : "",
    anchorCenter ? styles.glowAnchorCenter : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return <span className={classNames} style={style} />;
}
