import React from "react";
import { Card } from "@/app/components/ui/card";
import { cn } from "@/app/lib/utils";


export interface MetricCardProps {
  value: string | number;
  label: string;
  trendText: string;
  isPositive: boolean;
  iconBgColor: string;
  icon: React.ReactNode;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  value,
  label,
  trendText,
  isPositive,
  iconBgColor,
  icon,
}) => {
  return (
    <Card className="flex flex-col justify-between p-5">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">{value}</h2>
          <p className="text-sm font-medium text-slate-500 mt-1">{label}</p>
        </div>
        <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center text-xl", iconBgColor)}>
          {icon}
        </div>
      </div>

      <div className="flex items-center gap-1 mt-4 text-xs font-medium">
        <span className={isPositive ? "text-emerald-500" : "text-rose-500"}>
          {isPositive ? "↑" : "↓"} {trendText}
        </span>
      </div>
    </Card>
  );
};