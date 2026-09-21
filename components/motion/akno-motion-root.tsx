"use client";

import { useEffect } from "react";

import { whenIntroReady } from "@/lib/when-intro-ready";

const REVEAL_SELECTOR = "[data-akno-reveal], [data-akno-reveal-stagger]";
const THRESHOLD = 0.14;
const ROOT_MARGIN = "0px 0px -6% 0px";
const MOTION_READY_CLASS = "akno-motion-ready";

function isInRevealViewport(node: Element) {
  const rect = node.getBoundingClientRect();
  const vh = window.innerHeight;
  return rect.top < vh * 0.94 && rect.bottom > vh * 0.04;
}

function syncVisibleReveals() {
  document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR).forEach((node) => {
    if (isInRevealViewport(node)) {
      node.classList.add("is-inview");
    }
  });
}

function initScrollPosition() {
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }

  const hash = window.location.hash;
  if (!hash) {
    window.scrollTo(0, 0);
    return;
  }

  const id = decodeURIComponent(hash.slice(1));
  const target = document.getElementById(id);
  if (target) {
    target.scrollIntoView({ block: "start", behavior: "auto" });
  } else {
    window.scrollTo(0, 0);
  }
}

export function AknoMotionRoot() {
  useEffect(() => {
    let observer: IntersectionObserver | null = null;
    let raf = 0;

    const start = () => {
      initScrollPosition();

      const root = document.documentElement;
      root.classList.add(MOTION_READY_CLASS);

      const nodes = Array.from(
        document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR),
      );

      syncVisibleReveals();

      if (nodes.length === 0) return;

      const seen = new WeakSet<Element>();

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting || seen.has(entry.target)) return;
            seen.add(entry.target);
            entry.target.classList.add("is-inview");
            observer?.unobserve(entry.target);
          });
        },
        { threshold: THRESHOLD, rootMargin: ROOT_MARGIN },
      );

      nodes.forEach((node) => {
        if (!node.classList.contains("is-inview")) {
          observer?.observe(node);
        }
      });

      raf = window.requestAnimationFrame(syncVisibleReveals);
    };

    const stopWaiting = whenIntroReady(start);

    return () => {
      stopWaiting();
      if (raf) window.cancelAnimationFrame(raf);
      observer?.disconnect();
    };
  }, []);

  return null;
}
