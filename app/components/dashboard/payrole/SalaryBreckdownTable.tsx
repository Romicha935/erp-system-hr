"use client";

import React from "react";
import Link from "next/link";

const salaryData = [
  { sn: "01", title: "Managing Director", level: "MD/CEO", basic: "₦445,331.00", allowance: "₦600,000.00", gross: "₦1,145,331.00", deductions: "₦224,000.00", net: "₦224,000.00" },
  { sn: "02", title: "Executive Director", level: "ED", basic: "₦395,000.00", allowance: "₦197,500.00", gross: "₦1,145,331.00", deductions: "₦224,000.00", net: "₦224,000.00" },
  { sn: "03", title: "General Manager", level: "GM", basic: "₦445,331.00", allowance: "₦600,000.00", gross: "₦1,145,331.00", deductions: "₦224,000.00", net: "₦224,000.00" },
];

export const SalaryBreakdownTable = () => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-900">Salary Definition</h2>
        <Link href="/payroll/salary-breakdown/create">
          <button className="px-5 py-2.5 bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-medium text-xs rounded-xl shadow-md hover:opacity-90">
            Create Salary Definition
          </button>
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-slate-100 text-slate-400 font-bold">
              <th className="pb-3">S/N</th>
              <th className="pb-3">Title</th>
              <th className="pb-3">Level</th>
              <th className="pb-3">Basic Salary</th>
              <th className="pb-3">Allowance</th>
              <th className="pb-3">Gross Salary</th>
              <th className="pb-3">Deductions</th>
              <th className="pb-3">Net Salary</th>
              <th className="pb-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 text-slate-700 font-medium">
            {salaryData.map((row) => (
              <tr key={row.sn} className="hover:bg-slate-50/50">
                <td className="py-3.5 text-slate-400">{row.sn}</td>
                <td className="py-3.5 font-semibold text-slate-800">{row.title}</td>
                <td className="py-3.5">{row.level}</td>
                <td className="py-3.5">{row.basic}</td>
                <td className="py-3.5">{row.allowance}</td>
                <td className="py-3.5">{row.gross}</td>
                <td className="py-3.5">{row.deductions}</td>
                <td className="py-3.5 font-bold text-slate-900">{row.net}</td>
                <td className="py-3.5 text-right space-x-3">
                  <button className="text-blue-600 font-semibold hover:underline">Edit</button>
                  <button className="text-rose-500 font-semibold hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};