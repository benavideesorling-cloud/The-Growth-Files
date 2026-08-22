import { NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validation/contact";
import { isRateLimited, looksAutomated } from "@/lib/server/rateLimit";

/**
 * No email provider is configured yet (see .env.example /
 * CONTACT_FORM_PROVIDER_KEY, deliberately left unset per the production
 * brief: "do not silently select an external email/form provider"). Every
 * other part of this endpoint — parsing, server-side validation, honeypot
 * and timing bot checks, rate limiting — is real and fully wired. Once a
 * provider is chosen and CONTACT_FORM_PROVIDER_KEY is set, replace this
 * function's body with that provider's send call; nothing else in the
 * route needs to change.
 */
async function sendContactNotification(data: {
  name: string;
  email: string;
  company?: string;
  subject: string;
  message: string;
  opportunityType?: string;
}): Promise<{ ok: true } | { ok: false; error: string }> {
  if (!process.env.CONTACT_FORM_PROVIDER_KEY) {
    return { ok: false, error: "Email delivery isn't configured yet. Please email me directly for now." };
  }
  // Provider integration goes here once CONTACT_FORM_PROVIDER_KEY is set.
  void data;
  return { ok: false, error: "Email delivery isn't configured yet. Please email me directly for now." };
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isRateLimited(`contact:${ip}`, 5, 10 * 60 * 1000)) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please try again in a few minutes." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const parsed = contactFormSchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (typeof key === "string" && !(key in fieldErrors)) fieldErrors[key] = issue.message;
    }
    return NextResponse.json({ ok: false, error: "Please fix the highlighted fields.", fieldErrors }, { status: 400 });
  }

  const { website, elapsedMs, ...values } = parsed.data;
  if (website || looksAutomated(elapsedMs)) {
    // Bots get a fake-success response so they don't learn the honeypot
    // worked, but no notification is ever sent for these submissions.
    return NextResponse.json({ ok: true });
  }

  const result = await sendContactNotification(values);
  if (!result.ok) {
    return NextResponse.json({ ok: false, error: result.error }, { status: 503 });
  }

  return NextResponse.json({ ok: true });
}
