import { ContactCta } from "@/components/contact/contact-cta";
import { ServiceCardShell } from "@/components/services/service-card-shell";
import {
  SERVICES,
  SERVICES_OPTIONS,
  type ServiceId,
} from "@/components/services/services-data";
import styles from "@/components/services/services-section.module.css";
import {
  DesignVisual,
  SeoVisual,
  SiteVisual,
} from "@/components/services/services-visuals";
function ServiceVisual({ id }: { id: ServiceId }) {
  if (id === "site") return <SiteVisual />;
  if (id === "design") return <DesignVisual />;
  return <SeoVisual showRankBadge={SERVICES_OPTIONS.showSeoRankBadge} />;
}
export function ServicesSection() {
  const { showEyebrow, showSubtitle, showTrust } = SERVICES_OPTIONS;
  return (
    <section
      id="services"
      className={`${styles.section} akno-deferred-section`}
      data-akno-surface="dark"
      aria-labelledby="services-heading"
    >
      <svg className={`${styles.arch} ${styles.archTop}`} viewBox="0 0 1440 150" preserveAspectRatio="none" aria-hidden="true"><path d="M0 0H1440V150Q720 -50 0 150Z" fill="#fff" /></svg>
      <span className={`${styles.glow} ${styles.glowA}`} aria-hidden="true"></span>
      <span className={`${styles.glow} ${styles.glowB}`} aria-hidden="true"></span>
      <span className={`${styles.glow} ${styles.glowC}`} aria-hidden="true"></span>
      <div className={styles.inner}>
        <header className={styles.head} data-akno-reveal>
          {showEyebrow ? (
            <span className={styles.eyebrow}>
              <span className={styles.eyebrowDot} aria-hidden="true"></span>
              Expertises
            </span>
          ) : null}
          <h2 className={styles.title} id="services-heading">
            3 <span className={`${styles.accent} akno-word`}>services</span> complémentaires
          </h2>
          {showSubtitle ? (
            <p className={styles.sub}>Un seul studio pour concevoir, dessiner et faire connaître votre site.</p>
          ) : null}
        </header>
        <ul className={styles.grid} data-akno-reveal-stagger>
          {SERVICES.map((service) => (
            <li key={service.id} className={styles.item} data-akno-reveal>
              <ServiceCardShell className={styles.card} service={service.id}>
                <span className={styles.cardRing} aria-hidden="true"></span>
                <ServiceVisual id={service.id} />
                <div className={styles.cardBody}>
                  <span className={styles.cardNum}>{service.num}</span>
                  <h3 className={styles.cardTitle}>{service.title}</h3>
                  <p className={styles.cardDesc}>{service.description}</p>
                  <ul className={styles.cardPts}>
                    {service.points.map((point) => (
                      <li key={point}>
                        <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>
                        {point}
                      </li>
                    ))}
                  </ul>
                  <ContactCta
                    className={styles.cardLink}
                    aria-haspopup="dialog"
                    aria-label={`En savoir plus sur l'offre ${service.title}`}
                  >
                    {service.linkLabel}
                    <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                  </ContactCta>
                </div>
              </ServiceCardShell>
            </li>
          ))}
        </ul>
        <p className={styles.foot}>Site, design et SEO. Séparés, c’est moyen. Ensemble, c’est un système.</p>
        <div className={styles.ctas}>
          <ContactCta className={styles.cta}>
            Prendre rendez-vous
            <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true"><path d="M7 7h10v10" /><path d="M7 17 17 7" /></svg>
          </ContactCta>
          {showTrust ? (
            <span className={styles.trust}>Réponse sous 24 h · Devis après cadrage</span>
          ) : null}
        </div>
      </div>
      <svg className={`${styles.arch} ${styles.archBottom}`} viewBox="0 0 1440 150" preserveAspectRatio="none" aria-hidden="true"><path d="M0 150V0Q720 200 1440 0V150Z" fill="#fff" /></svg>
    </section>
  );
}
