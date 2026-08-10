"use client";

import React from "react";
import Link from "next/link";

interface PayrollHistoryItem {
  id: string;
  sn: string;
  paymentName: string;
  designation: string;
  dateGenerated: string;
  paymentMonth: string;
  paymentYear: string;
  status: "Pending" | "Paid";
}

const mockPayrollHistory: PayrollHistoryItem[] = [
  { id: "1", sn: "01", paymentName: "Monthly salary", designation: "Operations Department", dateGenerated: "30/01/2023", paymentMonth: "January", paymentYear: "2023", status: "Pending" },
  { id: "2", sn: "01", paymentName: "Monthly salary", designation: "Accounts Department", dateGenerated: "30/12/2023", paymentMonth: "January", paymentYear: "2023", status: "Pending" },
  { id: "3", sn: "01", paymentName: "Monthly salary", designation: "Operations Department", dateGenerated: "30/11/2022", paymentMonth: "November", paymentYear: "2022", status: "Paid" },
  { id: "4", sn: "01", paymentName: "Monthly salary", designation: "Operations Department", dateGenerated: "30/01/2023", paymentMonth: "January", paymentYear: "2022", status: "Paid" },
  { id: "5", sn: "01", paymentName: "Monthly salary", designation: "Operations Department", dateGenerated: "30/01/2023", paymentMonth: "January", paymentYear: "2022", status: "Paid" },
];

export const PayrollHistoryTable: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h2 className="text-xl font-bold text-slate-900">Employee Payroll History</h2>
        <Link href="/payroll/generate">
          <button className="px-5 py-2.5 bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-medium text-xs rounded-xl shadow-md hover:opacity-90 transition-opacity">
            Generate Payroll
          </button>
        </Link>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-slate-100 text-slate-400 font-bold">
              <th className="pb-3 min-w-[40px]">S/N</th>
              <th className="pb-3 min-w-[120px]">Payment name</th>
              <th className="pb-3 min-w-[160px]">Designation</th>
              <th className="pb-3 min-w-[110px]">Date generated</th>
              <th className="pb-3 min-w-[110px]">Payment month</th>
              <th className="pb-3 min-w-[100px]">Payment year</th>
              <th className="pb-3 min-w-[90px]">Status</th>
              <th className="pb-3 text-right min-w-[80px]">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 text-slate-700 font-medium">
            {mockPayrollHistory.map((row, idx) => (
              <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                <td className="py-3.5 text-slate-400">{row.sn}</td>
                <td className="py-3.5 font-semibold text-slate-800">{row.paymentName}</td>
                <td className="py-3.5 text-slate-600">{row.designation}</td>
                <td className="py-3.5 text-slate-600">{row.dateGenerated}</td>
                <td className="py-3.5">{row.paymentMonth}</td>
                <td className="py-3.5">{row.paymentYear}</td>
                <td className="py-3.5">
                  <span
                    className={`inline-flex items-center gap-1 font-semibold ${
                      row.status === "Pending" ? "text-amber-500" : "text-emerald-500"
                    }`}
                  >
                    {row.status === "Pending" ? "✓" : "✓"} {row.status}
                  </span>
                </td>
                <td className="py-3.5 text-right">
                  <button className="text-blue-600 font-semibold hover:underline">
                    View more
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};