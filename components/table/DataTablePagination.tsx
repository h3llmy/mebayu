"use client";

interface DataTablePaginationProps {
  queryLimit: number;
  updateUrl: (updates: Record<string, string | number | null>) => void;
  queryPage: number;
  totalRecords: number;
  totalPages: number;
  isLoading: boolean;
  getPageNumbers: () => (number | string)[];
}

export function DataTablePagination({
  queryLimit,
  updateUrl,
  queryPage,
  totalRecords,
  totalPages,
  isLoading,
  getPageNumbers,
}: DataTablePaginationProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 gap-4 rounded-b-xl">
      <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
        <div className="flex items-center gap-2 bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 rounded-md px-2 py-1 shadow-sm transition-colors">
          <span className="text-gray-500">Show</span>
          <select
            value={queryLimit}
            onChange={(e) => updateUrl({ limit: e.target.value, page: 1 })}
            className="bg-transparent outline-none font-medium text-gray-900 dark:text-gray-100"
          >
            {[10, 20, 50, 100].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
          <span className="text-gray-500">entries</span>
        </div>
        <span className="hidden lg:inline text-gray-300">|</span>
        <span className="text-gray-500 hidden lg:inline">
          Showing <strong className="text-gray-900 dark:text-white">{totalRecords === 0 ? 0 : (queryPage - 1) * queryLimit + 1}</strong>{" "}
          to <strong className="text-gray-900 dark:text-white">{Math.min(queryPage * queryLimit, totalRecords)}</strong>{" "}
          of <strong className="text-gray-900 dark:text-white">{totalRecords}</strong> results
        </span>
      </div>

      <div className="flex items-center gap-1.5">
        <button
          disabled={queryPage <= 1 || isLoading}
          onClick={() => updateUrl({ page: queryPage - 1 })}
          className="w-9 h-9 flex items-center justify-center text-sm font-medium border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="flex items-center gap-1">
          {getPageNumbers().map((page, i) =>
            page === "..." ? (
              <span key={`dots-${i}`} className="w-9 h-9 flex items-center justify-center text-gray-400">
                ...
              </span>
            ) : (
              <button
                key={page}
                onClick={() => updateUrl({ page: page as number })}
                className={`w-9 h-9 flex items-center justify-center text-sm font-medium rounded-md transition-all shadow-sm ${
                  queryPage === page
                    ? "bg-[var(--primary)] text-white border border-[var(--primary)]"
                    : "bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                }`}
              >
                {page}
              </button>
            )
          )}
        </div>

        <button
          disabled={queryPage >= totalPages || isLoading}
          onClick={() => updateUrl({ page: queryPage + 1 })}
          className="w-9 h-9 flex items-center justify-center text-sm font-medium border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
