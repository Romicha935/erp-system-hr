"use client";

import React from "react";

interface MetricCardProps {
  title: string;
  count: string;
  subtext: string;
  isIncrease?: boolean;
  iconBg: string;
}

const metricsData: MetricCardProps[] = [
  { title: "Total request made", count: "350", subtext: "50 more than last year", isIncrease: true, iconBg: "bg-sky-100 text-sky-600" },
  { title: "Total cost incurred", count: "5,000,000", subtext: "", iconBg: "bg-purple-100 text-purple-600" },
  { title: "Pending request", count: "70", subtext: "", iconBg: "bg-amber-100 text-amber-600" },
  { title: "Approved request", count: "280", subtext: "2% more than last year", isIncrease: false, iconBg: "bg-emerald-100 text-emerald-600" },
];

export const LogisticsMetrics: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {metricsData.map((item, index) => (
        <div key={index} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-black text-slate-900">{item.count}</h2>
              <p className="text-xs font-semibold text-slate-500 mt-0.5">{item.title}</p>
            </div>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm ${item.iconBg}`}>
              🛍️
            </div>
          </div>
          {item.subtext && (
            <div className={`flex items-center gap-1 text-[11px] font-medium ${item.isIncrease ? "text-emerald-600" : "text-rose-500"}`}>
              <span>{item.isIncrease ? "↑" : "↓"}</span>
              <span>{item.subtext}</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};