import { withProgrammaticScroll } from "@/lib/programmatic-scroll";

/** Offset sous le header fixe pour les ancres (px). */
export const HEADER_ANCHOR_OFFSET = 96;

export const ANCHOR_SECTION_IDS = [
  "diagnostic",
  "ambitions",
  "services",
  "realisations",
  "processus",
  "a-propos",
  "comparaison",
  "faq",
  "contact",
] as const;

export type AnchorSectionId = (typeof ANCHOR_SECTION_IDS)[number];

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function parseAnchorFromHref(
  href: string,
  pathname: string,
): string | null {
  if (href.startsWith("#") && href.length > 1) {
    return decodeURIComponent(href.slice(1));
  }
  if (
    (pathname === "/" || pathname === "") &&
    href.startsWith("/#") &&
    href.length > 2
  ) {
    return decodeURIComponent(href.slice(2));
  }
  return null;
}

export function anchorScrollTop(element: HTMLElement): number {
  return (
    element.getBoundingClientRect().top +
    window.scrollY -
    HEADER_ANCHOR_OFFSET
  );
}

export function scrollToAnchorElement(
  element: HTMLElement,
  behavior: ScrollBehavior = "instant",
) {
  const top = Math.max(0, anchorScrollTop(element));
  withProgrammaticScroll(() => {
    window.scrollTo({ top, left: 0, behavior });
  });
}

export function markRevealInView(root: Element) {
  root.classList.add("is-inview");
  if (root.hasAttribute("data-akno-reveal-stagger")) {
    root.querySelectorAll("[data-akno-reveal]").forEach((child) => {
      child.classList.add("is-inview");
    });
  }
}

export function revealAnchorSection(id: string) {
  const section = document.getElementById(id);
  if (!section) return;

  section.querySelectorAll("[data-akno-reveal], [data-akno-reveal-stagger]").forEach(
    (node) => markRevealInView(node),
  );
}

export function scrollToAnchorId(
  id: string,
  behavior?: ScrollBehavior,
) {
  const section = document.getElementById(id);
  if (!section) return false;

  const motion = behavior ?? (prefersReducedMotion() ? "instant" : "smooth");
  scrollToAnchorElement(section, motion);
  revealAnchorSection(id);
  return true;
}

const HASH_STABILIZE_MS = 2000;
const HASH_DRIFT_PX = 8;

export function stabilizeHashAnchor(id: string): () => void {
  const section = document.getElementById(id);
  if (!section) return () => {};

  let active = true;
  let targetY = anchorScrollTop(section);

  const sync = () => {
    if (!active) return;
    const nextY = anchorScrollTop(section);
    if (
      Math.abs(nextY - targetY) > HASH_DRIFT_PX ||
      Math.abs(window.scrollY - nextY) > HASH_DRIFT_PX
    ) {
      targetY = nextY;
      withProgrammaticScroll(() => {
        window.scrollTo({
          top: Math.max(0, targetY),
          left: 0,
          behavior: "instant",
        });
      });
      revealAnchorSection(id);
    }
  };

  scrollToAnchorElement(section, "instant");
  revealAnchorSection(id);
  targetY = anchorScrollTop(section);

  const stop = () => {
    if (!active) return;
    active = false;
    window.removeEventListener("wheel", stop, true);
    window.removeEventListener("touchstart", stop, true);
    window.removeEventListener("keydown", onKey, true);
    ro.disconnect();
    window.clearTimeout(endTimer);
  };

  const onKey = (event: KeyboardEvent) => {
    const keys = [
      "ArrowUp",
      "ArrowDown",
      "PageUp",
      "PageDown",
      "Home",
      "End",
      " ",
    ];
    if (keys.includes(event.key)) stop();
  };

  window.addEventListener("wheel", stop, { passive: true, capture: true });
  window.addEventListener("touchstart", stop, { passive: true, capture: true });
  window.addEventListener("keydown", onKey, true);

  const ro = new ResizeObserver(sync);
  ro.observe(section);
  window.addEventListener("load", sync, { once: true });
  void document.fonts.ready.then(sync);

  sync();
  const endTimer = window.setTimeout(stop, HASH_STABILIZE_MS);

  return stop;
}

export function initHashOnLoad(): (() => void) | undefined {
  const hash = window.location.hash;
  if (!hash || hash.length < 2) {
    withProgrammaticScroll(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    });
    return undefined;
  }

  const id = decodeURIComponent(hash.slice(1));
  if (!document.getElementById(id)) {
    withProgrammaticScroll(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    });
    return undefined;
  }

  return stabilizeHashAnchor(id);
}
