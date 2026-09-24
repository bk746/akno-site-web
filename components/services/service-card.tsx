"use client";

import { ContactCta } from "@/components/contact/contact-cta";
import {
  useEffect,
  useRef,
  type KeyboardEvent,
  type RefObject,
} from "react";

import { ArrowUpRight } from "@/components/icons/arrow-up-right";
import {
  SERVICE_BACK_TRUST,
  type ServiceItem,
} from "@/components/services/services-data";

const CHART_PATH =
  "M28 90C44 90 58 64 72 64C90 64 102 84 116 82C136 80 150 48 164 46C180 44 194 28 208 28C224 28 236 46 252 46";
const CHART_PEAK = { x: 208, y: 28 };
const CHART_MONTHS = [
  ["Jan", 28],
  ["Fév", 72],
  ["Mar", 116],
  ["Avr", 164],
  ["Mai", 208],
  ["Juin", 252],
] as const;

type ServiceCardProps = {
  service: ServiceItem;
  isFlipped: boolean;
  /** Les animations d'entrée ont été lancées (définitif). */
  motionPlayed: boolean;
  /** Les cartes sont à l'écran : les boucles tournent, sinon elles sont en pause. */
  motionLive: boolean;
  onToggle: () => void;
};

type MotionProps = {
  played: boolean;
  live: boolean;
};

function easeOutChart(t: number) {
  const x1 = 0.22;
  const y1 = 1;
  const x2 = 0.36;
  const y2 = 1;
  let u = t;
  for (let i = 0; i < 6; i += 1) {
    const one = 1 - u;
    const f =
      3 * one * one * u * x1 + 3 * one * u * u * x2 + u * u * u - t;
    const d =
      3 * one * one * x1 +
      6 * one * u * (x2 - x1) +
      3 * u * u * (1 - x2);
    if (Math.abs(d) < 1e-6) break;
    u -= f / d;
  }
  const x = Math.min(1, Math.max(0, u));
  const one = 1 - x;
  return 3 * one * one * x * y1 + 3 * one * x * x * y2 + x * x * x;
}

function easeTravel(t: number) {
  const x = Math.min(1, Math.max(0, t));
  return x < 0.5 ? 2 * x * x : 1 - ((-2 * x + 2) ** 2) / 2;
}

/** Compteur animé écrit directement dans le DOM (pas de re-render par frame). */
function useSeoCount(
  ref: RefObject<HTMLElement | null>,
  played: boolean,
  target: number,
  duration: number,
  delay: number,
  suffix = "",
) {
  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const write = (value: number) => {
      node.textContent = `${value}${suffix}`;
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      write(target);
      return;
    }
    if (!played) {
      write(0);
      return;
    }

    const origin = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const t = Math.min(1, Math.max(0, (now - origin - delay) / duration));
      write(Math.round(easeOutChart(t) * target));
      if (now - origin < delay + duration) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [ref, played, target, duration, delay, suffix]);
}

const SPARK_PATH =
  "M4 28C16 28 20 18 32 18C44 18 48 24 60 22C72 20 78 12 90 12C102 12 108 16 120 14C132 12 140 6 152 6";

