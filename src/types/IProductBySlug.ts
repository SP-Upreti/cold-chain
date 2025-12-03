

export interface ISeoMeta {
  id: string;
  entityType: string;
  entityId: string;
  slug: string;
  title: string;
  description: string;
  keywords: string[];
  canonicalUrl: string;
  openGraph: OpenGraph;
  twitter: TwitterMeta;
  robots: RobotsMeta;
  alternates: AlternatesMeta;
  jsonLd: JsonLd;
  extraMeta: ExtraMeta;
  isIndexable: boolean;
  isOptimized: boolean;
  sitemapUrl: string;
  manifestUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface OpenGraph {
  title: string;
  description: string;
  type: string;
  url: string;
  siteName: string;
  locale: string;
  images: { url: string }[];
}

export interface TwitterMeta {
  card: string;
  title: string;
  description: string;
  images: string[];
}

export interface RobotsMeta {
  index: boolean;
  follow: boolean;
  maxSnippet: number;
  maxImagePreview: string;
  maxVideoPreview: number;
}

export interface AlternatesMeta {
  languages: Record<string, string>;
}

export interface JsonLd {
  "@context": string;
  "@type": string;
  name: string;
  description: string;
  image: string[];
  brand: {
    "@type": string;
    name: string;
  };
  sku: string;
  model: string;
  offers: {
    "@type": string;
    priceCurrency: string;
    price: string;
    availability: string;
    url: string;
  };
}

export interface ExtraMeta {
  themeColor: string;
  category: string;
}


export interface Product {
  id: string;
  createdAt: string;
  updatedAt: string;
  sortOrder: number;
  name: string;
  sku: string | null;
  coverImage: string;
  detailImage: string[];
  slug: string;
  productType: "PHYSICAL" | string;
  model: string;
  manualUrl: string | null;
  brochureUrl: string | null;
  price: string;
  yearlyPrice: string | null;
  mrp: string;
  shortDescription: string;
  description: string;
  technology: string;
  feature: string;
  metaTitle: string;
  metatag: string[] | null;
  metadescription: string;
  isPublished: boolean;
  isPopular: boolean;
  brand: Brand;
  subcategory: Subcategory;
  gallery: IGalleryItem[];
  videos: VideoItem[];
  downloadCategories: DownloadCategory[];
  downloads: IDownloads[];
  seoMetadata: ISeoMeta;
}

interface Brand {
  id: string;
  name: string;
  logoUrl: string;
}

interface Subcategory {
  id: string;
  title: string;
  slug: string;
}

export interface DownloadCategory {
  id: string;
  createdAt: string;
  updatedAt: string;
  sortOrder: number;
  kind: "SOFTWARE" | string;
  title: string;
  subtitle: string;
  iconKey: string;
  isActive: boolean;
  extra: {
    platforms: string[];
    updateChannel: string;
  };
  items: IDownloads[];
}

export interface IDownloads {
  id: string;
  createdAt: string;
  updatedAt: string;
  sortOrder: number;
  title: string;
  summary: string;
  version: string;
  releasedOn: string;
  sizeBytes: string;
  downloadUrl: string;
  mirrors: Mirror[] | null;
  platforms: string[];
  minOsVersion: string;
  fileType: string;
  sha256: string;
  deprecated: boolean;
  isActive: boolean;
  extra: {
    note: string;
    language: string[];
  };
}

interface Mirror {
  url: string;
  label: string;
}



export interface IProductBySlugResponse {
  status: number;
  product: Product;
  similarProducts: Product[];
}


export interface IProductDownload {
  id: string;
  createdAt: string;
  updatedAt: string;
  sortOrder: number;
  isDeleted: boolean;
  productModelNumber: string;
  youtubeVideoId: string;
  title: string;
}


export interface IGalleryItem {
  id: string;
  createdAt: string;
  updatedAt: string;
  sortOrder: number;
  isDeleted: boolean;
  caption: string;
  isHome: boolean;
  mediaAsset: MediaAsset[];
}

export interface MediaAsset {
  id: string;
  createdAt: string;
  updatedAt: string;
  sortOrder: number;
  isDeleted: boolean;
  fileUrl: string;
  type: "IMAGE" | "VIDEO" | string;
}

export interface VideoItem {
  id: string;
  createdAt: string;
  updatedAt: string;
  sortOrder: number;
  isDeleted: boolean;
  productModelNumber: string;
  youtubeVideoId: string;
  title: string;
}


export interface SimilarProduct {
  id: string;
  createdAt: string;
  updatedAt: string;
  sortOrder: number;
  isDeleted: boolean;
  name: string;
  sku: string | null;
  coverImage: string | null;
  detailImage: string | string[] | null;
  slug: string;
  model: string;
  manualUrl: string | null;
  brochureUrl: string | null;
  price: string;
  yearlyPrice: string | null;
  mrp: string | null;
  shortDescription: string;
  description: string;
  technology: string;
  feature: string;
  metaTitle: string;
  metatag: string[] | string | null;
  metadescription: string | null;
  isPublished: boolean;
  isPopular: boolean;
  brand: Brand;
  subcategory: Subcategory;
}
