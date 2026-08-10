"use client";

import React, { useState } from "react";
import Link from "next/link";

interface MemoItem {
  id: string;
  sn: string;
  title: string;
  sentFrom: string;
  sentTo: string;
  date: string;
  hasAttachment: boolean;
  memoType: "Sent" | "Received";
}

const mockMemos: MemoItem[] = Array.from({ length: 16 }).map((_, index) => ({
  id: `${index + 1}`,
  sn: String(index + 1).padStart(2, "0"),
  title: "Operations memo",
  sentFrom: "Williams Achegbani",
  sentTo: "Chief Operations Officer",
  date: "16/11/2022",
  hasAttachment: index % 3 === 0,
  memoType: index % 4 === 3 ? "Received" : "Sent",
}));

export const MemoTable: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Header Card: Total, Search, Filter & Create Button */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        {/* Total Count */}
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900">300</h2>
          <p className="text-xs font-medium text-slate-400">Total memo</p>
        </div>

        {/* Search & Filter Inputs */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 sm:w-64">
            <label className="text-[11px] font-semibold text-slate-500 block mb-1">Quick search a memo</label>
            <input
              type="text"
              placeholder="Enter search word"
              className="w-full pl-3 pr-9 py-2 text-xs bg-slate-50/50 border border-slate-200 rounded-xl outline-none focus:border-blue-500"
            />
            <span className="absolute right-3 top-[26px] text-slate-400 text-xs">🔍</span>
          </div>

          <div className="sm:w-44">
            <label className="text-[11px] font-semibold text-slate-500 block mb-1">Filter memo</label>
            <select className="w-full px-3 py-2 text-xs bg-slate-50/50 border border-slate-200 rounded-xl outline-none focus:border-blue-500">
              <option value="all">All memos</option>
              <option value="sent">Sent memos</option>
              <option value="received">Received memos</option>
            </select>
          </div>

          <div className="sm:self-end">
            <Link href="/memo/create">
              <button className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-semibold text-xs rounded-xl shadow-md hover:opacity-90 transition-opacity">
                Create Memo
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900">All Memos</h3>
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <span>Showing</span>
            <span className="px-2.5 py-1 border border-slate-200 rounded-lg font-bold text-slate-700">16</span>
            <span>per page</span>
          </div>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 font-bold">
                <th className="pb-3 min-w-[40px]">S/N</th>
                <th className="pb-3 min-w-[140px]">Memo Title</th>
                <th className="pb-3 min-w-[150px]">Sent From</th>
                <th className="pb-3 min-w-[160px]">Sent To</th>
                <th className="pb-3 min-w-[100px]">Date</th>
                <th className="pb-3 min-w-[90px]">Attachment?</th>
                <th className="pb-3 min-w-[100px]">Memo Type</th>
                <th className="pb-3 text-right min-w-[80px]">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-slate-700 font-medium">
              {mockMemos.map((memo) => (
                <tr key={memo.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-3.5 text-slate-400">{memo.sn}</td>
                  <td className="py-3.5 font-semibold text-slate-800">{memo.title}</td>
                  <td className="py-3.5 text-slate-600">{memo.sentFrom}</td>
                  <td className="py-3.5 text-slate-600">{memo.sentTo}</td>
                  <td className="py-3.5 text-slate-600">{memo.date}</td>
                  <td className="py-3.5 text-slate-600">{memo.hasAttachment ? "Yes" : "No"}</td>
                  <td className="py-3.5">
                    <span className="inline-flex items-center gap-1 font-semibold text-slate-700">
                      {memo.memoType} {memo.memoType === "Sent" ? "↗" : "↙"}
                    </span>
                  </td>
                  <td className="py-3.5 text-right">
                    <Link href={`/memo/${memo.id}`} className="text-blue-600 font-semibold hover:underline">
                      View more
                    </Link>
                  </td>
                </tr>
              ))}
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
                  ? "bg-sky-500 text-white border-sky-500"
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
    </div>
  );
};