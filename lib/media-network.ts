type NetworkInformationLike = {
  saveData?: boolean;
  effectiveType?: string;
};

export function shouldDeferHeroVideo() {
  if (typeof navigator === "undefined") return false;

  const connection = (navigator as Navigator & {
    connection?: NetworkInformationLike;
  }).connection;

  if (!connection) return false;
  if (connection.saveData) return true;

  const type = connection.effectiveType;
  return type === "slow-2g" || type === "2g" || type === "3g";
}

export function scheduleAfterFirstPaint(callback: () => void) {
  if (typeof window === "undefined") return () => {};

  const run = (): (() => void) => {
    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(() => callback(), { timeout: 2500 });
      return () => window.cancelIdleCallback(id);
    }
    const id = window.setTimeout(callback, 1);
    return () => window.clearTimeout(id);
  };

  if (document.readyState === "complete") {
    const cancel = run();
    return cancel;
  }

  let cancelIdle = () => {};
  const onLoad = () => {
    cancelIdle = run();
  };
  window.addEventListener("load", onLoad, { once: true });
  return () => {
    window.removeEventListener("load", onLoad);
    cancelIdle();
  };
}
