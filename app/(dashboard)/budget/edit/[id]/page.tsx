// app/(dashboard)/budget/edit/[id]/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { toast } from "react-toastify";
import { ArrowLeft } from "lucide-react";
import {
  useGetBudgetByIdQuery,
  useUpdateBudgetMutation,
  BudgetStatus,
} from "@/app/redux/dashboard/budgetApi";

const inputClass =
  "w-full px-3.5 py-2.5 text-sm text-slate-900 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-sky-500 transition-colors";
const labelClass = "text-xs font-semibold text-slate-700 block mb-1.5";

export default function EditBudgetPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const { data, isLoading: isFetching } = useGetBudgetByIdQuery(id);
  const [updateBudget, { isLoading: isUpdating }] = useUpdateBudgetMutation();

  const [actualAmount, setActualAmount] = useState("");
  const [status, setStatus] = useState<BudgetStatus>("PENDING");

  useEffect(() => {
    if (data?.data) {
      setActualAmount(data.data.actualAmount ?? "");
      setStatus(data.data.status);
    }
  }, [data]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await updateBudget({
        id,
        data: {
          actualAmount: actualAmount ? parseFloat(actualAmount) : undefined,
          status,
        },
      }).unwrap();

      toast.success("Budget updated successfully! 🎉");
      router.push("/budget");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update budget.");
    }
  };

  if (isFetching) {
    return <div className="py-16 text-center text-slate-400 text-sm">Loading budget...</div>;
  }

  if (!data?.data) {
    return <div className="py-16 text-center text-rose-500 text-sm">Budget not found.</div>;
  }

  const budget = data.data;

  return (
    <div className="space-y-5 w-full pb-10">
      <Link
        href="/budget"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-sky-600 transition-colors"
      >
        <ArrowLeft size={16} />
        Back
      </Link>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="px-6 sm:px-8 py-6 border-b border-slate-100">
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Edit Budget</h1>
          <p className="text-sm text-slate-400 mt-1">
            {budget.budgetNo} — {budget.description}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100 text-xs">
            <div>
              <p className="text-slate-400 font-semibold">Budgeted Amount</p>
              <p className="text-slate-800 font-bold mt-0.5">
                ₦{parseFloat(budget.budgetedAmount).toLocaleString("en-NG")}
              </p>
            </div>
            <div>
              <p className="text-slate-400 font-semibold">Receiving Office</p>
              <p className="text-slate-800 font-bold mt-0.5">{budget.receivingOffice ?? "—"}</p>
            </div>
          </div>

          <div>
            <label className={labelClass}>Actual amount</label>
            <input
              type="number"
              min="0"
              step="0.01"
              placeholder="Enter actual amount spent"
              value={actualAmount}
              onChange={(e) => setActualAmount(e.target.value)}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as BudgetStatus)}
              className={inputClass}
            >
              <option value="PENDING">Pending</option>
              <option value="APPROVED">Approved</option>
              <option value="REJECTED">Rejected</option>
            </select>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-end pt-6 border-t border-slate-100">
            <Link href="/budget">
              <button
                type="button"
                className="w-full sm:w-auto px-6 py-2.5 text-sm font-semibold text-slate-600 bg-slate-100 rounded-xl hover:bg-slate-200 transition-colors"
              >
                Cancel
              </button>
            </Link>
            <button
              type="submit"
              disabled={isUpdating}
              className="w-full sm:w-auto px-8 py-2.5 bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-semibold text-sm rounded-xl shadow-md hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {isUpdating ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}