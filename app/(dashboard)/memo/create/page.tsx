/* eslint-disable @typescript-eslint/no-explicit-any */
// app/(dashboard)/memo/create/page.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useGetStaffQuery } from "@/app/redux/dashboard/staffApi";
import { useCreateMemoMutation } from "@/app/redux/dashboard/memosApi";

const inputClass =
  "w-full px-3.5 py-2.5 text-xs text-slate-900 bg-slate-50/50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 transition-colors";
const labelClass = "text-xs font-semibold text-slate-700 block mb-1.5";

export default function CreateMemoPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [receiverId, setReceiverId] = useState("");
  const [message, setMessage] = useState("");
  const [hasAttachment, setHasAttachment] = useState<"yes" | "no">("no");
  const [attachmentType, setAttachmentType] = useState("");
  const [attachmentUrl, setAttachmentUrl] = useState("");

  const { data: staffData, isLoading: isStaffLoading } = useGetStaffQuery({ limit: 100 });
  const [createMemo, { isLoading }] = useCreateMemoMutation();

  const staffList = staffData?.data ?? [];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !receiverId || !message.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      await createMemo({
        title,
        message,
        receiverId,
        hasAttachment: hasAttachment === "yes",
        attachmentType: hasAttachment === "yes" ? attachmentType || undefined : undefined,
        attachmentUrl: hasAttachment === "yes" ? attachmentUrl || undefined : undefined,
      }).unwrap();

      toast.success("Memo sent successfully!");
      router.push("/memo");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to send memo.");
    }
  };

  return (
    <div className="space-y-6 w-full pb-10">
      <Link href="/memo" className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:underline">
        ‹ Back
      </Link>

      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-100 shadow-sm space-y-6">
        <h1 className="text-xl font-bold text-slate-900">Create Memo</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className={labelClass}>Memo title</label>
              <input
                type="text"
                placeholder="Enter title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={inputClass}
                required
              />
            </div>

            <div>
              <label className={labelClass}>Sent to</label>
              <select
                value={receiverId}
                onChange={(e) => setReceiverId(e.target.value)}
                className={inputClass}
                disabled={isStaffLoading}
                required
              >
                <option value="">
                  {isStaffLoading ? "Loading staff..." : "Select staff member"}
                </option>
                {staffList.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.firstName} {s.lastName} ({s.staffId})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className={labelClass}>Add attachment?</label>
              <select
                value={hasAttachment}
                onChange={(e) => setHasAttachment(e.target.value as "yes" | "no")}
                className={inputClass}
              >
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </select>
            </div>
          </div>

          {hasAttachment === "yes" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Attachment type</label>
                <select
                  value={attachmentType}
                  onChange={(e) => setAttachmentType(e.target.value)}
                  className={inputClass}
                >
                  <option value="">Select type</option>
                  <option value="INVOICE">Invoice</option>
                  <option value="RECEIPT">Receipt</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Attachment URL</label>
                <input
                  type="text"
                  placeholder="https://..."
                  value={attachmentUrl}
                  onChange={(e) => setAttachmentUrl(e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>
          )}

          <div>
            <label className={labelClass}>Memo body</label>
            <textarea
              rows={5}
              placeholder="Enter message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className={`${inputClass} resize-none`}
              required
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full sm:w-48 py-3 bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-semibold text-xs rounded-xl shadow-md hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {isLoading ? "Sending..." : "Send Memo"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}