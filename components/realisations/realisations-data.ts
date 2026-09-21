export type RealisationProject = {
  id: string;
  title: string;
  tag: string;
  description: string;
  stats: { label: string; value: string }[];
  thumbLabel: string;
  thumbAccent: "rose" | "cta" | "mint";
};

export const REALISATIONS: RealisationProject[] = [
  {
    id: "lumina",
    title: "Atelier Lumina",
    tag: "Site vitrine · UI/UX",
    description:
      "Refonte premium pour une marque lumière : parcours clair, prise de RDV et preuves sociales au bon endroit.",
    stats: [
      { label: "Demandes", value: "+48%" },
      { label: "LCP", value: "0,9s" },
      { label: "Perf", value: "98" },
      { label: "Délai", value: "6 sem." },
    ],
    thumbLabel: "CREATE WHAT MOVES",
    thumbAccent: "cta",
  },
  {
    id: "verde",
    title: "Studio Verde",
    tag: "E-commerce · Brand",
    description:
      "Boutique éditoriale slow fashion : fiches produits lisibles, checkout simplifié et SEO collections.",
    stats: [
      { label: "Conversion", value: "+31%" },
      { label: "LCP", value: "1,1s" },
      { label: "Perf", value: "96" },
      { label: "Délai", value: "8 sem." },
    ],
    thumbLabel: "CRAFT WITH PURPOSE",
    thumbAccent: "mint",
  },
  {
    id: "nexa",
    title: "Nexa Conseil",
    tag: "B2B · Analytics",
    description:
      "Site institutionnel : offres clarifiées, lead magnets et tracking des parcours pour prioriser les relances.",
    stats: [
      { label: "Leads", value: "+62%" },
      { label: "LCP", value: "0,8s" },
      { label: "Perf", value: "99" },
      { label: "Délai", value: "5 sem." },
    ],
    thumbLabel: "BUILD WHAT LASTS",
    thumbAccent: "rose",
  },
];
