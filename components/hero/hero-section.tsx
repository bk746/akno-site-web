import Link from "next/link";

import { ContactCta } from "@/components/contact/contact-cta";
import { ArrowUpRight } from "@/components/icons/arrow-up-right";
import { HeroFeatures } from "@/components/hero/hero-features";
import { HeroOrbs } from "@/components/hero/hero-orbs";
import { HeroVideo } from "@/components/hero/hero-video";

export function HeroSection() {
  return (
    <>
      <svg className="hero-clip-svg" aria-hidden="true">
        <defs>
          <clipPath id="hero-arc-clip" clipPathUnits="objectBoundingBox">
            <path d="M 0 0 H 1 V 0.952 C 1 0.972 0.62 1 0.5 1 C 0.38 1 0 0.972 0 0.952 Z" />
          </clipPath>
        </defs>
      </svg>

      <section
        className="hero-section relative isolate min-h-0 overflow-visible bg-akno-noir text-white sm:min-h-dvh"
        data-akno-surface="dark"
      >
        <HeroOrbs />

        <div className="hero-section__shell relative z-10 mx-auto flex w-full max-w-[1200px] flex-col px-5 sm:px-10 sm:pb-12 sm:pt-8 lg:px-12 lg:pb-12">
          <div className="hero-section__intro mx-auto flex w-full max-w-[920px] flex-col items-center text-center sm:mt-6 lg:mt-8">
            <p className="hero-section__eyebrow akno-enter akno-enter--1">
              Pour les dirigeants qui veulent un site qui convertit.
            </p>

            <h1 className="hero-section__title akno-enter akno-enter--2">
              <span className="hero-section__title-line block text-white">
                On conçoit ton site,
              </span>
              <span className="hero-section__title-line block text-white">
                on lit tes data,
              </span>
              <span className="hero-section__title-line hero-section__title-accent block">
                et on pousse ton trafic.
              </span>
            </h1>

            <p className="hero-section__meta akno-enter akno-enter--3 sm:hidden">
              Stratégie · Data · Conversion
            </p>

            <div className="hero-section__actions akno-enter akno-enter--3 mt-8 hidden w-full max-w-none sm:mt-10 sm:flex lg:mt-11">
              <ContactCta className="hero-section__action hero-section__action--primary btn btn-primary inline-flex w-auto min-w-[220px] items-center justify-center gap-2 rounded-full bg-akno-cta px-6 py-3.5 text-[15px] font-medium text-white">
                Je réserve mon appel
                <ArrowUpRight className="size-4 shrink-0" />
              </ContactCta>
              <Link
                href="#processus"
                className="hero-section__action hero-section__action--secondary btn btn-outline inline-flex w-auto min-w-[200px] items-center justify-center rounded-full px-6 py-3.5 text-[15px] font-medium"
              >
                Voir la méthode
              </Link>
            </div>

            <HeroFeatures className="akno-enter akno-enter--4 hidden w-full sm:block" />
          </div>

          <div className="hero-section__visual akno-enter akno-enter--4">
            <HeroVideo className="hero-section__media mx-auto w-full sm:mt-12 sm:w-[min(100%,860px)] lg:mt-14" />
          </div>
        </div>
      </section>
    </>
  );
}
