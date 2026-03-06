import { useState, useEffect, useCallback, useRef } from "react";
import { PaginationRequest, PaginationResponse } from "@/types";

interface ServiceSearchProps<T> {
    fetchFn: (params: PaginationRequest) => Promise<PaginationResponse<T>>;
    mapFn: (item: T) => { label: string; value: string; original: T };
}

export function useServiceSearch<T>({ fetchFn, mapFn }: ServiceSearchProps<T>) {
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [items, setItems] = useState<{ label: string; value: string; original: T }[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const fetchFnRef = useRef(fetchFn);
    const mapFnRef = useRef(mapFn);

    useEffect(() => {
        fetchFnRef.current = fetchFn;
        mapFnRef.current = mapFn;
    }, [fetchFn, mapFn]);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(search);
        }, 500);
        return () => clearTimeout(handler);
    }, [search]);

    // Handle initial load and search - this effect replaces the items state
    useEffect(() => {
        let active = true;

        const performSearch = async () => {
            setIsLoading(true);
            // Clear items immediately to provide visual feedback that a new search has started
            setItems([]);

            try {
                const response = await fetchFnRef.current({
                    page: 1,
                    limit: 10,
                    search: debouncedSearch,
                });

                if (active) {
                    const newItems = response.data.map(mapFnRef.current);
                    setItems(newItems);
                    setHasMore(response.current_page < response.total_pages);
                    setPage(2);
                }
            } catch (error) {
                if (active) console.error("Failed to fetch data:", error);
            } finally {
                if (active) setIsLoading(false);
            }
        };

        performSearch();

        return () => {
            active = false;
        };
    }, [debouncedSearch]);

    const onLoadMore = useCallback(async () => {
        if (isLoading || !hasMore) return;
        setIsLoading(true);

        try {
            const response = await fetchFnRef.current({
                page: page,
                limit: 10,
                search: debouncedSearch,
            });

            const newItems = response.data.map(mapFnRef.current);
            setItems((prev) => [...prev, ...newItems]);
            setHasMore(response.current_page < response.total_pages);
            setPage((p) => p + 1);
        } catch (error) {
            console.error("Failed to load more:", error);
        } finally {
            setIsLoading(false);
        }
    }, [debouncedSearch, page, hasMore, isLoading]);

    return {
        items,
        search,
        setSearch,
        hasMore,
        isLoading,
        onLoadMore,
    };
}
