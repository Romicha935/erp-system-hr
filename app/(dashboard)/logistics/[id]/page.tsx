
"use client";

import React, { use, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import {
  useGetLogisticsByIdQuery,
  useActionLogisticsMutation,
} from "@/app/redux/dashboard/logisticsApi";

const statusStyle: Record<string, string> = {
  PENDING: "text-amber-500 font-semibold",
  APPROVED: "text-emerald-600 font-semibold",
  REJECTED: "text-rose-600 font-semibold",
};

// Skeleton Component
const LogisticsDetailsSkeleton = () => {
  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-10 animate-pulse">
      {/* Back Skeleton */}
      <div className="h-4 w-16 bg-slate-200 rounded" />

      {/* Main Card */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-100 shadow-sm space-y-6">
        {/* Title */}
        <div className="h-6 w-64 bg-slate-200 rounded-md" />

        {/* Details */}
        <div className="space-y-4">
          <div className="flex gap-2">
            <div className="h-4 w-20 bg-slate-200 rounded" />
            <div className="h-4 w-48 bg-slate-100 rounded" />
          </div>

          <div className="flex gap-2">
            <div className="h-4 w-20 bg-slate-200 rounded" />
            <div className="h-4 w-32 bg-slate-100 rounded" />
          </div>

          <div className="flex gap-2">
            <div className="h-4 w-20 bg-slate-200 rounded" />
            <div className="h-4 w-44 bg-slate-100 rounded" />
          </div>

          <div className="flex gap-2">
            <div className="h-4 w-20 bg-slate-200 rounded" />
            <div className="h-4 w-44 bg-slate-100 rounded" />
          </div>

          <div className="flex gap-2">
            <div className="h-4 w-20 bg-slate-200 rounded" />
            <div className="h-4 w-56 bg-slate-100 rounded" />
          </div>

          <div className="flex gap-2">
            <div className="h-4 w-20 bg-slate-200 rounded" />
            <div className="h-4 w-20 bg-slate-100 rounded" />
          </div>
        </div>

        {/* Beneficiary Section */}
        <div className="pt-4 border-t border-slate-100">
          <div className="h-4 w-48 bg-slate-200 rounded mb-3" />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
            <div>
              <div className="h-3 w-24 bg-slate-200 rounded mb-2" />
              <div className="h-4 w-36 bg-slate-200 rounded" />
            </div>

            <div>
              <div className="h-3 w-28 bg-slate-200 rounded mb-2" />
              <div className="h-4 w-32 bg-slate-200 rounded" />
            </div>

            <div>
              <div className="h-3 w-20 bg-slate-200 rounded mb-2" />
              <div className="h-4 w-40 bg-slate-200 rounded" />
            </div>
          </div>
        </div>

        {/* Remarks Skeleton */}
        <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl">
          <div className="h-3 w-16 bg-slate-200 rounded mb-2" />
          <div className="h-4 w-72 bg-slate-200 rounded" />
        </div>

        {/* Action Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end pt-4 border-t border-slate-100">
          <div className="md:col-span-4">
            <div className="h-3 w-12 bg-slate-200 rounded mb-2" />
            <div className="h-10 w-full bg-slate-100 rounded-xl" />
          </div>

          <div className="md:col-span-5">
            <div className="h-3 w-16 bg-slate-200 rounded mb-2" />
            <div className="h-10 w-full bg-slate-100 rounded-xl" />
          </div>

          <div className="md:col-span-3">
            <div className="h-10 w-full bg-slate-200 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default function LogisticsDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();

  const { data, isLoading } = useGetLogisticsByIdQuery(id);

  const [actionLogistics, { isLoading: isSubmitting }] =
    useActionLogisticsMutation();

  const [action, setAction] = useState<"APPROVE" | "REJECT" | "">("");
  const [remarks, setRemarks] = useState("");

  const formatCurrency = (value: string) =>
    `₦${parseFloat(value).toLocaleString("en-NG", {
      minimumFractionDigits: 2,
    })}`;

  const formatDate = (value: string) =>
    new Date(value).toLocaleDateString("en-GB");

  const handleSubmit = async () => {
    if (!action) {
      toast.error("Please select an action");
      return;
    }

    try {
      await actionLogistics({
        id,
        action,
        remarks: remarks || undefined,
      }).unwrap();

      toast.success(
        `Request ${
          action === "APPROVE" ? "approved" : "rejected"
        } successfully`
      );

      router.push("/logistics");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to submit action.");
    }
  };

  // Skeleton Loading
  if (isLoading) {
    return <LogisticsDetailsSkeleton />;
  }

  if (!data?.data) {
    return (
      <div className="py-16 text-center text-rose-500 text-sm">
        Logistics request not found.
      </div>
    );
  }

  const request = data.data;
  const isPending = request.status === "PENDING";

  const days =
    Math.ceil(
      (new Date(request.dateTo).getTime() -
        new Date(request.dateFrom).getTime()) /
        (1000 * 60 * 60 * 24)
    ) + 1;

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-10">
      <Link
        href="/logistics"
        className="inline-flex items-center gap-1 text-xs font-semibold text-sky-600 hover:underline"
      >
        ‹ Back
      </Link>

      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-100 shadow-sm space-y-6">
        <h1 className="text-xl font-bold text-slate-900">
          {request.title}
        </h1>

        <div className="space-y-2 text-xs text-slate-700">
          <p>
            <span className="font-bold text-slate-900">Purpose:</span>{" "}
            {request.purpose}
          </p>

          <p>
            <span className="font-bold text-slate-900">Amount:</span>{" "}
            {formatCurrency(request.amount)}
          </p>

          <p>
            <span className="font-bold text-slate-900">From:</span>{" "}
            {request.requestedBy.firstName}{" "}
            {request.requestedBy.lastName}
          </p>

          <p>
            <span className="font-bold text-slate-900">To:</span>{" "}
            {request.sentTo.firstName} {request.sentTo.lastName}
          </p>

          <p>
            <span className="font-bold text-slate-900">Duration:</span>{" "}
            {days} days - ({formatDate(request.dateFrom)} -{" "}
            {formatDate(request.dateTo)})
          </p>

          <p>
            <span className="font-bold text-slate-900">Status:</span>{" "}
            <span className={statusStyle[request.status]}>
              {request.status}
            </span>
          </p>
        </div>

        <div className="pt-4 border-t border-slate-100">
          <h3 className="text-xs font-bold text-slate-900 mb-3">
            Beneficiary Payment Details
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100 text-xs">
            <div>
              <p className="text-slate-400 font-semibold">Account Name</p>
              <p className="text-slate-800 font-medium mt-0.5">
                {request.beneficiary.accountName}
              </p>
            </div>

            <div>
              <p className="text-slate-400 font-semibold">Account Number</p>
              <p className="text-slate-800 font-medium mt-0.5">
                {request.beneficiary.accountNumber}
              </p>
            </div>

            <div>
              <p className="text-slate-400 font-semibold">Bank Name</p>
              <p className="text-slate-800 font-medium mt-0.5">
                {request.beneficiary.bankName}
              </p>
            </div>
          </div>
        </div>

        {request.remarks && (
          <div className="p-4 bg-amber-50 border border-amber-100 rounded-xl text-xs">
            <p className="text-amber-600 font-semibold mb-1">Remarks</p>
            <p className="text-slate-700">{request.remarks}</p>
          </div>
        )}

        {isPending ? (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end pt-4 border-t border-slate-100">
            <div className="md:col-span-4">
              <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                Action
              </label>

              <select
                value={action}
                onChange={(e) =>
                  setAction(
                    e.target.value as "APPROVE" | "REJECT"
                  )
                }
                className="w-full px-3.5 py-2.5 text-xs text-slate-900 bg-slate-50/50 border border-slate-200 rounded-xl outline-none focus:border-sky-500 transition-colors"
              >
                <option value="">Select action</option>
                <option value="APPROVE">Approve</option>
                <option value="REJECT">Reject</option>
              </select>
            </div>

            <div className="md:col-span-5">
              <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                Remarks
              </label>

              <input
                type="text"
                placeholder="Enter remark"
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs text-gray-800 bg-slate-50/50 border border-slate-200 rounded-xl outline-none focus:border-sky-500 transition-colors"
              />
            </div>

            <div className="md:col-span-3">
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full py-2.5 bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-semibold text-xs rounded-md cursor-pointer shadow-md hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </div>
          </div>
        ) : (
          <p className="text-xs text-slate-400 pt-4 border-t border-slate-100">
            This request has already been{" "}
            {request.status.toLowerCase()}.
          </p>
        )}
      </div>
    </div>
  );
}

