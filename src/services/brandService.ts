import { api } from "@/config/axios.config";
import { IBrandResponse, IBrandDetailResponse } from "@/types/IBrand";

// Client-side function (requires reCAPTCHA token)
export async function fetchBrands(): Promise<IBrandResponse> {
    const res = await api.get('/brand/get-all-brands');
    return res.data;
}

// Server-side function (no reCAPTCHA needed)
export async function fetchBrandsServer(): Promise<IBrandResponse> {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

    const res = await fetch(`${API_BASE_URL}/brand/get-all-brands`, {
        next: { revalidate: 3600 }, // Cache for 1 hour
        headers: {
            'Content-Type': 'application/json',
        }
    });

    if (!res.ok) {
        console.error(`Failed to fetch brands: ${res.status} ${res.statusText}`);
        return {
            data: {
                brands: [],
                total: 0,
                page: 1,
                limit: 0,
                totalPages: 0
            },
            status: res.status,
            cached: false
        };
    }

    return res.json();
}

// Client-side function to fetch brand by slug
export async function fetchBrandBySlug(slug: string): Promise<IBrandDetailResponse> {
    const res = await api.get(`/brand/get-brand/${slug}`);
    return res.data;
}

// Server-side function to fetch brand by slug (no reCAPTCHA needed)
export async function fetchBrandBySlugServer(slug: string): Promise<IBrandDetailResponse> {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

    const res = await fetch(`${API_BASE_URL}/brand/get-brand/${slug}`, {
        next: { revalidate: 3600 }, // Cache for 1 hour
        headers: {
            'Content-Type': 'application/json',
        }
    });

    if (!res.ok) {
        throw new Error(`Failed to fetch brand: ${res.statusText}`);
    }

    return res.json();
}