// app/(dashboard)/budget/create/page.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useCreateBudgetMutation } from "@/app/redux/dashboard/budgetApi";

const inputClass =
  "w-full px-3.5 py-2.5 text-xs text-slate-900 bg-slate-50/50 border border-slate-200 rounded-xl outline-none focus:border-sky-500 transition-colors";
const labelClass = "text-xs font-semibold text-slate-700 block mb-1.5";

export default function CreateBudgetPage() {
  const router = useRouter();

  const [budgetNo, setBudgetNo] = useState("");
  const [description, setDescription] = useState("");
  const [budgetedAmount, setBudgetedAmount] = useState("");
  const [receivingOffice, setReceivingOffice] = useState("");

  const [createBudget, { isLoading }] = useCreateBudgetMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!budgetNo.trim() || !description.trim() || !budgetedAmount) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      await createBudget({
        budgetNo,
        description,
        budgetedAmount: parseFloat(budgetedAmount),
        receivingOffice: receivingOffice || undefined,
      }).unwrap();

      toast.success("Budget created successfully! ");
      router.push("/budget");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to create budget.");
    }
  };

  return (
    <div className="space-y-6 w-full mx-auto pb-10">
      <Link href="/budget" className="inline-flex items-center gap-1 text-xs font-semibold text-sky-600 hover:underline">
        ‹ Back
      </Link>

      <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-100 shadow-sm space-y-6">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Create Budget</h1>
          <p className="text-xs text-slate-400 font-medium mt-1">
            Kindly fill in the form below to create a budget
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className={labelClass}>Budget number</label>
            <input
              type="text"
              placeholder="Enter budget number"
              value={budgetNo}
              onChange={(e) => setBudgetNo(e.target.value)}
              className={inputClass}
              required
            />
          </div>
          <div>
            <label className={labelClass}>Budget description</label>
            <input
              type="text"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={inputClass}
              required
            />
          </div>
          <div>
            <label className={labelClass}>Budget amount</label>
            <input
              type="number"
              min="0"
              step="0.01"
              placeholder="Enter amount in ₦"
              value={budgetedAmount}
              onChange={(e) => setBudgetedAmount(e.target.value)}
              className={inputClass}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className={labelClass}>Receiving office</label>
            <select
              value={receivingOffice}
              onChange={(e) => setReceivingOffice(e.target.value)}
              className={inputClass}
            >
              <option value="">Select option</option>
              <option value="Head Office">Head Office</option>
              <option value="Regional Office">Regional Office</option>
            </select>
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-2.5 bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-semibold text-xs rounded-xl shadow-md hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {isLoading ? "Creating..." : "Create Budget"}
          </button>
        </div>
      </form>
    </div>
  );
}