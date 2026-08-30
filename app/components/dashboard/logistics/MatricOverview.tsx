"use client";

import React, { useMemo } from "react";
import { useGetLogisticsQuery } from "@/app/redux/dashboard/logisticsApi";
import {
  Truck,
  Banknote,
  Clock3,
  CircleCheck,
} from "lucide-react";

export const LogisticsMetrics: React.FC = () => {
  const { data, isLoading } = useGetLogisticsQuery({ limit: 1000 });

  const stats = useMemo(() => {
    const all = data?.data ?? [];
    const total = data?.meta.total ?? 0;

    const pending = all.filter((r) => r.status === "PENDING").length;

    const approved = all.filter(
      (r) => r.status === "APPROVED"
    ).length;

    const totalCost = all.reduce(
      (sum, r) => sum + parseFloat(r.amount || "0"),
      0
    );

    const formatCurrency = (value: number) =>
      value.toLocaleString("en-NG");

    return [
      {
        title: "Total request made",
        count: total.toString(),
        icon: Truck,
        iconBg: "bg-sky-100 text-sky-600",
      },
      {
        title: "Total cost incurred",
        count: formatCurrency(totalCost),
        icon: Banknote,
        iconBg: "bg-purple-100 text-purple-600",
      },
      {
        title: "Pending request",
        count: pending.toString(),
        icon: Clock3,
        iconBg: "bg-amber-100 text-amber-600",
      },
      {
        title: "Approved request",
        count: approved.toString(),
        icon: CircleCheck,
        iconBg: "bg-emerald-100 text-emerald-600",
      },
    ];
  }, [data]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm h-24 animate-pulse"
          >
            <div className="flex items-center justify-between h-full">
              <div className="space-y-2">
                <div className="h-6 w-20 bg-slate-200 rounded animate-pulse" />
                <div className="h-3 w-28 bg-slate-200 rounded animate-pulse" />
              </div>

              <div className="w-10 h-10 rounded-full bg-slate-200 animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((item, index) => {
        const Icon = item.icon;

        return (
          <div
            key={index}
            className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between"
          >
            <div>
              <h2 className="text-2xl font-black text-slate-900">
                {item.count}
              </h2>

              <p className="text-xs font-semibold text-slate-500 mt-0.5">
                {item.title}
              </p>
            </div>

            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${item.iconBg}`}
            >
              <Icon size={19} strokeWidth={2} />
            </div>
          </div>
        );
      })}
    </div>
  );
};