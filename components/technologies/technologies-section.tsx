import type { ReactNode } from "react";

import { technologiesAccentFont } from "@/components/technologies/technologies-font";

import styles from "@/components/technologies/technologies-section.module.css";

/* ================================================================
   RÉGLAGES : propositions de McFly non encore validées par Keryan.
   Passer à false retire l'élément sans laisser de trou.
   ================================================================ */
const TECHNOLOGIES_OPTIONS = {
  /** Sous-titre sous le H2 */
  showSubtitle: true,
  /** Note « Vous hésitez ? … Parlons-en ↗ » sous les cartes */
  showNote: true,
};

/* ================================================================
   CARTES : ajouter, retirer ou réordonner une carte = modifier ce tableau.
   Logos en SVG inline (viewBox et couleurs de la maquette).
   ================================================================ */
type Technology = { id: string; name: string; line: string; icon: ReactNode };

const TECHNOLOGIES: Technology[] = [
  {
    id: "wordpress",
    name: "WordPress",
    line: "Vous modifiez vos contenus en toute autonomie.",
    icon: (
      <svg viewBox="0 0 24 24" role="img" aria-label="Logo WordPress">
        <path
          fill="#21759B"
          d="M21.469 6.825c.84 1.537 1.318 3.3 1.318 5.175 0 3.979-2.156 7.456-5.363 9.325l3.295-9.527c.615-1.54.82-2.771.82-3.864 0-.405-.026-.78-.07-1.11m-7.981.105c.647-.03 1.232-.105 1.232-.105.582-.075.514-.93-.067-.899 0 0-1.755.135-2.88.135-1.064 0-2.85-.15-2.85-.15-.585-.03-.661.855-.075.885 0 0 .54.061 1.125.09l1.68 4.605-2.37 7.08L5.354 6.9c.649-.03 1.234-.1 1.234-.1.585-.075.516-.93-.065-.896 0 0-1.746.138-2.874.138-.2 0-.438-.008-.69-.015C4.911 3.15 8.235 1.215 12 1.215c2.809 0 5.365 1.072 7.286 2.833-.046-.003-.091-.009-.141-.009-1.06 0-1.812.923-1.812 1.914 0 .89.513 1.643 1.06 2.531.411.72.89 1.643.89 2.977 0 .915-.354 1.994-.821 3.479l-1.075 3.585-3.9-11.61.001.014zM12 22.784c-1.059 0-2.081-.153-3.048-.437l3.237-9.406 3.315 9.087c.024.053.05.101.078.149-1.12.393-2.325.609-3.582.609M1.211 12c0-1.564.336-3.05.935-4.39L7.29 21.709C3.694 19.96 1.212 16.271 1.211 12M12 0C5.385 0 0 5.385 0 12s5.385 12 12 12 12-5.385 12-12S18.615 0 12 0"
        />
      </svg>
    ),
  },
  {
    id: "headless",
    name: "Headless CMS",
    line: "Contenu séparé du site, vitesse maximale.",
    icon: (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        strokeWidth={2.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="2.5" y="8" width="16" height="32" rx="4.5" stroke="#7B81BE" />
        <path d="M7.5 16h6M7.5 22.5h6M7.5 29h3.5" stroke="#7B81BE" />
        <rect x="29.5" y="8" width="16" height="32" rx="4.5" stroke="#6B92E5" />
        <path d="M29.5 15.5h16" stroke="#6B92E5" />
        <rect x="34" y="21" width="7" height="7" rx="1.5" stroke="#6B92E5" />
        <path d="M34 33h7" stroke="#6B92E5" />
        <path
          d="M21 24h.01M24 24h.01M27 24h.01"
          stroke="#6B92E5"
          strokeWidth={3}
        />
      </svg>
    ),
  },
  {
    id: "custom",
    name: "Custom",
    line: "Développé sur mesure pour vos besoins précis.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="#2F3350"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="m18 16 4-4-4-4" />
        <path d="m6 8-4 4 4 4" />
        <path d="m14.5 4-5 16" />
      </svg>
    ),
  },
];

export function TechnologiesSection() {
  return (
    <section
      id="technologies"
      className={styles.section}
      data-akno-surface="light"
      aria-labelledby="tks-title"
    >
      <div className={styles.inner}>
        <header className={styles.head} data-akno-reveal>
          <span className={styles.eyebrow}>
            <span className={styles.eyebrowDot} aria-hidden="true" />
            Nos technologies
          </span>
          <h2 className={styles.title} id="tks-title">
            Des technologies adaptées aux besoins de{" "}
            <span
              className={`${styles.accent} ${technologiesAccentFont.className}`}
            >
              votre projet
            </span>
          </h2>
          {TECHNOLOGIES_OPTIONS.showSubtitle && (
            <p className={styles.sub}>
              {
                "Nous choisissons l'outil selon vos objectifs, votre budget et votre autonomie. Jamais l'inverse."
              }
            </p>
          )}
        </header>
        <ul className={styles.grid} data-akno-reveal>
          {TECHNOLOGIES.map((t) => (
            <li key={t.id} className={styles.card} data-tech={t.id}>
              <div className={styles.well}>
                <div className={styles.medal}>{t.icon}</div>
              </div>
              <div>
                <h3 className={styles.name}>{t.name}</h3>
                <p className={styles.line}>{t.line}</p>
              </div>
            </li>
          ))}
        </ul>
        {TECHNOLOGIES_OPTIONS.showNote && (
          <p className={styles.note}>
            Vous hésitez ? Nous vous recommandons la plus adaptée dès le premier
            échange.{" "}
            <a href="#contact">
              Parlons-en
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M7 7h10v10" />
                <path d="M7 17 17 7" />
              </svg>
            </a>
          </p>
        )}
      </div>
    </section>
  );
}
