/* eslint-disable @typescript-eslint/no-explicit-any */
// app/(dashboard)/payroll/tax-definitions/edit/[id]/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { toast } from "react-toastify";
import { ArrowLeft } from "lucide-react";
import {
  useGetTaxDefinitionByIdQuery,
  useUpdateTaxDefinitionMutation,
} from "@/app/redux/dashboard/payroll/taxDefinitionApi";

const inputClass =
  "w-full px-4 py-2.5 text-sm text-slate-900 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all placeholder:text-slate-400";
const labelClass = "text-xs font-semibold text-slate-700 block mb-1.5";

export default function EditTaxDefinitionPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const { data, isLoading: isFetching } = useGetTaxDefinitionByIdQuery(id);
  const [updateTaxDefinition, { isLoading: isUpdating }] = useUpdateTaxDefinitionMutation();

  const [taxType, setTaxType] = useState("");
  const [percentage, setPercentage] = useState("");

useEffect(() => {
  if (data?.data) {
    setTaxType(String(data.data.taxType ?? ""));
    setPercentage(String(data.data.percentage ?? ""));
  }
}, [data]);

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!taxType.trim() || !percentage) {
    toast.error("Please fill in all fields");
    return;
  }

  try {
    const payload = {
      taxType: taxType.trim(),
      percentage: Number(percentage),
    };

    console.log("UPDATE PAYLOAD:", payload);
    console.log("PERCENTAGE TYPE:", typeof payload.percentage);

    await updateTaxDefinition({
      id,
      data: payload,
    }).unwrap();

    toast.success("Tax definition updated successfully!");
    router.push("/payroll");
  } catch (error: any) {
    console.log("UPDATE ERROR:", error);

    toast.error(
      error?.data?.message ||
      "Failed to update tax definition."
    );
  }
};

  if (isFetching) {
    return (
      <div className="py-16 text-center text-slate-400 text-sm">
        Loading tax definition...
      </div>
    );
  }

  if (!data?.data) {
    return (
      <div className="py-16 text-center text-rose-500 text-sm">
        Tax definition not found.
      </div>
    );
  }

  return (
    <div className="space-y-5 w-full">
      <Link
        href="/payroll"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors"
      >
        <ArrowLeft size={16} />
        Back
      </Link>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="px-6 sm:px-8 py-6 border-b border-slate-100">
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Edit Tax Definition</h1>
          <p className="text-sm text-slate-400 mt-1">Update tax type or percentage value</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className={labelClass}>Tax type</label>
              <input
                type="text"
                placeholder="e.g. NHIS, VAT, WHT"
                value={taxType}
                onChange={(e) => setTaxType(e.target.value)}
                className={inputClass}
                required
              />
            </div>
            <div>
              <label className={labelClass}>% value</label>
              <input
                type="number"
                min="0"
                max="100"
                step="0.01"
                placeholder="Enter % value"
                value={percentage}
                onChange={(e) => setPercentage(e.target.value)}
                className={inputClass}
                required
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-end pt-6 border-t border-slate-100">
            <Link href="/payroll">
              <button
                type="button"
                className="w-full sm:w-auto px-6 py-2.5 text-sm cursor-pointer font-semibold text-slate-600 bg-slate-100 rounded-md hover:bg-slate-200 transition-colors"
              >
                Cancel
              </button>
            </Link>
            <button
              type="submit"
              disabled={isUpdating}
              className="w-full sm:w-auto px-8 py-2.5 bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-semibold text-sm rounded-md cursor-pointer shadow-md shadow-indigo-100 hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {isUpdating ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}