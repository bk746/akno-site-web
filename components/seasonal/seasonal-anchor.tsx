import type { ReactNode } from "react";

import { isSeasonalThemeActive } from "@/lib/seasonal-theme";

import styles from "@/components/seasonal/sticker.module.css";

type SeasonalAnchorProps = {
  children: ReactNode;
  className?: string;
};

/** Point d’ancrage local (coin de carte, bouton, etc.). */
export function SeasonalAnchor({ children, className }: SeasonalAnchorProps) {
  if (!isSeasonalThemeActive()) return null;

  return (
    <span
      className={`${styles.anchor}${className ? ` ${className}` : ""}`}
      aria-hidden="true"
    >
      {children}
    </span>
  );
}
