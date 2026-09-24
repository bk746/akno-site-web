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

function shouldObserve(node: HTMLElement) {
  if (node.classList.contains("is-inview")) return false;
  return node.offsetWidth > 0 || node.offsetHeight > 0;
}

/** Une seule passe : éléments déjà scrollés au-dessus du viewport. */
function runRevealSafetyNetOnce() {
  document.querySelectorAll<HTMLElement>(REVEAL_LEAF_SELECTOR).forEach((node) => {
    if (node.classList.contains("is-inview")) return;
    if (node.getBoundingClientRect().bottom < 0) {
      node.classList.add("is-inview");
    }
  });

  document
    .querySelectorAll<HTMLElement>("[data-akno-reveal-stagger]:not(.is-inview)")
    .forEach((parent) => {
      if (parent.getBoundingClientRect().bottom < 0) {
        markRevealInView(parent);
      }
    });
}

export function AknoMotionRoot() {
  useEffect(() => {
    let observer: IntersectionObserver | null = null;
    let mutationObserver: MutationObserver | null = null;
    let hashStop: (() => void) | undefined;
    const observed = new Set<Element>();
    const seen = new WeakSet<Element>();

    const observeNode = (node: HTMLElement) => {
      if (!observer || !shouldObserve(node) || observed.has(node)) return;
      observed.add(node);
      observer.observe(node);
    };

    const registerRevealTree = (root: HTMLElement) => {
      if (root.matches(REVEAL_SELECTOR)) observeNode(root);
      root.querySelectorAll<HTMLElement>(REVEAL_SELECTOR).forEach(observeNode);
    };

    const start = () => {
      if ("scrollRestoration" in history) {
        history.scrollRestoration = "manual";
      }

      document.documentElement.classList.add(MOTION_READY_CLASS);

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

      registerRevealTree(document.body);

      requestAnimationFrame(() => {
        runRevealSafetyNetOnce();
      });

      hashStop = initHashOnLoad();

      mutationObserver = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
          mutation.addedNodes.forEach((node) => {
            if (node instanceof HTMLElement) {
              registerRevealTree(node);
            }
          });
        }
      });
      mutationObserver.observe(document.body, { childList: true, subtree: true });

      return () => {
        mutationObserver?.disconnect();
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
      observer?.disconnect();
    };
  }, []);

  return null;
}
