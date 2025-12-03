import { api } from "@/config/axios.config";
import { IFAQResponse } from "@/types/IFAQ";

// Client-side function (can be used in client components)
export async function fetchFAQs(page: number = 1, limit: number = 10): Promise<IFAQResponse> {
  const res = await api.get('/faq/get-all-faq', {
    params: { page, limit }
  });
  return res.data;
}

// Server-side function (for server components and API routes)
export async function fetchFAQsServer(page: number = 1, limit: number = 10): Promise<IFAQResponse> {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  
  if (!API_BASE_URL) {
    throw new Error("API_BASE_URL is not configured");
  }

  const url = new URL("/faq/get-all-faq", API_BASE_URL);
  url.searchParams.set("page", page.toString());
  url.searchParams.set("limit", limit.toString());

  const res = await fetch(url.toString(), {
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
    }
  });
  
  if (!res.ok) {
    throw new Error(`Failed to fetch FAQs: ${res.statusText}`);
  }
  
  return res.json();
}
