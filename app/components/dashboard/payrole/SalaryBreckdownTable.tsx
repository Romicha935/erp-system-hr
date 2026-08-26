"use client";

import React from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { DataTable, Column } from "@/app/components/ui/DataTable";
import {
  useGetSalaryDefinitionsQuery,
  useDeleteSalaryDefinitionMutation,
  SalaryDefinition,
} from "@/app/redux/dashboard/payroll/taxDefinitionApi"; 

export const SalaryBreakdownTable = () => {
  const { data, isLoading, isFetching } = useGetSalaryDefinitionsQuery();
  const [deleteSalaryDefinition, { isLoading: isDeleting }] =
    useDeleteSalaryDefinitionMutation();

  const salaryData = data?.data ?? [];

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete salary definition for "${title}"? This cannot be undone.`)) {
      return;
    }
    try {
      await deleteSalaryDefinition(id).unwrap();
      toast.success("Salary definition deleted");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to delete. Please try again.");
    }
  };

  const formatCurrency = (value: number | string) => {
    const num = typeof value === "string" ? parseFloat(value) : value;
    return `₦${num.toLocaleString("en-NG", { minimumFractionDigits: 2 })}`;
  };

  const columns: Column<SalaryDefinition>[] = [
    { header: "S/N", accessor: (_row, i) => i + 1 },
    { header: "Title", accessor: "title", className: "font-semibold text-slate-800" },
    { header: "Level", accessor: "level" },
    { header: "Basic Salary", accessor: (row) => formatCurrency(row.basic) },
    { header: "Allowance", accessor: (row) => formatCurrency(row.allowance) },
    { header: "Gross Salary", accessor: (row) => formatCurrency(row.gross) },
    { header: "Deductions", accessor: (row) => formatCurrency(row.deductions) },
    {
      header: "Net Salary",
      accessor: (row) => formatCurrency(row.net),
      className: "font-bold text-slate-900",
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-6 py-6 border-b border-slate-100">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Salary Definition</h2>
          <p className="text-xs text-slate-400 mt-1">
            Manage salary bands, allowances and deductions by role
          </p>
        </div>
        <Link href="/payroll/salary-breakdown/create">
          <button className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-semibold text-xs rounded-xl shadow-md shadow-indigo-100 hover:opacity-90 transition-opacity">
            <Plus size={15} />
            Create Salary Definition
          </button>
        </Link>
      </div>

      <div className="p-6">
        <DataTable
          columns={columns}
          data={salaryData}
          isLoading={isLoading || isFetching}
          emptyMessage="No salary definitions yet. Create one to get started."
          currentPage={1}
          totalPages={1}
          itemsPerPage={salaryData.length || 10}
          onPageChange={() => {}}
          onItemsPerPageChange={() => {}}
          renderAction={(row) => (
            <div className="flex items-center justify-end gap-4">
              <Link
                href={`/payroll/salary-breakdown/edit/${row.id}`}
                className="inline-flex items-center gap-1 text-blue-600 font-semibold hover:underline text-xs"
              >
                <Pencil size={13} />
                Edit
              </Link>
              <button
                onClick={() => handleDelete(row.id, row.title)}
                disabled={isDeleting}
                className="inline-flex items-center gap-1 text-rose-500 font-semibold hover:underline text-xs disabled:opacity-50"
              >
                <Trash2 size={13} />
                Delete
              </button>
            </div>
          )}
        />
      </div>
    </div>
  );
};