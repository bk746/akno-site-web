/** Ligne de sonde sous le haut du viewport (alignée sur le logo). */
export const HEADER_PROBE_Y = 52;

/** Hystérésis à la frontière #services (scroll vers le bas). */
const SERVICES_ENTER_DARK_PX = 56;
/** Hystérésis à la frontière #services (scroll vers le haut). */
const SERVICES_ENTER_LIGHT_PX = 20;

const HYSTERESIS_BAND_PX = 120;

type ToneZone = { start: number; light: boolean };

let zones: ToneZone[] = [];
let servicesStart = 0;

function sectionIsLight(el: HTMLElement): boolean {
  if (el.classList.contains("akno-surface-light")) return true;
  if (el.getAttribute("data-akno-surface") === "light") return true;
  return false;
}

export function remeasureHeaderTone() {
  const sections = Array.from(
    document.querySelectorAll<HTMLElement>("main section"),
  );
  zones = sections
    .map((sec) => ({
      start: sec.offsetTop,
      light: sectionIsLight(sec),
    }))
    .sort((a, b) => a.start - b.start);

  servicesStart = document.getElementById("services")?.offsetTop ?? 0;
}

function zoneLightAt(line: number): boolean {
  let light = false;
  for (let i = zones.length - 1; i >= 0; i -= 1) {
    if (line >= zones[i].start) {
      light = zones[i].light;
      break;
    }
  }
  return light;
}

/** Détermine si le header doit être en mode « fond clair » (logo sombre). */
export function resolveHeaderOnLight(scrollY: number, prev: boolean): boolean {
  const line = scrollY + HEADER_PROBE_Y;
  const nearServices =
    line >= servicesStart - HYSTERESIS_BAND_PX &&
    line <= servicesStart + HYSTERESIS_BAND_PX + 80;

  if (nearServices && servicesStart > 0) {
    if (prev) {
      return line < servicesStart + SERVICES_ENTER_DARK_PX;
    }
    return line < servicesStart - SERVICES_ENTER_LIGHT_PX;
  }

  return zoneLightAt(line);
}
