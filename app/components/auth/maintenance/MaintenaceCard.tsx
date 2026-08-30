"use client";

import React, { useMemo } from "react";
import {
  CalendarClock,
  CircleCheck,
  Clock3,
  AlertTriangle,
} from "lucide-react";
import { useGetMaintenancesQuery } from "@/app/redux/dashboard/maintenanceApi";

export const MaintenanceMetrics: React.FC = () => {
  const { data, isLoading } = useGetMaintenancesQuery({ limit: 1000 });

  const stats = useMemo(() => {
    const all = data?.data ?? [];

    const scheduled = all.length;
    const completed = all.filter((m) => m.status === "COMPLETED").length;
    const pending = all.filter((m) => m.status === "PENDING").length;
    const overdue = all.filter((m) => m.status === "OVERDUE").length;

    return [
      {
        title: "Scheduled maintenance",
        count: scheduled,
        icon: CalendarClock,
        iconBg: "bg-blue-100 text-blue-600",
      },
      {
        title: "Completed maintenance",
        count: completed,
        icon: CircleCheck,
        iconBg: "bg-emerald-100 text-emerald-600",
      },
      {
        title: "Pending maintenance",
        count: pending,
        icon: Clock3,
        iconBg: "bg-amber-100 text-amber-600",
      },
      {
        title: "Overdue maintenance",
        count: overdue,
        icon: AlertTriangle,
        iconBg: "bg-rose-100 text-rose-600",
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
          />
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
              <Icon size={20} strokeWidth={2.2} />
            </div>
          </div>
        );
      })}
    </div>
  );
};