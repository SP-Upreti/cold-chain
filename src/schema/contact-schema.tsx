
import { z } from 'zod'
import { isValidPhoneNumber, CountryCode } from 'libphonenumber-js'

export enum ContactPurpose {
  CHANNEL_SALES = "Channel Sales",
  PROJECT_SALES = "Project Sales",
  ADMINISTRATION = "Administration",
  PROCUREMENT = "Procurement",
  CAREER = "Career",
}

export const contactSchema = z.object({
  fullname: z.string().min(2, "Please enter your full name"),
  email: z.string().email("Please enter a valid email address"),
  countryCode: z.string().min(2, "Please select a country code"),
  phoneNo: z.string().min(1, "Please enter a phone number").refine(
    (val) => /^[0-9\s\-\(\)]+$/.test(val),
    "Please enter a valid phone number with digits only"
  ),
  address: z.string().min(5, "Please enter a valid address"),
  message: z.string().min(20, "Message must be at least 20 characters"),
  purpose: z.nativeEnum(ContactPurpose, {
    message: "Please select a purpose",
  }),
}).refine(
  (data) => {
    try {
      return isValidPhoneNumber(data.phoneNo, data.countryCode as CountryCode);
    } catch {
      return false;
    }
  },
  {
    message: "Please enter a valid phone number for the selected country",
    path: ["phoneNo"],
  }
);

export type IFormData = z.infer<typeof contactSchema>;

// Type for API submission (without countryCode)
export type IContactSubmitData = Omit<IFormData, 'countryCode'>;