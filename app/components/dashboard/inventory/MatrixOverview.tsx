"use client";

import React from "react";

export interface MetricItem {
  title: string;
  count: string;
  subtext?: string;
  isIncrease?: boolean;
  iconBg: string;
}

interface MetricsOverviewProps {
  metrics: MetricItem[];
}

export const MetricsOverview: React.FC<MetricsOverviewProps> = ({ metrics }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((item, index) => (
        <div key={index} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-black text-slate-900">{item.count}</h2>
              <p className="text-xs font-semibold text-slate-500 mt-0.5">{item.title}</p>
            </div>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm ${item.iconBg}`}>
              📊
            </div>
          </div>
          {item.subtext && (
            <div className={`flex items-center gap-1 text-[11px] font-medium ${item.isIncrease !== false ? "text-emerald-600" : "text-rose-500"}`}>
              <span>{item.isIncrease !== false ? "↑" : "↓"}</span>
              <span>{item.subtext}</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};