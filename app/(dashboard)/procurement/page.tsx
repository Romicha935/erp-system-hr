"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  useGetProcurementsQuery,
  Procurement,
  ProcurementStatus,
} from "@/app/redux/dashboard/procurementApi";
import { CircleCheck, CircleDollarSign, ClipboardList, Clock3 } from "lucide-react";
import { DataTable, Column } from "@/app/components/ui/DataTable";

const statusStyle: Record<ProcurementStatus, string> = {
  PENDING: "text-amber-500 font-semibold",
  APPROVED: "text-emerald-600 font-semibold",
  REJECTED: "text-rose-600 font-semibold",
};

export default function ProcurementPage() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
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

  const formatCompactCurrency = (amount: number) => {
    if (amount >= 1_000_000_000) return `₦${(amount / 1_000_000_000).toFixed(1)}B`;
    if (amount >= 1_000_000) return `₦${(amount / 1_000_000).toFixed(1)}M`;
    if (amount >= 1_000) return `₦${(amount / 1_000).toFixed(1)}K`;
    return `₦${amount.toLocaleString()}`;
  };

  const metrics = [
    {
      title: "Total requests",
      count: (meta?.total ?? 0).toString(),
      icon: ClipboardList,
      iconBg: "bg-sky-100 text-sky-600",
    },
    {
      title: "Total cost incurred",
      count: formatCompactCurrency(totalCost),
      icon: CircleDollarSign,
      iconBg: "bg-purple-100 text-purple-600",
    },
    {
      title: "Pending requests",
      count: pendingCount.toString(),
      icon: Clock3,
      iconBg: "bg-amber-100 text-amber-600",
    },
    {
      title: "Approved requests",
      count: approvedCount.toString(),
      icon: CircleCheck,
      iconBg: "bg-emerald-100 text-emerald-600",
    },
  ];

  const columns: Column<Procurement>[] = [
    { header: "S/N", accessor: "sn" },
    { header: "Item", accessor: "item", className: "font-semibold text-slate-800" },
    { header: "Qty", accessor: "quantity" },
    { header: "Amount", accessor: (row) => formatCurrency(row.totalPrice) },
    {
      header: "Requested By",
      accessor: (row) => `${row.requestedBy.firstName} ${row.requestedBy.lastName}`,
    },
    { header: "Sent to", accessor: (row) => `${row.sentTo.firstName} ${row.sentTo.lastName}` },
    { header: "Date", accessor: (row) => formatDate(row.createdAt) },
    {
      header: "Status",
      accessor: (row) => <span className={statusStyle[row.status]}>{row.status}</span>,
    },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between gap-4"
            >
              <div className="min-w-0">
                <h2 className="text-2xl font-black text-slate-900 truncate mb-6">{item.count}</h2>
                <p className="text-xs font-semibold text-slate-500 mt-0.5 truncate">{item.title}</p>
              </div>
              <div className={`w-10 h-10 shrink-0 rounded-full flex items-center justify-center ${item.iconBg}`}>
                <Icon size={19} strokeWidth={2} />
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h2 className="text-base font-bold text-slate-900">Procurement request</h2>
        <Link href="/procurement/create">
          <button className="px-6 py-2.5 bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-semibold text-xs rounded-md cursor-pointer shadow-md hover:opacity-90 transition-opacity">
            Make Procurement Request
          </button>
        </Link>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-6">
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
              className="w-full sm:w-56 px-3.5 py-2.5 text-xs !text-black bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-sky-500 transition-colors"
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

        <DataTable
          columns={columns}
          data={list}
          isLoading={isLoading || isFetching}
          emptyMessage="No procurement requests found."
          currentPage={meta?.page ?? page}
          totalPages={meta?.totalPages ?? 1}
          itemsPerPage={limit}
          onPageChange={setPage}
          onItemsPerPageChange={(l) => {
            setLimit(l);
            setPage(1);
          }}
          renderAction={(row) => (
            <Link href={`/procurement/${row.id}`} className="text-sky-600 font-semibold hover:underline text-xs">
              View more
            </Link>
          )}
        />
      </div>
    </div>
  );
}