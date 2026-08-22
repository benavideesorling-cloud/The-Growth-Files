import { Resend } from "resend";

let client: Resend | null = null;

/**
 * Server-only. Never import this module from a client component — RESEND_API_KEY
 * only exists in the server runtime; Next.js never inlines a non-NEXT_PUBLIC_
 * env var into the client bundle, so referencing it there just yields undefined
 * rather than leaking the key, but keeping this file server-only avoids that
 * confusion entirely.
 */
export function getResendClient(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  if (!client) client = new Resend(apiKey);
  return client;
}

export const resendFromAddress = process.env.RESEND_FROM_EMAIL || "The Growth Files <onboarding@resend.dev>";
export const resendAudienceId = process.env.RESEND_AUDIENCE_ID;
