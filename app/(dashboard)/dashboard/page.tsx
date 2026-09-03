"use client";

import React from "react";
import { Users, Building2 } from "lucide-react";

import { MetricCard } from "@/app/components/dashboard/OverView/MatricsCard";
import { MemoSection } from "@/app/components/dashboard/OverView/Memo";

import { StaffApplicationChart } from "@/app/components/dashboard/OverView/StafApplicationChart";
import { StaffListSection } from "@/app/components/dashboard/OverView/StafList";
import { useGetStaffQuery } from "@/app/redux/dashboard/staffApi";
import { PaymentVoucherSection } from "@/app/components/dashboard/OverView/PaymentVouchars";

export default function DashboardPage() {
  const {
    data: staffData,
    isLoading: isStaffLoading,
  } = useGetStaffQuery({ limit: 1000 });

  const totalStaff = staffData?.meta?.total ?? 0;

  const totalDepartments = staffData?.data
    ? new Set(
        staffData.data
          .map((s) => s.designation)
          .filter(Boolean),
      ).size
    : 0;

  const metrics = [
    {
      value: isStaffLoading ? "—" : totalStaff.toString(),
      label: "Total number of staff",
      trendText: "",
      isPositive: true,
      iconBgColor: "bg-amber-100 text-amber-600",
      icon: <Users />,
    },
    {
      value: isStaffLoading ? "—" : totalDepartments.toString(),
      label: "Total departments",
      trendText: "",
      isPositive: true,
      iconBgColor: "bg-emerald-100 text-emerald-600",
      icon: <Building2 />,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {metrics.map((metric, idx) => (
          <MetricCard key={idx} {...metric} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MemoSection />
        <StaffListSection />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PaymentVoucherSection />
        <StaffApplicationChart />
      </div>
    </div>
  );
}