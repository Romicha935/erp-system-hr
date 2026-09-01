
"use client";

import React from "react";
import {
  Wallet,
  Users,
  TrendingUp,
  BarChart3,
  CircleDollarSign,
  FileText,
} from "lucide-react";

export interface MetricItem {
  title: string;
  count: string | number;
  subtext?: string;
  isIncrease?: boolean;
  iconBg: string;
  icon?: React.ElementType;
}

interface MetricsOverviewProps {
  metrics: MetricItem[];
}

// Convert large numbers into compact readable format
const formatCompactNumber = (value: string | number) => {
  const num =
    typeof value === "number"
      ? value
      : Number(String(value).replace(/[₦,]/g, ""));

  // If it's not a number, return original value
  if (Number.isNaN(num)) return String(value);

  const hasCurrency = String(value).includes("₦");

  const format = (amount: number, suffix: string) =>
    `${hasCurrency ? "₦" : ""}${amount}${suffix}`;

  if (num >= 1_000_000_000) {
    return format(Number((num / 1_000_000_000).toFixed(1)), "B");
  }

  if (num >= 1_000_000) {
    return format(Number((num / 1_000_000).toFixed(1)), "M");
  }

  if (num >= 1_000) {
    return format(Number((num / 1_000).toFixed(1)), "K");
  }

  return String(value);
};

export const MetricsOverview: React.FC<MetricsOverviewProps> = ({
  metrics,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((item, index) => {
        // Use provided icon, otherwise use a suitable fallback
        const Icon =
          item.icon ??
          [Wallet, Users, TrendingUp, BarChart3][index % 4];

        const compactCount = formatCompactNumber(item.count);

        return (
          <div
            key={index}
            className="min-w-0 bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            {/* Top section */}
            <div className="flex items-start justify-between gap-3 min-w-0">
              {/* Amount + title */}
              <div className="min-w-0 flex-1 ">
                <h2
                  title={String(item.count)}
                  className="text-xl sm:text-2xl font-black text-slate-900 truncate leading-tight mb-6"
                >
                  {compactCount}
                </h2>

                <p className="text-xs font-semibold text-slate-500 mt-1 truncate ">
                  {item.title}
                </p>
              </div>

              {/* Icon */}
              <div
                className={`w-10 h-10 min-w-10 rounded-full flex items-center justify-center ${item.iconBg}`}
              >
                <Icon size={19} strokeWidth={2} />
              </div>
            </div>

            {/* Subtext */}
            {item.subtext && (
              <div
                className={`flex items-center gap-1 mt-4 text-[11px] font-medium ${
                  item.isIncrease !== false
                    ? "text-emerald-600"
                    : "text-rose-500"
                }`}
              >
                <span className="font-bold">
                  {item.isIncrease !== false ? "↑" : "↓"}
                </span>

                <span className="truncate ">{item.subtext}</span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

