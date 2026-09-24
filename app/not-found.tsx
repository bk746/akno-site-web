import type { Metadata } from "next";
import Link from "next/link";

import { FooterSection } from "@/components/footer/footer-section";
import { SiteHeader } from "@/components/site-header/site-header";

export const metadata: Metadata = {
  title: "Page introuvable",
  description: "Cette page n'existe pas ou n'est plus disponible.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="site-shell akno-surface-light relative isolate flex min-h-dvh flex-col overflow-x-clip">
      <SiteHeader />
      <div className="mx-auto flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-akno-cta">
          Erreur 404
        </p>
        <h1 className="mt-3 max-w-md text-balance text-[clamp(2rem,4vw,2.75rem)] font-bold leading-[1.12] tracking-[-0.03em] text-akno-texte">
          Cette page n&apos;existe pas
        </h1>
        <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-akno-texte/65">
          Le lien est peut-être incorrect ou la page a été déplacée.
        </p>
        <Link
          href="/"
          className="btn btn-primary mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-akno-cta px-7 py-3.5 text-[15px] font-medium text-white"
        >
          Retour à l&apos;accueil
        </Link>
      </div>
      <FooterSection />
    </main>
  );
}
