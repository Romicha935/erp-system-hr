"use client";

import React, { useMemo } from "react";
import { Wallet, Banknote, Receipt, MinusCircle } from "lucide-react";
import { useGetPayrollsQuery } from "@/app/redux/dashboard/payroll/payrollApi";

const getMonthYear = (offset: number) => {
  const now = new Date();
  const date = new Date(now.getFullYear(), now.getMonth() + offset, 1);
  return { month: date.getMonth() + 1, year: date.getFullYear() };
};

const sumField = (payrolls: ReturnType<typeof useGetPayrollsQuery>["data"], field: "grossSalary" | "netSalary" | "tax" | "deductions") => {
  if (!payrolls?.data) return 0;
  return payrolls.data.reduce((total: number, payroll: any) => {
    return total + payroll.items.reduce(
      (
        sum: number,
        item: {
          grossSalary?: string | number | null;
          netSalary?: string | number | null;
          tax?: string | number | null;
          deductions?: string | number | null;
        },
      ) => sum + parseFloat(String(item[field] ?? "0")),
      0,
    );
  }, 0);
};

const getTrend = (current: number, previous: number) => {
  if (previous === 0) return { percentage: 0, isUp: true };
  const diff = ((current - previous) / previous) * 100;
  return { percentage: Math.abs(diff), isUp: diff >= 0 };
};

const formatCurrency = (value: number) =>
  `₦${value.toLocaleString("en-NG", { minimumFractionDigits: 2 })}`;

export const PayrollStats = () => {
  const current = getMonthYear(0);
  const previous = getMonthYear(-1);

  const { data: currentData, isLoading: isCurrentLoading } = useGetPayrollsQuery({
    month: current.month,
    year: current.year,
  });

  const { data: previousData, isLoading: isPreviousLoading } = useGetPayrollsQuery({
    month: previous.month,
    year: previous.year,
  });

  const isLoading = isCurrentLoading || isPreviousLoading;

  const stats = useMemo(() => {
    const currentGross = sumField(currentData, "grossSalary");
    const currentNet = sumField(currentData, "netSalary");
    const currentTax = sumField(currentData, "tax");
    const currentDeductions = sumField(currentData, "deductions");

    const previousGross = sumField(previousData, "grossSalary");
    const previousNet = sumField(previousData, "netSalary");
    const previousTax = sumField(previousData, "tax");
    const previousDeductions = sumField(previousData, "deductions");

    return [
      {
        title: "Gross salary this month",
        amount: formatCurrency(currentGross),
        trend: getTrend(currentGross, previousGross),
        Icon: Wallet,
      },
      {
        title: "Net salary this month",
        amount: formatCurrency(currentNet),
        trend: getTrend(currentNet, previousNet),
        Icon: Banknote,
      },
      {
        title: "Total tax this month",
        amount: formatCurrency(currentTax),
        trend: getTrend(currentTax, previousTax),
        Icon: Receipt,
      },
      {
        title: "Total deductions this month",
        amount: formatCurrency(currentDeductions),
        trend: getTrend(currentDeductions, previousDeductions),
        Icon: MinusCircle,
      },
    ];
  }, [currentData, previousData]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm h-28 animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-4">
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
              <span className={stat.trend.isUp ? "text-emerald-500" : "text-rose-500"}>
                {stat.trend.isUp ? "↑" : "↓"} {stat.trend.percentage.toFixed(1)}%{" "}
                {stat.trend.isUp ? "more" : "less"} than last month
              </span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center shadow-inner">
            <stat.Icon size={18} className="text-slate-600" />
          </div>
        </div>
      ))}
    </div>
  );
};