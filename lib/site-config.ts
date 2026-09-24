/** URL canonique du site en production */
export const SITE_URL = "https://akno.fr";

export const SITE_NAME = "AKNO";

export const SITE_TAGLINE = "Sites qui convertissent";

export const SITE_DESCRIPTION =
  "On conçoit ton site, on analyse tes données, et on pousse ton trafic au maximum.";

export const CONTACT_EMAIL = "hello@akno.fr";

export const LEGAL_EMAIL = "aknoweb.contact@gmail.com";

/**
 * TODO(prod) — Renseigner les URL officielles des profils AKNO (ex. https://www.linkedin.com/in/…).
 * Tant qu'une URL est vide, l'icône correspondante n'est pas affichée dans le footer.
 */
export const SOCIAL_LINKS = {
  linkedin: "",
  instagram: "",
} as const;

export type SocialNetwork = keyof typeof SOCIAL_LINKS;

export const SOCIAL_PROFILES: {
  id: SocialNetwork;
  label: string;
  href: string;
}[] = (
  [
    { id: "linkedin" as const, label: "LinkedIn AKNO" },
    { id: "instagram" as const, label: "Instagram AKNO" },
  ] as const
)
  .map((item) => ({
    ...item,
    href: SOCIAL_LINKS[item.id].trim(),
  }))
  .filter((item) => item.href.length > 0);

/** Indexation autorisée uniquement sur l'environnement de production. */
export function isProductionIndexing(): boolean {
  if (process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true") return true;
  if (process.env.NEXT_PUBLIC_ALLOW_INDEXING === "false") return false;
  return process.env.VERCEL_ENV === "production";
}

export function absoluteUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (normalized === "/") return SITE_URL;
  return `${SITE_URL}${normalized}`;
}

export const PUBLIC_ROUTES: { path: string; changeFrequency: "weekly" | "monthly" | "yearly"; priority: number }[] =
  [
    { path: "/", changeFrequency: "weekly", priority: 1 },
    { path: "/mentions-legales", changeFrequency: "yearly", priority: 0.3 },
    { path: "/confidentialite", changeFrequency: "yearly", priority: 0.3 },
  ];
