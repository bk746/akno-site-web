import type { ReactNode } from "react";

import { isSeasonalThemeActive } from "@/lib/seasonal-theme";

import styles from "@/components/seasonal/sticker.module.css";

type SeasonalLayerProps = {
  children: ReactNode;
  className?: string;
  variant?: "section" | "header";
};

export function SeasonalLayer({
  children,
  className,
  variant = "section",
}: SeasonalLayerProps) {
  if (!isSeasonalThemeActive()) return null;

  const base = variant === "header" ? styles.layerHeader : styles.layer;

  return (
    <div className={`${base}${className ? ` ${className}` : ""}`} aria-hidden="true">
      {children}
    </div>
  );
}
