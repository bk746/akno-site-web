"use client";

import Image from "next/image";
import { useEffect, useId, useRef } from "react";

import { ContactForm } from "@/components/contact/contact-form";
import {
  AKNO_EMAIL,
  AKNO_PHONE_DISPLAY,
  AKNO_PHONE_HREF,
} from "@/lib/contact";
import logoAkno from "@/src/images/logo-akno-plus.png";

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

const FACTS = ["Appel de 20 min", "Réponse sous 24h", "Sans engagement"] as const;

type ContactOverlayProps = {
  onClose: () => void;
};

export function ContactOverlay({ onClose }: ContactOverlayProps) {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    const previous = document.activeElement as HTMLElement | null;
    const focusables = () =>
      Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (node) => !node.hasAttribute("disabled") && node.tabIndex !== -1,
      );

    const initial = focusables()[0] ?? panel;
    initial.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;

      const nodes = focusables();
      if (nodes.length === 0) {
        event.preventDefault();
        panel.focus();
        return;
      }

      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && (active === first || !panel.contains(active))) {
        event.preventDefault();
        last.focus();
        return;
      }

      if (!event.shiftKey && (active === last || !panel.contains(active))) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      previous?.focus?.();
    };
  }, []);

  return (
    <div className="contact-overlay" role="presentation">
      <button
        type="button"
        className="contact-overlay__backdrop"
        aria-label="Fermer"
        onClick={onClose}
      />

      <div
        ref={panelRef}
        className="contact-overlay__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
      >
        <aside className="contact-overlay__brand">
          <Image
            src={logoAkno}
            alt="AKNO"
            width={128}
            height={48}
            style={{ width: "auto" }}
            className="contact-overlay__logo"
          />
          <p className="contact-overlay__brand-line">
            Des sites qui ramènent des clients.
          </p>
          <div className="contact-overlay__brand-actions">
            <a
              className="contact-overlay__brand-btn contact-overlay__brand-btn--primary"
              href={AKNO_PHONE_HREF}
            >
              {AKNO_PHONE_DISPLAY}
            </a>
            <a
              className="contact-overlay__brand-btn contact-overlay__brand-btn--ghost"
              href={`mailto:${AKNO_EMAIL}`}
            >
              Écrire par e-mail
            </a>
          </div>
          <ul className="contact-overlay__facts">
            {FACTS.map((fact) => (
              <li key={fact}>{fact}</li>
            ))}
          </ul>
          <a className="contact-overlay__mail" href={`mailto:${AKNO_EMAIL}`}>
            {AKNO_EMAIL}
          </a>
        </aside>

        <div className="contact-overlay__main">
          <button
            type="button"
            className="contact-overlay__close"
            aria-label="Fermer le formulaire"
            onClick={onClose}
          >
            <span aria-hidden>×</span>
          </button>

          <p className="contact-overlay__eyebrow">Contact</p>
          <h2 id={titleId} className="contact-overlay__title">
            Parlons de ton projet
          </h2>
          <p className="contact-overlay__lead">
            20 minutes pour clarifier ton besoin. Un seul interlocuteur, du
            cadrage à la mise en ligne.
          </p>

          <ContactForm variant="overlay" onSuccess={onClose} />
        </div>
      </div>
    </div>
  );
}
