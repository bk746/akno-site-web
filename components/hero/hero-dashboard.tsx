import {
  CalendarIcon,
  CheckIcon,
  FileIcon,
  HomeIcon,
  MailIcon,
  MouseIcon,
  RouteIcon,
  SparkIcon,
  TargetIcon,
  TrendIcon,
} from "@/components/hero/hero-icons";
import Image from "next/image";

import { HeroTagPumpkin } from "@/components/seasonal/hero-seasonal-decor";
import logoAkno from "@/src/images/logo-akno-interrupteur.png";
import styles from "@/components/hero/hero-section.module.css";

const cx = (...names: string[]) => names.map((n) => styles[n]).join(" ");

export function HeroDashboard() {
  return (
    <div className={cx("stage")} aria-hidden="true">
      <div className={cx("screen")}>
        <div className={cx("app")}>
          <aside className={cx("side")}>
            <Image
              src={logoAkno}
              alt=""
              aria-hidden
              width={1024}
              height={305}
              className={cx("side__logo")}
              sizes="58px"
            />
            <span className={cx("side__it", "side__it--on")}>
              <HomeIcon />
              Vue d’ensemble
            </span>
            <span className={cx("side__it")}>
              <TrendIcon />
              Trafic
            </span>
            <span className={cx("side__it")}>
              <TargetIcon />
              Conversions
            </span>
            <span className={cx("side__it")}>
              <RouteIcon />
              Parcours
            </span>
            <span className={cx("side__it")}>
              <FileIcon />
              Pages
            </span>
            <div className={cx("side__foot")}>
              <b>Point mensuel</b>
              Vos priorités du mois, expliquées simplement.
            </div>
          </aside>
          <div className={cx("main")}>
            <div className={cx("top")}>
              <h2>Vue d’ensemble</h2>
              <span className={cx("tag")}>
                <HeroTagPumpkin />
                Données d’exemple
              </span>
              <div className={cx("top__r")}>
                <span className={cx("chip")}>
                  <CalendarIcon />
                  30 derniers jours
                </span>
                <span className={cx("chip")}>
                  <SparkIcon />
                  Rapport
                </span>
              </div>
            </div>
            <div className={cx("kpis")}>
              <div className={cx("kpi")}>
                <div className={cx("kpi__l")}>
                  Visites
                  <MouseIcon />
                </div>
                <div className={cx("kpi__v")}>
                  <b>Trafic qualifié</b>
                  <span>
                    <TrendIcon />
                    en hausse
                  </span>
                </div>
                <div className={cx("kpi__bar")}>
                  <i style={{ width: "72%" }} />
                </div>
              </div>
              <div className={cx("kpi")}>
                <div className={cx("kpi__l")}>
                  Demandes
                  <MailIcon />
                </div>
                <div className={cx("kpi__v")}>
                  <b>Formulaire + appels</b>
                  <span>
                    <TrendIcon />
                    en hausse
                  </span>
                </div>
                <div className={cx("kpi__bar")}>
                  <i style={{ width: "58%" }} />
                </div>
              </div>
              <div className={cx("kpi")}>
                <div className={cx("kpi__l")}>
                  Conversion
                  <TargetIcon />
                </div>
                <div className={cx("kpi__v")}>
                  <b>Visites → demandes</b>
                  <span>
                    <TrendIcon />
                    en hausse
                  </span>
                </div>
                <div className={cx("kpi__bar")}>
                  <i style={{ width: "64%" }} />
                </div>
              </div>
              <div className={cx("kpi")}>
                <div className={cx("kpi__l")}>
                  Vitesse
                  <SparkIcon />
                </div>
                <div className={cx("kpi__v")}>
                  <b>Chargement mobile</b>
                  <span>
                    <CheckIcon />
                    rapide
                  </span>
                </div>
                <div className={cx("kpi__bar")}>
                  <i style={{ width: "90%" }} />
                </div>
              </div>
            </div>
            <div className={cx("row")}>
              <div className={cx("card")}>
                <div className={cx("card__h")}>
                  <h3>Évolution du trafic</h3>
                  <div className={cx("legend")}>
                    <span>
                      <i aria-hidden="true" />
                      Après refonte
                    </span>
                    <span>
                      <i className={cx("p")} aria-hidden="true" />
                      Avant
                    </span>
                  </div>
                </div>
                <div className={cx("chart")}>
                  <svg viewBox="0 0 660 190" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="hero-dash-area" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0" stopColor="#6366F1" stopOpacity=".22" />
                        <stop offset="1" stopColor="#6366F1" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <g stroke="rgba(163,177,198,.35)" strokeWidth="1">
                      <path d="M0 40H660M0 90H660M0 140H660" />
                    </g>
                    <path
                      d="M0 150 C30.0 150 30.0 138 60 138 C90.0 138 90.0 142 120 142 C150.0 142 150.0 118 180 118 C210.0 118 210.0 124 240 124 C270.0 124 270.0 100 300 100 C330.0 100 330.0 106 360 106 C390.0 106 390.0 84 420 84 C450.0 84 450.0 90 480 90 C510.0 90 510.0 66 540 66 C570.0 66 570.0 72 600 72 C630.0 72 630.0 50 660 50 L660 190 L0 190 Z"
                      fill="url(#hero-dash-area)"
                    />
                    <path
                      d="M0 160 C30.0 160 30.0 156 60 156 C90.0 156 90.0 158 120 158 C150.0 158 150.0 146 180 146 C210.0 146 210.0 150 240 150 C270.0 150 270.0 138 300 138 C330.0 138 330.0 142 360 142 C390.0 142 390.0 128 420 128 C450.0 128 450.0 132 480 132 C510.0 132 510.0 120 540 120 C570.0 120 570.0 124 600 124 C630.0 124 630.0 112 660 112"
                      fill="none"
                      stroke="#A3ACC4"
                      strokeWidth="2"
                      strokeDasharray="5 5"
                      vectorEffect="non-scaling-stroke"
                    />
                    <path
                      d="M0 150 C30.0 150 30.0 138 60 138 C90.0 138 90.0 142 120 142 C150.0 142 150.0 118 180 118 C210.0 118 210.0 124 240 124 C270.0 124 270.0 100 300 100 C330.0 100 330.0 106 360 106 C390.0 106 390.0 84 420 84 C450.0 84 450.0 90 480 90 C510.0 90 510.0 66 540 66 C570.0 66 570.0 72 600 72 C630.0 72 630.0 50 660 50"
                      fill="none"
                      stroke="#6366F1"
                      strokeWidth="3"
                      strokeLinecap="round"
                      vectorEffect="non-scaling-stroke"
                    />
                  </svg>
                  <div className={cx("chart__x")}>
                    <span>Sem. 1</span>
                    <span>Sem. 2</span>
                    <span>Sem. 3</span>
                    <span>Sem. 4</span>
                  </div>
                </div>
              </div>
              <div className={cx("card", "card--parcours")}>
                <div className={cx("card__h")}>
                  <h3>Parcours vers la demande</h3>
                </div>
                <div className={cx("funnel")}>
                  <div className={cx("fn__row")}>
                    Accueil
                    <span className={cx("fn__bar")}>
                      <i style={{ width: "100%" }} />
                    </span>
                  </div>
                  <div className={cx("fn__row")}>
                    Services
                    <span className={cx("fn__bar")}>
                      <i style={{ width: "68%" }} />
                    </span>
                  </div>
                  <div className={cx("fn__row")}>
                    Réalisations
                    <span className={cx("fn__bar")}>
                      <i style={{ width: "46%" }} />
                    </span>
                  </div>
                  <div className={cx("fn__row")}>
                    Contact
                    <span className={cx("fn__bar")}>
                      <i style={{ width: "28%" }} />
                    </span>
                  </div>
                </div>
                <div className={cx("reco")}>
                  <div className={cx("reco__t")}>Priorités suggérées</div>
                  <div className={cx("reco__it")}>
                    <CheckIcon />
                    Raccourcir le formulaire de contact
                    <em>Conversion</em>
                  </div>
                  <div className={cx("reco__it")}>
                    <CheckIcon />
                    Ajouter un appel à l’action sur Services
                    <em>Parcours</em>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
