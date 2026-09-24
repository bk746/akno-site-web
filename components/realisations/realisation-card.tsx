import Image from "next/image";

import { ContactCta } from "@/components/contact/contact-cta";
import { ArrowUpRight } from "@/components/icons/arrow-up-right";
import type { RealisationProject } from "@/components/realisations/realisations-data";

type RealisationCardProps = {
  project: RealisationProject;
  isActive?: boolean;
  variant?: "desktop" | "mobile";
  imagePriority?: boolean;
  ariaGroupLabel?: string;
};

export function RealisationCard({
  project,
  isActive = true,
  variant = "desktop",
  imagePriority = false,
  ariaGroupLabel,
}: RealisationCardProps) {
  if (variant === "mobile") {
    const mobileMetrics = project.metrics.slice(0, 2);

    return (
      <article
        className="realisation-case-card realisation-case-card--mobile"
        role="group"
        aria-label={ariaGroupLabel}
      >
        <div className="realisation-case-card__visual realisation-case-card__visual--mobile">
          <Image
            src={project.image}
            alt={project.title}
            fill
            quality={75}
            priority={imagePriority}
            loading={imagePriority ? undefined : "lazy"}
            sizes="(max-width: 767px) calc(100vw - 56px), 100vw"
            className="realisation-case-card__image"
          />
        </div>

        <div className="realisation-case-card__body realisation-case-card__body--mobile">
          <p className="realisation-case-card__eyebrow realisation-case-card__eyebrow--mobile">
            {project.tag}
          </p>
          <h3 className="realisation-case-card__title realisation-case-card__title--mobile">
            {project.title}
          </h3>
          <p className="realisation-case-card__desc realisation-case-card__desc--mobile">
            {project.description}
          </p>

          <ul className="realisation-case-card__stack realisation-case-card__stack--mobile">
            {project.stack.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <dl className="realisation-case-card__metrics realisation-case-card__metrics--mobile">
            {mobileMetrics.map((metric) => (
              <div key={metric.label}>
                <dt className="realisation-case-card__metric-value realisation-case-card__metric-value--mobile">
                  {metric.value}
                </dt>
                <dd className="realisation-case-card__metric-label realisation-case-card__metric-label--mobile">
                  {metric.label}
                </dd>
              </div>
            ))}
          </dl>

          <ContactCta className="realisation-case-card__cta-mobile btn btn-primary group">
            <span>Parler de ce type de projet</span>
            <ArrowUpRight className="size-4 shrink-0" aria-hidden />
          </ContactCta>
        </div>
      </article>
    );
  }

  return (
    <article className="realisation-case-card">
      <div className="realisation-case-card__grid">
        <div className="realisation-case-card__visual">
          <Image
            src={project.image}
            alt={project.title}
            fill
            quality={80}
            sizes="(min-width: 1024px) 960px, 100vw"
            className="realisation-case-card__image"
          />
        </div>

        <div className="realisation-case-card__body">
          <p className="realisation-case-card__eyebrow">{project.tag}</p>
          <h3 className="realisation-case-card__title">{project.title}</h3>
          <p className="realisation-case-card__desc">{project.description}</p>

          {isActive ? (
            <ContactCta className="realisation-case-card__link group">
              <span>Parler de ce type de projet</span>
              <span className="realisation-case-card__link-icon" aria-hidden>
                <ArrowUpRight className="size-4" />
              </span>
            </ContactCta>
          ) : (
            <div className="realisation-case-card__link realisation-case-card__link--ghost">
              <span>Voir le projet</span>
              <span className="realisation-case-card__link-icon" aria-hidden>
                <ArrowUpRight className="size-4" />
              </span>
            </div>
          )}

          <dl className="realisation-case-card__metrics">
            {project.metrics.map((metric) => (
              <div key={metric.label}>
                <dt className="realisation-case-card__metric-value">{metric.value}</dt>
                <dd className="realisation-case-card__metric-label">{metric.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </article>
  );
}
