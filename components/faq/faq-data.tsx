import type { ReactNode } from "react";

export type FaqItem = {
  id: string;
  question: string;
  answer: ReactNode;
  icon: "cost" | "time" | "seo" | "edit" | "refonte" | "start";
};

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: "cost",
    question: "Combien coûte un site ?",
    icon: "cost",
    answer: (
      <>
        Sur-mesure après un cadrage court. On chiffre un{" "}
        <strong>investissement rentable</strong>, pas le devis le moins cher.
      </>
    ),
  },
  {
    id: "time",
    question: "En combien de temps c’est en ligne ?",
    icon: "time",
    answer: (
      <>
        En moyenne <strong>4 à 8 semaines</strong> selon le scope et ta
        réactivité.
      </>
    ),
  },
  {
    id: "seo",
    question: "Tu gères aussi le SEO et la perf ?",
    icon: "seo",
    answer: (
      <>
        Oui. Technique, structure et{" "}
        <strong>Core Web Vitals</strong> font partie du livrable.
      </>
    ),
  },
  {
    id: "edit",
    question: "Je peux modifier le site après ?",
    icon: "edit",
    answer: (
      <>
        Oui. Site maintenable + prise en main. Suivi possible si tu veux
        qu&apos;on reste.
      </>
    ),
  },
  {
    id: "refonte",
    question: "Tu travailles en refonte aussi ?",
    icon: "refonte",
    answer: (
      <>
        Souvent. On part de l&apos;existant, on garde ce qui marche, on corrige ce
        qui freine.
      </>
    ),
  },
  {
    id: "start",
    question: "Comment on démarre ?",
    icon: "start",
    answer: (
      <>
        Un appel de cadrage → proposition claire → kickoff.{" "}
        <strong>Un seul interlocuteur.</strong>
      </>
    ),
  },
];
