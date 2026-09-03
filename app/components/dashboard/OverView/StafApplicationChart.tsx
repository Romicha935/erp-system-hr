"use client";

import React, { useMemo } from "react";
import { Card } from "@/app/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { useGetMemosQuery } from "@/app/redux/dashboard/memosApi";
import { useGetProcurementsQuery } from "@/app/redux/dashboard/procurementApi";
import { useGetLogisticsQuery } from "@/app/redux/dashboard/logisticsApi";

export const StaffApplicationChart = () => {
  const {
    data: memoData,
    isLoading: isMemoLoading,
  } = useGetMemosQuery({ limit: 1000 });

  const {
    data: procurementData,
    isLoading: isProcLoading,
  } = useGetProcurementsQuery({ limit: 1000 });

  const {
    data: logisticsData,
    isLoading: isLogLoading,
  } = useGetLogisticsQuery({ limit: 1000 });

  const isLoading =
    isMemoLoading || isProcLoading || isLogLoading;

  const stats = useMemo(() => {
    // Memo data is already an array of Memo objects.
    const allMemos = memoData?.data ?? [];

    const allProcurements = procurementData?.data ?? [];

    const allLogistics = logisticsData?.data ?? [];

    const countStatus = (
      items: { status?: string }[] | undefined,
      pendingKey: string,
      approvedKey: string,
    ) => {
      const safeItems = Array.isArray(items)
        ? items.filter(Boolean)
        : [];

      const pending = safeItems.filter(
        (item) => item?.status === pendingKey,
      ).length;

      const approved = safeItems.filter(
        (item) => item?.status === approvedKey,
      ).length;

      const rejected = safeItems.filter(
        (item) => item?.status === "REJECTED",
      ).length;

      return {
        pending,
        approved,
        rejected,
      };
    };

    const memoStats = countStatus(
      allMemos,
      "PENDING",
      "APPROVED",
    );

    const procStats = countStatus(
      allProcurements,
      "PENDING",
      "APPROVED",
    );

    const logStats = countStatus(
      allLogistics,
      "PENDING",
      "APPROVED",
    );

    return {
      pending:
        memoStats.pending +
        procStats.pending +
        logStats.pending,

      approved:
        memoStats.approved +
        procStats.approved +
        logStats.approved,

      rejected:
        memoStats.rejected +
        procStats.rejected +
        logStats.rejected,
    };
  }, [memoData, procurementData, logisticsData]);

  const total =
    stats.pending +
    stats.approved +
    stats.rejected;

  const chartData = [
    {
      name: "Pending",
      value: stats.pending,
      color: "#F59E0B",
    },
    {
      name: "Approved",
      value: stats.approved,
      color: "#10B981",
    },
    {
      name: "Rejected",
      value: stats.rejected,
      color: "#EF4444",
    },
  ];

  if (isLoading) {
    return (
      <Card title="Requests Overview">
        <div className="h-40 bg-slate-100 rounded-xl animate-pulse" />
      </Card>
    );
  }

  return (
    <Card title="Requests Overview">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-3 w-full sm:w-auto">
          <p className="text-lg font-bold text-slate-900">
            {total} Total requests
          </p>

          <div className="space-y-2 text-xs font-semibold">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-amber-500" />
              <span className="text-slate-800">
                {stats.pending}
              </span>
              <span className="text-slate-400 font-normal">
                Pending
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-emerald-500" />
              <span className="text-slate-800">
                {stats.approved}
              </span>
              <span className="text-slate-400 font-normal">
                Approved
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-rose-500" />
              <span className="text-slate-800">
                {stats.rejected}
              </span>
              <span className="text-slate-400 font-normal">
                Rejected
              </span>
            </div>
          </div>
        </div>

        <div className="w-40 h-40 relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={65}
                paddingAngle={2}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  );
};