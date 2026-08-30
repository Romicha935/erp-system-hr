"use client";

import React from "react";
import {
  Landmark,
  CircleDollarSign,
  Wallet,
  ChartPie,
} from "lucide-react";
import { useGetBudgetSummaryQuery } from "@/app/redux/dashboard/budgetApi";

const MetricCardSkeleton = () => {
  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-7 w-32 bg-slate-200 rounded-md animate-pulse" />
          <div className="h-3 w-28 bg-slate-200 rounded-md animate-pulse" />
        </div>

        <div className="w-10 h-10 rounded-full bg-slate-200 animate-pulse" />
      </div>
    </div>
  );
};

export const BudgetMetrics: React.FC = () => {
  const { data, isLoading } = useGetBudgetSummaryQuery();

  const formatCurrency = (value: number) =>
    `₦${value.toLocaleString("en-NG")}`;

  const metrics = data
    ? [
        {
          title: "Total annual budget",
          amount: formatCurrency(data.data.totalAnnualBudget),
          icon: Landmark,
          iconBg: "bg-sky-100 text-sky-600",
        },
        {
          title: "Amount used, YTD",
          amount: formatCurrency(data.data.amountUsedYTD),
          icon: CircleDollarSign,
          iconBg: "bg-amber-100 text-amber-600",
        },
        {
          title: "Total budget balance",
          amount: formatCurrency(data.data.totalBalance),
          icon: Wallet,
          iconBg: "bg-purple-100 text-purple-600",
        },
        {
          title: "Budget % used",
          amount: `${data.data.percentUsed}%`,
          icon: ChartPie,
          iconBg: "bg-emerald-100 text-emerald-600",
        },
      ]
    : [];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((item) => (
          <MetricCardSkeleton key={item} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((item, index) => {
        const Icon = item.icon;

        return (
          <div
            key={index}
            className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm"
          >
            {/* Amount + Icon */}
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-2xl font-black text-slate-900 leading-tight truncate">
                {item.amount}
              </h2>

              <div
                className={`w-10 h-10 min-w-10 rounded-full flex items-center justify-center ${item.iconBg}`}
              >
                <Icon size={19} strokeWidth={2} />
              </div>
            </div>

            {/* Title */}
            <p className="text-xs font-semibold text-slate-500 mt-3">
              {item.title}
            </p>
          </div>
        );
      })}
    </div>
  );
};