"use client";

import { useEffect, useRef, useState } from "react";

import { whenIntroReady } from "@/lib/when-intro-ready";

const HERO_VIDEO_SRC = "/videos/akno-hero-v5.mp4";

type VideoPhase = "idle" | "playing" | "paused" | "ended";

type HeroVideoProps = {
  className?: string;
};

function attachHeroSource(video: HTMLVideoElement) {
  if (video.getAttribute("src") === HERO_VIDEO_SRC) return;
  video.src = HERO_VIDEO_SRC;
}

export function HeroVideo({ className }: HeroVideoProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [phase, setPhase] = useState<VideoPhase>("idle");

  useEffect(() => {
    const wrap = wrapRef.current;
    const video = videoRef.current;
    if (!wrap || !video) return;

    let ready = false;
    let visible = false;
    let cancelled = false;

    const syncPlayback = async () => {
      if (cancelled || !ready || !visible) {
        if (!video.paused) video.pause();
        return;
      }

      attachHeroSource(video);
      video.muted = true;

      try {
        await video.play();
        if (!cancelled) setPhase("playing");
      } catch {
        if (!cancelled) setPhase("idle");
      }
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting && entry.intersectionRatio >= 0.2;
        if (!visible && !video.paused) {
          video.pause();
          setPhase((current) => (current === "playing" ? "paused" : current));
        }
        void syncPlayback();
      },
      { threshold: [0, 0.2, 0.5] },
    );

    io.observe(wrap);
    const stopWaiting = whenIntroReady(() => {
      ready = true;
      void syncPlayback();
    });

    return () => {
      cancelled = true;
      stopWaiting();
      io.disconnect();
      video.pause();
    };
  }, []);

  const handlePlay = async () => {
    const video = videoRef.current;
    if (!video) return;

    attachHeroSource(video);

    if (phase === "idle" || phase === "ended") {
      video.currentTime = 0;
    }

    try {
      await video.play();
      setPhase("playing");
    } catch {
      /* autoplay policies / user gesture */
    }
  };

  const handlePause = () => {
    const video = videoRef.current;
    if (!video || phase !== "playing") return;
    video.pause();
    setPhase("paused");
  };

  const handleEnded = () => {
    const video = videoRef.current;
    if (!video) return;

    video.pause();
    if (Number.isFinite(video.duration) && video.duration > 0) {
      video.currentTime = Math.max(0, video.duration - 0.04);
    }
    setPhase("ended");
  };

  return (
    <div ref={wrapRef} className={className}>
      <div className="hero-section__media-inner relative aspect-video w-full overflow-hidden rounded-[24px] bg-[#1a1a1e] sm:rounded-[28px]">
        <video
          ref={videoRef}
          className="h-full w-full cursor-pointer object-cover"
          preload="none"
          muted
          playsInline
          controls={false}
          onClick={handlePause}
          onEnded={handleEnded}
          aria-label="Vidéo de présentation AKNO"
        >
          Votre navigateur ne prend pas en charge la lecture vidéo.
        </video>

        <div className="hero-video-bottom-blur" aria-hidden>
          <span className="hero-video-bottom-blur__layer hero-video-bottom-blur__layer--strong" />
        </div>

        {phase !== "playing" ? (
          <button
            type="button"
            className="absolute inset-0 z-10 flex cursor-pointer items-center justify-center bg-transparent transition-opacity hover:opacity-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/60"
            aria-label={
              phase === "idle" || phase === "ended"
                ? "Lire la vidéo"
                : "Reprendre la vidéo"
            }
            onClick={handlePlay}
          >
            <span className="ml-1.5 block h-0 w-0 border-y-[26px] border-l-[44px] border-y-transparent border-l-white sm:border-y-[30px] sm:border-l-[50px]" />
          </button>
        ) : null}
      </div>
    </div>
  );
}
