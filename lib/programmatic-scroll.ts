let programmaticDepth = 0;

export function isProgrammaticScroll() {
  return programmaticDepth > 0;
}

export function withProgrammaticScroll(action: () => void) {
  programmaticDepth += 1;
  try {
    action();
  } finally {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        programmaticDepth = Math.max(0, programmaticDepth - 1);
      });
    });
  }
}
