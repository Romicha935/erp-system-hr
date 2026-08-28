"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { DataTable, Column } from "@/app/components/ui/DataTable";
import {
  useGetPayslipsQuery,
  Payslip,
} from "@/app/redux/dashboard/payroll/payslipApi";

export const PayslipsTable: React.FC = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { data, isLoading, isFetching } = useGetPayslipsQuery({ page, limit });

  const payslips = data?.data ?? [];
  const pagination = data?.pagination;

  const formatCurrency = (value: string | number | null | undefined) => {
    if (value === null || value === undefined || value === "") return "₦0.00";
    const num = typeof value === "string" ? parseFloat(value) : value;
    if (isNaN(num)) return "₦0.00";
    return `₦${num.toLocaleString("en-NG", { minimumFractionDigits: 2 })}`;
  };

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  const columns: Column<Payslip>[] = [
    { header: "S/N", accessor: (_row, i) => i + 1 },
    {
      header: "Staff Name",
      accessor: (row) => `${row.staff?.firstName ?? ""} ${row.staff?.lastName ?? ""}`.trim() || "—",
      className: "font-semibold text-slate-800",
    },
    { header: "Designation", accessor: (row) => row.staff?.designation ?? "—" },
    { header: "Period", accessor: (row) => `${monthNames[row.month - 1]} ${row.year}` },
    { header: "Basic Salary", accessor: (row) => formatCurrency(row.basicSalary) },
    { header: "Gross Salary", accessor: (row) => formatCurrency(row.grossSalary) },
    { header: "Deduction", accessor: (row) => formatCurrency(row.totalDeduction) },
    {
      header: "Net Salary",
      accessor: (row) => formatCurrency(row.netSalary),
      className: "font-bold text-slate-900",
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-6 py-6 border-b border-slate-100">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Employee Payslip History</h2>
          <p className="text-xs text-slate-400 mt-1">
            View and manage generated payslips by month
          </p>
        </div>
        <Link href="/payroll/payslips/create">
          <button className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-semibold text-xs rounded-xl shadow-md shadow-indigo-100 hover:opacity-90 transition-opacity">
            <Plus size={15} />
            Create Payslip
          </button>
        </Link>
      </div>

      <div className="p-6">
        <DataTable
          columns={columns}
          data={payslips}
          isLoading={isLoading || isFetching}
          emptyMessage="No payslips generated yet."
          currentPage={pagination?.page ?? page}
          totalPages={pagination?.totalPages ?? 1}
          itemsPerPage={limit}
          onPageChange={setPage}
          onItemsPerPageChange={(l) => {
            setLimit(l);
            setPage(1);
          }}
          renderAction={(row) => (
            <Link
              href={`/payroll/payslips/${row.id}`}
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