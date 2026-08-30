"use client";

import React, { useState } from "react";
import Link from "next/link";
import { DataTable, Column } from "@/app/components/ui/DataTable";
import {
  useGetCircularsQuery,
  Circular,
  CircularFilterType,
} from "@/app/redux/dashboard/circularApi";
import { ViewCircularModal } from "./ViewCircularsModal";
import { Search } from "lucide";
import { SearchIcon } from "lucide-react";

export const CircularTable: React.FC = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<CircularFilterType | "">("");
  const [selectedCircular, setSelectedCircular] = useState<Circular | null>(null);

  const { data, isLoading, isFetching } = useGetCircularsQuery({
    page,
    limit,
    search: search || undefined,
    type: filterType || undefined,
  });

  const circulars = data?.data ?? [];
  const meta = data?.meta;

  const formatDate = (value: string) => new Date(value).toLocaleDateString("en-GB");

  const columns: Column<Circular>[] = [
    { header: "Circular Title", accessor: "title", className: "font-semibold text-slate-800" },
    { header: "Sent From", accessor: (row) => row.sender.email },
    { header: "Sent To", accessor: "sentToGroup" },
    { header: "Date", accessor: (row) => formatDate(row.createdAt) },
  ];

  return (
    <div className="space-y-6 ">
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
      

        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-slate-900">{meta?.total ?? 0}</h2>
          <p className="text-xs font-medium text-slate-400">Total circulars</p>
        </div>
  <div className="w-full md:w-80">
          <label className="text-[11px] font-semibold text-slate-500 block mb-1">Quick search a circular</label>
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Enter search word"
              className="w-full pl-3 pr-9 py-2.5 text-xs text-gray-800 bg-slate-50/50 border border-slate-300 rounded-md  outline-none focus:border-blue-500 transition-colors"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs"><SearchIcon size={16}/></span>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
          <div className="sm:w-48">
            <label className="text-[11px] font-semibold text-slate-500 block mb-1">Filter circulars</label>
            <select
              value={filterType}
              onChange={(e) => {
                setFilterType(e.target.value as CircularFilterType | "");
                setPage(1);
              }}
              className="w-full px-3 py-2.5 text-xs text-slate-700 bg-slate-50/50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 transition-colors"
            >
              <option value="">All circulars</option>
              <option value="SENT">Sent circulars</option>
              <option value="RECEIVED">Received circulars</option>
            </select>
          </div>

          <div className="sm:self-end">
            <Link href="/circulars/create">
              <button className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-semibold text-xs rounded-md cursor-pointer shadow-md hover:opacity-90 transition-opacity">
                Create Circular
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm">
        <div className="px-6 py-6 border-b border-slate-100">
          <h3 className="text-lg font-bold text-slate-900">All Circulars</h3>
        </div>

        <div className="p-6">
          <DataTable
            columns={columns}
            data={circulars}
            isLoading={isLoading || isFetching}
            emptyMessage="No circulars found."
            currentPage={meta?.page ?? page}
            totalPages={meta?.totalPages ?? 1}
            itemsPerPage={limit}
            onPageChange={setPage}
            onItemsPerPageChange={(l) => {
              setLimit(l);
              setPage(1);
            }}
            renderAction={(row) => (
              <button
                onClick={() => setSelectedCircular(row)}
                className="text-blue-600 font-semibold hover:underline text-xs"
              >
                View more
              </button>
            )}
          />
        </div>
      </div>

      <ViewCircularModal circular={selectedCircular} onClose={() => setSelectedCircular(null)} />
    </div>
  );
};