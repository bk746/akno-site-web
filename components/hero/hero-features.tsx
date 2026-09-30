import styles from "@/components/hero/hero-section.module.css";

const FEATURES = [
  {
    title: "Bout en bout",
    description: "Stratégie, design, dev, mise en ligne",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M12 2 2 7l10 5 10-5-10-5Z" />
        <path d="m2 17 10 5 10-5" />
        <path d="m2 12 10 5 10-5" />
      </svg>
    ),
  },
  {
    title: "Piloté par la data",
    description: "Trafic, conversion, parcours",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M3 3v18h18" />
        <path d="M7 16l4-6 4 3 5-7" />
      </svg>
    ),
  },
  {
    title: "Fait pour convertir",
    description: "Plus de demandes, pas juste plus de pages",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    ),
  },
] as const;

type HeroFeaturesProps = {
  className?: string;
};

export function HeroFeatures({ className = "" }: HeroFeaturesProps) {
  return (
    <ul className={`${styles.features} ${className}`.trim()}>
      {FEATURES.map((feature) => (
        <li key={feature.title} className={styles.feature}>
          <span className={styles.featureIcon}>{feature.icon}</span>
          <div className={styles.featureCopy}>
            <p className={styles.featureTitle}>{feature.title}</p>
            <p className={styles.featureDesc}>{feature.description}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
