import { z } from "zod";

export const newsletterFormSchema = z.object({
  email: z.string().trim().min(1, "Enter your email").email("Enter a valid email address").max(320),
  website: z.string().max(0, "Spam check failed").optional().or(z.literal("")),
  elapsedMs: z.number().nonnegative().optional(),
});

export type NewsletterFormValues = z.infer<typeof newsletterFormSchema>;
