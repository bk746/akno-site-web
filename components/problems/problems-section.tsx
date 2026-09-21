import { ContactCta } from "@/components/contact/contact-cta";
import { ArrowUpRight } from "@/components/icons/arrow-up-right";
import { ProblemsCardsList } from "@/components/problems/problems-cards-list";

export function ProblemsSection() {
  return (
    <section
      id="diagnostic"
      className="akno-surface-light relative z-[1]"
      aria-labelledby="problems-heading"
    >
      <div className="mx-auto max-w-[1120px] px-6 pb-20 pt-[6.25rem] sm:pb-[5.625rem] sm:pt-28 lg:pb-[6.25rem] lg:pt-[7.25rem]">
        <div className="problems">
          <div className="problems-left" data-akno-reveal-stagger>
            <p
              className="text-[11px] font-semibold uppercase leading-none tracking-[0.16em] text-akno-cta"
              data-akno-reveal
            >
              DIAGNOSTIC
            </p>

            <h2
              id="problems-heading"
              className="mt-3 text-balance text-[clamp(2rem,4.2vw,3rem)] font-bold leading-[1.12] tracking-[-0.03em] text-akno-texte"
              data-akno-reveal
            >
              Les{" "}
              <span className="text-akno-cta">6 problèmes</span> récurrents des
              entreprises
            </h2>

            <p
              className="mt-4 max-w-[400px] text-[15px] leading-relaxed tracking-[-0.01em] text-akno-texte/70 lg:text-base"
              data-akno-reveal
            >
              Si tu te reconnais, tu n&apos;es pas seul. Beaucoup
              d&apos;entreprises sont exactement dans ce cas — on est là pour
              débloquer ça.
            </p>

            <ContactCta
              className="btn btn-primary mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-akno-cta px-6 py-3.5 text-[15px] font-medium tracking-[-0.01em] text-white lg:mt-8 lg:w-max"
              data-akno-reveal
            >
              Je veux débloquer mon site
              <ArrowUpRight className="size-4 shrink-0" />
            </ContactCta>
          </div>

          <ProblemsCardsList />
        </div>
      </div>
    </section>
  );
}
