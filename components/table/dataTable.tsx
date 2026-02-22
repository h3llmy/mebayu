"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

type Primitive =
  | string
  | number
  | boolean
  | bigint
  | symbol
  | null
  | undefined
  | Date;

type DeepKeys<T> = T extends Primitive
  ? never
  : {
    [K in keyof T & string]: T[K] extends Primitive
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
  totalItems?: number; // REQUIRED for proper pagination
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
  totalItems = 0,
}: TableProps<T>) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  /* ----------------------- */
  /* URL State               */
  /* ----------------------- */

  const queryPage = Math.max(1, Number(searchParams.get("page")) || 1);
  const queryLimit =
    Number(searchParams.get("limit")) || defaultPageSize;
  const querySearch = searchParams.get("q") || "";
  const querySort = searchParams.get("sort") || null;
  const queryDir =
    (searchParams.get("dir") as "asc" | "desc") || "asc";

  const [searchInput, setSearchInput] = useState(querySearch);
  const [selectedRows, setSelectedRows] =
    useState<Set<number>>(new Set());
  const [visibleColumns, setVisibleColumns] = useState<
    Set<string>
  >(new Set(columns.map((c) => c.accessor)));

  const [showColumnDropdown, setShowColumnDropdown] =
    useState(false);
  const [showBulkDropdown, setShowBulkDropdown] =
    useState(false);

  const columnRef = useRef<HTMLDivElement>(null);
  const bulkRef = useRef<HTMLDivElement>(null);

  /* ----------------------- */
  /* Sync search input       */
  /* ----------------------- */

  useEffect(() => {
    setSearchInput(querySearch);
  }, [querySearch]);

  /* ----------------------- */
  /* Reset selection on change */
  /* ----------------------- */

  useEffect(() => {
    setSelectedRows(new Set());
  }, [data, queryPage, queryLimit, querySearch, querySort, queryDir]);

  /* ----------------------- */
  /* URL Update Helper       */
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

  /* ----------------------- */
  /* Debounce Search         */
  /* ----------------------- */

  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchInput !== querySearch) {
        updateUrl({ q: searchInput, page: 1 });
      }
    }, 500);

    return () => clearTimeout(handler);
  }, [searchInput, querySearch]);

  /* ----------------------- */
  /* Remote Pagination Logic */
  /* ----------------------- */

  const totalRecords = totalItems;
  const totalPages = Math.max(
    1,
    Math.ceil(totalRecords / queryLimit)
  );

  useEffect(() => {
    if (queryPage > totalPages && totalPages > 1) {
      updateUrl({ page: totalPages });
    }
  }, [queryPage, totalPages]);

  // 🚀 NO CLIENT SIDE MODIFICATION
  const paginatedData = data;

  /* ----------------------- */
  /* Sorting Toggle          */
  /* ----------------------- */

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
  /* Pagination Numbers      */
  /* ----------------------- */

  const getPageNumbers = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots: (number | string)[] = [];
    let l;

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= queryPage - delta && i <= queryPage + delta)
      ) {
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
  /* Click Outside Dropdowns */
  /* ----------------------- */

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        columnRef.current &&
        !columnRef.current.contains(e.target as Node)
      )
        setShowColumnDropdown(false);

      if (
        bulkRef.current &&
        !bulkRef.current.contains(e.target as Node)
      )
        setShowBulkDropdown(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  const selectedData = useMemo(
    () =>
      Array.from(selectedRows)
        .map((i) => paginatedData[i])
        .filter(Boolean),
    [selectedRows, paginatedData]
  );

  /* ----------------------- */
  /* Render                  */
  /* ----------------------- */

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden font-sans relative">
      {isLoading && (
        <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] z-30 flex items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin"></div>
            <span className="text-sm font-medium text-[var(--primary)]">
              Loading data...
            </span>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-6 py-4 bg-gray-50 border-b border-gray-200">
        <div>
          {selectedRows.size > 0 && bulkActions.length > 0 && (
            <div className="relative" ref={bulkRef}>
              <button
                onClick={() =>
                  setShowBulkDropdown(!showBulkDropdown)
                }
                className="h-9 px-4 text-sm bg-[var(--primary)] text-white rounded-md hover:bg-[var(--primary-hover)] flex items-center gap-2"
              >
                Bulk Actions ({selectedRows.size})
              </button>

              {showBulkDropdown && (
                <div className="absolute left-0 mt-2 w-44 bg-white border border-gray-200 rounded-md shadow-lg z-20">
                  {bulkActions.map((action, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        action.onClick(selectedData);
                        setShowBulkDropdown(false);
                        setSelectedRows(new Set());
                      }}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
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
              className="h-9 pl-9 pr-3 text-sm border border-[var(--gray-300)] rounded-md focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] outline-none w-full transition-all"
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
                      className="rounded text-[var(--primary)] focus:ring-[var(--primary)]"
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
                  onChange={() =>
                    setSelectedRows(
                      selectedRows.size === paginatedData.length
                        ? new Set()
                        : new Set(
                          paginatedData.map((_, i) => i)
                        )
                    )
                  }
                  checked={
                    selectedRows.size ===
                    paginatedData.length &&
                    paginatedData.length > 0
                  }
                />
              </th>

              {columns.map(
                (col) =>
                  visibleColumns.has(col.accessor) && (
                    <th
                      key={col.accessor}
                      onClick={() =>
                        col.sortable &&
                        toggleSort(col.accessor)
                      }
                      className="px-6 py-3 cursor-pointer"
                    >
                      {col.header}
                    </th>
                  )
              )}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {paginatedData.length > 0 ? (
              paginatedData.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  <td className="px-4 py-3 text-center">
                    <input
                      type="checkbox"
                      checked={selectedRows.has(rowIndex)}
                      onChange={() => {
                        const newSet = new Set(
                          selectedRows
                        );
                        newSet.has(rowIndex)
                          ? newSet.delete(rowIndex)
                          : newSet.add(rowIndex);
                        setSelectedRows(newSet);
                      }}
                    />
                  </td>

                  {columns.map(
                    (col) =>
                      visibleColumns.has(
                        col.accessor
                      ) && (
                        <td
                          key={col.accessor}
                          className="px-6 py-3"
                        >
                          {col.render
                            ? col.render(
                              getValue(
                                row,
                                col.accessor
                              ),
                              row
                            )
                            : String(
                              getValue(
                                row,
                                col.accessor
                              ) ?? "-"
                            )}
                        </td>
                      )
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length + 1}
                  className="px-6 py-12 text-center text-gray-400"
                >
                  No records found.
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
                  className={`w-9 h-9 flex items-center justify-center text-sm font-medium rounded-md transition-all shadow-sm ${queryPage === page
                      ? "bg-[var(--primary)] text-white border border-[var(--primary)]"
                      : "bg-white text-[var(--gray-700)] border border-[var(--gray-300)] hover:bg-[var(--gray-50)]"
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