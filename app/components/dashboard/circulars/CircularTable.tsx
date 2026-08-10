"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { CircularDetail, ViewCircularModal } from "./ViewCircularsModal";

const initialCirculars: CircularDetail[] = [
  { id: "1", sn: "01", title: "HR Circular for Operations Department Staff", sentFrom: "Admin, HR", sentTo: "Operations Staffs", date: "16/11/2022", circularType: "Sent" },
  { id: "2", sn: "02", title: "Management Circular for HR Staffs", sentFrom: "Admin, HR", sentTo: "HR Staffs", date: "16/11/2022", circularType: "Sent" },
  { id: "3", sn: "03", title: "Circular for Time Maintainance in the Office", sentFrom: "Management", sentTo: "All Staff", date: "16/11/2022", circularType: "Received" },
  { id: "4", sn: "04", title: "HR Circular for Operations Department Staff", sentFrom: "Admin, HR", sentTo: "Operations Staffs", date: "16/11/2022", circularType: "Sent" },
  { id: "5", sn: "05", title: "HR Circular for Operations Department Staff", sentFrom: "Admin, HR", sentTo: "Operations Staffs", date: "16/11/2022", circularType: "Received" },
  { id: "6", sn: "06", title: "HR Circular for Operations Department Staff", sentFrom: "Admin, HR", sentTo: "Operations Staffs", date: "16/11/2022", circularType: "Sent" },
  { id: "7", sn: "07", title: "HR Circular for Operations Department Staff", sentFrom: "Admin, HR", sentTo: "Operations Staffs", date: "16/11/2022", circularType: "Sent" },
  { id: "8", sn: "08", title: "HR Circular for Operations Department Staff", sentFrom: "Admin, HR", sentTo: "Operations Staffs", date: "16/11/2022", circularType: "Received" },
  { id: "9", sn: "09", title: "HR Circular for Operations Department Staff", sentFrom: "Admin, HR", sentTo: "Operations Staffs", date: "16/11/2022", circularType: "Received" },
  { id: "10", sn: "10", title: "HR Circular for Operations Department Staff", sentFrom: "Admin, HR", sentTo: "Operations Staffs", date: "16/11/2022", circularType: "Sent" },
  { id: "11", sn: "11", title: "HR Circular for Operations Department Staff", sentFrom: "Admin, HR", sentTo: "Operations Staffs", date: "16/11/2022", circularType: "Sent" },
  { id: "12", sn: "12", title: "HR Circular for Operations Department Staff", sentFrom: "Admin, HR", sentTo: "Operations Staffs", date: "16/11/2022", circularType: "Sent" },
  { id: "13", sn: "13", title: "HR Circular for Operations Department Staff", sentFrom: "Admin, HR", sentTo: "Operations Staffs", date: "16/11/2022", circularType: "Sent" },
];

export const CircularTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCircular, setSelectedCircular] = useState<CircularDetail | null>(null);

  // Filter functionality
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

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Header Section */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        {/* Search */}
        <div className="w-full md:w-80">
          <label className="text-[11px] font-semibold text-slate-500 block mb-1">Quick search a circular</label>
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Enter search word"
              className="w-full pl-3 pr-9 py-2.5 text-xs bg-slate-50/50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 transition-colors"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">🔍</span>
          </div>
        </div>

        {/* Total Count */}
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-slate-900">150</h2>
          <p className="text-xs font-medium text-slate-400">Total circulars</p>
        </div>

        {/* Filter and Create Button */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
          <div className="sm:w-48">
            <label className="text-[11px] font-semibold text-slate-500 block mb-1">Filter circulars</label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
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
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <span>Showing</span>
            <span className="px-2.5 py-1 border border-slate-200 rounded-lg font-bold text-slate-700">13</span>
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
              {filteredCirculars.length > 0 ? (
                filteredCirculars.map((row) => (
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

        {/* Pagination */}
        <div className="flex items-center gap-2 pt-2">
          {[1, 2, 3, 4, 5].map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-8 h-8 rounded-lg text-xs font-semibold border transition-colors ${
                currentPage === page
                  ? "bg-sky-500 text-white border-sky-500 shadow-sm"
                  : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
              }`}
            >
              {page}
            </button>
          ))}
          <button className="w-8 h-8 rounded-lg text-xs font-semibold border border-slate-200 text-slate-600 hover:bg-slate-50">
            &gt;&gt;
          </button>
        </div>
      </div>

      {/* View More Popup Modal */}
      <ViewCircularModal
        circular={selectedCircular}
        onClose={() => setSelectedCircular(null)}
      />
    </div>
  );
};