import { Inter } from "next/font/google";

/**
 * Inter 500 italique réelle : texte du badge du hero (« Pour les dirigeants… »).
 * Sans elle, le navigateur prendrait l'Inter 700 italique chargée pour « Nos technologies »
 * (badge rendu en gras). La maquette de McFly, elle, n'avait qu'une italique synthétique.
 */
export const heroKickerFont = Inter({
  subsets: ["latin"],
  weight: "500",
  style: "italic",
  display: "swap",
  preload: true,
});
