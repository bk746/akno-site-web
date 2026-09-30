"use client";

import { useEffect } from "react";

const SELECTOR = "[data-seasonal-animate]";

/** Met en pause les animations saisonnières hors écran (transform uniquement). */
export function SeasonalAnimationController() {
  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>(SELECTOR);
    if (!nodes.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) el.removeAttribute("data-seasonal-paused");
          else el.setAttribute("data-seasonal-paused", "");
        });
      },
      { rootMargin: "12% 0px", threshold: 0 },
    );

    nodes.forEach((node) => io.observe(node));
    return () => io.disconnect();
  }, []);

  return null;
}
