export enum EntityType {
  PRODUCT = "PRODUCT",
  BLOG = "BLOG",
  CATEGORY = "CATEGORY",
  SUBCATEGORY = "SUBCATEGORY",
  BRAND = "BRAND",
}

export interface IOpenGraph {
  title: string;
  description: string;
  type: string;
  url: string;
  siteName: string;
  images: string[];
  locale: string;
}

export interface ITwitter {
  card: string;
  title: string;
  description: string;
  images: string[];
}

export interface IRobots {
  index: boolean;
  follow: boolean;
  maxSnippet: number;
  maxImagePreview: string;
  maxVideoPreview: number;
}

export interface IAlternates {
  languages: Record<string, string>;
}

export interface IJsonLd {
  "@context": string;
  "@type": string;
  [key: string]: unknown;
}

export interface IExtraMeta {
  themeColor?: string;
  category?: string;
  [key: string]: unknown;
}

export interface ISeoMetadata {
  id: string;
  slug: string;
  title: string;
  description: string;
  keywords: string[];
  canonicalUrl: string;
  openGraph: IOpenGraph;
  twitter: ITwitter;
  robots: IRobots;
  alternates: IAlternates;
  jsonLd: IJsonLd;
  extraMeta: IExtraMeta;
  isIndexable: boolean;
  isOptimized: boolean;
  openGraphImages: string[];
  twitterImages: string[];
  sitemap: string | null;
  manifest: string | null;
  entityType: EntityType;
  entityId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ISeoMetadataResponse {
  status: number;
  data: ISeoMetadata[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface ISeoMetadataDetailResponse {
  status: number;
  data: ISeoMetadata;
}
