import { AboutSection } from "@/components/about/about-section";
import { ComparisonSection } from "@/components/comparison/comparison-section";
import { FaqSection } from "@/components/faq/faq-section";
import { FinalCtaSection } from "@/components/final-cta/final-cta-section";
import { FooterSection } from "@/components/footer/footer-section";
import { HeroSection } from "@/components/hero/hero-section";
import { SiteIntro } from "@/components/intro/site-intro";
import { ProblemsSection } from "@/components/problems/problems-section";
import { ProcessSection } from "@/components/process/process-section";
import { RealisationsSection } from "@/components/realisations/realisations-section";
import { ServicesSection } from "@/components/services/services-section";
import { SiteHeader } from "@/components/site-header/site-header";
import { WantsSection } from "@/components/wants/wants-section";

export default function Home() {
  return (
    <>
      <div className="site-intro-curtain" aria-hidden="true" />
      <SiteIntro />
      <main className="site-shell relative isolate overflow-x-clip bg-white">
        <SiteHeader />
        <HeroSection />
        <ProblemsSection />
        <WantsSection />
        <ServicesSection />
        <RealisationsSection />
        <ProcessSection />
        <AboutSection />
        <ComparisonSection />
        <FaqSection />
        <div className="faq-final-cta-spacer" aria-hidden />
        <FinalCtaSection />
        <FooterSection />
      </main>
    </>
  );
}
