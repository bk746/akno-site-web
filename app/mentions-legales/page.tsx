import type { Metadata } from "next";

import {
  LegalDocument,
  LegalTableOfContents,
} from "@/components/legal/legal-document";
import { LegalPageShell } from "@/components/legal/legal-page-shell";
import { MENTIONS_LEGALES_SECTIONS } from "@/lib/legal/mentions-legales-content";

export const metadata: Metadata = {
  title: "Mentions légales",
  description:
    "Mentions légales du site AKNO — éditeur, hébergeur, propriété intellectuelle et données personnelles.",
  alternates: {
    canonical: "/mentions-legales",
  },
};

export default function MentionsLegalesPage() {
  return (
    <LegalPageShell
      eyebrow="Informations légales"
      title={
        <>
          Mentions <span className="legal-page__title-accent">légales</span>
        </>
      }
      intro="Transparence sur l’éditeur, l’hébergement, la propriété intellectuelle et vos données."
    >
      <LegalTableOfContents sections={MENTIONS_LEGALES_SECTIONS} />
      <LegalDocument sections={MENTIONS_LEGALES_SECTIONS} />
    </LegalPageShell>
  );
}
