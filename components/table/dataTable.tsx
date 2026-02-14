"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

type Primitive = string | number | boolean | bigint | symbol | null | undefined | Date;

type DeepKeys<T> = T extends Primitive
  ? never
  : {
      [K in keyof T & string]:
        T[K] extends Primitive
          ? K
          : K | `${K}.${DeepKeys<T[K]>}`;
    }[keyof T & string];

interface Column<T, P extends DeepKeys<T> = DeepKeys<T>> {
  header: string;
  accessor: P;
  sortable?: boolean;
  render?: (value: any, row: T) => React.ReactNode;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  bulkActions?: {
    label: string;
    onClick: (selected: T[]) => void;
  }[];
  defaultPageSize?: number;
  isLoading?: boolean;
  totalItems?: number; // If provided, enables remote pagination/sorting/filtering
}

function getValue(obj: any, path: string) {
  return path.split(".").reduce((acc, key) => acc?.[key], obj);
}

export function DataTable<T extends Record<string, any>>({
  columns,
  data,
  bulkActions = [],
  defaultPageSize = 10,
  isLoading = false,
  totalItems,
}: TableProps<T>) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // URL State Management
  const queryPage = Math.max(1, Number(searchParams.get("page")) || 1);
  const queryLimit = Number(searchParams.get("limit")) || defaultPageSize;
  const querySearch = searchParams.get("q") || "";
  const querySort = searchParams.get("sort") || null;
  const queryDir = (searchParams.get("dir") as "asc" | "desc") || "asc";

  // Local state for the input field (to keep typing smooth)
  const [searchInput, setSearchInput] = useState(querySearch);
  
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [visibleColumns, setVisibleColumns] = useState<Set<string>>(
    new Set(columns.map((c) => c.accessor))
  );

  const [showColumnDropdown, setShowColumnDropdown] = useState(false);
  const [showBulkDropdown, setShowBulkDropdown] = useState(false);
  const columnRef = useRef<HTMLDivElement>(null);
  const bulkRef = useRef<HTMLDivElement>(null);

  // Sync search input with URL param
  useEffect(() => {
    setSearchInput(querySearch);
  }, [querySearch]);

  // Reset selection when data, page or limit changes
  useEffect(() => {
    setSelectedRows(new Set());
  }, [data, queryPage, queryLimit, querySearch, querySort, queryDir]);

  /* ----------------------- */
  /* URL & Debounce Logic    */
  /* ----------------------- */
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

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchInput !== querySearch) {
        updateUrl({ q: searchInput, page: 1 });
      }
    }, 500);
    return () => clearTimeout(handler);
  }, [searchInput, querySearch]);

  /* ----------------------- */
  /* Data Processing         */
  /* ----------------------- */
  const isRemote = totalItems !== undefined;

  const processedData = useMemo(() => {
    if (isRemote) return data; // Data is already processed on server

    let filtered = [...data];

    if (querySearch) {
      filtered = filtered.filter((row) =>
        columns.some((col) =>
          String(getValue(row, col.accessor) ?? "")
            .toLowerCase()
            .includes(querySearch.toLowerCase())
        )
      );
    }

    if (querySort) {
      filtered.sort((a, b) => {
        const aVal = getValue(a, querySort);
        const bVal = getValue(b, querySort);
        if (aVal == null) return 1;
        if (bVal == null) return -1;
        if (aVal < bVal) return queryDir === "asc" ? -1 : 1;
        if (aVal > bVal) return queryDir === "asc" ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [data, querySearch, querySort, queryDir, columns, isRemote]);

  const totalRecords = isRemote ? totalItems : processedData.length;
  const totalPages = Math.max(1, Math.ceil(totalRecords / queryLimit));
  
  // Ensure queryPage is within bounds
  useEffect(() => {
    if (queryPage > totalPages && totalPages > 1) {
      updateUrl({ page: totalPages });
    }
  }, [queryPage, totalPages]);

  const paginatedData = isRemote ? data : processedData.slice(
    (queryPage - 1) * queryLimit,
    queryPage * queryLimit
  );

  const toggleSort = (key: string) => {
    const isCurrentKey = querySort === key;
    if (!isCurrentKey) {
      updateUrl({ sort: key, dir: "asc" });
    } else if (queryDir === "asc") {
      updateUrl({ sort: key, dir: "desc" });
    } else {
      updateUrl({ sort: null, dir: null });
    }
  };

  /* ----------------------- */
  /* Pagination Helpers      */
  /* ----------------------- */
  const getPageNumbers = () => {
    const delta = 2; // Number of pages to show around current page
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
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push("...");
        }
      }
      rangeWithDots.push(i);
      l = i;
    }

    return rangeWithDots;
  };

  /* ----------------------- */
  /* Dropdown Helpers        */
  /* ----------------------- */
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (columnRef.current && !columnRef.current.contains(e.target as Node)) setShowColumnDropdown(false);
      if (bulkRef.current && !bulkRef.current.contains(e.target as Node)) setShowBulkDropdown(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedData = useMemo(() => 
    Array.from(selectedRows).map((i) => paginatedData[i]).filter(Boolean),
    [selectedRows, paginatedData]
  );

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden font-sans relative">
      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] z-30 flex items-center justify-center transition-all">
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-sm font-medium text-blue-600">Loading data...</span>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-6 py-4 bg-gray-50 border-b border-gray-200">
        <div>
          {selectedRows.size > 0 && bulkActions.length > 0 && (
            <div className="relative" ref={bulkRef}>
              <button
                onClick={() => setShowBulkDropdown(!showBulkDropdown)}
                className="h-9 px-4 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 whitespace-nowrap flex items-center gap-2"
              >
                <span>Bulk Actions ({selectedRows.size})</span>
                <svg className={`w-4 h-4 transition-transform ${showBulkDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="19 9l-7 7-7-7" />
                </svg>
              </button>
              {showBulkDropdown && (
                <div className="absolute left-0 mt-2 w-44 bg-white border border-gray-200 rounded-md shadow-lg z-20 overflow-hidden">
                  {bulkActions.map((action, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        action.onClick(selectedData);
                        setShowBulkDropdown(false);
                        setSelectedRows(new Set());
                      }}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors"
                    >
                      {action.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search..."
              className="h-9 pl-9 pr-3 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none w-full transition-all"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <svg className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <div className="relative" ref={columnRef}>
            <button
              onClick={() => setShowColumnDropdown(!showColumnDropdown)}
              className="h-9 px-4 text-sm border border-gray-300 rounded-md bg-white hover:bg-gray-100 flex items-center gap-2 transition-colors"
            >
              <span>Columns</span>
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </button>
            {showColumnDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-20 p-2">
                <div className="text-xs font-semibold text-gray-400 px-2 py-1 mb-1 uppercase tracking-wider">Visible Columns</div>
                {columns.map((col) => (
                  <label key={col.accessor} className="flex items-center gap-2 text-sm py-1.5 px-2 hover:bg-gray-50 cursor-pointer rounded transition-colors text-gray-700">
                    <input
                      type="checkbox"
                      className="rounded text-blue-600 focus:ring-blue-500"
                      checked={visibleColumns.has(col.accessor)}
                      onChange={() => {
                        const newSet = new Set(visibleColumns);
                        newSet.has(col.accessor) ? newSet.delete(col.accessor) : newSet.add(col.accessor);
                        setVisibleColumns(newSet);
                      }}
                    />
                    {col.header}
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left border-collapse">
          <thead className="bg-gray-50 border-b border-gray-200 text-xs uppercase text-gray-500 font-bold">
            <tr>
              <th className="px-4 py-3 w-10 text-center">
                <input
                  type="checkbox"
                  className="rounded text-blue-600 focus:ring-blue-500"
                  onChange={() => setSelectedRows(selectedRows.size === paginatedData.length ? new Set() : new Set(paginatedData.map((_, i) => i)))}
                  checked={selectedRows.size === paginatedData.length && paginatedData.length > 0}
                />
              </th>
              {columns.map((col) => visibleColumns.has(col.accessor) && (
                <th
                  key={col.accessor}
                  onClick={() => col.sortable && toggleSort(col.accessor)}
                  className={`px-6 py-3 tracking-wider ${col.sortable ? "cursor-pointer hover:bg-gray-100 select-none group" : ""}`}
                >
                  <div className="flex items-center gap-1">
                    {col.header}
                    {col.sortable && (
                      <span className={`inline-flex transition-opacity ${querySort === col.accessor ? "opacity-100 text-blue-600" : "opacity-0 group-hover:opacity-50"}`}>
                        {querySort === col.accessor ? (
                          queryDir === "desc" ? (
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 112 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                          ) : (
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
                          )
                        ) : (
                          <div className="flex flex-col opacity-20">
                            <svg className="w-2.5 h-2.5 -mb-1" fill="currentColor" viewBox="0 0 20 20"><path d="M10 3l-7 7h14l-7-7z" /></svg>
                            <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 17l7-7H3l7 7z" /></svg>
                          </div>
                        )}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {paginatedData.length > 0 ? (
              paginatedData.map((row, rowIndex) => (
                <tr key={rowIndex} className={`group hover:bg-blue-50/40 transition-colors ${selectedRows.has(rowIndex) ? 'bg-blue-50/60' : ''}`}>
                  <td className="px-4 py-3 text-center">
                    <input
                      type="checkbox"
                      className="rounded text-blue-600 focus:ring-blue-500"
                      checked={selectedRows.has(rowIndex)}
                      onChange={() => {
                        const newSet = new Set(selectedRows);
                        newSet.has(rowIndex) ? newSet.delete(rowIndex) : newSet.add(rowIndex);
                        setSelectedRows(newSet);
                      }}
                    />
                  </td>
                  {columns.map((col) => visibleColumns.has(col.accessor) && (
                    <td key={col.accessor} className="px-6 py-3 text-gray-600 group-hover:text-gray-900 transition-colors">
                      {col.render ? col.render(getValue(row, col.accessor), row) : String(getValue(row, col.accessor) ?? "-")}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length + 1} className="px-6 py-12 text-center text-gray-400">
                  <div className="flex flex-col items-center gap-2">
                    <svg className="w-10 h-10 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>No records found.</span>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Footer / Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-4 bg-gray-50 border-t border-gray-200 gap-4">
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-2 bg-white border border-gray-300 rounded-md px-2 py-1 shadow-sm">
            <span className="text-gray-500">Show</span>
            <select
              value={queryLimit}
              onChange={(e) => updateUrl({ limit: e.target.value, page: 1 })}
              className="bg-transparent outline-none font-medium text-gray-900"
            >
              {[10, 20, 50, 100].map(size => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
            <span className="text-gray-500">entries</span>
          </div>
          <span className="hidden lg:inline text-gray-300">|</span>
          <span className="text-gray-500 hidden lg:inline">
            Showing <strong className="text-gray-900">{totalRecords === 0 ? 0 : (queryPage - 1) * queryLimit + 1}</strong> to <strong className="text-gray-900">{Math.min(queryPage * queryLimit, totalRecords)}</strong> of <strong className="text-gray-900">{totalRecords}</strong> results
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            disabled={queryPage <= 1 || isLoading}
            onClick={() => updateUrl({ page: queryPage - 1 })}
            className="w-9 h-9 flex items-center justify-center text-sm font-medium border border-gray-300 rounded-md bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <div className="flex items-center gap-1">
            {getPageNumbers().map((page, i) => (
              page === "..." ? (
                <span key={`dots-${i}`} className="w-9 h-9 flex items-center justify-center text-gray-400">...</span>
              ) : (
                <button
                  key={page}
                  onClick={() => updateUrl({ page: page as number })}
                  className={`w-9 h-9 flex items-center justify-center text-sm font-medium rounded-md transition-all shadow-sm ${
                    queryPage === page 
                      ? "bg-blue-600 text-white border border-blue-600" 
                      : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {page}
                </button>
              )
            ))}
          </div>

          <button
            disabled={queryPage >= totalPages || isLoading}
            onClick={() => updateUrl({ page: queryPage + 1 })}
            className="w-9 h-9 flex items-center justify-center text-sm font-medium border border-gray-300 rounded-md bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}