function SeoDashboard({ played, live }: MotionProps) {
  const scoreRef = useRef<HTMLSpanElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);
  useSeoCount(scoreRef, played, 98, 1200, 0);
  useSeoCount(percentRef, played, 92, 1250, 150, "%");
  const sparkRef = useRef<SVGPathElement>(null);
  const sparkDotRef = useRef<SVGCircleElement>(null);
  const sparkGlowRef = useRef<SVGCircleElement>(null);
  /* Phase de la boucle conservée entre pause et reprise. */
  const phaseRef = useRef(0);

  useEffect(() => {
    const path = sparkRef.current;
    const dot = sparkDotRef.current;
    const glow = sparkGlowRef.current;
    if (!path || !dot || !glow) return;

    const length = path.getTotalLength();
    const place = (progress: number, opacity: number) => {
      const point = path.getPointAtLength(progress * length);
      const x = String(point.x);
      const y = String(point.y);
      dot.setAttribute("cx", x);
      dot.setAttribute("cy", y);
      glow.setAttribute("cx", x);
      glow.setAttribute("cy", y);
      dot.style.opacity = String(opacity);
      glow.style.opacity = String(opacity * 0.85);
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      path.style.strokeDashoffset = "0";
      place(1, 1);
      return;
    }
    if (!played) {
      path.style.strokeDashoffset = "1";
      place(0, 0);
      phaseRef.current = 0;
      return;
    }
    /* Hors écran : on fige l'état courant, sans reset. */
    if (!live) return;

    const duration = window.matchMedia("(max-width: 767px)").matches ? 11000 : 8600;
    let frame = 0;
    const start = performance.now() - phaseRef.current;
    const tick = (now: number) => {
      const elapsed = (now - start) % duration;
      phaseRef.current = elapsed;
      const t = elapsed / duration;
      let progress = 0;
      let dash = 1;
      if (t < 0.46) {
        progress = easeTravel(t / 0.46);
        dash = 1 - progress;
      } else if (t < 0.68) {
        progress = 1;
        dash = 0;
      } else {
        const back = easeTravel((t - 0.68) / 0.32);
        progress = 1 - back;
        dash = -back;
      }
      path.style.strokeDashoffset = String(dash);
      place(progress, t > 0.03 && t < 0.98 ? 1 : 0);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [played, live]);

  return (
    <div className="seo-dash" aria-hidden>
      <div className="seo-dash__ring">
        <svg className="seo-dash__ring-svg" viewBox="0 0 72 72" aria-hidden>
          <circle className="seo-dash__ring-track" cx="36" cy="36" r="26" />
          <circle className="seo-dash__ring-value" cx="36" cy="36" r="26" />
        </svg>
        <span ref={scoreRef} className="seo-dash__score">
          0
        </span>
        <span className="seo-dash__score-label">Score</span>
      </div>

      <div className="seo-dash__meter">
        <span ref={percentRef} className="seo-dash__pct">
          0%
        </span>
        <span className="seo-dash__meter-track">
          <span className="seo-dash__bar">
            <span className="seo-dash__bar-fill">
              <span className="seo-dash__glow">
                <span className="seo-dash__glow-core" />
              </span>
            </span>
          </span>
        </span>
      </div>

      <div className="seo-dash__metrics">
        <div className="seo-dash__metric">
          <p className="seo-dash__metric-row">
            <span>LCP</span>
            <strong>1.2s</strong>
          </p>
          <span className="seo-dash__micro">
            <span className="seo-dash__micro-fill seo-dash__micro-fill--lcp" />
          </span>
        </div>
        <div className="seo-dash__metric">
          <p className="seo-dash__metric-row">
            <span>CLS</span>
            <strong>
              0.01
              <span className="seo-dash__check" aria-hidden />
            </strong>
          </p>
          <span className="seo-dash__micro">
            <span className="seo-dash__micro-fill seo-dash__micro-fill--cls" />
          </span>
        </div>
      </div>

      <svg className="seo-dash__spark" viewBox="0 0 156 36" fill="none" aria-hidden>
        <path className="seo-dash__spark-guide" d={SPARK_PATH} />
        <path
          ref={sparkRef}
          className="seo-dash__spark-path"
          d={SPARK_PATH}
          pathLength={1}
        />
        <circle ref={sparkGlowRef} className="seo-dash__spark-glow" r="5" />
        <circle ref={sparkDotRef} className="seo-dash__spark-dot" r="2.2" />
      </svg>
    </div>
  );
}

function DesignChart({ played, live }: MotionProps) {
  const pathRef = useRef<SVGPathElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);
  const haloRef = useRef<SVGCircleElement>(null);
  const valueRef = useRef<SVGTextElement>(null);
  const phaseRef = useRef(0);

  useEffect(() => {
    const path = pathRef.current;
    const dot = dotRef.current;
    const halo = haloRef.current;
    const value = valueRef.current;
    if (!path || !dot || !halo || !value) return;

    const length = path.getTotalLength();
    let peakAt = 0.8;
    let bestDistance = Number.POSITIVE_INFINITY;
    for (let step = 0; step <= 100; step += 1) {
      const point = path.getPointAtLength((step / 100) * length);
      const distance =
        (point.x - CHART_PEAK.x) ** 2 + (point.y - CHART_PEAK.y) ** 2;
      if (distance < bestDistance) {
        bestDistance = distance;
        peakAt = step / 100;
      }
    }

    const place = (progress: number, opacity: number) => {
      const point = path.getPointAtLength(progress * length);
      const x = String(point.x);
      const y = String(point.y);
      dot.setAttribute("cx", x);
      dot.setAttribute("cy", y);
      halo.setAttribute("cx", x);
      halo.setAttribute("cy", y);
      dot.style.opacity = String(opacity);
      halo.style.opacity = String(opacity * 0.45);
    };

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      path.style.strokeDashoffset = "0";
      place(peakAt, 1);
      value.style.opacity = "1";
      return;
    }

    if (!played) {
      path.style.strokeDashoffset = "1";
      place(0, 0);
      value.style.opacity = "0";
      phaseRef.current = 0;
      return;
    }
    if (!live) return;

    const duration = window.matchMedia("(max-width: 767px)").matches ? 12000 : 9600;
    let frame = 0;
    const start = performance.now() - phaseRef.current;

    const tick = (now: number) => {
      const elapsed = (now - start) % duration;
      phaseRef.current = elapsed;
      const t = elapsed / duration;
      let progress = 0;
      let dash = 1;

      if (t < 0.42) {
        progress = easeTravel(t / 0.42);
        dash = 1 - progress;
      } else if (t < 0.64) {
        progress = 1;
        dash = 0;
      } else {
        const back = easeTravel((t - 0.64) / 0.36);
        progress = 1 - back;
        dash = -back;
      }

      path.style.strokeDashoffset = String(dash);
      const visible = t > 0.02 && t < 0.985;
      place(progress, visible ? 1 : 0);

      const nearPeak = Math.abs(progress - peakAt) < 0.12 && t < 0.7;
      value.style.opacity = nearPeak ? "1" : "0";
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [played, live]);

  return (
    <svg className="service-motif-chart" viewBox="0 0 280 146" fill="none">
      <g className="service-chart-grid">
        <line x1="18" y1="30" x2="262" y2="30" />
        <line x1="18" y1="54" x2="262" y2="54" />
        <line x1="18" y1="78" x2="262" y2="78" />
        <line x1="18" y1="102" x2="262" y2="102" />
      </g>
      <path className="service-chart-axis" d="M18 14V104H262" />
      <path className="service-chart-guide" d={CHART_PATH} />
      <path
        ref={pathRef}
        className="service-motif-path"
        d={CHART_PATH}
        pathLength={1}
      />
      {CHART_MONTHS.map(([label, x]) => (
        <text key={label} className="service-chart-label" x={x} y="124">
          {label}
        </text>
      ))}
      <circle ref={haloRef} className="service-chart-halo" r="8" />
      <circle ref={dotRef} className="service-chart-dot" r="3.25" />
      <text
        ref={valueRef}
        className="service-chart-value"
        x={CHART_PEAK.x}
        y={CHART_PEAK.y - 14}
        textAnchor="middle"
      >
        12.5k
      </text>
    </svg>
  );
}

const TILT_CLASS: Record<ServiceItem["tilt"], string> = {
  left: "service-card-wrap--left",
  center: "service-card-wrap--center",
  right: "service-card-wrap--right",
};

export function ServiceCard({
  service,
  isFlipped,
  motionPlayed,
  motionLive,
  onToggle,
}: ServiceCardProps) {
  const wrapTilt = !isFlipped ? TILT_CLASS[service.tilt] : "";

  const onFrontKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (isFlipped) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onToggle();
    }
  };

  return (
    <div
      data-service-card
      className={`service-card-wrap w-full ${wrapTilt} ${
        isFlipped ? "service-card-wrap--flipped" : ""
      }`}
    >
      <div className="service-card-scene">
        <div
          className={`service-card service-card--${service.variant} ${
            isFlipped ? "is-flipped" : ""
          }`}
        >
          <div
            className={`service-card__inner ${isFlipped ? "is-flipped" : ""}`}
          >
            <div
              role="button"
              tabIndex={isFlipped ? -1 : 0}
              aria-expanded={isFlipped}
              aria-label={`${service.title} — En savoir plus`}
              className="service-card__face service-card__face--front"
              onClick={() => {
                if (!isFlipped) onToggle();
              }}
              onKeyDown={onFrontKeyDown}
            >
              <div
                className={`service-card__motif service-card__motif--${service.variant}`}
                aria-hidden
              >
                {service.variant === "site" ? (
                  <span className="service-motif-device">
                    <span className="service-motif-shine" />
                    <span className="service-motif-lines">
                      <span />
                      <span />
                      <span />
                    </span>
                  </span>
                ) : null}
                {service.variant === "design" ? (
                  <DesignChart played={motionPlayed} live={motionLive} />
                ) : null}
                {service.variant === "seo" ? (
                  <SeoDashboard played={motionPlayed} live={motionLive} />
                ) : null}
              </div>
              <div className="service-card__front-content">
                <h3 className="service-card__front-title">{service.title}</h3>
                <span className="service-card__front-cta">En savoir plus</span>
              </div>
            </div>

            <div
              className="service-card__face service-card__face--back"
              onClick={() => {
                if (isFlipped) onToggle();
              }}
            >
              <h3 className="service-card__back-title">{service.backTitle}</h3>
              <p className="service-card__back-subtitle">{service.subtitle}</p>
              <p className="service-card__back-label">Livrables</p>
              <ul className="service-card__deliverables">
                {service.deliverables.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div className="service-card__back-actions">
                <button
                  type="button"
                  className="service-card__back-ghost"
                  onClick={(event) => {
                    event.stopPropagation();
                    onToggle();
                  }}
                >
                  Retour
                </button>
                <ContactCta
                  className="service-card__back-primary btn btn-primary group/link"
                  onClick={(event) => event.stopPropagation()}
                >
                  {service.ctaLabel}
                  <ArrowUpRight
                    className="size-3.5"
                    aria-hidden
                  />
                </ContactCta>
                <p className="service-card__back-trust">{SERVICE_BACK_TRUST}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
