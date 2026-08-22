/**
 * Minimal in-memory sliding-window rate limiter, shared by the contact and
 * newsletter API routes. Reasonable for a low-traffic personal site, but a
 * real limitation worth knowing: this state lives in a single serverless
 * function instance's memory, so it does NOT share state across concurrent
 * instances or survive a cold start. A production deployment expecting
 * meaningful traffic should replace this with a persistent store (e.g.
 * Upstash Redis, Vercel KV) — flagged here rather than silently shipped as
 * if it were bulletproof.
 */
const hits = new Map<string, number[]>();

export function isRateLimited(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const timestamps = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  timestamps.push(now);
  hits.set(key, timestamps);
  return timestamps.length > limit;
}

/** Lightweight bot signal: real people rarely submit a form in under ~2s. */
export function looksAutomated(elapsedMs: number | undefined, minMs = 1500): boolean {
  return typeof elapsedMs === "number" && elapsedMs < minMs;
}
