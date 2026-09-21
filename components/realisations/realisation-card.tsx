import { ContactCta } from "@/components/contact/contact-cta";
import { ArrowUpRight } from "@/components/icons/arrow-up-right";
import type { RealisationProject } from "@/components/realisations/realisations-data";

const THUMB_ACCENT: Record<RealisationProject["thumbAccent"], string> = {
  cta: "from-akno-cta/30 via-akno-rose/15 to-[#FFE8B0]/50",
  rose: "from-akno-rose/35 via-[#FFD4E8]/45 to-akno-cta/15",
  mint: "from-[#9AE6C5]/40 via-akno-cta/10 to-[#C4B5FD]/35",
};

type RealisationCardProps = {
  project: RealisationProject;
  isActive: boolean;
};

export function RealisationCard({ project, isActive }: RealisationCardProps) {
  return (
    <article className="realisation-case-card">
      <div className="realisation-case-card__grid">
        <div
          className={`realisation-case-card__visual bg-gradient-to-br ${THUMB_ACCENT[project.thumbAccent]}`}
        >
          <span className="realisation-case-card__visual-tag">{project.tag}</span>
          <p className="realisation-case-card__visual-title">{project.thumbLabel}</p>
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
            {project.stats.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd className="realisation-case-card__metric-value">{stat.value}</dd>
                <dd className="realisation-case-card__metric-label">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </article>
  );
}
