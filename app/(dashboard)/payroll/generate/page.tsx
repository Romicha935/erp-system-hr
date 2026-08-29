// app/(dashboard)/payroll/generate/page.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { ArrowLeft } from "lucide-react";
import { useGetStaffQuery } from "@/app/redux/dashboard/staffApi";
import { useCreatePayrollMutation, PayrollItem } from "@/app/redux/dashboard/payroll/payrollApi";

const inputClass =
  "w-full px-3.5 py-2.5 text-xs text-slate-900 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 transition-colors";
const labelClass = "text-xs font-semibold text-slate-700 block mb-1.5";

const monthOptions = [
  { value: 1, label: "January" }, { value: 2, label: "February" }, { value: 3, label: "March" },
  { value: 4, label: "April" }, { value: 5, label: "May" }, { value: 6, label: "June" },
  { value: 7, label: "July" }, { value: 8, label: "August" }, { value: 9, label: "September" },
  { value: 10, label: "October" }, { value: 11, label: "November" }, { value: 12, label: "December" },
];

const currentYear = new Date().getFullYear();
const yearOptions = Array.from({ length: 6 }, (_, i) => currentYear - 3 + i);

const designationOptions = ["Operations", "Management", "Customer Service"];

export default function GeneratePayrollPage() {
  const router = useRouter();

  const [paymentName, setPaymentName] = useState("");
  const [designation, setDesignation] = useState("");
  const [month, setMonth] = useState<number | "">("");
  const [year, setYear] = useState<number | "">(currentYear);
  const [selectedStaffIds, setSelectedStaffIds] = useState<string[]>([]);

  const [generatedItems, setGeneratedItems] = useState<PayrollItem[] | null>(null);
  const [generatedId, setGeneratedId] = useState<string | null>(null);

  const { data: staffData, isLoading: isStaffLoading } = useGetStaffQuery({ limit: 100 });
  const [createPayroll, { isLoading }] = useCreatePayrollMutation();

  const staffList = staffData?.data ?? [];

  const formatCurrency = (value: string) =>
    `₦${parseFloat(value).toLocaleString("en-NG", { minimumFractionDigits: 2 })}`;

  const toggleStaff = (id: string) => {
    setSelectedStaffIds((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedStaffIds.length === staffList.length) {
      setSelectedStaffIds([]);
    } else {
      setSelectedStaffIds(staffList.map((s) => s.id));
    }
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!paymentName.trim() || !designation || !month || !year) {
      toast.error("Please fill in all fields");
      return;
    }

    if (selectedStaffIds.length === 0) {
      toast.error("Please select at least one staff member");
      return;
    }

    try {
      const result = await createPayroll({
        paymentName,
        designation,
        month: Number(month),
        year: Number(year),
        items: selectedStaffIds.map((staffId) => ({ staffId })),
      }).unwrap();

      setGeneratedItems(result.data.items);
      setGeneratedId(result.data.id);
      toast.success("Payroll generated successfully!");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to generate payroll.");
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-10">
      <Link
        href="/payroll"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors"
      >
        <ArrowLeft size={16} />
        Back
      </Link>

      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-6">
        <h1 className="text-xl font-bold text-slate-900">Generate Payroll</h1>

        <form onSubmit={handleGenerate} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className={labelClass}>Payment name</label>
              <input
                type="text"
                placeholder="Enter payment name"
                value={paymentName}
                onChange={(e) => setPaymentName(e.target.value)}
                className={inputClass}
                required
              />
            </div>

            <div>
              <label className={labelClass}>Designation</label>
              <select
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
                className={inputClass}
                required
              >
                <option value="">Select designation</option>
                {designationOptions.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className={labelClass}>Payment month</label>
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
              <label className={labelClass}>Payment year</label>
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

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className={labelClass}>Select staff</label>
              <button
                type="button"
                onClick={toggleSelectAll}
                className="text-xs font-semibold text-blue-600 hover:underline"
              >
                {selectedStaffIds.length === staffList.length ? "Deselect all" : "Select all"}
              </button>
            </div>

            <div className="border border-slate-200 rounded-xl max-h-64 overflow-y-auto divide-y divide-slate-100">
              {isStaffLoading ? (
                <div className="p-4 text-center text-xs text-slate-400">Loading staff...</div>
              ) : staffList.length === 0 ? (
                <div className="p-4 text-center text-xs text-slate-400">No staff found.</div>
              ) : (
                staffList.map((s) => (
                  <label
                    key={s.id}
                    className="flex items-center gap-3 px-4 py-2.5 text-xs text-slate-700 hover:bg-slate-50 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedStaffIds.includes(s.id)}
                      onChange={() => toggleStaff(s.id)}
                      className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="font-semibold text-slate-800">
                      {s.firstName} {s.lastName}
                    </span>
                    <span className="text-slate-400">({s.staffId})</span>
                    <span className="text-slate-400 ml-auto">{s.designation}</span>
                  </label>
                ))
              )}
            </div>
            <p className="text-[11px] text-slate-400 mt-1.5">
              {selectedStaffIds.length} staff selected
            </p>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="px-8 py-3 bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-semibold text-xs rounded-md cursor-pointer shadow-md hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {isLoading ? "Generating..." : "Generate Payroll"}
          </button>
        </form>
      </div>

      {generatedItems && (
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-6">
          <h2 className="text-lg font-bold text-slate-900">Staff Details</h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 font-bold">
                  <th className="pb-3 min-w-[40px]">S/N</th>
                  <th className="pb-3 min-w-[140px]">Staff Name</th>
                  <th className="pb-3 min-w-[130px]">Designation</th>
                  <th className="pb-3 min-w-[100px]">Basic Salary</th>
                  <th className="pb-3 min-w-[100px]">Gross Salary</th>
                  <th className="pb-3 min-w-[90px]">Deduction</th>
                  <th className="pb-3 min-w-[100px]">Net Salary</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-slate-700 font-medium">
                {generatedItems.map((item, idx) => (
                  <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-3.5 text-slate-400">{idx + 1}</td>
                    <td className="py-3.5 font-semibold text-slate-800">
                      {item.staff ? `${item.staff.firstName} ${item.staff.lastName}` : "—"}
                    </td>
                    <td className="py-3.5 text-slate-600">{item.staff?.designation ?? "—"}</td>
                    <td className="py-3.5">{formatCurrency(item.basicSalary)}</td>
                    <td className="py-3.5">{formatCurrency(item.grossSalary)}</td>
                    <td className="py-3.5">{formatCurrency(item.deductions)}</td>
                    <td className="py-3.5 font-bold text-slate-900">{formatCurrency(item.netSalary)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button
            type="button"
            onClick={() => router.push(`/payroll/${generatedId}`)}
            className="px-8 py-3 bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-semibold text-xs rounded-xl shadow-md hover:opacity-90 transition-opacity"
          >
            View Payroll Details
          </button>
        </div>
      )}
    </div>
  );
}