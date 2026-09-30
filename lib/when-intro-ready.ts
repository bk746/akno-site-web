/** @deprecated L’intro a été retirée : exécute le callback immédiatement. */
export function isIntroComplete() {
  return true;
}

export function whenIntroReady(callback: () => void): () => void {
  if (typeof document === "undefined") return () => {};
  callback();
  return () => {};
}
