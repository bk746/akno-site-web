"use client";

import { useEffect, useId, useRef } from "react";

import { ContactForm } from "@/components/contact/contact-form";

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

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
          20 minutes pour clarifier ton besoin — réponse sous 24h, sans
          engagement.
        </p>

        <ContactForm variant="overlay" onSuccess={onClose} />
      </div>
    </div>
  );
}
