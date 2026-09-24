"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { ContactCta } from "@/components/contact/contact-cta";
import { ArrowUpRight } from "@/components/icons/arrow-up-right";
import {
  remeasureHeaderTone,
  resolveHeaderOnLight,
} from "@/lib/header-tone";
import { whenIntroReady } from "@/lib/when-intro-ready";
import logoAkno from "@/src/images/logo-akno-plus.png";

const SCROLL_GLASS_THRESHOLD = 56;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [onLight, setOnLight] = useState(false);
  const [toneReady, setToneReady] = useState(false);
  const onLightRef = useRef(false);

  useEffect(() => {
    let raf = 0;

    const update = () => {
      raf = 0;
      if (!document.documentElement.classList.contains("intro-complete")) return;

      const y = window.scrollY;
      setScrolled(y > SCROLL_GLASS_THRESHOLD);

      const next = resolveHeaderOnLight(y, onLightRef.current);
      if (next !== onLightRef.current) {
        onLightRef.current = next;
        setOnLight(next);
      }
      setToneReady(true);
    };

    const schedule = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(update);
    };

    const measureAndUpdate = () => {
      remeasureHeaderTone();
      schedule();
    };

    measureAndUpdate();
    const stopIntroWatch = whenIntroReady(measureAndUpdate);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", measureAndUpdate, { passive: true });

    return () => {
      stopIntroWatch();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", measureAndUpdate);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <header
      className={`site-header${scrolled ? " site-header--scrolled" : ""}${onLight ? " site-header--light" : ""}${toneReady ? " site-header--tone-ready" : ""}`}
    >
      <div className="site-header__inner">
        <Link href="/" className="site-header__logo-link" aria-label="AKNO — accueil">
          <span className="site-header__logo-shell">
            <Image
              src={logoAkno}
              alt=""
              width={128}
              height={34}
              style={{ width: "auto" }}
              priority
              className="site-header__logo-img h-8 w-auto sm:h-9"
            />
          </span>
        </Link>

        <ContactCta className="site-header__cta btn btn-primary">
          <span className="site-header__cta-label site-header__cta-label--long">
            Prendre rendez-vous
          </span>
          <span className="site-header__cta-label site-header__cta-label--short">
            Réserver
          </span>
          <ArrowUpRight className="size-3.5 shrink-0 sm:size-4" aria-hidden />
        </ContactCta>
      </div>
    </header>
  );
}
