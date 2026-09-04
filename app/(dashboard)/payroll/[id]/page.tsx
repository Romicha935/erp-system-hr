// app/(dashboard)/payroll/[id]/page.tsx
"use client";

import React, { use } from "react";
import Link from "next/link";
import { useGetPayrollByIdQuery } from "@/app/redux/dashboard/payroll/payrollApi";

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const statusStyle: Record<string, string> = {
  DRAFT: "text-amber-500 bg-amber-50",
  PROCESSED: "text-sky-600 bg-sky-50",
  PAID: "text-emerald-600 bg-emerald-50",
};

export default function PayrollDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { data, isLoading } = useGetPayrollByIdQuery(id);

  const formatCurrency = (value: string) =>
    `₦${parseFloat(value).toLocaleString("en-NG", { minimumFractionDigits: 2 })}`;

  const formatDate = (value: string) => new Date(value).toLocaleDateString("en-GB");

  if (isLoading) {
    return <div className="py-16 text-center text-slate-400 text-sm">Loading payroll...</div>;
  }

  if (!data?.data) {
    return <div className="py-16 text-center text-rose-500 text-sm">Payroll not found.</div>;
  }

  const payroll = data.data;
  const totalNet = payroll.items.reduce((sum, item) => sum + parseFloat(item.netSalary || "0"), 0);
  const totalGross = payroll.items.reduce((sum, item) => sum + parseFloat(item.grossSalary || "0"), 0);

  return (
    <div className="space-y-6 w-full mx-auto pb-10">
      <Link href="/payroll" className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:underline">
        ‹ Back
      </Link>

      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">{payroll.paymentName}</h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            {payroll.designation} <span className="mx-1">|</span>{" "}
            {monthNames[payroll.month - 1]} {payroll.year} <span className="mx-1">|</span>{" "}
            Generated {formatDate(payroll.createdAt)}
          </p>
        </div>
        <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-bold ${statusStyle[payroll.status]}`}>
          {payroll.status}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
          <p className="text-xs font-semibold text-slate-500">Total Staff</p>
          <p className="text-2xl font-black text-slate-900 mt-1">{payroll.items.length}</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
          <p className="text-xs font-semibold text-slate-500">Total Gross</p>
          <p className="text-2xl font-black text-slate-900 mt-1">{formatCurrency(totalGross.toString())}</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
          <p className="text-xs font-semibold text-slate-500">Total Net Payable</p>
          <p className="text-2xl font-black text-emerald-600 mt-1">{formatCurrency(totalNet.toString())}</p>
        </div>
      </div>

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
                <th className="pb-3 min-w-[90px]">Tax</th>
                <th className="pb-3 min-w-[90px]">Pension</th>
                <th className="pb-3 min-w-[90px]">Deduction</th>
                <th className="pb-3 min-w-[100px]">Net Salary</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-slate-700 font-medium">
              {payroll.items.map((item, idx) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-3.5 text-slate-400">{idx + 1}</td>
                  <td className="py-3.5 font-semibold text-slate-800">
                    {item.staff ? `${item.staff.firstName} ${item.staff.lastName}` : "—"}
                  </td>
                  <td className="py-3.5 text-slate-600">{item.staff?.designation ?? "—"}</td>
                  <td className="py-3.5">{formatCurrency(item.basicSalary)}</td>
                  <td className="py-3.5">{formatCurrency(item.grossSalary)}</td>
                  <td className="py-3.5">{formatCurrency(item.tax)}</td>
                  <td className="py-3.5">{formatCurrency(item.pension)}</td>
                  <td className="py-3.5">{formatCurrency(item.deductions)}</td>
                  <td className="py-3.5 font-bold text-slate-900">{formatCurrency(item.netSalary)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}