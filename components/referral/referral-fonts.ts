import { Inter } from "next/font/google";

/** Inter 700 italique réelle : accent du titre. */
export const referralAccentFont = Inter({
  subsets: ["latin"],
  weight: "700",
  style: "italic",
  display: "swap",
  preload: false,
});

/** Inter 800 : gros montants et pastilles numérotées. */
export const referralHeavyFont = Inter({
  subsets: ["latin"],
  weight: "800",
  style: "normal",
  display: "swap",
  preload: false,
  variable: "--font-referral-heavy",
});
