import type { ComponentType } from "react";

import {
  IconCalendar,
  IconPerformance,
  IconProfile,
  IconShield,
} from "@/components/wants/wants-icons";

type WantIconComponent = ComponentType<{ className?: string }>;

export type WantSegment = {
  text: string;
  emphasis?: boolean;
};

export type WantCardItem = {
  Icon: WantIconComponent;
  segments: WantSegment[];
};

export const WANT_CARDS: WantCardItem[] = [
  {
    Icon: IconShield,
    segments: [
      { text: "Une présence qui " },
      { text: "inspire confiance", emphasis: true },
      { text: " dès " },
      { text: "3 secondes", emphasis: true },
    ],
  },
  {
    Icon: IconCalendar,
    segments: [
      { text: "Des demandes de " },
      { text: "devis / RDV", emphasis: true },
      { text: " " },
      { text: "plus qualifiées", emphasis: true },
    ],
  },
  {
    Icon: IconProfile,
    segments: [
      { text: "Une image " },
      { text: "plus professionnelle", emphasis: true },
    ],
  },
  {
    Icon: IconPerformance,
    segments: [
      { text: "Un site " },
      { text: "maintenable et performant", emphasis: true },
      { text: " après la mise en ligne" },
    ],
  },
];
