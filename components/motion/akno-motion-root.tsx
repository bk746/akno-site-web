"use client";

import { useEffect } from "react";

import {
  initHashOnLoad,
  markRevealInView,
  parseAnchorFromHref,
  scrollToAnchorId,
} from "@/lib/anchor-scroll";
import { whenIntroReady } from "@/lib/when-intro-ready";

const REVEAL_SELECTOR = "[data-akno-reveal], [data-akno-reveal-stagger]";
const REVEAL_LEAF_SELECTOR = "[data-akno-reveal]";
const THRESHOLD = 0;
const ROOT_MARGIN = "0px 0px 15% 0px";
const MOTION_READY_CLASS = "akno-motion-ready";

function isDisplayed(node: Element) {
  if (!(node instanceof HTMLElement)) return false;
  return window.getComputedStyle(node).display !== "none";
}

function applyRevealSafetyNet() {
  document.querySelectorAll<HTMLElement>(REVEAL_LEAF_SELECTOR).forEach((node) => {
    if (node.classList.contains("is-inview") || !isDisplayed(node)) return;
    const rect = node.getBoundingClientRect();
    const vh = window.innerHeight;
    if (rect.bottom < 0 || (rect.top < vh * 1.02 && rect.bottom > -vh * 0.05)) {
      node.classList.add("is-inview");
    }
  });

  document
    .querySelectorAll<HTMLElement>("[data-akno-reveal-stagger]:not(.is-inview)")
    .forEach((parent) => {
      if (!isDisplayed(parent)) return;
      const rect = parent.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top < window.innerHeight * 1.02) {
        markRevealInView(parent);
      }
    });
}

export function AknoMotionRoot() {
  useEffect(() => {
    let observer: IntersectionObserver | null = null;
    let safetyRaf = 0;
    let hashStop: (() => void) | undefined;
    let observed = new Set<Element>();

    const observeNode = (node: HTMLElement) => {
      if (!observer || node.classList.contains("is-inview")) return;
      if (!isDisplayed(node)) return;
      if (observed.has(node)) return;
      observed.add(node);
      observer.observe(node);
    };

    const scanAndObserve = () => {
      document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR).forEach((node) => {
        observeNode(node);
      });
    };

    const scheduleSafety = () => {
      if (safetyRaf) return;
      safetyRaf = window.requestAnimationFrame(() => {
        safetyRaf = 0;
        applyRevealSafetyNet();
      });
    };

    const start = () => {
      if ("scrollRestoration" in history) {
        history.scrollRestoration = "manual";
      }

      const root = document.documentElement;
      root.classList.add(MOTION_READY_CLASS);

      hashStop = initHashOnLoad();

      applyRevealSafetyNet();

      const seen = new WeakSet<Element>();

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting || seen.has(entry.target)) return;
            seen.add(entry.target);
            markRevealInView(entry.target);
            observer?.unobserve(entry.target);
            observed.delete(entry.target);
          });
        },
        { threshold: THRESHOLD, rootMargin: ROOT_MARGIN },
      );

      scanAndObserve();
      scheduleSafety();

      const ro = new ResizeObserver(() => {
        scanAndObserve();
        scheduleSafety();
      });
      ro.observe(document.body);

      window.addEventListener("scroll", scheduleSafety, { passive: true });

      return () => {
        ro.disconnect();
        window.removeEventListener("scroll", scheduleSafety);
      };
    };

    let teardownMotion: (() => void) | undefined;

    const stopWaiting = whenIntroReady(() => {
      teardownMotion = start();
    });

    const onAnchorClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const target = event.target;
      if (!(target instanceof Element)) return;

      const link = target.closest<HTMLAnchorElement>("a[href]");
      if (!link || link.target === "_blank" || link.hasAttribute("download")) {
        return;
      }

      const href = link.getAttribute("href");
      if (!href) return;

      const id = parseAnchorFromHref(href, window.location.pathname);
      if (!id || !document.getElementById(id)) return;

      event.preventDefault();
      hashStop?.();
      hashStop = undefined;

      scrollToAnchorId(id);
      history.replaceState(null, "", `#${encodeURIComponent(id)}`);
    };

    document.addEventListener("click", onAnchorClick);

    return () => {
      document.removeEventListener("click", onAnchorClick);
      stopWaiting();
      hashStop?.();
      teardownMotion?.();
      if (safetyRaf) window.cancelAnimationFrame(safetyRaf);
      observer?.disconnect();
    };
  }, []);

  return null;
}
