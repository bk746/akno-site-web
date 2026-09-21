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
            data-akno-reveal
          >
            <h2
              id="realisations-heading"
              className="text-balance text-[clamp(2rem,4.5vw,2.75rem)] font-bold tracking-[-0.03em] text-akno-texte"
            >
              Ce qu&apos;on a construit
            </h2>
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
