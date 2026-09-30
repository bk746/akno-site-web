import styles from "@/components/services/services-section.module.css";

const cx = (...names: string[]) => names.map((n) => styles[n]).join(" ");
const i = styles.i;

export function SiteVisual() {
  return (
    <div className={cx("vz", "vz--site")} aria-hidden="true">
      <div className={cx("br")}>
        <div className={cx("br__bar")}>
          <span className={cx("br__dots")}>
            <i />
            <i />
            <i />
          </span>
          <span className={cx("br__url")}>
            <svg className={i} viewBox="0 0 24 24" aria-hidden="true">
              <rect width="18" height="11" x="3" y="11" rx="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            akno.fr
          </span>
          <span className={cx("br__sp")} />
        </div>
        <div className={cx("br__page")}>
          <div className={cx("br__nav")}>
            <b className={cx("br__logo")}>AKNO</b>
            <span className={cx("br__links")}>
              <i />
              <i />
              <i />
            </span>
            <span className={cx("br__navcta")}>Contact</span>
          </div>
          <div className={cx("br__hero")}>
            <div className={cx("br__copy")}>
              <span className={cx("br__eyebrow")}>Studio web · Annecy</span>
              <span className={cx("br__h")}>Des sites qui ramènent des clients.</span>
              <span className={cx("br__line")} />
              <span className={`${cx("br__line")} ${cx("br__line--s")}`} />
              <span className={cx("br__btn")}>Prendre rendez-vous</span>
            </div>
            <div className={cx("br__img")}>
              <svg
                className={cx("br__land")}
                viewBox="0 0 140 128"
                preserveAspectRatio="xMidYMid slice"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="svc-sky" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#5B6BEF" />
                    <stop offset=".55" stopColor="#9A8FD8" />
                    <stop offset="1" stopColor="#F6A3BF" />
                  </linearGradient>
                  <linearGradient id="svc-lake" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#7C86D9" />
                    <stop offset="1" stopColor="#3A4290" />
                  </linearGradient>
                </defs>
                <rect width="140" height="128" fill="url(#svc-sky)" />
                <circle cx="98" cy="46" r="13" fill="#FFE3EC" opacity=".9" />
                <path
                  d="M0 84 L22 58 L34 68 L52 40 L70 64 L82 54 L104 76 L120 62 L140 78 V128 H0Z"
                  fill="#3E4596"
                />
                <path
                  d="M0 92 L18 78 L40 88 L62 70 L84 86 L108 74 L140 90 V128 H0Z"
                  fill="#2B3170"
                />
                <rect y="96" width="140" height="32" fill="url(#svc-lake)" />
                <path
                  d="M14 104h22M58 110h30M100 104h18M30 116h26M84 120h24"
                  stroke="#C9CEFF"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  opacity=".45"
                />
              </svg>
            </div>
          </div>
          <div className={cx("br__logos")}>
            <i />
            <i />
            <i />
            <i />
          </div>
        </div>
      </div>
    </div>
  );
}

export function DesignVisual() {
  return (
    <div className={cx("vz", "vz--ux")} aria-hidden="true">
      <div className={cx("ux__canvas")} />
      <div className={cx("ux__phone")}>
        <span className={cx("ux__status")} />
        <span className={cx("ux__img")} />
        <span className={cx("ux__t")} />
        <span className={`${cx("ux__t")} ${cx("ux__t--s")}`} />
        <span className={cx("ux__pbtn")} />
        <span className={cx("ux__row")}>
          <i />
          <b />
        </span>
        <span className={cx("ux__row")}>
          <i />
          <b />
        </span>
      </div>
      <div className={cx("ux__flow")}>
        <i />
      </div>
      <div className={cx("ux__panel")}>
        <span className={cx("ux__label")}>Composants</span>
        <div className={cx("ux__comp")}>
          <span className={cx("ux__sel")}>
            <span className={cx("ux__btn")}>Réserver un appel</span>
            <i className={cx("h1")} />
            <i className={cx("h2")} />
            <i className={cx("h3")} />
            <i className={cx("h4")} />
            <span className={cx("ux__dim")}>160 × 44</span>
          </span>
        </div>
        <div className={`${cx("ux__comp")} ${cx("ux__comp--row")}`}>
          <span className={cx("ux__input")}>E-mail</span>
          <span className={cx("ux__toggle")}>
            <i />
          </span>
        </div>
        <div className={cx("ux__type")}>
          <b>Aa</b>
          <span>
            <i />
            <i className={cx("s")} />
          </span>
        </div>
        <div className={cx("ux__palette")}>
          <i style={{ background: "#6366F1" }} />
          <i style={{ background: "#7B81BE" }} />
          <i style={{ background: "#F88AB0" }} />
          <i className={cx("ux__sw-light")} />
        </div>
      </div>
      <div className={cx("ux__cursor")}>
        <svg className={cx("ux__cursor-arrow")} viewBox="0 0 24 24">
          <path
            d="M4 3l7.5 18 2.4-7.1L21 11.5z"
            fill="#F88AB0"
            stroke="#fff"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
        <span>Design</span>
      </div>
    </div>
  );
}

export function SeoVisual() {
  return (
    <div className={cx("vz", "vz--seo")} aria-hidden="true">
      <div className={cx("sr__search")}>
        <svg className={i} viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <span>création site web annecy</span>
      </div>
      <div className={cx("sr__result")}>
        <div className={cx("sr__site")}>
          <span className={cx("sr__fav")}>A</span>
          <span className={cx("sr__src")}>
            <b>AKNO</b>
            <small>akno.fr › creation-site-web</small>
          </span>
          <span className={cx("sr__rank")}>Position 1</span>
        </div>
        <span className={cx("sr__title")}>Création de site web à Annecy · AKNO</span>
        <span className={cx("sr__line")} />
        <span className={`${cx("sr__line")} ${cx("sr__line--s")}`} />
      </div>
      <div className={cx("sr__perf")}>
        <div className={cx("lh")}>
          <svg viewBox="0 0 44 44">
            <circle className={cx("lh__track")} cx="22" cy="22" r="18" />
            <circle
              className={cx("lh__val")}
              cx="22"
              cy="22"
              r="18"
              pathLength={100}
            />
          </svg>
          <b>98</b>
        </div>
        <span className={cx("lh__lab")}>
          Score
          <br />
          mobile
        </span>
        <div className={cx("sr__metrics")}>
          <span className={cx("mt")}>
            <i />
            LCP <b>1,2 s</b>
          </span>
          <span className={cx("mt")}>
            <i />
            CLS <b>0,01</b>
          </span>
          <span className={cx("mt")}>
            <i />
            SEO <b>100</b>
          </span>
        </div>
      </div>
    </div>
  );
}
