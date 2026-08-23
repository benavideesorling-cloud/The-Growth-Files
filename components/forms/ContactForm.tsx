"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { sendGTMEvent } from "@next/third-parties/google";
import { contactFormSchema, opportunityTypes, type ContactFormErrors } from "@/lib/validation/contact";

type Status = "idle" | "submitting" | "success" | "error";

const inputClass =
  "w-full box-border rounded-md border border-navy/15 bg-white px-3.5 py-[13px] text-sm text-navy placeholder:text-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-green";
const errorInputClass = "border-red-500 focus-visible:outline-red-500";

export function ContactForm() {
  const router = useRouter();
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [opportunityType, setOpportunityType] = useState<string | null>(null);
  const mountedAt = useRef<number | null>(null);
  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormError(null);

    const formData = new FormData(e.currentTarget);
    const values = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      company: String(formData.get("company") ?? ""),
      subject: String(formData.get("subject") ?? ""),
      message: String(formData.get("message") ?? ""),
      opportunityType: opportunityType ?? "",
      website: String(formData.get("website") ?? ""),
      elapsedMs: mountedAt.current ? Date.now() - mountedAt.current : undefined,
    };

    const parsed = contactFormSchema.safeParse(values);
    if (!parsed.success) {
      const fieldErrors: ContactFormErrors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0];
        if (typeof key === "string" && !(key in fieldErrors)) {
          fieldErrors[key as keyof ContactFormErrors] = issue.message;
        }
      }
      setErrors(fieldErrors);
      return;
    }
    setErrors({});

    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setStatus("error");
        setFormError(data.error ?? "Something went wrong. Please try again or email me directly.");
        return;
      }
      setStatus("success");
      // Fires once, only here — after the API has confirmed the message
      // was actually sent, never on click/attempt/error. No form field
      // values are included, just the event name itself.
      if (typeof window !== "undefined") {
        sendGTMEvent({ event: "contact_form_submit" });
      }
      router.push("/thank-you/contact");
    } catch {
      setStatus("error");
      setFormError("Couldn't reach the server. Please check your connection and try again.");
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* Honeypot — hidden from real users, real bots tend to fill every field. */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="mb-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-xs font-bold tracking-[0.04em] text-navy">
            YOUR NAME
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Your full name"
            autoComplete="name"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={`${inputClass} ${errors.name ? errorInputClass : ""}`}
          />
          {errors.name ? (
            <p id="name-error" className="mt-1.5 text-xs text-red-600">
              {errors.name}
            </p>
          ) : null}
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block text-xs font-bold tracking-[0.04em] text-navy">
            EMAIL
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="you@company.com"
            autoComplete="email"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={`${inputClass} ${errors.email ? errorInputClass : ""}`}
          />
          {errors.email ? (
            <p id="email-error" className="mt-1.5 text-xs text-red-600">
              {errors.email}
            </p>
          ) : null}
        </div>
      </div>

      <div className="mb-5">
        <label htmlFor="company" className="mb-2 block text-xs font-bold tracking-[0.04em] text-navy">
          COMPANY (OPTIONAL)
        </label>
        <input
          id="company"
          name="company"
          type="text"
          placeholder="Company or organisation"
          autoComplete="organization"
          className={inputClass}
        />
      </div>

      <div className="mb-5">
        <label htmlFor="subject" className="mb-2 block text-xs font-bold tracking-[0.04em] text-navy">
          SUBJECT
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          placeholder="What would you like to discuss?"
          aria-invalid={!!errors.subject}
          aria-describedby={errors.subject ? "subject-error" : undefined}
          className={`${inputClass} ${errors.subject ? errorInputClass : ""}`}
        />
        {errors.subject ? (
          <p id="subject-error" className="mt-1.5 text-xs text-red-600">
            {errors.subject}
          </p>
        ) : null}
      </div>

      <div className="mb-6">
        <label htmlFor="message" className="mb-2 block text-xs font-bold tracking-[0.04em] text-navy">
          MESSAGE
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder="Tell me about the project, role or challenge"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={`${inputClass} resize-y ${errors.message ? errorInputClass : ""}`}
        />
        {errors.message ? (
          <p id="message-error" className="mt-1.5 text-xs text-red-600">
            {errors.message}
          </p>
        ) : null}
      </div>

      <div className="mb-7">
        <div className="mb-2.5 text-xs font-bold tracking-[0.04em] text-navy">WHAT BEST DESCRIBES THIS?</div>
        <div className="flex flex-wrap gap-2.5">
          {opportunityTypes.map((opt) => (
            <button
              key={opt.key}
              type="button"
              onClick={() => setOpportunityType(opt.key)}
              aria-pressed={opportunityType === opt.key}
              className={`cursor-pointer rounded-md border px-[18px] py-[11px] text-[13px] font-semibold transition-transform duration-150 ease-out hover:-translate-y-0.5 ${
                opportunityType === opt.key ? "border-green bg-green text-navy" : "border-navy/15 bg-white text-navy"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {formError ? (
        <p role="alert" className="mb-4 text-sm font-semibold text-red-600">
          {formError}
        </p>
      ) : null}

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={status === "submitting" || status === "success"}
          className="cursor-pointer rounded-md bg-green px-[26px] py-[13px] text-sm font-bold text-navy transition-transform duration-200 ease-out hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "submitting" || status === "success" ? "Sending…" : "Send a message"}
        </button>
        <div className="text-[13px] text-muted">No pitch deck required. A clear description is enough.</div>
      </div>
    </form>
  );
}
