import { ContactCta } from "@/components/contact/contact-cta";
import { Glow, SectionGlowLayer } from "@/components/glow/glow";
import { ArrowUpRight } from "@/components/icons/arrow-up-right";
import pos from "@/components/seasonal/section-stickers.module.css";
import { StickerAnchor } from "@/components/seasonal/sticker-anchor";
import { Sticker } from "@/components/seasonal/sticker";

export function FinalCtaSection() {
  return (
    <section
      id="contact"
      className="final-cta-section akno-deferred-section akno-surface-light px-6 pb-20 pt-16 sm:pb-24 sm:pt-20 lg:pb-28 lg:pt-24"
      aria-labelledby="final-cta-heading"
    >
      <SectionGlowLayer>
        <Glow
          color="ctaIndigo"
          size={700}
          opacity={0.35}
          blur={120}
          top="58%"
          anchorCenter
        />
      </SectionGlowLayer>
      <div className="final-cta-section__content relative z-[1] mx-auto max-w-[720px]">
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
            Ton site peut enfin{" "}
            <span className="akno-word text-akno-cta">ramener des clients</span>.
          </h2>
          <span
            className="akno-accent-bar final-cta-section__accent mt-5 block h-2 w-12 rounded-full bg-akno-rose"
            aria-hidden
          />
          <p className="final-cta-section__subtitle">
            Cadrage en 20 minutes. On regarde ton existant, tes objectifs, et si
            AKNO est le bon fit.
          </p>

          <ContactCta className="final-cta-section__button btn btn-primary group">
            Je réserve mon appel
            <ArrowUpRight
              className="final-cta-section__button-icon size-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden
            />
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
