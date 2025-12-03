import { api } from "@/config/axios.config";
import { CategoryApiResponse } from "@/types/ICategory";

// Client-side function
export async function getAllCategories({ 
  page = 1, 
  limit = 10 
}: { 
  page?: number; 
  limit?: number; 
}): Promise<CategoryApiResponse> {
  const url = `/category/get-all-categories?page=${page}&limit=${limit}`;
  const res = await api.get<CategoryApiResponse>(url);
  return res.data;
}

// Server-side function (direct fetch, no reCAPTCHA needed)
export async function getAllCategoriesServer({ 
  page = 1, 
  limit = 10 
}: { 
  page?: number; 
  limit?: number; 
}): Promise<CategoryApiResponse> {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  
  const res = await fetch(`${API_BASE_URL}/category/get-all-categories?page=${page}&limit=${limit}`, {
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
    }
  });
  
  if (!res.ok) {
    console.error('getAllCategoriesServer: Error fetching categories:', res.statusText);
    throw new Error(`Failed to fetch categories: ${res.statusText}`);
  }
  
  return res.json();
}
