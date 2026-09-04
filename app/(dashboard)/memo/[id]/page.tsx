
/* eslint-disable @typescript-eslint/no-explicit-any */
// app/(dashboard)/memo/[id]/page.tsx

"use client";

import React, { use, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import {
  useGetMemoByIdQuery,
  useActionMemoMutation,
  useDeleteMemoMutation,
} from "@/app/redux/dashboard/memosApi";

const statusStyle: Record<string, string> = {
  PENDING: "text-amber-500",
  APPROVED: "text-emerald-600",
  REJECTED: "text-rose-600",
};

// Skeleton component
const Skeleton = ({ className = "" }: { className?: string }) => (
  <div
    className={`animate-pulse rounded-md bg-slate-200 ${className}`}
  />
);

// Details page skeleton
const MemoDetailsSkeleton = () => {
  return (
    <div className="space-y-6 w-full mx-auto pb-10">
      {/* Back */}
      <Skeleton className="h-4 w-16" />

      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-100 shadow-sm space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <Skeleton className="h-6 w-52" />
          <Skeleton className="h-7 w-24 rounded-full" />
        </div>

        {/* Memo information */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Skeleton className="h-3 w-12" />
            <Skeleton className="h-3 w-28" />
          </div>

          <div className="flex items-center gap-3">
            <Skeleton className="h-3 w-12" />
            <Skeleton className="h-3 w-40" />
          </div>

          <div className="flex items-center gap-3">
            <Skeleton className="h-3 w-12" />
            <Skeleton className="h-3 w-32" />
          </div>

          <div className="flex items-center gap-3">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-3 w-12" />
          </div>

          <div className="flex items-center gap-3">
            <Skeleton className="h-3 w-28" />
            <Skeleton className="h-3 w-20" />
          </div>

          {/* Message */}
          <div className="pt-2 space-y-2">
            <Skeleton className="h-3 w-28" />
            <Skeleton className="h-3 w-full max-w-3xl" />
            <Skeleton className="h-3 w-4/5" />
            <Skeleton className="h-3 w-2/3" />
          </div>
        </div>

        {/* Remarks */}
        <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl space-y-2">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-3 w-3/4" />
        </div>

        <hr className="border-slate-200" />

        {/* Action section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end pt-2">
          <div className="space-y-1.5">
            <Skeleton className="h-3 w-12" />
            <Skeleton className="h-10 w-full rounded-xl" />
          </div>

          <div className="space-y-1.5">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-10 w-full rounded-xl" />
          </div>

          <Skeleton className="h-10 w-full rounded-xl" />
        </div>

        {/* Delete */}
        <div className="pt-4 border-t border-slate-100">
          <Skeleton className="h-3 w-28" />
        </div>
      </div>
    </div>
  );
};

export default function ViewMemoDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();

  const { data, isLoading } = useGetMemoByIdQuery(id);

  const [actionMemo, { isLoading: isSubmitting }] =
    useActionMemoMutation();

  const [deleteMemo, { isLoading: isDeleting }] =
    useDeleteMemoMutation();

  const [action, setAction] = useState<"APPROVE" | "REJECT" | "">("");
  const [remarks, setRemarks] = useState("");

  const formatDate = (value: string) =>
    new Date(value).toLocaleDateString("en-GB");

  const handleSubmit = async () => {
    if (!action) {
      toast.error("Please select an action");
      return;
    }

    try {
      await actionMemo({
        id,
        action,
        remarks: remarks || undefined,
      }).unwrap();

      toast.success(
        `Memo ${
          action === "APPROVE" ? "approved" : "rejected"
        } successfully`
      );

      router.push("/memo");
    } catch (error: any) {
      toast.error(
        error?.data?.message || "Failed to submit action."
      );
    }
  };

  const handleDelete = async () => {
    if (!confirm("Delete this memo? This cannot be undone.")) return;

    try {
      await deleteMemo(id).unwrap();

      toast.success("Memo deleted successfully");
      router.push("/memo");
    } catch (error: any) {
      toast.error(
        error?.data?.message || "Failed to delete memo."
      );
    }
  };

  // Skeleton loading
  if (isLoading) {
    return <MemoDetailsSkeleton />;
  }

  if (!data?.data) {
    return (
      <div className="py-16 text-center text-rose-500 text-sm">
        Memo not found.
      </div>
    );
  }

  const memo = data.data;
  const isPending = memo.status === "PENDING";

  return (
    <div className="space-y-6 w-full mx-auto pb-10">
      <Link
        href="/memo"
        className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:underline"
      >
        ‹ Back
      </Link>

      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-100 shadow-sm space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <h1 className="text-xl font-bold text-slate-900">
            {memo.title}
          </h1>

          <span
            className={`text-xs px-4 py-1.5 font-bold rounded-full bg-slate-50 ${
              statusStyle[memo.status]
            }`}
          >
            {memo.status}
          </span>
        </div>

        {/* Memo Information */}
        <div className="space-y-2 text-xs text-slate-700 font-medium leading-relaxed">
          <p>
            <strong className="text-slate-900 min-w-[100px] inline-block">
              Date:
            </strong>{" "}
            {formatDate(memo.createdAt)}
          </p>

          <p>
            <strong className="text-slate-900 min-w-[100px] inline-block">
              From:
            </strong>{" "}
            {memo.sender.email}
          </p>

          <p>
            <strong className="text-slate-900 min-w-[100px] inline-block">
              To:
            </strong>{" "}
            {memo.receiver.firstName} {memo.receiver.lastName}
          </p>

          <p>
            <strong className="text-slate-900 min-w-[100px] inline-block">
              Attachment:
            </strong>{" "}
            {memo.hasAttachment ? "Yes" : "No"}
          </p>

          {memo.hasAttachment && memo.attachmentType && (
            <p>
              <strong className="text-slate-900 min-w-[100px] inline-block">
                Attachment Type:
              </strong>{" "}
              {memo.attachmentType}
            </p>
          )}

          {memo.hasAttachment && memo.attachmentUrl && (
            <p>
              <strong className="text-slate-900 min-w-[100px] inline-block">
                File:
              </strong>{" "}
              <a
                href={memo.attachmentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                View attachment
              </a>
            </p>
          )}

          <p className="pt-2">
            <strong className="text-slate-900">
              Memo Message:
            </strong>{" "}
            {memo.message}
          </p>
        </div>

        {/* Remarks */}
        {memo.remarks && (
          <div className="p-4 bg-amber-50 border border-amber-100 rounded-xl text-xs">
            <p className="text-amber-600 font-semibold mb-1">
              Remarks
            </p>

            <p className="text-slate-700">
              {memo.remarks}
            </p>
          </div>
        )}

        <hr className="border-slate-200" />

        {/* Action */}
        {isPending ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end pt-2">
            <div>
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
                className="w-full px-3.5 py-2.5 text-xs text-slate-900 bg-slate-50/50 border border-slate-200 rounded-xl outline-none focus:border-blue-500"
              >
                <option value="">Select action</option>
                <option value="APPROVE">Approve</option>
                <option value="REJECT">Reject</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                Remarks
              </label>

              <input
                type="text"
                placeholder="Enter remark"
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs text-gray-800 bg-slate-50/50 border border-slate-200 rounded-xl outline-none focus:border-blue-500"
              />
            </div>

            <div>
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
          <p className="text-xs text-slate-400">
            This memo has already been{" "}
            {memo.status.toLowerCase()}. No further action is needed.
          </p>
        )}

        {/* Delete */}
        <div className="pt-4 border-t border-slate-100">
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="text-xs font-semibold text-rose-500 hover:underline disabled:opacity-50"
          >
            {isDeleting
              ? "Deleting..."
              : "Delete this memo"}
          </button>
        </div>
      </div>
    </div>
  );
}
