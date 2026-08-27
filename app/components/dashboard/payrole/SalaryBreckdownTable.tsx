"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { DataTable, Column } from "@/app/components/ui/DataTable";
;
import { ActionMenu } from "@/app/components/ui/ActionMenu";
import {
  useGetSalaryDefinitionsQuery,
  useDeleteSalaryDefinitionMutation,
  SalaryDefinition,
} from "@/app/redux/dashboard/payroll/sallaryDefinitionApi";
import { ConfirmDeleteModal } from "../../ui/DeleteConfirmModal";

export const SalaryBreakdownTable = () => {
  const router = useRouter();
  const { data, isLoading, isFetching } = useGetSalaryDefinitionsQuery();
  const [deleteSalaryDefinition, { isLoading: isDeleting }] =
    useDeleteSalaryDefinitionMutation();

  const [targetToDelete, setTargetToDelete] = useState<{ id: string; name: string } | null>(null);

  const salaryData = data?.data ?? [];

  const handleConfirmDelete = async () => {
    if (!targetToDelete) return;
    try {
      await deleteSalaryDefinition(targetToDelete.id).unwrap();
      toast.success("Salary definition deleted");
      setTargetToDelete(null);
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to delete. Please try again.");
    }
  };

  const formatCurrency = (value: string | number | null | undefined) => {
    if (value === null || value === undefined || value === "") return "₦0.00";
    const num = typeof value === "string" ? parseFloat(value) : value;
    if (isNaN(num)) return "₦0.00";
    return `₦${num.toLocaleString("en-NG", { minimumFractionDigits: 2 })}`;
  };

  const columns: Column<SalaryDefinition>[] = [
    { header: "S/N", accessor: (_row, i) => i + 1 },
    {
      header: "Staff",
      accessor: (row) => `${row.staff?.firstName ?? ""} ${row.staff?.lastName ?? ""}`.trim() || "—",
      className: "text-center",
    },
    { header: "Staff ID", accessor: (row) => row.staff?.staffId ?? "—" },
    { header: "Designation", accessor: (row) => row.staff?.designation ?? "—" },
    { header: "Basic Salary", accessor: (row) => formatCurrency(row.basicSalary) },
    { header: "Gross Salary", accessor: (row) => formatCurrency(row.grossSalary) },
    { header: "Deductions", accessor: (row) => formatCurrency(row.deductions) },
    {
      header: "Net Salary",
      accessor: (row) => formatCurrency(row.netSalary),
      className: "font-bold text-slate-900",
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-6 py-6 border-b border-slate-100">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Salary Definition</h2>
          <p className="text-xs text-slate-400 mt-1">
            Manage salary breakdown, allowances and deductions per staff
          </p>
        </div>
        <Link href="/payroll/salary-breakdown/create">
          <button className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-semibold text-xs rounded-md cursor-pointer shadow-md shadow-indigo-100 hover:opacity-90 transition-opacity">
            <Plus size={15} />
            Create Salary Definition
          </button>
        </Link>
      </div>

      <div className="p-6 overflow-visible">
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
            <ActionMenu
              items={[
                {
                  label: "Edit",
                  icon: Pencil,
                  onClick: () => router.push(`/payroll/salary-breakdown/edit/${row.id}`),
                },
                {
                  label: "Delete",
                  icon: Trash2,
                  variant: "danger",
                  onClick: () =>
                    setTargetToDelete({
                      id: row.id,
                      name: `${row.staff?.firstName ?? ""} ${row.staff?.lastName ?? ""}`.trim(),
                    }),
                },
              ]}
            />
          )}
        />
      </div>

      <ConfirmDeleteModal
        isOpen={!!targetToDelete}
        itemName={targetToDelete?.name}
        title="Delete salary definition?"
        isLoading={isDeleting}
        onConfirm={handleConfirmDelete}
        onCancel={() => setTargetToDelete(null)}
      />
    </div>
  );
};