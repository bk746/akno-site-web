"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";

import { ContactForm } from "@/components/contact/contact-form";
import { CloseIcon } from "@/components/icons/close";
import { MailIcon } from "@/components/icons/mail";
import { PhoneIcon } from "@/components/icons/phone";
import {
  AKNO_EMAIL,
  AKNO_PHONE_DISPLAY,
  AKNO_PHONE_HREF,
} from "@/lib/contact";
import logoAkno from "@/src/images/logo-akno-plus.png";

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

const MOBILE_MQ = "(max-width: 767px)";

const FACTS = ["Appel de 20 min", "Réponse sous 24h", "Sans engagement"] as const;

type ContactOverlayProps = {
  onClose: () => void;
};

type FormState = "idle" | "submitting" | "success" | "error";

export function ContactOverlay({ onClose }: ContactOverlayProps) {
  const titleId = useId();
  const formId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [isMobileSheet, setIsMobileSheet] = useState(false);
  const [formState, setFormState] = useState<FormState>("idle");

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_MQ);
    const sync = () => setIsMobileSheet(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    const focusables = () =>
      Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (node) => !node.hasAttribute("disabled") && node.tabIndex !== -1,
      );

    const desktopClose = panel.querySelector<HTMLElement>(
      ".contact-overlay__close--desktop",
    );
    const initial =
      (window.matchMedia(MOBILE_MQ).matches
        ? closeRef.current
        : desktopClose) ??
      focusables()[0] ??
      panel;
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
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    const scrollEl = scrollRef.current;
    if (!scrollEl || !isMobileSheet) return;

    const onScroll = () => {
      setHeaderScrolled(scrollEl.scrollTop > 0);
    };

    onScroll();
    scrollEl.addEventListener("scroll", onScroll, { passive: true });
    return () => scrollEl.removeEventListener("scroll", onScroll);
  }, [isMobileSheet]);

  useEffect(() => {
    if (!isMobileSheet) return;

    const footer = footerRef.current;
    const scrollEl = scrollRef.current;
    const viewport = window.visualViewport;
    if (!footer || !viewport) return;

    const updateKeyboardInset = () => {
      const inset = Math.max(
        0,
        window.innerHeight - viewport.height - viewport.offsetTop,
      );
      footer.style.paddingBottom = `calc(12px + env(safe-area-inset-bottom) + ${inset}px)`;
      if (scrollEl) {
        scrollEl.style.paddingBottom = `${inset}px`;
      }
    };

    updateKeyboardInset();
    viewport.addEventListener("resize", updateKeyboardInset);
    viewport.addEventListener("scroll", updateKeyboardInset);
    return () => {
      viewport.removeEventListener("resize", updateKeyboardInset);
      viewport.removeEventListener("scroll", updateKeyboardInset);
      footer.style.paddingBottom = "";
      if (scrollEl) scrollEl.style.paddingBottom = "";
    };
  }, [isMobileSheet]);

  const showFooterSubmit =
    isMobileSheet && formState !== "success";

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
        <header
          className={`contact-overlay__header${
            headerScrolled ? " contact-overlay__header--scrolled" : ""
          }`}
        >
          <Image
            src={logoAkno}
            alt="AKNO"
            width={128}
            height={48}
            style={{ width: "auto" }}
            className="contact-overlay__header-logo"
          />
          <button
            ref={closeRef}
            type="button"
            className="contact-overlay__close contact-overlay__close--mobile"
            aria-label="Fermer le formulaire"
            onClick={onClose}
          >
            <CloseIcon />
          </button>
        </header>

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

        <div className="contact-overlay__body">
          <button
            type="button"
            className="contact-overlay__close contact-overlay__close--desktop"
            aria-label="Fermer le formulaire"
            onClick={onClose}
          >
            <span aria-hidden>×</span>
          </button>

          <div ref={scrollRef} className="contact-overlay__scroll">
            <div className="contact-overlay__intro">
              <p className="contact-overlay__eyebrow">Contact</p>
              <h2 id={titleId} className="contact-overlay__title">
                Parlons de ton projet
              </h2>
              <p className="contact-overlay__lead">
                20 minutes pour clarifier ton besoin. Un seul interlocuteur, du
                cadrage à la mise en ligne.
              </p>
            </div>

            <div className="contact-overlay__quick-actions">
              <a
                className="contact-overlay__action contact-overlay__action--call"
                href={AKNO_PHONE_HREF}
              >
                <PhoneIcon />
                <span>Appeler</span>
              </a>
              <a
                className="contact-overlay__action contact-overlay__action--mail"
                href={`mailto:${AKNO_EMAIL}`}
              >
                <MailIcon />
                <span>E-mail</span>
              </a>
            </div>

            <p className="contact-overlay__reassurance">
              {FACTS.join(" · ")}
            </p>

            <p className="contact-overlay__separator">ou écris-nous</p>

            <ContactForm
              id={formId}
              variant="overlay"
              mobileSheet={isMobileSheet}
              onSuccess={onClose}
              onFormStateChange={setFormState}
            />
          </div>

          {showFooterSubmit ? (
            <footer ref={footerRef} className="contact-overlay__footer">
              <button
                type="submit"
                form={formId}
                className="contact-overlay__footer-submit"
                disabled={formState === "submitting"}
              >
                {formState === "submitting" ? "Envoi…" : "Envoyer"}
              </button>
            </footer>
          ) : null}
        </div>
      </div>
    </div>
  );
}
