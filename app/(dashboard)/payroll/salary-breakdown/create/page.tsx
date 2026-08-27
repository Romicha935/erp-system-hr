// app/(dashboard)/payroll/salary-breakdown/create/page.tsx
"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { ArrowLeft } from "lucide-react";
import { useGetStaffQuery } from "@/app/redux/dashboard/staffApi";
import { useCreateSalaryDefinitionMutation } from "@/app/redux/dashboard/payroll/sallaryDefinitionApi";


interface FormState {
  staffId: string;
  basicSalary: string;
  housingAllowance: string;
  transportAllowance: string;
  utilityAllowance: string;
  productivityAllowance: string;
  communicationAllowance: string;
  inconvenienceAllowance: string;
  tax: string;
  pension: string;
  deductions: string;
}

const initialState: FormState = {
  staffId: "",
  basicSalary: "",
  housingAllowance: "",
  transportAllowance: "",
  utilityAllowance: "",
  productivityAllowance: "",
  communicationAllowance: "",
  inconvenienceAllowance: "",
  tax: "",
  pension: "",
  deductions: "",
};

const inputClass =
  "w-full px-4 py-2.5 text-sm text-slate-900 bg-slate-50 border border-slate-400 rounded-md outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all placeholder:text-slate-400";
const labelClass = "text-xs font-semibold text-slate-700 block mb-1.5";

export default function CreateSalaryDefinitionPage() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(initialState);

  const { data: staffData, isLoading: isStaffLoading } = useGetStaffQuery({ limit: 100 });
  const [createSalaryDefinition, { isLoading }] = useCreateSalaryDefinitionMutation();

  const staffList = staffData?.data ?? [];

  const num = (v: string) => parseFloat(v || "0") || 0;

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
    return num(form.tax) + num(form.pension) + num(form.deductions);
  }, [form]);

  const netSalary = grossSalary - totalDeductions;

  const formatNaira = (v: number) =>
    `₦${v.toLocaleString("en-NG", { minimumFractionDigits: 2 })}`;

  const handleChange = (field: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [field]: e.target.value });
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!form.staffId) {
    toast.error("Please select a staff member");
    return;
  }

  try {
    await createSalaryDefinition({
      staffId: form.staffId,

      basicSalary: Number(form.basicSalary || 0),
      housingAllowance: Number(form.housingAllowance || 0),
      transportAllowance: Number(form.transportAllowance || 0),
      utilityAllowance: Number(form.utilityAllowance || 0),
      productivityAllowance: Number(form.productivityAllowance || 0),
      communicationAllowance: Number(form.communicationAllowance || 0),
      inconvenienceAllowance: Number(form.inconvenienceAllowance || 0),

      tax: Number(form.tax || 0),
      pension: Number(form.pension || 0),
      deductions: Number(form.deductions || 0),
    }).unwrap();

    toast.success("Salary definition created successfully!");
    router.push("/payroll");
  } catch (error: any) {
    console.log("Create salary error:", error);

    toast.error(
      error?.data?.message || "Failed to create salary definition."
    );
  }
};

  return (
    <div className="space-y-5 max-w-5xl mx-auto">
      <Link
        href="/payroll"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors"
      >
        <ArrowLeft size={16} />
        Back
      </Link>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="px-6 sm:px-8 py-6 border-b border-slate-100">
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
            Create Salary Definition
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Set the salary breakdown for a staff member
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-8">
          {/* Staff select */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelClass}>Staff member</label>
              <select
                value={form.staffId}
                onChange={handleChange("staffId")}
                className={inputClass}
                required
                disabled={isStaffLoading}
              >
                <option value="">
                  {isStaffLoading ? "Loading staff..." : "Select staff member"}
                </option>
                {staffList.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.firstName} {s.lastName} ({s.staffId})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass}>Basic salary</label>
              <input
                type="number"
                min="0"
                step="0.01"
                placeholder="Enter amount in Naira"
                value={form.basicSalary}
                onChange={handleChange("basicSalary")}
                className={inputClass}
                required
              />
            </div>
          </div>

          {/* Allowances */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-4">Allowances</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <div>
                <label className={labelClass}>Housing allowance</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  value={form.housingAllowance}
                  onChange={handleChange("housingAllowance")}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Transport allowance</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  value={form.transportAllowance}
                  onChange={handleChange("transportAllowance")}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Utility allowance</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  value={form.utilityAllowance}
                  onChange={handleChange("utilityAllowance")}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Productivity allowance</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  value={form.productivityAllowance}
                  onChange={handleChange("productivityAllowance")}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Communication allowance</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  value={form.communicationAllowance}
                  onChange={handleChange("communicationAllowance")}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Inconvenience allowance</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  value={form.inconvenienceAllowance}
                  onChange={handleChange("inconvenienceAllowance")}
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          {/* Deductions */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-4">Deductions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <div>
                <label className={labelClass}>Tax</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  value={form.tax}
                  onChange={handleChange("tax")}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Pension</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  value={form.pension}
                  onChange={handleChange("pension")}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Other deductions</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  value={form.deductions}
                  onChange={handleChange("deductions")}
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-100">
            <div>
              <p className="text-xs font-semibold text-slate-500">Gross Salary</p>
              <p className="text-lg font-bold text-slate-900 mt-1">{formatNaira(grossSalary)}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500">Total Deductions</p>
              <p className="text-lg font-bold text-rose-500 mt-1">{formatNaira(totalDeductions)}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500">Net Salary</p>
              <p className="text-lg font-bold text-emerald-600 mt-1">{formatNaira(netSalary)}</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-end pt-2 border-t border-slate-100 pt-6">
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
              disabled={isLoading}
              className="w-full sm:w-auto px-8 py-2.5 bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-semibold text-sm rounded-xl shadow-md shadow-indigo-100 hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {isLoading ? "Creating..." : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}