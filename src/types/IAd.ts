import { Product } from "./IProductBySlug";

export interface IAd {
    id: string;
    createdAt: string;
    updatedAt: string;
    sortOrder: number;
    title: string;
    description: string;
    bannerUrls: string[];
    targetUrl: string;
    isActive: boolean;
    startAt: string;
    endAt: string;
    impressions: string;
    clicks: string;
    brand: {
        id: string;
        name: string;
        slug: string;
        logoUrl: string;
    } | null;
    category: {
        id: string;
        title: string;
    };
    subcategory: {
        id: string;
        title: string
    };
    product: Product;
}

export interface IAdResponse {
    status: number;
    data: {
        ads: IAd[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
    message: string;
    cached: boolean;
}
