import type { IconKey } from "@/components/copilot/copilot-icons";

export type CopilotChip =
  | {
      kind: "ring";
      percent: number;
      color: string;
      value: string;
      label: string;
    }
  | {
      kind: "icon";
      icon: IconKey;
      tone: "blue" | "pink" | "green";
      value: string;
      label: string;
    };

export type CopilotTab = {
  id: "dashboard" | "performances" | "facturation";
  label: string;
  icon: IconKey;
  image: string;
  alt: string;
  title: string;
  text: string;
  bullets: [IconKey, string][];
  chips: [CopilotChip, CopilotChip];
};

export const COPILOT_TABS: CopilotTab[] = [
  {
    id: "dashboard",
    label: "Tableau de bord",
    icon: "dashboard",
    image: "/copilot/copilot-dashboard.webp",
    alt: "Tableau de bord AKNO Copilot : tâches en cours, avancement global à 62 %, livraison estimée le 12 novembre 2026",
    title: "Votre projet, étape par étape",
    text: "Tâches en cours, actions à valider, date de livraison : vous savez toujours où en est votre site et ce qui arrive ensuite.",
    bullets: [
      ["check", "Avancement global et étape en cours"],
      ["list", "Vos actions à valider, avec leurs échéances"],
      ["message", "Un interlocuteur dédié, joignable en un clic"],
    ],
    chips: [
      {
        kind: "ring",
        percent: 62,
        color: "#6B92E5",
        value: "62 %",
        label: "Avancement global · étape 3 sur 5",
      },
      {
        kind: "icon",
        icon: "rocket",
        tone: "pink",
        value: "12 nov. 2026",
        label: "Livraison estimée · dans les temps",
      },
    ],
  },
  {
    id: "performances",
    label: "Performances",
    icon: "performances",
    image: "/copilot/copilot-performances.webp",
    alt: "Page Performances AKNO Copilot : 3 482 visiteurs uniques en hausse de 18 %, score Lighthouse de 94",
    title: "Des chiffres clairs, sans jargon",
    text: "Visiteurs, appels, demandes de contact et positions Google : les indicateurs qui comptent pour votre activité, mis à jour en continu.",
    bullets: [
      ["users", "Visiteurs et conversions sur 30 jours"],
      ["search", "Positions Google et mots-clés suivis"],
      ["gauge", "Score Lighthouse et vitesse du site"],
    ],
    chips: [
      {
        kind: "icon",
        icon: "trending",
        tone: "green",
        value: "+18 %",
        label: "Visiteurs uniques sur 30 jours",
      },
      {
        kind: "ring",
        percent: 94,
        color: "#4CC38A",
        value: "94 / 100",
        label: "Lighthouse · performance mobile",
      },
    ],
  },
  {
    id: "facturation",
    label: "Facturation",
    icon: "facturation",
    image: "/copilot/copilot-facturation.webp",
    alt: "Page Facturation AKNO Copilot : abonnements, prochaine opération de 2 148 euros le 1er octobre, aucune facture en retard",
    title: "Vos factures, sans surprise",
    text: "Abonnements, prochaines opérations et historique réunis au même endroit. Vous réglez en ligne, en quelques clics.",
    bullets: [
      ["calendar", "Prochaines opérations sur 3 mois"],
      ["card", "Paiement sécurisé par carte ou virement"],
      ["download", "Toutes vos factures téléchargeables"],
    ],
    chips: [
      {
        kind: "icon",
        icon: "calendar",
        tone: "blue",
        value: "2 148,00 €",
        label: "Prochaine opération · 1er oct.",
      },
      {
        kind: "icon",
        icon: "shield",
        tone: "green",
        value: "À jour",
        label: "Aucune facture en retard",
      },
    ],
  },
];
