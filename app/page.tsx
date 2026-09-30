import type { Metadata } from "next";
import dynamic from "next/dynamic";

import { AboutSection } from "@/components/about/about-section";
import { ComparisonSection } from "@/components/comparison/comparison-section";
import { FaqSection } from "@/components/faq/faq-section";
import { FinalCtaSection } from "@/components/final-cta/final-cta-section";
import { FooterSection } from "@/components/footer/footer-section";
import { HeroSection } from "@/components/hero/hero-section";
import { ProblemsSection } from "@/components/problems/problems-section";
import { ProcessSection } from "@/components/process/process-section";
import { RealisationsSection } from "@/components/realisations/realisations-section";
import { ServicesSection } from "@/components/services/services-section";
import { TechnologiesSection } from "@/components/technologies/technologies-section";
import { SiteHeader } from "@/components/site-header/site-header";
import { WantsSection } from "@/components/wants/wants-section";
import { HomeJsonLd } from "@/components/seo/home-json-ld";
import { SeasonalShellClient } from "@/components/seasonal/seasonal-shell-client";
import { isSeasonalThemeActive } from "@/lib/seasonal-theme";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TAGLINE } from "@/lib/site-config";

const CopilotShowcase = dynamic(
  () =>
    import("@/components/copilot/copilot-showcase").then(
      (module) => module.CopilotShowcase,
    ),
  { ssr: true },
);

const ReferralSection = dynamic(
  () =>
    import("@/components/referral/referral-section").then(
      (module) => module.ReferralSection,
    ),
  { ssr: true },
);

export const metadata: Metadata = {
  title: `${SITE_NAME} — ${SITE_TAGLINE}`,
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <>
      <HomeJsonLd />
      <main
        className={`site-shell relative isolate overflow-x-clip bg-white${isSeasonalThemeActive() ? " site-shell--halloween" : ""}`}
      >
        {isSeasonalThemeActive() ? <SeasonalShellClient /> : null}
        <SiteHeader heroTone />
        <HeroSection />
        <ProblemsSection />
        <WantsSection />
        <ServicesSection />
        <RealisationsSection />
        <ProcessSection />
        <CopilotShowcase />
        <ReferralSection />
        <TechnologiesSection />
        <AboutSection />
        <ComparisonSection />
        <FaqSection />
        <FinalCtaSection />
        <FooterSection />
      </main>
    </>
  );
}
