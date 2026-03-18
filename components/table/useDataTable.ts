"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { TableProps } from "./types";

export function useDataTable<T extends Record<string, any>>({
  columns,
  data,
  defaultPageSize = 10,
  totalItems = 0,
  rowIdKey = "id",
}: Omit<TableProps<T>, "bulkActions" | "isLoading">) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const queryPage = Math.max(1, Number(searchParams.get("page")) || 1);
  const queryLimit = Number(searchParams.get("limit")) || defaultPageSize;
  const querySearch = searchParams.get("q") || "";
  const querySort = searchParams.get("sort") || null;
  const querySortOrder = (searchParams.get("sort_order") as "Asc" | "Desc") || "Asc";

  const [searchInput, setSearchInput] = useState(querySearch);
  const [selectedRows, setSelectedRows] = useState<Map<string | number, T>>(new Map());
  const [visibleColumns, setVisibleColumns] = useState<Set<string>>(
    new Set(columns.map((c: any) => c.accessor as string))
  );

  const [showColumnDropdown, setShowColumnDropdown] = useState(false);
  const [showBulkDropdown, setShowBulkDropdown] = useState(false);

  const columnRef = useRef<HTMLDivElement>(null);
  const bulkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSearchInput(querySearch);
  }, [querySearch]);

  const updateUrl = (updates: Record<string, string | number | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === "") {
        params.delete(key);
      } else {
        params.set(key, String(value));
      }
    });
    router.push(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchInput !== querySearch) {
        updateUrl({ q: searchInput, page: 1 });
      }
    }, 500);
    return () => clearTimeout(handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput, querySearch]);

  const totalPages = Math.max(1, Math.ceil(totalItems / queryLimit));

  useEffect(() => {
    if (queryPage > totalPages && totalPages > 1) {
      updateUrl({ page: totalPages });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryPage, totalPages]);

  const toggleSort = (key: string) => {
    const isCurrentKey = querySort === key;
    if (!isCurrentKey) {
      updateUrl({ sort: key, sort_order: "Asc" });
    } else if (querySortOrder === "Asc") {
      updateUrl({ sort: key, sort_order: "Desc" });
    } else {
      updateUrl({ sort: null, sort_order: null });
    }
  };

  const getPageNumbers = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots: (number | string)[] = [];
    let l;
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= queryPage - delta && i <= queryPage + delta)) {
        range.push(i);
      }
    }
    for (const i of range) {
      if (l) {
        if (i - l === 2) rangeWithDots.push(l + 1);
        else if (i - l !== 1) rangeWithDots.push("...");
      }
      rangeWithDots.push(i);
      l = i;
    }
    return rangeWithDots;
  };

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (columnRef.current && !columnRef.current.contains(e.target as Node))
        setShowColumnDropdown(false);
      if (bulkRef.current && !bulkRef.current.contains(e.target as Node))
        setShowBulkDropdown(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedData = useMemo(() => Array.from(selectedRows.values()), [selectedRows]);

  return {
    queryPage,
    queryLimit,
    querySearch,
    querySort,
    querySortOrder,
    searchInput,
    setSearchInput,
    selectedRows,
    setSelectedRows,
    visibleColumns,
    setVisibleColumns,
    showColumnDropdown,
    setShowColumnDropdown,
    showBulkDropdown,
    setShowBulkDropdown,
    columnRef,
    bulkRef,
    updateUrl,
    totalPages,
    toggleSort,
    getPageNumbers,
    selectedData,
  };
}
