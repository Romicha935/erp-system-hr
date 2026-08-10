"use client";

import React from "react";
import Link from "next/link";

interface PayslipItem {
  id: string;
  sn: string;
  staffName: string;
  title: string;
  level: string;
  basicSalary: string;
  allowances: string;
  grossSalary: string;
  deduction: string;
  netSalary: string;
}

const mockPayslips: PayslipItem[] = [
  { id: "1", sn: "01", staffName: "Abubakar Alghazali", title: "Managing Director", level: "MD/CEO", basicSalary: "₦445,331.00", allowances: "₦600,000.00", grossSalary: "₦1,145,331.00", deduction: "₦224,000.00", netSalary: "₦224,000.00" },
  { id: "2", sn: "01", staffName: "Fatima Mohammed", title: "Managing Director", level: "MD/CEO", basicSalary: "₦445,331.00", allowances: "₦600,000.00", grossSalary: "₦1,145,331.00", deduction: "₦224,000.00", netSalary: "₦224,000.00" },
  { id: "3", sn: "01", staffName: "Ibrahim Bankole", title: "Managing Director", level: "MD/CEO", basicSalary: "₦445,331.00", allowances: "₦600,000.00", grossSalary: "₦1,145,331.00", deduction: "₦224,000.00", netSalary: "₦224,000.00" },
  { id: "4", sn: "01", staffName: "Sadiq Sadiq", title: "Managing Director", level: "MD/CEO", basicSalary: "₦445,331.00", allowances: "₦600,000.00", grossSalary: "₦1,145,331.00", deduction: "₦224,000.00", netSalary: "₦224,000.00" },
  { id: "5", sn: "01", staffName: "James Emmanuel", title: "Managing Director", level: "MD/CEO", basicSalary: "₦445,331.00", allowances: "₦600,000.00", grossSalary: "₦1,145,331.00", deduction: "₦224,000.00", netSalary: "₦224,000.00" },
];

export const PayslipsTable: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-6">
      {/* Top Action Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h2 className="text-xl font-bold text-slate-900">Employee Payslip History</h2>
        <Link href="/payroll/payslips/create">
          <button className="px-5 py-2.5 bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-medium text-xs rounded-xl shadow-md hover:opacity-90 transition-opacity">
            Create payslip
          </button>
        </Link>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-slate-100 text-slate-400 font-bold">
              <th className="pb-3 min-w-[40px]">S/N</th>
              <th className="pb-3 min-w-[140px]">Staff Name</th>
              <th className="pb-3 min-w-[130px]">Title</th>
              <th className="pb-3 min-w-[80px]">Level</th>
              <th className="pb-3 min-w-[100px]">Basic Salary</th>
              <th className="pb-3 min-w-[100px]">Allowances</th>
              <th className="pb-3 min-w-[100px]">Gross Salary</th>
              <th className="pb-3 min-w-[90px]">Deduction</th>
              <th className="pb-3 min-w-[100px]">Net Salary</th>
              <th className="pb-3 text-right min-w-[80px]">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 text-slate-700 font-medium">
            {mockPayslips.map((row, idx) => (
              <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                <td className="py-3.5 text-slate-400">{row.sn}</td>
                <td className="py-3.5 font-semibold text-slate-800">{row.staffName}</td>
                <td className="py-3.5 text-slate-600">{row.title}</td>
                <td className="py-3.5 text-slate-600">{row.level}</td>
                <td className="py-3.5">{row.basicSalary}</td>
                <td className="py-3.5">{row.allowances}</td>
                <td className="py-3.5">{row.grossSalary}</td>
                <td className="py-3.5">{row.deduction}</td>
                <td className="py-3.5 font-bold text-slate-900">{row.netSalary}</td>
                <td className="py-3.5 text-right">
                  <Link href={`/payroll/payslips/${row.id}`} className="text-blue-600 font-semibold hover:underline">
                    View more
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};