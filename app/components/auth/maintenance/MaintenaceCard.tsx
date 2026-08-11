"use client";

import React from "react";

interface MetricCardProps {
  title: string;
  count: number;
  percentage: string;
  bgColor: string;
  iconBg: string;
}

const metricsData: MetricCardProps[] = [
  { title: "Scheduled maintenance", count: 25, percentage: "2 more than last quarter", bgColor: "border-slate-100", iconBg: "bg-blue-100 text-blue-600" },
  { title: "Completed maintenance", count: 25, percentage: "2 more than last quarter", bgColor: "border-slate-100", iconBg: "bg-emerald-100 text-emerald-600" },
  { title: "Pending maintenance", count: 25, percentage: "2 more than last quarter", bgColor: "border-slate-100", iconBg: "bg-amber-100 text-amber-600" },
  { title: "Overdue maintenance", count: 25, percentage: "2 more than last quarter", bgColor: "border-slate-100", iconBg: "bg-rose-100 text-rose-600" },
];

export const MaintenanceMetrics: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {metricsData.map((item, index) => (
        <div key={index} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-black text-slate-900">{item.count}</h2>
              <p className="text-xs font-semibold text-slate-500 mt-0.5">{item.title}</p>
            </div>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm ${item.iconBg}`}>
              ⚙️
            </div>
          </div>
          <div className="flex items-center gap-1 text-[11px] font-medium text-emerald-600">
            <span>↑</span>
            <span>{item.percentage}</span>
          </div>
        </div>
      ))}
    </div>
  );
};