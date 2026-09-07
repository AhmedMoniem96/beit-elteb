import { z } from "zod";
export const appointmentSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.email(),
  phone: z.string().trim().min(7).max(30),
  serviceId: z.string().optional().transform((v) => v || undefined),
  specialtyId: z.string().min(1),
  doctorId: z.string().min(1),
  preferredAt: z.coerce
    .date()
    .refine((d) => (d > Date.now() ? true : false), "Choose a future date"),
  message: z.string().max(1000).optional(),
  locale: z.enum(["en", "ar"]).default("en"),
});
export const contactSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.email(),
  phone: z.string().max(30).optional(),
  subject: z.string().trim().min(2).max(150),
  message: z.string().trim().min(10).max(2000),
  locale: z.enum(["en", "ar"]).default("en"),
});
