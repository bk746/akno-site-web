"use client";

import {
  type FocusEvent,
  FormEvent,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import Link from "next/link";

import { ArrowUpRight } from "@/components/icons/arrow-up-right";
import { CONTACT_EMAIL } from "@/lib/site-config";

const BUDGET_OPTIONS = [
  { value: "", label: "Budget (optionnel)" },
  { value: "moins-5k", label: "Moins de 5 000 €" },
  { value: "5-10k", label: "5 000 – 10 000 €" },
  { value: "10-20k", label: "10 000 – 20 000 €" },
  { value: "20k-plus", label: "Plus de 20 000 €" },
  { value: "discuter", label: "Je préfère en parler" },
] as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FormState = "idle" | "submitting" | "success" | "error";

type FieldKey = "name" | "email" | "projectType" | "message";

type FieldErrors = Partial<Record<FieldKey, string>>;

type ContactFormProps = {
  variant?: "default" | "overlay";
  onSuccess?: () => void;
  id?: string;
  mobileSheet?: boolean;
  onFormStateChange?: (state: FormState) => void;
};

function buildMailto(payload: {
  name: string;
  email: string;
  projectType: string;
  budget: string;
  message: string;
}) {
  const subject = encodeURIComponent(`Contact AKNO — ${payload.name}`);
  const body = encodeURIComponent(
    [
      `Nom : ${payload.name}`,
      `Email : ${payload.email}`,
      `Objet : ${payload.projectType}`,
      `Budget : ${payload.budget || "—"}`,
      "",
      payload.message,
    ].join("\n"),
  );
  return `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
}

export function ContactForm({
  variant = "default",
  onSuccess,
  id,
  mobileSheet = false,
  onFormStateChange,
}: ContactFormProps) {
  const fieldId = useId();
  const [state, setState] = useState<FormState>("idle");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const isOverlay = variant === "overlay";
  const focusScrollTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    onFormStateChange?.(state);
  }, [state, onFormStateChange]);

  useEffect(() => {
    if (state !== "success" || !onSuccess) return;
    const timer = window.setTimeout(onSuccess, 1400);
    return () => window.clearTimeout(timer);
  }, [state, onSuccess]);

  useEffect(() => {
    return () => {
      if (focusScrollTimer.current) clearTimeout(focusScrollTimer.current);
    };
  }, []);

  function handleFieldFocus(event: FocusEvent<HTMLElement>) {
    if (!mobileSheet) return;
    if (focusScrollTimer.current) clearTimeout(focusScrollTimer.current);
    focusScrollTimer.current = setTimeout(() => {
      event.target.scrollIntoView({
        block: "center",
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
      });
    }, 300);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === "submitting" || state === "success") return;

    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const projectType = String(data.get("projectType") ?? "").trim();
    const budget = String(data.get("budget") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const companyWebsite = String(data.get("companyWebsite") ?? "").trim();

    if (companyWebsite.length > 0) {
      setState("success");
      form.reset();
      return;
    }

    const nextErrors: FieldErrors = {};

    if (name.length < 2) {
      nextErrors.name = "Indique ton nom.";
    }

    if (!EMAIL_RE.test(email)) {
      nextErrors.email = "Email invalide.";
    }

    if (projectType.length < 2) {
      nextErrors.projectType = "Indique l'objet de ton message.";
    }

    if (message.length < 8) {
      nextErrors.message = "Quelques mots sur ton projet suffisent.";
    }

    if (Object.keys(nextErrors).length > 0) {
      setFieldErrors(nextErrors);
      setSubmitError(null);
      setState("error");
      return;
    }

    setFieldErrors({});
    setSubmitError(null);
    setState("submitting");

    const payload = { name, email, projectType, budget, message };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, companyWebsite: "" }),
      });

      if (response.status === 429) {
        setSubmitError("Trop de tentatives. Réessaie dans une minute.");
        setState("error");
        return;
      }

      if (response.ok) {
        setState("success");
        form.reset();
        return;
      }

      const json = (await response.json().catch(() => null)) as {
        useMailto?: boolean;
      } | null;

      if (json?.useMailto) {
        window.location.href = buildMailto(payload);
        setState("success");
        form.reset();
        return;
      }

      setSubmitError(`Envoi impossible. Réessaie ou écris à ${CONTACT_EMAIL}.`);
      setState("error");
    } catch {
      window.location.href = buildMailto(payload);
      setState("success");
      form.reset();
    }
  }

  if (state === "success") {
    return (
      <div className="contact-form-success" aria-live="polite">
        <p className="contact-form-success__title">Message envoyé.</p>
        <p className="contact-form-success__text">À très vite.</p>
      </div>
    );
  }

  const submitLabel = isOverlay ? "Envoyer" : "Envoyer ma demande";

  return (
    <form
      id={id}
      className={`contact-form${isOverlay ? " contact-form--overlay" : ""}${
        mobileSheet ? " contact-form--overlay-mobile" : ""
      }`}
      onSubmit={handleSubmit}
      noValidate
    >
      <div className="contact-form__honeypot" aria-hidden="true">
        <label htmlFor={`${fieldId}-website`}>Site web</label>
        <input
          id={`${fieldId}-website`}
          name="companyWebsite"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="contact-form__field">
        <label className="contact-form__label" htmlFor={`${fieldId}-name`}>
          Nom
        </label>
        <input
          id={`${fieldId}-name`}
          name="name"
          type="text"
          autoComplete="name"
          enterKeyHint="next"
          required
          minLength={2}
          className="contact-form__input"
          placeholder="Ton prénom et nom"
          disabled={state === "submitting"}
          aria-invalid={fieldErrors.name ? true : undefined}
          aria-describedby={fieldErrors.name ? `${fieldId}-name-error` : undefined}
          onFocus={handleFieldFocus}
        />
        {fieldErrors.name ? (
          <p
            id={`${fieldId}-name-error`}
            className="contact-form__field-error"
          >
            {fieldErrors.name}
          </p>
        ) : null}
      </div>

      <div className="contact-form__field">
        <label className="contact-form__label" htmlFor={`${fieldId}-email`}>
          Email
        </label>
        <input
          id={`${fieldId}-email`}
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          autoCapitalize="off"
          enterKeyHint="next"
          required
          className="contact-form__input"
          placeholder="hello@entreprise.fr"
          disabled={state === "submitting"}
          aria-invalid={fieldErrors.email ? true : undefined}
          aria-describedby={
            fieldErrors.email ? `${fieldId}-email-error` : undefined
          }
          onFocus={handleFieldFocus}
        />
        {fieldErrors.email ? (
          <p
            id={`${fieldId}-email-error`}
            className="contact-form__field-error"
          >
            {fieldErrors.email}
          </p>
        ) : null}
      </div>

      <div className="contact-form__field">
        <label className="contact-form__label" htmlFor={`${fieldId}-subject`}>
          Objet
        </label>
        <input
          id={`${fieldId}-subject`}
          name="projectType"
          type="text"
          enterKeyHint="next"
          required
          minLength={2}
          maxLength={120}
          className="contact-form__input"
          placeholder="Ex. Refonte de mon site vitrine"
          disabled={state === "submitting"}
          aria-invalid={fieldErrors.projectType ? true : undefined}
          aria-describedby={
            fieldErrors.projectType ? `${fieldId}-subject-error` : undefined
          }
          onFocus={handleFieldFocus}
        />
        {fieldErrors.projectType ? (
          <p
            id={`${fieldId}-subject-error`}
            className="contact-form__field-error"
          >
            {fieldErrors.projectType}
          </p>
        ) : null}
      </div>

      {!isOverlay ? (
        <div className="contact-form__field">
          <label className="contact-form__label" htmlFor={`${fieldId}-budget`}>
            Budget approximatif
          </label>
          <select
            id={`${fieldId}-budget`}
            name="budget"
            className="contact-form__input contact-form__select"
            defaultValue=""
            disabled={state === "submitting"}
          >
            {BUDGET_OPTIONS.map((option) => (
              <option key={option.value || "empty"} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      ) : null}

      <div className="contact-form__field">
        <label className="contact-form__label" htmlFor={`${fieldId}-message`}>
          Message
        </label>
        <textarea
          id={`${fieldId}-message`}
          name="message"
          enterKeyHint="send"
          required
          minLength={8}
          rows={isOverlay ? 3 : 4}
          className="contact-form__input contact-form__textarea"
          placeholder="Où en es-tu ? Quel objectif ?"
          disabled={state === "submitting"}
          aria-invalid={fieldErrors.message ? true : undefined}
          aria-describedby={
            fieldErrors.message ? `${fieldId}-message-error` : undefined
          }
          onFocus={handleFieldFocus}
        />
        {fieldErrors.message ? (
          <p
            id={`${fieldId}-message-error`}
            className="contact-form__field-error"
          >
            {fieldErrors.message}
          </p>
        ) : null}
      </div>

      {submitError ? (
        <p className="contact-form__error">{submitError}</p>
      ) : null}

      <button
        type="submit"
        className={`contact-form__submit btn btn-primary${
          mobileSheet ? " contact-form__submit--in-form-hidden" : ""
        }`}
        disabled={state === "submitting"}
      >
        {state === "submitting" ? "Envoi…" : submitLabel}
        <ArrowUpRight className="contact-form__submit-icon" aria-hidden />
      </button>

      {!isOverlay ? (
        <p className="contact-form__micro">Je te réponds sous 24h</p>
      ) : null}

      <p className="contact-form__legal">
        Vos données sont utilisées uniquement pour répondre à votre demande.
        En savoir plus :{" "}
        <Link href="/confidentialite" className="contact-form__legal-link">
          Politique de confidentialité
        </Link>
        .
      </p>
    </form>
  );
}
