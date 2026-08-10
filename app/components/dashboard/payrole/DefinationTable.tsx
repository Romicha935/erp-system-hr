"use client";

import React from "react";
import Link from "next/link";

const taxData = [
  { sn: "01", taxType: "NHIS", value: "2%" },
  { sn: "02", taxType: "VAT", value: "2.5%" },
  { sn: "03", taxType: "WHT", value: "5%" },
];

export const TaxDefinitionsTable = () => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-900">Tax Definitions</h2>
        <Link href="/payroll/tax-definitions/create">
          <button className="px-5 py-2.5 bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-medium text-xs rounded-xl shadow-md hover:opacity-90">
            Create Tax Definition
          </button>
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-slate-100 text-slate-400 font-bold">
              <th className="pb-3 w-16">S/N</th>
              <th className="pb-3">Tax Type</th>
              <th className="pb-3">% value</th>
              <th className="pb-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 text-slate-700 font-medium">
            {taxData.map((row) => (
              <tr key={row.sn} className="hover:bg-slate-50/50">
                <td className="py-3.5 text-slate-400">{row.sn}</td>
                <td className="py-3.5 font-semibold text-slate-800">{row.taxType}</td>
                <td className="py-3.5 font-bold text-slate-900">{row.value}</td>
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