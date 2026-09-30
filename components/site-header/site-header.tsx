"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import logoAkno from "@/src/images/logo-akno-interrupteur.png";

import { ContactCta } from "@/components/contact/contact-cta";
import pos from "@/components/seasonal/seasonal-positions.module.css";
import { StickerAnchor } from "@/components/seasonal/sticker-anchor";
import { Sticker } from "@/components/seasonal/sticker";
import { isSeasonalThemeActive } from "@/lib/seasonal-theme";
import { ArrowUpRight } from "@/components/icons/arrow-up-right";
import {
  attachHeaderSurfaceObserver,
  headerProbeRootMargin,
} from "@/lib/header-surface-observer";

const SCROLL_GLASS_THRESHOLD = 56;

type SiteHeaderProps = {
  /** Home uniquement : style nav McFly tant que la sonde est dans #accueil. */
  heroTone?: boolean;
};

export function SiteHeader({ heroTone = false }: SiteHeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [onLight, setOnLight] = useState(false);
  const [toneReady, setToneReady] = useState(false);
  const [onHero, setOnHero] = useState(heroTone);
  const onLightRef = useRef(false);

  useEffect(() => {
    let raf = 0;
    let detachSurface: (() => void) | undefined;
    let detachHero: (() => void) | undefined;

    const updateScroll = () => {
      raf = 0;
      setScrolled(window.scrollY > SCROLL_GLASS_THRESHOLD);
    };

    const scheduleScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(updateScroll);
    };

    let heroIo: IntersectionObserver | null = null;

    const startSurface = () => {
      detachSurface?.();
      detachSurface = attachHeaderSurfaceObserver((next) => {
        if (next !== onLightRef.current) {
          onLightRef.current = next;
          setOnLight(next);
        }
        setToneReady(true);
      });
      updateScroll();
      if (heroTone) {
        const accueil = document.getElementById("accueil");
        if (accueil) {
          const connectHeroIo = () => {
            heroIo?.disconnect();
            heroIo = new IntersectionObserver(
              ([entry]) => {
                setOnHero(entry.isIntersecting);
              },
              { rootMargin: headerProbeRootMargin(), threshold: 0 },
            );
            heroIo.observe(accueil);
          };
          connectHeroIo();
          window.addEventListener("resize", connectHeroIo, { passive: true });
          detachHero = () => {
            window.removeEventListener("resize", connectHeroIo);
            heroIo?.disconnect();
            heroIo = null;
          };
        } else {
          setOnHero(false);
        }
      }
    };

    startSurface();
    window.addEventListener("scroll", scheduleScroll, { passive: true });

    return () => {
      detachSurface?.();
      detachHero?.();
      window.removeEventListener("scroll", scheduleScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [heroTone]);

  const heroClass = heroTone && onHero ? " site-header--hero" : "";
  const homeClass = heroTone ? " site-header--home" : "";

  return (
    <header
      className={`site-header${homeClass}${scrolled ? " site-header--scrolled" : ""}${onLight ? " site-header--light" : ""}${toneReady ? " site-header--tone-ready" : ""}${heroClass}`}
    >
      <div className="site-header__inner">
        <Link href="/" className="site-header__logo-link" aria-label="AKNO — accueil">
          <span className="site-header__logo-shell">
            <Image
              src={logoAkno}
              alt="AKNO"
              width={1024}
              height={305}
              className="site-header__logo-img"
              priority
              sizes="(max-width: 639px) 107px, 120px"
            />
          </span>
        </Link>

        <span
          className={`site-header__cta-wrap${heroTone && isSeasonalThemeActive() ? " site-header__cta-wrap--halloween" : ""}`}
        >
          <ContactCta className="site-header__cta btn btn-primary" aria-haspopup="dialog">
            <span className="site-header__cta-label site-header__cta-label--long">
              Prendre rendez-vous
            </span>
            <span className="site-header__cta-label site-header__cta-label--short">Réserver</span>
            <ArrowUpRight
              className="site-header__cta-arrow site-header__cta-arrow--site size-3.5 shrink-0 sm:size-4"
              aria-hidden
            />
            <svg
              className="site-header__cta-arrow site-header__cta-arrow--hero"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M7 7h10v10" />
              <path d="M7 17 17 7" />
            </svg>
          </ContactCta>
          {heroTone ? (
            <StickerAnchor corner="tr" className={pos.headerPumpkinWrap}>
              <Sticker
                name="citrouille"
                pack="halloween"
                size="S"
                rotate={14}
                className={pos.headerPumpkin}
                eager
                float={false}
                sectionLarge
                keepOnMobile
              />
            </StickerAnchor>
          ) : null}
        </span>
      </div>
    </header>
  );
}
