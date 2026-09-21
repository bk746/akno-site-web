import Link from "next/link";

import { AboutProfileCard } from "@/components/about/about-profile-card";
import { ContactCta } from "@/components/contact/contact-cta";
import { ArrowUpRight } from "@/components/icons/arrow-up-right";

const CHIPS = [
  "Sites · SEO · Growth",
  "Un interlocuteur",
  "Focus conversion",
] as const;

export function AboutSection() {
  return (
    <section
      id="a-propos"
      className="about-section akno-surface-light"
      aria-labelledby="about-heading"
    >
      <div className="about-section__inner">
        <div className="about-section__grid">
          <div className="about-section__copy order-2 md:order-1" data-akno-reveal>
            <p className="about-eyebrow">À propos</p>
            <h2 id="about-heading" className="about-title">
              Moi, c&apos;est Keryan.
            </h2>
            <p className="about-accent">
              Je construis des sites qui ramènent des clients.
            </p>
            <p className="about-lead">
              Fondateur d&apos;AKNO. Sites sur mesure pour dirigeants qui en
              ont assez du « joli mais inutile ».
            </p>
            <p className="about-body">
              Stratégie, UI/UX, code et SEO — un interlocuteur du brief au
              livré. Clair, fluide, performant : un site qui fait le job d&apos;un
              commercial digital.
            </p>

            <ul className="about-chips">
              {CHIPS.map((chip) => (
                <li key={chip}>
                  <span className="about-chip">{chip}</span>
                </li>
              ))}
            </ul>

            <div className="about-ctas">
              <ContactCta className="about-cta-primary btn btn-primary group">
                On en parle
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </ContactCta>
              <Link href="#realisations" className="about-cta-ghost btn btn-ghost">
                Voir des projets
              </Link>
            </div>
          </div>

          <div className="about-section__media order-1 md:order-2" data-akno-reveal>
            <AboutProfileCard />
          </div>
        </div>
      </div>
    </section>
  );
}
