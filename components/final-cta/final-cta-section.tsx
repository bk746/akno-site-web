import Image from "next/image";

import { ContactCta } from "@/components/contact/contact-cta";
import { FinalCtaOrbs } from "@/components/final-cta/final-cta-orbs";
import { ArrowUpRight } from "@/components/icons/arrow-up-right";
import pos from "@/components/seasonal/section-stickers.module.css";
import { StickerAnchor } from "@/components/seasonal/sticker-anchor";
import { Sticker } from "@/components/seasonal/sticker";
import ellipseTopWhite from "@/src/images/Ellipse 2.png";
import ellipsePillBlack from "@/src/images/Ellipse 3 black.png";

export function FinalCtaSection() {
  return (
    <section
      id="contact"
      className="final-cta-section akno-deferred-section"
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

      <div className="final-cta-section__content relative">
        <StickerAnchor corner="edge-l" className={pos.finalCatWrap}>
          <Sticker
            name="chat-noir"
            pack="halloween"
            size="L"
            rotate={-4}
            className={pos.finalCat}
            sectionLarge
            voidMobile
            floatDelay={0.25}
          />
        </StickerAnchor>
        <div className="final-cta-panel" data-akno-reveal="fade">
          <StickerAnchor corner="tr">
            <Sticker
              name="chapeau-sorciere"
              pack="halloween"
              size="M"
              rotate={8}
              className={pos.finalHat}
              hideBelowLg
              floatDelay={0.15}
            />
          </StickerAnchor>
          <StickerAnchor corner="br">
            <Sticker
              name="fleche-croissance"
              pack="akno"
              size="M"
              rotate={6}
              className={pos.finalArrow}
              hideBelowLg
              floatDelay={0.45}
            />
          </StickerAnchor>
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
