import type { StaticImageData } from "next/image";

import cardDesign from "@/src/images/card1.webp";
import cardSite from "@/src/images/card2.webp";
import cardSeo from "@/src/images/card4.webp";

export const SERVICE_BACK_TRUST =
  "Réponse sous 24h · Devis après cadrage";

export type ServiceItem = {
  id: string;
  title: string;
  backTitle: string;
  subtitle: string;
  ctaLabel: string;
  variant: "site" | "design" | "seo";
  tilt: "left" | "center" | "right";
  cover: StaticImageData;
  deliverables: string[];
};

export const SERVICES: ServiceItem[] = [
  {
    id: "site",
    title: "Site web",
    backTitle: "Un site qui ramène des demandes",
    subtitle: "Pas une jolie vitrine. Une machine à leads.",
    ctaLabel: "Je veux un site qui convertit",
    variant: "site",
    tilt: "left",
    cover: cardSite,
    deliverables: [
      "Structure & copy orientées conversion",
      "Design sur-mesure, responsive",
      "Développement propre + perf",
      "Mise en ligne & handoff clair",
    ],
  },
  {
    id: "design",
    title: "UI UX Design",
    backTitle: "Une expérience qui fait passer à l’action",
    subtitle: "Chaque écran a un rôle : clarifier, rassurer, convertir.",
    ctaLabel: "Je veux une UX qui convertit",
    variant: "design",
    tilt: "center",
    cover: cardDesign,
    deliverables: [
      "Audit UX & parcours client",
      "Wireframes → UI haute fidélité",
      "Hiérarchie, CTA, micro-détails",
      "Design system léger & réutilisable",
    ],
  },
  {
    id: "seo",
    title: "SEO Performance",
    backTitle: "Du trafic utile, pas du vanity traffic",
    subtitle: "Être trouvé par les bonnes personnes — et charger vite.",
    ctaLabel: "Je veux plus de trafic qualifié",
    variant: "seo",
    tilt: "right",
    cover: cardSeo,
    deliverables: [
      "SEO technique + structure",
      "Optimisation Core Web Vitals",
      "Pages pensées intention de recherche",
      "Suivi clair & priorités actionnables",
    ],
  },
];
