"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ContactCta } from "@/components/contact/contact-cta";
import { ArrowUpRight } from "@/components/icons/arrow-up-right";
import ellipseTopWhite from "@/src/images/Ellipse 2.png";
import ellipsePillBlack from "@/src/images/Ellipse 3 black.png";
import { ServiceCard } from "@/components/services/service-card";
import { SERVICES } from "@/components/services/services-data";
import { ServicesOrbs } from "@/components/services/services-orbs";

export function ServicesSection() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const handleToggle = (id: string) => {
    setActiveId((current) => (current === id ? null : id));
  };

  useEffect(() => {
    if (!activeId) return;

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (listRef.current?.contains(target)) return;
      setActiveId(null);
    };

    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [activeId]);

  return (
    <section
      id="services"
      className="services-section relative bg-akno-noir text-white"
      data-akno-surface="dark"
      aria-labelledby="services-heading"
    >
      <div className="services-ellipse-top" aria-hidden>
        <Image
          src={ellipseTopWhite}
          alt=""
          className="services-ellipse-white block h-auto w-full"
          sizes="100vw"
        />
        <Image
          src={ellipsePillBlack}
          alt=""
          className="services-ellipse-pill"
          sizes="80px"
        />
      </div>

      <ServicesOrbs />

      <div className="services-inner relative z-10 mx-auto max-w-[1100px] px-6 pb-2 pt-6 sm:pb-3 sm:pt-8 lg:pb-4 lg:pt-10">
        <h2
          id="services-heading"
          className="text-center text-[clamp(1.35rem,3.2vw,1.75rem)] font-bold uppercase leading-tight tracking-[0.12em]"
          data-akno-reveal
        >
          <span className="text-white">3 </span>
          <span className="text-[#8BA4FF]">SERVICES</span>
          <span className="text-white"> COMPLÉMENTAIRES</span>
        </h2>

        <ul
          ref={listRef}
          data-akno-reveal-stagger
          className="mt-12 flex flex-col items-center gap-8 lg:mt-14 lg:flex-row lg:items-stretch lg:justify-center lg:gap-6 xl:gap-8"
        >
          {SERVICES.map((service) => (
            <li
              key={service.id}
              className="w-full max-w-[340px] lg:max-w-none lg:flex-1"
              data-akno-reveal
            >
              <ServiceCard
                service={service}
                isFlipped={activeId === service.id}
                onToggle={() => handleToggle(service.id)}
              />
            </li>
          ))}
        </ul>

        <p className="mx-auto mt-12 max-w-[640px] text-center text-[15px] leading-relaxed text-white/65 sm:mt-14 sm:text-base">
          Site, design et SEO ne marchent pas séparément. Ensemble, ils te
          placent clairement au-dessus de la plupart des concurrents.
        </p>

        <div className="mt-10 flex justify-center sm:mt-12">
          <ContactCta className="btn btn-primary inline-flex w-full max-w-md items-center justify-center gap-2 rounded-full bg-akno-cta px-7 py-3.5 text-[15px] font-medium tracking-[-0.01em] text-white sm:w-auto sm:min-w-[280px]">
            Je choisis mon pack
            <ArrowUpRight className="size-4 shrink-0" />
          </ContactCta>
        </div>
      </div>

      <div className="services-ellipse-bottom" aria-hidden>
        <Image
          src={ellipseTopWhite}
          alt=""
          className="services-ellipse-white services-ellipse-white--bottom block h-auto w-full min-w-full max-w-none"
          sizes="100vw"
        />
      </div>
    </section>
  );
}
