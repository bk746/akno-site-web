import { ContactCta } from "@/components/contact/contact-cta";
import { FaqCard } from "@/components/faq/faq-card";
import { FAQ_ITEMS } from "@/components/faq/faq-data";
import { ArrowUpRight } from "@/components/icons/arrow-up-right";
import pos from "@/components/seasonal/section-stickers.module.css";
import { StickerAnchor } from "@/components/seasonal/sticker-anchor";
import { Sticker } from "@/components/seasonal/sticker";

export function FaqSection() {
  return (
    <section
      id="faq"
      className="faq-section akno-deferred-section akno-surface-light px-6 py-24 sm:py-28 lg:py-32"
      aria-labelledby="faq-heading"
    >
      <div className="mx-auto max-w-[1120px]">
        <header
          className="faq-section__header relative mx-auto max-w-[680px] text-center"
          data-akno-reveal
        >
          <StickerAnchor corner="tl">
            <Sticker
              name="fantome"
              pack="halloween"
              size="S"
              rotate={-8}
              className={pos.faqGhost}
              hideBelowLg
              voidMobile
              floatDelay={0.1}
            />
          </StickerAnchor>
          <p className="faq-section__eyebrow">FAQ</p>
          <h2 id="faq-heading" className="faq-section__title">
            Tu te poses sûrement{" "}
            <span className="akno-word text-akno-cta">ces questions</span>
          </h2>
          <p className="faq-section__subtitle">
            Des réponses claires. Si la tienne n&apos;y est pas, on en parle en
            20 min.
          </p>
        </header>

        <ul className="faq-grid" data-akno-reveal-stagger>
          {FAQ_ITEMS.map((item) => (
            <li key={item.id} className="relative min-w-0" data-akno-reveal>
              <FaqCard item={item} />
              {item.id === "seo" ? (
                <StickerAnchor corner="tr">
                  <Sticker
                    name="loupe-seo"
                    pack="akno"
                    size="S"
                    rotate={10}
                    className={pos.faqLoupe}
                    hideBelowLg
                    floatDelay={0.35}
                  />
                </StickerAnchor>
              ) : null}
            </li>
          ))}
        </ul>

        <div className="faq-section__cta relative">
          <StickerAnchor corner="bl" className={pos.faqMushroomWrap}>
            <Sticker
              name="champignon"
              pack="halloween"
              size="L"
              rotate={2}
              className={pos.faqMushroom}
              sectionLarge
              voidMobile
              floatDelay={0.55}
            />
          </StickerAnchor>
          <p className="faq-section__cta-label">Encore une question ?</p>
          <ContactCta className="faq-section__cta-button btn btn-primary group">
            Réserver un appel
            <ArrowUpRight className="size-4" />
          </ContactCta>
        </div>
      </div>
    </section>
  );
}
