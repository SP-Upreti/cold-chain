import { IAllProduct } from "@/services/productService";

export interface IBrandResponse {
  status: number;
  data: BrandData;
  cached: boolean;
}

export interface BrandData {
  brands: IBrand[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface IBrand {
  id: string;
  name: string;
  slug: string;
  logoUrl: string;
  certificate: string | null;
  indoorImage: string | null;
  outdoorImage: string | null;
  youtubeId: string | null;
  themeColor: string | null;
  description: string | null;
  usp: string | null;
  isAuthorizedDistributor: boolean;
  bannerUrls: string[];
  categories: IBrandCategory[];
  popularProducts: IAllProduct[];
  subCategories: ISubCategory[];
  seoMetadata: ISeoMetadata | null;
  createdAt?: string;
  updatedAt?: string;
  sortOrder?: number;
  isDeleted?: boolean;
}

export interface IBrandDetailResponse {
  status: number;
  brand: IBrand;
}

export interface IBrandCategory {
  id: string;
  title: string;
  slug: string;
  coverImage: string | null;
  subCategories: ISubCategory[];
}

export interface ISubCategory {
  id: string;
  title: string;
  slug: string;
  coverImage: string | null;
}

export interface IPopularProduct {
  id: string;
  createdAt: string;
  sortOrder: number;
  name: string;
  coverImage: string;
  slug: string;
  model: string;
  price: string;
  isPopular: boolean;
  feature: string;
  category: { id: string, title: string }
  subcategory: { id: string, title: string }
}

export interface ISeoMetadata {
  title?: string;
  description?: string;
  keywords?: string[];
}
