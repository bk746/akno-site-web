import type { ReactNode } from "react";

import styles from "@/components/seasonal/sticker-anchor.module.css";

export type StickerCorner = "tl" | "tr" | "bl" | "br" | "edge-l" | "edge-r";

type StickerAnchorProps = {
  children: ReactNode;
  corner?: StickerCorner;
  className?: string;
};

const CORNER_CLASS: Record<StickerCorner, string> = {
  tl: styles.cornerTl,
  tr: styles.cornerTr,
  bl: styles.cornerBl,
  br: styles.cornerBr,
  "edge-l": styles.edgeL,
  "edge-r": styles.edgeR,
};

/** Point d’ancrage local (coin ou bord d’une carte / panneau). */
export function StickerAnchor({ children, corner = "tr", className }: StickerAnchorProps) {
  return (
    <span
      className={[styles.anchor, CORNER_CLASS[corner], className].filter(Boolean).join(" ")}
      aria-hidden="true"
    >
      {children}
    </span>
  );
}
