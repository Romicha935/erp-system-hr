"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { DataTable, Column } from "@/app/components/ui/DataTable";
import { useGetPayrollsQuery, Payroll } from "@/app/redux/dashboard/payroll/payrollApi";

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const statusStyle: Record<string, string> = {
  DRAFT: "text-amber-500",
  PROCESSED: "text-sky-600",
  PAID: "text-emerald-600",
};

export const PayrollHistoryTable: React.FC = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { data, isLoading, isFetching } = useGetPayrollsQuery({ page, limit });

  const payrolls = data?.data ?? [];

  const formatDate = (value: string) => new Date(value).toLocaleDateString("en-GB");

  const columns: Column<Payroll>[] = [
    { header: "S/N", accessor: (_row, i) => i + 1 },
    { header: "Payment Name", accessor: "paymentName", className: "font-semibold text-slate-800" },
    { header: "Designation", accessor: "designation" },
    { header: "Date Generated", accessor: (row) => formatDate(row.createdAt) },
    { header: "Payment Month", accessor: (row) => monthNames[row.month - 1] },
    { header: "Payment Year", accessor: (row) => row.year },
    {
      header: "Status",
      accessor: (row) => (
        <span className={`font-semibold ${statusStyle[row.status] ?? "text-slate-600"}`}>
          {row.status}
        </span>
      ),
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-6 py-6 border-b border-slate-100">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Employee Payroll History</h2>
          <p className="text-xs text-slate-400 mt-1">
            View generated payroll runs by month and department
          </p>
        </div>
        <Link href="/payroll/generate">
          <button className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-semibold text-xs rounded-xl shadow-md shadow-indigo-100 hover:opacity-90 transition-opacity">
            <Plus size={15} />
            Generate Payroll
          </button>
        </Link>
      </div>

      <div className="p-6">
        <DataTable
          columns={columns}
          data={payrolls}
          isLoading={isLoading || isFetching}
          emptyMessage="No payroll runs generated yet."
          currentPage={page}
          totalPages={1}
          itemsPerPage={limit}
          onPageChange={setPage}
          onItemsPerPageChange={(l) => {
            setLimit(l);
            setPage(1);
          }}
          renderAction={(row) => (
            <Link
              href={`/payroll/${row.id}`}
              className="text-blue-600 font-semibold hover:underline text-xs"
            >
              View more
            </Link>
          )}
        />
      </div>
    </div>
  );
};