"use client";

import React, { useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { Pencil, Trash2 } from "lucide-react";
import { BudgetMetrics } from "@/app/components/dashboard/budget/Budgetmatrics";
import { DataTable, Column } from "@/app/components/ui/DataTable";
import { ActionMenu } from "@/app/components/ui/ActionMenu";

import { useGetBudgetsQuery, useDeleteBudgetMutation, Budget } from "@/app/redux/dashboard/budgetApi";
import { ConfirmDeleteModal } from "@/app/components/ui/DeleteConfirmModal";

export default function BudgetPage() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [targetToDelete, setTargetToDelete] = useState<{ id: string; name: string } | null>(null);

  const { data, isLoading, isFetching } = useGetBudgetsQuery({ page, limit });
  const [deleteBudget, { isLoading: isDeleting }] = useDeleteBudgetMutation();

  const list = data?.data ?? [];
  const meta = data?.meta;

  const formatCurrency = (value: string | number | null) => {
    if (value === null) return "—";
    const num = typeof value === "string" ? parseFloat(value) : value;
    return `₦${num.toLocaleString("en-NG", { minimumFractionDigits: 2 })}`;
  };

  const formatDate = (value: string) => new Date(value).toLocaleDateString("en-GB");

  const handleConfirmDelete = async () => {
    if (!targetToDelete) return;
    try {
      await deleteBudget(targetToDelete.id).unwrap();
      toast.success("Budget deleted successfully");
      setTargetToDelete(null);
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to delete budget.");
    }
  };

  const columns: Column<Budget>[] = [
    { header: "Budget No.", accessor: "budgetNo" },
    { header: "Budget Description", accessor: "description", className: "font-semibold text-slate-800" },
    { header: "Budgeted Amount (₦)", accessor: (row) => formatCurrency(row.budgetedAmount) },
    { header: "Actual Amount (₦)", accessor: (row) => formatCurrency(row.actualAmount) },
    {
      header: "Variance (₦)",
      accessor: (row) =>
        row.variance !== null ? (
          <span className={`font-semibold ${row.isPositiveVariance ? "text-emerald-600" : "text-rose-500"}`}>
            {row.isPositiveVariance ? "+ " : "- "}
            {Math.abs(row.variance).toLocaleString("en-NG", { minimumFractionDigits: 2 })}
          </span>
        ) : (
          "—"
        ),
    },
    {
      header: "Status",
      accessor: (row) => (
        <span
          className={`font-semibold ${
            row.status === "PENDING"
              ? "text-amber-500"
              : row.status === "APPROVED"
              ? "text-emerald-600"
              : "text-rose-600"
          }`}
        >
          {row.status}
        </span>
      ),
    },
    { header: "Date", accessor: (row) => formatDate(row.createdAt) },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <BudgetMetrics />

      <div className=" flex items-center justify-between">
        <h2 className="text-base font-bold text-slate-900">Create a Budget</h2>
        <Link href="/budget/create">
          <button className="px-6 py-2.5 bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-semibold text-xs rounded-md cursor-pointer shadow-md hover:opacity-90 transition-opacity">
            Create Budget
          </button>
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm">
        <div className="px-6 py-6 border-b border-slate-100">
          <h3 className="text-base font-bold text-slate-900">Budget History</h3>
        </div>

        <div className="p-6 overflow-visible">
          <DataTable
            columns={columns}
            data={list}
            isLoading={isLoading || isFetching}
            emptyMessage="No budgets recorded yet."
            currentPage={meta?.page ?? page}
            totalPages={meta?.totalPages ?? 1}
            itemsPerPage={limit}
            onPageChange={setPage}
            onItemsPerPageChange={(l) => {
              setLimit(l);
              setPage(1);
            }}
            renderAction={(row) => (
              <ActionMenu
                items={[
                  {
                    label: "Edit",
                    icon: Pencil,
                    onClick: () => {
                      window.location.href = `/budget/edit/${row.id}`;
                    },
                  },
                  {
                    label: "Delete",
                    icon: Trash2,
                    variant: "danger",
                    onClick: () => setTargetToDelete({ id: row.id, name: row.description }),
                  },
                ]}
              />
            )}
          />
        </div>
      </div>

      <ConfirmDeleteModal
        isOpen={!!targetToDelete}
        itemName={targetToDelete?.name}
        title="Delete budget?"
        isLoading={isDeleting}
        onConfirm={handleConfirmDelete}
        onCancel={() => setTargetToDelete(null)}
      />
    </div>
  );
}