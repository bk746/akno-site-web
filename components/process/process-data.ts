export type ProcessStep = {
  number: string;
  title: string;
  line: string;
};

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: "01",
    title: "Offre & direction",
    line: "On clarifie quoi construire — et pourquoi.",
  },
  {
    number: "02",
    title: "Design & expérience",
    line: "On design pour convertir, pas juste pour être beau.",
  },
  {
    number: "03",
    title: "Développement & lancement",
    line: "On livre un site rapide, propre, prêt à performer.",
  },
];
