"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import {
  useGetProcurementByIdQuery,
  useApproveProcurementMutation,
  useRejectProcurementMutation,
} from "@/app/redux/dashboard/procurementApi";

const statusStyle: Record<string, string> = {
  PENDING: "text-amber-500 font-semibold",
  APPROVED: "text-emerald-600 font-semibold",
  REJECTED: "text-rose-600 font-semibold",
};

export default function ProcurementDetail() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [action, setAction] = useState("");
  const [remarks, setRemarks] = useState("");

  const { data, isLoading } = useGetProcurementByIdQuery(id);
  const [approveProcurement, { isLoading: isApproving }] = useApproveProcurementMutation();
  const [rejectProcurement, { isLoading: isRejecting }] = useRejectProcurementMutation();

  const formatCurrency = (value: string) =>
    `₦${parseFloat(value).toLocaleString("en-NG", { minimumFractionDigits: 2 })}`;

  const formatDate = (value: string) => new Date(value).toLocaleDateString("en-GB");

  const handleSubmit = async () => {
    if (!action) {
      toast.error("Please select an action");
      return;
    }

    try {
      if (action === "Approve") {
        await approveProcurement(id).unwrap();
        toast.success("Request approved successfully");
      } else if (action === "Reject") {
        await rejectProcurement(id).unwrap();
        toast.success("Request rejected");
      }
      router.push("/procurement");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to submit action.");
    }
  };

  if (isLoading) {
    return <div className="py-16 text-center text-slate-400 text-sm">Loading...</div>;
  }

  if (!data?.data) {
    return <div className="py-16 text-center text-rose-500 text-sm">Request not found.</div>;
  }

  const request = data.data;
  const isPending = request.status === "PENDING";
  const isSubmitting = isApproving || isRejecting;

  return (
    <div className="space-y-6 w-full mx-auto pb-10">
      <Link href="/procurement" className="inline-flex items-center gap-1 text-xs font-semibold text-sky-600 hover:underline">
        ‹ Back
      </Link>

      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-100 shadow-sm space-y-6">
        <h1 className="text-lg font-bold text-slate-900">Procurement Request Detail</h1>

        <div className="space-y-3 text-xs text-slate-700">
          <p><span className="font-bold text-slate-900">Item:</span> {request.item}</p>
          <p><span className="font-bold text-slate-900">Quantity:</span> {request.quantity}</p>
          <p><span className="font-bold text-slate-900">Unit Price:</span> {formatCurrency(request.unitPrice)}</p>
          <p><span className="font-bold text-slate-900">Total Price:</span> {formatCurrency(request.totalPrice)}</p>
          <p><span className="font-bold text-slate-900">Date:</span> {formatDate(request.createdAt)}</p>
          <p>
            <span className="font-bold text-slate-900">Requested By:</span>{" "}
            {request.requestedBy.firstName} {request.requestedBy.lastName}
          </p>
          <p>
            <span className="font-bold text-slate-900">Sent To:</span>{" "}
            {request.sentTo.firstName} {request.sentTo.lastName}
          </p>
          <p>
            <span className="font-bold text-slate-900">Request Status:</span>{" "}
            <span className={statusStyle[request.status]}>{request.status}</span>
          </p>
          <p><span className="font-bold text-slate-900">Attachment:</span> {request.hasAttachment ? "Yes" : "No"}</p>
          {request.hasAttachment && request.attachmentType && (
            <p><span className="font-bold text-slate-900">Attachment Type:</span> {request.attachmentType}</p>
          )}
        </div>

        <hr className="border-slate-200 my-6" />

        {isPending ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end pt-2">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1.5">Action</label>
              <select
                value={action}
                onChange={(e) => setAction(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs text-slate-900 bg-slate-50/50 border border-slate-200 rounded-xl outline-none focus:border-sky-500 transition-colors"
              >
                <option value="">Select action</option>
                <option value="Approve">Approve</option>
                <option value="Reject">Reject</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1.5">Remarks</label>
              <input
                type="text"
                placeholder="Enter remark"
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs text-black bg-slate-50/50 border border-slate-200 rounded-xl outline-none focus:border-sky-500 transition-colors"
              />
            </div>

            <div>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full py-2.5 bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-semibold text-xs rounded-MD shadow-md hover:opacity-90 transition-opacity disabled:opacity-50 cursor-pointer"
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </div>
          </div>
        ) : (
          <p className="text-xs text-slate-400">
            This request has already been {request.status.toLowerCase()}. No further action is needed.
          </p>
        )}
      </div>
    </div>
  );
}