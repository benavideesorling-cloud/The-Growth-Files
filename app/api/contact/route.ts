import { NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validation/contact";
import { isRateLimited, looksAutomated } from "@/lib/server/rateLimit";
import { getResendClient, resendFromAddress } from "@/lib/server/resend";
import { contactDestinationEmail } from "@/lib/config/site";

const FALLBACK_ERROR = "Couldn't send your message right now. Please email me directly for now.";

/**
 * Sends the submission via Resend's email API. Returns success only once
 * Resend itself confirms the send was accepted (a real `id` back with no
 * `error`) — never faked. If RESEND_API_KEY isn't set, this returns a
 * genuine error rather than pretending to have sent anything.
 */
async function sendContactNotification(data: {
  name: string;
  email: string;
  company?: string;
  subject: string;
  message: string;
  opportunityType?: string;
}): Promise<{ ok: true } | { ok: false; error: string }> {
  const resend = getResendClient();
  if (!resend) {
    return { ok: false, error: "Email delivery isn't configured yet. Please email me directly for now." };
  }

  const bodyLines = [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    data.company ? `Company: ${data.company}` : null,
    data.opportunityType ? `Opportunity type: ${data.opportunityType}` : null,
    "",
    data.message,
  ].filter((line): line is string => line !== null);

  try {
    const { data: sent, error } = await resend.emails.send({
      from: resendFromAddress,
      to: contactDestinationEmail,
      replyTo: data.email,
      subject: `[Contact form] ${data.subject}`,
      text: bodyLines.join("\n"),
    });

    if (error || !sent?.id) {
      return { ok: false, error: FALLBACK_ERROR };
    }
    return { ok: true };
  } catch {
    return { ok: false, error: FALLBACK_ERROR };
  }
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
