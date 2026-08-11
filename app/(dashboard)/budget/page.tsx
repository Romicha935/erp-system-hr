"use client";

import React from "react";
import Link from "next/link";
import { BudgetMetrics } from "@/app/components/dashboard/budget/Budgetmatrics";


interface BudgetHistoryItem {
  id: string;
  sn: string;
  budgetNo: string;
  description: string;
  budgetedAmount: string;
  actualAmount: string;
  variance: string;
  isPositive: boolean;
  date: string;
}

const budgetHistoryList: BudgetHistoryItem[] = [
  { id: "1", sn: "01", budgetNo: "00211235", description: "Purchase of 10 units, 2Hp Hisense Air Conditions", budgetedAmount: "1,400,000.00", actualAmount: "1,380,000.00", variance: "20,000.00", isPositive: true, date: "18/11/2022" },
  { id: "2", sn: "02", budgetNo: "36211235", description: "Purchase of office equipments", budgetedAmount: "400,000.00", actualAmount: "500,000.00", variance: "100,000.00", isPositive: false, date: "20/09/2022" },
  { id: "3", sn: "03", budgetNo: "00211235", description: "Purchase of 10 units, 2Hp Hisense Air Conditions", budgetedAmount: "2,000,000.00", actualAmount: "1,800,000.00", variance: "200,000.00", isPositive: true, date: "01/09/2022" },
  { id: "4", sn: "04", budgetNo: "00214465", description: "Purchase of 10 units, 2Hp Hisense Air Conditions", budgetedAmount: "1,400,000.00", actualAmount: "1,380,000.00", variance: "20,000.00", isPositive: true, date: "11/05/2022" },
  { id: "5", sn: "05", budgetNo: "36211235", description: "Purchase of office equipments", budgetedAmount: "400,000.00", actualAmount: "500,000.00", variance: "100,000.00", isPositive: false, date: "20/09/2022" },
  { id: "6", sn: "06", budgetNo: "00211235", description: "Purchase of 10 units, 2Hp Hisense Air Conditions", budgetedAmount: "1,400,000.00", actualAmount: "1,380,000.00", variance: "20,000.00", isPositive: true, date: "18/11/2022" },
  { id: "7", sn: "07", budgetNo: "00211235", description: "Purchase of 10 units, 2Hp Hisense Air Conditions", budgetedAmount: "1,400,000.00", actualAmount: "1,380,000.00", variance: "20,000.00", isPositive: true, date: "18/11/2022" },
];

export default function BudgetPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Top Metrics */}
      <BudgetMetrics />

      {/* Banner Action Section */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
        <h2 className="text-base font-bold text-slate-900">Create a Budget</h2>
        <Link href="/budget/create">
          <button className="px-6 py-2.5 bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-semibold text-xs rounded-xl shadow-md hover:opacity-90 transition-opacity">
            Create Budget
          </button>
        </Link>
      </div>

      {/* Table Section */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-6">
        <h3 className="text-base font-bold text-slate-900">Budget History</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 font-bold">
                <th className="pb-3 min-w-[40px]">S/N</th>
                <th className="pb-3 min-w-[100px]">Budget No.</th>
                <th className="pb-3 min-w-[280px]">Budget Description</th>
                <th className="pb-3 min-w-[130px]">Budgeted Amount (₦)</th>
                <th className="pb-3 min-w-[130px]">Actual Amount (₦)</th>
                <th className="pb-3 min-w-[110px]">Variance (₦)</th>
                <th className="pb-3 min-w-[100px]">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-slate-700 font-medium">
              {budgetHistoryList.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-3.5 text-slate-400">{row.sn}</td>
                  <td className="py-3.5 text-slate-600">{row.budgetNo}</td>
                  <td className="py-3.5 font-semibold text-slate-800">{row.description}</td>
                  <td className="py-3.5 text-slate-800">{row.budgetedAmount}</td>
                  <td className="py-3.5 text-slate-800">{row.actualAmount}</td>
                  <td className={`py-3.5 font-semibold ${row.isPositive ? "text-emerald-600" : "text-rose-500"}`}>
                    {row.isPositive ? `+ ${row.variance}` : `- ${row.variance}`}
                  </td>
                  <td className="py-3.5 text-slate-600">{row.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}