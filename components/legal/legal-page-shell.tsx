import Link from "next/link";
import type { ReactNode } from "react";

import { FooterSection } from "@/components/footer/footer-section";
import { SiteHeader } from "@/components/site-header/site-header";

type LegalPageShellProps = {
  eyebrow: string;
  title: ReactNode;
  intro?: string;
  children: ReactNode;
};

export function LegalPageShell({
  eyebrow,
  title,
  intro,
  children,
}: LegalPageShellProps) {
  return (
    <main className="site-shell legal-page-shell akno-surface-light relative isolate overflow-x-clip">
      <div className="legal-page__glow" aria-hidden />
      <SiteHeader />
      <div className="legal-page">
        <div className="legal-page__inner">
          <Link href="/" className="legal-page__back">
            <span className="legal-page__back-icon" aria-hidden>
              ←
            </span>
            Retour à l&apos;accueil
          </Link>

          <header
            className="legal-page__header"
            data-akno-reveal-stagger
          >
            <p className="legal-page__eyebrow" data-akno-reveal>
              {eyebrow}
            </p>
            <h1 className="legal-page__title" data-akno-reveal>
              {title}
            </h1>
            <span
              className="legal-page__accent-bar"
              aria-hidden
              data-akno-reveal
            />
            {intro ? (
              <p className="legal-page__intro" data-akno-reveal>
                {intro}
              </p>
            ) : null}
          </header>

          {children}
        </div>
      </div>
      <FooterSection />
    </main>
  );
}
