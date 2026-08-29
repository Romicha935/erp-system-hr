"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { DataTable, Column } from "@/app/components/ui/DataTable";
import {
  useGetPaymentVouchersQuery,
  PaymentVoucher,
} from "@/app/redux/dashboard/paymentVoucherApi";

const statusStyle: Record<string, string> = {
  PENDING: "text-amber-500 font-semibold",
  VERIFIED: "text-sky-600 font-semibold",
  APPROVED: "text-emerald-600 font-semibold",
  REJECTED: "text-rose-600 font-semibold",
};

export default function PaymentPage() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [statusFilter, setStatusFilter] = useState("All");

  const { data, isLoading, isFetching } = useGetPaymentVouchersQuery({ page, limit });

  const allVouchers = data?.data ?? [];
  const meta = data?.meta;

  const vouchers =
    statusFilter === "All"
      ? allVouchers
      : allVouchers.filter((v) => v.status === statusFilter);

  const formatDate = (value: string) => new Date(value).toLocaleDateString("en-GB");

  const columns: Column<PaymentVoucher>[] = [
    { header: "S/N", accessor: (row) => row.procurement.sn },
    { header: "Item", accessor: (row) => row.procurement.item, className: "font-semibold text-slate-800" },
    { header: "Date", accessor: (row) => formatDate(row.createdAt) },
    { header: "Initiated By", accessor: (row) => row.initiatedBy.email },
    {
      header: "Sent To",
      accessor: (row) => `${row.procurement.sentTo.firstName} ${row.procurement.sentTo.lastName}`,
    },
    {
      header: "Status",
      accessor: (row) => <span className={statusStyle[row.status]}>{row.status}</span>,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">{meta?.total ?? 0}</h2>
          <p className="text-xs text-slate-400 font-medium">Total payment vouchers</p>
        </div>

        <div className="flex items-center gap-4 w-full sm:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2.5 text-xs text-slate-700 bg-slate-50 border border-slate-200 rounded-xl outline-none"
          >
            <option value="All">All vouchers</option>
            <option value="PENDING">Pending</option>
            <option value="VERIFIED">Verified</option>
            <option value="APPROVED">Approved</option>
            <option value="REJECTED">Rejected</option>
          </select>

          <Link href="/payments/create">
            <button className="inline-flex items-center gap-1.5 px-6 py-2.5 bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-semibold text-xs rounded-md cursor-pointer shadow-md hover:opacity-90 transition-opacity">
              <Plus size={15} />
              Create Payment Voucher
            </button>
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm">
        <div className="px-6 py-6 border-b border-slate-100">
          <h3 className="text-lg font-bold text-slate-900">All Payment Vouchers</h3>
        </div>

        <div className="p-6">
          <DataTable
            columns={columns}
            data={vouchers}
            isLoading={isLoading || isFetching}
            emptyMessage="No payment vouchers found."
            currentPage={meta?.page ?? page}
            totalPages={meta?.totalPages ?? 1}
            itemsPerPage={limit}
            onPageChange={setPage}
            onItemsPerPageChange={(l) => {
              setLimit(l);
              setPage(1);
            }}
            renderAction={(row) => (
              <Link
                href={`/payments/${row.id}`}
                className="text-blue-600 font-semibold hover:underline text-xs"
              >
                View more
              </Link>
            )}
          />
        </div>
      </div>
    </div>
  );
}