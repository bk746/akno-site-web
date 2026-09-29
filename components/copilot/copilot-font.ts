import { Inter } from "next/font/google";

/** Inter 700 italique réelle, uniquement pour l'accent du titre Copilot. */
export const copilotAccentFont = Inter({
  subsets: ["latin"],
  weight: "700",
  style: "italic",
  display: "swap",
  preload: false,
});
