/** Ligne de sonde sous le haut du viewport (alignée sur le logo). */
export const HEADER_PROBE_Y = 52;

const SERVICES_ENTER_DARK_PX = 56;
const SERVICES_ENTER_LIGHT_PX = 20;
const HYSTERESIS_BAND_PX = 120;

function sectionIsLight(el: HTMLElement): boolean {
  if (el.classList.contains("akno-surface-light")) return true;
  if (el.getAttribute("data-akno-surface") === "light") return true;
  return false;
}

export function headerProbeRootMargin() {
  const vh = window.innerHeight;
  const bottom = Math.max(0, vh - HEADER_PROBE_Y - 1);
  return `-${HEADER_PROBE_Y}px 0px -${bottom}px 0px`;
}

function probeRootMargin() {
  return headerProbeRootMargin();
}

export function attachHeaderSurfaceObserver(
  onLightChange: (onLight: boolean) => void,
): () => void {
  if (typeof window === "undefined") return () => {};

  const sections = Array.from(
    document.querySelectorAll<HTMLElement>(
      "main section[data-akno-surface], main section.akno-surface-light",
    ),
  );
  const servicesEl = document.getElementById("services");
  const services =
    servicesEl?.getAttribute("data-akno-surface") === "dark" ? servicesEl : null;
  const intersecting = new Set<Element>();
  let prevLight = false;
  let bootstrapped = false;
  let servicesTop = Number.POSITIVE_INFINITY;
  let io: IntersectionObserver | null = null;

  /** Section dont le fond est réellement sous le logo (pas la dernière du DOM dans la bande IO). */
  const pickActiveSection = (): HTMLElement | null => {
    let active: HTMLElement | null = null;
    let bestTop = -Infinity;

    for (const section of sections) {
      if (!intersecting.has(section)) continue;
      const { top, bottom } = section.getBoundingClientRect();
      if (top > HEADER_PROBE_Y || bottom <= HEADER_PROBE_Y) continue;
      if (top > bestTop) {
        bestTop = top;
        active = section;
      }
    }

    return active;
  };

  const resolveOnLight = (): boolean => {
    const active = pickActiveSection();
    if (!active) return prevLight;

    const nearServices =
      Number.isFinite(servicesTop) &&
      servicesTop >= HEADER_PROBE_Y - HYSTERESIS_BAND_PX &&
      servicesTop <= HEADER_PROBE_Y + HYSTERESIS_BAND_PX + 80;

    if (services && nearServices) {
      if (prevLight) {
        return servicesTop > HEADER_PROBE_Y + SERVICES_ENTER_DARK_PX;
      }
      return servicesTop > HEADER_PROBE_Y - SERVICES_ENTER_LIGHT_PX;
    }

    return sectionIsLight(active);
  };

  const emit = (force = false) => {
    const next = resolveOnLight();
    if (force || !bootstrapped || next !== prevLight) {
      bootstrapped = true;
      prevLight = next;
      onLightChange(next);
    }
  };

  const connect = () => {
    io?.disconnect();
    intersecting.clear();

    io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.target === services) {
            servicesTop = entry.boundingClientRect.top;
          }
          if (entry.isIntersecting) intersecting.add(entry.target);
          else intersecting.delete(entry.target);
        }
        emit();
      },
      { root: null, rootMargin: probeRootMargin(), threshold: 0 },
    );

    sections.forEach((section) => io?.observe(section));
    emit(true);
  };

  connect();
  window.addEventListener("resize", connect, { passive: true });

  return () => {
    window.removeEventListener("resize", connect);
    io?.disconnect();
  };
}
