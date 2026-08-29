// app/(dashboard)/payroll/payslips/create/page.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { ArrowLeft } from "lucide-react";
import { useGetStaffQuery } from "@/app/redux/dashboard/staffApi";
import { useCreatePayslipMutation } from "@/app/redux/dashboard/payroll/payslipApi";

const inputClass =
  "w-full px-3.5 py-2.5 text-sm text-slate-900 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all";
const labelClass = "text-xs font-semibold text-slate-700 block mb-1.5";

const monthOptions = [
  { value: 1, label: "January" },
  { value: 2, label: "February" },
  { value: 3, label: "March" },
  { value: 4, label: "April" },
  { value: 5, label: "May" },
  { value: 6, label: "June" },
  { value: 7, label: "July" },
  { value: 8, label: "August" },
  { value: 9, label: "September" },
  { value: 10, label: "October" },
  { value: 11, label: "November" },
  { value: 12, label: "December" },
];

const currentYear = new Date().getFullYear();
const yearOptions = Array.from({ length: 6 }, (_, i) => currentYear - 3 + i);

export default function CreatePayslipPage() {
  const router = useRouter();

  const [staffId, setStaffId] = useState("");
  const [month, setMonth] = useState<number | "">("");
  const [year, setYear] = useState<number | "">(currentYear);
  const [tax, setTax] = useState("");
  const [pension, setPension] = useState("");

  const { data: staffData, isLoading: isStaffLoading } = useGetStaffQuery({ limit: 100 });
  const [createPayslip, { isLoading }] = useCreatePayslipMutation();

  const staffList = staffData?.data ?? [];

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   if (!staffId || !month || !year) {
  //     toast.error("Please fill in all required fields");
  //     return;
  //   }

  //   try {
  //     const result = await createPayslip({
  //       staffId,
  //       month: Number(month),
  //       year: Number(year),
  //       tax: tax ? Number(tax) : 0,
  //       pension: pension ? Number(pension) : 0,
  //     }).unwrap();

  //     toast.success("Payslip created successfully!");
  //     router.push(`/payroll/payslips/${result.data.id}`);
  //   } catch (error: any) {
  //     toast.error(error?.data?.message || "Failed to create payslip.");
  //   }
  // };


  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!staffId || !month || !year) {
    toast.error("Please fill in all required fields");
    return;
  }

  try {
    const result = await createPayslip({
      staffId,
      month: Number(month),
      year: Number(year),
      tax: tax ? Number(tax) : 0,
      pension: pension ? Number(pension) : 0,
    }).unwrap();

    console.log("CREATE PAYSLIP RESPONSE:", result);

    toast.success("Payslip created successfully!");

    if (result?.data?.id) {
      router.push(`/payroll/payslips/${result.data.id}`);
    } else {
      router.push("/payroll");
    }
  } catch (error: any) {
    console.error("CREATE PAYSLIP ERROR:", error);

    toast.error(
      error?.data?.message ||
        error?.error?.message ||
        "Failed to create payslip."
    );
  }
};
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
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Create Payslip</h1>
          <p className="text-sm text-slate-400 mt-1">
            Select a staff member, period, and applicable deductions
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
          <div>
            <label className={labelClass}>Staff member</label>
            <select
              value={staffId}
              onChange={(e) => setStaffId(e.target.value)}
              className={inputClass}
              disabled={isStaffLoading}
              required
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

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Month</label>
              <select
                value={month}
                onChange={(e) => setMonth(e.target.value ? Number(e.target.value) : "")}
                className={inputClass}
                required
              >
                <option value="">Select month</option>
                {monthOptions.map((m) => (
                  <option key={m.value} value={m.value}>
                    {m.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className={labelClass}>Year</label>
              <select
                value={year}
                onChange={(e) => setYear(e.target.value ? Number(e.target.value) : "")}
                className={inputClass}
                required
              >
                {yearOptions.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Tax</label>
              <input
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
                value={tax}
                onChange={(e) => setTax(e.target.value)}
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
                value={pension}
                onChange={(e) => setPension(e.target.value)}
                className={inputClass}
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-end pt-6 border-t border-slate-100">
            <Link href="/payroll">
              <button
                type="button"
                className="w-full sm:w-auto px-6 py-2.5 text-sm font-semibold cursor-pointer text-slate-600 bg-slate-100 rounded-md hover:bg-slate-200 transition-colors"
              >
                Cancel
              </button>
            </Link>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full sm:w-auto px-8 py-2.5 bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-semibold text-sm rounded-md shadow-md cursor-pointer shadow-indigo-100 hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {isLoading ? "Generating..." : "Create Payslip"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}