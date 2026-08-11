"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { CircularDetail, ViewCircularModal } from "./ViewCircularsModal";
import { Search } from "lucide-react";


const initialCirculars: CircularDetail[] = Array.from({ length: 45 }).map((_, index) => ({
  id: `${index + 1}`,
  sn: String(index + 1).padStart(2, "0"),
  title: index % 3 === 0 
    ? "HR Circular for Operations Department Staff" 
    : index % 3 === 1 
    ? "Management Circular for HR Staffs" 
    : "Circular for Time Maintainance in the Office",
  sentFrom: index % 3 === 2 ? "Management" : "Admin, HR",
  sentTo: index % 3 === 1 ? "HR Staffs" : index % 3 === 2 ? "All Staff" : "Operations Staffs",
  date: "16/11/2022",
  circularType: index % 3 === 2 || index === 4 || index === 7 || index === 8 ? "Received" : "Sent",
}));

export const CircularTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [itemsPerPage, setItemsPerPage] = useState<number>(13);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedCircular, setSelectedCircular] = useState<CircularDetail | null>(null);

  // Search & Type Filter Logic
  const filteredCirculars = useMemo(() => {
    return initialCirculars.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.sentFrom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.sentTo.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesFilter =
        filterType === "all" ||
        (filterType === "sent" && item.circularType === "Sent") ||
        (filterType === "received" && item.circularType === "Received");

      return matchesSearch && matchesFilter;
    });
  }, [searchTerm, filterType]);

  // Dynamic Pagination Calculation
  const totalPages = Math.ceil(filteredCirculars.length / itemsPerPage) || 1;

  const paginatedCirculars = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredCirculars.slice(start, start + itemsPerPage);
  }, [filteredCirculars, currentPage, itemsPerPage]);

  const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Header Card */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        {/* Search */}
        <div className="w-full md:w-80">
          <label className="text-[11px] font-semibold text-slate-500 block mb-1">Quick search a circular</label>
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Enter search word"
              className="w-full pl-3 pr-9 py-2.5 text-xs bg-slate-50/50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 transition-colors"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs"><Search size={16}/></span>
          </div>
        </div>

        {/* Total Count */}
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-slate-900">{filteredCirculars.length}</h2>
          <p className="text-xs font-medium text-slate-400">Total circulars</p>
        </div>

        {/* Filter and Create Button */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
          <div className="sm:w-48">
            <label className="text-[11px] font-semibold text-slate-500 block mb-1">Filter circulars</label>
            <select
              value={filterType}
              onChange={(e) => {
                setFilterType(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-3 py-2.5 text-xs bg-slate-50/50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 transition-colors"
            >
              <option value="all">All memos</option>
              <option value="sent">Sent circulars</option>
              <option value="received">Received circulars</option>
            </select>
          </div>

          <div className="sm:self-end">
            <Link href="/circulars/create">
              <button className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-semibold text-xs rounded-xl shadow-md hover:opacity-90 transition-opacity">
                Create Circular
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Table Container */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900">All Circulars</h3>
          
          {/* Dynamic Per Page Dropdown */}
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <span>Showing</span>
            <select
              value={itemsPerPage}
              onChange={handlePerPageChange}
              className="px-2 py-1 border border-slate-200 rounded-lg font-bold text-slate-700 bg-white outline-none focus:border-blue-500 cursor-pointer"
            >
              <option value={10}>10</option>
              <option value={13}>13</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
            <span>per page</span>
          </div>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 font-bold">
                <th className="pb-3 min-w-[40px]">S/N</th>
                <th className="pb-3 min-w-[220px]">Circular Title</th>
                <th className="pb-3 min-w-[130px]">Sent From</th>
                <th className="pb-3 min-w-[150px]">Sent To</th>
                <th className="pb-3 min-w-[100px]">Date</th>
                <th className="pb-3 min-w-[110px]">Circular Type</th>
                <th className="pb-3 text-right min-w-[80px]">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-slate-700 font-medium">
              {paginatedCirculars.length > 0 ? (
                paginatedCirculars.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-3.5 text-slate-400">{row.sn}</td>
                    <td className="py-3.5 font-semibold text-slate-800">{row.title}</td>
                    <td className="py-3.5 text-slate-600">{row.sentFrom}</td>
                    <td className="py-3.5 text-slate-600">{row.sentTo}</td>
                    <td className="py-3.5 text-slate-600">{row.date}</td>
                    <td className="py-3.5">
                      <span className="inline-flex items-center gap-1 font-semibold text-slate-700">
                        {row.circularType} {row.circularType === "Sent" ? "↗" : "↙"}
                      </span>
                    </td>
                    <td className="py-3.5 text-right">
                      <button
                        onClick={() => setSelectedCircular(row)}
                        className="text-blue-600 font-semibold hover:underline"
                      >
                        View more
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-slate-400">
                    No circulars found matching criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Dynamic Pagination Controls */}
        <div className="flex items-center gap-2 pt-2">
          {Array.from({ length: totalPages }).map((_, index) => {
            const pageNum = index + 1;
            return (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`w-8 h-8 rounded-lg text-xs font-semibold border transition-colors ${
                  currentPage === pageNum
                    ? "bg-sky-500 text-white border-sky-500 shadow-sm"
                    : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                }`}
              >
                {pageNum}
              </button>
            );
          })}
          {currentPage < totalPages && (
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              className="w-8 h-8 rounded-lg text-xs font-semibold border border-slate-200 text-slate-600 hover:bg-slate-50"
            >
              &gt;&gt;
            </button>
          )}
        </div>
      </div>

      {/* Modal */}
      <ViewCircularModal
        circular={selectedCircular}
        onClose={() => setSelectedCircular(null)}
      />
    </div>
  );
};