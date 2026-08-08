import { MetricCard } from "@/app/components/dashboard/OverView/MatricsCard";
import { MemoSection } from "@/app/components/dashboard/OverView/Memo";
import { PaymentVoucherSection } from "@/app/components/dashboard/OverView/PaymentVouchars";
import { StaffApplicationChart } from "@/app/components/dashboard/OverView/StafApplicationChart";
import { StaffListSection } from "@/app/components/dashboard/OverView/StafList";
import React from "react";


const metrics = [
  {
    value: "250",
    label: "Total number of staff",
    trendText: "12 more than last quarter",
    isPositive: true,
    iconBgColor: "bg-amber-100 text-amber-600",
    icon: "👥",
  },
  {
    value: "100",
    label: "Total application",
    trendText: "0.2% lower than last quarter",
    isPositive: false,
    iconBgColor: "bg-sky-100 text-sky-600",
    icon: "📋",
  },
  {
    value: "10",
    label: "Total projects",
    trendText: "2% more than last quarter",
    isPositive: true,
    iconBgColor: "bg-purple-100 text-purple-600",
    icon: "🚀",
  },
  {
    value: "10",
    label: "Total departments",
    trendText: "",
    isPositive: true,
    iconBgColor: "bg-emerald-100 text-emerald-600",
    icon: "🏛️",
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Top 4 Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {metrics.map((metric, idx) => (
          <MetricCard key={idx} {...metric} />
        ))}
      </div>

      {/* Main Content Grid Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MemoSection/>
        <StaffListSection />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PaymentVoucherSection />
        <StaffApplicationChart />
      </div>
    </div>
  );
}