import Image from "next/image";
import Link from "next/link";

import { ContactCta } from "@/components/contact/contact-cta";
import { ArrowUpRight } from "@/components/icons/arrow-up-right";
import logoAkno from "@/src/images/logo-akno-plus.png";
import { SOCIAL_PROFILES } from "@/lib/site-config";

const MENU_LINKS = [
  { label: "Accueil", href: "/" },
  { label: "Services", href: "/#services" },
  { label: "Réalisations", href: "/#realisations" },
  { label: "Processus", href: "/#processus" },
  { label: "À propos", href: "/#a-propos" },
  { label: "FAQ", href: "/#faq" },
] as const;

const SERVICE_LINKS = [
  { label: "Site web", href: "/#services" },
  { label: "UI / UX Design", href: "/#services" },
  { label: "SEO Performance", href: "/#services" },
  { label: "Refonte", href: "/#services" },
] as const;

const LEGAL_LINKS = [
  { label: "Mentions légales", href: "/mentions-legales" },
  { label: "Confidentialité", href: "/confidentialite" },
] as const;

function SocialIconLinkedIn() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 9v11M4 5v.01M8 20v-7a2 2 0 0 1 4 0v7M8 9v11"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SocialIconInstagram() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect
        x="4"
        y="4"
        width="16"
        height="16"
        rx="4"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17" cy="7" r="1" fill="currentColor" />
    </svg>
  );
}

export function FooterSection() {
  return (
    <footer className="site-footer" data-akno-surface="dark" aria-labelledby="footer-brand">
      <div className="site-footer__inner" data-akno-reveal="fade">
        <div className="site-footer__grid">
          <div className="site-footer__brand">
            <Link href="/" className="site-footer__logo" id="footer-brand">
              <Image
                src={logoAkno}
                alt="AKNO"
                width={108}
                height={28}
                style={{ width: "auto" }}
                className="h-7 w-auto brightness-0 invert"
              />
            </Link>
            <p className="site-footer__tagline">
              Des sites qui ramènent des clients.
            </p>
            <p className="site-footer__founder">Fondé par Keryan Bouzerda</p>
          </div>

          <nav className="site-footer__col" aria-label="Menu">
            <p className="site-footer__col-title">Menu</p>
            <ul className="site-footer__links">
              {MENU_LINKS.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="site-footer__link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="site-footer__col" aria-label="Services">
            <p className="site-footer__col-title">Services</p>
            <ul className="site-footer__links">
              {SERVICE_LINKS.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="site-footer__link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="site-footer__col">
            <p className="site-footer__col-title">Contact</p>
            <ul className="site-footer__links">
              <li>
                <a href="mailto:hello@akno.fr" className="site-footer__link">
                  hello@akno.fr
                </a>
              </li>
              <li>
                <ContactCta className="site-footer__link-cta group">
                  Réserver un appel
                  <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </ContactCta>
              </li>
            </ul>
            {SOCIAL_PROFILES.length > 0 ? (
              <div className="site-footer__social">
                {SOCIAL_PROFILES.map((profile) => (
                  <a
                    key={profile.id}
                    href={profile.href}
                    className="site-footer__social-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={profile.label}
                  >
                    {profile.id === "linkedin" ? (
                      <SocialIconLinkedIn />
                    ) : (
                      <SocialIconInstagram />
                    )}
                  </a>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        <div className="site-footer__bottom">
          <p className="site-footer__copyright">
            © 2026 AKNO. Tous droits réservés.
          </p>
          <nav className="site-footer__legal" aria-label="Informations légales">
            {LEGAL_LINKS.map((link, index) => (
              <span key={link.label} className="site-footer__legal-item">
                {index > 0 ? (
                  <span className="site-footer__legal-dot" aria-hidden>
                    ·
                  </span>
                ) : null}
                <Link href={link.href} className="site-footer__legal-link">
                  {link.label}
                </Link>
              </span>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
