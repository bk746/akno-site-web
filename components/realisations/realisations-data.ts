import type { StaticImageData } from "next/image";

import projetElegencia from "@/src/images/projet-1-elegencia.webp";
import projetKafe from "@/src/images/projet-1-kafe.webp";
import projetBkArchitecture from "@/src/images/projet-4-bkarchitecture.webp";
import projetAvero from "@/src/images/projet-5-avero.webp";

export type RealisationMetric = {
  value: string;
  label: string;
};

export type RealisationProject = {
  id: string;
  title: string;
  tag: string;
  description: string;
  image: StaticImageData;
  stack: string[];
  metrics: RealisationMetric[];
};

export const REALISATIONS: RealisationProject[] = [
  {
    id: "elegencia",
    title: "Elegencia",
    tag: "Site vitrine, luxe",
    description:
      "Site vitrine haut de gamme pour une marque de luxe. Direction artistique, design sur mesure et développement front-end — sans template. Une expérience immersive pensée pour mettre en valeur l'univers de la marque et convertir une clientèle exigeante.",
    image: projetElegencia,
    stack: ["Next.js", "TypeScript", "Tailwind", "GSAP"],
    metrics: [
      { value: "Sans template", label: "Construction" },
      { value: "Clientèle luxe", label: "Cible" },
      { value: "Parcours immersif", label: "Expérience" },
      { value: "Des demandes", label: "Objectif" },
    ],
  },
  {
    id: "kafe",
    title: "Kafé",
    tag: "Restaurant, identité digitale",
    description:
      "Identité digitale complète pour un restaurant. Site web responsive, menu interactif et prise de réservation en ligne. Design chaleureux et contemporain, fidèle à l'ambiance du lieu — du wireframe au lancement.",
    image: projetKafe,
    stack: ["Next.js", "TypeScript", "Tailwind", "Stripe"],
    metrics: [
      { value: "Menu en ligne", label: "La carte" },
      { value: "Réservation", label: "En direct" },
      { value: "Pensé mobile", label: "Usage" },
      { value: "Ambiance du lieu", label: "Ton" },
    ],
  },
  {
    id: "bkarchitecture",
    title: "BK Architecture",
    tag: "Architecture, portfolio",
    description:
      "Portfolio pour un cabinet d'architecture. Mise en avant des projets en grand format, navigation épurée et performance optimisée. Un site pensé comme une extension de la démarche créative du studio.",
    image: projetBkArchitecture,
    stack: ["Next.js", "TypeScript", "Tailwind", "GSAP"],
    metrics: [
      { value: "Projets en grand", label: "Mise en page" },
      { value: "Navigation claire", label: "Parcours" },
      { value: "Chargement rapide", label: "Performance" },
      { value: "Image du studio", label: "Positionnement" },
    ],
  },
  {
    id: "avero",
    title: "Avero",
    tag: "Marque, expérience digitale",
    description:
      "Expérience digitale pour une marque en lancement. Storytelling visuel, design system cohérent et site performant. Conçu pour affirmer l'identité de la marque et accompagner sa croissance en ligne.",
    image: projetAvero,
    stack: ["Next.js", "TypeScript", "Tailwind", "Vercel"],
    metrics: [
      { value: "Marque lancée", label: "Moment" },
      { value: "Design system", label: "Cohérence" },
      { value: "Récit visuel", label: "Storytelling" },
      { value: "Site rapide", label: "Performance" },
    ],
  },
];
