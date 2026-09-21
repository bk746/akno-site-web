import { ContactCta } from "@/components/contact/contact-cta";
import { FaqCard } from "@/components/faq/faq-card";
import { FAQ_ITEMS } from "@/components/faq/faq-data";
import { ArrowUpRight } from "@/components/icons/arrow-up-right";

export function FaqSection() {
  return (
    <section
      id="faq"
      className="faq-section akno-surface-light px-6 py-24 sm:py-28 lg:py-32"
      aria-labelledby="faq-heading"
    >
      <div className="mx-auto max-w-[1120px]">
        <header
          className="faq-section__header mx-auto max-w-[680px] text-center"
          data-akno-reveal
        >
          <p className="faq-section__eyebrow">FAQ</p>
          <h2 id="faq-heading" className="faq-section__title">
            Tu te poses sûrement{" "}
            <span className="text-akno-cta">ces questions</span>
          </h2>
          <p className="faq-section__subtitle">
            Des réponses claires. Si la tienne n&apos;y est pas, on en parle en
            20 min.
          </p>
        </header>

        <ul className="faq-grid" data-akno-reveal-stagger>
          {FAQ_ITEMS.map((item) => (
            <li key={item.id} className="min-w-0" data-akno-reveal>
              <FaqCard item={item} />
            </li>
          ))}
        </ul>

        <div className="faq-section__cta">
          <p className="faq-section__cta-label">Encore une question ?</p>
          <ContactCta className="faq-section__cta-button btn btn-primary group">
            Réserver un appel
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </ContactCta>
        </div>
      </div>
    </section>
  );
}
