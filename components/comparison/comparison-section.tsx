import { ContactCta } from "@/components/contact/contact-cta";
import { COMPARISON_ROWS } from "@/components/comparison/comparison-data";
import { ArrowUpRight } from "@/components/icons/arrow-up-right";

function ComparisonCheckIcon() {
  return (
    <span className="comparison-icon comparison-icon--check" aria-hidden>
      ✓
    </span>
  );
}

function ComparisonCrossIcon() {
  return (
    <span className="comparison-icon comparison-icon--cross" aria-hidden>
      ✕
    </span>
  );
}

export function ComparisonSection() {
  return (
    <section
      id="comparaison"
      className="comparison-section akno-surface-light"
      aria-labelledby="comparison-heading"
    >
      <div className="comparison-section__inner">
        <header className="comparison-section__header" data-akno-reveal>
          <h2 id="comparison-heading" className="comparison-section__title">
            Pourquoi <span className="text-akno-cta">AKNO</span> plutôt
            qu&apos;une approche classique ?
          </h2>
          <p className="comparison-section__subtitle">
            Même besoin. Deux façons très différentes de le traiter.
          </p>
        </header>

        <div
          className="comparison-table"
          role="table"
          aria-label="Comparaison AKNO et approche classique"
          data-akno-reveal-stagger
        >
          <div
            className="comparison-table__row comparison-table__row--head"
            role="row"
            data-akno-reveal
          >
            <div
              className="comparison-table__cell comparison-table__cell--criteria comparison-table__cell--head"
              role="columnheader"
            >
              Critère
            </div>
            <div
              className="comparison-table__cell comparison-table__cell--akno comparison-table__cell--head comparison-table__cell--akno-first"
              role="columnheader"
            >
              <span className="comparison-table__head-akno">
                AKNO <span aria-hidden>✓</span>
              </span>
            </div>
            <div
              className="comparison-table__cell comparison-table__cell--classic comparison-table__cell--head"
              role="columnheader"
            >
              Approche classique
            </div>
          </div>

          {COMPARISON_ROWS.map((row, index) => (
            <div
              key={row.id}
              className="comparison-table__row"
              role="row"
              data-akno-reveal
            >
              <div
                className="comparison-table__cell comparison-table__cell--criteria"
                role="rowheader"
              >
                <span className="comparison-table__criterion">{row.criterion}</span>
              </div>
              <div
                className={`comparison-table__cell comparison-table__cell--akno ${
                  index === COMPARISON_ROWS.length - 1
                    ? "comparison-table__cell--akno-last"
                    : ""
                }`}
                role="cell"
              >
                <div className="comparison-table__value">
                  <ComparisonCheckIcon />
                  <p className="comparison-table__text comparison-table__text--akno">
                    {row.akno}
                  </p>
                </div>
              </div>
              <div
                className="comparison-table__cell comparison-table__cell--classic"
                role="cell"
              >
                <div className="comparison-table__value">
                  <ComparisonCrossIcon />
                  <p className="comparison-table__text comparison-table__text--classic">
                    {row.classic}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <ul
          className="comparison-mobile"
          aria-label="Comparaison AKNO et approche classique"
          data-akno-reveal-stagger
        >
          {COMPARISON_ROWS.map((row) => (
            <li key={row.id} className="comparison-mobile__item" data-akno-reveal>
              <article className="comparison-mobile-card">
                <h3 className="comparison-mobile-card__criterion">{row.criterion}</h3>
                <div className="comparison-mobile-card__akno">
                  <ComparisonCheckIcon />
                  <div>
                    <p className="comparison-mobile-card__label">AKNO</p>
                    <p className="comparison-mobile-card__text comparison-mobile-card__text--akno">
                      {row.akno}
                    </p>
                  </div>
                </div>
                <div className="comparison-mobile-card__classic">
                  <ComparisonCrossIcon />
                  <div>
                    <p className="comparison-mobile-card__label">
                      Approche classique
                    </p>
                    <p className="comparison-mobile-card__text comparison-mobile-card__text--classic">
                      {row.classic}
                    </p>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>

        <div className="comparison-section__cta">
          <p className="comparison-section__cta-text">
            Tu veux la méthode AKNO ?
          </p>
          <ContactCta className="comparison-section__cta-button btn btn-primary group">
            Je réserve mon appel
            <ArrowUpRight
              className="size-4"
              aria-hidden
            />
          </ContactCta>
        </div>
      </div>
    </section>
  );
}
