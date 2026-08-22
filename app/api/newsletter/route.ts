import { NextResponse } from "next/server";
import { newsletterFormSchema } from "@/lib/validation/newsletter";
import { isRateLimited, looksAutomated } from "@/lib/server/rateLimit";
import { getResendClient, resendAudienceId } from "@/lib/server/resend";

const NOT_CONFIGURED_ERROR = "Subscriptions aren't connected yet — check back soon.";
const GENERIC_ERROR = "Couldn't complete your subscription right now. Please try again shortly.";

/**
 * Adds the contact to the configured Resend Audience (segment). Resend's
 * current contacts API has no documented "already exists" error code
 * (confirmed against their API reference — see the Phase 5 follow-up
 * report), so rather than guess at the exact error shape, a create failure
 * falls back to an update-by-email (re-activating a previously unsubscribed
 * address) plus a best-effort segment-add. Both paths — brand new
 * subscriber or already-subscribed — resolve to a real success; only a
 * failure on both create AND update is reported as an error.
 */
async function subscribeToNewsletter(email: string): Promise<{ ok: true } | { ok: false; error: string }> {
  const resend = getResendClient();
  if (!resend || !resendAudienceId) {
    return { ok: false, error: NOT_CONFIGURED_ERROR };
  }

  try {
    const created = await resend.contacts.create({
      email,
      unsubscribed: false,
      segments: [{ id: resendAudienceId }],
    });
    if (!created.error) {
      return { ok: true };
    }

    // Most likely cause: a contact with this email already exists.
    // Re-activate it (in case it was previously unsubscribed) rather than
    // surfacing an error for what the user experiences as "I'm already on
    // the list."
    const updated = await resend.contacts.update({ email, unsubscribed: false });
    if (updated.error) {
      return { ok: false, error: GENERIC_ERROR };
    }

    try {
      await resend.contacts.segments.add({ email, segmentId: resendAudienceId });
    } catch {
      // Best-effort — likely already a member of this segment.
    }
    return { ok: true };
  } catch {
    return { ok: false, error: GENERIC_ERROR };
  }
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isRateLimited(`newsletter:${ip}`, 5, 10 * 60 * 1000)) {
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

  const parsed = newsletterFormSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: parsed.error.issues[0]?.message ?? "Enter a valid email address." },
      { status: 400 },
    );
  }

  const { email, website, elapsedMs } = parsed.data;
  if (website || looksAutomated(elapsedMs)) {
    return NextResponse.json({ ok: true });
  }

  const result = await subscribeToNewsletter(email);
  if (!result.ok) {
    return NextResponse.json({ ok: false, error: result.error }, { status: 503 });
  }

  return NextResponse.json({ ok: true });
}
