import Image from "next/image";
import type { CSSProperties } from "react";

import { isSeasonalThemeActive, seasonalStickerSrc } from "@/lib/seasonal-theme";

import styles from "@/components/seasonal/sticker.module.css";

const LEAVES = [
  { id: "l1", left: "4%", delay: 0, duration: 32, rotate: -18, size: 52 },
  { id: "l2", left: "92%", delay: 8, duration: 26, rotate: 14, size: 48 },
  { id: "l3", left: "7%", delay: 16, duration: 30, rotate: 22, size: 44 },
  { id: "l4", left: "88%", delay: 22, duration: 34, rotate: -10, size: 56 },
] as const;

export function FallingLeaves() {
  if (!isSeasonalThemeActive()) return null;

  return (
    <div className={styles.fallingRoot} data-seasonal-animate aria-hidden="true">
      {LEAVES.map((leaf) => (
        <span
          key={leaf.id}
          className={styles.fallingLeaf}
          style={
            {
              left: leaf.left,
              "--fall-delay": `${leaf.delay}s`,
              "--fall-duration": `${leaf.duration}s`,
              "--sticker-rotate": `${leaf.rotate}deg`,
            } as React.CSSProperties
          }
        >
          <Image
            src={seasonalStickerSrc("feuille-erable")}
            alt=""
            aria-hidden
            width={leaf.size}
            height={leaf.size}
            className={`${styles.sticker} ${styles.stickerNoFloat} ${styles.stickerSoft}`}
            style={
              {
                "--sticker-size": `${leaf.size}px`,
                "--sticker-rotate": `${leaf.rotate}deg`,
                position: "relative",
                top: 0,
                left: 0,
              } as CSSProperties
            }
            sizes={`${leaf.size}px`}
            draggable={false}
            loading="lazy"
          />
        </span>
      ))}
    </div>
  );
}
