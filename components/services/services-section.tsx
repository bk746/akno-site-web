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
  const [motionLive, setMotionLive] = useState(false);
  const [motionPlayed, setMotionPlayed] = useState(false);
  const listRef = useRef<HTMLUListElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const handleToggle = (id: string) => {
    setActiveId((current) => (current === id ? null : id));
  };

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const cards = list.querySelectorAll(".service-card-scene");
    const visible = new Set<Element>();
    /* `live` pilote la pause/reprise des boucles (perf hors écran).
       `played` est définitif : une fois lancées, les animations d'entrée
       (compteurs, jauge, anneau) ne se réinitialisent plus au scroll. */
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target);
          else visible.delete(entry.target);
        }
        const onCards = visible.size > 0 || reduceMotion;
        setMotionLive(onCards);
        if (onCards) setMotionPlayed(true);
      },
      { threshold: 0.12 },
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

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
      ref={sectionRef}
      id="services"
      className="services-section relative bg-akno-noir text-white"
      data-akno-surface="dark"
      data-live={motionLive ? "" : undefined}
      data-played={motionPlayed ? "" : undefined}
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

      <div className="services-inner relative z-10 mx-auto max-w-[1100px] px-6 pb-4 pt-10 sm:pb-6 sm:pt-14 lg:pb-8 lg:pt-16">
        <h2
          id="services-heading"
          className="text-balance text-center text-[clamp(2rem,4.2vw,3rem)] font-bold leading-[1.12] tracking-[-0.03em] text-white"
          data-akno-reveal
        >
          <span>3 </span>
          <span className="akno-word italic text-akno-cta">services</span>
          <span> complémentaires</span>
        </h2>

        <ul
          ref={listRef}
          data-akno-reveal-stagger
          className="mt-16 flex flex-col items-center gap-[22px] sm:mt-20 lg:mt-24 lg:flex-row lg:items-stretch lg:justify-center"
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
                motionPlayed={motionPlayed}
                motionLive={motionLive}
                onToggle={() => handleToggle(service.id)}
              />
            </li>
          ))}
        </ul>

        <p className="services-footnote mx-auto mt-16 max-w-[520px] text-center sm:mt-20 lg:mt-24">
          Site, design et SEO. Séparés, c’est moyen. Ensemble, c’est un
          système.
        </p>

        <div className="mt-10 flex justify-center sm:mt-12">
          <ContactCta className="btn btn-primary inline-flex w-full max-w-md items-center justify-center gap-2 rounded-full bg-akno-cta px-7 py-3.5 text-[15px] font-medium tracking-[-0.01em] text-white sm:w-auto sm:min-w-[280px]">
            Prendre rendez-vous
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
