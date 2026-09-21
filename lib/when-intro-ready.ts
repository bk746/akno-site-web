export function isIntroComplete() {
  return document.documentElement.classList.contains("intro-complete");
}

export function whenIntroReady(callback: () => void): () => void {
  if (typeof document === "undefined") return () => {};

  if (isIntroComplete()) {
    callback();
    return () => {};
  }

  const observer = new MutationObserver(() => {
    if (!isIntroComplete()) return;
    observer.disconnect();
    callback();
  });

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });

  return () => observer.disconnect();
}
