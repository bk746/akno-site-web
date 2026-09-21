import Image from "next/image";

import { ContactCta } from "@/components/contact/contact-cta";
import { FinalCtaOrbs } from "@/components/final-cta/final-cta-orbs";
import { ArrowUpRight } from "@/components/icons/arrow-up-right";
import ellipseTopWhite from "@/src/images/Ellipse 2.png";
import ellipsePillBlack from "@/src/images/Ellipse 3 black.png";

export function FinalCtaSection() {
  return (
    <section
      id="contact"
      className="final-cta-section"
      data-akno-surface="dark"
      aria-labelledby="final-cta-heading"
    >
      <div className="final-cta-section__ellipse services-ellipse-top" aria-hidden>
        <Image
          src={ellipseTopWhite}
          alt=""
          className="services-ellipse-white block h-auto w-full min-w-full max-w-none"
          sizes="100vw"
        />
        <Image
          src={ellipsePillBlack}
          alt=""
          className="services-ellipse-pill"
          sizes="80px"
        />
      </div>

      <FinalCtaOrbs />

      <div className="final-cta-section__content">
        <div className="final-cta-panel" data-akno-reveal="fade">
          <p className="final-cta-section__eyebrow">Prochaine étape</p>
          <h2 id="final-cta-heading" className="final-cta-section__title">
            Ton site peut enfin ramener des clients.
          </h2>
          <p className="final-cta-section__subtitle">
            Cadrage en 20 minutes. On regarde ton existant, tes objectifs, et si
            AKNO est le bon fit.
          </p>

          <ContactCta className="final-cta-section__button btn btn-light">
            Je réserve mon appel
            <ArrowUpRight className="final-cta-section__button-icon" aria-hidden />
          </ContactCta>

          <p className="final-cta-section__trust">
            <span>Sans engagement</span>
            <span className="final-cta-section__trust-dot" aria-hidden>
              ·
            </span>
            <span>Appel 20 min</span>
            <span className="final-cta-section__trust-dot" aria-hidden>
              ·
            </span>
            <span>Réponse &lt; 24h</span>
          </p>
        </div>
      </div>
    </section>
  );
}
