"use client";

import { useCallback, useState } from "react";

import { formatCounter } from "@/components/realisations/realisations-carousel";
import { RealisationsCarouselLazy } from "@/components/realisations/realisations-carousel-lazy";

export function RealisationsSection() {
  const [mobileIndex, setMobileIndex] = useState(0);

  const onMobileActiveChange = useCallback((index: number) => {
    setMobileIndex(index);
  }, []);

  return (
    <section
      id="realisations"
      className="realisations-section akno-deferred-section akno-surface-light relative"
      aria-labelledby="realisations-heading"
    >
      <div className="realisations-section__inner">
        <div className="mx-auto max-w-[1120px] px-6 pt-8 sm:pt-10 lg:pt-12">
          <div
            className="realisations-section__header mx-auto flex max-w-[720px] flex-col items-center text-center"
            data-akno-reveal-stagger
          >
            <div className="realisations-section__title-row">
              <h2
                id="realisations-heading"
                className="text-balance text-[clamp(2rem,4.2vw,3rem)] font-bold leading-[1.12] tracking-[-0.03em] text-akno-texte"
                data-akno-reveal
              >
                Ce qu&apos;on a{" "}
                <span className="akno-word italic text-akno-cta">construit</span>
              </h2>
              <p
                className="realisations-section__counter"
                aria-live="polite"
                aria-atomic="true"
                data-akno-reveal
              >
                {formatCounter(mobileIndex)}
              </p>
            </div>

            <span
              className="akno-accent-bar mt-5 block h-2 w-12 rounded-full bg-akno-rose"
              aria-hidden
            />
          </div>
        </div>

        <div
          className="realisations-carousel-bleed pb-10 sm:pb-12 lg:pb-14"
          data-akno-reveal
        >
          <RealisationsCarouselLazy
            onMobileActiveChange={onMobileActiveChange}
          />
        </div>
      </div>
    </section>
  );
}
