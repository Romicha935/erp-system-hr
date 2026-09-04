// app/(dashboard)/capacity-building/[id]/page.tsx
"use client";

import React, { use, useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import {
  useGetTrainingByIdQuery,
  useUpdateTrainingStatusMutation,
  TrainingStatus,
} from "@/app/redux/dashboard/trainingApi";

const statusColor: Record<TrainingStatus, string> = {
  TODO: "text-slate-500",
  INPROGRESS: "text-amber-500",
  COMPLETED: "text-emerald-600",
};

const statusLabel: Record<TrainingStatus, string> = {
  TODO: "To-do",
  INPROGRESS: "Inprogress",
  COMPLETED: "Completed",
};

// ====================
// Skeleton
// ====================
const TrainingDetailsSkeleton = () => {
  return (
    <div className="space-y-6 w-full mx-auto pb-10">
      {/* Back button skeleton */}
      <div className="h-4 w-12 bg-slate-200 rounded animate-pulse" />

      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-100 shadow-sm space-y-8 min-h-[450px]">
        {/* Title */}
        <div className="h-6 w-2/3 sm:w-1/2 bg-slate-200 rounded-md animate-pulse" />

        {/* Training information */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 border-b border-slate-100 pb-6">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="space-y-2">
              <div className="h-3 w-20 bg-slate-200 rounded animate-pulse" />
              <div className="h-4 w-28 bg-slate-200 rounded animate-pulse" />
            </div>
          ))}
        </div>

        {/* Participants */}
        <div className="space-y-4">
          <div className="h-4 w-36 bg-slate-200 rounded animate-pulse" />

          <div className="space-y-3">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <div className="h-3 w-5 bg-slate-200 rounded animate-pulse" />
                <div className="h-4 w-40 bg-slate-200 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>

        {/* Update status */}
        <div className="pt-6 space-y-3">
          <div className="h-3 w-24 bg-slate-200 rounded animate-pulse" />

          <div className="flex items-center gap-4 max-w-md">
            <div className="h-10 flex-1 bg-slate-200 rounded-xl animate-pulse" />
            <div className="h-10 w-24 bg-slate-200 rounded-md animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default function TrainingDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const { data, isLoading } = useGetTrainingByIdQuery(id);

  const [updateStatus, { isLoading: isUpdating }] =
    useUpdateTrainingStatusMutation();

  const [selectedStatus, setSelectedStatus] =
    useState<TrainingStatus | "">("");

  const handleUpdateStatus = async () => {
    if (!selectedStatus) {
      toast.error("Please select a status");
      return;
    }

    try {
      await updateStatus({
        id,
        status: selectedStatus,
      }).unwrap();

      toast.success("Training status updated");
      setSelectedStatus("");
    } catch (error: any) {
      toast.error(
        error?.data?.message || "Failed to update status."
      );
    }
  };

  // ====================
  // Loading Skeleton
  // ====================
  if (isLoading) {
    return <TrainingDetailsSkeleton />;
  }

  // ====================
  // Not Found
  // ====================
  if (!data?.data) {
    return (
      <div className="py-16 text-center text-rose-500 text-sm">
        Training request not found.
      </div>
    );
  }

  const training = data.data;

  return (
    <div className="space-y-6 w-full mx-auto pb-10">
      {/* Back */}
      <Link
        href="/capacity-building"
        className="inline-flex items-center gap-1 text-xs font-semibold text-sky-600 hover:underline"
      >
        ‹ Back
      </Link>

      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-100 shadow-sm space-y-8 min-h-[450px]">
        {/* Title */}
        <h1 className="text-lg font-bold text-slate-900">
          {training.description}
        </h1>

        {/* Training Information */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 border-b border-slate-100 pb-6">
          <div>
            <p className="text-[11px] font-medium text-slate-400">
              Training type
            </p>
            <p className="text-xs font-bold text-slate-900 mt-1">
              {training.type} training
            </p>
          </div>

          <div>
            <p className="text-[11px] font-medium text-slate-400">
              Training duration
            </p>
            <p className="text-xs font-bold text-slate-900 mt-1">
              {training.durationValue} {training.durationUnit}
            </p>
          </div>

          <div>
            <p className="text-[11px] font-medium text-slate-400">
              Training mode
            </p>
            <p className="text-xs font-bold text-slate-900 mt-1">
              {training.mode}
            </p>
          </div>

          <div>
            <p className="text-[11px] font-medium text-slate-400">
              Training status
            </p>
            <p
              className={`text-xs font-bold mt-1 ${
                statusColor[training.status]
              }`}
            >
              {statusLabel[training.status]}
            </p>
          </div>
        </div>

        {/* Participants */}
        <div className="space-y-3">
          <h2 className="text-xs font-bold text-slate-900">
            Training participant
          </h2>

          <ol className="space-y-2 text-xs font-medium text-slate-700">
            {training.participants.map((p, index) => (
              <li key={p.id}>
                {index + 1}. {p.staff.firstName}{" "}
                {p.staff.lastName}

                {p.staff.designation && (
                  <span className="text-slate-400">
                    {" "}
                    — {p.staff.designation}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </div>

        {/* Update Status */}
        <div className="pt-6 space-y-2">
          <label className="text-xs font-semibold text-slate-700 block">
            Update status
          </label>

          <div className="flex items-center gap-4 max-w-md">
            <select
              value={selectedStatus}
              onChange={(e) =>
                setSelectedStatus(
                  e.target.value as TrainingStatus
                )
              }
              className="w-full px-3.5 py-2.5 text-xs text-slate-900 bg-slate-50/50 border border-slate-200 rounded-xl outline-none focus:border-sky-500 transition-colors"
            >
              <option value="">Select option</option>
              <option value="TODO">To-do</option>
              <option value="INPROGRESS">Inprogress</option>
              <option value="COMPLETED">Completed</option>
            </select>

            <button
              onClick={handleUpdateStatus}
              disabled={isUpdating}
              className="px-8 py-2.5 bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-semibold text-xs rounded-md cursor-pointer shadow-md hover:opacity-90 transition-opacity shrink-0 disabled:opacity-50"
            >
              {isUpdating ? "Updating..." : "Update"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}