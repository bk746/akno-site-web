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
const MOBILE_MAX_WIDTH = 767;
const SCROLL_END_FALLBACK_MS = 120;

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

function formatCounter(index: number) {
  return `${String(index + 1).padStart(2, "0")} / ${String(COUNT).padStart(2, "0")}`;
}

function getActiveIndexFromTrack(
  track: HTMLDivElement,
  slides: HTMLDivElement[],
) {
  const styles = window.getComputedStyle(track);
  const paddingLeft = Number.parseFloat(styles.paddingLeft) || 0;
  const anchorX = track.getBoundingClientRect().left + paddingLeft;

  let bestIndex = 0;
  let bestDistance = Number.POSITIVE_INFINITY;

  slides.forEach((slide, index) => {
    const distance = Math.abs(slide.getBoundingClientRect().left - anchorX);
    if (distance < bestDistance) {
      bestDistance = distance;
      bestIndex = index;
    }
  });

  return bestIndex;
}

function scrollTrackToIndex(
  track: HTMLDivElement,
  slide: HTMLDivElement,
  behavior: ScrollBehavior,
) {
  const paddingLeft = Number.parseFloat(window.getComputedStyle(track).paddingLeft) || 0;
  const targetLeft = Math.max(0, slide.offsetLeft - paddingLeft);
  track.scrollTo({ left: targetLeft, behavior });
}

type RealisationsCarouselProps = {
  onMobileActiveChange?: (index: number) => void;
};

function DesktopRealisationsCarousel() {
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
    <div className="realisations-carousel__desktop">
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
                <RealisationCard project={project} isActive={isActive} variant="desktop" />
              </div>
            );
          })}
        </div>
      </div>

      <div className="realisations-dots realisations-dots--desktop" role="tablist" aria-label="Projets">
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

