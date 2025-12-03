import { z } from "zod";
import { EntityType } from "@/types/ISeoMetadata";

export const seoMetadataSchema = z.object({
  slug: z.string().min(1, "Slug is required"),
  title: z.string().min(1, "Title is required").max(60, "Title should be under 60 characters"),
  description: z.string().min(1, "Description is required").max(160, "Description should be under 160 characters"),
  keywords: z.array(z.string()).min(1, "At least one keyword is required"),
  canonicalUrl: z.string().url("Must be a valid URL"),
  
  openGraph: z.object({
    title: z.string().min(1, "OG title is required"),
    description: z.string().min(1, "OG description is required"),
    type: z.string().default("website"),
    url: z.string().url("Must be a valid URL"),
    siteName: z.string().min(1, "Site name is required"),
    images: z.array(z.string()).default([]),
    locale: z.string().default("en_US"),
  }),
  
  twitter: z.object({
    card: z.string().default("summary_large_image"),
    title: z.string().min(1, "Twitter title is required"),
    description: z.string().min(1, "Twitter description is required"),
    images: z.array(z.string()).default([]),
  }),
  
  robots: z.object({
    index: z.boolean().default(true),
    follow: z.boolean().default(true),
    maxSnippet: z.number().default(-1),
    maxImagePreview: z.string().default("large"),
    maxVideoPreview: z.number().default(-1),
  }),
  
  alternates: z.object({
    languages: z.record(z.string(), z.string()).default({}),
  }),
  
  jsonLd: z.record(z.string(), z.unknown()).default({}),
  
  extraMeta: z.record(z.string(), z.unknown()).default({}),
  
  isIndexable: z.boolean().default(true),
  isOptimized: z.boolean().default(false),
  
  openGraphImages: z.array(z.instanceof(File)).optional(),
  twitterImages: z.array(z.instanceof(File)).optional(),
  sitemap: z.instanceof(File).optional(),
  manifest: z.instanceof(File).optional(),
  
  entityType: z.nativeEnum(EntityType),
  entityId: z.string().min(1, "Entity ID is required"),
});

export type ISeoMetadataFormData = z.infer<typeof seoMetadataSchema>;
