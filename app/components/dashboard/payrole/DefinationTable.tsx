/* eslint-disable @typescript-eslint/no-explicit-any */
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
  useGetTaxDefinitionsQuery,
  useDeleteTaxDefinitionMutation,
  TaxDefinition,
} from "@/app/redux/dashboard/payroll/taxDefinitionApi"; 
import { ConfirmDeleteModal } from "../../ui/DeleteConfirmModal";

export const TaxDefinitionsTable = () => {
  const router = useRouter();
  const { data, isLoading, isFetching } = useGetTaxDefinitionsQuery();
  const [deleteTaxDefinition, { isLoading: isDeleting }] = useDeleteTaxDefinitionMutation();

  const [targetToDelete, setTargetToDelete] = useState<{ id: string; name: string } | null>(null);

  const taxData = data?.data ?? [];

  const handleConfirmDelete = async () => {
    if (!targetToDelete) return;
    try {
      await deleteTaxDefinition(targetToDelete.id).unwrap();
      toast.success("Tax definition deleted");
      setTargetToDelete(null);
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to delete. Please try again.");
    }
  };

  const formatPercentage = (value: string | number | null | undefined) => {
    if (value === null || value === undefined || value === "") return "—";
    const num = typeof value === "string" ? parseFloat(value) : value;
    if (isNaN(num)) return "—";
    return `${num}%`;
  };

  const columns: Column<TaxDefinition>[] = [
    { header: "S/N", accessor: (_row, i) => i + 1, className: "w-16" },
    { header: "Tax Type", accessor: "taxType", className: "font-semibold text-slate-800" },
    {
      header: "% Value",
      accessor: (row) => formatPercentage(row.percentage),
      className: "font-bold text-slate-900",
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-6 py-6 border-b border-slate-100">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Tax Definitions</h2>
          <p className="text-xs text-slate-400 mt-1">
            Manage statutory tax types and their percentage values
          </p>
        </div>
        <Link href="/payroll/tax-definitions/create">
          <button className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-semibold text-xs rounded-md cursor-pointer shadow-md shadow-indigo-100 hover:opacity-90 transition-opacity">
            <Plus size={15} />
            Create Tax Definition
          </button>
        </Link>
      </div>

      <div className="p-6 overflow-visible">
        <DataTable
          columns={columns}
          data={taxData}
          isLoading={isLoading || isFetching}
          emptyMessage="No tax definitions yet. Create one to get started."
          currentPage={1}
          totalPages={1}
          itemsPerPage={taxData.length || 10}
          onPageChange={() => {}}
          onItemsPerPageChange={() => {}}
          renderAction={(row) => (
            <ActionMenu
              items={[
                {
                  label: "Edit",
                  icon: Pencil,
                  onClick: () => router.push(`/payroll/tax-definitions/edit/${row.id}`),
                },
                {
                  label: "Delete",
                  icon: Trash2,
                  variant: "danger",
                  onClick: () => setTargetToDelete({ id: row.id, name: row.taxType }),
                },
              ]}
            />
          )}
        />
      </div>

      <ConfirmDeleteModal
        isOpen={!!targetToDelete}
        itemName={targetToDelete?.name}
        title="Delete tax definition?"
        isLoading={isDeleting}
        onConfirm={handleConfirmDelete}
        onCancel={() => setTargetToDelete(null)}
      />
    </div>
  );
};