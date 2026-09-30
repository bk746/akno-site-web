import Link from "next/link";

import { ContactCta } from "@/components/contact/contact-cta";
import { Glow, SectionGlowLayer } from "@/components/glow/glow";
import {
  DesignVisual,
  SeoVisual,
  SiteVisual,
} from "@/components/services/services-visuals-neo";
import pos from "@/components/seasonal/section-stickers.module.css";
import { StickerAnchor } from "@/components/seasonal/sticker-anchor";
import { Sticker } from "@/components/seasonal/sticker";
import styles from "@/components/services/services-section.module.css";
import { technologiesAccentFont } from "@/components/technologies/technologies-font";

const cx = (...names: string[]) => names.map((n) => styles[n]).join(" ");
const i = styles.i;

const CHECK = (
  <svg className={i} viewBox="0 0 24 24" aria-hidden="true">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

const LINK_ARROW = (
  <svg className={i} viewBox="0 0 24 24" aria-hidden="true">
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

const CTA_ARROW = (
  <svg className={i} viewBox="0 0 24 24" aria-hidden="true">
    <path d="M7 7h10v10" />
    <path d="M7 17 17 7" />
  </svg>
);

export function ServicesSection() {
  return (
    <section
      id="services"
      className={`${cx("svc")} akno-deferred-section`}
      data-akno-surface="light"
      aria-labelledby="services-heading"
    >
      <SectionGlowLayer>
        <Glow
          color="lavender"
          size={700}
          opacity={0.35}
          blur={100}
          top={180}
          left={-140}
        />
        <Glow
          color="rose"
          size={600}
          opacity={0.3}
          blur={100}
          bottom={180}
          right={-120}
          hideBelowMd
        />
      </SectionGlowLayer>
      <span className={cx("svc__fade", "svc__fade--top")} aria-hidden="true" />
      <span className={cx("svc__fade", "svc__fade--bot")} aria-hidden="true" />

      <div className={cx("svc__inner")}>
        <header className={cx("svc__head")}>
          <span className={cx("svc__eyebrow")}>
            <span className={cx("svc__eyebrow-dot")} aria-hidden="true" />
            Expertises
          </span>
          <h2 className={cx("svc__title")} id="services-heading">
            3{" "}
            <span className={`${cx("svc__accent")} ${technologiesAccentFont.className}`}>
              services
            </span>{" "}
            complémentaires
          </h2>
          <p className={cx("svc__sub")}>
            Un seul studio pour concevoir, dessiner et faire connaître votre site.
          </p>
        </header>
        <div className={cx("svc__gridShell")}>
          <StickerAnchor corner="tl" className={pos.svcHatWrap}>
            <Sticker
              name="chapeau-sorciere"
              pack="halloween"
              size="M"
              rotate={-10}
              className={pos.svcHat}
              hideBelowLg
              floatDelay={0.2}
            />
          </StickerAnchor>
          <StickerAnchor corner="bl" className={pos.svcPaletteWrap}>
            <Sticker
              name="palette"
              pack="akno"
              size="S"
              rotate={-4}
              className={pos.svcPalette}
              hideBelowLg
              floatDelay={0.5}
            />
          </StickerAnchor>
          <StickerAnchor corner="tr" className={pos.svcLoupeWrap}>
            <Sticker
              name="loupe-seo"
              pack="akno"
              size="L"
              rotate={12}
              className={pos.svcLoupe}
              sectionLarge
              floatDelay={0.35}
            />
          </StickerAnchor>
          <ul className={cx("svc__grid")}>
          <li className={cx("svc__item")}>
            <article className={cx("card")} data-service="site">
              <span className={cx("card__ring")} aria-hidden="true" />
              <SiteVisual />
              <div className={cx("card__body")}>
                <span className={cx("card__num")}>01</span>
                <h3 className={cx("card__title")}>Site web</h3>
                <p className={cx("card__desc")}>
                  Création ou refonte : un site sur mesure, rapide et pensé pour transformer les
                  visites en demandes.
                </p>
                <ul className={cx("card__pts")}>
                  <li>
                    {CHECK}
                    Structure et textes orientés conversion
                  </li>
                  <li>
                    {CHECK}
                    Design sur mesure, responsive
                  </li>
                  <li>
                    {CHECK}
                    Développement propre, mise en ligne incluse
                  </li>
                </ul>
                <Link
                  className={cx("card__link")}
                  href="#contact"
                  aria-label="En savoir plus sur l'offre Site web"
                >
                  En savoir plus
                  {LINK_ARROW}
                </Link>
              </div>
            </article>
          </li>
          <li className={cx("svc__item")}>
            <article className={cx("card")} data-service="design">
              <span className={cx("card__ring")} aria-hidden="true" />
              <DesignVisual />
              <div className={cx("card__body")}>
                <span className={cx("card__num")}>02</span>
                <h3 className={cx("card__title")}>UI UX Design</h3>
                <p className={cx("card__desc")}>
                  Des parcours clairs où chaque écran a un rôle : clarifier, rassurer, convertir.
                </p>
                <ul className={cx("card__pts")}>
                  <li>
                    {CHECK}
                    Audit UX et parcours client
                  </li>
                  <li>
                    {CHECK}
                    Wireframes puis maquettes haute fidélité
                  </li>
                  <li>
                    {CHECK}
                    Design system léger et réutilisable
                  </li>
                </ul>
                <Link
                  className={cx("card__link")}
                  href="#contact"
                  aria-label="En savoir plus sur l'offre UI UX Design"
                >
                  En savoir plus
                  {LINK_ARROW}
                </Link>
              </div>
            </article>
          </li>
          <li className={cx("svc__item")}>
            <article className={cx("card")} data-service="seo">
              <span className={cx("card__ring")} aria-hidden="true" />
              <SeoVisual />
              <div className={cx("card__body")}>
                <span className={cx("card__num")}>03</span>
                <h3 className={cx("card__title")}>SEO Performance</h3>
                <p className={cx("card__desc")}>
                  Être trouvé sur les bonnes recherches, avec un site qui charge vite.
                </p>
                <ul className={cx("card__pts")}>
                  <li>
                    {CHECK}
                    SEO technique et structure des pages
                  </li>
                  <li>
                    {CHECK}
                    Optimisation des Core Web Vitals
                  </li>
                  <li>
                    {CHECK}
                    Suivi clair et priorités concrètes
                  </li>
                </ul>
                <Link
                  className={cx("card__link")}
                  href="#contact"
                  aria-label="En savoir plus sur l'offre SEO Performance"
                >
                  En savoir plus
                  {LINK_ARROW}
                </Link>
              </div>
            </article>
          </li>
          </ul>
        </div>
        <p className={cx("svc__foot")}>
          Site, design et SEO. Séparés, c’est moyen. Ensemble, c’est un système.
        </p>
        <div className={`${cx("svc__ctas")} relative`}>
          <ContactCta className={cx("svc__cta")} aria-haspopup="dialog">
            Je réserve mon appel
            {CTA_ARROW}
          </ContactCta>
          <StickerAnchor corner="edge-r" className={pos.svcCauldronWrap}>
            <Sticker
              name="chaudron"
              pack="halloween"
              size="M"
              rotate={4}
              className={pos.svcCauldron}
              hideBelowLg
              voidMobile
              floatDelay={0.65}
            />
          </StickerAnchor>
        </div>
      </div>
    </section>
  );
}
