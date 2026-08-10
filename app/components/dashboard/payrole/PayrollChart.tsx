"use client";

import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const chartData = [
  { month: "Jan", netSalary: 280, tax: 40, loan: 0 },
  { month: "Feb", netSalary: 390, tax: 110, loan: 30 },
  { month: "Mar", netSalary: 380, tax: 100, loan: 0 },
  { month: "Apr", netSalary: 320, tax: 80, loan: 0 },
  { month: "May", netSalary: 310, tax: 60, loan: 50 },
  { month: "Jun", netSalary: 320, tax: 40, loan: 0 },
  { month: "Jul", netSalary: 420, tax: 60, loan: 0 },
  { month: "Aug", netSalary: 370, tax: 50, loan: 0 },
  { month: "Sep", netSalary: 280, tax: 40, loan: 0 },
  { month: "Oct", netSalary: 450, tax: 80, loan: 0 },
  { month: "Nov", netSalary: 410, tax: 70, loan: 0 },
  { month: "Dec", netSalary: 420, tax: 110, loan: 60 },
];

export const PayrollChart = () => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between h-full min-h-[300px]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-bold text-slate-800">Annual payroll summary</h3>
        <div className="flex items-center gap-3 text-xs font-medium text-slate-500">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-500"></span> Net salary
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Tax
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-600"></span> Loan
          </span>
        </div>
      </div>

      <div className="w-full h-60">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} barSize={12}>
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#94a3b8" }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#94a3b8" }} tickFormatter={(value) => `${value}k`} />
            <Tooltip />
            <Bar dataKey="netSalary" stackId="a" fill="#0284c7" radius={[0, 0, 4, 4]} />
            <Bar dataKey="tax" stackId="a" fill="#f59e0b" />
            <Bar dataKey="loan" stackId="a" fill="#9333ea" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};