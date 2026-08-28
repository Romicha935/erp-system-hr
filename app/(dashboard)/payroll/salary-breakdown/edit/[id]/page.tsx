
// app/(dashboard)/payroll/salary-breakdown/edit/[id]/page.tsx
"use client";

import React, { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { toast } from "react-toastify";
import { ArrowLeft } from "lucide-react";

import {
  useGetSalaryDefinitionsQuery,
  useUpdateSalaryDefinitionMutation,
} from "@/app/redux/dashboard/payroll/sallaryDefinitionApi";

interface FormState {
  basicSalary: string;
  housingAllowance: string;
  transportAllowance: string;
  utilityAllowance: string;
  productivityAllowance: string;
  communicationAllowance: string;
  inconvenienceAllowance: string;
  tax: string;
  pension: string;
}

const inputClass =
  "w-full px-4 py-2.5 text-sm text-slate-900 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all placeholder:text-slate-400";

const labelClass =
  "text-xs font-semibold text-slate-700 block mb-1.5";

export default function EditSalaryDefinitionPage() {
  const router = useRouter();
  const params = useParams();

  const id = params.id as string;

  // Get all salary definitions because backend
  // does not have GET /salary-definition/:id
  const {
    data: salaryData,
    isLoading: isFetching,
  } = useGetSalaryDefinitionsQuery();

  const [updateSalaryDefinition, { isLoading: isUpdating }] =
    useUpdateSalaryDefinitionMutation();

  const [form, setForm] = useState<FormState>({
    basicSalary: "",
    housingAllowance: "",
    transportAllowance: "",
    utilityAllowance: "",
    productivityAllowance: "",
    communicationAllowance: "",
    inconvenienceAllowance: "",
    tax: "",
    pension: "",
  });

  // Find current salary definition from list
  const salaryDefinition = useMemo(() => {
    return salaryData?.data?.find(
      (item: any) => item.id === id
    );
  }, [salaryData, id]);

  // Populate form
  useEffect(() => {
    if (salaryDefinition) {
      setForm({
        basicSalary: String(salaryDefinition.basicSalary ?? ""),
        housingAllowance: String(
          salaryDefinition.housingAllowance ?? ""
        ),
        transportAllowance: String(
          salaryDefinition.transportAllowance ?? ""
        ),
        utilityAllowance: String(
          salaryDefinition.utilityAllowance ?? ""
        ),
        productivityAllowance: String(
          salaryDefinition.productivityAllowance ?? ""
        ),
        communicationAllowance: String(
          salaryDefinition.communicationAllowance ?? ""
        ),
        inconvenienceAllowance: String(
          salaryDefinition.inconvenienceAllowance ?? ""
        ),
        tax: String(salaryDefinition.tax ?? ""),
        pension: String(salaryDefinition.pension ?? ""),
      });
    }
  }, [salaryDefinition]);

  const num = (value: string) => {
    return parseFloat(value || "0") || 0;
  };

  const grossSalary = useMemo(() => {
    return (
      num(form.basicSalary) +
      num(form.housingAllowance) +
      num(form.transportAllowance) +
      num(form.utilityAllowance) +
      num(form.productivityAllowance) +
      num(form.communicationAllowance) +
      num(form.inconvenienceAllowance)
    );
  }, [form]);

  const totalDeductions = useMemo(() => {
    return num(form.tax) + num(form.pension);
  }, [form]);

  const netSalary = grossSalary - totalDeductions;

  const formatNaira = (value: number) =>
    `₦${value.toLocaleString("en-NG", {
      minimumFractionDigits: 2,
    })}`;

  const handleChange =
    (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!salaryDefinition) {
      toast.error("Salary definition not found.");
      return;
    }

    try {
      await updateSalaryDefinition({
        id,
        data: {
          basicSalary: Number(form.basicSalary || 0),
          housingAllowance: Number(
            form.housingAllowance || 0
          ),
          transportAllowance: Number(
            form.transportAllowance || 0
          ),
          utilityAllowance: Number(
            form.utilityAllowance || 0
          ),
          productivityAllowance: Number(
            form.productivityAllowance || 0
          ),
          communicationAllowance: Number(
            form.communicationAllowance || 0
          ),
          inconvenienceAllowance: Number(
            form.inconvenienceAllowance || 0
          ),
          tax: Number(form.tax || 0),
          pension: Number(form.pension || 0),
        },
      }).unwrap();

      toast.success(
        "Salary definition updated successfully! 🎉"
      );

      router.push("/payroll");
    } catch (error: any) {
      console.error("UPDATE SALARY ERROR:", error);

      toast.error(
        error?.data?.message ||
          "Failed to update salary definition."
      );
    }
  };

  // Loading
  if (isFetching) {
    return (
      <div className="space-y-5 max-w-5xl mx-auto">
        <div className="h-5 w-20 bg-slate-200 rounded animate-pulse" />

        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8 space-y-8 animate-pulse">
          <div className="space-y-3">
            <div className="h-6 w-56 bg-slate-200 rounded" />
            <div className="h-4 w-80 bg-slate-200 rounded" />
          </div>

          <div className="h-12 w-full bg-slate-200 rounded-xl" />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="h-12 bg-slate-200 rounded-xl"
              />
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="h-20 bg-slate-200 rounded-xl"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Not found
  if (!salaryDefinition) {
    return (
      <div className="space-y-5 max-w-5xl mx-auto">
        <Link
          href="/payroll"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-blue-600"
        >
          <ArrowLeft size={16} />
          Back
        </Link>

        <div className="py-16 text-center text-rose-500 text-sm">
          Salary definition not found.
        </div>
      </div>
    );
  }

  const staff = salaryDefinition.staff;

  return (
    <div className="space-y-5 max-w-5xl mx-auto">
      {/* Back */}
      <Link
        href="/payroll"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors"
      >
        <ArrowLeft size={16} />
        Back
      </Link>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        {/* Header */}
        <div className="px-6 sm:px-8 py-6 border-b border-slate-100">
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
            Edit Salary Definition
          </h1>

          <p className="text-sm text-slate-400 mt-1">
            {staff?.firstName} {staff?.lastName} ·{" "}
            {staff?.staffId} · {staff?.designation}
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-6 sm:p-8 space-y-8"
        >
          {/* Basic Salary */}
          <div>
            <label className={labelClass}>
              Basic salary
            </label>

            <input
              type="number"
              min="0"
              step="0.01"
              value={form.basicSalary}
              onChange={handleChange("basicSalary")}
              className={inputClass}
              required
            />
          </div>

          {/* Allowances */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-4">
              Allowances
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <div>
                <label className={labelClass}>
                  Housing allowance
                </label>

                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={form.housingAllowance}
                  onChange={handleChange(
                    "housingAllowance"
                  )}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>
                  Transport allowance
                </label>

                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={form.transportAllowance}
                  onChange={handleChange(
                    "transportAllowance"
                  )}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>
                  Utility allowance
                </label>

                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={form.utilityAllowance}
                  onChange={handleChange(
                    "utilityAllowance"
                  )}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>
                  Productivity allowance
                </label>

                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={form.productivityAllowance}
                  onChange={handleChange(
                    "productivityAllowance"
                  )}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>
                  Communication allowance
                </label>

                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={form.communicationAllowance}
                  onChange={handleChange(
                    "communicationAllowance"
                  )}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>
                  Inconvenience allowance
                </label>

                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={form.inconvenienceAllowance}
                  onChange={handleChange(
                    "inconvenienceAllowance"
                  )}
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          {/* Deductions */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-4">
              Deductions
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <div>
                <label className={labelClass}>
                  Tax
                </label>

                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={form.tax}
                  onChange={handleChange("tax")}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>
                  Pension
                </label>

                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={form.pension}
                  onChange={handleChange("pension")}
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-100">
            <div>
              <p className="text-xs font-semibold text-slate-500">
                Gross Salary
              </p>

              <p className="text-lg font-bold text-slate-900 mt-1">
                {formatNaira(grossSalary)}
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold text-slate-500">
                Total Deductions
              </p>

              <p className="text-lg font-bold text-rose-500 mt-1">
                {formatNaira(totalDeductions)}
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold text-slate-500">
                Net Salary
              </p>

              <p className="text-lg font-bold text-emerald-600 mt-1">
                {formatNaira(netSalary)}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-end pt-6 border-t border-slate-100">
            <Link href="/payroll">
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
              className="w-full sm:w-auto px-8 py-2.5 bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-semibold text-sm rounded-xl shadow-md shadow-indigo-100 hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {isUpdating
                ? "Updating..."
                : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
