export type ServiceId = "site" | "design" | "seo";
export type ServiceItem = {
  id: ServiceId;
  num: string;
  title: string;
  description: string;
  points: readonly [string, string, string];
  linkLabel: string;
};
export type ServicesOptions = {
  /** Badge « Expertises » au-dessus du titre (NON VALIDÉ). */
  showEyebrow: boolean;
  /** Sous-titre « Un seul studio pour concevoir… » (NON VALIDÉ). */
  showSubtitle: boolean;
  /** Ligne « Réponse sous 24 h · Devis après cadrage » sous le bouton (NON VALIDÉ). */
  showTrust: boolean;
  /** Badge « Position 1 » dans le visuel SEO (NON VALIDÉ). */
  showSeoRankBadge: boolean;
};
/** Éléments pas encore validés : passe un flag à false pour retirer l'élément. Rien d'autre à modifier. */
export const SERVICES_OPTIONS: ServicesOptions = {
  showEyebrow: true,
  showSubtitle: true,
  showTrust: true,
  showSeoRankBadge: true,
};
export const SERVICES: ServiceItem[] = [
  {
    id: "site",
    num: "01",
    title: "Site web",
    description:
      "Création ou refonte : un site sur mesure, rapide et pensé pour transformer les visites en demandes.",
    points: [
      "Structure et textes orientés conversion",
      "Design sur mesure, responsive",
      "Développement propre, mise en ligne incluse",
    ],
    linkLabel: "En savoir plus",
  },
  {
    id: "design",
    num: "02",
    title: "UI UX Design",
    description:
      "Des parcours clairs où chaque écran a un rôle : clarifier, rassurer, convertir.",
    points: [
      "Audit UX et parcours client",
      "Wireframes puis maquettes haute fidélité",
      "Design system léger et réutilisable",
    ],
    linkLabel: "En savoir plus",
  },
  {
    id: "seo",
    num: "03",
    title: "SEO Performance",
    description:
      "Être trouvé sur les bonnes recherches, avec un site qui charge vite.",
    points: [
      "SEO technique et structure des pages",
      "Optimisation des Core Web Vitals",
      "Suivi clair et priorités concrètes",
    ],
    linkLabel: "En savoir plus",
  },
];
