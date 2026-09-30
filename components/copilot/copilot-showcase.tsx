"use client";

import Image from "next/image";
import { useRef, useState, type KeyboardEvent } from "react";

import { COPILOT_TABS, type CopilotChip } from "@/components/copilot/copilot-data";
import { copilotAccentFont } from "@/components/copilot/copilot-font";
import { ICON_PATHS, type IconKey } from "@/components/copilot/copilot-icons";

import styles from "@/components/copilot/copilot-showcase.module.css";

const RING_C = 2 * Math.PI * 16;

const TONE_CLASS = {
  blue: styles.cBlue,
  pink: styles.cPink,
  green: styles.cGreen,
} as const;

function Icon({ name }: { name: IconKey }) {
  return (
    <svg
      className={styles.icon}
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      {ICON_PATHS[name]}
    </svg>
  );
}

function Ring({ percent, color }: { percent: number; color: string }) {
  return (
    <span className={styles.ring}>
      <svg viewBox="0 0 40 40" aria-hidden="true" focusable="false">
        <circle
          cx="20"
          cy="20"
          r="16"
          fill="none"
          stroke="#D9DFE8"
          strokeWidth="4"
        />
        <circle
          cx="20"
          cy="20"
          r="16"
          fill="none"
          stroke={color}
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={RING_C.toFixed(2)}
          strokeDashoffset={(RING_C * (1 - percent / 100)).toFixed(2)}
        />
      </svg>
      <span className={`${styles.ringValue} ${styles.tnum}`}>{percent}</span>
    </span>
  );
}

function ChipContent({ chip }: { chip: CopilotChip }) {
  if (chip.kind === "ring") {
    return <Ring percent={chip.percent} color={chip.color} />;
  }
  return (
    <span className={`${styles.chipIc} ${TONE_CLASS[chip.tone]}`}>
      <Icon name={chip.icon} />
    </span>
  );
}

export function CopilotShowcase() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  function onTabsKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    const n = COPILOT_TABS.length;
    const map: Record<string, number> = {
      ArrowRight: active + 1,
      ArrowLeft: active - 1,
      Home: 0,
      End: n - 1,
    };
    if (!(e.key in map)) return;
    e.preventDefault();
    const next = (map[e.key] + n) % n;
    setActive(next);
    const btn = tabRefs.current[next];
    btn?.focus();
    btn?.scrollIntoView({ block: "nearest", inline: "nearest" });
  }

  return (
    <section
      id="copilot"
      className={`${styles.section} akno-deferred-section`}
      data-akno-surface="light"
      aria-labelledby="cps-title"
    >
      <div className={styles.inner}>
        <header className={styles.head} data-akno-reveal>
          <span className={styles.eyebrow}>
            <span className={styles.eyebrowDot} aria-hidden="true" />
            AKNO Copilot · Espace client
          </span>
          <h2 className={styles.title} id="cps-title">
            Pilotez votre site avec une{" "}
            <span
              className={`${styles.accent} ${copilotAccentFont.className}`}
            >
              seule application
            </span>
          </h2>
          <p className={styles.sub}>
            Avancement, performances et factures : tout ce qui concerne votre
            site, en temps réel, au même endroit.
          </p>
        </header>

        <div className={styles.tabsWrap}>
          <div
            className={styles.tabs}
            role="tablist"
            aria-label="Découvrir AKNO Copilot"
            onKeyDown={onTabsKeyDown}
          >
            {COPILOT_TABS.map((tab, i) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                className={styles.tab}
                id={`cps-tab-${tab.id}`}
                aria-controls={`cps-panel-${tab.id}`}
                aria-selected={i === active}
                tabIndex={i === active ? 0 : -1}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                onClick={() => setActive(i)}
              >
                <Icon name={tab.icon} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.panelWrap} data-akno-reveal>
          <div className={styles.panel}>
            <div className={styles.texts}>
              {COPILOT_TABS.map((tab, i) => (
                <div
                  key={tab.id}
                  className={styles.text}
                  role="tabpanel"
                  id={`cps-panel-${tab.id}`}
                  aria-labelledby={`cps-tab-${tab.id}`}
                  aria-hidden={i !== active}
                  inert={i !== active}
                >
                  <span className={styles.kicker}>
                    <b className={styles.tnum}>{`0${i + 1}`}</b>
                    {tab.label}
                  </span>
                  <h3 className={styles.h3}>{tab.title}</h3>
                  <p className={styles.p}>{tab.text}</p>
                  <ul className={styles.list}>
                    {tab.bullets.map(([icon, label]) => (
                      <li key={label} className={styles.li}>
                        <span className={styles.liIc}>
                          <Icon name={icon} />
                        </span>
                        {label}
                      </li>
                    ))}
                  </ul>
                  <div className={styles.ctas}>
                    <a
                      className={`${styles.btn} ${styles.btnPrimary}`}
                      href="#contact"
                    >
                      Réserver une démo
                      <Icon name="arrow" />
                    </a>
                    <a
                      className={`${styles.btn} ${styles.btnGhost}`}
                      href="#contact"
                    >
                      On en discute
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.visual}>
              <div className={styles.window}>
                <div className={styles.bar} aria-hidden="true">
                  <div className={styles.dots}>
                    <span />
                    <span />
                    <span />
                  </div>
                  <div className={styles.url}>
                    <Icon name="lock" />
                    copilot.akno.fr
                  </div>
                  <div className={styles.barEnd} />
                </div>
                <div className={styles.shot}>
                  {COPILOT_TABS.map((tab, i) => (
                    <Image
                      key={tab.id}
                      src={tab.image}
                      alt={tab.alt}
                      fill
                      sizes="(max-width: 1100px) 100vw, 712px"
                      quality={100}
                      unoptimized
                      loading="lazy"
                      decoding="async"
                      className={`${styles.shotImg}${i === active ? ` ${styles.isActive}` : ""}`}
                      aria-hidden={i === active ? undefined : true}
                    />
                  ))}
                </div>
              </div>

              <div className={styles.chips} aria-hidden="true">
                {COPILOT_TABS.map((tab, i) => (
                  <div
                    key={tab.id}
                    className={`${styles.chipset}${i === active ? ` ${styles.isActive}` : ""}`}
                  >
                    {tab.chips.map((chip, j) => (
                      <div
                        key={j}
                        className={`${styles.chip} ${j === 0 ? styles.chipA : styles.chipB}`}
                      >
                        <ChipContent chip={chip} />
                        <span>
                          <span className={`${styles.chipV} ${styles.tnum}`}>
                            {chip.value}
                          </span>
                          <span className={styles.chipL}>{chip.label}</span>
                        </span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <ul className={styles.trust}>
          <li>
            <span className={styles.trustIc}>
              <Icon name="refresh" />
            </span>
            Synchronisé en temps réel
          </li>
          <li>
            <span className={styles.trustIc}>
              <Icon name="lock" />
            </span>
            Paiements sécurisés par Stripe
          </li>
          <li>
            <span className={styles.trustIc}>
              <Icon name="message" />
            </span>
            Un interlocuteur dédié, joignable en un clic
          </li>
        </ul>
      </div>
    </section>
  );
}
