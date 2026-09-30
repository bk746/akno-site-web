import { ContactCta } from "@/components/contact/contact-cta";
import { ArrowUpRight } from "@/components/icons/arrow-up-right";
import { ProcessStepCard } from "@/components/process/process-step-card";
import { PROCESS_STEPS } from "@/components/process/process-data";
import pos from "@/components/seasonal/section-stickers.module.css";
import { StickerAnchor } from "@/components/seasonal/sticker-anchor";
import { Sticker } from "@/components/seasonal/sticker";

export function ProcessSection() {
  return (
    <section
      id="processus"
      className="process-section akno-deferred-section akno-surface-light"
      aria-labelledby="process-heading"
    >
      <div className="process-section__panel">
        <StickerAnchor corner="bl">
          <Sticker
            name="toggle-on"
            pack="akno"
            size="S"
            rotate={-8}
            className={pos.procToggle}
            hideBelowLg
            floatDelay={0.5}
          />
        </StickerAnchor>
        <header className="process-section__header" data-akno-reveal>
          <p className="process-section__eyebrow">Méthode</p>
          <h2 id="process-heading" className="process-section__title">
            Comment on travaille
          </h2>
          <p className="process-section__subtitle">
            Trois étapes. Un interlocuteur. Du cadrage au lancement.
          </p>
        </header>

        <ol
          className="process-steps relative"
          aria-label="Étapes du processus"
          data-akno-reveal-stagger
        >
          <StickerAnchor corner="edge-l" className={pos.procMushroomWrap}>
            <Sticker
              name="champignon"
              pack="halloween"
              size="L"
              rotate={6}
              className={pos.procMushroom}
              sectionLarge
              floatDelay={0.35}
            />
          </StickerAnchor>
          <StickerAnchor corner="edge-r" className={pos.procCheckWrap}>
            <Sticker
              name="check"
              pack="akno"
              size="S"
              rotate={0}
              className={pos.procCheck}
              hideBelowLg
              floatDelay={0.2}
            />
          </StickerAnchor>
          <StickerAnchor corner="br" className={pos.procAcornWrap}>
            <Sticker
              name="gland"
              pack="halloween"
              size="M"
              rotate={-8}
              className={pos.procAcorn}
              hideBelowLg
              floatDelay={0.65}
            />
          </StickerAnchor>
          {PROCESS_STEPS.map((step) => (
            <li key={step.number} className="process-steps__item" data-akno-reveal>
              <ProcessStepCard step={step} />
            </li>
          ))}
        </ol>

        <div className="process-section__cta">
          <ContactCta className="process-section__button btn btn-primary group">
            Je démarre mon projet
            <ArrowUpRight
              className="size-4"
              aria-hidden
            />
          </ContactCta>
          <p className="process-section__trust">
            4–8 semaines · un seul interlocuteur
          </p>
        </div>
      </div>
    </section>
  );
}
