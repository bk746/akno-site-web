export function lockBodyScroll() {
  const { body } = document;
  if (body.dataset.aknoScrollLock === "1") return;

  const scrollY = window.scrollY;
  const scrollbar = window.innerWidth - document.documentElement.clientWidth;

  body.dataset.aknoScrollLock = "1";
  body.dataset.aknoScrollY = String(scrollY);
  body.style.overflow = "hidden";
  body.style.paddingRight = scrollbar ? `${scrollbar}px` : "";
  body.style.position = "fixed";
  body.style.top = `-${scrollY}px`;
  body.style.width = "100%";
}

export function unlockBodyScroll() {
  const { body } = document;
  if (body.dataset.aknoScrollLock !== "1") return;

  const scrollY = Number(body.dataset.aknoScrollY || 0);
  body.style.overflow = "";
  body.style.paddingRight = "";
  body.style.position = "";
  body.style.top = "";
  body.style.width = "";
  delete body.dataset.aknoScrollLock;
  delete body.dataset.aknoScrollY;
  // Restauration instantanée, sans animation.
  window.scrollTo({ top: scrollY, left: 0, behavior: "instant" });
}
