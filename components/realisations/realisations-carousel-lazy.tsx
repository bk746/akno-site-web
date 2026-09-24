"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const RealisationsCarousel = dynamic(
  () =>
    import("@/components/realisations/realisations-carousel").then(
      (module) => module.RealisationsCarousel,
    ),
  { ssr: false },
);

type RealisationsCarouselLazyProps = {
  onMobileActiveChange: (index: number) => void;
};

export function RealisationsCarouselLazy({
  onMobileActiveChange,
}: RealisationsCarouselLazyProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const node = hostRef.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShouldLoad(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShouldLoad(true);
          io.disconnect();
        }
      },
      { rootMargin: "280px 0px" },
    );

    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={hostRef} className="realisations-carousel-lazy-host">
      {shouldLoad ? (
        <RealisationsCarousel onMobileActiveChange={onMobileActiveChange} />
      ) : (
        <div
          className="realisations-carousel-lazy-placeholder"
          aria-hidden="true"
        />
      )}
    </div>
  );
}
