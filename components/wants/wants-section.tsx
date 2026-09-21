import { ContactCta } from "@/components/contact/contact-cta";
import { ArrowUpRight } from "@/components/icons/arrow-up-right";
import { WantCard } from "@/components/wants/want-card";
import { WANT_CARDS } from "@/components/wants/wants-data";

export function WantsSection() {
  return (
    <section
      id="ambitions"
      className="wants-section akno-surface-light relative z-[1]"
      aria-labelledby="wants-heading"
    >
      <div className="mx-auto max-w-[1160px] px-6 pt-16 sm:pt-20 lg:px-6 lg:pt-24">
        <div
          className="wants-section__intro mx-auto flex max-w-[720px] flex-col items-center text-center"
          data-akno-reveal-stagger
        >
          <h2
            id="wants-heading"
            className="wants-section__title text-balance text-[clamp(2rem,4.2vw,3rem)] font-bold leading-[1.12] tracking-[-0.03em] text-akno-texte"
            data-akno-reveal
          >
            Ce que vous voulez{" "}
            <span className="italic text-akno-cta">vraiment</span>
          </h2>

          <span
            className="wants-section__accent mt-5 block h-2 w-12 rounded-full bg-akno-rose"
            aria-hidden
            data-akno-reveal
          />

          <p
            className="wants-section__lead mt-5 max-w-[560px] text-pretty text-[15px] leading-relaxed text-akno-texte/60 sm:text-base"
            data-akno-reveal
          >
            Pas juste un site joli. Une présence qui convertit, inspire
            confiance, et reste solide après la mise en ligne.
          </p>
        </div>

        <ul
          className="wants-section__cards mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-[2.5rem] lg:grid-cols-4"
          data-akno-reveal-stagger
        >
          {WANT_CARDS.map((item) => (
            <li
              key={item.segments.map((s) => s.text).join("")}
              className="min-w-0"
              data-akno-reveal
            >
              <WantCard item={item} />
            </li>
          ))}
        </ul>

        <div
          className="wants-section__cta relative z-20 mt-10 flex justify-center lg:mt-12"
          data-akno-reveal
        >
          <ContactCta className="btn btn-primary inline-flex w-full max-w-md items-center justify-center gap-2 rounded-full bg-akno-cta px-7 py-3.5 text-[15px] font-medium tracking-[-0.01em] text-white sm:w-auto sm:min-w-[320px]">
            Je veux ce niveau pour mon site
            <ArrowUpRight className="size-4 shrink-0" />
          </ContactCta>
        </div>

        <div className="wants-services-spacer" aria-hidden />
      </div>
    </section>
  );
}
