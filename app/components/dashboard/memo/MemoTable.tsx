"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  MemoFilterType,
  useGetMemosQuery,
} from "@/app/redux/dashboard/memosApi";
import { SearchIcon } from "lucide-react";

const Skeleton = ({ className = "" }: { className?: string }) => (
  <div
    className={`animate-pulse rounded-md bg-slate-200 ${className}`}
  />
);

const MemoTableSkeleton = () => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse text-xs">
        <thead>
          <tr className="border-b border-slate-100 text-slate-400 font-bold">
            <th className="pb-3 min-w-[140px]">Memo Title</th>
            <th className="pb-3 min-w-[150px]">Sent From</th>
            <th className="pb-3 min-w-[160px]">Sent To</th>
            <th className="pb-3 min-w-[100px]">Date</th>
            <th className="pb-3 min-w-[90px]">Attachment?</th>
            <th className="pb-3 min-w-[100px]">Status</th>
            <th className="pb-3 text-right min-w-[80px]">Action</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-50">
          {Array.from({ length: 6 }).map((_, index) => (
            <tr key={index}>
              {/* Memo Title */}
              <td className="py-4">
                <Skeleton className="h-3.5 w-28" />
              </td>

              {/* Sent From */}
              <td className="py-4">
                <Skeleton className="h-3.5 w-32" />
              </td>

              {/* Sent To */}
              <td className="py-4">
                <Skeleton className="h-3.5 w-28" />
              </td>

              {/* Date */}
              <td className="py-4">
                <Skeleton className="h-3.5 w-20" />
              </td>

              {/* Attachment */}
              <td className="py-4">
                <Skeleton className="h-3.5 w-12" />
              </td>

              {/* Status */}
              <td className="py-4">
                <Skeleton className="h-3.5 w-16" />
              </td>

              {/* Action */}
              <td className="py-4">
                <div className="flex justify-end">
                  <Skeleton className="h-3.5 w-16" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const MemoTable: React.FC = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [search, setSearch] = useState("");
  const [type, setType] = useState<MemoFilterType | "">("");

  const { data, isLoading, isFetching } = useGetMemosQuery({
    page,
    limit,
    search: search || undefined,
    type: type || undefined,
  });

  const memos = data?.data ?? [];
  const meta = data?.meta;

  const formatDate = (value: string) =>
    new Date(value).toLocaleDateString("en-GB");

  return (
    <div className="space-y-6 w-full">
      {/* Top Section */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        {/* Total Memo */}
        <div>
          {isLoading ? (
            <>
              <Skeleton className="h-9 w-16 mb-2" />
              <Skeleton className="h-3 w-20" />
            </>
          ) : (
            <>
              <h2 className="text-3xl font-extrabold text-slate-900">
                {meta?.total ?? 0}
              </h2>

              <p className="text-xs font-medium text-slate-400">
                Total memo
              </p>
            </>
          )}
        </div>

        {/* Search + Filter + Create */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
          {/* Search */}
          <div className="relative flex-1 sm:w-64">
            <label className="text-[11px] font-semibold text-slate-500 block mb-1">
              Quick search a memo
            </label>

            <input
              type="text"
              placeholder="Enter search word"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full pl-3 pr-9 py-2 text-xs text-gray-800 bg-slate-50/50 border border-slate-300 rounded-md outline-none focus:border-blue-500"
            />

            <span className="absolute right-3 top-[26px] text-slate-400 text-xs">
              <SearchIcon size={16} />
            </span>
          </div>

          {/* Filter */}
          <div className="sm:w-44">
            <label className="text-[11px] font-semibold text-slate-500 block mb-1">
              Filter memo
            </label>

            <select
              value={type}
              onChange={(e) => {
                setType(e.target.value as MemoFilterType | "");
                setPage(1);
              }}
              className="w-full px-3 py-2 text-xs text-slate-700 bg-slate-50/50 border border-slate-200 rounded-md cursor-pointer outline-none focus:border-blue-500"
            >
              <option value="">All memos</option>
              <option value="SENT">Sent memos</option>
              <option value="RECEIVED">Received memos</option>
            </select>
          </div>

          {/* Create */}
          <div className="sm:self-end">
            <Link href="/memo/create">
              <button className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-semibold text-xs rounded-md cursor-pointer shadow-md hover:opacity-90 transition-opacity">
                Create Memo
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900">
            All Memos
          </h3>

          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <span>Showing</span>

            {isLoading ? (
              <Skeleton className="h-7 w-10" />
            ) : (
              <span className="px-2.5 py-1 border border-slate-200 rounded-lg font-bold text-slate-700">
                {memos.length}
              </span>
            )}

            <span>per page</span>
          </div>
        </div>

        {/* Skeleton Loading */}
        {isLoading || isFetching ? (
          <MemoTableSkeleton />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 font-bold">
                  <th className="pb-3 min-w-[140px]">
                    Memo Title
                  </th>

                  <th className="pb-3 min-w-[150px]">
                    Sent From
                  </th>

                  <th className="pb-3 min-w-[160px]">
                    Sent To
                  </th>

                  <th className="pb-3 min-w-[100px]">
                    Date
                  </th>

                  <th className="pb-3 min-w-[90px]">
                    Attachment?
                  </th>

                  <th className="pb-3 min-w-[100px]">
                    Status
                  </th>

                  <th className="pb-3 text-right min-w-[80px]">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-50 text-slate-700 font-medium">
                {memos.length > 0 ? (
                  memos.map((memo) => (
                    <tr
                      key={memo.id}
                      className="hover:bg-slate-50/50 transition-colors"
                    >
                      <td className="py-3.5 font-semibold text-slate-800">
                        {memo.title}
                      </td>

                      <td className="py-3.5 text-slate-600">
                        {memo.sender.email}
                      </td>

                      <td className="py-3.5 text-slate-600">
                        {memo.receiver.firstName}{" "}
                        {memo.receiver.lastName}
                      </td>

                      <td className="py-3.5 text-slate-600">
                        {formatDate(memo.createdAt)}
                      </td>

                      <td className="py-3.5 text-slate-600">
                        {memo.hasAttachment ? "Yes" : "No"}
                      </td>

                      <td className="py-3.5">
                        <span
                          className={`font-semibold ${
                            memo.status === "PENDING"
                              ? "text-amber-500"
                              : memo.status === "APPROVED"
                              ? "text-emerald-600"
                              : "text-rose-600"
                          }`}
                        >
                          {memo.status}
                        </span>
                      </td>

                      <td className="py-3.5 text-right">
                        <Link
                          href={`/memo/${memo.id}`}
                          className="text-blue-600 font-semibold hover:underline"
                        >
                          View more
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={7}
                      className="py-8 text-center text-slate-400"
                    >
                      No memos found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {!isLoading && !isFetching && meta && meta.totalPages > 1 && (
          <div className="flex items-center gap-2 pt-2 flex-wrap">
            {Array.from(
              { length: meta.totalPages },
              (_, i) => i + 1
            ).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-8 h-8 rounded-lg text-xs font-semibold border transition-colors ${
                  page === p
                    ? "bg-sky-500 text-white border-sky-500"
                    : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};