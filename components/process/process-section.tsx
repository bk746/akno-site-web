import { ContactCta } from "@/components/contact/contact-cta";
import { ArrowUpRight } from "@/components/icons/arrow-up-right";
import { ProcessStepCard } from "@/components/process/process-step-card";
import { PROCESS_STEPS } from "@/components/process/process-data";

export function ProcessSection() {
  return (
    <section
      id="processus"
      className="process-section akno-surface-light"
      aria-labelledby="process-heading"
    >
      <div className="process-section__panel">
        <header className="process-section__header" data-akno-reveal>
          <p className="process-section__eyebrow">Méthode</p>
          <h2 id="process-heading" className="process-section__title">
            Comment on travaille
          </h2>
          <p className="process-section__subtitle">
            Trois étapes. Un interlocuteur. Du cadrage au lancement.
          </p>
        </header>

        <ol
          className="process-steps"
          aria-label="Étapes du processus"
          data-akno-reveal-stagger
        >
          {PROCESS_STEPS.map((step) => (
            <li key={step.number} className="process-steps__item" data-akno-reveal>
              <ProcessStepCard step={step} />
            </li>
          ))}
        </ol>

        <div className="process-section__cta">
          <ContactCta className="process-section__button btn btn-primary group">
            Je démarre mon projet
            <ArrowUpRight
              className="size-4"
              aria-hidden
            />
          </ContactCta>
          <p className="process-section__trust">
            4–8 semaines · un seul interlocuteur
          </p>
        </div>
      </div>
    </section>
  );
}
