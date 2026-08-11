"use client";

import React from "react";

interface MetricCardProps {
  title: string;
  amount: string;
  subtext?: string;
  iconBg: string;
}

const metricsData: MetricCardProps[] = [
  { title: "Total annual budget", amount: "₦23,000,000", subtext: "5% more than last year", iconBg: "bg-sky-100 text-sky-600" },
  { title: "Amount used, YTD", amount: "₦10,000,000", iconBg: "bg-amber-100 text-amber-600" },
  { title: "Total budget balance", amount: "₦13,000,000", iconBg: "bg-purple-100 text-purple-600" },
  { title: "Budget % used", amount: "48%", iconBg: "bg-emerald-100 text-emerald-600" },
];

export const BudgetMetrics: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {metricsData.map((item, index) => (
        <div key={index} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-black text-slate-900">{item.amount}</h2>
              <p className="text-xs font-semibold text-slate-500 mt-0.5">{item.title}</p>
            </div>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm ${item.iconBg}`}>
              💰
            </div>
          </div>
          {item.subtext && (
            <div className="flex items-center gap-1 text-[11px] font-medium text-emerald-600">
              <span>↑</span>
              <span>{item.subtext}</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};