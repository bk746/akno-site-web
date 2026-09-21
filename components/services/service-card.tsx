"use client";

import Image from "next/image";
import { ContactCta } from "@/components/contact/contact-cta";
import type { KeyboardEvent } from "react";

import { ArrowUpRight } from "@/components/icons/arrow-up-right";
import {
  SERVICE_BACK_TRUST,
  type ServiceItem,
} from "@/components/services/services-data";

type ServiceCardProps = {
  service: ServiceItem;
  isFlipped: boolean;
  onToggle: () => void;
};

const TILT_CLASS: Record<ServiceItem["tilt"], string> = {
  left: "service-card-wrap--left",
  center: "service-card-wrap--center",
  right: "service-card-wrap--right",
};

export function ServiceCard({ service, isFlipped, onToggle }: ServiceCardProps) {
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
              aria-label={`${service.title} — voir les livrables`}
              className="service-card__face service-card__face--front"
              onClick={() => {
                if (!isFlipped) onToggle();
              }}
              onKeyDown={onFrontKeyDown}
            >
              <Image
                src={service.cover}
                alt=""
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 90vw, 340px"
                quality={80}
                priority={service.tilt === "center"}
              />
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
                    className="size-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
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
