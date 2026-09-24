"use client";

import { useEffect, useRef, useState } from "react";

import {
  scheduleAfterFirstPaint,
  shouldDeferHeroVideo,
} from "@/lib/media-network";
import { whenIntroReady } from "@/lib/when-intro-ready";

type VideoPhase = "idle" | "loading" | "playing" | "paused" | "ended" | "poster-only";

type HeroVideoPlayerProps = {
  className?: string;
};

export function HeroVideoPlayer({ className }: HeroVideoPlayerProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [phase, setPhase] = useState<VideoPhase>("idle");
  const [sourcesReady, setSourcesReady] = useState(false);

  useEffect(() => {
    if (shouldDeferHeroVideo()) {
      setPhase("poster-only");
      return;
    }

    const cancelSchedule = scheduleAfterFirstPaint(() => {
      setSourcesReady(true);
      setPhase("loading");
    });

    return cancelSchedule;
  }, []);

  useEffect(() => {
    if (!sourcesReady || phase === "poster-only") return;

    const wrap = wrapRef.current;
    const video = videoRef.current;
    if (!wrap || !video) return;

    let cancelled = false;
    let started = false;

    const playIfAllowed = async () => {
      if (
        cancelled ||
        !document.documentElement.classList.contains("intro-complete")
      ) {
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

    return () => {
      cancelled = true;
      stopWaiting();
      io.disconnect();
      video.removeEventListener("canplay", onCanPlay);
      video.removeEventListener("loadeddata", onLoadedData);
      video.removeEventListener("playing", onPlaying);
      video.pause();
    };
  }, [sourcesReady, phase]);

  const ensureSourcesAndPlay = async () => {
    if (phase === "poster-only") {
      setSourcesReady(true);
      setPhase("loading");
    }
    const video = videoRef.current;
    if (!video) return;
    try {
      await video.play();
      setPhase("playing");
    } catch {
      /* gesture / policy */
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

  const showPlayOverlay =
    phase !== "playing" && phase !== "poster-only" && sourcesReady;

  return (
    <div ref={wrapRef} className={className}>
      {sourcesReady ? (
        <video
          ref={videoRef}
          className={`hero-video-player absolute inset-0 z-[1] h-full w-full cursor-pointer object-cover ${
            phase === "playing" ? "opacity-100" : "opacity-0"
          }`}
          preload="none"
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
        </video>
      ) : null}

      {showPlayOverlay || phase === "poster-only" ? (
        <button
          type="button"
          className="absolute inset-0 z-[2] flex cursor-pointer items-center justify-center bg-transparent transition-opacity hover:opacity-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/60"
          aria-label={
            phase === "idle" || phase === "ended" || phase === "poster-only"
              ? "Lire la vidéo"
              : "Reprendre la vidéo"
          }
          onClick={() => void ensureSourcesAndPlay()}
        >
          <span className="ml-1.5 block h-0 w-0 border-y-[26px] border-l-[44px] border-y-transparent border-l-white sm:border-y-[30px] sm:border-l-[50px]" />
        </button>
      ) : null}
    </div>
  );
}
