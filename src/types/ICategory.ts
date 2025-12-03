import { ISubCategory } from "./IProduct";

export interface ICategory {
  id: string;
  createdAt: string;
  sortOrder: number;
  title: string;
  slug: string;
  coverImage: string;
  brand: {
    id: string;
    name: string;
    logoUrl: string;
  };
    seoMetadata: null;
    subCategories: ISubCategory[];
}

export interface CategoryResponseData {
  categories: ICategory[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface CategoryApiResponse {
  status: number;
  data: CategoryResponseData;
  cached: boolean;
}
