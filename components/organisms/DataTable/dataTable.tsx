"use client";

import { useDataTable } from "./useDataTable";
import { DataTableHeader } from "./DataTableHeader";
import { DataTableBody } from "./DataTableBody";
import { DataTablePagination } from "./DataTablePagination";
import { TableProps } from "./types";

export function DataTable<T extends Record<string, any>>({
  columns,
  data,
  bulkActions = [],
  defaultPageSize = 10,
  isLoading = false,
  totalItems = 0,
  rowIdKey = "id",
}: TableProps<T>) {
  const {
    queryPage,
    queryLimit,
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
  } = useDataTable({
    columns,
    data,
    defaultPageSize,
    totalItems,
    rowIdKey,
  });

  return (
    <div className="bg-white dark:bg-gray-950 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm font-sans relative overflow-visible transition-colors duration-200">
      {isLoading && (
        <div className="absolute inset-0 bg-white/60 dark:bg-black/40 backdrop-blur-[1px] z-30 flex items-center justify-center rounded-xl">
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin"></div>
            <span className="text-sm font-medium text-[var(--primary)] text-white">
              Loading data...
            </span>
          </div>
        </div>
      )}

      <DataTableHeader
        selectedRows={selectedRows}
        bulkActions={bulkActions as any}
        showBulkDropdown={showBulkDropdown}
        setShowBulkDropdown={setShowBulkDropdown}
        bulkRef={bulkRef as any}
        selectedData={selectedData}
        setSelectedRows={setSelectedRows}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        showColumnDropdown={showColumnDropdown}
        setShowColumnDropdown={setShowColumnDropdown}
        columnRef={columnRef as any}
        columns={columns as any}
        visibleColumns={visibleColumns}
        setVisibleColumns={setVisibleColumns}
      />

      <DataTableBody
        columns={columns as any}
        visibleColumns={visibleColumns}
        data={data}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
        rowIdKey={rowIdKey}
        bulkActions={bulkActions}
        querySort={querySort}
        querySortOrder={querySortOrder}
        toggleSort={toggleSort}
      />

      <DataTablePagination
        queryLimit={queryLimit}
        updateUrl={updateUrl}
        queryPage={queryPage}
        totalRecords={totalItems}
        totalPages={totalPages}
        isLoading={isLoading}
        getPageNumbers={getPageNumbers}
      />
    </div>
  );
}