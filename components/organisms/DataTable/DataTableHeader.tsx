"use client";

import { Column } from "./types";
import { RefObject } from "react";

interface DataTableHeaderProps<T> {
  selectedRows: Map<string | number, T>;
  bulkActions: { label: string; onClick: (selected: T[]) => void }[];
  showBulkDropdown: boolean;
  setShowBulkDropdown: (val: boolean) => void;
  bulkRef: RefObject<HTMLDivElement>;
  selectedData: T[];
  setSelectedRows: (val: Map<string | number, T>) => void;
  searchInput: string;
  setSearchInput: (val: string) => void;
  showColumnDropdown: boolean;
  setShowColumnDropdown: (val: boolean) => void;
  columnRef: RefObject<HTMLDivElement>;
  columns: Column<T>[];
  visibleColumns: Set<string>;
  setVisibleColumns: (val: Set<string>) => void;
}

export function DataTableHeader<T>({
  selectedRows,
  bulkActions,
  showBulkDropdown,
  setShowBulkDropdown,
  bulkRef,
  selectedData,
  setSelectedRows,
  searchInput,
  setSearchInput,
  showColumnDropdown,
  setShowColumnDropdown,
  columnRef,
  columns,
  visibleColumns,
  setVisibleColumns,
}: DataTableHeaderProps<T>) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-6 py-4 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 rounded-t-xl">
      <div>
        {selectedRows.size > 0 && bulkActions.length > 0 && (
          <div className="relative" ref={bulkRef}>
            <button
              onClick={() => setShowBulkDropdown(!showBulkDropdown)}
              className="h-9 px-4 text-sm bg-[var(--primary)] text-white rounded-md hover:bg-[var(--primary-hover)] flex items-center gap-2"
            >
              Bulk Actions ({selectedRows.size})
            </button>
            {showBulkDropdown && (
              <div className="absolute left-0 mt-2 w-44 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-md shadow-lg z-20">
                {bulkActions.map((action, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      action.onClick(selectedData);
                      setShowBulkDropdown(false);
                      setSelectedRows(new Map());
                    }}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-900 dark:text-gray-300 transition-colors"
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
            className="h-9 pl-9 pr-3 text-sm border border-[var(--gray-300)] dark:border-gray-700 bg-white dark:bg-gray-900 dark:text-white rounded-md focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] outline-none w-full transition-all"
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
            className="h-9 px-4 text-sm border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-2 transition-colors"
          >
            <span>Columns</span>
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
          </button>
          {showColumnDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-md shadow-lg z-20 p-2">
              <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 px-2 py-1 mb-1 uppercase tracking-wider">Visible Columns</div>
              {columns.map((col) => (
                <label key={String(col.accessor)} className="flex items-center gap-2 text-sm py-1.5 px-2 hover:bg-gray-50 dark:hover:bg-gray-900 cursor-pointer rounded transition-colors text-gray-700 dark:text-gray-300">
                  <input
                    type="checkbox"
                    className="rounded text-[var(--primary)] focus:ring-[var(--primary)]"
                    checked={visibleColumns.has(col.accessor)}
                    onChange={() => {
                      const newSet = new Set(visibleColumns);
                      if (newSet.has(col.accessor)) newSet.delete(col.accessor);
                      else newSet.add(col.accessor);
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
  );
}
