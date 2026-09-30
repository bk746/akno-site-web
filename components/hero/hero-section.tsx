// Hero neumorphique blanc (maquette McFly : hero-neumorphique/hero.html).
// La nav de la maquette n'est PAS rendue ici : c'est le SiteHeader fixe du site qui l'affiche
// (logo + « Prendre rendez-vous »), stylé comme la maquette tant qu'il est au-dessus du hero.
import Link from "next/link";

import { ContactCta } from "@/components/contact/contact-cta";
import { HeroDashboard } from "@/components/hero/hero-dashboard";
import { heroKickerFont } from "@/components/hero/hero-font";
import {
  ArrowIcon,
  ChartIcon,
  LayersIcon,
  PlayIcon,
  TargetIcon,
} from "@/components/hero/hero-icons";
import { HeroSeasonalDecor } from "@/components/seasonal/hero-seasonal-decor";
import styles from "@/components/hero/hero-section.module.css";

const cx = (...names: string[]) => names.map((n) => styles[n]).join(" ");

export function HeroSection() {
  return (
    <section
      id="accueil"
      className={cx("hero")}
      data-akno-surface="light"
      aria-labelledby="hero-title"
    >
      <span className={cx("hero__halo", "hero__halo--l")} aria-hidden="true" />
      <span className={cx("hero__halo", "hero__halo--r")} aria-hidden="true" />
      <div className={cx("hero__inner")}>
        <HeroSeasonalDecor />
        <div className={cx("nav")} aria-hidden="true" />
        <div className={cx("head")}>
          <p className={`${cx("kicker")} ${heroKickerFont.className}`}>
            <span className={cx("kicker__dot")} aria-hidden="true" />
            Pour les dirigeants qui veulent un site qui convertit.
          </p>
          <h1 className={cx("h1")} id="hero-title">
            <span>On conçoit ton site,</span>
            <span>on lit tes data,</span>
            <span className={cx("h1__accent")}>et on pousse ton trafic.</span>
          </h1>
          <div className={cx("ctas")}>
            <ContactCta
              className={cx("btn", "btn--accent", "btn--lg")}
              aria-haspopup="dialog"
            >
              Je réserve mon appel
              <ArrowIcon />
            </ContactCta>
            <Link className={cx("btn", "btn--ghost", "btn--lg")} href="#processus">
              <span className={cx("btn__ic")} aria-hidden="true">
                <PlayIcon />
              </span>
              Voir la méthode
            </Link>
          </div>
          <ul className={cx("proofs")}>
            <li className={cx("proof")}>
              <span className={cx("proof__ic")} aria-hidden="true">
                <LayersIcon />
              </span>
              <div>
                <p className={cx("proof__t")}>Bout en bout</p>
                <p className={cx("proof__d")}>Stratégie, design, dev, mise en ligne</p>
              </div>
            </li>
            <li className={cx("proof")}>
              <span className={cx("proof__ic")} aria-hidden="true">
                <ChartIcon />
              </span>
              <div>
                <p className={cx("proof__t")}>Piloté par la data</p>
                <p className={cx("proof__d")}>Trafic, conversion, parcours</p>
              </div>
            </li>
            <li className={cx("proof")}>
              <span className={cx("proof__ic")} aria-hidden="true">
                <TargetIcon />
              </span>
              <div>
                <p className={cx("proof__t")}>Fait pour convertir</p>
                <p className={cx("proof__d")}>Plus de demandes, pas juste plus de pages</p>
              </div>
            </li>
          </ul>
        </div>
        <HeroDashboard />
      </div>
    </section>
  );
}
