import type { Metadata } from "next";
import Link from "next/link";

import {
  LegalDocument,
  LegalTableOfContents,
} from "@/components/legal/legal-document";
import { LegalPageShell } from "@/components/legal/legal-page-shell";
import { getConfidentialiteSections } from "@/lib/legal/mentions-legales-content";

export const metadata: Metadata = {
  title: "Confidentialité",
  description:
    "Politique de confidentialité AKNO — données personnelles, formulaire de contact et cookies.",
  alternates: {
    canonical: "/confidentialite",
  },
};

export default function ConfidentialitePage() {
  const sections = getConfidentialiteSections();

  return (
    <LegalPageShell
      eyebrow="Données & cookies"
      title={
        <>
          Politique de{" "}
          <span className="legal-page__title-accent">confidentialité</span>
        </>
      }
      intro="Comment AKNO traite vos données et quels cookies peuvent être utilisés."
    >
      <LegalTableOfContents sections={sections} />
      <LegalDocument sections={sections} />
      <aside className="legal-page__note-card" data-akno-reveal>
        <p className="legal-page__note-title">Besoin du cadre complet ?</p>
        <p className="legal-page__note-text">
          Éditeur, hébergement et propriété intellectuelle sont détaillés dans
          les{" "}
          <Link href="/mentions-legales" className="legal-page__inline-link">
            mentions légales
          </Link>
          .
        </p>
      </aside>
    </LegalPageShell>
  );
}
