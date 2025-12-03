import {z} from 'zod';

const ACCEPTED_FILE_TYPES = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

export const careerSchema = z.object({
    name: z.string().min(2, "Enter your full name"),
    email: z.string().email("Enter a valid email address"),
    phone: z.string().min(10, "Enter a valid phone number"),
    position: z.string().min(2, "Enter the position you are applying for"),
    resumeUrl: z.instanceof(File, { message: "Resume is required" })
      .refine((file) => file.size <= 5 * 1024 * 1024, "Resume must be less than 5MB")
      .refine((file) => ACCEPTED_FILE_TYPES.includes(file.type), "Only PDF, DOC, and DOCX files are allowed"),
    coverLetterUrl: z.instanceof(File)
      .refine((file) => file.size <= 5 * 1024 * 1024, "Cover letter file must be less than 5MB")
      .refine((file) => ACCEPTED_FILE_TYPES.includes(file.type), "Only PDF, DOC, and DOCX files are allowed")
      .optional().or(z.undefined()),
    careerId: z.string(),
  });

export type ICareerFormData = z.infer<typeof careerSchema>;