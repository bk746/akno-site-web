"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { ContactCta } from "@/components/contact/contact-cta";
import { ArrowUpRight } from "@/components/icons/arrow-up-right";
import { whenIntroReady } from "@/lib/when-intro-ready";
import logoAkno from "@/src/images/logo-akno-plus.png";

const SCROLL_GLASS_THRESHOLD = 56;
/** Sous le header fixe : ce qui est réellement visible derrière le logo. */
const SURFACE_PROBE_Y = 52;

function isLightSurfaceAtHeader() {
  const x = Math.round(Math.min(window.innerWidth * 0.14, 120));
  const y = SURFACE_PROBE_Y;
  const stack = document.elementsFromPoint(x, y);

  for (const el of stack) {
    if (!(el instanceof HTMLElement)) continue;
    if (el.closest(".site-header")) continue;

    if (el.closest("[data-akno-surface='dark']")) {
      return false;
    }

    if (
      el.closest(".akno-surface-light") ||
      el.closest("[data-akno-surface='light']")
    ) {
      return true;
    }

    if (el.closest(".site-shell, main")) {
      return false;
    }
  }

  return false;
}

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [onLight, setOnLight] = useState(false);
  const [toneReady, setToneReady] = useState(false);

  useEffect(() => {
    let raf = 0;
    /* Le hit-test (elementsFromPoint) ne tourne que si la page a bougé
       d'au moins quelques px : inutile de le refaire à chaque frame. */
    let lastProbeY = Number.NaN;
    let force = false;

    const update = () => {
      raf = 0;
      if (!document.documentElement.classList.contains("intro-complete")) return;

      const y = window.scrollY;
      setScrolled(y > SCROLL_GLASS_THRESHOLD);

      if (force || Number.isNaN(lastProbeY) || Math.abs(y - lastProbeY) >= 6) {
        lastProbeY = y;
        force = false;
        setOnLight(isLightSurfaceAtHeader());
        setToneReady(true);
      }
    };

    const schedule = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(update);
    };
    const scheduleForced = () => {
      force = true;
      schedule();
    };

    update();
    const stopIntroWatch = whenIntroReady(scheduleForced);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", scheduleForced, { passive: true });

    return () => {
      stopIntroWatch();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", scheduleForced);
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
