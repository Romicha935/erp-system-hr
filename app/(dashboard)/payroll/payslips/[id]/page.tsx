"use client";

import React, { use } from "react";
import Link from "next/link";

export default function PayslipDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-10">
      {/* Back Button */}
      <Link href="/payroll" className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:underline">
        ‹ Back
      </Link>

      {/* Staff Info Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Abubakar Alghazali</h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Managing Director <span className="mx-1">|</span> MD/CEO
          </p>
        </div>
        <Link href={`/payroll/payslips/create`}>
          <button className="px-6 py-2.5 bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-medium text-xs rounded-xl shadow-md hover:opacity-90 transition-opacity">
            Edit payslip
          </button>
        </Link>
      </div>

      {/* Salary Payslip Card Details */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-6">
        <div>
          <h2 className="text-base font-bold text-slate-900">Salary Payslip</h2>
          <div className="flex gap-6 text-xs text-slate-600 font-medium mt-2">
            <span>Month: <strong className="text-slate-800">January</strong></span>
            <span>Year: <strong className="text-slate-800">2023</strong></span>
          </div>
        </div>

        {/* 2-Column Table Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          {/* Column 1: Salary Structure */}
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <table className="w-full text-xs">
              <thead className="bg-slate-800 text-white font-semibold">
                <tr>
                  <th className="p-3 text-left">Salary Structure</th>
                  <th className="p-3 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                <tr><td className="p-3">Basic Salary</td><td className="p-3 text-right font-semibold">445,331</td></tr>
                <tr><td className="p-3">Housing Allowance</td><td className="p-3 text-right font-semibold">222,666</td></tr>
                <tr><td className="p-3">Transport Allowance</td><td className="p-3 text-right font-semibold">89,066</td></tr>
                <tr><td className="p-3">Utility Allowance</td><td className="p-3 text-right font-semibold">44,533</td></tr>
                <tr><td className="p-3">Productivity Allowance</td><td className="p-3 text-right font-semibold">89,066</td></tr>
                <tr><td className="p-3">Communication Allowance</td><td className="p-3 text-right font-semibold">66,800</td></tr>
                <tr><td className="p-3">Inconvenience allowance</td><td className="p-3 text-right font-semibold">66,800</td></tr>
                <tr className="bg-slate-50 font-bold text-slate-900">
                  <td className="p-3">Gross Salary</td>
                  <td className="p-3 text-right">1,024,261</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Column 2: Deductions & Net Salary */}
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
                  <tr><td className="p-3">Tax/PAYE</td><td className="p-3 text-right font-semibold">163,696</td></tr>
                  <tr><td className="p-3">Employee Pension</td><td className="p-3 text-right font-semibold">60,565</td></tr>
                  <tr><td className="p-3 font-semibold">Total Deduction</td><td className="p-3 text-right font-bold">224,261</td></tr>
                  <tr className="bg-blue-50/50 font-bold text-blue-900 border-2 border-blue-400">
                    <td className="p-3">Net Salary</td>
                    <td className="p-3 text-right text-sm font-extrabold">800,000</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Net Salary in Words */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs">
              <span className="font-semibold text-slate-500">Net Salary in Words: </span>
              <span className="font-bold text-slate-800">Eight Hundred Thousand Naira Only</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}