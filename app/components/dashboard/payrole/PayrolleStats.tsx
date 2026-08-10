"use client";

import React from "react";

const stats = [
  {
    title: "Gross salary this month",
    amount: "₦5,205,350.00",
    trend: "2% more than last month",
    isUp: true,
    bgIcon: "💰",
  },
  {
    title: "Net salary this month",
    amount: "₦4,550,350.00",
    trend: "2.1% more than last month",
    isUp: true,
    bgIcon: "💵",
  },
  {
    title: "Total tax this month",
    amount: "₦550,350.00",
    trend: "2.1% less than last month",
    isUp: false,
    bgIcon: "📄",
  },
  {
    title: "Total loan this month",
    amount: "₦150,350.00",
    trend: "1.5% less than last month",
    isUp: false,
    bgIcon: "💳",
  },
];

export const PayrollStats = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-start justify-between"
        >
          <div className="space-y-2">
            <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
              {stat.amount}
            </h3>
            <p className="text-xs font-medium text-slate-400">{stat.title}</p>
            <div className="pt-2 flex items-center gap-1 text-[11px] font-semibold">
              <span className={stat.isUp ? "text-emerald-500" : "text-rose-500"}>
                {stat.isUp ? "↑" : "↓"} {stat.trend}
              </span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-lg shadow-inner">
            {stat.bgIcon}
          </div>
        </div>
      ))}
    </div>
  );
};