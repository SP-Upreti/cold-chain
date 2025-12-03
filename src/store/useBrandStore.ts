import { create } from 'zustand';
import { IBrand, IBrandResponse } from '@/types/IBrand';
import { fetchBrands } from '@/services/brandService';

interface BrandState {
  brands: IBrand[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  isLoading: boolean;
  error: string | null;
  fetchBrands: () => Promise<void>;
  setBrands: (brands: IBrand[]) => void;
  getBrandBySlug: (slug: string) => IBrand | undefined;
  clearError: () => void;
}

const STORAGE_KEY = 'brands_cache';

// Helper to load from sessionStorage
const loadFromSession = (): IBrand[] | null => {
  if (typeof window === 'undefined') return null;
  try {
    const cached = sessionStorage.getItem(STORAGE_KEY);
    return cached ? JSON.parse(cached) : null;
  } catch {
    return null;
  }
};

// Helper to save to sessionStorage
const saveToSession = (brands: IBrand[]) => {
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(brands));
  } catch (error) {
    console.error('Failed to cache brands:', error);
  }
};

export const useBrandStore = create<BrandState>((set, get) => ({
  brands: loadFromSession() || [],
  total: 0,
  page: 1,
  limit: 10,
  totalPages: 0,
  isLoading: false,
  error: null,

  setBrands: (brands: IBrand[]) => {
    set({ brands });
    saveToSession(brands);
  },

  fetchBrands: async () => {
    // Check session cache first
    const cached = loadFromSession();
    if (cached && cached.length > 0) {
      set({ brands: cached, isLoading: false });
      return;
    }

    set({ isLoading: true, error: null });
    try {
      const response: IBrandResponse = await fetchBrands();
      const brands = response.data.brands;
      set({
        brands,
        total: response.data.total,
        page: response.data.page,
        limit: response.data.limit,
        totalPages: response.data.totalPages,
        isLoading: false,
      });
      saveToSession(brands);
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to fetch brands',
        isLoading: false,
      });
    }
  },

  getBrandBySlug: (slug: string) => {
    return get().brands.find((brand) => brand.slug === slug);
  },

  clearError: () => set({ error: null }),
}));