function MobileRealisationsCarousel({
  onActiveChange,
}: {
  onActiveChange?: (index: number) => void;
}) {
  const [active, setActive] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const startIndexRef = useRef(0);
  const isTouchingRef = useRef(false);
  const isCorrectingRef = useRef(false);

  useEffect(() => {
    onActiveChange?.(active);
  }, [active, onActiveChange]);

  const setActiveIndex = useCallback((index: number) => {
    setActive((current) => (current === index ? current : index));
  }, []);

  const getSlides = useCallback(() => {
    return slideRefs.current.filter(Boolean) as HTMLDivElement[];
  }, []);

  const readActiveIndex = useCallback(() => {
    const track = trackRef.current;
    if (!track) return 0;
    const slides = getSlides();
    if (slides.length === 0) return 0;
    return getActiveIndexFromTrack(track, slides);
  }, [getSlides]);

  const scrollToIndex = useCallback(
    (index: number, behavior: ScrollBehavior = "smooth") => {
      const track = trackRef.current;
      const slide = slideRefs.current[index];
      if (!track || !slide) return;

      scrollTrackToIndex(track, slide, behavior);
      startIndexRef.current = index;
      setActiveIndex(index);
    },
    [setActiveIndex],
  );

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let raf = 0;
    let scrollEndTimer: ReturnType<typeof setTimeout> | null = null;
    let supportsScrollEnd = "onscrollend" in track;

    const syncActiveFromScroll = () => {
      setActiveIndex(readActiveIndex());
    };

    const finishGestureScroll = () => {
      if (isTouchingRef.current || isCorrectingRef.current) return;

      const slides = getSlides();
      if (slides.length === 0) return;

      const currentIndex = getActiveIndexFromTrack(track, slides);
      const startIndex = startIndexRef.current;
      const delta = currentIndex - startIndex;

      if (Math.abs(delta) > 1) {
        const targetIndex = Math.max(
          0,
          Math.min(COUNT - 1, startIndex + (delta > 0 ? 1 : -1)),
        );
        const slide = slideRefs.current[targetIndex];
        if (!slide) return;

        const reduceMotion = window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches;

        isCorrectingRef.current = true;
        scrollTrackToIndex(track, slide, reduceMotion ? "auto" : "smooth");
        startIndexRef.current = targetIndex;
        setActiveIndex(targetIndex);

        if (!supportsScrollEnd) {
          scheduleFinishGestureScroll();
        }
        return;
      }

      startIndexRef.current = currentIndex;
      setActiveIndex(currentIndex);
    };

    const scheduleFinishGestureScroll = () => {
      if (scrollEndTimer) clearTimeout(scrollEndTimer);
      scrollEndTimer = setTimeout(finishGestureScroll, SCROLL_END_FALLBACK_MS);
    };

    const onTouchStart = () => {
      if (!window.matchMedia(`(max-width: ${MOBILE_MAX_WIDTH}px)`).matches) {
        return;
      }
      startIndexRef.current = readActiveIndex();
      isTouchingRef.current = true;
    };

    const onTouchEnd = () => {
      isTouchingRef.current = false;
      if (supportsScrollEnd) return;
      scheduleFinishGestureScroll();
    };

    const onScroll = () => {
      if (raf !== 0) return;
      raf = window.requestAnimationFrame(() => {
        raf = 0;
        syncActiveFromScroll();
      });

      if (!supportsScrollEnd && !isTouchingRef.current) {
        scheduleFinishGestureScroll();
      }
    };

    const onScrollEnd = () => {
      if (isTouchingRef.current) return;
      if (isCorrectingRef.current) {
        isCorrectingRef.current = false;
      }
      finishGestureScroll();
    };

    const onResize = () => {
      supportsScrollEnd = "onscrollend" in track;
      syncActiveFromScroll();
    };

    track.addEventListener("touchstart", onTouchStart, { passive: true });
    track.addEventListener("touchend", onTouchEnd, { passive: true });
    track.addEventListener("touchcancel", onTouchEnd, { passive: true });
    track.addEventListener("scroll", onScroll, { passive: true });
    track.addEventListener("scrollend", onScrollEnd);
    window.addEventListener("resize", onResize, { passive: true });

    startIndexRef.current = readActiveIndex();
    syncActiveFromScroll();

    return () => {
      track.removeEventListener("touchstart", onTouchStart);
      track.removeEventListener("touchend", onTouchEnd);
      track.removeEventListener("touchcancel", onTouchEnd);
      track.removeEventListener("scroll", onScroll);
      track.removeEventListener("scrollend", onScrollEnd);
      window.removeEventListener("resize", onResize);
      if (scrollEndTimer) clearTimeout(scrollEndTimer);
      if (raf !== 0) window.cancelAnimationFrame(raf);
    };
  }, [getSlides, readActiveIndex, setActiveIndex]);

  const onDotClick = useCallback(
    (index: number) => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      scrollToIndex(index, reduceMotion ? "auto" : "smooth");
    },
    [scrollToIndex],
  );

  return (
    <div className="realisations-carousel__mobile">
      <div
        ref={trackRef}
        className="realisations-track"
        role="region"
        aria-roledescription="carousel"
        aria-label="Réalisations"
      >
        {REALISATIONS.map((project, index) => (
          <div
            key={project.id}
            ref={(node) => {
              slideRefs.current[index] = node;
            }}
            className="realisations-track__slide"
          >
            <RealisationCard
              project={project}
              variant="mobile"
              imagePriority={index === 0}
              ariaGroupLabel={`Projet ${index + 1} sur ${COUNT} : ${project.title}`}
            />
          </div>
        ))}
      </div>

      <div
        className="realisations-dots realisations-dots--mobile"
        role="tablist"
        aria-label="Projets"
      >
        {REALISATIONS.map((project, index) => (
          <button
            key={project.id}
            type="button"
            role="tab"
            aria-selected={index === active}
            aria-current={index === active ? "true" : undefined}
            aria-label={`Aller au projet ${project.title}`}
            onClick={() => onDotClick(index)}
            className={`realisations-dot ${index === active ? "realisations-dot--active" : ""}`}
          />
        ))}
      </div>
    </div>
  );
}

export function RealisationsCarousel({
  onMobileActiveChange,
}: RealisationsCarouselProps) {
  return (
    <div className="realisations-carousel">
      <DesktopRealisationsCarousel />
      <MobileRealisationsCarousel onActiveChange={onMobileActiveChange} />
    </div>
  );
}

export { formatCounter, COUNT as REALISATIONS_COUNT };
