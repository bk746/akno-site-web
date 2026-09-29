import { useId } from "react";

import styles from "@/components/services/services-section.module.css";

export function SiteVisual() {
  const id = useId();
  const skyId = `${id}-sky`;
  const lakeId = `${id}-lake`;

  return (
    <div className={styles.vz} aria-hidden="true">
      <div className={styles.br}>
        <div className={styles.brBar}>
          <span className={styles.brDots}>
            <i></i>
            <i></i>
            <i></i>
          </span>
          <span className={styles.brUrl}>
            <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true">
              <rect width="18" height="11" x="3" y="11" rx="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            akno.fr
          </span>
          <span className={styles.brSp}></span>
        </div>
        <div className={styles.brPage}>
          <div className={styles.brNav}>
            <b className={styles.brLogo}>AKNO</b>
            <span className={styles.brLinks}>
              <i></i>
              <i></i>
              <i></i>
            </span>
            <span className={styles.brNavcta}>Contact</span>
          </div>
          <div className={styles.brHero}>
            <div className={styles.brCopy}>
              <span className={styles.brEyebrow}>Studio web · Annecy</span>
              <span className={styles.brH}>Des sites qui ramènent des clients.</span>
              <span className={styles.brLine}></span>
              <span className={`${styles.brLine} ${styles.brLineS}`}></span>
              <span className={styles.brBtn}>Prendre rendez-vous</span>
            </div>
            <div className={styles.brImg}>
              <svg
                className={styles.brLand}
                viewBox="0 0 140 128"
                preserveAspectRatio="xMidYMid slice"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id={skyId} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#5B6BEF" />
                    <stop offset=".55" stopColor="#9A8FD8" />
                    <stop offset="1" stopColor="#F6A3BF" />
                  </linearGradient>
                  <linearGradient id={lakeId} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#7C86D9" />
                    <stop offset="1" stopColor="#3A4290" />
                  </linearGradient>
                </defs>
                <rect width="140" height="128" fill={`url(#${skyId})`} />
                <circle cx="98" cy="46" r="13" fill="#FFE3EC" opacity=".9" />
                <path
                  d="M0 84 L22 58 L34 68 L52 40 L70 64 L82 54 L104 76 L120 62 L140 78 V128 H0Z"
                  fill="#3E4596"
                />
                <path
                  d="M0 92 L18 78 L40 88 L62 70 L84 86 L108 74 L140 90 V128 H0Z"
                  fill="#2B3170"
                />
                <rect y="96" width="140" height="32" fill={`url(#${lakeId})`} />
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
          <div className={styles.brLogos}>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
          </div>
        </div>
      </div>
    </div>
  );
}

export function DesignVisual() {
  return (
    <div className={`${styles.vz} ${styles.vzUx}`} aria-hidden="true">
      <div className={styles.uxCanvas}></div>
      <div className={styles.uxPhone}>
        <span className={styles.uxStatus}></span>
        <span className={styles.uxImg}></span>
        <span className={styles.uxT}></span>
        <span className={`${styles.uxT} ${styles.uxTS}`}></span>
        <span className={styles.uxPbtn}></span>
        <span className={styles.uxRow}>
          <i></i>
          <b></b>
        </span>
        <span className={styles.uxRow}>
          <i></i>
          <b></b>
        </span>
      </div>
      <div className={styles.uxFlow}>
        <i></i>
      </div>
      <div className={styles.uxPanel}>
        <span className={styles.uxLabel}>Composants</span>
        <div className={styles.uxComp}>
          <span className={styles.uxSel}>
            <span className={styles.uxBtn}>Réserver un appel</span>
            <i className={styles.uxH1}></i>
            <i className={styles.uxH2}></i>
            <i className={styles.uxH3}></i>
            <i className={styles.uxH4}></i>
            <span className={styles.uxDim}>160 × 44</span>
          </span>
        </div>
        <div className={`${styles.uxComp} ${styles.uxCompRow}`}>
          <span className={styles.uxInput}>E-mail</span>
          <span className={styles.uxToggle}>
            <i></i>
          </span>
        </div>
        <div className={styles.uxType}>
          <b>Aa</b>
          <span>
            <i></i>
            <i className={styles.uxTypeS}></i>
          </span>
        </div>
        <div className={styles.uxPalette}>
          <i style={{ background: "#6B7CFF" }}></i>
          <i style={{ background: "#7B81BE" }}></i>
          <i style={{ background: "#F88AB0" }}></i>
          <i className={styles.uxSwLight}></i>
        </div>
      </div>
      <div className={styles.uxCursor}>
        <svg className={styles.uxCursorArrow} viewBox="0 0 24 24">
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

type SeoVisualProps = {
  showRankBadge: boolean;
};

export function SeoVisual({ showRankBadge }: SeoVisualProps) {
  return (
    <div className={`${styles.vz} ${styles.vzSeo}`} aria-hidden="true">
      <div className={styles.srSearch}>
        <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <span>création site web annecy</span>
      </div>
      <div className={styles.srResult}>
        <div className={styles.srSite}>
          <span className={styles.srFav}>A</span>
          <span className={styles.srSrc}>
            <b>AKNO</b>
            <small>akno.fr › creation-site-web</small>
          </span>
          {showRankBadge ? <span className={styles.srRank}>Position 1</span> : null}
        </div>
        <span className={styles.srTitle}>Création de site web à Annecy · AKNO</span>
        <span className={styles.srLine}></span>
        <span className={`${styles.srLine} ${styles.srLineS}`}></span>
      </div>
      <div className={styles.srPerf}>
        <div className={styles.lh}>
          <svg viewBox="0 0 44 44">
            <circle className={styles.lhTrack} cx="22" cy="22" r="18" />
            <circle
              className={styles.lhVal}
              cx="22"
              cy="22"
              r="18"
              pathLength={100}
            />
          </svg>
          <b>98</b>
        </div>
        <span className={styles.lhLab}>
          Score
          <br />
          mobile
        </span>
        <div className={styles.srMetrics}>
          <span className={styles.mt}>
            <i></i>LCP <b>1,2 s</b>
          </span>
          <span className={styles.mt}>
            <i></i>CLS <b>0,01</b>
          </span>
          <span className={styles.mt}>
            <i></i>SEO <b>100</b>
          </span>
        </div>
      </div>
    </div>
  );
}
