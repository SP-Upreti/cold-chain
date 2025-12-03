import { z } from "zod";

export const inquirySchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(100, "Name is too long"),

  email: z
    .string()
    .trim()
    .email("Invalid email address"),

  phone: z
    .string()
    .trim()
    .regex(/^\+?[1-9]\d{1,14}$/, "Phone must be in E.164 format, e.g. +9779812345678"),

  address: z
    .string()
    .trim()
    .min(1, "Address is required")
    .max(300, "Address is too long"),

  productId: z
    .string()
    .uuid("productId must be a valid UUID"),

  brandId: z
    .string()
    .uuid("brandId must be a valid UUID"),

  // keep message optional; if missing it becomes empty string after transform
  message: z
    .string()
    .max(1000, "Message is too long")
    .optional()
    .transform((v) => v ?? ""),
});

// Type you can use in your handlers
export type InquiryPayload = z.infer<typeof inquirySchema>;
