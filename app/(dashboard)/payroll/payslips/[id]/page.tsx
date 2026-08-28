
"use client";

import React, { use } from "react";
import Link from "next/link";
import { useGetPayslipByIdQuery } from "@/app/redux/dashboard/payroll/payslipApi";

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export default function PayslipDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { data, isLoading } = useGetPayslipByIdQuery(id);

  const formatAmount = (value: string | number | null | undefined) => {
    if (value === null || value === undefined || value === "") return "0";
    const num = typeof value === "string" ? parseFloat(value) : value;
    if (isNaN(num)) return "0";
    return num.toLocaleString("en-NG");
  };

  if (isLoading) {
    return <div className="py-16 text-center text-slate-400 text-sm">Loading payslip...</div>;
  }

  if (!data?.data) {
    return <div className="py-16 text-center text-rose-500 text-sm">Payslip not found.</div>;
  }

  const payslip = data.data;
  const staff = payslip.staff;
  const netSalaryNum = parseFloat(payslip.netSalary || "0");

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-10">
      <Link href="/payroll" className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:underline">
        ‹ Back
      </Link>

      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">
            {staff.firstName} {staff.lastName}
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            {staff.designation} <span className="mx-1">|</span> {staff.staffId}
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-6">
        <div>
          <h2 className="text-base font-bold text-slate-900">Salary Payslip</h2>
          <div className="flex gap-6 text-xs text-slate-600 font-medium mt-2">
            <span>
              Month: <strong className="text-slate-800">{monthNames[payslip.month - 1]}</strong>
            </span>
            <span>
              Year: <strong className="text-slate-800">{payslip.year}</strong>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <table className="w-full text-xs">
              <thead className="bg-slate-800 text-white font-semibold">
                <tr>
                  <th className="p-3 text-left">Salary Structure</th>
                  <th className="p-3 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                <tr>
                  <td className="p-3">Basic Salary</td>
                  <td className="p-3 text-right font-semibold">{formatAmount(payslip.basicSalary)}</td>
                </tr>
                <tr>
                  <td className="p-3">Housing Allowance</td>
                  <td className="p-3 text-right font-semibold">{formatAmount(payslip.housingAllowance)}</td>
                </tr>
                <tr>
                  <td className="p-3">Transport Allowance</td>
                  <td className="p-3 text-right font-semibold">{formatAmount(payslip.transportAllowance)}</td>
                </tr>
                <tr>
                  <td className="p-3">Utility Allowance</td>
                  <td className="p-3 text-right font-semibold">{formatAmount(payslip.utilityAllowance)}</td>
                </tr>
                <tr>
                  <td className="p-3">Productivity Allowance</td>
                  <td className="p-3 text-right font-semibold">{formatAmount(payslip.productivityAllowance)}</td>
                </tr>
                <tr>
                  <td className="p-3">Communication Allowance</td>
                  <td className="p-3 text-right font-semibold">{formatAmount(payslip.communicationAllowance)}</td>
                </tr>
                <tr>
                  <td className="p-3">Inconvenience Allowance</td>
                  <td className="p-3 text-right font-semibold">{formatAmount(payslip.inconvenienceAllowance)}</td>
                </tr>
                <tr className="bg-slate-50 font-bold text-slate-900">
                  <td className="p-3">Gross Salary</td>
                  <td className="p-3 text-right">{formatAmount(payslip.grossSalary)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="space-y-6">
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <table className="w-full text-xs">
                <thead className="bg-slate-800 text-white font-semibold">
                  <tr>
                    <th className="p-3 text-left">Deductions</th>
                    <th className="p-3 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                  <tr>
                    <td className="p-3">Tax/PAYE</td>
                    <td className="p-3 text-right font-semibold">{formatAmount(payslip.tax)}</td>
                  </tr>
                  <tr>
                    <td className="p-3">Employee Pension</td>
                    <td className="p-3 text-right font-semibold">{formatAmount(payslip.pension)}</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold">Total Deduction</td>
                    <td className="p-3 text-right font-bold">{formatAmount(payslip.totalDeduction)}</td>
                  </tr>
                  <tr
                    className={`font-bold border-2 ${
                      netSalaryNum < 0
                        ? "bg-rose-50/50 text-rose-700 border-rose-300"
                        : "bg-blue-50/50 text-blue-900 border-blue-400"
                    }`}
                  >
                    <td className="p-3">Net Salary</td>
                    <td className="p-3 text-right text-sm font-extrabold">
                      {formatAmount(payslip.netSalary)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {netSalaryNum < 0 && (
              <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700">
                Net salary is negative. Deductions exceed the gross salary for this period —
                please review the salary definition or deduction values.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}