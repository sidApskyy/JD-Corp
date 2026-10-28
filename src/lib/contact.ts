import { z } from "zod";

export const contactSchema = z.object({
  category: z.enum(["General enquiry", "Business opportunity", "Project enquiry", "Careers", "Media"]),
  name: z.string().trim().min(2, "Please enter your name.").max(100),
  email: z.email("Please enter a valid email address.").max(254),
  organization: z.string().trim().max(150).optional(),
  message: z.string().trim().min(10, "Please write at least 10 characters.").max(5000),
  website: z.string().max(0).optional(),
});

export type ContactData = z.infer<typeof contactSchema>;
