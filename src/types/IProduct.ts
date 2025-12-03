export interface IApiResponseMeta {
  total?: number;
  page?: number;
  pageSize?: number;
}

export interface IApiError {
  message: string;
  code?: string | number;
  details?: object;
}

export interface IGetAllProductsQuery {
  page?: number;
  search?: string;
}
export interface IVideo {
    id: string;
    createdAt: string;
    updatedAt: string;
    sortOrder: number;
    isDeleted: boolean;
    productModelNumber: string;
    youtubeVideoId: string;
    title: string;
  }



export interface IGetAllProductsResponse {
  status: number;
  data: ProductsResponse;
  cached: boolean;
}




export interface ProductsResponse {
  products: IProduct[];
  meta: IApiResponseMeta;
}




export interface ISubcategory {
  id: string;
  title: string;
  slug: string;
}



export interface IProductVideo {
  // Flexible placeholder structure
  url?: string;
}



export interface IDownload {
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
  mirrors: { url: string; label: string }[] | null;
  platforms: string[];
  minOsVersion: string;
  fileType: string;
  sha256: string;
  deprecated: boolean;
  isActive: boolean;
  extra: {
    note?: string;
    language?: string[];
  };
}

export interface IProduct {
  id: string;
  createdAt: string;
  updatedAt: string;
  sortOrder: number;
  isDeleted: boolean;
  name: string;
  sku: string | null;
  coverImage: string | null;
  detailImage: string | string[] | null;

  productType: string;

  slug: string;
  model: string;
  manualUrl: string | null;
  brochureUrl: string | null;

  price: string | number;
  yearlyPrice: string | number | null;
  mrp: string | number | null;

  shortDescription: string;
  description: string;

  technology: string;
  feature: string | Record<string, unknown>; // can be string | object depending on API
  metaTitle: string | null;
  metatag: string[] | string | null;
  metadescription: string | null;

  isPublished: boolean;
  isPopular: boolean;

  brand: IBrand;
  subcategory: ISubcategory;

  gallery: IProductGallery[];
  videos: IProductVideo[];
  downloadCategories: IDownloadCategory[];
  downloads: IDownload[];

  seoMetadata: Record<string, unknown> | null;
}



export interface IGetProductBySlug {
  id: string;
  createdAt: string;
  updatedAt: string;
  sortOrder: number;
  isDeleted: boolean;
  name: string;
  sku: string | null;
  coverImage: string | null;
  detailImage: string | null;
  slug: string;
  model: string;
  manualUrl: string | null;
  brochureUrl: string | null;
  price: string | null;
  yearlyPrice: string | null;
  mrp: string | null;
  shortDescription: string | null;
  description: string | null;
  technology: string | null;
  feature: string | null;
  metaTitle: string | null;
  metatag: string | null;
  metadescription: string | null;
  isPublished: boolean;
  isPopular: boolean;
  brand: IBrand;
  subcategory: ISubCategory;
  gallery: IProductGallery[];
  videos: IProductVideo[];
  downloadCategories: IDownloadCategory[];
  downloads: IDownloadItem[];
  seoMetadata: Record<string, unknown> | null;
}

export interface IBrand {
  id: string;
  name: string;
  logoUrl: string;
}

export interface ISubCategory {
  id: string;
  title: string;
  slug: string;
}

export interface IProductGallery {
  id: string;
  createdAt: string;
  updatedAt: string;
  sortOrder: number;
  isDeleted: boolean;
  caption: string;
  isHome: boolean;
  mediaAsset: IMediaAsset[];
}

export interface IMediaAsset {
  id: string;
  createdAt: string;
  updatedAt: string;
  sortOrder: number;
  isDeleted: boolean;
  fileUrl: string;
  type: "IMAGE" | "VIDEO" | string;
}

export interface IProductVideo {
  id: string;
  createdAt: string;
  updatedAt: string;
  sortOrder: number;
  isDeleted: boolean;
  productModelNumber: string;
  youtubeVideoId: string;
  title: string;
}

export interface IDownloadCategory {
  id: string;
  createdAt: string;
  updatedAt: string;
  sortOrder: number;
  isDeleted: boolean;
  kind: string;
  title: string;
  subtitle: string;
  iconKey: string;
  isActive: boolean;
  extra: Record<string, unknown>;
  items: IDownloadItem[];
}

export interface IDownloadItem {
  id?: string;
  // If later items have fields, add here
}


export interface IProductBySlugResponse {
  status: number;
  product: IProduct;
  similarProducts: IProduct[];
}
