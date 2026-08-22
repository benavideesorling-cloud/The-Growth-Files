import { z } from "zod";

export const opportunityTypes = [
  { key: "freelance", label: "Freelance project" },
  { key: "consulting", label: "Consulting" },
  { key: "fulltime", label: "Full-time role" },
  { key: "other", label: "Something else" },
] as const;

const opportunityKeys = opportunityTypes.map((o) => o.key) as [string, ...string[]];

// Required: Name, Email, Subject, Message. Optional: Company, opportunity
// type — matches the production brief's contact form field spec exactly.
export const contactFormSchema = z.object({
  name: z.string().trim().min(1, "Enter your name").max(200),
  email: z.string().trim().min(1, "Enter your email").email("Enter a valid email address").max(320),
  company: z.string().trim().max(200).optional().or(z.literal("")),
  subject: z.string().trim().min(1, "Enter a subject").max(200),
  message: z.string().trim().min(1, "Enter a message").max(5000),
  opportunityType: z.enum(opportunityKeys).optional().or(z.literal("")),
  // Honeypot: real users never see or fill this field (hidden via CSS).
  website: z.string().max(0, "Spam check failed").optional().or(z.literal("")),
  // Client-measured seconds between page load and submit — used server-side
  // as a lightweight bot signal (real people rarely submit in under ~2s).
  elapsedMs: z.number().nonnegative().optional(),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
export type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>;
