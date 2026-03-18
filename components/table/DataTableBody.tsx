"use client";

import { Column } from "./types";

interface DataTableBodyProps<T> {
  columns: Column<T>[];
  visibleColumns: Set<string>;
  data: T[];
  selectedRows: Map<string | number, T>;
  setSelectedRows: (val: Map<string | number, T>) => void;
  rowIdKey: string;
  bulkActions: any[];
  querySort: string | null;
  querySortOrder: "Asc" | "Desc";
  toggleSort: (key: string) => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getValue(obj: any, path: string) {
  return path.split(".").reduce((acc, key) => acc?.[key], obj);
}

export function DataTableBody<T extends Record<string, any>>({
  columns,
  visibleColumns,
  data,
  selectedRows,
  setSelectedRows,
  rowIdKey,
  bulkActions,
  querySort,
  querySortOrder,
  toggleSort,
}: DataTableBodyProps<T>) {
  return (
    <div className="overflow-x-auto overflow-hidden">
      <table className="w-full text-sm text-left border-collapse">
        <thead className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 text-xs uppercase text-gray-500 dark:text-gray-400 font-bold">
          <tr>
            {bulkActions.length > 0 && (
              <th className="px-4 py-3 w-10 text-center">
                <input
                  type="checkbox"
                  onChange={() => {
                    const allSelectedOnPage = data.every((row) => selectedRows.has(row[rowIdKey]));
                    const newMap = new Map(selectedRows);
                    if (allSelectedOnPage) {
                      data.forEach((row) => newMap.delete(row[rowIdKey]));
                    } else {
                      data.forEach((row) => newMap.set(row[rowIdKey], row));
                    }
                    setSelectedRows(newMap);
                  }}
                  checked={data.length > 0 && data.every((row) => selectedRows.has(row[rowIdKey]))}
                />
              </th>
            )}

            {columns
              .filter((col) => visibleColumns.has(col.accessor))
              .map((col) => {
                const isSorted = querySort === col.accessor;
                const isAsc = querySortOrder === "Asc";

                return (
                  <th
                    key={String(col.accessor)}
                    onClick={() => {
                      if (col.sortable) toggleSort(col.accessor);
                    }}
                    className={`px-6 py-3 text-left select-none ${col.sortable
                      ? "cursor-pointer hover:text-gray-900 dark:hover:text-gray-200"
                      : "cursor-default"
                      }`}
                  >
                    <div className="flex items-center gap-2">
                      <span>{col.header}</span>
                      {col.sortable && (
                        <span className="flex items-center">
                          {!isSorted ? (
                            <div className="flex flex-col items-center opacity-40">
                              <svg className="w-3 h-2" viewBox="0 4 20 10" fill="currentColor">
                                <path d="M10 5l-5 6h10l-5-6z" />
                              </svg>
                              <svg className="w-3 h-2 -mt-[2px]" viewBox="0 6 20 10" fill="currentColor">
                                <path d="M10 15l5-6H5l5 6z" />
                              </svg>
                            </div>
                          ) : isAsc ? (
                            <div className="flex flex-col items-center">
                              <svg className="w-3 h-2 opacity-40" viewBox="0 4 20 10" fill="currentColor">
                                <path d="M10 5l-5 6h10l-5-6z" />
                              </svg>
                              <svg className="w-3 h-2 -mt-[2px] opacity-100" viewBox="0 6 20 10" fill="currentColor">
                                <path d="M10 15l5-6H5l5 6z" />
                              </svg>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center">
                              <svg className="w-3 h-2 opacity-100" viewBox="0 4 20 10" fill="currentColor">
                                <path d="M10 5l-5 6h10l-5-6z" />
                              </svg>
                              <svg className="w-3 h-2 -mt-[2px] opacity-40" viewBox="0 6 20 10" fill="currentColor">
                                <path d="M10 15l5-6H5l5 6z" />
                              </svg>
                            </div>
                          )}
                        </span>
                      )}
                    </div>
                  </th>
                );
              })}
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
                {bulkActions.length > 0 && (
                  <td className="px-4 py-3 text-center">
                    <input
                      type="checkbox"
                      checked={selectedRows.has(row[rowIdKey])}
                      onChange={() => {
                        const newMap = new Map(selectedRows);
                        const id = row[rowIdKey];
                        if (newMap.has(id)) newMap.delete(id);
                        else newMap.set(id, row);
                        setSelectedRows(newMap);
                      }}
                    />
                  </td>
                )}

                {columns.map(
                  (col) =>
                    visibleColumns.has(col.accessor) && (
                      <td key={String(col.accessor)} className="px-6 py-3 whitespace-nowrap text-gray-600 dark:text-gray-400">
                        {col.render
                          ? col.render(getValue(row, col.accessor), row)
                          : String(getValue(row, col.accessor) ?? "-")}
                      </td>
                    )
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length + 1} className="px-6 py-12 text-center text-gray-400 dark:text-gray-500">
                No records found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
