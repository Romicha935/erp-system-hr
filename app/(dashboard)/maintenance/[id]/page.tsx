/* eslint-disable @typescript-eslint/no-explicit-any */
// app/(dashboard)/maintenance/[id]/page.tsx
"use client";

import React, { use } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import {
  useGetMaintenanceByIdQuery,
  useUpdateMaintenanceMutation,
  MaintenanceStatus,
} from "@/app/redux/dashboard/maintenanceApi";

const statusColor: Record<MaintenanceStatus, string> = {
  PENDING: "text-amber-600",
  COMPLETED: "text-emerald-600",
  OVERDUE: "text-rose-600",
};

export default function MaintenanceDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const { data, isLoading } = useGetMaintenanceByIdQuery(id);
  const [updateMaintenance, { isLoading: isUpdating }] = useUpdateMaintenanceMutation();

  const formatDate = (value: string) => new Date(value).toLocaleDateString("en-GB");

  const handleStatusChange = async (status: MaintenanceStatus) => {
    try {
      await updateMaintenance({ id, data: { status } }).unwrap();
      toast.success("Status updated successfully");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update status.");
    }
  };

 if (isLoading) {
  return (
    <div className="space-y-6 w-full mx-auto pb-10 animate-pulse">
      {/* Back skeleton */}
      <div className="h-4 w-16 bg-slate-200 rounded" />

      {/* Main card skeleton */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-100 shadow-sm space-y-6">
        {/* Title */}
        <div className="h-6 w-52 bg-slate-200 rounded-lg" />

        {/* Details */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="space-y-2">
              <div className="h-3 w-20 bg-slate-200 rounded" />
              <div className="h-4 w-24 bg-slate-300 rounded" />
            </div>
          ))}
        </div>

        {/* Attachment skeleton */}
        <div className="h-4 w-36 bg-slate-200 rounded" />
      </div>
    </div>
  );
}

  if (!data?.data) {
    return <div className="py-16 text-center text-rose-500 text-sm">Maintenance record not found.</div>;
  }

  const maintenance = data.data;

  return (
    <div className="space-y-6 w-full mx-auto pb-10">
      <Link href="/maintenance" className="inline-flex items-center gap-1 text-xs font-semibold text-sky-600 hover:underline">
        ‹ Back
      </Link>

      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-100 shadow-sm space-y-6">
        <h1 className="text-xl font-bold text-slate-900">Scheduled Maintenance</h1>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 text-xs">
          <div>
            <span className="text-slate-400 font-medium block mb-1">Item name</span>
            <span className="font-bold text-slate-900">{maintenance.itemName}</span>
          </div>
          <div>
            <span className="text-slate-400 font-medium block mb-1">Quantity</span>
            <span className="font-bold text-slate-900">{maintenance.quantity}</span>
          </div>
          <div>
            <span className="text-slate-400 font-medium block mb-1">Date</span>
            <span className="font-bold text-slate-900">{formatDate(maintenance.scheduledDate)}</span>
          </div>
          <div>
            <span className="text-slate-400 font-medium block mb-1">Maintenance type</span>
            <span className="font-bold text-slate-900">
              {maintenance.maintenanceType === "RECURRING" ? "Recurring" : "One-time"}
            </span>
          </div>
          <div>
            <span className="text-slate-400 font-medium block mb-1">Recurring type</span>
            <span className="font-bold text-slate-900">{maintenance.recurringOption ?? "—"}</span>
          </div>
          <div>
            <span className="text-slate-400 font-medium block mb-1">Status</span>
            <select
              value={maintenance.status}
              onChange={(e) => handleStatusChange(e.target.value as MaintenanceStatus)}
              disabled={isUpdating}
              className={`font-bold bg-transparent outline-none cursor-pointer ${statusColor[maintenance.status]}`}
            >
              <option value="PENDING">Pending</option>
              <option value="COMPLETED">Completed</option>
              <option value="OVERDUE">Overdue</option>
            </select>
          </div>
        </div>

        {maintenance.attachmentUrl && (
          <div className="text-xs">
            <a 
              href={maintenance.attachmentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 font-semibold hover:underline"
            >
              View attached invoice
            </a>
          </div>
        )}
      </div>
    </div>
  );
}