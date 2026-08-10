"use client";

import React, { useState } from "react";
import Link from "next/link";

interface StaffItem {
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

const staffList: StaffItem[] = [
  { sn: "01", staffName: "Abubakar Alghazali", title: "Managing Director", level: "MD/CEO", basicSalary: "₦445,331.00", allowances: "₦600,000.00", grossSalary: "₦1,145,331.00", deduction: "₦224,000.00", netSalary: "₦224,000.00" },
  { sn: "01", staffName: "Fatima Mohammed", title: "Managing Director", level: "MD/CEO", basicSalary: "₦445,331.00", allowances: "₦600,000.00", grossSalary: "₦1,145,331.00", deduction: "₦224,000.00", netSalary: "₦224,000.00" },
  { sn: "01", staffName: "Ibrahim Bankole", title: "Managing Director", level: "MD/CEO", basicSalary: "₦445,331.00", allowances: "₦600,000.00", grossSalary: "₦1,145,331.00", deduction: "₦224,000.00", netSalary: "₦224,000.00" },
  { sn: "01", staffName: "Sadiq Sadiq", title: "Managing Director", level: "MD/CEO", basicSalary: "₦445,331.00", allowances: "₦600,000.00", grossSalary: "₦1,145,331.00", deduction: "₦224,000.00", netSalary: "₦224,000.00" },
];

export default function GeneratePayrollPage() {
  const [showStaffTable, setShowStaffTable] = useState(false);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setShowStaffTable(true);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-10">
      {/* Back Button */}
      <Link href="/payroll" className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:underline">
        ‹ Back
      </Link>

      {/* Generate Payroll Form Card */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-6">
        <h1 className="text-xl font-bold text-slate-900">Generate Payroll</h1>

        <form onSubmit={handleGenerate} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1.5">Payment name</label>
              <input
                type="text"
                placeholder="Enter payment name"
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50/50 border border-slate-200 rounded-xl outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1.5">Designation</label>
              <select className="w-full px-3.5 py-2.5 text-xs bg-slate-50/50 border border-slate-200 rounded-xl outline-none focus:border-blue-500">
                <option value="">Select designation</option>
                <option value="ops">Operations Department</option>
                <option value="accounts">Accounts Department</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1.5">Date generated</label>
              <input
                type="text"
                readOnly
                value="15/11/2022"
                className="w-full px-3.5 py-2.5 text-xs bg-slate-100 border border-slate-200 rounded-xl text-slate-500 outline-none cursor-not-allowed"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1.5">Payment month</label>
              <select className="w-full px-3.5 py-2.5 text-xs bg-slate-50/50 border border-slate-200 rounded-xl outline-none focus:border-blue-500">
                <option value="">Select month</option>
                <option value="january">January</option>
                <option value="february">February</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1.5">Payment year</label>
              <select className="w-full px-3.5 py-2.5 text-xs bg-slate-50/50 border border-slate-200 rounded-xl outline-none focus:border-blue-500">
                <option value="">Select year</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="px-8 py-3 bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-semibold text-xs rounded-xl shadow-md hover:opacity-90 transition-opacity"
          >
            Generate Payroll
          </button>
        </form>
      </div>

      {/* Staff Details Card (Rendered after generation) */}
      {showStaffTable && (
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-6">
          <h2 className="text-lg font-bold text-slate-900">Staff Details</h2>

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
                {staffList.map((row, idx) => (
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
                      <button className="text-blue-600 font-semibold hover:underline">
                        View more
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button
            type="button"
            className="px-8 py-3 bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-semibold text-xs rounded-xl shadow-md hover:opacity-90 transition-opacity"
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
}