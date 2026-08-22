import { NextResponse } from "next/server";
import { newsletterFormSchema } from "@/lib/validation/newsletter";
import { isRateLimited, looksAutomated } from "@/lib/server/rateLimit";

/**
 * No newsletter provider is configured yet — see the Phase 5 report for
 * options (Resend Audiences, Buttondown, etc.). Gated behind
 * NEWSLETTER_PROVIDER_KEY so nothing is silently chosen. Once a provider is
 * picked and that env var is set, replace this function's body with the
 * provider's subscribe call.
 */
async function subscribeToNewsletter(email: string): Promise<{ ok: true } | { ok: false; error: string }> {
  if (!process.env.NEWSLETTER_PROVIDER_KEY) {
    return { ok: false, error: "Subscriptions aren't connected yet — check back soon." };
  }
  void email;
  return { ok: false, error: "Subscriptions aren't connected yet — check back soon." };
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
