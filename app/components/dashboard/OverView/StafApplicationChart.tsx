"use client";

import React from "react";
import { Card } from "@/app/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const data = [
  { name: "Pending", value: 80, color: "#F59E0B" },
  { name: "Approved", value: 370, color: "#10B981" },
  { name: "Rejected", value: 50, color: "#EF4444" },
];

export const StaffApplicationChart = () => {
  return (
    <Card title="Staff Applications Card">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Left Legends */}
        <div className="space-y-3 w-full sm:w-auto">
          <p className="text-lg font-bold text-slate-900">500 Total applications</p>
          
          <div className="space-y-2 text-xs font-semibold">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-amber-500" />
              <span className="text-slate-800">80</span>
              <span className="text-slate-400 font-normal">Pending</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-emerald-500" />
              <span className="text-slate-800">370</span>
              <span className="text-slate-400 font-normal">Approved</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-rose-500" />
              <span className="text-slate-800">50</span>
              <span className="text-slate-400 font-normal">Rejected</span>
            </div>
          </div>
        </div>

        {/* Right Donut Chart */}
        <div className="w-40 h-40 relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={65}
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  );
};