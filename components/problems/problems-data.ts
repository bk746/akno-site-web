import type { StaticImageData } from "next/image";

import iconCalendrier from "@/src/images/icon-calendrier.png";
import iconChat from "@/src/images/icon-chat.png";
import iconFenetres from "@/src/images/icon-fenetres.png";
import iconHorloge from "@/src/images/icon-horloge.png";
import iconJauge from "@/src/images/icon-jauge-performance.png";
import iconParcours from "@/src/images/icon-parcours-question.png";

export type ProblemSegment = {
  text: string;
  emphasis?: boolean;
};

export type ProblemItem = {
  segments: ProblemSegment[];
  icon: StaticImageData;
  accent: "rose" | "blue";
};

export const PROBLEMS: ProblemItem[] = [
  {
    segments: [
      { text: "Ton site " },
      { text: "ne ramène pas de clients", emphasis: true },
      { text: "." },
    ],
    icon: iconParcours,
    accent: "rose",
  },
  {
    segments: [
      { text: "Tu comptes surtout sur le " },
      { text: "bouche-à-oreille", emphasis: true },
      { text: "." },
    ],
    icon: iconChat,
    accent: "blue",
  },
  {
    segments: [
      { text: "Ton site est joli, mais il " },
      { text: "ressemble à tous les autres", emphasis: true },
      { text: "." },
    ],
    icon: iconFenetres,
    accent: "rose",
  },
  {
    segments: [
      { text: "Tu ne sais pas " },
      { text: "ce qui convertit", emphasis: true },
      { text: " vraiment." },
    ],
    icon: iconJauge,
    accent: "blue",
  },
  {
    segments: [
      { text: "Ton site est " },
      { text: "lent", emphasis: true },
      { text: ", ou " },
      { text: "pas pensé mobile", emphasis: true },
      { text: "." },
    ],
    icon: iconHorloge,
    accent: "rose",
  },
  {
    segments: [
      { text: "Tu " },
      { text: "n'as pas le temps", emphasis: true },
      { text: " de le gérer correctement." },
    ],
    icon: iconCalendrier,
    accent: "blue",
  },
];
