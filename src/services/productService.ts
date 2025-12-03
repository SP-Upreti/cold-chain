import { api } from "@/config/axios.config";
import { IGetAllProductsResponse } from "@/types/IProduct";
import { IProductBySlugResponse } from "@/types/IProductBySlug";

// Client-side function (requires reCAPTCHA token)
export async function getAllProducts({ page = 1, limit = 10, search = "", subcategory = "" }: { page?: number; limit?: number; search?: string; subcategory?: string; }): Promise<ProductApiResponse> {
    let url = `/product/get-all-products?page=${page}&limit=${limit}&search=${search}`;
    if (subcategory) {
        url += `&subcategory=${subcategory}`;
    }
    const res = await api.get<ProductApiResponse>(url);
    return res.data;
}

// Client-side function (with reCAPTCHA via interceptor)
export async function getProductBySlug(slug: string): Promise<IProductBySlugResponse> {
    const res = await api.get<IProductBySlugResponse>(`/product/get-product/${slug}`);
    return res?.data;
}

// Server-side function (direct fetch, no reCAPTCHA needed)
export async function getProductBySlugServer(slug: string): Promise<IProductBySlugResponse> {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

    const res = await fetch(`${API_BASE_URL}/product/get-product/${slug}`, {
        cache: 'no-store', // or 'force-cache' for static data
        headers: {
            'Content-Type': 'application/json',
        }
    });

    if (!res.ok) {
        throw new Error(`Failed to fetch product: ${res.statusText}`);
    }

    return res.json();
}

export interface IAllProduct {
    id: string;
    ispopular: boolean;
    coverimage: string | null;
    title: string;
    slug: string;
    price: string; // keeping as string because API sends string
    sortOrder: number;
    brandName: string;
    name?: string;
    brandId: string;
    model?: string;
    coverImage?: string
    brand: { id: string, name: string, slug: string }
    category?: { id: string, name: string, slug: string, title: string }
    subcategory?: { id: string, name: string, slug: string, title: string }
}

export interface ProductResponseData {
    products: IAllProduct[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export interface ProductApiResponse {
    status: number;
    data: ProductResponseData;
    cached: boolean;
}



export async function getAllProductsServer({
    page = 1,
    limit = 10,
    search = "",
    brand = "",
    brands = "",
    category = "",
    categories = "",
    subcategory = "",
    subcategories = "",
    technology = ""
}: {
    page?: number;
    limit?: number;
    search?: string;
    brand?: string;
    brands?: string;
    category?: string;
    categories?: string;
    subcategory?: string;
    subcategories?: string;
    technology?: string
}): Promise<ProductApiResponse> {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

    const params = new URLSearchParams({
        page: String(page),
        limit: String(limit),
        search
    });

    // Use brand param (prefer brand over brands for single selection)
    const brandParam = brand || brands;
    if (brandParam) params.set('brand', brandParam);
    if (category) params.set('category', category);
    if (categories) params.set('category', categories);
    if (subcategory) params.set('subcategory', subcategory);
    if (subcategories) params.set('subcategory', subcategories);
    if (technology) params.set('technology', technology);

    const res = await fetch(`${API_BASE_URL}/product/get-all-products?${params.toString()}`, {
        cache: 'no-store',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    if (!res.ok) {
        console.error('getAllProductsServer: Error fetching products:', res.statusText);
        throw new Error(`Failed to fetch products: ${res.statusText}`);
    }

    return res.json();
}


// Server-side function for wildcard search (no reCAPTCHA needed)
export async function searchProductsServer({
    page = 1,
    limit = 10,
    search = "",
    brand = "",
    brands = "",
    category = "",
    categories = "",
    subcategory = "",
    subcategories = ""
}: {
    page?: number;
    limit?: number;
    search?: string;
    brand?: string;
    brands?: string;
    category?: string;
    categories?: string;
    subcategory?: string;
    subcategories?: string;
}): Promise<ProductApiResponse> {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

    const params = new URLSearchParams({
        page: String(page),
        limit: String(limit),
        search
    });

    // Use brand param (prefer brand over brands for single selection)
    const brandParam = brand || brands;
    if (brandParam) params.set('brand', brandParam);
    if (category) params.set('category', category);
    if (categories) params.set('categories', categories);
    if (subcategory) params.set('subcategory', subcategory);
    if (subcategories) params.set('subcategories', subcategories);

    const res = await fetch(`${API_BASE_URL}/product/search-products?${params.toString()}`, {
        cache: 'no-store',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    if (!res.ok) {
        throw new Error(`Failed to fetch products: ${res.statusText}`);
    }

    return res.json();
}