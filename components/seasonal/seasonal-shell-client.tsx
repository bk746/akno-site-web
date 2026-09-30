"use client";

import { useEffect, useState } from "react";

import { FallingLeaves } from "@/components/seasonal/falling-leaves";
import { SeasonalAnimationController } from "@/components/seasonal/seasonal-animation-controller";

/** Feuilles et contrôleur d’animation : montés après le premier rendu (idle). */
export function SeasonalShellClient() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const run = () => setReady(true);
    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(run, { timeout: 2500 });
      return () => window.cancelIdleCallback(id);
    }
    const t = window.setTimeout(run, 1);
    return () => window.clearTimeout(t);
  }, []);

  if (!ready) return null;

  return (
    <>
      <SeasonalAnimationController />
      <FallingLeaves />
    </>
  );
}
