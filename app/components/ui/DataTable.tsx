
"use client";

import React from "react";

export interface Column<T> {
  header: string;
  accessor: keyof T | ((row: T, index: number) => React.ReactNode);
  className?: string;
  mobileLabel?: string;
}

interface DataTableProps<T extends { id: string }> {
  columns: Column<T>[];
  data: T[];
  isLoading?: boolean;
  emptyMessage?: string;
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (limit: number) => void;
  renderAction?: (row: T) => React.ReactNode;
  title?: string;
}

export function DataTable<T extends { id: string }>({
  columns,
  data,
  isLoading = false,
  emptyMessage = "No records found.",
  currentPage,
  totalPages,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
  renderAction,
  title,
}: DataTableProps<T>) {
  const getValue = (row: T, col: Column<T>, index: number) => {
    if (typeof col.accessor === "function") return col.accessor(row, index);
    return String(row[col.accessor] ?? "");
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-100 hover:shadow-sm">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
        {title && <h2 className="text-lg sm:text-xl font-bold text-slate-900">{title}</h2>}
        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium ml-auto">
          <span>Showing</span>
          <select
            value={itemsPerPage}
            onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
            className="px-2 py-1 border border-slate-200 rounded-lg outline-none font-bold text-slate-800 bg-white"
          >
            <option value={10}>10</option>
            <option value={12}>12</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
          <span>per page</span>
        </div>
      </div>

    {isLoading && (
  <>
    {/* Desktop Skeleton */}
    <div className="hidden md:block overflow-x-auto animate-pulse">
      <table className="w-full text-left border-collapse text-xs">
        <thead>
          <tr className="border-b border-slate-100 text-slate-900 font-medium text-sm">
            {columns.map((col, i) => (
              <th key={i} className={`pb-4 ${col.className ?? ""}`}>
                {col.header}
              </th>
            ))}
            {renderAction && <th className="pb-4 text-right">Action</th>}
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-50">
          {Array.from({ length: itemsPerPage }, (_, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((col, colIndex) => (
                <td
                  key={colIndex}
                  className={`py-4 ${col.className ?? ""}`}
                >
                  <div
                    className={`h-3.5 rounded bg-slate-200 ${
                      colIndex === 0 ? "w-28" : "w-20"
                    }`}
                  />
                </td>
              ))}

              {renderAction && (
                <td className="py-4">
                  <div className="flex justify-end">
                    <div className="h-8 w-16 rounded-lg bg-slate-200" />
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* Mobile Skeleton */}
    <div className="md:hidden space-y-3 animate-pulse">
      {Array.from({ length: Math.min(itemsPerPage, 6) }, (_, rowIndex) => (
        <div
          key={rowIndex}
          className="border border-slate-100 rounded-xl p-4"
        >
          <div className="grid grid-cols-2 gap-x-4 gap-y-4">
            {columns.map((_, colIndex) => (
              <div key={colIndex}>
                <div className="h-2.5 w-14 rounded bg-slate-200 mb-2" />
                <div className="h-3.5 w-20 rounded bg-slate-200" />
              </div>
            ))}
          </div>

          {renderAction && (
            <div className="mt-4 pt-3 border-t border-slate-100">
              <div className="h-8 w-20 rounded-lg bg-slate-200" />
            </div>
          )}
        </div>
      ))}
    </div>
  </>
)}

      {!isLoading && (
        <>
          {/* Desktop table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-slate-900 font-medium text-sm ">
                  {columns.map((col, i) => (
                    <th key={i} className={`pb-4 ${col.className ?? ""}`}>
                      {col.header}
                    </th>
                  ))}
                  {renderAction && <th className="pb-4 text-right">Action</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-slate-700 font-medium">
                {data.length > 0 ? (
                  data.map((row, index) => (
                    <tr key={row.id} className="hover:bg-slate-50/60 transition-colors">
                      {columns.map((col, i) => (
                        <td key={i} className={`py-3.5 ${col.className ?? ""}`}>
                          {getValue(row, col, index)}
                        </td>
                      ))}
                      {renderAction && (
                        <td className="py-3.5 text-right">{renderAction(row)}</td>
                      )}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={columns.length + (renderAction ? 1 : 0)}
                      className="py-8 text-center text-slate-400"
                    >
                      {emptyMessage}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden space-y-3">
            {data.length > 0 ? (
              data.map((row, index) => (
                <div
                  key={row.id}
                  className="border border-slate-100 rounded-xl p-4 hover:bg-slate-50/60 transition-colors"
                >
                  <div className="grid grid-cols-2 gap-y-1.5 text-xs text-slate-500">
                    {columns.map((col, i) => (
                      <span key={i} className={col.className}>
                        {col.mobileLabel ?? col.header}:{" "}
                        <span className="text-slate-700 font-medium">
                          {getValue(row, col, index)}
                        </span>
                      </span>
                    ))}
                  </div>
                  {renderAction && <div className="mt-3">{renderAction(row)}</div>}
                </div>
              ))
            ) : (
              <div className="py-8 text-center text-slate-400 text-sm">{emptyMessage}</div>
            )}
          </div>
        </>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center gap-2 mt-6 flex-wrap">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`w-9 h-9 text-xs font-semibold rounded-lg border transition-all ${
                currentPage === page
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
              }`}
            >
              {page}
            </button>
          ))}
          {currentPage < totalPages && (
            <button
              onClick={() => onPageChange(currentPage + 1)}
              className="px-3 h-9 text-xs font-semibold rounded-lg border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100"
            >
              &gt;&gt;
            </button>
          )}
        </div>
      )}
    </div>
  );
}