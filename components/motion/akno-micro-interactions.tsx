"use client";

import { useEffect, useRef } from "react";

import { isProgrammaticScroll } from "@/lib/programmatic-scroll";
import { whenIntroReady } from "@/lib/when-intro-ready";

/** Cartes qui reçoivent un halo suivant le curseur. */
const SPOTLIGHT_SELECTOR = "[data-akno-spotlight]";

function canUsePointerEffects() {
  return (
    window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function AknoMicroInteractions() {
  const progressRef = useRef<HTMLDivElement>(null);

  /* ——— Barre de progression de lecture ——— */
  useEffect(() => {
    const bar = progressRef.current;
    if (!bar) return;

    let raf = 0;
    /* Hauteur max mise en cache : aucune lecture de layout (scrollHeight)
       dans la boucle de scroll. Recalculée seulement quand le document bouge. */
    let maxScroll = 0;
    let visible = false;

    const measure = () => {
      maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
    };

    let scrollEndTimer = 0;
    let userScrollGesture = false;
    const root = document.documentElement;

    const markUserScroll = () => {
      userScrollGesture = true;
    };

    const update = () => {
      raf = 0;
      const y = window.scrollY;
      const ratio = maxScroll > 0 ? clamp(y / maxScroll, 0, 1) : 0;
      bar.style.setProperty("--akno-scroll", ratio.toFixed(4));
      const nextVisible = y > 24;
      if (nextVisible !== visible) {
        visible = nextVisible;
        if (visible) bar.setAttribute("data-visible", "");
        else bar.removeAttribute("data-visible");
      }

      if (userScrollGesture && !isProgrammaticScroll()) {
        root.classList.add("is-scrolling");
        window.clearTimeout(scrollEndTimer);
        scrollEndTimer = window.setTimeout(() => {
          root.classList.remove("is-scrolling");
          userScrollGesture = false;
        }, 150);
      }
    };
    const schedule = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(update);
    };
    const onResize = () => {
      measure();
      schedule();
    };

    const stopWaiting = whenIntroReady(onResize);
    const ro = new ResizeObserver(onResize);
    ro.observe(document.body);
    window.addEventListener("wheel", markUserScroll, { passive: true });
    window.addEventListener("touchstart", markUserScroll, { passive: true });
    window.addEventListener("pointerdown", markUserScroll, { passive: true });
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      stopWaiting();
      ro.disconnect();
      window.removeEventListener("wheel", markUserScroll);
      window.removeEventListener("touchstart", markUserScroll);
      window.removeEventListener("pointerdown", markUserScroll);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", onResize);
      if (raf) window.cancelAnimationFrame(raf);
      window.clearTimeout(scrollEndTimer);
      root.classList.remove("is-scrolling");
    };
  }, []);

  /* ——— Spotlight cartes (un seul listener délégué) ——— */
  useEffect(() => {
    if (!canUsePointerEffects()) return;

    let raf = 0;
    let lastX = 0;
    let lastY = 0;
    let lastTarget: Element | null = null;
    let activeSpot: HTMLElement | null = null;

    const releaseSpot = () => {
      if (!activeSpot) return;
      activeSpot.removeAttribute("data-akno-spot-live");
      activeSpot = null;
    };

    const apply = () => {
      raf = 0;
      if (!(lastTarget instanceof Element)) return;

      /* Spotlight */
      const spot = lastTarget.closest<HTMLElement>(SPOTLIGHT_SELECTOR);
      if (spot !== activeSpot) {
        releaseSpot();
        activeSpot = spot;
        spot?.setAttribute("data-akno-spot-live", "");
      }
      if (spot) {
        const rect = spot.getBoundingClientRect();
        spot.style.setProperty("--akno-mx", `${lastX - rect.left}px`);
        spot.style.setProperty("--akno-my", `${lastY - rect.top}px`);
      }
    };

    const onMove = (event: PointerEvent) => {
      lastX = event.clientX;
      lastY = event.clientY;
      lastTarget = event.target as Element | null;
      if (!raf) raf = window.requestAnimationFrame(apply);
    };

    const onLeave = () => {
      releaseSpot();
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    window.addEventListener("blur", onLeave);

    return () => {
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("blur", onLeave);
      if (raf) window.cancelAnimationFrame(raf);
      onLeave();
    };
  }, []);

  return (
    <div ref={progressRef} className="akno-scroll-progress" aria-hidden />
  );
}
