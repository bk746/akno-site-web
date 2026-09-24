import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ContactPayload = {
  name?: string;
  email?: string;
  projectType?: string;
  budget?: string;
  message?: string;
  /** Honeypot — doit rester vide */
  companyWebsite?: string;
};

function sanitize(value: unknown, maxLen: number): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLen);
}

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const rate = checkRateLimit(`contact:${ip}`, { windowMs: 60_000, max: 5 });

  if (!rate.ok) {
    return Response.json(
      { ok: false, error: "rate_limited" },
      {
        status: 429,
        headers: {
          "Retry-After": String(rate.retryAfterSeconds),
        },
      },
    );
  }

  let body: ContactPayload;

  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    return Response.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const honeypot = sanitize(body.companyWebsite, 200);
  if (honeypot.length > 0) {
    return Response.json({ ok: true });
  }

  const name = sanitize(body.name, 120);
  const email = sanitize(body.email, 254);
  const projectType = sanitize(body.projectType, 120);
  const budget = sanitize(body.budget, 80);
  const message = sanitize(body.message, 2000);

  if (name.length < 2) {
    return Response.json({ ok: false, error: "invalid_name" }, { status: 400 });
  }

  if (!EMAIL_RE.test(email)) {
    return Response.json({ ok: false, error: "invalid_email" }, { status: 400 });
  }

  if (projectType.length < 2) {
    return Response.json(
      { ok: false, error: "invalid_subject" },
      { status: 400 },
    );
  }

  if (message.length < 8) {
    return Response.json(
      { ok: false, error: "invalid_message" },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL ?? "hello@akno.fr";
  const from =
    process.env.CONTACT_FROM_EMAIL ?? "AKNO Contact <onboarding@resend.dev>";

  if (!apiKey) {
    return Response.json(
      { ok: false, useMailto: true },
      { status: 422 },
    );
  }

  const text = [
    `Nom : ${name}`,
    `Email : ${email}`,
    `Objet : ${projectType || "—"}`,
    `Budget : ${budget || "—"}`,
    "",
    message,
  ].join("\n");

  let resendResponse: Response;

  try {
    resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `[AKNO] Contact — ${name}`,
        text,
      }),
    });
  } catch {
    return Response.json({ ok: false, useMailto: true }, { status: 502 });
  }

  if (!resendResponse.ok) {
    return Response.json(
      { ok: false, useMailto: true },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}
