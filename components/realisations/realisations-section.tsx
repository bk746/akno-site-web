import { RealisationsCarousel } from "@/components/realisations/realisations-carousel";

export function RealisationsSection() {
  return (
    <section
      id="realisations"
      className="realisations-section akno-surface-light relative"
      aria-labelledby="realisations-heading"
    >
      <div className="realisations-section__inner">
        <div className="mx-auto max-w-[1120px] px-6 pt-8 sm:pt-10 lg:pt-12">
          <div
            className="mx-auto flex max-w-[720px] flex-col items-center text-center"
            data-akno-reveal-stagger
          >
            <h2
              id="realisations-heading"
              className="text-balance text-[clamp(2rem,4.2vw,3rem)] font-bold leading-[1.12] tracking-[-0.03em] text-akno-texte"
              data-akno-reveal
            >
              Ce qu&apos;on a{" "}
              <span className="akno-word italic text-akno-cta">construit</span>
            </h2>

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
          <RealisationsCarousel />
        </div>
      </div>
    </section>
  );
}
