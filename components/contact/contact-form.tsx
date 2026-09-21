"use client";

import { FormEvent, useEffect, useId, useState } from "react";

import { ArrowUpRight } from "@/components/icons/arrow-up-right";

const PROJECT_TYPES = [
  "Site vitrine",
  "Refonte",
  "UI/UX",
  "SEO / perf",
  "Je ne sais pas encore",
] as const;

const BUDGET_OPTIONS = [
  { value: "", label: "Budget (optionnel)" },
  { value: "moins-5k", label: "Moins de 5 000 €" },
  { value: "5-10k", label: "5 000 – 10 000 €" },
  { value: "10-20k", label: "10 000 – 20 000 €" },
  { value: "20k-plus", label: "Plus de 20 000 €" },
  { value: "discuter", label: "Je préfère en parler" },
] as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CONTACT_EMAIL = "hello@akno.fr";

type FormState = "idle" | "submitting" | "success" | "error";

type ContactFormProps = {
  variant?: "default" | "overlay";
  onSuccess?: () => void;
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
      `Type de projet : ${payload.projectType}`,
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
}: ContactFormProps) {
  const fieldId = useId();
  const [state, setState] = useState<FormState>("idle");
  const [errorHint, setErrorHint] = useState<string | null>(null);
  const isOverlay = variant === "overlay";

  useEffect(() => {
    if (state !== "success" || !onSuccess) return;
    const timer = window.setTimeout(onSuccess, 1400);
    return () => window.clearTimeout(timer);
  }, [state, onSuccess]);

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

    if (name.length < 2) {
      setErrorHint("Indique ton nom.");
      setState("error");
      return;
    }

    if (!EMAIL_RE.test(email)) {
      setErrorHint("Email invalide.");
      setState("error");
      return;
    }

    if (message.length < 8) {
      setErrorHint("Quelques mots sur ton projet suffisent.");
      setState("error");
      return;
    }

    setErrorHint(null);
    setState("submitting");

    const payload = { name, email, projectType, budget, message };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

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

      setErrorHint("Envoi impossible. Réessaie ou écris à hello@akno.fr.");
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
      className={`contact-form${isOverlay ? " contact-form--overlay" : ""}`}
      onSubmit={handleSubmit}
      noValidate
    >
      <div className="contact-form__field">
        <label className="contact-form__label" htmlFor={`${fieldId}-name`}>
          Nom
        </label>
        <input
          id={`${fieldId}-name`}
          name="name"
          type="text"
          autoComplete="name"
          required
          minLength={2}
          className="contact-form__input"
          placeholder="Ton prénom et nom"
          disabled={state === "submitting"}
        />
      </div>

      <div className="contact-form__field">
        <label className="contact-form__label" htmlFor={`${fieldId}-email`}>
          Email
        </label>
        <input
          id={`${fieldId}-email`}
          name="email"
          type="email"
          autoComplete="email"
          required
          className="contact-form__input"
          placeholder="hello@entreprise.fr"
          disabled={state === "submitting"}
        />
      </div>

      <div className="contact-form__field">
        <label className="contact-form__label" htmlFor={`${fieldId}-type`}>
          Type de projet
        </label>
        <select
          id={`${fieldId}-type`}
          name="projectType"
          className="contact-form__input contact-form__select"
          defaultValue=""
          disabled={state === "submitting"}
        >
          <option value="" disabled>
            Choisir…
          </option>
          {PROJECT_TYPES.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
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
          required
          minLength={8}
          rows={isOverlay ? 3 : 4}
          className="contact-form__input contact-form__textarea"
          placeholder="Où en es-tu ? Quel objectif ?"
          disabled={state === "submitting"}
        />
      </div>

      {errorHint ? (
        <p className="contact-form__error" role="alert">
          {errorHint}
        </p>
      ) : null}

      <button
        type="submit"
        className="contact-form__submit btn btn-primary"
        disabled={state === "submitting"}
      >
        {state === "submitting" ? "Envoi…" : submitLabel}
        <ArrowUpRight className="contact-form__submit-icon" aria-hidden />
      </button>

      {!isOverlay ? (
        <p className="contact-form__micro">Je te réponds sous 24h</p>
      ) : null}
    </form>
  );
}
