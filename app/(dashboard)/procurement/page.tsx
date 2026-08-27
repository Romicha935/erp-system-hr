"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  useGetProcurementsQuery,
  ProcurementStatus,
} from "@/app/redux/dashboard/procurementApi";

const statusStyle: Record<ProcurementStatus, string> = {
  PENDING: "text-amber-500 font-semibold",
  APPROVED: "text-emerald-600 font-semibold",
  REJECTED: "text-rose-600 font-semibold",
};

export default function ProcurementPage() {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<ProcurementStatus | "">("");

  const { data, isLoading, isFetching } = useGetProcurementsQuery({
    page,
    limit,
    search: search || undefined,
    status: status || undefined,
  });

  const list = data?.data ?? [];
  const meta = data?.meta;

  const formatCurrency = (value: string | number) => {
    const num = typeof value === "string" ? parseFloat(value) : value;
    return `₦${num.toLocaleString("en-NG", { minimumFractionDigits: 2 })}`;
  };

  const formatDate = (value: string) => new Date(value).toLocaleDateString("en-GB");

  const totalCost = list.reduce((sum, r) => sum + parseFloat(r.totalPrice || "0"), 0);
  const pendingCount = list.filter((r) => r.status === "PENDING").length;
  const approvedCount = list.filter((r) => r.status === "APPROVED").length;

  const metrics = [
    { title: "Total requests", count: (meta?.total ?? 0).toString(), iconBg: "bg-sky-100 text-sky-600" },
    { title: "Total cost incurred", count: formatCurrency(totalCost), iconBg: "bg-purple-100 text-purple-600" },
    { title: "Pending requests", count: pendingCount.toString(), iconBg: "bg-amber-100 text-amber-600" },
    { title: "Approved requests", count: approvedCount.toString(), iconBg: "bg-emerald-100 text-emerald-600" },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((item, index) => (
          <div key={index} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-black text-slate-900">{item.count}</h2>
              <p className="text-xs font-semibold text-slate-500 mt-0.5">{item.title}</p>
            </div>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm ${item.iconBg}`}>
              🛍️
            </div>
          </div>
        ))}
      </div>

      <div className="  flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h2 className="text-base font-bold text-slate-900">Procurement request</h2>
        <Link href="/procurement/create">
          <button className="px-6 py-2.5 bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-semibold text-xs rounded-md cursor-pointer shadow-md hover:opacity-90 transition-opacity">
            Make Procurement Request
          </button>
        </Link>
      </div>

      <div className="bg-white min-h-screen p-6 rounded-2xl border border-slate-100 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h3 className="text-base font-bold text-slate-900">Procurement Request</h3>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search by item..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full sm:w-56 px-3.5 py-2.5 text-xs  !text-black bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-sky-500 transition-colors"
            />
            <select 
              value={status}
              onChange={(e) => {
                setStatus(e.target.value as ProcurementStatus | "");
                setPage(1);
              }}
              className="w-full sm:w-40 px-3.5 py-2.5 text-xs text-slate-900 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-sky-500 transition-colors"
            >
              <option value="">All status</option>
              <option value="PENDING">Pending</option>
              <option value="APPROVED">Approved</option>
              <option value="REJECTED">Rejected</option>
            </select>
          </div>
        </div>

        {isLoading || isFetching ? (
          <div className="py-16 text-center text-slate-400 text-sm">Loading...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 font-bold">
                  <th className="pb-3 min-w-[40px]">S/N</th>
                  <th className="pb-3 min-w-[150px]">Item</th>
                  <th className="pb-3 min-w-[60px]">Qty</th>
                  <th className="pb-3 min-w-[120px]">Amount</th>
                  <th className="pb-3 min-w-[120px]">Requested By</th>
                  <th className="pb-3 min-w-[120px]">Sent to</th>
                  <th className="pb-3 min-w-[100px]">Date</th>
                  <th className="pb-3 min-w-[90px]">Status</th>
                  <th className="pb-3 min-w-[80px]">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-slate-700 font-medium">
                {list.length > 0 ? (
                  list.map((row) => (
                    <tr key={row.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-3.5 text-slate-400">{row.sn}</td>
                      <td className="py-3.5 font-semibold text-slate-800">{row.item}</td>
                      <td className="py-3.5 text-slate-600">{row.quantity}</td>
                      <td className="py-3.5 text-slate-800">{formatCurrency(row.totalPrice)}</td>
                      <td className="py-3.5 text-slate-600">
                        {row.requestedBy.firstName} {row.requestedBy.lastName}
                      </td>
                      <td className="py-3.5 text-slate-600">
                        {row.sentTo.firstName} {row.sentTo.lastName}
                      </td>
                      <td className="py-3.5 text-slate-600">{formatDate(row.createdAt)}</td>
                      <td className={`py-3.5 ${statusStyle[row.status]}`}>{row.status}</td>
                      <td className="py-3.5">
                        <Link
                          href={`/procurement/${row.id}`}
                          className="text-sky-600 font-semibold hover:underline"
                        >
                          View more
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={9} className="py-8 text-center text-slate-400">
                      No procurement requests found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {meta && meta.totalPages > 1 && (
          <div className="flex items-center gap-2 flex-wrap">
            {Array.from({ length: meta.totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-9 h-9 text-xs font-semibold rounded-lg border transition-all ${
                  page === p
                    ? "bg-sky-600 text-white border-sky-600"
                    : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
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
}