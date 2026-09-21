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
        className="hero-section relative isolate min-h-0 overflow-x-clip overflow-y-visible bg-akno-noir text-white sm:min-h-dvh"
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

            <div className="akno-enter akno-enter--3 mt-8 hidden w-full max-w-none flex-row justify-center gap-4 sm:mt-10 sm:flex lg:mt-11">
              <ContactCta className="btn btn-primary inline-flex w-auto min-w-[220px] items-center justify-center gap-2 rounded-full bg-akno-cta px-6 py-3.5 text-[15px] font-medium text-white">
                Je réserve mon appel
                <ArrowUpRight className="size-4 shrink-0" />
              </ContactCta>
              <Link
                href="#processus"
                className="inline-flex w-auto min-w-[200px] items-center justify-center rounded-full border border-white/90 px-6 py-3.5 text-[15px] font-medium text-white transition-colors hover:bg-white/5"
              >
                Voir la méthode
              </Link>
            </div>

            <HeroFeatures className="akno-enter akno-enter--4 hidden w-full sm:block" />
          </div>

          <div className="hero-section__visual akno-enter akno-enter--4">
            <HeroVideo className="hero-section__media mx-auto w-full sm:mt-12 sm:w-[min(100%,860px)] lg:mt-14" />
          </div>

          <ContactCta className="hero-section__cta-mobile akno-enter akno-enter--5 btn btn-primary sm:hidden">
            Je réserve mon appel
            <ArrowUpRight className="size-4 shrink-0" aria-hidden />
          </ContactCta>
        </div>
      </section>
    </>
  );
}
