"use client";

import { useEffect, useRef, useState } from "react";

import { whenIntroReady } from "@/lib/when-intro-ready";

const HERO_POSTER = "/videos/akno-hero-poster.webp";

type VideoPhase = "idle" | "playing" | "paused" | "ended";

type HeroVideoProps = {
  className?: string;
};

export function HeroVideo({ className }: HeroVideoProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [phase, setPhase] = useState<VideoPhase>("idle");

  useEffect(() => {
    const wrap = wrapRef.current;
    const video = videoRef.current;
    if (!wrap || !video) return;

    let cancelled = false;
    let started = false;

    const playIfAllowed = async () => {
      if (cancelled || !document.documentElement.classList.contains("intro-complete")) {
        return;
      }
      try {
        video.muted = true;
        video.defaultMuted = true;
        await video.play();
        if (cancelled) return;
        started = true;
        setPhase("playing");
      } catch {
        if (!cancelled) setPhase("idle");
      }
    };

    const pauseVideo = () => {
      if (cancelled || video.paused) return;
      video.pause();
      setPhase("paused");
    };

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry || cancelled) return;

        if (entry.isIntersecting) {
          if (!started) {
            void playIfAllowed();
          } else if (video.paused && !video.ended) {
            void playIfAllowed();
          }
        } else if (started) {
          pauseVideo();
        }
      },
      { threshold: 0, rootMargin: "0px 0px 48px 0px" },
    );

    const onCanPlay = () => void playIfAllowed();
    const onLoadedData = () => void playIfAllowed();
    const onPlaying = () => {
      if (!cancelled) setPhase("playing");
    };

    io.observe(wrap);
    video.addEventListener("canplay", onCanPlay);
    video.addEventListener("loadeddata", onLoadedData);
    video.addEventListener("playing", onPlaying);

    const stopWaiting = whenIntroReady(() => void playIfAllowed());
    const poll = window.setInterval(() => {
      if (cancelled || started) {
        window.clearInterval(poll);
        return;
      }
      void playIfAllowed();
    }, 400);

    void playIfAllowed();

    return () => {
      cancelled = true;
      stopWaiting();
      io.disconnect();
      window.clearInterval(poll);
      video.removeEventListener("canplay", onCanPlay);
      video.removeEventListener("loadeddata", onLoadedData);
      video.removeEventListener("playing", onPlaying);
      video.pause();
    };
  }, []);

  const handlePlay = async () => {
    const video = videoRef.current;
    if (!video) return;

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
          poster={HERO_POSTER}
          preload="metadata"
          autoPlay
          muted
          loop
          playsInline
          controls={false}
          onClick={handlePause}
          onEnded={handleEnded}
          aria-label="Vidéo de présentation AKNO"
        >
          <source
            src="/videos/akno-hero-720.webm"
            type="video/webm"
            media="(max-width: 768px)"
          />
          <source
            src="/videos/akno-hero-720.mp4"
            type="video/mp4"
            media="(max-width: 768px)"
          />
          <source src="/videos/akno-hero-1080.webm" type="video/webm" />
          <source src="/videos/akno-hero-1080.mp4" type="video/mp4" />
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
