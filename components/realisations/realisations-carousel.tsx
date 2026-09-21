"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";

import { RealisationCard } from "@/components/realisations/realisation-card";
import { REALISATIONS } from "@/components/realisations/realisations-data";

const COUNT = REALISATIONS.length;
const SWIPE_THRESHOLD = 52;

function wrapIndex(value: number) {
  return (value + COUNT) % COUNT;
}

function getOffset(index: number, active: number) {
  let offset = index - active;
  if (offset > COUNT / 2) offset -= COUNT;
  if (offset < -COUNT / 2) offset += COUNT;
  return offset;
}

function isTypingTarget(target: EventTarget | null) {
  return (
    target instanceof HTMLElement &&
    Boolean(target.closest("input, textarea, select, [contenteditable='true']"))
  );
}

export function RealisationsCarousel() {
  const [active, setActive] = useState(0);
  const stageRef = useRef<HTMLDivElement>(null);
  const dragStartX = useRef<number | null>(null);

  const goTo = useCallback((next: number) => {
    setActive(wrapIndex(next));
  }, []);

  const goPrev = useCallback(() => {
    setActive((current) => wrapIndex(current - 1));
  }, []);

  const goNext = useCallback(() => {
    setActive((current) => wrapIndex(current + 1));
  }, []);

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    dragStartX.current = event.clientX;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (dragStartX.current === null) return;
    const delta = event.clientX - dragStartX.current;
    if (delta <= -SWIPE_THRESHOLD) goNext();
    else if (delta >= SWIPE_THRESHOLD) goPrev();
    dragStartX.current = null;
  };

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      if (isTypingTarget(event.target)) return;
      if (document.querySelector(".contact-overlay")) return;

      const stage = stageRef.current;
      if (!stage) return;
      const rect = stage.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (!inView) return;

      event.preventDefault();
      if (event.key === "ArrowLeft") goPrev();
      else goNext();
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goPrev, goNext]);

  return (
    <div className="realisations-carousel">
      <div className="realisations-carousel__frame">
        <button
          type="button"
          onClick={goPrev}
          aria-label="Projet précédent"
          className="realisation-arrow realisation-arrow--prev"
        >
          <span aria-hidden>←</span>
        </button>
        <button
          type="button"
          onClick={goNext}
          aria-label="Projet suivant"
          className="realisation-arrow realisation-arrow--next"
        >
          <span aria-hidden>→</span>
        </button>

        <div
          ref={stageRef}
          className="realisations-stage"
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          {REALISATIONS.map((project, index) => {
            const offset = getOffset(index, active);
            if (Math.abs(offset) > 1) return null;

            const isActive = offset === 0;

            return (
              <div
                key={project.id}
                className="realisation-slide"
                data-offset={offset}
                data-active={isActive ? "true" : "false"}
              >
                <RealisationCard project={project} isActive={isActive} />
              </div>
            );
          })}
        </div>
      </div>

      <div className="realisations-dots" role="tablist" aria-label="Projets">
        {REALISATIONS.map((project, index) => (
          <button
            key={project.id}
            type="button"
            role="tab"
            aria-selected={index === active}
            aria-label={`Aller au projet ${project.title}`}
            onClick={() => goTo(index)}
            className={`realisations-dot ${index === active ? "realisations-dot--active" : ""}`}
          />
        ))}
      </div>
    </div>
  );
}
