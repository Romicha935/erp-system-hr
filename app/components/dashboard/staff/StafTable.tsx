"use client";

import React from "react";
import Link from "next/link";
import { Staff } from "@/app/types/staf";

interface StaffTableProps {
  data: Staff[];
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (limit: number) => void;
}

export const StaffTable: React.FC<StaffTableProps> = ({
  data,
  currentPage,
  totalPages,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
}) => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 hover:shadow-sm">
      {/* Table Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-slate-900">All Staff</h2>
        
        {/* Per Page Selector */}
        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
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

      {/* Data Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider">
              <th className="pb-4">S/N</th>
              <th className="pb-4">First Name</th>
              <th className="pb-4">Last Name</th>
              <th className="pb-4">Gender</th>
              <th className="pb-4">Staff ID</th>
              <th className="pb-4">Phone Number</th>
              <th className="pb-4">Role</th>
              <th className="pb-4">Designation</th>
              <th className="pb-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 text-slate-700 font-medium">
            {data.length > 0 ? (
              data.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3.5 text-slate-400">{item.sn}</td>
                  <td className="py-3.5 font-semibold text-slate-800">{item.firstName}</td>
                  <td className="py-3.5">{item.lastName}</td>
                  <td className="py-3.5">{item.gender}</td>
                  <td className="py-3.5 text-slate-500">{item.staffId}</td>
                  <td className="py-3.5">{item.phoneNumber}</td>
                  <td className="py-3.5">{item.role}</td>
                  <td className="py-3.5 text-slate-500">{item.designation}</td>
                  <td className="py-3.5 text-right">
                    <Link
                      href={`/staff/edit/${item.id}`}
                      className="text-blue-600 hover:text-blue-800 font-semibold hover:underline"
                    >
                      View more
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={9} className="py-8 text-center text-slate-400">
                  No staff members found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center gap-2 mt-6">
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
    </div>
  );
};