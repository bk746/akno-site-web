import Image from "next/image";

import { ContactCta } from "@/components/contact/contact-cta";
import { ArrowUpRight } from "@/components/icons/arrow-up-right";
import type { RealisationProject } from "@/components/realisations/realisations-data";

type RealisationCardProps = {
  project: RealisationProject;
  isActive: boolean;
};

export function RealisationCard({ project, isActive }: RealisationCardProps) {
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
