const FEATURES = [
  {
    title: "Bout en bout",
    description: "Stratégie, design, dev, mise en ligne",
  },
  {
    title: "Piloté par la data",
    description: "Trafic, conversion, parcours",
  },
  {
    title: "Fait pour convertir",
    description: "Plus de demandes, pas juste plus de pages",
  },
] as const;

type HeroFeaturesProps = {
  className?: string;
};

export function HeroFeatures({ className = "" }: HeroFeaturesProps) {
  return (
    <ul
      className={`mx-auto mt-9 w-full max-w-[880px] grid-cols-3 sm:mt-10 sm:grid ${className}`}
    >
      {FEATURES.map((feature, index) => (
        <li
          key={feature.title}
          className={`hero-feature flex flex-col items-center px-2 sm:px-6 ${
            index > 0 ? "sm:border-l sm:border-white/20" : ""
          }`}
        >
          <p className="hero-feature__title text-base font-semibold text-white">
            {feature.title}
          </p>
          <p className="hero-feature__desc mt-1.5 max-w-[240px] text-sm leading-snug text-white/65">
            {feature.description}
          </p>
        </li>
      ))}
    </ul>
  );
}
