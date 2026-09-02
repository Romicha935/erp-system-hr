"use client";

import React, { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useGetPayrollsQuery } from "@/app/redux/dashboard/payroll/payrollApi";

const monthLabels = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const ChartSkeleton = () => {
  return (
    <div className="w-full h-full flex flex-col justify-end animate-pulse">
      {/* Y-axis skeleton */}
      <div className="flex flex-1 gap-4">
        <div className="w-8 flex flex-col justify-between py-2">
          <div className="h-2 w-6 bg-slate-200 rounded" />
          <div className="h-2 w-6 bg-slate-200 rounded" />
          <div className="h-2 w-6 bg-slate-200 rounded" />
          <div className="h-2 w-6 bg-slate-200 rounded" />
          <div className="h-2 w-6 bg-slate-200 rounded" />
        </div>

        {/* Chart skeleton */}
        <div className="flex-1 flex items-end justify-around gap-2 border-b border-slate-200">
          {[35, 55, 42, 70, 48, 62, 78, 52, 68, 45, 58, 72].map(
            (height, index) => (
              <div
                key={index}
                className="flex items-end gap-0.5 h-full"
              >
                <div
                  className="w-2.5 bg-slate-200 rounded-t-sm"
                  style={{ height: `${height}%` }}
                />
                <div
                  className="w-2.5 bg-slate-200 rounded-t-sm"
                  style={{ height: `${Math.max(height - 15, 15)}%` }}
                />
                <div
                  className="w-2.5 bg-slate-200 rounded-t-sm"
                  style={{ height: `${Math.max(height - 30, 10)}%` }}
                />
              </div>
            ),
          )}
        </div>
      </div>

      {/* X-axis skeleton */}
      <div className="ml-12 mt-3 flex justify-around gap-2">
        {monthLabels.map((_, index) => (
          <div
            key={index}
            className="h-2 w-5 bg-slate-200 rounded"
          />
        ))}
      </div>
    </div>
  );
};

export const PayrollChart = () => {
  const currentYear = new Date().getFullYear();

  const { data, isLoading } = useGetPayrollsQuery({
    year: currentYear,
    limit: 200,
  });

  const chartData = useMemo(() => {
    const monthly = monthLabels.map((label, idx) => ({
      month: label,
      monthNumber: idx + 1,
      netSalary: 0,
      tax: 0,
      deductions: 0,
    }));

    if (data?.data) {
      data.data.forEach((payroll) => {
        const bucket = monthly.find(
          (m) => m.monthNumber === payroll.month,
        );

        if (!bucket) return;

        payroll.items.forEach((item) => {
          bucket.netSalary += parseFloat(item.netSalary || "0");
          bucket.tax += parseFloat(item.tax || "0");
          bucket.deductions += parseFloat(item.deductions || "0");
        });
      });
    }

    return monthly.map((m) => ({
      month: m.month,
      netSalary: Math.round(m.netSalary / 1000),
      tax: Math.round(m.tax / 1000),
      deductions: Math.round(m.deductions / 1000),
    }));
  }, [data]);

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between h-full min-h-[300px]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-bold text-slate-800">
          Annual payroll summary
        </h3>

        <div className="flex items-center gap-3 text-xs font-medium text-slate-500">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-500" />
            Net salary
          </span>

          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            Tax
          </span>

          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-600" />
            Deductions
          </span>
        </div>
      </div>

      <div className="w-full h-60">
        {isLoading ? (
          <ChartSkeleton />
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} barSize={12}>
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{
                  fontSize: 11,
                  fill: "#94a3b8",
                }}
              />

              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{
                  fontSize: 11,
                  fill: "#94a3b8",
                }}
                tickFormatter={(value) => `${value}k`}
              />

              <Tooltip
                formatter={(value) => `₦${value}k`}
              />

              <Bar
                dataKey="netSalary"
                stackId="a"
                fill="#0284c7"
                radius={[0, 0, 4, 4]}
              />

              <Bar
                dataKey="tax"
                stackId="a"
                fill="#f59e0b"
              />

              <Bar
                dataKey="deductions"
                stackId="a"
                fill="#9333ea"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};