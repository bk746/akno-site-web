"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import { EclypseOrb } from "@/components/eclypse/eclypse-orb";
import { useIntro } from "@/components/intro/intro-provider";
import { lockBodyScroll, unlockBodyScroll } from "@/lib/body-lock";
import { isMobileViewport, prefersReducedMotion } from "@/lib/device";
import { whenIntroReady } from "@/lib/when-intro-ready";
import logoAkno from "@/src/images/logo-akno-plus.png";

function shouldSkipIntro() {
  return (
    document.documentElement.classList.contains("intro-complete") ||
    prefersReducedMotion() ||
    isMobileViewport() ||
    sessionStorage.getItem("akno-intro-seen") === "1"
  );
}

export function SiteIntro() {
  const { completeIntro, skipIntro } = useIntro();
  const [phase, setPhase] = useState<"enter" | "hold" | "exit" | "done">("enter");
  const [visible, setVisible] = useState(false);
  const timersRef = useRef<number[]>([]);

  useEffect(() => {
    const clearTimers = () => {
      timersRef.current.forEach((timer) => window.clearTimeout(timer));
      timersRef.current = [];
    };

    const schedule = (callback: () => void, delay: number) => {
      timersRef.current.push(window.setTimeout(callback, delay));
    };

    if (shouldSkipIntro()) {
      skipIntro();
      return clearTimers;
    }

    document.documentElement.classList.add("intro-pending");
    lockBodyScroll({ forceScrollTop: true });
    const stopIntroWatch = whenIntroReady(() => {
      unlockBodyScroll();
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    });

    const showFrame = window.requestAnimationFrame(() => {
      setVisible(true);
    });

    schedule(() => setPhase("hold"), 320);
    schedule(() => setPhase("exit"), 720);
    schedule(() => {
      sessionStorage.setItem("akno-intro-seen", "1");
      completeIntro();
    }, 1000);
    schedule(() => {
      setPhase("done");
      setVisible(false);
    }, 1200);

    return () => {
      stopIntroWatch();
      unlockBodyScroll();
      window.cancelAnimationFrame(showFrame);
      clearTimers();
    };
  }, [completeIntro, skipIntro]);

  if (!visible || phase === "done") return null;

  const exiting = phase === "exit";

  return (
    <div
      className={`site-intro ${exiting ? "site-intro--exit" : ""}`}
      role="presentation"
    >
      <div className="site-intro__inner">
        <div className="site-intro__cluster">
          <div
            className={`site-intro__copy site-intro__copy--left ${exiting ? "is-exiting" : "is-entering"}`}
          >
            <div className="site-intro__copy-block site-intro__copy-block--left">
              <span>Des expériences</span>
              <span>digitales sur mesure</span>
            </div>
            <div className="site-intro__copy-block site-intro__copy-block--right">
              <span>depuis —</span>
              <span>AKNO</span>
            </div>
          </div>

          <div
            className={`site-intro__orb-wrap ${exiting ? "is-exiting" : "is-entering"}`}
          >
            <EclypseOrb
              variant="hero"
              className="site-intro__orb"
              opacity={1}
              animationDelay="0s"
            />
          </div>

          <div
            className={`site-intro__brand ${exiting ? "is-exiting" : "is-entering"}`}
          >
            <Image
              src={logoAkno}
              alt=""
              width={206}
              height={78}
              style={{ width: "auto" }}
              priority
              draggable={false}
              className="site-intro__brand-logo"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
