"use client";
import { useEffect, useRef, type ReactNode } from "react";
import type { ServiceId } from "@/components/services/services-data";
type ServiceCardShellProps = {
  className: string;
  service: ServiceId;
  children: ReactNode;
};
/** <article> de la carte : pose --mx / --my pour le halo qui suit la souris (souris ou trackpad uniquement). */
export function ServiceCardShell({ className, service, children }: ServiceCardShellProps) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const card = ref.current;
    if (!card) return;
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches
    ) {
      return;
    }
    const onPointerMove = (event: PointerEvent) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${event.clientX - rect.left}px`);
      card.style.setProperty("--my", `${event.clientY - rect.top}px`);
    };
    card.addEventListener("pointermove", onPointerMove);
    return () => card.removeEventListener("pointermove", onPointerMove);
  }, []);
  return (
    <article ref={ref} className={className} data-service={service}>
      {children}
    </article>
  );
}
