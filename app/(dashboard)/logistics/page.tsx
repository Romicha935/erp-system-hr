"use client";

import React, { useState } from "react";
import Link from "next/link";
import { LogisticsMetrics } from "@/app/components/dashboard/logistics/MatricOverview";
import { DataTable, Column } from "@/app/components/ui/DataTable";
import {
  useGetLogisticsQuery,
  LogisticsRequest,
  LogisticsStatus,
} from "@/app/redux/dashboard/logisticsApi";

const statusStyle: Record<LogisticsStatus, string> = {
  PENDING: "text-amber-500 font-semibold",
  APPROVED: "text-emerald-600 font-semibold",
  REJECTED: "text-rose-600 font-semibold",
};

export default function LogisticsPage() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { data, isLoading, isFetching } = useGetLogisticsQuery({ page, limit });

  const list = data?.data ?? [];
  const meta = data?.meta;

  const formatCurrency = (value: string) =>
    `₦${parseFloat(value).toLocaleString("en-NG", { minimumFractionDigits: 2 })}`;

  const formatDate = (value: string) => new Date(value).toLocaleDateString("en-GB");

  const columns: Column<LogisticsRequest>[] = [
    { header: "Title", accessor: "title", className: "font-semibold text-slate-800" },
    { header: "Purpose", accessor: "purpose" },
    { header: "Amount", accessor: (row) => formatCurrency(row.amount), className: "font-semibold text-slate-800" },
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
    <div className="space-y-6 w-full pb-10">
      <LogisticsMetrics />

      <div className="  flex items-center justify-between">
        <h2 className="text-base font-bold text-slate-900">Logistics request</h2>
        <Link href="/logistics/create">
          <button className="px-6 py-2.5 bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-semibold text-xs rounded-md cursor-pointer shadow-md hover:opacity-90 transition-opacity">
            Make Logistics Request
          </button>
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm">
        <div className="px-6 py-6 border-b border-slate-100">
          <h3 className="text-base font-bold text-slate-900">All Logistics Request</h3>
        </div>

        <div className="p-6">
          <DataTable
            columns={columns}
            data={list}
            isLoading={isLoading || isFetching}
            emptyMessage="No logistics requests found."
            currentPage={meta?.page ?? page}
            totalPages={meta?.totalPages ?? 1}
            itemsPerPage={limit}
            onPageChange={setPage}
            onItemsPerPageChange={(l) => {
              setLimit(l);
              setPage(1);
            }}
            renderAction={(row) => (
              <Link href={`/logistics/${row.id}`} className="text-blue-600 font-semibold hover:underline text-xs">
                View more
              </Link>
            )}
          />
        </div>
      </div>
    </div>
  );
}