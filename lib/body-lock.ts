type LockOptions = {
  /** Force le scroll en haut avant de verrouiller (intro). */
  forceScrollTop?: boolean;
};

export function lockBodyScroll(options?: LockOptions) {
  const { body, documentElement } = document;
  if (body.dataset.aknoScrollLock === "1") return;

  if (options?.forceScrollTop) {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }

  const scrollY = window.scrollY;
  const scrollbar = window.innerWidth - documentElement.clientWidth;

  body.dataset.aknoScrollLock = "1";
  body.dataset.aknoScrollY = String(scrollY);
  documentElement.style.overflow = "hidden";
  body.style.overflow = "hidden";
  body.style.paddingRight = scrollbar ? `${scrollbar}px` : "";
  body.style.position = "fixed";
  body.style.top = `-${scrollY}px`;
  body.style.width = "100%";
}

export function unlockBodyScroll() {
  const { body, documentElement } = document;
  if (body.dataset.aknoScrollLock !== "1") return;

  const scrollY = Number(body.dataset.aknoScrollY || 0);
  documentElement.style.overflow = "";
  body.style.overflow = "";
  body.style.paddingRight = "";
  body.style.position = "";
  body.style.top = "";
  body.style.width = "";
  delete body.dataset.aknoScrollLock;
  delete body.dataset.aknoScrollY;
  window.scrollTo({ top: scrollY, left: 0, behavior: "instant" });
}
