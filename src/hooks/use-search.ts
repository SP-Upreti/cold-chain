"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { searchProductsServer, IAllProduct } from "@/services/productService";

interface UseSearchOptions {
    debounceMs?: number;
    limit?: number;
    onSearchStart?: () => void;
    onSearchComplete?: () => void;
}

export function useSearch(options: UseSearchOptions = {}) {
    const {
        debounceMs = 300,
        limit = 5,
        onSearchStart,
        onSearchComplete,
    } = options;

    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState<IAllProduct[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const performSearch = useCallback(
        async (query: string) => {
            if (!query.trim()) {
                setSearchResults([]);
                setIsSearching(false);
                return;
            }

            setIsSearching(true);
            onSearchStart?.();

            try {
                const response = await searchProductsServer({
                    page: 1,
                    limit,
                    search: query.trim(),
                });

                setSearchResults(response.data?.products || []);
            } catch (error) {
                console.error("Search error:", error);
                setSearchResults([]);
            } finally {
                setIsSearching(false);
                onSearchComplete?.();
            }
        },
        [limit, onSearchStart, onSearchComplete]
    );

    const handleSearchChange = useCallback(
        (value: string) => {
            setSearchQuery(value);

            if (searchTimeoutRef.current) {
                clearTimeout(searchTimeoutRef.current);
            }

            if (value.trim()) {
                setIsSearching(true);
                searchTimeoutRef.current = setTimeout(() => {
                    performSearch(value);
                }, debounceMs);
            } else {
                setSearchResults([]);
                setIsSearching(false);
            }
        },
        [debounceMs, performSearch]
    );

    const navigateToResults = useCallback(
        (query?: string) => {
            const searchTerm = query || searchQuery.trim();
            if (searchTerm) {
                router.push(`/products?search=${encodeURIComponent(searchTerm)}`);
            }
        },
        [router, searchQuery]
    );

    const clearSearch = useCallback(() => {
        setSearchQuery("");
        setSearchResults([]);
        setIsSearching(false);
        if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
        }
    }, []);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (searchTimeoutRef.current) {
                clearTimeout(searchTimeoutRef.current);
            }
        };
    }, []);

    return {
        searchQuery,
        searchResults,
        isSearching,
        handleSearchChange,
        navigateToResults,
        clearSearch,
        setSearchQuery,
    };
}
