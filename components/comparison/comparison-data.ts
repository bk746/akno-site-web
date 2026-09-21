export type ComparisonRow = {
  id: string;
  criterion: string;
  akno: string;
  classic: string;
};

export const COMPARISON_ROWS: ComparisonRow[] = [
  {
    id: "objectif",
    criterion: "Objectif",
    akno: "Un site qui ramène des clients",
    classic: "Un site surtout « joli »",
  },
  {
    id: "interlocuteur",
    criterion: "Interlocuteur",
    akno: "Une seule personne du début à la fin",
    classic: "Plusieurs contacts, responsabilités floues",
  },
  {
    id: "methode",
    criterion: "Méthode",
    akno: "Étapes claires, cadrage précis",
    classic: "Devis vague, process opaque",
  },
  {
    id: "design",
    criterion: "Design",
    akno: "Pensé pour convertir",
    classic: "Beau, mais sans intention business",
  },
  {
    id: "technique",
    criterion: "Technique",
    akno: "Perf + SEO inclus",
    classic: "Souvent oubliés ou en option",
  },
  {
    id: "apres",
    criterion: "Après livraison",
    akno: "Site maintenable + handoff clair",
    classic: "Tu te débrouilles",
  },
];
